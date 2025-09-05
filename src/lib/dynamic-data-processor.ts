import { BubbleShift, BubbleWork } from './bubble-client';
import { AggregationPlan } from './dynamic-aggregation-parser';

export interface ProcessedDataGroup {
  groupKey: string;
  groupValues: Record<string, string>;
  metrics: Record<string, number>;
  sampleData: {
    type: string;
    items: Array<{
      user_name?: string;
      details: string;
      value?: number;
    }>;
  }[];
  rawCount: number;
}

export interface ProcessedResult {
  plan: AggregationPlan;
  groups: ProcessedDataGroup[];
  overallMetrics: Record<string, number>;
  totalRecords: number;
}

class DynamicDataProcessor {
  
  processData(
    shifts: BubbleShift[], 
    workItems: BubbleWork[], 
    plan: AggregationPlan
  ): ProcessedResult {
    console.log(`Processing data for plan: ${plan.id} - ${plan.description}`);
    
    // Combine all data for processing
    const allData = [
      ...shifts.map(s => ({ ...s, dataType: 'shift' as const })),
      ...workItems.map(w => ({ ...w, dataType: 'work' as const }))
    ];
    
    console.log(`Total records to process: ${allData.length}`);
    
    // Apply filters
    const filteredData = this.applyFilters(allData, plan.filters);
    console.log(`After filtering: ${filteredData.length} records`);
    
    // Group the data
    const groups = this.groupData(filteredData, plan.groupBy);
    console.log(`Created ${Object.keys(groups).length} groups`);
    
    // Calculate metrics for each group
    const processedGroups: ProcessedDataGroup[] = Object.entries(groups).map(([groupKey, groupData]) => {
      const metrics = this.calculateMetrics(groupData, plan.metrics);
      const samples = this.generateSamples(groupData, plan.samples);
      
      return {
        groupKey,
        groupValues: this.parseGroupKey(groupKey, plan.groupBy),
        metrics,
        sampleData: samples,
        rawCount: groupData.length
      };
    });
    
    // Sort groups if specified
    if (plan.sortBy && processedGroups.length > 0) {
      processedGroups.sort((a, b) => {
        const aVal = a.metrics[plan.sortBy!] || 0;
        const bVal = b.metrics[plan.sortBy!] || 0;
        return bVal - aVal; // Descending by default
      });
    }
    
    // Apply limit if specified
    const limitedGroups = plan.limit ? processedGroups.slice(0, plan.limit) : processedGroups;
    
    // Calculate overall metrics
    const overallMetrics = this.calculateMetrics(filteredData, plan.metrics);
    
    return {
      plan,
      groups: limitedGroups,
      overallMetrics,
      totalRecords: filteredData.length
    };
  }

  private applyFilters(data: (BubbleShift | BubbleWork)[], filters: string[]): (BubbleShift | BubbleWork)[] {
    return data.filter(record => {
      return filters.every(filter => this.matchesFilter(record, filter));
    });
  }

  private matchesFilter(record: BubbleShift | BubbleWork, filter: string): boolean {
    const now = new Date();
    
    // Time-based filters
    if (filter === 'last_7_days') {
      const recordDate = this.getRecordDate(record);
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return recordDate >= sevenDaysAgo;
    }
    
    if (filter === 'last_30_days') {
      const recordDate = this.getRecordDate(record);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return recordDate >= thirtyDaysAgo;
    }
    
    // Category filters
    if (filter.startsWith('category=')) {
      const targetCategory = filter.split('=')[1];
      return this.isShift(record) ? record.category === targetCategory : false;
    }
    
    // Issue filters
    if (filter === 'has_issues') {
      return !this.isShift(record) ? record.issue_raised_time != null : false;
    }
    
    if (filter === 'no_issues') {
      return !this.isShift(record) ? record.issue_raised_time == null : true;
    }
    
    // Performance filters
    if (filter === 'high_performers') {
      const lateness = this.calculateLateness(record);
      return lateness <= 5; // 5 minutes or less
    }
    
    if (filter === 'low_performers') {
      const lateness = this.calculateLateness(record);
      return lateness > 15; // More than 15 minutes late
    }
    
    return true; // Unknown filters pass through
  }

