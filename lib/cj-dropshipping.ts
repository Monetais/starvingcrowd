/**
 * CJ Dropshipping API v2.0 Integration
 * Docs: https://developers.cjdropshipping.com/api2.0/v1/product/listV2
 */

export interface CJProduct {
  pid: string;
  productName: string;
  productImage: string;
  sellPrice: number;       // USD wholesale price
  categoryName: string;
  productWeight: number;
  productUnit: string;
  productSku: string[];
  supplierName: string;
  entryCode: string;
  logisticPrice?: number;
}

export interface CJProductResult {
  products: CJProduct[];
  total: number;
  error?: string;
}

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

/**
 * Search CJ Dropshipping products by keyword
 */
export async function searchCJProducts(keyword: string, page = 1, size = 10): Promise<CJProductResult> {
  const token = process.env.CJ_ACCESS_TOKEN;
  if (!token) {
    return { products: [], total: 0, error: "CJ_ACCESS_TOKEN not configured" };
  }

  try {
    const url = `${CJ_BASE}/product/list?pageNum=${page}&pageSize=${size}&productNameEn=${encodeURIComponent(keyword)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "CJ-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // Try alternative endpoint
      return await searchCJProductsV2(keyword, token, page, size);
    }

    const data = await res.json();

    if (data.code !== 200 && data.result !== true) {
      // Fallback to v2 search
      return await searchCJProductsV2(keyword, token, page, size);
    }

    const list = data.data?.list || data.data || [];
    const products: CJProduct[] = Array.isArray(list) ? list.map(mapCJProduct) : [];

    return {
      products: products.slice(0, size),
      total: data.data?.total || products.length,
    };
  } catch (e) {
    console.error("CJ API error:", e);
    return { products: [], total: 0, error: "CJ API request failed" };
  }
}

/**
 * V2 search endpoint (Elasticsearch-based)
 */
async function searchCJProductsV2(keyword: string, token: string, page: number, size: number): Promise<CJProductResult> {
  try {
    const url = `${CJ_BASE}/product/list?pageNum=${page}&pageSize=${size}&productNameEn=${encodeURIComponent(keyword)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "CJ-Access-Token": token,
      },
    });

    const data = await res.json();
    const list = data.data?.list || data.data || [];
    const products: CJProduct[] = Array.isArray(list) ? list.map(mapCJProduct) : [];

    return {
      products: products.slice(0, size),
      total: data.data?.total || products.length,
    };
  } catch {
    return { products: [], total: 0, error: "CJ v2 search failed" };
  }
}

function mapCJProduct(item: Record<string, unknown>): CJProduct {
  return {
    pid: (item.pid || item.id || "") as string,
    productName: (item.productNameEn || item.productName || "") as string,
    productImage: (item.productImage || item.bigImage || "") as string,
    sellPrice: parseFloat(String(item.sellPrice || item.productPrice || 0)),
    categoryName: (item.categoryName || item.categoryNameEn || "") as string,
    productWeight: parseFloat(String(item.productWeight || 0)),
    productUnit: (item.productUnit || "piece") as string,
    productSku: Array.isArray(item.productSku) ? item.productSku : [],
    supplierName: (item.supplierName || "") as string,
    entryCode: (item.entryCode || "") as string,
  };
}

/**
 * Estimate retail price based on wholesale price.
 * Standard dropshipping markup: 2.5x - 3.5x
 */
export function estimateRetailPrice(wholesalePrice: number): { low: number; high: number; margin: number } {
  const low = Math.round(wholesalePrice * 2.5 * 100) / 100;
  const high = Math.round(wholesalePrice * 3.5 * 100) / 100;
  const avgRetail = (low + high) / 2;
  const margin = Math.round(((avgRetail - wholesalePrice) / avgRetail) * 100);
  return { low, high, margin };
}
