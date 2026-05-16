/**
 * Competition Analysis — uses multiple free signals to estimate REAL competition.
 *
 * Sources (all free, no API keys):
 * 1. Google Search Result Count (scrape estimated results)
 * 2. Wikipedia presence (established topic = more competition)
 * 3. Platform saturation analysis (from existing Amazon/YouTube/Reddit data)
 */

export interface CompetitionData {
  googleResults: number;        // Estimated total search results
  hasWikipedia: boolean;        // Topic has a Wikipedia article
  wikipediaLength: number;      // Article length (more = established market)
  domainSignals: string[];      // Notable brands/domains detected
}

/**
 * Get Google search result count — estimates how many pages compete for this keyword.
 * Uses the "Ungefähr X Ergebnisse" / "About X results" text from Google.
 */
export async function getGoogleResultCount(keyword: string): Promise<number> {
  const encoded = encodeURIComponent(keyword);
  const url = `https://www.google.com/search?q=${encoded}&hl=en&num=1`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) return 0;
    const html = await res.text();

    // Extract "About X results" or "Ungefähr X Ergebnisse"
    const match = html.match(/(?:About|Ungef(?:ä|a)hr)\s+([\d,.]+(?:\s*(?:million|billion|Milliarden|Millionen))?)\s+(?:results|Ergebnisse)/i);
    if (match) {
      let numStr = match[1].replace(/[,.\s]/g, "");
      const text = match[1].toLowerCase();
      if (text.includes("billion") || text.includes("milliarden")) {
        numStr = numStr.replace(/\D/g, "");
        return parseInt(numStr) * 1_000_000_000;
      }
      if (text.includes("million") || text.includes("millionen")) {
        numStr = numStr.replace(/\D/g, "");
        return parseInt(numStr) * 1_000_000;
      }
      return parseInt(numStr) || 0;
    }

    // Alternative pattern: "1,230,000,000 results"
    const altMatch = html.match(/([\d,. ]+)\s+(?:results|Ergebnisse)/i);
    if (altMatch) {
      const num = parseInt(altMatch[1].replace(/[,.\s]/g, ""));
      return num || 0;
    }

    return 0;
  } catch {
    return 0;
  }
}

/**
 * Check Wikipedia for topic presence and maturity.
 * A well-established Wikipedia article = mature market = higher competition.
 * Free API, no key needed.
 */