  private groupData(data: (BubbleShift | BubbleWork)[], groupBy: string[]): Record<string, (BubbleShift | BubbleWork)[]> {
    const groups: Record<string, (BubbleShift | BubbleWork)[]> = {};
    
    for (const record of data) {
      const groupKey = this.generateGroupKey(record, groupBy);
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      
      groups[groupKey].push(record);
    }
    
    return groups;
  }

  private generateGroupKey(record: BubbleShift | BubbleWork, groupBy: string[]): string {
    return groupBy.map(field => {
      if (field === 'day_of_week') {
        const date = this.getRecordDate(record);
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
      }
      
      if (field === 'time_of_day') {
        const date = this.getRecordDate(record);
        const hour = date.getHours();
        if (hour < 12) return 'Morning';
        if (hour < 17) return 'Afternoon';
        return 'Evening';
      }
      
      return this.getRecordProperty(record, field) || 'Unknown';
    }).join('|');
  }

  private parseGroupKey(groupKey: string, groupBy: string[]): Record<string, string> {
    const values = groupKey.split('|');
    const result: Record<string, string> = {};
    
    groupBy.forEach((field, index) => {
      result[field] = values[index] || 'Unknown';
    });
    
    return result;
  }

  private calculateMetrics(data: (BubbleShift | BubbleWork)[], metrics: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    
    for (const metric of metrics) {
      result[metric] = this.calculateSingleMetric(data, metric);
    }
    
    return result;
  }

  private calculateSingleMetric(data: (BubbleShift | BubbleWork)[], metric: string): number {
    if (data.length === 0) return 0;
    
    switch (metric) {
      case 'avg_lateness':
        const shifts = data.filter(record => this.isShift(record)) as BubbleShift[];
        if (shifts.length === 0) return 0;
        const latenesses = shifts.map(shift => this.calculateShiftLateness(shift));
        return latenesses.reduce((sum, val) => sum + val, 0) / latenesses.length;
        
      case 'on_time_rate':
        const shiftsForOnTime = data.filter(record => this.isShift(record)) as BubbleShift[];
        if (shiftsForOnTime.length === 0) return 100;
        const onTimeCount = shiftsForOnTime.filter(shift => this.calculateShiftLateness(shift) <= 5).length;
        return (onTimeCount / shiftsForOnTime.length) * 100;
        
      case 'absence_rate':
        const shiftsForAbsence = data.filter(record => this.isShift(record)) as BubbleShift[];
        if (shiftsForAbsence.length === 0) return 0;
        const absences = shiftsForAbsence.filter(shift => 
          shift.category === 'absence' || shift.category === 'holiday'
        ).length;
        return (absences / shiftsForAbsence.length) * 100;
        
      case 'completion_rate':
        const workItems = data.filter(record => !this.isShift(record)) as BubbleWork[];
        if (workItems.length === 0) return 100;
        const completed = workItems.filter(work => 
          work.status && work.status.toLowerCase().includes('complete')
        ).length;
        return (completed / workItems.length) * 100;
        
      case 'issue_count':
        const workForIssues = data.filter(record => !this.isShift(record)) as BubbleWork[];
        return workForIssues.filter(work => work.issue_raised_time).length;
        
      case 'total_hours':
        return data.reduce((sum, record) => sum + (record.minutes_difference || 0), 0) / 60;
        
      default:
        return data.length; // Default to count
    }
  }

  private calculateLateness(record: BubbleShift | BubbleWork): number {
    if (this.isShift(record)) {
      return this.calculateShiftLateness(record);
    }
    return 0; // Work items don't have lateness
  }
  
  private calculateShiftLateness(shift: BubbleShift): number {
    if (!shift.scheduled_start || !shift.actual_clock_in) return 0;
    
    const scheduled = new Date(shift.scheduled_start);
    const actual = new Date(shift.actual_clock_in);
    
    return Math.max(0, (actual.getTime() - scheduled.getTime()) / (1000 * 60));
  }

  private generateSamples(data: (BubbleShift | BubbleWork)[], sampleTypes: string[]): Array<{
    type: string;
    items: Array<{
      user_name?: string;
      details: string;
      value?: number;
    }>;
  }> {
    const samples: Array<{
      type: string;
      items: Array<{
        user_name?: string;
        details: string;
        value?: number;
      }>;
    }> = [];
    
    for (const sampleType of sampleTypes) {
      const items = this.generateSampleItems(data, sampleType);
      samples.push({
        type: sampleType,
        items
      });
    }
    
    return samples;
  }

