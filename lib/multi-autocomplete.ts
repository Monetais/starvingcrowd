/**
 * Multi-platform autocomplete — Amazon, YouTube, Reddit
 * All free, no API keys needed.
 */

export interface PlatformSuggestions {
  amazon: string[];
  youtube: string[];
  reddit: { title: string; subreddit: string; score: number }[];
}

/**
 * Amazon Autocomplete — shows what people want to BUY
 * Strongest commercial intent signal available for free.
 */
async function getAmazonSuggestions(keyword: string): Promise<string[]> {
  const encoded = encodeURIComponent(keyword);
  const url = `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${encoded}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const suggestions = (data.suggestions || []).map((s: { value: string }) => s.value);
    return suggestions.slice(0, 10);
  } catch {
    return [];
  }
}

/**
 * YouTube Autocomplete — shows what people want to LEARN/WATCH
 * Great signal for content demand and information-seeking behavior.
 */
async function getYouTubeSuggestions(keyword: string): Promise<string[]> {
  const encoded = encodeURIComponent(keyword);
  const url = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encoded}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const text = await res.text();
    // Response is JSONP: window.google.ac.h(...)
    const jsonStr = text.replace(/^[^(]+\(/, "").replace(/\)$/, "");
    const data = JSON.parse(jsonStr);
    const suggestions = (data[1] || []).map((item: [string]) => item[0]);
    return suggestions.slice(0, 10);
  } catch {
    return [];
  }
}

/**
 * Reddit Search — shows community engagement and discussions.
 * Uses the public JSON API (no auth needed for basic search).
 */
async function getRedditMentions(keyword: string): Promise<{ title: string; subreddit: string; score: number }[]> {
  const encoded = encodeURIComponent(keyword);
  const url = `https://www.reddit.com/search.json?q=${encoded}&sort=relevance&limit=10&t=year`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "KachingOS/1.0" },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const posts = (data?.data?.children || []).map((child: { data: { title: string; subreddit: string; score: number } }) => ({
      title: child.data.title,
      subreddit: child.data.subreddit,
      score: child.data.score
    }));
    return posts.slice(0, 5);
  } catch {
    return [];
  }
}

/**
 * Fetch all platform suggestions in parallel
 */
export async function getMultiPlatformData(keyword: string): Promise<PlatformSuggestions> {
  const [amazon, youtube, reddit] = await Promise.all([
    getAmazonSuggestions(keyword),
    getYouTubeSuggestions(keyword),
    getRedditMentions(keyword)
  ]);

  return { amazon, youtube, reddit };
}
