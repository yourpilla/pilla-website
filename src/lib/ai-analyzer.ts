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

interface AdminAnalyzeDataParams {
  shifts: BubbleShift[];
  workItems: BubbleWork[];
  customInstructions: string;
  companyName: string;
  sites: string[];
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

  private async resolveUID(type: 'user' | 'team' | 'site', uid: string): Promise<string> {
    // TODO: Implement Redis lookup for UID-to-name resolution
    // For now, return the UID as fallback
    // const redis = getRedisClient();
    // const name = await redis.get(`${type}:${uid}`);
    // return name || uid;
    
    console.log(`TODO: Resolve ${type} UID ${uid} to name via Redis`);
    return uid; // Temporary fallback
  }

  private formatDataForAnalysis(shifts: BubbleShift[], workItems: BubbleWork[]): string {
    let analysis = `DATA SUMMARY:\n`;
    analysis += `- Total Shifts: ${shifts.length}\n`;
    analysis += `- Total Work Items: ${workItems.length}\n\n`;

    // Shifts analysis
    if (shifts.length > 0) {
      analysis += `SHIFTS DATA:\n`;
      shifts.forEach(shift => {
        const scheduledStart = shift.scheduled_start ? new Date(shift.scheduled_start) : null;
        const actualClockIn = shift.actual_clock_in ? new Date(shift.actual_clock_in) : null;
        const lateness = actualClockIn && scheduledStart ? 
          Math.max(0, (actualClockIn.getTime() - scheduledStart.getTime()) / (1000 * 60)) : 0;

        analysis += `- ${shift.user_name || 'Unknown User'} (${shift.date}): `;
        analysis += scheduledStart ? `Scheduled ${scheduledStart.toLocaleTimeString()}, ` : 'No schedule time, ';
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
        const started = item.started_at ? new Date(item.started_at) : null;
        const completed = item.completed_at ? new Date(item.completed_at) : null;
        const duration = completed && started ? 
          Math.round((completed.getTime() - started.getTime()) / (1000 * 60)) : null;

        analysis += `- ${item.user_name || 'Unknown User'} (${item.date}): `;
        analysis += `${item.work_type || 'Unknown Task'} - Status: ${item.status}`;
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
5. SUMMARY (2-3 sentence executive overview for busy managers)

CRITICAL REQUIREMENTS:
- EVERY SECTION MUST HAVE A RESPONSE - never leave any section blank
- If there are no meaningful insights for a section, explicitly state this (e.g., "No significant concerns identified during this period")
- Each section must contain at least one bullet point or sentence
- All sections are REQUIRED and must be present in your response

ANALYSIS GUIDELINES:
- Focus on actionable insights the manager can use
- Identify patterns across multiple days/employees
- Highlight both positive performance and areas for improvement  
- Be specific with names and dates when relevant
- Keep recommendations practical and implementable
- Use a professional but friendly tone

If any employee shows concerning patterns (like being late multiple times), specifically mention this.
If someone is performing exceptionally well, highlight this too.

FORMAT REQUIREMENTS:
- Use clear headings for each section (KEY INSIGHTS, TRENDS, CONCERNS, RECOMMENDATIONS, SUMMARY)
- Use bullet points for the first 4 sections
- Write the SUMMARY as 2-3 complete sentences (not bullet points)
- Respond in clear, structured format that's easy for a busy manager to scan quickly.`;
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
    // Improved parsing with better section detection and debugging
    const sections = {
      keyInsights: [] as string[],
      trends: [] as string[],
      concerns: [] as string[],
      recommendations: [] as string[],
      summary: ''
    };

    console.log('Parsing AI response:', response.substring(0, 200) + '...');

    const lines = response.split('\n').filter(line => line.trim());
    let currentSection = '';

    for (const line of lines) {
      const trimmed = line.trim();
      
      // More flexible section header detection
      if (trimmed.toLowerCase().includes('key insights') || trimmed.toLowerCase().includes('insights')) {
        currentSection = 'keyInsights';
        console.log('Found KEY INSIGHTS section');
      } else if (trimmed.toLowerCase().includes('trends')) {
        currentSection = 'trends';
        console.log('Found TRENDS section');
      } else if (trimmed.toLowerCase().includes('concerns') || trimmed.toLowerCase().includes('attention')) {
        currentSection = 'concerns';
        console.log('Found CONCERNS section');
      } else if (trimmed.toLowerCase().includes('recommendations')) {
        currentSection = 'recommendations';
        console.log('Found RECOMMENDATIONS section');
      } else if (trimmed.toLowerCase().includes('summary') || trimmed.toLowerCase().includes('executive')) {
        currentSection = 'summary';
        console.log('Found SUMMARY section');
        // Check if summary content is on the same line as the header
        const afterColon = trimmed.split(':')[1]?.trim();
        if (afterColon && afterColon.length > 10) {
          sections.summary = afterColon;
        }
      } else if (trimmed.startsWith('- ') || trimmed.match(/^\d+\./) || trimmed.startsWith('•')) {
        // This is a bullet point or numbered item
        const text = trimmed.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '');
        if (currentSection && currentSection !== 'summary' && text.length > 0) {
          (sections[currentSection as keyof typeof sections] as string[]).push(text);
        }
      } else if (currentSection === 'summary' && trimmed.length > 10 && !trimmed.toLowerCase().includes('summary')) {
        // Include substantial text in summary section (but skip repeated headers)
        if (sections.summary && !sections.summary.endsWith('.')) {
          sections.summary += '. ';
        }
        sections.summary += (sections.summary ? '' : '') + trimmed;
      }
    }

    // Add fallback content for empty sections to ensure all fields are populated
    if (sections.keyInsights.length === 0) {
      sections.keyInsights.push('No specific key insights identified for this reporting period.');
    }
    if (sections.trends.length === 0) {
      sections.trends.push('No significant trends detected in the analyzed data.');
    }
    if (sections.concerns.length === 0) {
      sections.concerns.push('No areas requiring immediate attention identified.');
    }
    if (sections.recommendations.length === 0) {
      sections.recommendations.push('Continue monitoring team performance and maintain current operational practices.');
    }
    if (!sections.summary || sections.summary.trim().length < 10) {
      sections.summary = 'Team performance analysis completed for the specified reporting period. Continue monitoring metrics and team engagement.';
    }

    console.log('Parsed sections:', {
      keyInsights: sections.keyInsights.length,
      trends: sections.trends.length,
      concerns: sections.concerns.length,
      recommendations: sections.recommendations.length,
      summaryLength: sections.summary.length
    });

    return sections;
  }

  private formatDataForCompanyAnalysis(shifts: BubbleShift[], workItems: BubbleWork[], sites: string[]): string {
    let analysis = `COMPANY DATA SUMMARY:\n`;
    analysis += `- Total Sites Analyzed: ${sites.length}\n`;
    analysis += `- Total Shifts: ${shifts.length}\n`;
    analysis += `- Total Work Items: ${workItems.length}\n\n`;

    // Site-level aggregation
    const siteStats = this.aggregateDataBySite(shifts, workItems);
    
    analysis += `SITE-LEVEL PERFORMANCE:\n`;
    Object.entries(siteStats).forEach(([siteId, stats]) => {
      analysis += `- Site ${siteId}:\n`;
      analysis += `  • Shifts: ${stats.shiftCount}\n`;
      analysis += `  • Work Items: ${stats.workCount}\n`;
      analysis += `  • Avg Lateness: ${stats.avgLateness.toFixed(1)} minutes\n`;
      analysis += `  • On-time Rate: ${((stats.onTimeShifts / stats.shiftCount) * 100).toFixed(1)}%\n`;
      analysis += `  • Work Completion Rate: ${((stats.completedWork / stats.workCount) * 100).toFixed(1)}%\n\n`;
    });

    // Company-wide trends
    if (shifts.length > 0) {
      analysis += `COMPANY-WIDE SHIFT TRENDS:\n`;
      const overallLateness = shifts.reduce((total, shift) => {
        const scheduledStart = shift.scheduled_start ? new Date(shift.scheduled_start) : null;
        const actualClockIn = shift.actual_clock_in ? new Date(shift.actual_clock_in) : null;
        const lateness = actualClockIn && scheduledStart ? 
          Math.max(0, (actualClockIn.getTime() - scheduledStart.getTime()) / (1000 * 60)) : 0;
        return total + lateness;
      }, 0) / shifts.length;

      const onTimePercentage = (shifts.filter(shift => {
        const scheduledStart = shift.scheduled_start ? new Date(shift.scheduled_start) : null;
        const actualClockIn = shift.actual_clock_in ? new Date(shift.actual_clock_in) : null;
        if (!actualClockIn || !scheduledStart) return false;
        return actualClockIn.getTime() <= scheduledStart.getTime() + (5 * 60 * 1000); // 5 min grace period
      }).length / shifts.length) * 100;

      analysis += `- Company Average Lateness: ${overallLateness.toFixed(1)} minutes\n`;
      analysis += `- Company On-time Rate: ${onTimePercentage.toFixed(1)}%\n`;
      analysis += `- Total Payroll Hours: ${shifts.reduce((total, shift) => total + (shift.pay_amount || 0), 0).toFixed(1)}\n\n`;
    }

    return analysis;
  }

  private aggregateDataBySite(shifts: BubbleShift[], workItems: BubbleWork[]): Record<string, {
    shiftCount: number;
    workCount: number;
    avgLateness: number;
    onTimeShifts: number;
    completedWork: number;
  }> {
    const siteStats: Record<string, any> = {};

    // Process shifts by site
    shifts.forEach(shift => {
      const siteId = shift.location_id || 'Unknown Site';
      if (!siteStats[siteId]) {
        siteStats[siteId] = {
          shiftCount: 0,
          workCount: 0,
          totalLateness: 0,
          onTimeShifts: 0,
          completedWork: 0
        };
      }

      siteStats[siteId].shiftCount++;

      const scheduledStart = shift.scheduled_start ? new Date(shift.scheduled_start) : null;
      const actualClockIn = shift.actual_clock_in ? new Date(shift.actual_clock_in) : null;
      
      if (actualClockIn && scheduledStart) {
        const lateness = Math.max(0, (actualClockIn.getTime() - scheduledStart.getTime()) / (1000 * 60));
        siteStats[siteId].totalLateness += lateness;
        
        if (lateness <= 5) { // 5 minute grace period
          siteStats[siteId].onTimeShifts++;
        }
      }
    });

    // Process work items by site
    workItems.forEach(workItem => {
      const siteId = workItem.location_id || 'Unknown Site';
      if (!siteStats[siteId]) {
        siteStats[siteId] = {
          shiftCount: 0,
          workCount: 0,
          totalLateness: 0,
          onTimeShifts: 0,
          completedWork: 0
        };
      }

      siteStats[siteId].workCount++;
      
      if (workItem.status && workItem.status.toLowerCase().includes('complete')) {
        siteStats[siteId].completedWork++;
      }
    });

    // Calculate averages
    Object.keys(siteStats).forEach(siteId => {
      const stats = siteStats[siteId];
      stats.avgLateness = stats.shiftCount > 0 ? stats.totalLateness / stats.shiftCount : 0;
    });

    return siteStats;
  }

  private buildAdminPrompt(data: string, customInstructions: string, companyName: string, dateRange: { start: string; end: string }): string {
    return `You are an AI assistant analyzing hospitality workforce data for ${companyName} company administrators.

ANALYSIS PERIOD: ${dateRange.start} to ${dateRange.end}

CUSTOM ADMIN INSTRUCTIONS: ${customInstructions || 'Focus on company-wide performance, site comparisons, operational efficiency, and strategic insights.'}

COMPANY DATA TO ANALYZE:
${data}

Please provide a comprehensive executive analysis following this structure:

1. KEY INSIGHTS (3-5 bullet points of the most important company-wide findings)
2. TRENDS (patterns across sites - performance differences, operational efficiency, workforce patterns)
3. CONCERNS (any company-wide issues that need executive attention - underperforming sites, operational risks)
4. RECOMMENDATIONS (strategic recommendations for company leadership)
5. SUMMARY (2-3 sentence executive overview for busy executives)

CRITICAL REQUIREMENTS:
- EVERY SECTION MUST HAVE A RESPONSE - never leave any section blank
- If there are no meaningful insights for a section, explicitly state this (e.g., "No significant company-wide concerns identified during this period")
- Each section must contain at least one bullet point or sentence
- All sections are REQUIRED and must be present in your response

ANALYSIS GUIDELINES:
- Focus on strategic, company-level insights executives can act on
- Compare performance across different sites and identify best practices
- Highlight both high-performing locations and areas needing improvement
- Be specific with site names and performance metrics when relevant
- Keep recommendations strategic and implementable at the company level
- Use a professional executive tone

Look for patterns like:
- Which sites are performing above/below company average
- Operational inefficiencies that appear across multiple locations
- Staffing or performance trends that could impact company goals
- Opportunities to share best practices between high and low performing sites

FORMAT REQUIREMENTS:
- Use clear headings for each section (KEY INSIGHTS, TRENDS, CONCERNS, RECOMMENDATIONS, SUMMARY)
- Use bullet points for the first 4 sections
- Write the SUMMARY as 2-3 complete sentences (not bullet points)
- Respond in clear, structured format that's easy for executives to scan quickly.`;
  }

  async analyzeCompanyData(params: AdminAnalyzeDataParams): Promise<AnalysisResult> {
    try {
      console.log(`Starting AI analysis for ${params.companyName} company report`);
      console.log(`Analyzing ${params.shifts.length} shifts and ${params.workItems.length} work items across ${params.sites.length} sites`);

      const formattedData = this.formatDataForCompanyAnalysis(params.shifts, params.workItems, params.sites);
      const prompt = this.buildAdminPrompt(formattedData, params.customInstructions, params.companyName, params.dateRange);

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert hospitality operations analyst focused on company-wide strategic analysis. Provide clear, actionable insights for executive leadership based on multi-site workforce data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2500, // Slightly more for company-wide analysis
      });

      const rawAnalysis = completion.choices[0]?.message?.content || '';
      
      if (!rawAnalysis) {
        throw new Error('No analysis generated by AI');
      }

      console.log('Company AI analysis completed successfully');

      // Parse the structured response (using same parsing logic)
      const sections = this.parseAnalysisResponse(rawAnalysis);

      // Update fallback content for company context
      if (sections.keyInsights.length === 0) {
        sections.keyInsights.push('Company-wide performance analysis completed for the specified reporting period.');
      }
      if (sections.trends.length === 0) {
        sections.trends.push('No significant cross-site trends detected in the analyzed data.');
      }
      if (sections.concerns.length === 0) {
        sections.concerns.push('No company-wide issues requiring immediate executive attention identified.');
      }
      if (sections.recommendations.length === 0) {
        sections.recommendations.push('Continue monitoring site performance and operational metrics across all locations.');
      }
      if (!sections.summary || sections.summary.trim().length < 10) {
        sections.summary = 'Company-wide performance analysis completed for the specified reporting period. Executive team should continue monitoring cross-site operational metrics.';
      }

      return {
        keyInsights: sections.keyInsights,
        trends: sections.trends,
        concerns: sections.concerns,
        recommendations: sections.recommendations,
        summary: sections.summary,
        rawAnalysis: rawAnalysis
      };

    } catch (error) {
      console.error('Error in company AI analysis:', error);
      throw new Error(`Company AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export const aiAnalyzer = new AIAnalyzer();
export type { AnalysisResult, AnalyzeDataParams, AdminAnalyzeDataParams };