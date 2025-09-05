import { NextRequest, NextResponse } from 'next/server';
import { dynamicAggregationParser } from '@/lib/dynamic-aggregation-parser';
import { dynamicDataProcessor } from '@/lib/dynamic-data-processor';
import { dynamicAnalysisFormatter } from '@/lib/dynamic-analysis-formatter';

// Mock data for testing
const mockShifts = [
  {
    shift_id: '1', user_id: 'user_1', user_name: 'Tiger Woods', location_id: 'site_a', team_id: undefined,
    scheduled_start: '2024-01-15T09:00:00.000Z', actual_clock_in: '2024-01-15T09:15:00.000Z',
    scheduled_end: '2024-01-15T17:00:00.000Z', actual_clock_out: '2024-01-15T17:00:00.000Z',
    pay_amount: 8, minutes_difference: 480, category: 'shift', date: '2024-01-15'
  },
  {
    shift_id: '2', user_id: 'user_2', user_name: 'Jack Foster', location_id: 'site_a', team_id: undefined,
    scheduled_start: '2024-01-15T14:00:00.000Z', actual_clock_in: '2024-01-15T13:55:00.000Z',
    scheduled_end: '2024-01-15T22:00:00.000Z', actual_clock_out: '2024-01-15T22:00:00.000Z',
    pay_amount: 8, minutes_difference: 480, category: 'shift', date: '2024-01-15'
  },
  {
    shift_id: '3', user_id: 'user_3', user_name: 'Rob Smith', location_id: 'site_b', team_id: undefined,
    scheduled_start: '2024-01-16T10:00:00.000Z', actual_clock_in: '2024-01-16T10:05:00.000Z',
    scheduled_end: '2024-01-16T18:00:00.000Z', actual_clock_out: '2024-01-16T18:00:00.000Z',
    pay_amount: 8, minutes_difference: 480, category: 'shift', date: '2024-01-16'
  },
  {
    shift_id: '4', user_id: 'user_4', user_name: 'Sarah Wilson', location_id: 'site_b', team_id: undefined,
    scheduled_start: '2024-01-14T09:00:00.000Z', actual_clock_in: undefined,
    scheduled_end: '2024-01-14T17:00:00.000Z', actual_clock_out: undefined,
    pay_amount: 0, minutes_difference: 0, category: 'absence', date: '2024-01-14'
  }
];

const mockWorkItems = [
  {
    work_id: '1', user_id: 'user_1', user_name: 'Tiger Woods', location_id: 'site_a', team_id: undefined,
    started_at: '2024-01-15T10:00:00.000Z', completed_at: '2024-01-15T10:30:00.000Z',
    work_type: 'Kitchen Cleaning', status: 'Complete', issue_raised_time: undefined,
    minutes_difference: 30, date: '2024-01-15'
  },
  {
    work_id: '2', user_id: 'user_2', user_name: 'Jack Foster', location_id: 'site_a', team_id: undefined,
    started_at: '2024-01-15T15:00:00.000Z', completed_at: undefined,
    work_type: 'Inventory Count', status: 'In Progress', issue_raised_time: '2024-01-15T16:00:00.000Z',
    minutes_difference: 60, date: '2024-01-15'
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminRequest } = body;

    if (!adminRequest) {
      return NextResponse.json({
        error: 'adminRequest is required'
      }, { status: 400 });
    }

    console.log(`Testing dynamic admin request: "${adminRequest}"`);

    // Step 1: Parse the admin request
    const parsedRequest = await dynamicAggregationParser.parseAdminRequest(adminRequest);
    console.log(`Generated ${parsedRequest.plans.length} aggregation plans`);

    // Step 2: Process each aggregation plan
    const processedResults = parsedRequest.plans.map(plan => {
      return dynamicDataProcessor.processData(mockShifts, mockWorkItems, plan);
    });

    // Step 3: Format for AI analysis
    const formattedData = dynamicAnalysisFormatter.formatForAI(parsedRequest, processedResults);

    return NextResponse.json({
      success: true,
      originalRequest: adminRequest,
      parsedRequest,
      processedResults: processedResults.map(result => ({
        planId: result.plan.id,
        description: result.plan.description,
        groupCount: result.groups.length,
        totalRecords: result.totalRecords,
        overallMetrics: result.overallMetrics
      })),
      formattedForAI: formattedData,
      message: 'Dynamic aggregation system test completed successfully'
    });

  } catch (error) {
    console.error('Dynamic admin report test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Dynamic aggregation system test failed'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Dynamic Admin Report Test Endpoint',
    usage: 'POST with { "adminRequest": "your natural language request here" }',
    examples: [
      'I want to see clock-in performance across all sites',
      'Show me absence patterns and new issues this week',
      'Analyze completion rates by time of day across locations',
      'Compare weekend vs weekday performance by site'
    ]
  });
}