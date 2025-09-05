import { NextRequest, NextResponse } from 'next/server';
import { generateAdminReport } from '@/lib/report-generator';

interface AdminReportRequest {
  report_type: 'admin_reporting';
  week_start_date: string;
  week_end_date: string;
  sites: string[]; // All company sites instead of specific teams
  custom_instructions: string;
  admin_contacts: Array<{
    admin_id: string;
    admin_email: string;
    admin_name: string;
  }>;
  company_name: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Received admin reporting request');
    
    const body: AdminReportRequest = await request.json();
    
    // Validate required fields
    if (!body.week_start_date || !body.week_end_date) {
      return NextResponse.json(
        { error: 'Missing required date fields' },
        { status: 400 }
      );
    }

    if (!body.sites || body.sites.length === 0) {
      return NextResponse.json(
        { error: 'At least one site must be specified' },
        { status: 400 }
      );
    }

    if (!body.admin_contacts || body.admin_contacts.length === 0) {
      return NextResponse.json(
        { error: 'At least one admin contact must be provided' },
        { status: 400 }
      );
    }

    // Validate admin contact format
    for (const contact of body.admin_contacts) {
      if (!contact.admin_email || !contact.admin_name) {
        return NextResponse.json(
          { error: 'Each admin contact must have email and name' },
          { status: 400 }
        );
      }
    }

    console.log(`Processing admin report for ${body.admin_contacts.length} admin(s) across ${body.sites.length} sites`);
    console.log(`Date range: ${body.week_start_date} to ${body.week_end_date}`);

    // Generate the admin report
    const result = await generateAdminReport({
      startDate: body.week_start_date,
      endDate: body.week_end_date,
      sites: body.sites,
      customInstructions: body.custom_instructions || 'Focus on company-wide performance, site comparisons, and operational efficiency.',
      adminContacts: body.admin_contacts,
      companyName: body.company_name || 'Your Company'
    });

    if (!result.emailSent) {
      console.error('Admin report generation failed:', result.error);
      return NextResponse.json(
        { 
          error: 'Report generation failed',
          details: result.error 
        },
        { status: 500 }
      );
    }

    console.log(`Admin report completed successfully [${result.reportId}]`);

    return NextResponse.json({
      success: true,
      report_id: result.reportId,
      message: `Admin report sent to ${body.admin_contacts.length} administrator(s)`
    });

  } catch (error) {
    console.error('Error processing admin report request:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}