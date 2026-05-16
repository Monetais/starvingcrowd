import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

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
    const { keyword, score, trend, platforms, locale = "de" } = body;

    if (!keyword) {
      return NextResponse.json({ error: "Keyword required" }, { status: 400 });
    }

    const lang = locale === "en" ? "English" : "German";
    const platformContext = [];
    if (platforms?.amazon?.length > 0) {
      platformContext.push(`Amazon suggestions: ${platforms.amazon.slice(0, 5).join(", ")}`);
    }
    if (platforms?.youtube?.length > 0) {
      platformContext.push(`YouTube suggestions: ${platforms.youtube.slice(0, 5).join(", ")}`);
    }
    if (platforms?.reddit?.length > 0) {
      platformContext.push(`Reddit discussions: ${platforms.reddit.slice(0, 3).map((p: { title: string }) => p.title).join("; ")}`);
    }

    const prompt = `You are a startup advisor. Based on this niche analysis data, generate a concrete business idea.

Niche keyword: "${keyword}"
Opportunity Score: ${score?.total || "N/A"}/100
Demand: ${score?.demandLabel || "N/A"}
Trend: ${trend?.direction || "N/A"} (${trend?.growthPercent || 0}% growth)
Competition: ${score?.competitionLabel || "N/A"}
${platformContext.length > 0 ? `Platform signals:\n${platformContext.join("\n")}` : ""}

Respond in ${lang}. Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "businessIdea": "One sentence describing the concrete business to build",
  "tool": "Lovable" or "Shopify" or "WordPress" or "Framer" or "Gumroad",
  "toolReason": "One sentence why this tool fits",
  "steps": ["Step 1 (today)", "Step 2 (this week)", "Step 3 (this month)"],
  "revenueModel": "How this makes money (one sentence)",
  "expectedRevenue": "Realistic month-1 revenue estimate like '500-2000 EUR'",
  "targetAudience": "Specific target audience in one sentence",
  "oneLinePitch": "A compelling one-line pitch for this business"
}`;

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || "";

    // Parse JSON response
    let insight;
    try {
      insight = JSON.parse(content);
    } catch {
      // Try to extract JSON from response if wrapped in markdown
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        insight = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(insight);
  } catch (error) {
    console.error("AI Insight error:", error);
    return NextResponse.json(
      { error: "AI insight generation failed" },
      { status: 500 }
    );
  }
}
