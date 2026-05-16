import { NextRequest, NextResponse } from "next/server";
import { searchCJProducts, estimateRetailPrice } from "@/lib/cj-dropshipping";

export const runtime = "nodejs";
export const maxDuration = 15;

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword")?.trim();

  if (!keyword) {
    return NextResponse.json({ error: "Keyword required" }, { status: 400 });
  }

  const result = await searchCJProducts(keyword, 1, 8);

  if (result.error && result.products.length === 0) {
    return NextResponse.json({ error: result.error, products: [] }, { status: 200 });
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
    products,
    total: result.total,
    source: "CJ Dropshipping",
  });
}
