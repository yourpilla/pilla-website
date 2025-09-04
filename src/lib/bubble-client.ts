interface BubbleShift {
  shift_id: string;
  user_id: string | undefined;
  user_name: string | undefined;
  team_id: string | undefined;
  scheduled_start: string | undefined;
  scheduled_end: string | undefined;
  actual_clock_in: string | null | undefined;
  actual_clock_out: string | null | undefined;
  pay_amount: number;
  location_id: string | undefined;
  date: string;
}

interface BubbleWork {
  work_id: string;
  user_id: string | undefined;
  user_name: string | undefined;
  team_id: string | undefined;
  work_type: string | undefined;
  started_at: string | undefined;
  completed_at: string | null | undefined;
  status: string;
  date: string;
}

interface BubbleShiftsResponse {
  shifts: BubbleShift[];
}

interface BubbleWorkResponse {
  work_items: BubbleWork[];
}

interface BubbleApiResponse {
  response: {
    results: Record<string, unknown>[];
    count: number;
    remaining: number;
    cursor: number;
  };
}

interface BubbleShiftRaw {
  _id: string;
  user_id?: string;
  user_name?: string;
  team?: string;
  start_time?: string;
  scheduled_start?: string;
  scheduled_end?: string;
  actual_clock_in?: string;
  actual_clock_out?: string;
  pay_amount?: number;
  location_id?: string;
  [key: string]: unknown;
}

interface BubbleWorkRaw {
  _id: string;
  user_id?: string;
  user_name?: string;
  team?: string;
  started_at?: string;
  completed_at?: string;
  work_type?: string;
  status?: string;
  [key: string]: unknown;
}

interface FetchDataParams {
  startDate: string;
  endDate: string;
  teams: string[];
}

class BubbleClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.BUBBLE_API_ENDPOINT || 'https://yourpilla.com/version-test/api/1.1';
    this.apiKey = process.env.BUBBLE_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('BUBBLE_API_KEY not set - Bubble API calls will fail');
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    console.log(`Making Bubble API request to: ${url.toString()}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Bubble API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async fetchShifts(params: FetchDataParams): Promise<BubbleShiftsResponse> {
    // Convert date to proper ISO 8601 format with UTC timezone for Bubble Data API
    const weekStartISO = new Date(`${params.startDate}T00:00:00`).toISOString();
    const weekEndISO = new Date(`${params.endDate}T00:00:00`).toISOString();
    
    // Build Bubble Data API constraints
    const constraints = [
      {"key": "start time", "constraint_type": "greater than", "value": weekStartISO},
      {"key": "start time", "constraint_type": "less than", "value": weekEndISO},
      {"key": "team", "constraint_type": "in", "value": params.teams}
    ];

    const queryParams = {
      constraints: JSON.stringify(constraints)
    };

    const response = await this.makeRequest<BubbleApiResponse>('/obj/shift', queryParams);
    
    // Transform Bubble Data API response to our expected format
    return {
      shifts: response.response.results.map((shift) => ({
        shift_id: shift._id as string,
        user_id: shift.user as string | undefined,
        user_name: shift.user as string | undefined, // We'll need to resolve this from user ID
        team_id: shift.team as string | undefined,
        scheduled_start: shift["start time"] as string | undefined,
        scheduled_end: shift["end time"] as string | undefined,
        actual_clock_in: shift["start time"] as string | null | undefined, // Assuming no separate clock-in tracking
        actual_clock_out: shift["end time"] as string | null | undefined,
        pay_amount: (shift["total paid hours"] as number) || 0,
        location_id: shift.site as string | undefined,
        date: (shift["start time"] as string)?.split('T')[0] || '' // Extract date from ISO timestamp
      }))
    };
  }

  async fetchWork(params: FetchDataParams): Promise<BubbleWorkResponse> {
    // Convert date to proper ISO 8601 format with UTC timezone for Bubble Data API
    const weekStartISO = new Date(`${params.startDate}T00:00:00`).toISOString();
    const weekEndISO = new Date(`${params.endDate}T00:00:00`).toISOString();
    
    // Build Bubble Data API constraints
    const constraints = [
      {"key": "start", "constraint_type": "greater than", "value": weekStartISO},
      {"key": "start", "constraint_type": "less than", "value": weekEndISO},
      {"key": "team", "constraint_type": "in", "value": params.teams}
    ];

    const queryParams = {
      constraints: JSON.stringify(constraints)
    };

    const response = await this.makeRequest<BubbleApiResponse>('/obj/work', queryParams);
    
    // Transform Bubble Data API response to our expected format
    return {
      work_items: response.response.results.map((work) => ({
        work_id: work._id as string,
        user_id: work["Created By"] as string | undefined, // Using Created By as user reference
        user_name: work.Name as string | undefined, // Work item name, not user name
        team_id: work.team as string | undefined,
        work_type: work.template as string | undefined, // Template defines work type
        started_at: work.start as string | undefined,
        completed_at: work["finished time actual"] as string | null | undefined,
        status: (work.Status as string) || 'unknown',
        date: (work.start as string)?.split('T')[0] || '' // Extract date from ISO timestamp
      }))
    };
  }

  async fetchAllData(params: FetchDataParams): Promise<{
    shifts: BubbleShift[];
    workItems: BubbleWork[];
  }> {
    try {
      // Fetch both datasets in parallel
      const [shiftsResponse, workResponse] = await Promise.all([
        this.fetchShifts(params),
        this.fetchWork(params)
      ]);

      console.log(`Fetched ${shiftsResponse.shifts.length} shifts and ${workResponse.work_items.length} work items`);

      return {
        shifts: shiftsResponse.shifts,
        workItems: workResponse.work_items
      };
    } catch (error) {
      console.error('Error fetching data from Bubble:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const bubbleClient = new BubbleClient();

// Export types
export type { BubbleShift, BubbleWork, FetchDataParams };