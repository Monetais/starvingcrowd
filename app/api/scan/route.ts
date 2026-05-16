import { NextRequest, NextResponse } from "next/server";
import { getAutocompleteSuggestions, getExpandedSuggestions } from "@/lib/google-autocomplete";
import { getTrend } from "@/lib/google-trends";
import { calculateScore } from "@/lib/scoring";
import { getMultiPlatformData } from "@/lib/multi-autocomplete";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const keyword = (body.keyword || "").trim();

    if (!keyword) {
      return NextResponse.json({ error: "Keyword ist erforderlich." }, { status: 400 });
    }

    if (keyword.length > 100) {
      return NextResponse.json({ error: "Keyword zu lang." }, { status: 400 });
    }

    // Run all data fetches in parallel
    const [autocomplete, expandedSuggestions, trend, platforms] = await Promise.all([
      getAutocompleteSuggestions(keyword),
      getExpandedSuggestions(keyword),
      getTrend(keyword),
      getMultiPlatformData(keyword)
    ]);

    // Calculate opportunity score
    const score = calculateScore(
      autocomplete,
      expandedSuggestions.length,
      trend
    );

    // Build response
    const result = {
      keyword,
      score,
      autocomplete: {
        suggestions: autocomplete.suggestions,
        count: autocomplete.count,
        commercialIntent: autocomplete.hasCommercialIntent,
        intentSignals: autocomplete.intentKeywords
      },
      trend: {
        direction: trend.direction,
        currentInterest: trend.currentInterest,
        averageInterest: trend.averageInterest,
        growthPercent: trend.growthPercent,
        timeline: trend.timelineData,
        relatedQueries: trend.relatedQueries
      },
      platforms: {
        amazon: platforms.amazon,
        youtube: platforms.youtube,
        reddit: platforms.reddit
      },
      expandedKeywords: expandedSuggestions.slice(0, 20),
      scannedAt: new Date().toISOString()
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: "Scan fehlgeschlagen. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
