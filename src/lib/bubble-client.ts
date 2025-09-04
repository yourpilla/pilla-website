interface BubbleShift {
  shift_id: string;
  user_id: string;
  user_name: string;
  team_id: string;
  scheduled_start: string;
  scheduled_end: string;
  actual_clock_in: string | null;
  actual_clock_out: string | null;
  pay_amount: number;
  location_id: string;
  date: string;
}

interface BubbleWork {
  work_id: string;
  user_id: string;
  user_name: string;
  team_id: string;
  work_type: string;
  started_at: string;
  completed_at: string | null;
  status: string;
  date: string;
}

interface BubbleShiftsResponse {
  shifts: BubbleShift[];
}

interface BubbleWorkResponse {
  work_items: BubbleWork[];
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
    this.baseUrl = process.env.BUBBLE_API_URL || 'https://yourpilla.com/version-test/api/1.1';
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
    const queryParams = {
      start_date: params.startDate,
      end_date: params.endDate,
      team_ids: params.teams.join(','), // Convert array to comma-separated string
    };

    return this.makeRequest<BubbleShiftsResponse>('/api/data/shifts', queryParams);
  }

  async fetchWork(params: FetchDataParams): Promise<BubbleWorkResponse> {
    const queryParams = {
      start_date: params.startDate,
      end_date: params.endDate,
      team_ids: params.teams.join(','), // Convert array to comma-separated string
    };

    return this.makeRequest<BubbleWorkResponse>('/api/data/work', queryParams);
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