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

interface AdminReportParams {
  startDate: string;
  endDate: string;
  sites: string[];
  customInstructions: string;
  adminId: string;
  adminEmail: string;
  adminName: string;
  companyName: string;
}

interface AdminReportResult {
  reportId: string;
  emailSent: boolean;
  emailId?: string;
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
    const emailResult = await emailSender.sendManagerReport({
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

export async function generateAdminReport(params: AdminReportParams): Promise<AdminReportResult> {
  const reportId = randomUUID();
  
  try {
    console.log(`Starting admin report generation [${reportId}] for ${params.adminName}`);
    console.log(`Company: ${params.companyName}, Sites: ${params.sites.length}`);
    
    // Step 1: Fetch company-wide data from Bubble
    console.log('Step 1: Fetching company-wide data from Bubble...');
    const data = await bubbleClient.fetchAllCompanyData({
      startDate: params.startDate,
      endDate: params.endDate,
      sites: params.sites
    });

    if (data.shifts.length === 0 && data.workItems.length === 0) {
      throw new Error('No company-wide data found for the specified date range and sites');
    }

    console.log(`Fetched ${data.shifts.length} shifts and ${data.workItems.length} work items across ${params.sites.length} sites`);

    // Step 2: Analyze data with AI for company-wide insights (personalized for this admin)
    console.log('Step 2: Analyzing company-wide data with AI...');
    const analysis = await aiAnalyzer.analyzeCompanyData({
      shifts: data.shifts,
      workItems: data.workItems,
      customInstructions: params.customInstructions,
      companyName: params.companyName,
      adminName: params.adminName,
      sites: params.sites,
      dateRange: {
        start: params.startDate,
        end: params.endDate
      }
    });

    console.log('Company AI analysis completed successfully');

    // Step 3: Send email to this admin via Loops (using same method as manager reports)
    console.log('Step 3: Sending email to admin via Loops...');
    const emailResult = await emailSender.sendManagerReport({
      managerName: params.adminName,
      managerEmail: params.adminEmail,
      analysis: analysis,
      dateRange: {
        start: params.startDate,
        end: params.endDate
      },
      teams: [] // Empty for admin reports, they focus on sites instead
    });

    if (!emailResult.success) {
      throw new Error(`Email sending failed: ${emailResult.error}`);
    }

    console.log(`Admin report [${reportId}] completed successfully - Email sent to ${params.adminEmail}`);

    return {
      reportId,
      emailSent: true,
      emailId: emailResult.emailId
    };

  } catch (error) {
    console.error(`Admin report generation failed [${reportId}]:`, error);
    
    return {
      reportId,
      emailSent: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Legacy function for backward compatibility
export async function generateCompanyReport(params: {
  startDate: string;
  endDate: string;
  locations: string[];
  adminEmail: string;
  adminName: string;
}): Promise<ReportResult> {
  // Redirect to new admin report function with single admin
  const result = await generateAdminReport({
    startDate: params.startDate,
    endDate: params.endDate,
    sites: params.locations,
    customInstructions: 'Focus on company-wide performance and operational efficiency.',
    adminId: 'legacy_admin',
    adminEmail: params.adminEmail,
    adminName: params.adminName,
    companyName: 'Company'
  });

  return {
    reportId: result.reportId,
    emailSent: result.emailSent,
    error: result.error
  };
}