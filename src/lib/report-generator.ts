import { bubbleClient } from './bubble-client';
import { aiAnalyzer } from './ai-analyzer';
import { emailSender } from './email-sender';
import { randomUUID } from 'crypto';

interface ReportParams {
  startDate: string;
  endDate: string;
  teams: string[];
  customInstructions: string;
  managerId: string;
  managerEmail: string;
  managerName: string;
}

interface ReportResult {
  reportId: string;
  emailSent: boolean;
  error?: string;
}

export async function generateManagerReport(params: ReportParams): Promise<ReportResult> {
  const reportId = randomUUID();
  
  try {
    console.log(`Starting report generation [${reportId}] for ${params.managerName}`);
    
    // Step 1: Fetch data from Bubble
    console.log('Step 1: Fetching data from Bubble...');
    const data = await bubbleClient.fetchAllData({
      startDate: params.startDate,
      endDate: params.endDate,
      teams: params.teams
    });

    if (data.shifts.length === 0 && data.workItems.length === 0) {
      throw new Error('No data found for the specified date range and teams');
    }

    console.log(`Fetched ${data.shifts.length} shifts and ${data.workItems.length} work items`);

    // Step 2: Analyze data with AI
    console.log('Step 2: Analyzing data with AI...');
    const analysis = await aiAnalyzer.analyzeData({
      shifts: data.shifts,
      workItems: data.workItems,
      customInstructions: params.customInstructions,
      managerName: params.managerName,
      dateRange: {
        start: params.startDate,
        end: params.endDate
      }
    });

    console.log('AI analysis completed successfully');

    // Step 3: Send email via Loops
    console.log('Step 3: Sending email via Loops...');
    const emailResult = await emailSender.sendSimpleManagerReport({
      managerName: params.managerName,
      managerEmail: params.managerEmail,
      analysis: analysis,
      dateRange: {
        start: params.startDate,
        end: params.endDate
      },
      teams: params.teams
    });

    if (!emailResult.success) {
      throw new Error(`Email sending failed: ${emailResult.error}`);
    }

    console.log(`Report [${reportId}] completed successfully - Email sent to ${params.managerEmail}`);

    return {
      reportId,
      emailSent: true
    };

  } catch (error) {
    console.error(`Report generation failed [${reportId}]:`, error);
    
    return {
      reportId,
      emailSent: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Optional: Add function for company-wide reports
export async function generateCompanyReport(params: {
  startDate: string;
  endDate: string;
  locations: string[];
  adminEmail: string;
  adminName: string;
}): Promise<ReportResult> {
  // TODO: Implement company reporting logic
  // This would fetch data across all locations and generate executive summary
  console.log('Company reporting not yet implemented');
  
  return {
    reportId: randomUUID(),
    emailSent: false,
    error: 'Company reporting feature coming soon'
  };
}