/**
 * CJ Dropshipping API v2.0 Integration
 *
 * Auth flow: API Key → getAccessToken → use Access Token for all requests
 * Token is valid for ~6 months, cached in memory.
 */

export interface CJProduct {
  pid: string;
  productName: string;
  productImage: string;
  sellPrice: number;
  categoryName: string;
  productWeight: string;
  productSku: string;
}

export interface CJProductResult {
  products: CJProduct[];
  total: number;
  error?: string;
}

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

// In-memory token cache
let cachedAccessToken: string | null = null;
let tokenExpiry = 0;

/**
 * Get a valid CJ access token (cached)
 */
async function getAccessToken(): Promise<string | null> {
  if (cachedAccessToken && Date.now() < tokenExpiry) {
    return cachedAccessToken;
  }

  const apiKey = process.env.CJ_ACCESS_TOKEN;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    const data = await res.json();
    if (data.code === 200 && data.data?.accessToken) {
      cachedAccessToken = data.data.accessToken;
      // Cache for 30 days (token lasts ~6 months)
      tokenExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
      return cachedAccessToken;
    }
    console.error("CJ auth failed:", data.message);
    return null;
  } catch (e) {
    console.error("CJ auth error:", e);
    return null;
  }
}

/**
 * Search CJ Dropshipping products by keyword
 */
export async function searchCJProducts(keyword: string, page = 1, size = 8): Promise<CJProductResult> {
  const token = await getAccessToken();
  if (!token) {
    return { products: [], total: 0, error: "CJ authentication failed" };
  }

  try {
    const url = `${CJ_BASE}/product/list?pageNum=${page}&pageSize=${size}&productNameEn=${encodeURIComponent(keyword)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "CJ-Access-Token": token },
    });

    const data = await res.json();

    if (data.code !== 200) {
      return { products: [], total: 0, error: data.message || "CJ search failed" };
    }

    const list = data.data?.list || [];
    const products: CJProduct[] = Array.isArray(list) ? list.map(mapCJProduct).filter(p => p.sellPrice > 0) : [];

    return {
      products,
      total: data.data?.total || products.length,
    };
  } catch (e) {
    console.error("CJ API error:", e);
    return { products: [], total: 0, error: "CJ API request failed" };
  }
}

function mapCJProduct(item: Record<string, unknown>): CJProduct {
  // sellPrice can be "2.92 -- 5.61" or "8.49" — take the first number
  let price = 0;
  const raw = String(item.sellPrice || "0");
  const match = raw.match(/[\d.]+/);
  if (match) price = parseFloat(match[0]);

  return {
    pid: String(item.pid || ""),
    productName: String(item.productNameEn || item.productName || ""),
    productImage: String(item.productImage || ""),
    sellPrice: price,
    categoryName: String(item.categoryName || ""),
    productWeight: String(item.productWeight || ""),
    productSku: String(item.productSku || ""),
  };
}

/**
 * Estimate retail price. Standard dropshipping markup: 2.5x - 3.5x
 */
export function estimateRetailPrice(wholesalePrice: number): { low: number; high: number; margin: number } {
  const low = Math.round(wholesalePrice * 2.5 * 100) / 100;
  const high = Math.round(wholesalePrice * 3.5 * 100) / 100;
  const avgRetail = (low + high) / 2;
  const margin = avgRetail > 0 ? Math.round(((avgRetail - wholesalePrice) / avgRetail) * 100) : 0;
  return { low, high, margin };
}
