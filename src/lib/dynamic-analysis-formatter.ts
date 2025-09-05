import { ProcessedResult, ProcessedDataGroup } from './dynamic-data-processor';
import { ParsedRequest } from './dynamic-aggregation-parser';

class DynamicAnalysisFormatter {
  
  formatForAI(parsedRequest: ParsedRequest, processedResults: ProcessedResult[]): string {
    let analysis = `DYNAMIC COMPANY ANALYSIS REPORT\n\n`;
    
    // Overall context
    analysis += `ANALYSIS FOCUS: ${parsedRequest.overallFocus}\n`;
    analysis += `ANALYSIS TYPE: ${parsedRequest.analysisType.toUpperCase()}\n`;
    analysis += `NUMBER OF ANALYSIS DIMENSIONS: ${processedResults.length}\n\n`;
    
    // Process each result
    processedResults.forEach((result, index) => {
      analysis += this.formatSingleResult(result, index + 1);
      analysis += `\n`;
    });
    
    // Add summary statistics
    analysis += this.formatOverallSummary(processedResults);
    
    return analysis;
  }

  private formatSingleResult(result: ProcessedResult, sectionNumber: number): string {
    let section = `ANALYSIS ${sectionNumber}: ${result.plan.description.toUpperCase()}\n`;
    section += `Total Records Analyzed: ${result.totalRecords}\n`;
    section += `Grouping: ${result.plan.groupBy.join(', ')}\n`;
    section += `Metrics: ${result.plan.metrics.join(', ')}\n\n`;
    
    // Overall metrics for this analysis
    if (Object.keys(result.overallMetrics).length > 0) {
      section += `OVERALL METRICS:\n`;
      Object.entries(result.overallMetrics).forEach(([metric, value]) => {
        section += `- ${this.formatMetricName(metric)}: ${this.formatMetricValue(metric, value)}\n`;
      });
      section += `\n`;
    }
    
    // Group-by-group breakdown
    if (result.groups.length > 0) {
      section += `BREAKDOWN BY ${result.plan.groupBy.map(g => g.toUpperCase()).join(' & ')}:\n`;
      
      result.groups.forEach(group => {
        section += this.formatGroupData(group, result.plan.groupBy);
      });
    } else {
      section += `No data found matching the specified criteria.\n`;
    }
    
    return section;
  }

  private formatGroupData(group: ProcessedDataGroup, groupBy: string[]): string {
    let groupSection = '';
    
    // Group header
    const groupTitle = groupBy.map(field => {
      const value = group.groupValues[field];
      return `${this.formatFieldName(field)}: ${value}`;
    }).join(', ');
    
    groupSection += `\n• ${groupTitle} (${group.rawCount} records)\n`;
    
    // Metrics for this group
    Object.entries(group.metrics).forEach(([metric, value]) => {
      groupSection += `  - ${this.formatMetricName(metric)}: ${this.formatMetricValue(metric, value)}\n`;
    });
    
    // Sample data
    group.sampleData.forEach(sample => {
      if (sample.items.length > 0) {
        groupSection += `  - ${this.formatSampleType(sample.type)}:\n`;
        sample.items.forEach(item => {
          const userName = item.user_name ? `${item.user_name}: ` : '';
          const value = item.value !== undefined ? ` (${this.formatSampleValue(item.value)})` : '';
          groupSection += `    * ${userName}${item.details}${value}\n`;
        });
      }
    });
    
    return groupSection;
  }

  private formatOverallSummary(processedResults: ProcessedResult[]): string {
    let summary = `CROSS-ANALYSIS SUMMARY:\n`;
    
    const totalRecords = processedResults.reduce((sum, result) => sum + result.totalRecords, 0);
    summary += `- Total records analyzed across all dimensions: ${totalRecords}\n`;
    
    const analysisTypes = processedResults.map(r => r.plan.description).join(', ');
    summary += `- Analysis dimensions covered: ${analysisTypes}\n`;
    
    // Find common patterns across analyses
    const commonMetrics = this.findCommonMetrics(processedResults);
    if (commonMetrics.length > 0) {
      summary += `- Metrics available for comparison: ${commonMetrics.join(', ')}\n`;
    }
    
    return summary;
  }

  private findCommonMetrics(processedResults: ProcessedResult[]): string[] {
    if (processedResults.length === 0) return [];
    
    const firstResultMetrics = new Set(Object.keys(processedResults[0].overallMetrics));
    
    return processedResults.slice(1).reduce((common, result) => {
      const currentMetrics = new Set(Object.keys(result.overallMetrics));
      return common.filter(metric => currentMetrics.has(metric));
    }, Array.from(firstResultMetrics));
  }

  private formatFieldName(field: string): string {
    const fieldNames: Record<string, string> = {
      'location_id': 'Site',
      'team_id': 'Team',
      'user_name': 'Employee',
      'day_of_week': 'Day of Week',
      'time_of_day': 'Time Period',
      'category': 'Shift Type',
      'work_type': 'Work Type'
    };
    
    return fieldNames[field] || field.replace('_', ' ').toUpperCase();
  }

  private formatMetricName(metric: string): string {
    const metricNames: Record<string, string> = {
      'avg_lateness': 'Average Lateness',
      'on_time_rate': 'On-Time Rate',
      'absence_rate': 'Absence Rate',
      'completion_rate': 'Completion Rate',
      'issue_count': 'Issues Raised',
      'total_hours': 'Total Hours'
    };
    
    return metricNames[metric] || metric.replace('_', ' ').toUpperCase();
  }

  private formatMetricValue(metric: string, value: number): string {
    if (metric.includes('rate') || metric.includes('percentage')) {
      return `${value.toFixed(1)}%`;
    }
    
    if (metric === 'avg_lateness') {
      return `${value.toFixed(1)} minutes`;
    }
    
    if (metric === 'total_hours') {
      return `${value.toFixed(1)} hours`;
    }
    
    if (Number.isInteger(value)) {
      return value.toString();
    }
    
    return value.toFixed(2);
  }

  private formatSampleType(sampleType: string): string {
    const sampleNames: Record<string, string> = {
      'worst_performers': 'Needs Attention',
      'best_performers': 'Top Performers',
      'recent_examples': 'Recent Examples',
      'pattern_examples': 'Pattern Examples'
    };
    
    return sampleNames[sampleType] || sampleType.replace('_', ' ').toUpperCase();
  }

  private formatSampleValue(value: number): string {
    if (value === 0) return 'On time';
    return `${Math.round(value)}min late`;
  }
}

// Export singleton instance
export const dynamicAnalysisFormatter = new DynamicAnalysisFormatter();