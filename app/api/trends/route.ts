import { NextRequest, NextResponse } from "next/server";
import { getTrend } from "@/lib/google-trends";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) {
    return NextResponse.json({ error: "Keyword erforderlich." }, { status: 400 });
  }

  const trend = await getTrend(q);
  return NextResponse.json(trend);
}
