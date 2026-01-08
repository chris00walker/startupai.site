/**
 * API Client for StartupAI Marketing Site
 *
 * Provides type-safe access to public APIs for activity feed and metrics.
 */

// =============================================================================
// Types
// =============================================================================

export interface PublicActivity {
  id: string;
  agentName: string;
  agentColor: string;
  activity: string;
  timestamp: string;
  metric?: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface FounderMetric {
  id: string;
  name: string;
  activitiesCount: number;
  recentActivity?: string;
}

export interface ActivityResponse {
  ok: boolean;
  activities: PublicActivity[];
  count: number;
  timestamp: string;
  error?: string;
}

export interface MetricsResponse {
  ok: boolean;
  metrics: DashboardMetric[];
  founderMetrics: FounderMetric[];
  summary: {
    totalActivities: number;
    totalValidations: number;
    thisMonthActivities: number;
    thisMonthValidations: number;
  };
  timestamp: string;
  error?: string;
}

// =============================================================================
// API Configuration
// =============================================================================

const API_BASE = '/.netlify/functions';

// =============================================================================
// API Functions
// =============================================================================

/**
 * Fetch public activity feed
 *
 * @param options.limit - Number of activities to return (default: 10, max: 50)
 * @param options.founder - Optional filter by founder ID (sage, forge, pulse, compass, guardian, ledger)
 */
export async function fetchActivities(options?: {
  limit?: number;
  founder?: string;
}): Promise<ActivityResponse> {
  const params = new URLSearchParams();

  if (options?.limit) {
    params.set('limit', String(options.limit));
  }
  if (options?.founder) {
    params.set('founder', options.founder);
  }

  const url = `${API_BASE}/public-activity${params.toString() ? `?${params.toString()}` : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[api] Failed to fetch activities:', error);
    return {
      ok: false,
      activities: [],
      count: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch public metrics for dashboard
 */
export async function fetchMetrics(): Promise<MetricsResponse> {
  const url = `${API_BASE}/public-metrics`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[api] Failed to fetch metrics:', error);
    return {
      ok: false,
      metrics: [],
      founderMetrics: [],
      summary: {
        totalActivities: 0,
        totalValidations: 0,
        thisMonthActivities: 0,
        thisMonthValidations: 0,
      },
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// =============================================================================
// React Hooks
// =============================================================================

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for fetching and caching activity feed data
 */
export function useActivities(options?: {
  limit?: number;
  founder?: string;
  refreshInterval?: number;
}) {
  const [data, setData] = useState<ActivityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchActivities({
        limit: options?.limit,
        founder: options?.founder,
      });

      if (result.ok) {
        setData(result);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch activities');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [options?.limit, options?.founder]);

  useEffect(() => {
    fetchData();

    // Set up refresh interval if specified
    if (options?.refreshInterval && options.refreshInterval > 0) {
      const intervalId = setInterval(fetchData, options.refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, options?.refreshInterval]);

  return {
    activities: data?.activities || [],
    count: data?.count || 0,
    loading,
    error,
    refresh: fetchData,
  };
}

/**
 * Hook for fetching and caching metrics data
 */
export function useMetrics(options?: { refreshInterval?: number }) {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchMetrics();

      if (result.ok) {
        setData(result);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch metrics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Set up refresh interval if specified
    if (options?.refreshInterval && options.refreshInterval > 0) {
      const intervalId = setInterval(fetchData, options.refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, options?.refreshInterval]);

  return {
    metrics: data?.metrics || [],
    founderMetrics: data?.founderMetrics || [],
    summary: data?.summary || null,
    loading,
    error,
    refresh: fetchData,
  };
}
