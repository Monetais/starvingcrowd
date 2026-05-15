/**
 * Google Trends integration via google-trends-api (free, no key needed).
 * Returns interest over time = trend signal.
 */

// @ts-ignore — google-trends-api has no types
import googleTrends from "google-trends-api";

export interface TrendResult {
  direction: "rising" | "stable" | "falling";
  currentInterest: number; // 0-100
  averageInterest: number;
  growthPercent: number;
  timelineData: { date: string; value: number }[];
  relatedQueries: string[];
}

export async function getTrend(keyword: string): Promise<TrendResult> {
  try {
    // Interest over time (last 12 months)
    const interestRaw = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      geo: "DE",
      category: 0,
    });

    const interestData = JSON.parse(interestRaw);
    const timeline = interestData.default?.timelineData || [];

    const values: number[] = timeline.map((d: any) => d.value?.[0] ?? 0);

    if (values.length === 0) {
      return {
        direction: "stable",
        currentInterest: 0,
        averageInterest: 0,
        growthPercent: 0,
        timelineData: [],
        relatedQueries: []
      };
    }

    // Calculate trend direction
    const recent = values.slice(-4); // last 4 data points
    const older = values.slice(0, 4); // first 4 data points
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length || 1;
    const growthPercent = Math.round(((recentAvg - olderAvg) / olderAvg) * 100);

    const direction = growthPercent > 15 ? "rising" : growthPercent < -15 ? "falling" : "stable";
    const currentInterest = values[values.length - 1] || 0;
    const averageInterest = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

    const timelineData = timeline.slice(-12).map((d: any) => ({
      date: d.formattedTime || "",
      value: d.value?.[0] ?? 0
    }));

    // Related queries
    let relatedQueries: string[] = [];
    try {
      const relatedRaw = await googleTrends.relatedQueries({
        keyword,
        geo: "DE",
        category: 0,
      });
      const relatedData = JSON.parse(relatedRaw);
      const top = relatedData.default?.rankedList?.[0]?.rankedKeyword || [];
      relatedQueries = top.slice(0, 8).map((q: any) => q.query);
    } catch {
      // Related queries can fail, not critical
    }

    return {
      direction,
      currentInterest,
      averageInterest,
      growthPercent,
      timelineData,
      relatedQueries
    };
  } catch (error) {
    // Google Trends can rate-limit, return neutral result
    return {
      direction: "stable",
      currentInterest: 50,
      averageInterest: 50,
      growthPercent: 0,
      timelineData: [],
      relatedQueries: []
    };
  }
}
