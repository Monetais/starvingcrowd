import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

function getOpenAI() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const OpenAI = require("openai").default;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { keyword, score, trend, platforms, autocomplete, locale = "de" } = body;

    if (!keyword) {
      return NextResponse.json({ error: "Keyword required" }, { status: 400 });
    }

    const lang = locale === "en" ? "English" : "German";
    const platformContext = [];
    if (platforms?.amazon?.length > 0) {
      platformContext.push(`Amazon product suggestions: ${platforms.amazon.slice(0, 8).join(", ")}`);
    }
    if (platforms?.youtube?.length > 0) {
      platformContext.push(`YouTube search suggestions: ${platforms.youtube.slice(0, 8).join(", ")}`);
    }
    if (platforms?.reddit?.length > 0) {
      platformContext.push(`Reddit discussions: ${platforms.reddit.slice(0, 5).map((p: { title: string; subreddit: string; score: number }) => `"${p.title}" (r/${p.subreddit}, ${p.score} upvotes)`).join("; ")}`);
    }
    if (autocomplete?.suggestions?.length > 0) {
      platformContext.push(`Google autocomplete: ${autocomplete.suggestions.slice(0, 10).join(", ")}`);
    }
    if (autocomplete?.intentSignals?.length > 0) {
      platformContext.push(`Commercial intent signals detected: ${autocomplete.intentSignals.join(", ")}`);
    }

    const prompt = `You are an elite startup strategist who has helped 500+ founders launch profitable micro-businesses. Based on this validated niche data, create a COMPLETE actionable playbook.

NICHE DATA:
- Keyword: "${keyword}"
- Opportunity Score: ${score?.total || "N/A"}/100
- Demand Score: ${score?.demand || "N/A"}/100 (${score?.demandLabel || "N/A"})
- Trend: ${trend?.direction || "N/A"} (${trend?.growthPercent || 0}% growth over 12 months)
- Competition: ${score?.competition || "N/A"}/100 (${score?.competitionLabel || "N/A"})
- Buying Intent: ${score?.intent || "N/A"}/100
- Current Interest Level: ${trend?.currentInterest || "N/A"}/100
${platformContext.length > 0 ? `\nPLATFORM SIGNALS:\n${platformContext.join("\n")}` : ""}

Respond in ${lang}. Return ONLY valid JSON (no markdown, no code blocks) with this structure:
{
  "nicheVerdict": "2-3 sentence expert assessment of this niche opportunity",
  "businessModels": [
    {
      "name": "Model name (e.g. 'D2C Abo-Box', 'Micro-SaaS', 'Agentur')",
      "description": "What exactly to build in 1-2 sentences",
      "tool": "Primary build tool (Lovable/Shopify/WordPress/Framer/Gumroad/Webflow)",
      "difficulty": "easy/medium/hard",
      "timeToLaunch": "e.g. '3 Tage' or '2 Wochen'",
      "monthlyRevenuePotential": "e.g. '2.000-5.000 EUR'",
      "revenueModel": "How it makes money",
      "targetAudience": "Exact target audience",
      "whyItWorks": "Why this model fits this niche specifically"
    }
  ],
  "weeklyPlan": {
    "week1": {
      "title": "Week 1 title",
      "tasks": ["Task 1 with specific action", "Task 2", "Task 3", "Task 4"]
    },
    "week2": {
      "title": "Week 2 title",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    },
    "week3": {
      "title": "Week 3 title",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    },
    "week4": {
      "title": "Week 4 title",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    }
  },
  "contentIdeas": [
    "Specific content/product idea 1 based on the search data",
    "Specific content/product idea 2",
    "Specific content/product idea 3",
    "Specific content/product idea 4",
    "Specific content/product idea 5"
  ],
  "monetizationStrategies": [
    {
      "strategy": "Strategy name",
      "description": "How to implement it",
      "expectedRevenue": "Revenue estimate"
    }
  ],
  "competitorInsights": "Brief analysis of competition level and how to differentiate",
  "riskFactors": ["Risk 1", "Risk 2"],
  "quickWins": ["Something you can do TODAY to validate further", "Second quick action", "Third quick action"]
}

IMPORTANT: Generate exactly 3 business models. Make all suggestions CONCRETE and SPECIFIC to this niche - no generic advice. Every task should be actionable TODAY. Use real tool names, real strategies, real numbers.`;

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || "";

    let playbook;
    try {
      playbook = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        playbook = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(playbook);
  } catch (error) {
    console.error("AI Playbook error:", error);
    return NextResponse.json(
      { error: "Playbook generation failed" },
      { status: 500 }
    );
  }
}
