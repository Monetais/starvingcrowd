import { NextRequest, NextResponse } from "next/server";
import { getAutocompleteSuggestions } from "@/lib/google-autocomplete";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) {
    return NextResponse.json({ suggestions: [] });
  }

  const result = await getAutocompleteSuggestions(q);
  return NextResponse.json(result);
}