  private generateSampleItems(data: (BubbleShift | BubbleWork)[], sampleType: string): Array<{
    user_name?: string;
    details: string;
    value?: number;
  }> {
    switch (sampleType) {
      case 'worst_performers':
        return data
          .map(record => ({
            user_name: record.user_name,
            lateness: this.calculateLateness(record),
            details: this.formatRecordDetails(record)
          }))
          .sort((a, b) => b.lateness - a.lateness)
          .slice(0, 3)
          .map(item => ({
            user_name: item.user_name,
            details: item.details,
            value: item.lateness
          }));
          
      case 'best_performers':
        return data
          .map(record => ({
            user_name: record.user_name,
            lateness: this.calculateLateness(record),
            details: this.formatRecordDetails(record)
          }))
          .sort((a, b) => a.lateness - b.lateness)
          .slice(0, 3)
          .map(item => ({
            user_name: item.user_name,
            details: item.details,
            value: item.lateness
          }));
          
      case 'recent_examples':
        return data
          .sort((a, b) => {
            const dateA = this.getRecordDate(a);
            const dateB = this.getRecordDate(b);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 3)
          .map(record => ({
            user_name: record.user_name,
            details: this.formatRecordDetails(record)
          }));
          
      case 'pattern_examples':
        // Group by user and find patterns
        const userGroups: Record<string, (BubbleShift | BubbleWork)[]> = {};
        data.forEach(record => {
          const userName = record.user_name || 'Unknown';
          if (!userGroups[userName]) userGroups[userName] = [];
          userGroups[userName].push(record);
        });
        
        return Object.entries(userGroups)
          .filter(([, records]) => records.length >= 2) // Users with multiple records
          .slice(0, 3)
          .map(([userName, records]) => ({
            user_name: userName,
            details: `${records.length} records showing pattern: ${this.identifyPattern(records)}`
          }));
          
      default:
        return data.slice(0, 3).map(record => ({
          user_name: record.user_name,
          details: this.formatRecordDetails(record)
        }));
    }
  }

  private formatRecordDetails(record: BubbleShift | BubbleWork): string {
    if (this.isShift(record)) {
      const lateness = this.calculateShiftLateness(record);
      const dateStr = record.date || record.scheduled_start || new Date().toISOString();
      const date = new Date(dateStr).toLocaleDateString();
      return `${date}: ${lateness > 0 ? `${Math.round(lateness)}min late` : 'On time'}`;
    } else {
      const dateStr = record.date || record.started_at || new Date().toISOString();
      const date = new Date(dateStr).toLocaleDateString();
      const status = record.status || 'Unknown status';
      return `${date}: ${record.work_type || 'Task'} - ${status}`;
    }
  }

  private identifyPattern(records: (BubbleShift | BubbleWork)[]): string {
    const shifts = records.filter(r => this.isShift(r)) as BubbleShift[];
    if (shifts.length === 0) return 'No shift data';
    
    const latenesses = shifts.map(shift => this.calculateShiftLateness(shift));
    const avgLateness = latenesses.reduce((sum, val) => sum + val, 0) / latenesses.length;
    
    if (avgLateness > 15) return 'Consistently late';
    if (avgLateness < 2) return 'Consistently punctual';
    return 'Mixed performance';
  }

  private isShift(record: BubbleShift | BubbleWork): record is BubbleShift {
    return 'scheduled_start' in record;
  }

  private getRecordDate(record: BubbleShift | BubbleWork): Date {
    if (this.isShift(record)) {
      const dateStr = record.date || record.scheduled_start || new Date().toISOString();
      return new Date(dateStr);
    } else {
      const dateStr = record.date || record.started_at || new Date().toISOString();
      return new Date(dateStr);
    }
  }
  
  private getRecordProperty(record: BubbleShift | BubbleWork, property: string): string | number | undefined {
    // Safe property access for union types
    return (record as unknown as Record<string, string | number | undefined>)[property];
  }
}

// Export singleton instance
export const dynamicDataProcessor = new DynamicDataProcessor();