export async function getWikipediaPresence(keyword: string): Promise<{ exists: boolean; length: number; extract: string }> {
  const encoded = encodeURIComponent(keyword);
  // Search Wikipedia for the topic
  const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

  try {
    const res = await fetch(searchUrl, {
      headers: { "User-Agent": "KachingOS/1.0 (niche analysis tool)" },
      next: { revalidate: 86400 } // cache 24h
    });

    if (res.ok) {
      const data = await res.json();
      if (data.type === "standard" && data.extract) {
        return {
          exists: true,
          length: data.extract.length,
          extract: data.extract.slice(0, 200)
        };
      }
    }

    // Try German Wikipedia as fallback
    const deUrl = `https://de.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
    const deRes = await fetch(deUrl, {
      headers: { "User-Agent": "KachingOS/1.0" },
      next: { revalidate: 86400 }
    });

    if (deRes.ok) {
      const data = await deRes.json();
      if (data.type === "standard" && data.extract) {
        return {
          exists: true,
          length: data.extract.length,
          extract: data.extract.slice(0, 200)
        };
      }
    }

    return { exists: false, length: 0, extract: "" };
  } catch {
    return { exists: false, length: 0, extract: "" };
  }
}

/**
 * Analyze competition based on all available signals.
 * Returns a 0-100 score where HIGHER = MORE competition (bad for new entrants).
 */
export function analyzeCompetition(
  googleResults: number,
  wikipedia: { exists: boolean; length: number },
  amazonSuggestions: number,
  youtubeSuggestions: number,
  redditPosts: { score: number }[],
  autocompleteCount: number,
  commercialSignals: number,
  expandedKeywordCount: number
): { score: number; level: string; reasons: string[] } {

  const signals: number[] = [];
  const reasons: string[] = [];

  // 1. Google Result Count (strongest signal, weight: 30%)
  let googleScore = 50;
  if (googleResults > 0) {
    if (googleResults > 1_000_000_000) { googleScore = 98; reasons.push("1B+ Google results"); }
    else if (googleResults > 500_000_000) { googleScore = 95; reasons.push("500M+ Google results"); }
    else if (googleResults > 100_000_000) { googleScore = 90; reasons.push("100M+ Google results"); }
    else if (googleResults > 50_000_000) { googleScore = 82; reasons.push("50M+ Google results"); }
    else if (googleResults > 10_000_000) { googleScore = 72; reasons.push("10M+ Google results"); }
    else if (googleResults > 5_000_000) { googleScore = 60; reasons.push("5M+ Google results"); }
    else if (googleResults > 1_000_000) { googleScore = 48; reasons.push("1M+ Google results"); }
    else if (googleResults > 500_000) { googleScore = 38; reasons.push("<1M Google results"); }
    else if (googleResults > 100_000) { googleScore = 28; reasons.push("Low Google results"); }
    else { googleScore = 15; reasons.push("Very few Google results"); }
  }
  signals.push(googleScore * 0.30);

  // 2. Wikipedia presence (weight: 15%)
  let wikiScore = 20; // no wikipedia = probably low competition niche
  if (wikipedia.exists) {
    if (wikipedia.length > 1000) { wikiScore = 85; reasons.push("Detailed Wikipedia article"); }
    else if (wikipedia.length > 300) { wikiScore = 65; reasons.push("Wikipedia article exists"); }
    else { wikiScore = 45; }
  }
  signals.push(wikiScore * 0.15);

  // 3. Amazon saturation (weight: 15%) — products on Amazon = established market
  let amazonScore = 20;
  if (amazonSuggestions >= 8) { amazonScore = 85; reasons.push("Strong Amazon presence"); }
  else if (amazonSuggestions >= 5) { amazonScore = 65; }
  else if (amazonSuggestions >= 3) { amazonScore = 45; }
  else if (amazonSuggestions >= 1) { amazonScore = 30; }
  signals.push(amazonScore * 0.15);

  // 4. YouTube saturation (weight: 10%) — lots of content = saturated
  let ytScore = 20;
  if (youtubeSuggestions >= 8) { ytScore = 75; reasons.push("Saturated YouTube space"); }
  else if (youtubeSuggestions >= 5) { ytScore = 55; }
  else if (youtubeSuggestions >= 3) { ytScore = 35; }
  signals.push(ytScore * 0.10);

  // 5. Reddit activity (weight: 10%) — active communities = established space
  let redditScore = 15;
  const avgUpvotes = redditPosts.length > 0 ? redditPosts.reduce((t, p) => t + p.score, 0) / redditPosts.length : 0;
  if (avgUpvotes > 500) { redditScore = 80; reasons.push("Active Reddit community"); }
  else if (avgUpvotes > 100) { redditScore = 60; }
  else if (avgUpvotes > 20) { redditScore = 40; }
  else if (redditPosts.length > 0) { redditScore = 25; }
  signals.push(redditScore * 0.10);

  // 6. Commercial signals in autocomplete (weight: 10%) — buying keywords = established market
  let commercialScore = 20;
  if (commercialSignals >= 5) { commercialScore = 85; reasons.push("Many buying keywords"); }
  else if (commercialSignals >= 3) { commercialScore = 65; }
  else if (commercialSignals >= 1) { commercialScore = 40; }
  signals.push(commercialScore * 0.10);

  // 7. Expanded keyword density (weight: 10%) — many sub-keywords = big market
  let expandedScore = 25;
  if (expandedKeywordCount >= 40) { expandedScore = 80; }
  else if (expandedKeywordCount >= 25) { expandedScore = 60; }
  else if (expandedKeywordCount >= 10) { expandedScore = 40; }
  signals.push(expandedScore * 0.10);

  const totalCompetition = Math.round(signals.reduce((a, b) => a + b, 0));
  const clampedScore = Math.min(99, Math.max(5, totalCompetition));

  const level = clampedScore >= 75 ? "Hoch" : clampedScore >= 45 ? "Mittel" : "Niedrig";

  return { score: clampedScore, level, reasons };
}
