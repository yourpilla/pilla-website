import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/reports/admin-reporting',
    method: 'POST',
    description: 'Admin reporting endpoint for company-wide workforce analytics',
    expectedPayload: {
      report_type: 'admin_reporting',
      week_start_date: '2024-01-15',
      week_end_date: '2024-01-21',
      sites: ['site_id_1', 'site_id_2', 'site_id_3'],
      custom_instructions: 'Focus on company-wide performance and site comparisons',
      admin_contacts: [
        {
          admin_id: 'admin_1',
          admin_email: 'ceo@company.com',
          admin_name: 'John CEO'
        },
        {
          admin_id: 'admin_2', 
          admin_email: 'operations@company.com',
          admin_name: 'Jane Operations'
        }
      ],
      company_name: 'Your Restaurant Group'
    },
    features: [
      'Company-wide data aggregation across multiple sites',
      'Site-level performance comparisons and rankings',
      'Executive-focused strategic insights and recommendations',
      'Multiple admin recipients support',
      'Site-based filtering instead of team-based',
      'Company-wide metrics: on-time rates, completion rates, cross-site trends'
    ]
  });
}