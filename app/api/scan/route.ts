import { NextRequest, NextResponse } from "next/server";
import { getAutocompleteSuggestions, getExpandedSuggestions } from "@/lib/google-autocomplete";
import { getTrend } from "@/lib/google-trends";
import { calculateScore } from "@/lib/scoring";
import { getMultiPlatformData } from "@/lib/multi-autocomplete";
import { getGoogleResultCount, getWikipediaPresence } from "@/lib/competition";

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
    const [autocomplete, expandedSuggestions, trend, platforms, googleResults, wikipedia] = await Promise.all([
      getAutocompleteSuggestions(keyword),
      getExpandedSuggestions(keyword),
      getTrend(keyword),
      getMultiPlatformData(keyword),
      getGoogleResultCount(keyword),
      getWikipediaPresence(keyword)
    ]);

    // Calculate opportunity score with REAL competition data
    const score = calculateScore(
      autocomplete,
      expandedSuggestions.length,
      trend,
      {
        googleResults,
        wikipedia: { exists: wikipedia.exists, length: wikipedia.length },
        amazonCount: platforms.amazon.length,
        youtubeCount: platforms.youtube.length,
        redditPosts: platforms.reddit,
        commercialSignalCount: autocomplete.intentKeywords.length,
        expandedKeywordCount: expandedSuggestions.length
      }
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
      competition: {
        googleResults,
        wikipedia: wikipedia.exists ? wikipedia.extract : null,
        level: score.competitionLabel,
        reasons: score.competitionReasons
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
