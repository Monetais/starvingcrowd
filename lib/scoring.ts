/**
 * Kaching OS Opportunity Score Calculator v2
 *
 * HONEST scoring that actually helps founders make decisions.
 * Higher score = better opportunity (high demand + low competition + rising trend + buying intent)
 *
 * Components:
 * - Demand (30%): autocomplete volume + expanded reach
 * - Competition (30%): Google results + platform saturation + Wikipedia (INVERTED - less competition = higher score)
 * - Trend (20%): Google Trends direction + growth
 * - Intent (20%): commercial keywords + Amazon/buying signals
 */

import type { AutocompleteResult } from "./google-autocomplete";
import type { TrendResult } from "./google-trends";

export interface CompetitionInput {
  googleResults: number;
  wikipedia: { exists: boolean; length: number };
  amazonCount: number;
  youtubeCount: number;
  redditPosts: { score: number }[];
  commercialSignalCount: number;
  expandedKeywordCount: number;
}

export interface OpportunityScore {
  total: number;
  demand: number;
  trend: number;
  competition: number;     // 0-100: HIGHER = LESS competition (better for founders)
  competitionRaw: number;  // 0-100: raw competition level (higher = more competitive)
  intent: number;
  label: string;
  demandLabel: string;
  trendLabel: string;
  competitionLabel: string;
  summary: string;
  competitionReasons: string[];
}

export function calculateScore(
  autocomplete: AutocompleteResult,
  expandedCount: number,
  trend: TrendResult,
  competitionInput?: CompetitionInput
): OpportunityScore {

  // ── Demand Score (0-100) ──
  // How much are people searching for this?
  const suggestionScore = Math.min(100, autocomplete.count * 10);
  const expandedScore = Math.min(100, (expandedCount / 50) * 100);
  const demand = Math.round(suggestionScore * 0.5 + expandedScore * 0.5);

  // ── Trend Score (0-100) ──
  let trendBase = 50;
  if (trend.direction === "rising") {
    trendBase = Math.min(95, 60 + Math.abs(trend.growthPercent) * 0.5);
  } else if (trend.direction === "falling") {
    trendBase = Math.max(10, 40 - Math.abs(trend.growthPercent) * 0.4);
  }
  const trendInterestBonus = trend.currentInterest > 70 ? 10 : trend.currentInterest > 40 ? 5 : 0;
  const trendScore = Math.min(100, Math.round(trendBase + trendInterestBonus));

  // ── Competition Score (0-100, HIGHER = LESS competition = BETTER) ──
  let competitionRaw = 50; // default moderate
  let competitionReasons: string[] = [];

  if (competitionInput) {
    const { analyzeCompetition } = require("./competition");
    const analysis = analyzeCompetition(
      competitionInput.googleResults,
      competitionInput.wikipedia,
      competitionInput.amazonCount,
      competitionInput.youtubeCount,
      competitionInput.redditPosts,
      autocomplete.count,
      competitionInput.commercialSignalCount,
      competitionInput.expandedKeywordCount
    );
    competitionRaw = analysis.score;
    competitionReasons = analysis.reasons;
  } else {
    // Fallback heuristic without Google result count
    // Use what we have: autocomplete density + commercial signals
    if (autocomplete.count >= 10 && autocomplete.hasCommercialIntent && autocomplete.intentKeywords.length >= 3) {
      competitionRaw = 75; // Many suggestions + buying keywords = competitive market
      competitionReasons = ["Viele Kaufsignale in Autocomplete"];
    } else if (autocomplete.count >= 8) {
      competitionRaw = 60;
      competitionReasons = ["Moderate Autocomplete-Dichte"];
    } else if (autocomplete.count >= 5) {
      competitionRaw = 40;
    } else {
      competitionRaw = 25;
      competitionReasons = ["Wenige Suchergebnisse"];
    }
  }

  // INVERT: for opportunity score, less competition = better
  const competition = Math.max(0, Math.min(100, 100 - competitionRaw));

  // ── Intent Score (0-100) ──
  // Are people ready to BUY in this niche?
  const intentBase = autocomplete.hasCommercialIntent ? 65 : 25;
  const intentBonus = Math.min(35, autocomplete.intentKeywords.length * 8);
  // Amazon presence is a STRONG buying signal
  const amazonBonus = competitionInput && competitionInput.amazonCount >= 5 ? 15 :
                     competitionInput && competitionInput.amazonCount >= 2 ? 8 : 0;
  const intent = Math.min(100, intentBase + intentBonus + amazonBonus);

  // ── Total Opportunity Score ──
  // Weights: Demand 30%, Competition 30%, Trend 20%, Intent 20%
  const total = Math.round(
    demand * 0.30 +
    competition * 0.30 +
    trendScore * 0.20 +
    intent * 0.20
  );

  // Labels
  const label = total >= 75 ? "Ausgezeichnet" : total >= 60 ? "Stark" : total >= 40 ? "Solide" : "Schwach";
  const demandLabel = demand >= 70 ? "Hoch" : demand >= 40 ? "Mittel" : "Niedrig";
  const trendLabel = trend.direction === "rising" ? `Steigend (+${trend.growthPercent}%)` :
                     trend.direction === "falling" ? `Fallend (${trend.growthPercent}%)` : "Stabil";
  const competitionLabel = competitionRaw >= 70 ? "Hoch" : competitionRaw >= 40 ? "Mittel" : "Niedrig";

  // Summary — be HONEST
  const parts: string[] = [];
  if (demand >= 65) parts.push("starke Nachfrage");
  else if (demand < 30) parts.push("geringe Nachfrage");

  if (competitionRaw >= 75) parts.push("sehr hohe Konkurrenz");
  else if (competitionRaw >= 55) parts.push("moderate Konkurrenz");
  else if (competitionRaw < 35) parts.push("wenig Konkurrenz");

  if (trendScore >= 65) parts.push("steigender Trend");
  else if (trendScore < 35) parts.push("fallender Trend");

  if (intent >= 65) parts.push("Kaufintent vorhanden");

  let summary: string;
  if (total >= 75) {
    summary = `Starke Opportunity: ${parts.join(", ")}. Diese Nische ist vielversprechend.`;
  } else if (total >= 60) {
    summary = `Gute Opportunity mit Einschrankungen: ${parts.join(", ")}.`;
  } else if (total >= 40) {
    summary = `Moderate Opportunity: ${parts.join(", ")}. Differenzierung noetig.`;
  } else {
    summary = `Schwache Opportunity: ${parts.join(", ")}. Andere Nische empfohlen.`;
  }

  return {
    total,
    demand,
    trend: trendScore,
    competition,
    competitionRaw,
    intent,
    label,
    demandLabel,
    trendLabel,
    competitionLabel,
    summary,
    competitionReasons
  };
}
