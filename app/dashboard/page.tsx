"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { type Locale, detectLocale } from "@/lib/i18n";

/* ═══════════════════════════════════════════
   DASHBOARD — Full App with Sidebar + Tabs

   Tabs: Overview | Niche Scanner | Products | History
   Sidebar: Navigation + User info
   ═══════════════════════════════════════════ */

/* ── Icons ── */
function I({ children, className = "h-4 w-4" }: { children: React.ReactNode; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}
const IconSearch = (p: { className?: string }) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>;
const IconArrowRight = (p: { className?: string }) => <I {...p}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></I>;
const IconCheck = (p: { className?: string }) => <I {...p}><path d="M5 12l5 5L20 7" /></I>;
const IconTrending = (p: { className?: string }) => <I {...p}><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></I>;
const IconX = (p: { className?: string }) => <I {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></I>;
const IconZap = (p: { className?: string }) => <I {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></I>;
const IconTarget = (p: { className?: string }) => <I {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></I>;
const IconClock = (p: { className?: string }) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></I>;
const IconExternalLink = (p: { className?: string }) => <I {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></I>;
const IconChevronDown = (p: { className?: string }) => <I {...p}><path d="m6 9 6 6 6-6" /></I>;
const IconRefresh = (p: { className?: string }) => <I {...p}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></I>;
const IconHome = (p: { className?: string }) => <I {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><polyline points="9 22 9 12 15 12 15 22" /></I>;
const IconShoppingBag = (p: { className?: string }) => <I {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></I>;
const IconMenu = (p: { className?: string }) => <I {...p}><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></I>;
const IconTrash = (p: { className?: string }) => <I {...p}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></I>;
const IconUser = (p: { className?: string }) => <I {...p}><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></I>;
const IconBookmark = (p: { className?: string }) => <I {...p}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></I>;

/* ── Types ── */
type ScanResult = {
  keyword: string;
  score: { total: number; demand: number; trend: number; competition: number; competitionRaw?: number; intent: number; label: string; demandLabel: string; trendLabel: string; competitionLabel: string; summary: string; competitionReasons?: string[] };
  autocomplete: { suggestions: string[]; count: number; commercialIntent: boolean; intentSignals: string[] };
  trend: { direction: string; currentInterest: number; averageInterest: number; growthPercent: number; timeline: { date: string; value: number }[]; relatedQueries: string[] };
  platforms?: { amazon: string[]; youtube: string[]; reddit: { title: string; subreddit: string; score: number }[] };
  competition?: { googleResults: number; wikipedia: string | null; level: string; reasons: string[] };
  expandedKeywords: string[];
  scannedAt: string;
};

type CJProduct = {
  id: string; name: string; image: string; wholesalePrice: number;
  retail: { low: number; high: number; margin: number };
  category: string; weight: number; supplier: string; link: string;
};

type HistoryItem = { result: ScanResult; id: string; date: string };
type Tab = "overview" | "scanner" | "products" | "history";

/* ── Helpers ── */
function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("kos_history") || "[]"); } catch { return []; }
}
function saveHistory(h: HistoryItem[]) {
  if (typeof window !== "undefined") localStorage.setItem("kos_history", JSON.stringify(h.slice(0, 50)));
}
function formatNum(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return n.toString();
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function DashboardPage() {
  const [locale, setLocale] = useState<Locale>("de");
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scanner state
  const [q, setQ] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [animScore, setAnimScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Products state
  const [products, setProducts] = useState<CJProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState("");

  // History
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Saved niches (bookmarks)
  const [saved, setSaved] = useState<HistoryItem[]>([]);

  const de = locale === "de";

  useEffect(() => { setLocale(detectLocale()); }, []);
  useEffect(() => {
    setHistory(loadHistory());
    try { setSaved(JSON.parse(localStorage.getItem("kos_saved") || "[]")); } catch { /* */ }
  }, []);

  // Best scan
  const bestScan = history.length > 0 ? history.reduce((best, h) => h.result.score.total > best.result.score.total ? h : best, history[0]) : null;

  async function scan(keyword: string) {
    if (!keyword.trim()) return;
    setQ(keyword);
    setScanning(true);
    setResult(null);
    setAnimScore(0);
    setShowDetails(false);
    setProducts([]);
    setTab("scanner");

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword })
      });
      if (!res.ok) throw new Error("fail");
      const data: ScanResult = await res.json();
      setResult(data);
      setScanning(false);

      // Save history
      const item: HistoryItem = { result: data, id: Date.now().toString(), date: new Date().toISOString() };
      const updated = [item, ...history].slice(0, 50);
      setHistory(updated);
      saveHistory(updated);

      // Animate score
      let s = 0;
      const target = data.score.total;
      const iv = setInterval(() => { s += 2; if (s >= target) { s = target; clearInterval(iv); } setAnimScore(s); }, 15);

      // Fetch products
      setProductsLoading(true);
      fetch(`/api/products?keyword=${encodeURIComponent(keyword)}`)
        .then(r => r.json())
        .then(d => { if (d.products) setProducts(d.products.slice(0, 6)); })
        .catch(() => {})
        .finally(() => setProductsLoading(false));
    } catch {
      setScanning(false);
    }
  }

  function searchProducts(keyword: string) {
    if (!keyword.trim()) return;
    setProductsLoading(true);
    setProducts([]);
    fetch(`/api/products?keyword=${encodeURIComponent(keyword)}`)
      .then(r => r.json())
      .then(d => { if (d.products) setProducts(d.products); })
      .catch(() => {})
      .finally(() => setProductsLoading(false));
  }

  function toggleSave(item: HistoryItem) {
    const exists = saved.find(s => s.id === item.id);
    const updated = exists ? saved.filter(s => s.id !== item.id) : [item, ...saved];
    setSaved(updated);
    localStorage.setItem("kos_saved", JSON.stringify(updated));
  }

  function deleteHistoryItem(id: string) {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    saveHistory(updated);
  }

  const navItems: { tab: Tab; icon: React.ReactNode; label: string }[] = [
    { tab: "overview", icon: <IconHome className="h-5 w-5" />, label: de ? "Ubersicht" : "Overview" },
    { tab: "scanner", icon: <IconSearch className="h-5 w-5" />, label: de ? "Nischen-Scanner" : "Niche Scanner" },
    { tab: "products", icon: <IconShoppingBag className="h-5 w-5" />, label: de ? "Produkte" : "Products" },
    { tab: "history", icon: <IconClock className="h-5 w-5" />, label: de ? "Verlauf" : "History" },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      {/* ═══ SIDEBAR (desktop) ═══ */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white flex flex-col transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-black text-[13px] font-black text-white">K</span>
          <span className="text-[17px] font-bold tracking-tight">Kaching OS</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.tab}
              onClick={() => { setTab(item.tab); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium transition ${
                tab === item.tab
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Saved niches */}
        {saved.length > 0 && (
          <div className="border-t border-gray-100 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-2">{de ? "Gespeichert" : "Saved"}</p>
            {saved.slice(0, 5).map(s => (
              <button key={s.id} onClick={() => { setResult(s.result); setAnimScore(s.result.score.total); setTab("scanner"); setSidebarOpen(false); }} className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition">
                <span className="truncate">{s.result.keyword}</span>
                <ScoreBadge score={s.result.score.total} small />
              </button>
            ))}
          </div>
        )}

        {/* User / Settings */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600">
              <IconUser className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate">Mein Konto</p>
              <p className="text-[11px] text-gray-400">{history.length} {de ? "Scans" : "scans"}</p>
            </div>
            <button onClick={() => setLocale(locale === "de" ? "en" : "de")} className="text-[10px] font-bold text-gray-400 hover:text-gray-600">{locale === "de" ? "EN" : "DE"}</button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-gray-100"><IconMenu className="h-5 w-5" /></button>
          <span className="text-[15px] font-bold">Kaching OS</span>
          <button onClick={() => setLocale(locale === "de" ? "en" : "de")} className="text-[11px] font-bold text-gray-400">{locale === "de" ? "EN" : "DE"}</button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 sm:px-8 py-6 sm:py-10">

            {/* ═══════════════════════════════════
                TAB: OVERVIEW
                ═══════════════════════════════════ */}
            {tab === "overview" && (
              <div className="space-y-8">
                {/* Welcome header */}
                <div>
                  <h1 className="text-[28px] font-bold tracking-tight text-gray-900">{de ? "Willkommen zuruck" : "Welcome back"}</h1>
                  <p className="mt-1 text-[15px] text-gray-500">{de ? "Dein Nischen-Cockpit auf einen Blick." : "Your niche cockpit at a glance."}</p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatCard label={de ? "Scans gesamt" : "Total scans"} value={history.length.toString()} icon={<IconSearch className="h-5 w-5" />} />
                  <StatCard label={de ? "Gespeichert" : "Saved"} value={saved.length.toString()} icon={<IconBookmark className="h-5 w-5" />} />
                  <StatCard label={de ? "Bester Score" : "Best score"} value={bestScan ? bestScan.result.score.total.toString() : "—"} icon={<IconTarget className="h-5 w-5" />} color={bestScan && bestScan.result.score.total >= 65 ? "green" : undefined} />
                  <StatCard label={de ? "Produkte geladen" : "Products loaded"} value={products.length.toString()} icon={<IconShoppingBag className="h-5 w-5" />} />
                </div>

                {/* Quick scan */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-[15px] font-bold text-gray-900 mb-4">{de ? "Schnell-Scan" : "Quick Scan"}</p>
                  <form onSubmit={(e) => { e.preventDefault(); scan(q); }} className="flex gap-3">
                    <div className="flex-1 flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-black focus-within:bg-white transition">
                      <IconSearch className="h-4 w-4 text-gray-400 shrink-0" />
                      <input value={q} onChange={e => setQ(e.target.value)} placeholder={de ? "Nische eingeben..." : "Enter niche..."} className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400" />
                    </div>
                    <button type="submit" disabled={!q.trim()} className="shrink-0 rounded-xl bg-black px-6 py-3 text-[13px] font-bold text-white transition hover:bg-gray-800 disabled:opacity-30">
                      {de ? "Scannen" : "Scan"}
                    </button>
                  </form>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {(de ? ["Hundefutter", "KI Coaching", "Nachhilfe", "Schmuck", "Fitness App", "Kerzen"] : ["Dog Food", "AI Coaching", "Tutoring", "Jewelry", "Fitness App", "Candles"]).map(kw => (
                      <button key={kw} onClick={() => { setQ(kw); scan(kw); }} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-500 transition hover:border-gray-400 hover:text-black">{kw}</button>
                    ))}
                  </div>
                </div>

                {/* Best niche card */}
                {bestScan && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[15px] font-bold text-gray-900">{de ? "Deine beste Nische" : "Your best niche"}</p>
                      <ScoreBadge score={bestScan.result.score.total} />
                    </div>
                    <p className="text-[20px] font-bold text-gray-900">{bestScan.result.keyword}</p>
                    <p className="mt-1 text-[13px] text-gray-500">{bestScan.result.score.summary}</p>
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      <MiniStat label={de ? "Nachfrage" : "Demand"} value={bestScan.result.score.demand} />
                      <MiniStat label={de ? "Konkurrenz" : "Competition"} value={bestScan.result.score.competitionRaw || 50} inverted />
                      <MiniStat label="Trend" value={bestScan.result.score.trend} />
                      <MiniStat label="Intent" value={bestScan.result.score.intent} />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => { setResult(bestScan.result); setAnimScore(bestScan.result.score.total); setTab("scanner"); }} className="rounded-lg bg-black px-4 py-2 text-[12px] font-bold text-white hover:bg-gray-800 transition">
                        {de ? "Details ansehen" : "View details"}
                      </button>
                      <button onClick={() => { setProductSearch(bestScan.result.keyword); setTab("products"); searchProducts(bestScan.result.keyword); }} className="rounded-lg border border-gray-200 px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition">
                        {de ? "Produkte finden" : "Find products"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Recent scans */}
                {history.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[15px] font-bold text-gray-900">{de ? "Letzte Scans" : "Recent scans"}</p>
                      <button onClick={() => setTab("history")} className="text-[12px] font-medium text-gray-400 hover:text-gray-600 transition">{de ? "Alle anzeigen" : "View all"}</button>
                    </div>
                    <div className="space-y-2">
                      {history.slice(0, 5).map(h => (
                        <button key={h.id} onClick={() => { setResult(h.result); setAnimScore(h.result.score.total); setTab("scanner"); }} className="w-full flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 text-left transition hover:border-gray-300 hover:shadow-sm">
                          <ScoreBadge score={h.result.score.total} small />
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold text-gray-900 truncate">{h.result.keyword}</p>
                            <p className="text-[11px] text-gray-400">{h.result.score.summary.slice(0, 60)}...</p>
                          </div>
                          <span className="text-[11px] text-gray-300 shrink-0">{new Date(h.date).toLocaleDateString(de ? "de-DE" : "en-US", { day: "numeric", month: "short" })}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {history.length === 0 && (
                  <div className="text-center py-16">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                      <IconSearch className="h-7 w-7" />
                    </div>
                    <p className="text-[16px] font-bold text-gray-900">{de ? "Noch keine Scans" : "No scans yet"}</p>
                    <p className="mt-1 text-[13px] text-gray-400">{de ? "Starte deinen ersten Nischen-Scan oben." : "Start your first niche scan above."}</p>
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════
                TAB: SCANNER
                ═══════════════════════════════════ */}
            {tab === "scanner" && (
              <div className="space-y-6">
                {/* Search bar */}
                <div className="flex items-center gap-3">
                  <form onSubmit={(e: FormEvent) => { e.preventDefault(); scan(q); }} className="flex-1 flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 focus-within:border-black transition">
                    <IconSearch className="h-4 w-4 text-gray-400 shrink-0" />
                    <input value={q} onChange={e => setQ(e.target.value)} placeholder={de ? "Nische eingeben..." : "Enter niche..."} className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400" autoFocus />
                    <button type="submit" disabled={!q.trim() || scanning} className="shrink-0 rounded-lg bg-black px-5 py-2 text-[12px] font-bold text-white transition hover:bg-gray-800 disabled:opacity-30">
                      {scanning ? (de ? "Scannt..." : "Scanning...") : (de ? "Scannen" : "Scan")}
                    </button>
                  </form>
                </div>

                {/* Scanning state */}
                {scanning && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full border-4 border-gray-200 animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center"><IconSearch className="h-6 w-6 text-gray-400" /></div>
                    </div>
                    <p className="mt-5 text-[16px] font-bold text-gray-900">{de ? "Analysiere" : "Analyzing"} &ldquo;{q}&rdquo;</p>
                    <div className="mt-3 space-y-2 text-[13px]">
                      {[{ l: "Google + Amazon + YouTube", d: 0 }, { l: "Trends & Competition", d: 400 }, { l: de ? "Produkte finden" : "Finding products", d: 800 }].map((s, i) => (
                        <ScanStep key={i} label={s.l} delay={s.d} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Result */}
                {!scanning && result && (
                  <div className="space-y-5">
                    {/* Verdict + save button */}
                    <div className="relative">
                      <VerdictCard result={result} animScore={animScore} de={de} />
                      <button
                        onClick={() => toggleSave({ result, id: result.keyword + result.scannedAt, date: result.scannedAt })}
                        className="absolute top-4 right-4 rounded-full bg-white/80 p-2 border border-gray-200 hover:bg-white transition"
                        title={de ? "Speichern" : "Save"}
                      >
                        <IconBookmark className={`h-4 w-4 ${saved.find(s => s.result.keyword === result.keyword) ? "text-black fill-black" : "text-gray-400"}`} />
                      </button>
                    </div>

                    {/* Summary */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                      <p className="text-[14px] font-bold text-gray-900 mb-2">{de ? "Was bedeutet das?" : "What does this mean?"}</p>
                      <p className="text-[14px] leading-relaxed text-gray-600">{result.score.summary}</p>
                      {result.score.total >= 65 && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
                          <IconCheck className="h-4 w-4 text-green-600 shrink-0" />
                          <p className="text-[12px] text-green-800 font-medium">{de ? "Diese Nische hat echtes Potenzial!" : "This niche has real potential!"}</p>
                        </div>
                      )}
                      {result.score.total < 40 && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                          <IconX className="h-4 w-4 text-red-500 shrink-0" />
                          <p className="text-[12px] text-red-800 font-medium">{de ? "Probier eine spezifischere Nische." : "Try a more specific niche."}</p>
                        </div>
                      )}
                    </div>

                    {/* 4 Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <MetricCard label={de ? "Nachfrage" : "Demand"} value={result.score.demand} desc={`${result.autocomplete.count} suggestions`} color={result.score.demand >= 65 ? "green" : result.score.demand >= 40 ? "amber" : "red"} />
                      <MetricCard label={de ? "Konkurrenz" : "Competition"} value={result.score.competitionRaw || (100 - result.score.competition)} desc={result.competition?.googleResults ? formatNum(result.competition.googleResults) : ""} color={(result.score.competitionRaw || 50) >= 65 ? "red" : (result.score.competitionRaw || 50) >= 40 ? "amber" : "green"} inverted />
                      <MetricCard label="Trend" value={result.score.trend} desc={result.score.trendLabel} color={result.score.trend >= 60 ? "green" : result.score.trend >= 40 ? "amber" : "red"} />
                      <MetricCard label="Intent" value={result.score.intent} desc={result.autocomplete.commercialIntent ? (de ? "Kaufsignale" : "Buy signals") : "—"} color={result.score.intent >= 60 ? "green" : result.score.intent >= 35 ? "amber" : "red"} />
                    </div>

                    {/* Trend chart */}
                    {result.trend.timeline.length > 0 && (
                      <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[13px] font-bold text-gray-900">{de ? "Suchinteresse (12 Monate)" : "Search Interest (12mo)"}</p>
                          <TrendBadge direction={result.trend.direction} growth={result.trend.growthPercent} de={de} />
                        </div>
                        <div className="flex h-24 items-end gap-[2px] rounded-lg bg-gray-50 p-2">
                          {result.trend.timeline.slice(-30).map((point, i) => {
                            const max = Math.max(...result.trend.timeline.map(p => p.value), 1);
                            const c = result.trend.direction === "rising" ? "bg-green-500" : result.trend.direction === "falling" ? "bg-red-400" : "bg-gray-400";
                            return <span key={i} className={`flex-1 rounded-sm ${c}`} style={{ height: `${Math.max(4, (point.value / max) * 100)}%` }} />;
                          })}
                        </div>
                      </div>
                    )}

                    {/* CJ Products */}
                    {(productsLoading || products.length > 0) && (
                      <div className="rounded-2xl border-2 border-blue-200 bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-[15px] font-bold text-gray-900">{de ? "Produkte zum Verkaufen" : "Products to sell"}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">CJ Dropshipping — {de ? "kein Lager notig" : "no inventory needed"}</p>
                          </div>
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-700">DROPSHIPPING</span>
                        </div>
                        {productsLoading ? (
                          <div className="flex items-center justify-center py-10 gap-2 text-[13px] text-gray-400">
                            <div className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-black animate-spin" />
                            {de ? "Suche passende Produkte..." : "Finding matching products..."}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {products.map(p => <ProductCard key={p.id} product={p} de={de} />)}
                          </div>
                        )}
                        {products.length > 0 && (
                          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3">
                            <p className="text-[11px] text-blue-700 leading-relaxed">
                              <span className="font-bold">{de ? "So funktioniert Dropshipping:" : "How dropshipping works:"}</span>{" "}
                              {de ? "Liste das Produkt in deinem Shop. Kunde bestellt → CJ versendet direkt. Du zahlst nur den Einkaufspreis." : "List in your store. Customer orders → CJ ships directly. You only pay wholesale."}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expandable details */}
                    <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-[12px] font-medium text-gray-500 hover:bg-gray-50 transition">
                      {showDetails ? (de ? "Weniger Details" : "Less details") : (de ? "Alle Daten anzeigen" : "Show all data")}
                      <IconChevronDown className={`h-3.5 w-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`} />
                    </button>

                    {showDetails && (
                      <div className="space-y-4">
                        {result.platforms && (
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-[13px] font-bold text-gray-900 mb-3">{de ? "Plattform-Signale" : "Platform signals"}</p>
                            <div className="space-y-3">
                              {result.platforms.amazon.length > 0 && <PlatformRow title="Amazon" items={result.platforms.amazon.slice(0, 5)} color="amber" />}
                              {result.platforms.youtube.length > 0 && <PlatformRow title="YouTube" items={result.platforms.youtube.slice(0, 5)} color="red" />}
                              {result.platforms.reddit.length > 0 && (
                                <div>
                                  <p className="text-[11px] font-bold text-gray-600 mb-1.5">Reddit</p>
                                  {result.platforms.reddit.slice(0, 3).map((post, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5 mb-1">
                                      <span className="text-[10px] font-bold text-orange-700">{post.score}</span>
                                      <span className="text-[11px] text-gray-700 line-clamp-1">{post.title}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {result.competition && (
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-[13px] font-bold text-gray-900 mb-3">{de ? "Konkurrenz" : "Competition"}</p>
                            <div className="grid grid-cols-2 gap-3 text-center">
                              <div className="rounded-lg bg-gray-50 p-3">
                                <p className="text-[18px] font-bold">{result.competition.googleResults > 0 ? formatNum(result.competition.googleResults) : "—"}</p>
                                <p className="text-[10px] text-gray-400">Google {de ? "Ergebnisse" : "results"}</p>
                              </div>
                              <div className="rounded-lg bg-gray-50 p-3">
                                <p className="text-[18px] font-bold">{result.competition.wikipedia ? "Ja" : "Nein"}</p>
                                <p className="text-[10px] text-gray-400">Wikipedia</p>
                              </div>
                            </div>
                            {result.competition.reasons.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {result.competition.reasons.map((r, i) => (
                                  <span key={i} className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">{r}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {(result.trend.relatedQueries.length > 0 || result.expandedKeywords.length > 0) && (
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-[13px] font-bold text-gray-900 mb-3">{de ? "Verwandte Nischen" : "Related niches"}</p>
                            <div className="flex flex-wrap gap-2">
                              {[...result.trend.relatedQueries.slice(0, 6), ...result.expandedKeywords.slice(0, 8)].map((kw, i) => (
                                <button key={i} onClick={() => scan(kw)} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:border-black hover:text-black transition">
                                  {kw} <IconArrowRight className="h-2.5 w-2.5 inline ml-0.5 opacity-40" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Next steps */}
                    {result.score.total >= 40 && (
                      <div className="rounded-2xl bg-black p-6 text-white">
                        <div className="flex items-center gap-2 mb-4">
                          <IconZap className="h-5 w-5" />
                          <p className="text-[15px] font-bold">{de ? "Dein Plan" : "Your plan"}</p>
                        </div>
                        <div className="space-y-2.5">
                          <NextStep num={1} title={de ? "Nische eingrenzen" : "Narrow niche"} desc={de ? `Teste: ${result.trend.relatedQueries.slice(0, 2).join(", ") || result.expandedKeywords.slice(0, 2).join(", ")}` : `Test: ${result.trend.relatedQueries.slice(0, 2).join(", ") || result.expandedKeywords.slice(0, 2).join(", ")}`} />
                          <NextStep num={2} title={de ? "Produkt aussuchen" : "Pick a product"} desc={de ? "Wahle ein CJ Produkt oben und kalkuliere deine Marge." : "Pick a CJ product above and calculate your margin."} />
                          <NextStep num={3} title={de ? "Shop starten" : "Start your shop"} desc={de ? "Erstelle einen Shopify/Lovable Store und liste dein Produkt." : "Create a Shopify/Lovable store and list your product."} />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center rounded-xl bg-white text-[12px] font-bold text-black hover:bg-gray-100 transition">
                            {de ? "Shop bauen" : "Build shop"} <IconExternalLink className="h-3 w-3 ml-1.5" />
                          </a>
                          <button onClick={() => { const kw = result.trend.relatedQueries[0] || result.expandedKeywords[0]; if (kw) scan(kw); }} className="flex h-10 items-center justify-center rounded-xl border border-white/20 text-[12px] font-bold hover:bg-white/10 transition">
                            <IconRefresh className="h-3 w-3 mr-1.5" /> {de ? "Sub-Nische" : "Sub-niche"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Empty state for scanner */}
                {!scanning && !result && (
                  <div className="text-center py-20">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400"><IconSearch className="h-7 w-7" /></div>
                    <p className="text-[16px] font-bold text-gray-900">{de ? "Gib oben eine Nische ein" : "Enter a niche above"}</p>
                    <p className="mt-1 text-[13px] text-gray-400 max-w-sm mx-auto">{de ? "Du bekommst in 30 Sekunden eine ehrliche Analyse mit Score, Trend, Konkurrenz und passenden Produkten." : "Get an honest analysis with score, trend, competition, and matching products in 30 seconds."}</p>
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════
                TAB: PRODUCTS
                ═══════════════════════════════════ */}
            {tab === "products" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-[24px] font-bold text-gray-900">{de ? "Produkte finden" : "Find Products"}</h2>
                  <p className="mt-1 text-[14px] text-gray-500">{de ? "Suche Dropshipping-Produkte direkt von CJ Dropshipping." : "Search dropshipping products directly from CJ Dropshipping."}</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); searchProducts(productSearch); }} className="flex gap-3">
                  <div className="flex-1 flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 focus-within:border-black transition">
                    <IconShoppingBag className="h-4 w-4 text-gray-400 shrink-0" />
                    <input value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder={de ? "z.B. dog bed, phone case, yoga mat..." : "e.g. dog bed, phone case, yoga mat..."} className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400" autoFocus />
                  </div>
                  <button type="submit" disabled={!productSearch.trim() || productsLoading} className="shrink-0 rounded-xl bg-black px-6 py-3 text-[13px] font-bold text-white hover:bg-gray-800 disabled:opacity-30 transition">
                    {productsLoading ? "..." : (de ? "Suchen" : "Search")}
                  </button>
                </form>

                {productsLoading && (
                  <div className="flex items-center justify-center py-16 gap-2 text-[14px] text-gray-400">
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-black animate-spin" />
                    {de ? "Lade Produkte..." : "Loading products..."}
                  </div>
                )}

                {!productsLoading && products.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map(p => <ProductCard key={p.id} product={p} de={de} large />)}
                  </div>
                )}

                {!productsLoading && products.length === 0 && productSearch && (
                  <div className="text-center py-16">
                    <p className="text-[14px] text-gray-400">{de ? "Keine Produkte gefunden. Probier einen anderen Begriff." : "No products found. Try another term."}</p>
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════
                TAB: HISTORY
                ═══════════════════════════════════ */}
            {tab === "history" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[24px] font-bold text-gray-900">{de ? "Scan-Verlauf" : "Scan History"}</h2>
                    <p className="mt-1 text-[14px] text-gray-500">{history.length} {de ? "Scans bisher" : "scans so far"}</p>
                  </div>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm(de ? "Verlauf wirklich loschen?" : "Really delete history?")) { setHistory([]); saveHistory([]); } }} className="text-[12px] text-red-400 hover:text-red-600 transition">
                      {de ? "Alles loschen" : "Clear all"}
                    </button>
                  )}
                </div>

                {history.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[14px] text-gray-400">{de ? "Noch keine Scans." : "No scans yet."}</p>
                    <button onClick={() => setTab("scanner")} className="mt-3 rounded-lg bg-black px-5 py-2.5 text-[13px] font-bold text-white hover:bg-gray-800 transition">{de ? "Ersten Scan starten" : "Start first scan"}</button>
                  </div>
                )}

                <div className="space-y-2">
                  {history.map(h => (
                    <div key={h.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:shadow-sm">
                      <ScoreBadge score={h.result.score.total} />
                      <button onClick={() => { setResult(h.result); setAnimScore(h.result.score.total); setTab("scanner"); }} className="flex-1 min-w-0 text-left">
                        <p className="text-[14px] font-semibold text-gray-900">{h.result.keyword}</p>
                        <p className="text-[11px] text-gray-400 truncate">{h.result.score.summary}</p>
                      </button>
                      <span className="text-[11px] text-gray-300 shrink-0">{new Date(h.date).toLocaleDateString(de ? "de-DE" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => toggleSave(h)} className="rounded-lg p-2 hover:bg-gray-100 transition" title={de ? "Speichern" : "Save"}>
                          <IconBookmark className={`h-3.5 w-3.5 ${saved.find(s => s.id === h.id) ? "text-black" : "text-gray-300"}`} />
                        </button>
                        <button onClick={() => deleteHistoryItem(h.id)} className="rounded-lg p-2 hover:bg-red-50 transition" title={de ? "Loschen" : "Delete"}>
                          <IconTrash className="h-3.5 w-3.5 text-gray-300 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color === "green" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>{icon}</div>
      <p className="text-[24px] font-bold tracking-tight text-gray-900">{value}</p>
      <p className="text-[12px] text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}

function MiniStat({ label, value, inverted }: { label: string; value: number; inverted?: boolean }) {
  const c = inverted
    ? (value >= 65 ? "text-red-600" : value >= 40 ? "text-amber-600" : "text-green-600")
    : (value >= 65 ? "text-green-600" : value >= 40 ? "text-amber-600" : "text-red-600");
  return (
    <div className="text-center">
      <p className={`text-[20px] font-bold ${c}`}>{value}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}

function ScoreBadge({ score, small }: { score: number; small?: boolean }) {
  const color = score >= 65 ? "bg-green-100 text-green-800 border-green-200" :
                score >= 40 ? "bg-amber-100 text-amber-800 border-amber-200" :
                "bg-red-100 text-red-800 border-red-200";
  return (
    <span className={`inline-flex items-center justify-center rounded-full border font-bold ${color} ${small ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-[13px]"}`}>{score}</span>
  );
}

function VerdictCard({ result, animScore, de }: { result: ScanResult; animScore: number; de: boolean }) {
  const score = result.score.total;
  const isGood = score >= 65;
  const isMeh = score >= 40 && score < 65;

  const bgGradient = isGood ? "from-green-50 via-emerald-50 to-white border-green-200" :
                     isMeh ? "from-amber-50 via-orange-50 to-white border-amber-200" :
                     "from-red-50 via-pink-50 to-white border-red-200";
  const verdict = isGood ? (de ? "Gute Nische!" : "Good niche!") :
                  isMeh ? (de ? "Machbar, aber..." : "Possible, but...") :
                  (de ? "Zu viel Konkurrenz" : "Too competitive");
  const sub = isGood ? (de ? "Echte Nachfrage mit machbarer Konkurrenz." : "Real demand with manageable competition.") :
              isMeh ? (de ? "Nachfrage da, aber du brauchst einen klaren Winkel." : "Demand exists, but you need a clear angle.") :
              (de ? "Markt ist voll. Werde spezifischer." : "Market is full. Get more specific.");

  return (
    <div className={`rounded-2xl border-2 bg-gradient-to-b ${bgGradient} p-8 text-center`}>
      <div className="relative inline-flex items-center justify-center">
        <svg className="h-28 w-28" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle cx="60" cy="60" r="52" fill="none" stroke={isGood ? "#22c55e" : isMeh ? "#f59e0b" : "#ef4444"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(animScore / 100) * 327} 327`} transform="rotate(-90 60 60)" className="transition-all duration-700" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[32px] font-bold">{animScore}</span>
          <span className="text-[10px] text-gray-400">/100</span>
        </div>
      </div>
      <h2 className="mt-3 text-[20px] font-bold text-gray-900">{verdict}</h2>
      <p className="mt-1 text-[13px] text-gray-500 max-w-xs mx-auto">{sub}</p>
      <p className="mt-2 inline-block rounded-full bg-white/80 border border-gray-200 px-3 py-1 text-[11px] font-medium text-gray-500">&ldquo;{result.keyword}&rdquo;</p>
    </div>
  );
}

function TrendBadge({ direction, growth, de }: { direction: string; growth: number; de: boolean }) {
  const cls = direction === "rising" ? "bg-green-100 text-green-800" : direction === "falling" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700";
  const label = direction === "rising" ? (de ? "Steigend" : "Rising") : direction === "falling" ? (de ? "Fallend" : "Falling") : (de ? "Stabil" : "Stable");
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${cls}`}>{label} {growth !== 0 && `${growth > 0 ? "+" : ""}${growth}%`}</span>;
}

function MetricCard({ label, value, desc, color, inverted }: { label: string; value: number; desc: string; color: "green" | "amber" | "red"; inverted?: boolean }) {
  const bar = color === "green" ? "bg-green-500" : color === "amber" ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-[11px] font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-[24px] font-bold tracking-tight">{value}<span className="text-[11px] text-gray-300 ml-0.5">/100</span></p>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${bar} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
      {desc && <p className="mt-1.5 text-[10px] text-gray-400 truncate">{desc}</p>}
    </div>
  );
}

function ProductCard({ product: p, de, large }: { product: CJProduct; de: boolean; large?: boolean }) {
  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer" className={`group flex gap-3 rounded-xl border border-gray-100 bg-gray-50/50 ${large ? "p-4" : "p-3"} transition hover:border-gray-300 hover:shadow-sm`}>
      {p.image ? (
        <img src={p.image} alt="" className={`${large ? "h-24 w-24" : "h-20 w-20"} shrink-0 rounded-lg object-cover bg-gray-200`} />
      ) : (
        <div className={`${large ? "h-24 w-24" : "h-20 w-20"} shrink-0 rounded-lg bg-gray-200 flex items-center justify-center text-[10px] text-gray-400`}>No img</div>
      )}
      <div className="flex-1 min-w-0">
        <p className={`${large ? "text-[13px]" : "text-[12px]"} font-semibold text-gray-900 line-clamp-2 leading-tight`}>{p.name}</p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[11px] text-gray-400 line-through">${p.wholesalePrice.toFixed(2)}</span>
          <span className={`${large ? "text-[16px]" : "text-[14px]"} font-bold text-green-700`}>${p.retail.low.toFixed(0)}-${p.retail.high.toFixed(0)}</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-800">{p.retail.margin}% {de ? "Marge" : "margin"}</span>
          <span className="text-[10px] text-gray-400 group-hover:text-blue-600 transition">{de ? "Ansehen" : "View"} <IconExternalLink className="h-2.5 w-2.5 inline" /></span>
        </div>
      </div>
    </a>
  );
}

function NextStep({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/10 p-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">{num}</span>
      <div>
        <p className="text-[13px] font-semibold">{title}</p>
        <p className="mt-0.5 text-[12px] text-white/70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function PlatformRow({ title, items, color }: { title: string; items: string[]; color: "amber" | "red" }) {
  const pill = color === "amber" ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-red-50 border-red-200 text-red-800";
  return (
    <div>
      <p className="text-[11px] font-bold text-gray-600 mb-1.5">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => <span key={i} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${pill}`}>{item}</span>)}
      </div>
    </div>
  );
}

function ScanStep({ label, delay }: { label: string; delay: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => { const t = setTimeout(() => setActive(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={`flex items-center gap-2 transition-all duration-300 ${active ? "opacity-100" : "opacity-0 translate-x-2"}`}>
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-gray-600">{label}</span>
    </div>
  );
}
