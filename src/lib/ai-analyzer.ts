import OpenAI from 'openai';
import { BubbleShift, BubbleWork } from './bubble-client';

interface AnalysisResult {
  keyInsights: string[];
  trends: string[];
  concerns: string[];
  recommendations: string[];
  summary: string;
  rawAnalysis: string;
}

interface AnalyzeDataParams {
  shifts: BubbleShift[];
  workItems: BubbleWork[];
  customInstructions: string;
  managerName: string;
  dateRange: {
    start: string;
    end: string;
  };
}

class AIAnalyzer {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  private formatDataForAnalysis(shifts: BubbleShift[], workItems: BubbleWork[]): string {
    let analysis = `DATA SUMMARY:\n`;
    analysis += `- Total Shifts: ${shifts.length}\n`;
    analysis += `- Total Work Items: ${workItems.length}\n\n`;

    // Shifts analysis
    if (shifts.length > 0) {
      analysis += `SHIFTS DATA:\n`;
      shifts.forEach(shift => {
        const scheduledStart = new Date(shift.scheduled_start);
        const actualClockIn = shift.actual_clock_in ? new Date(shift.actual_clock_in) : null;
        const lateness = actualClockIn && scheduledStart ? 
          Math.max(0, (actualClockIn.getTime() - scheduledStart.getTime()) / (1000 * 60)) : 0;

        analysis += `- ${shift.user_name} (${shift.date}): `;
        analysis += `Scheduled ${scheduledStart.toLocaleTimeString()}, `;
        analysis += actualClockIn ? 
          `Clocked in ${actualClockIn.toLocaleTimeString()}` : 'No clock-in recorded';
        if (lateness > 0) analysis += ` (${Math.round(lateness)} min late)`;
        analysis += ` - Pay: $${shift.pay_amount}\n`;
      });
    }

    // Work items analysis
    if (workItems.length > 0) {
      analysis += `\nWORK ITEMS DATA:\n`;
      workItems.forEach(item => {
        const started = new Date(item.started_at);
        const completed = item.completed_at ? new Date(item.completed_at) : null;
        const duration = completed && started ? 
          Math.round((completed.getTime() - started.getTime()) / (1000 * 60)) : null;

        analysis += `- ${item.user_name} (${item.date}): `;
        analysis += `${item.work_type} - Status: ${item.status}`;
        if (duration) analysis += ` (${duration} min)`;
        analysis += `\n`;
      });
    }

    return analysis;
  }

  private buildPrompt(data: string, customInstructions: string, managerName: string, dateRange: { start: string; end: string }): string {
    return `You are an AI assistant analyzing hospitality workforce data for ${managerName}, a restaurant manager.

ANALYSIS PERIOD: ${dateRange.start} to ${dateRange.end}

CUSTOM MANAGER INSTRUCTIONS: ${customInstructions || 'Focus on overall performance, punctuality, and work completion patterns.'}

DATA TO ANALYZE:
${data}

Please provide a comprehensive analysis following this structure:

1. KEY INSIGHTS (3-5 bullet points of the most important findings)
2. TRENDS (patterns you notice in the data - punctuality, work completion, performance over time)
3. CONCERNS (any issues that need attention - repeated lateness, incomplete work, etc.)
4. RECOMMENDATIONS (actionable suggestions for the manager)
5. SUMMARY (2-3 sentence overview for busy managers)

ANALYSIS GUIDELINES:
- Focus on actionable insights the manager can use
- Identify patterns across multiple days/employees
- Highlight both positive performance and areas for improvement  
- Be specific with names and dates when relevant
- Keep recommendations practical and implementable
- Use a professional but friendly tone

If any employee shows concerning patterns (like being late multiple times), specifically mention this.
If someone is performing exceptionally well, highlight this too.

Respond in clear, structured format that's easy for a busy manager to scan quickly.`;
  }

  async analyzeData(params: AnalyzeDataParams): Promise<AnalysisResult> {
    try {
      console.log(`Starting AI analysis for ${params.managerName}`);
      console.log(`Analyzing ${params.shifts.length} shifts and ${params.workItems.length} work items`);

      const formattedData = this.formatDataForAnalysis(params.shifts, params.workItems);
      const prompt = this.buildPrompt(formattedData, params.customInstructions, params.managerName, params.dateRange);

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert hospitality operations analyst. Provide clear, actionable insights for restaurant managers based on workforce data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const rawAnalysis = completion.choices[0]?.message?.content || '';
      
      if (!rawAnalysis) {
        throw new Error('No analysis generated by AI');
      }

      console.log('AI analysis completed successfully');

      // Parse the structured response (basic parsing - could be enhanced)
      const sections = this.parseAnalysisResponse(rawAnalysis);

      return {
        keyInsights: sections.keyInsights,
        trends: sections.trends,
        concerns: sections.concerns,
        recommendations: sections.recommendations,
        summary: sections.summary,
        rawAnalysis: rawAnalysis
      };

    } catch (error) {
      console.error('Error in AI analysis:', error);
      throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private parseAnalysisResponse(response: string): {
    keyInsights: string[];
    trends: string[];
    concerns: string[];
    recommendations: string[];
    summary: string;
  } {
    // Simple parsing - looks for numbered/bulleted sections
    const sections = {
      keyInsights: [] as string[],
      trends: [] as string[],
      concerns: [] as string[],
      recommendations: [] as string[],
      summary: ''
    };

    const lines = response.split('\n').filter(line => line.trim());
    let currentSection = '';

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.toLowerCase().includes('key insights')) {
        currentSection = 'keyInsights';
      } else if (trimmed.toLowerCase().includes('trends')) {
        currentSection = 'trends';
      } else if (trimmed.toLowerCase().includes('concerns')) {
        currentSection = 'concerns';
      } else if (trimmed.toLowerCase().includes('recommendations')) {
        currentSection = 'recommendations';
      } else if (trimmed.toLowerCase().includes('summary')) {
        currentSection = 'summary';
      } else if (trimmed.startsWith('- ') || trimmed.match(/^\d+\./)) {
        // This is a bullet point or numbered item
        const text = trimmed.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '');
        if (currentSection && currentSection !== 'summary') {
          (sections[currentSection as keyof typeof sections] as string[]).push(text);
        }
      } else if (currentSection === 'summary' && trimmed.length > 10) {
        sections.summary += (sections.summary ? ' ' : '') + trimmed;
      }
    }

    return sections;
  }
}

// Export singleton instance
export const aiAnalyzer = new AIAnalyzer();
export type { AnalysisResult, AnalyzeDataParams };