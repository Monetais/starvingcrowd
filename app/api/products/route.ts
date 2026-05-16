import { NextRequest, NextResponse } from "next/server";
import { searchCJProducts, estimateRetailPrice } from "@/lib/cj-dropshipping";

export const runtime = "nodejs";
export const maxDuration = 15;

/**
 * Translate keyword to English using OpenAI if it looks non-English.
 * CJ Dropshipping only has English product names.
 */
async function translateToEnglish(keyword: string): Promise<string> {
  // Quick check: if keyword is likely already English, skip
  if (/^[a-zA-Z0-9\s\-_.]+$/.test(keyword)) return keyword;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return keyword;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 30,
        messages: [
          { role: "system", content: "Translate the following product/niche keyword to English. Return ONLY the English translation, nothing else. Keep it short (1-4 words)." },
          { role: "user", content: keyword }
        ]
      })
    });
    const data = await res.json();
    const translated = data.choices?.[0]?.message?.content?.trim();
    return translated || keyword;
  } catch {
    return keyword;
  }
}

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword")?.trim();

  if (!keyword) {
    return NextResponse.json({ error: "Keyword required" }, { status: 400 });
  }

  // Translate to English for CJ search
  const englishKeyword = await translateToEnglish(keyword);

  // Search with English keyword, fallback to original if no results
  let result = await searchCJProducts(englishKeyword, 1, 8);
  if (result.products.length === 0 && englishKeyword !== keyword) {
    result = await searchCJProducts(keyword, 1, 8);
  }

  const products = result.products.map(p => ({
    id: p.pid,
    name: p.productName,
    image: p.productImage,
    wholesalePrice: p.sellPrice,
    retail: estimateRetailPrice(p.sellPrice),
    category: p.categoryName,
    weight: p.productWeight,
    link: `https://cjdropshipping.com/product/p-${p.pid}.html`,
  }));

  return NextResponse.json({
    keyword,
    searchedAs: englishKeyword,
    products,
    total: result.total,
    source: "CJ Dropshipping",
  });
}
