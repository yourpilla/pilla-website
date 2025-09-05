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
  adminName: string;
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
    try {
      // Check for Redis credentials - use same variables as kv-store.ts
      const redisUrl = process.env.KV_REST_API_URL;
      const redisToken = process.env.KV_REST_API_TOKEN;
      
      if (!redisUrl || !redisToken) {
        console.log(`No Redis credentials found, using UID fallback for ${type}:${uid}`);
        return uid;
      }

      // Dynamic import to avoid issues in environments without Redis
      const { Redis } = await import('@upstash/redis');
      const redis = new Redis({
        url: redisUrl,
        token: redisToken,
      });

      const name = await redis.get(`${type}:${uid}`);
      if (name) {
        console.log(`Resolved ${type}:${uid} → "${name}"`);
        return name as string;
      } else {
        console.log(`No mapping found for ${type}:${uid}, using UID`);
        return uid;
      }
    } catch (error) {
      console.error(`Error resolving ${type} UID ${uid}:`, error);
      return uid; // Fallback to UID on error
    }
  }

  private formatDataForAnalysis(shifts: BubbleShift[], workItems: BubbleWork[]): string {
    let analysis = `TEAM DATA SUMMARY:\n`;
    analysis += `- Total Shifts: ${shifts.length}\n`;
    analysis += `- Total Work Items: ${workItems.length}\n\n`;

    // Shifts analysis - FOCUS ON TEAM PERFORMANCE (exclude site information)
    if (shifts.length > 0) {
      analysis += `TEAM SHIFTS DATA:\n`;
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
        analysis += ` - Duration: ${shift.minutes_difference || 0} minutes\n`;
        // NOTE: Intentionally excluding location_id/site to focus AI on team performance
      });
    }

    // Work items analysis - FOCUS ON TEAM PERFORMANCE (exclude site information)
    if (workItems.length > 0) {
      analysis += `\nTEAM WORK ITEMS DATA:\n`;
      workItems.forEach(item => {
        const started = item.started_at ? new Date(item.started_at) : null;
        const completed = item.completed_at ? new Date(item.completed_at) : null;
        const duration = completed && started ? 
          Math.round((completed.getTime() - started.getTime()) / (1000 * 60)) : null;

        analysis += `- ${item.user_name || 'Unknown User'} (${item.date}): `;
        analysis += `${item.work_type || 'Unknown Task'} - Status: ${item.status}`;
        if (duration) analysis += ` (${duration} min)`;
        if (item.issue_raised_time) analysis += ` - Issue raised`;
        analysis += `\n`;
        // NOTE: Intentionally excluding location_id/site to focus AI on team performance
      });
    }

    return analysis;
  }

  private buildPrompt(data: string, customInstructions: string, managerName: string, dateRange: { start: string; end: string }): string {
    return `You are an assistant that analyses weekly hospitality workforce data and produces clear, structured insights for hospitality managers.

You will always be given input data in JSON format which could include the below:

Shift Fields:

start time = the start date/time of the shift
end time = the end date/time of the shift
user = the name of the employee working the shift
team = the team the user worked in during the shift
minutes difference = the total length of the shift in minutes, including breaks
category = the category of the shift
clock in = the clock in date/time of the shift. If this field is missing then the user didn't clock in

Work Fields:

start = the start date/time of the work
end = the end date/time of the work
finished time actual = the finished date/time of the work. If this field is missing then the work hasn't been finished
Name = The name of the work
team = the team the work is assigned to
minutes difference = the length of time assigned to finish the work
issue raised time = the date/time that the work was highlighted as an issue. If this field is missing then the work hasn't been highlighted as an issue

IMPORTANT DATA ANALYSIS GUIDELINES:
- Calculate lateness by comparing clock in with start time
- Available shift categories are shift, overtime, absence, holiday and other leave
- Always structure your response clearly for email delivery. Your response will be going straight into the body of the email
- Base all insights on the actual data provided - never make assumptions
- If data is missing or unclear, acknowledge this rather than guessing
- Keep insights practical and implementable for busy hospitality managers

FORMAT REQUIREMENTS:
- Use clear headings for each section
- Use bullet points where possible to add clarity
- Your response will be used as the intro and body for the email so start your response with "Hi ${managerName}"
- You don't need to add a signature to the email because there is already a hardcoded one

Below are the hospitality manager's custom instructions for this report:

${customInstructions || 'Focus on overall performance, punctuality, and work completion patterns.'}

ANALYSIS PERIOD: ${dateRange.start} to ${dateRange.end}
MANAGER: ${managerName}

DATA TO ANALYZE:
${data}`;
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

  private async formatDataForCompanyAnalysis(shifts: BubbleShift[], workItems: BubbleWork[], sites: string[], customInstructions: string): Promise<string> {
    try {
      // Check if this looks like a dynamic request (more than just generic instructions)
      const isDynamicRequest = this.isDynamicRequest(customInstructions);
      
      if (isDynamicRequest) {
        console.log('Using dynamic aggregation system for admin analysis');
        return await this.processDynamicAnalysis(shifts, workItems, customInstructions);
      } else {
        console.log('Using legacy aggregation for admin analysis');
        return this.processLegacyAnalysis(shifts, workItems, sites);
      }
    } catch (error) {
      console.error('Dynamic analysis failed, falling back to legacy:', error);
      return this.processLegacyAnalysis(shifts, workItems, sites);
    }
  }

  private isDynamicRequest(customInstructions: string): boolean {
    const dynamicKeywords = [
      'show me', 'analyze', 'compare', 'breakdown', 'patterns', 
      'across sites', 'by day', 'by time', 'performance', 'issues',
      'clock-in', 'absence', 'completion', 'trends'
    ];
    
    const lowerInstructions = customInstructions.toLowerCase();
    return dynamicKeywords.some(keyword => lowerInstructions.includes(keyword)) &&
           customInstructions.length > 50; // More than generic instructions
  }

  private async processDynamicAnalysis(shifts: BubbleShift[], workItems: BubbleWork[], customInstructions: string): Promise<string> {
    // Dynamic import to avoid circular dependencies
    const { dynamicAggregationParser } = await import('./dynamic-aggregation-parser');
    const { dynamicDataProcessor } = await import('./dynamic-data-processor');
    const { dynamicAnalysisFormatter } = await import('./dynamic-analysis-formatter');

    // Parse the admin request into aggregation plans
    const parsedRequest = await dynamicAggregationParser.parseAdminRequest(customInstructions);
    console.log(`Generated ${parsedRequest.plans.length} aggregation plans`);

    // Filter out team information for admin reports
    const shiftsWithoutTeams = shifts.map(shift => ({
      ...shift,
      team_id: undefined
    }));
    
    const workItemsWithoutTeams = workItems.map(work => ({
      ...work,
      team_id: undefined
    }));

    // Process each plan
    const processedResults = parsedRequest.plans.map(plan => {
      return dynamicDataProcessor.processData(shiftsWithoutTeams, workItemsWithoutTeams, plan);
    });

    // Format results for AI analysis
    return dynamicAnalysisFormatter.formatForAI(parsedRequest, processedResults);
  }

  private processLegacyAnalysis(shifts: BubbleShift[], workItems: BubbleWork[], sites: string[]): string {
    let analysis = `COMPANY DATA SUMMARY:\n`;
    analysis += `- Total Sites Analyzed: ${sites.length}\n`;
    analysis += `- Total Shifts: ${shifts.length}\n`;
    analysis += `- Total Work Items: ${workItems.length}\n\n`;

    // Filter out team information for admin reports - focus on site-level analysis only
    const shiftsWithoutTeams = shifts.map(shift => ({
      ...shift,
      team_id: undefined // Remove team info to focus AI on site comparisons
    }));
    
    const workItemsWithoutTeams = workItems.map(work => ({
      ...work,
      team_id: undefined // Remove team info to focus AI on site comparisons  
    }));

    // Site-level aggregation using filtered data
    const siteStats = this.aggregateDataBySite(shiftsWithoutTeams, workItemsWithoutTeams);
    
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
    const siteStats: Record<string, {
      shiftCount: number;
      workCount: number;
      totalLateness: number;
      onTimeShifts: number;
      completedWork: number;
      avgLateness?: number;
    }> = {};

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

    // Calculate averages and transform to return type
    const result: Record<string, {
      shiftCount: number;
      workCount: number;
      avgLateness: number;
      onTimeShifts: number;
      completedWork: number;
    }> = {};

    Object.keys(siteStats).forEach(siteId => {
      const stats = siteStats[siteId];
      result[siteId] = {
        shiftCount: stats.shiftCount,
        workCount: stats.workCount,
        avgLateness: stats.shiftCount > 0 ? stats.totalLateness / stats.shiftCount : 0,
        onTimeShifts: stats.onTimeShifts,
        completedWork: stats.completedWork
      };
    });

    return result;
  }

  private buildAdminPrompt(data: string, customInstructions: string, companyName: string, adminName: string, dateRange: { start: string; end: string }): string {
    return `You are an assistant that analyses hospitality workforce data and produces clear, structured insights for company administrators and executives.

You will be given processed data analysis results that may include multiple dimensions of analysis based on the administrator's specific requests.

The data will be organized into different analysis sections, each focusing on specific aspects like:
- Site-level performance comparisons
- Time-based patterns (day of week, time of day)
- Issue tracking and trends
- Absence and attendance patterns
- Work completion and efficiency metrics

IMPORTANT DATA ANALYSIS GUIDELINES:
- Base all insights on the processed data provided - the analysis has already been customized based on the administrator's request
- Each analysis section represents a different dimension requested by the administrator
- Focus on cross-site comparisons and company-wide patterns
- Identify actionable insights executives can implement
- Compare performance across different locations to identify best practices
- Highlight both high-performing sites and areas needing improvement
- Always structure your response clearly for email delivery. Your response will be going straight into the body of the email
- If data is missing or unclear, acknowledge this rather than guessing
- Keep insights strategic and implementable for busy executives

FORMAT REQUIREMENTS:
- Use clear headings for each section
- Use bullet points where possible to add clarity
- Your response will be used as the intro and body for the email so start your response with "Hi ${adminName}"
- You don't need to add a signature to the email because there is already a hardcoded one

Below are the company administrator's custom analysis instructions:

${customInstructions || 'Focus on company-wide performance, site comparisons, operational efficiency, and strategic insights.'}

ANALYSIS PERIOD: ${dateRange.start} to ${dateRange.end}
COMPANY: ${companyName}

PROCESSED DATA TO ANALYZE:
${data}`;
  }

  async analyzeCompanyData(params: AdminAnalyzeDataParams): Promise<AnalysisResult> {
    try {
      console.log(`Starting AI analysis for ${params.companyName} company report`);
      console.log(`Analyzing ${params.shifts.length} shifts and ${params.workItems.length} work items across ${params.sites.length} sites`);

      const formattedData = await this.formatDataForCompanyAnalysis(params.shifts, params.workItems, params.sites, params.customInstructions);
      const prompt = this.buildAdminPrompt(formattedData, params.customInstructions, params.companyName, params.adminName, params.dateRange);

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