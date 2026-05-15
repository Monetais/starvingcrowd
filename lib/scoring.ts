/**
 * Kaching OS Opportunity Score Calculator
 *
 * Combines free data signals into a 0-100 score:
 * - Demand (40%): autocomplete suggestions count + expanded reach
 * - Trend (25%): Google Trends direction + growth
 * - Competition (20%): inverse of search results density
 * - Intent (15%): commercial keywords in suggestions
 */

import type { AutocompleteResult } from "./google-autocomplete";
import type { TrendResult } from "./google-trends";

export interface OpportunityScore {
  total: number;        // 0-100
  demand: number;       // 0-100
  trend: number;        // 0-100
  competition: number;  // 0-100
  intent: number;       // 0-100
  label: string;        // "Ausgezeichnet" | "Stark" | "Solide" | "Schwach"
  demandLabel: string;
  trendLabel: string;
  competitionLabel: string;
  summary: string;
}

export function calculateScore(
  autocomplete: AutocompleteResult,
  expandedCount: number,
  trend: TrendResult,
  searchResultCount?: number
): OpportunityScore {
  // ── Demand Score (0-100) ──
  // More suggestions = more search demand
  const suggestionScore = Math.min(100, autocomplete.count * 10); // 10 suggestions = 100
  const expandedScore = Math.min(100, (expandedCount / 50) * 100); // 50 expanded = 100
  const demand = Math.round(suggestionScore * 0.5 + expandedScore * 0.5);

  // ── Trend Score (0-100) ──
  let trendBase = 50; // neutral
  if (trend.direction === "rising") {
    trendBase = Math.min(100, 60 + Math.abs(trend.growthPercent) * 0.5);
  } else if (trend.direction === "falling") {
    trendBase = Math.max(10, 40 - Math.abs(trend.growthPercent) * 0.3);
  }
  const trendInterestBonus = trend.currentInterest > 70 ? 10 : trend.currentInterest > 40 ? 5 : 0;
  const trendScore = Math.min(100, Math.round(trendBase + trendInterestBonus));

  // ── Competition Score (0-100, higher = less competition = better) ──
  let competition = 65; // default: moderate
  if (searchResultCount !== undefined) {
    // Fewer results = less competition = higher score
    if (searchResultCount < 100_000) competition = 90;
    else if (searchResultCount < 500_000) competition = 75;
    else if (searchResultCount < 2_000_000) competition = 55;
    else if (searchResultCount < 10_000_000) competition = 35;
    else competition = 20;
  } else {
    // Heuristic: if autocomplete has few specific suggestions, competition is probably lower
    competition = autocomplete.count >= 8 ? 50 : 70;
  }

  // ── Intent Score (0-100) ──
  const intentBase = autocomplete.hasCommercialIntent ? 70 : 30;
  const intentBonus = Math.min(30, autocomplete.intentKeywords.length * 10);
  const intent = Math.min(100, intentBase + intentBonus);

  // ── Total Score ──
  const total = Math.round(
    demand * 0.40 +
    trendScore * 0.25 +
    competition * 0.20 +
    intent * 0.15
  );

  // Labels
  const label = total >= 80 ? "Ausgezeichnet" : total >= 65 ? "Stark" : total >= 45 ? "Solide" : "Schwach";
  const demandLabel = demand >= 75 ? "Hoch" : demand >= 45 ? "Mittel" : "Niedrig";
  const trendLabel = trend.direction === "rising" ? `Steigend (+${trend.growthPercent}%)` : trend.direction === "falling" ? `Fallend (${trend.growthPercent}%)` : "Stabil";
  const competitionLabel = competition >= 70 ? "Niedrig" : competition >= 45 ? "Mittel" : "Hoch";

  // Summary
  const parts: string[] = [];
  if (demand >= 65) parts.push("starke Nachfrage");
  if (trendScore >= 65) parts.push("steigender Trend");
  if (competition >= 65) parts.push("wenig Konkurrenz");
  if (intent >= 65) parts.push("Kaufintent erkannt");
  const summary = parts.length > 0
    ? `Diese Nische zeigt ${parts.join(", ")}.`
    : "Moderate Signale. Tiefere Analyse empfohlen.";

  return {
    total,
    demand,
    trend: trendScore,
    competition,
    intent,
    label,
    demandLabel,
    trendLabel,
    competitionLabel,
    summary
  };
}
