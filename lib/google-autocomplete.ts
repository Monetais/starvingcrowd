/**
 * Google Autocomplete API — completely free, no API key needed.
 * Returns what people actually search for = demand signal.
 */

export interface AutocompleteResult {
  suggestions: string[];
  count: number;
  hasCommercialIntent: boolean;
  intentKeywords: string[];
}

const COMMERCIAL_SIGNALS = [
  "kaufen", "preis", "kosten", "bestellen", "shop", "online",
  "vergleich", "test", "erfahrung", "bewertung", "alternative",
  "beste", "günstig", "anbieter", "tool", "software", "app",
  "kurs", "lernen", "buchen", "mieten", "agentur",
  "buy", "price", "cost", "best", "review", "vs", "how to", "template"
];

export async function getAutocompleteSuggestions(keyword: string): Promise<AutocompleteResult> {
  const encoded = encodeURIComponent(keyword);

  // Fetch suggestions from Google Autocomplete (public endpoint)
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encoded}&hl=de`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 } // cache 1h
    });

    if (!res.ok) {
      return { suggestions: [], count: 0, hasCommercialIntent: false, intentKeywords: [] };
    }

    const data = await res.json();
    const suggestions: string[] = data[1] || [];

    // Check for commercial intent
    const allText = suggestions.join(" ").toLowerCase();
    const intentKeywords = COMMERCIAL_SIGNALS.filter(signal => allText.includes(signal));

    return {
      suggestions: suggestions.slice(0, 10),
      count: suggestions.length,
      hasCommercialIntent: intentKeywords.length > 0,
      intentKeywords
    };
  } catch {
    return { suggestions: [], count: 0, hasCommercialIntent: false, intentKeywords: [] };
  }
}

/**
 * Get expanded suggestions by appending letters a-z
 * This gives us a broader picture of demand.
 */
export async function getExpandedSuggestions(keyword: string): Promise<string[]> {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "k", "m", "p", "s", "t", "w"];

  const results = await Promise.all(
    letters.map(async (letter) => {
      const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(keyword + " " + letter)}&hl=de`;
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (data[1] || []) as string[];
      } catch {
        return [];
      }
    })
  );

  const all = results.flat();
  return Array.from(new Set(all)).slice(0, 50);
}
