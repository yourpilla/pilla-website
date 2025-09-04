import { NextRequest, NextResponse } from 'next/server';
import { generateManagerReport } from '@/lib/report-generator';

interface ManagerReportRequest {
  report_type: string;
  week_start_date: string;
  week_end_date: string;
  teams: string[];
  custom_instructions?: string;
  manager_id: string;
  manager_email: string;
  manager_name: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ManagerReportRequest = await request.json();
    
    // Validate required fields
    const requiredFields = ['report_type', 'week_start_date', 'week_end_date', 'teams', 'manager_id', 'manager_email', 'manager_name'];
    for (const field of requiredFields) {
      if (!body[field as keyof ManagerReportRequest]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Validate date format
    const startDate = new Date(body.week_start_date);
    const endDate = new Date(body.week_end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    console.log(`Generating manager report for ${body.manager_name} (${body.manager_email})`);
    console.log(`Date range: ${body.week_start_date} to ${body.week_end_date}`);
    console.log(`Teams: ${body.teams.join(', ')}`);

    // Generate the report
    const result = await generateManagerReport({
      startDate: body.week_start_date,
      endDate: body.week_end_date,
      teams: body.teams,
      customInstructions: body.custom_instructions || '',
      managerId: body.manager_id,
      managerEmail: body.manager_email,
      managerName: body.manager_name
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Report generated and sent successfully',
      reportId: result.reportId,
      emailSent: result.emailSent
    });

  } catch (error) {
    console.error('Error generating manager report:', error);
    return NextResponse.json({ 
      error: 'Failed to generate report', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}