"use client";

import React, { FormEvent, useState, useEffect, useCallback } from "react";
import { type Locale, detectLocale } from "@/lib/i18n";

/* ═══════════════════════════════════════════
   KACHING OS DASHBOARD
   Full business cockpit with sidebar, tabs,
   real data, CJ products, and action plans.
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
const IconExt = (p: { className?: string }) => <I {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></I>;
const IconChevDown = (p: { className?: string }) => <I {...p}><path d="m6 9 6 6 6-6" /></I>;
const IconRefresh = (p: { className?: string }) => <I {...p}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></I>;
const IconHome = (p: { className?: string }) => <I {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><polyline points="9 22 9 12 15 12 15 22" /></I>;
const IconBag = (p: { className?: string }) => <I {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></I>;
const IconMenu = (p: { className?: string }) => <I {...p}><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></I>;
const IconTrash = (p: { className?: string }) => <I {...p}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></I>;
const IconUser = (p: { className?: string }) => <I {...p}><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></I>;
const IconBookmark = (p: { className?: string }) => <I {...p}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></I>;
const IconDollar = (p: { className?: string }) => <I {...p}><line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></I>;
const IconBarChart = (p: { className?: string }) => <I {...p}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></I>;
const IconGlobe = (p: { className?: string }) => <I {...p}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></I>;
const IconAward = (p: { className?: string }) => <I {...p}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></I>;
const IconLayers = (p: { className?: string }) => <I {...p}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></I>;

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
  category: string; weight: number; link: string;
};

type HistoryItem = { result: ScanResult; id: string; date: string };
type Tab = "overview" | "scanner" | "products" | "history";

/* ── Storage ── */
function loadLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(key) || "null") ?? fallback; } catch { return fallback; }
}
function saveLS(key: string, val: unknown) { if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(val)); }
function fmtNum(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return n.toString();
}

/* ═══════════════════════════════════════════
   ROOT COMPONENT
   ═══════════════════════════════════════════ */
export default function DashboardPage() {
  const [locale, setLocale] = useState<Locale>("de");
  const [tab, setTab] = useState<Tab>("overview");
  const [sideOpen, setSideOpen] = useState(false);

  // Scanner
  const [q, setQ] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [animScore, setAnimScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Products
  const [products, setProducts] = useState<CJProduct[]>([]);
  const [prodLoading, setProdLoading] = useState(false);
  const [prodQ, setProdQ] = useState("");

  // History / Saved
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [saved, setSaved] = useState<HistoryItem[]>([]);

  const de = locale === "de";
  const t = (deStr: string, enStr: string) => de ? deStr : enStr;

  useEffect(() => { setLocale(detectLocale()); }, []);
  useEffect(() => { setHistory(loadLS("kos_history", [])); setSaved(loadLS("kos_saved", [])); }, []);

  const bestScan = history.length > 0 ? history.reduce((b, h) => h.result.score.total > b.result.score.total ? h : b, history[0]) : null;
  const avgScore = history.length > 0 ? Math.round(history.reduce((s, h) => s + h.result.score.total, 0) / history.length) : 0;
  const goodScans = history.filter(h => h.result.score.total >= 60).length;

  // ── Scan ──
  const scan = useCallback(async (keyword: string) => {
    if (!keyword.trim()) return;
    setQ(keyword);
    setScanning(true);
    setResult(null);
    setAnimScore(0);
    setShowDetails(false);
    setProducts([]);
    setTab("scanner");

    try {
      const res = await fetch("/api/scan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ keyword }) });
      if (!res.ok) throw new Error("fail");
      const data: ScanResult = await res.json();
      setResult(data);
      setScanning(false);

      const item: HistoryItem = { result: data, id: Date.now().toString(), date: new Date().toISOString() };
      const updated = [item, ...history].slice(0, 50);
      setHistory(updated);
      saveLS("kos_history", updated);

      let s = 0;
      const iv = setInterval(() => { s += 2; if (s >= data.score.total) { s = data.score.total; clearInterval(iv); } setAnimScore(s); }, 15);

      // Products (background)
      setProdLoading(true);
      fetch(`/api/products?keyword=${encodeURIComponent(keyword)}`)
        .then(r => r.json())
        .then(d => { if (d.products) setProducts(d.products.slice(0, 8)); })
        .catch(() => {})
        .finally(() => setProdLoading(false));
    } catch { setScanning(false); }
  }, [history]);

  const searchProds = useCallback((kw: string) => {
    if (!kw.trim()) return;
    setProdLoading(true); setProducts([]);
    fetch(`/api/products?keyword=${encodeURIComponent(kw)}`)
      .then(r => r.json())
      .then(d => { if (d.products) setProducts(d.products); })
      .catch(() => {})
      .finally(() => setProdLoading(false));
  }, []);

  const toggleSave = (item: HistoryItem) => {
    const exists = saved.find(s => s.id === item.id);
    const updated = exists ? saved.filter(s => s.id !== item.id) : [item, ...saved];
    setSaved(updated); saveLS("kos_saved", updated);
  };
  const isSaved = (kw: string) => saved.some(s => s.result.keyword === kw);
  const delHistory = (id: string) => { const u = history.filter(h => h.id !== id); setHistory(u); saveLS("kos_history", u); };

  const navItems: { tab: Tab; icon: React.ReactNode; label: string; badge?: string }[] = [
    { tab: "overview", icon: <IconHome className="h-5 w-5" />, label: t("Ubersicht", "Overview") },
    { tab: "scanner", icon: <IconSearch className="h-5 w-5" />, label: t("Nischen-Scanner", "Niche Scanner") },
    { tab: "products", icon: <IconBag className="h-5 w-5" />, label: t("Produkte finden", "Find Products"), badge: "CJ" },
    { tab: "history", icon: <IconClock className="h-5 w-5" />, label: t("Verlauf", "History"), badge: history.length > 0 ? String(history.length) : undefined },
  ];

  return (
    <div className="flex h-screen bg-[#F5F6F8] overflow-hidden">
      {/* ═══ SIDEBAR ═══ */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] border-r border-gray-200/80 bg-white flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${sideOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-100">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-black text-[12px] font-black text-white tracking-tight">K</span>
          <div>
            <p className="text-[15px] font-bold tracking-tight leading-none">Kaching OS</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Niche Intelligence</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-3 pb-2">{t("Navigation", "Navigation")}</p>
          {navItems.map(item => (
            <button key={item.tab} onClick={() => { setTab(item.tab); setSideOpen(false); }}
              className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition ${tab === item.tab ? "bg-black text-white shadow-lg shadow-black/10" : "text-gray-600 hover:bg-gray-50"}`}>
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${tab === item.tab ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>{item.badge}</span>}
            </button>
          ))}

          {/* Saved section */}
          {saved.length > 0 && (
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-5 pb-2">{t("Gespeicherte Nischen", "Saved Niches")}</p>
              {saved.slice(0, 6).map(s => (
                <button key={s.id} onClick={() => { setResult(s.result); setAnimScore(s.result.score.total); setTab("scanner"); setSideOpen(false); }}
                  className="w-full flex items-center gap-2.5 rounded-lg px-3.5 py-2 text-[12px] text-gray-500 hover:bg-gray-50 transition">
                  <IconBookmark className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="truncate flex-1 text-left">{s.result.keyword}</span>
                  <span className={`text-[10px] font-bold ${s.result.score.total >= 60 ? "text-green-600" : "text-gray-400"}`}>{s.result.score.total}</span>
                </button>
              ))}
            </>
          )}
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"><IconUser className="h-4 w-4" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-gray-900">Pro Account</p>
              <p className="text-[10px] text-gray-400">{history.length} {t("Scans durchgefuhrt", "scans completed")}</p>
            </div>
            <button onClick={() => setLocale(locale === "de" ? "en" : "de")} className="text-[10px] font-bold bg-white rounded-md px-2 py-1 text-gray-500 hover:text-black transition border border-gray-200">{locale === "de" ? "EN" : "DE"}</button>
          </div>
        </div>
      </aside>

      {sideOpen && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setSideOpen(false)} />}

      {/* ═══ MAIN ═══ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile bar */}
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden shrink-0">
          <button onClick={() => setSideOpen(true)} className="rounded-lg p-2 hover:bg-gray-100"><IconMenu className="h-5 w-5" /></button>
          <span className="text-[14px] font-bold">Kaching OS</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 sm:px-8 py-6 sm:py-8">

            {/* ═══ OVERVIEW ═══ */}
            {tab === "overview" && (
              <div className="space-y-7">
                {/* Header */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">{t("Dashboard", "Dashboard")}</p>
                    <h1 className="text-[26px] sm:text-[32px] font-bold tracking-tight text-gray-900 mt-1">{t("Willkommen zuruck", "Welcome back")}</h1>
                  </div>
                  <button onClick={() => setTab("scanner")} className="hidden sm:flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-[12px] font-bold text-white hover:bg-gray-800 transition shadow-lg shadow-black/10">
                    <IconSearch className="h-4 w-4" /> {t("Neuer Scan", "New Scan")}
                  </button>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-[40px] flex items-end justify-start pl-3 pb-3"><IconBarChart className="h-5 w-5 text-blue-400" /></div>
                    <p className="text-[28px] font-bold text-gray-900">{history.length}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t("Scans gesamt", "Total Scans")}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-[40px] flex items-end justify-start pl-3 pb-3"><IconCheck className="h-5 w-5 text-green-400" /></div>
                    <p className="text-[28px] font-bold text-green-600">{goodScans}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t("Gute Nischen", "Good Niches")} (60+)</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-[40px] flex items-end justify-start pl-3 pb-3"><IconTarget className="h-5 w-5 text-amber-400" /></div>
                    <p className="text-[28px] font-bold text-gray-900">{avgScore || "—"}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t("Durchschn. Score", "Avg. Score")}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-[40px] flex items-end justify-start pl-3 pb-3"><IconBookmark className="h-5 w-5 text-purple-400" /></div>
                    <p className="text-[28px] font-bold text-gray-900">{saved.length}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t("Gespeichert", "Saved")}</p>
                  </div>
                </div>

                {/* Quick scan card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <IconZap className="h-5 w-5 text-amber-500" />
                    <p className="text-[15px] font-bold text-gray-900">{t("Schnell-Scan", "Quick Scan")}</p>
                  </div>
                  <form onSubmit={(e: FormEvent) => { e.preventDefault(); scan(q); }} className="flex gap-3">
                    <div className="flex-1 flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-gray-50/50 px-4 py-3 focus-within:border-black focus-within:bg-white transition">
                      <IconSearch className="h-4 w-4 text-gray-400 shrink-0" />
                      <input value={q} onChange={e => setQ(e.target.value)} placeholder={t("z.B. Hundefutter, KI Coaching, Nachhilfe...", "e.g. Dog Food, AI Coaching, Tutoring...")} className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400" />
                    </div>
                    <button type="submit" disabled={!q.trim()} className="shrink-0 rounded-xl bg-black px-6 py-3 text-[13px] font-bold text-white hover:bg-gray-800 disabled:opacity-20 transition shadow-lg shadow-black/10">
                      <IconArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {(de ? ["Hundefutter", "KI Coaching", "Nachhilfe", "Schmuck", "Fitness App", "Kerzen", "Yogamatte"] : ["Dog Food", "AI Coaching", "Tutoring", "Jewelry", "Fitness App", "Candles", "Yoga Mat"]).map(kw => (
                      <button key={kw} onClick={() => { setQ(kw); scan(kw); }} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-500 hover:border-black hover:text-black transition">{kw}</button>
                    ))}
                  </div>
                </div>

                {/* Two columns: Best niche + How it works */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Best niche */}
                  {bestScan ? (
                    <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-b from-green-50 to-white p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <IconAward className="h-5 w-5 text-green-600" />
                          <p className="text-[13px] font-bold text-green-900">{t("Deine beste Nische", "Your Best Niche")}</p>
                        </div>
                        <ScoreBadge score={bestScan.result.score.total} />
                      </div>
                      <p className="text-[22px] font-bold text-gray-900 mt-2">{bestScan.result.keyword}</p>
                      <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{bestScan.result.score.summary}</p>
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        <MiniMetric label={t("Nachfrage", "Demand")} val={bestScan.result.score.demand} />
                        <MiniMetric label={t("Konkurrenz", "Compet.")} val={bestScan.result.score.competitionRaw || 50} invert />
                        <MiniMetric label="Trend" val={bestScan.result.score.trend} />
                        <MiniMetric label="Intent" val={bestScan.result.score.intent} />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => { setResult(bestScan.result); setAnimScore(bestScan.result.score.total); setTab("scanner"); }} className="flex-1 rounded-xl bg-green-700 py-2.5 text-[12px] font-bold text-white hover:bg-green-800 transition text-center">{t("Details ansehen", "View Details")}</button>
                        <button onClick={() => { setProdQ(bestScan.result.keyword); setTab("products"); searchProds(bestScan.result.keyword); }} className="flex-1 rounded-xl border border-green-300 py-2.5 text-[12px] font-bold text-green-800 hover:bg-green-50 transition text-center">{t("Produkte finden", "Find Products")}</button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 flex flex-col items-center justify-center text-center">
                      <IconTarget className="h-10 w-10 text-gray-300 mb-3" />
                      <p className="text-[14px] font-bold text-gray-400">{t("Noch keine Nische getestet", "No niche tested yet")}</p>
                      <p className="text-[12px] text-gray-300 mt-1">{t("Starte deinen ersten Scan!", "Start your first scan!")}</p>
                    </div>
                  )}

                  {/* How it works */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <IconLayers className="h-5 w-5 text-gray-400" />
                      <p className="text-[13px] font-bold text-gray-900">{t("So verdienst du Geld", "How to make money")}</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { n: "1", title: t("Nische finden", "Find niche"), desc: t("Scanne Keywords und finde eine Nische mit hoher Nachfrage und wenig Konkurrenz.", "Scan keywords and find a niche with high demand and low competition."), icon: <IconSearch className="h-4 w-4" /> },
                        { n: "2", title: t("Produkt wahlen", "Pick product"), desc: t("Wahle ein Dropshipping-Produkt von CJ mit guter Marge.", "Pick a dropshipping product from CJ with good margins."), icon: <IconBag className="h-4 w-4" /> },
                        { n: "3", title: t("Shop starten", "Launch shop"), desc: t("Erstelle einen Shopify/Lovable Shop und starte mit Werbung.", "Create a Shopify/Lovable shop and start advertising."), icon: <IconGlobe className="h-4 w-4" /> },
                        { n: "4", title: t("Skalieren", "Scale"), desc: t("Optimiere und skaliere was funktioniert. Tracke mit Kaching OS.", "Optimize and scale what works. Track with Kaching OS."), icon: <IconDollar className="h-4 w-4" /> },
                      ].map(step => (
                        <div key={step.n} className="flex gap-3 items-start">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white text-[11px] font-bold">{step.n}</div>
                          <div>
                            <p className="text-[12px] font-bold text-gray-900">{step.title}</p>
                            <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent scans table */}
                {history.length > 0 && (
                  <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                      <p className="text-[14px] font-bold text-gray-900">{t("Letzte Scans", "Recent Scans")}</p>
                      <button onClick={() => setTab("history")} className="text-[11px] font-medium text-gray-400 hover:text-black transition">{t("Alle anzeigen", "View all")} →</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {history.slice(0, 6).map(h => (
                        <button key={h.id} onClick={() => { setResult(h.result); setAnimScore(h.result.score.total); setTab("scanner"); }}
                          className="w-full flex items-center gap-4 px-6 py-3.5 text-left hover:bg-gray-50/50 transition">
                          <ScoreBadge score={h.result.score.total} small />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-gray-900 truncate">{h.result.keyword}</p>
                            <div className="flex gap-3 mt-0.5">
                              <span className="text-[10px] text-gray-400">{t("Nachfrage", "Demand")}: {h.result.score.demand}</span>
                              <span className="text-[10px] text-gray-400">{t("Konkurrenz", "Compet.")}: {h.result.score.competitionRaw || "—"}</span>
                              <span className="text-[10px] text-gray-400">Trend: {h.result.score.trend}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-300 shrink-0">{new Date(h.date).toLocaleDateString(de ? "de-DE" : "en-US", { day: "numeric", month: "short" })}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ═══ SCANNER ═══ */}
            {tab === "scanner" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <form onSubmit={(e: FormEvent) => { e.preventDefault(); scan(q); }} className="flex-1 flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 focus-within:border-black transition shadow-sm">
                    <IconSearch className="h-4 w-4 text-gray-400 shrink-0" />
                    <input value={q} onChange={e => setQ(e.target.value)} placeholder={t("Nische eingeben...", "Enter niche...")} className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400" autoFocus />
                    <button type="submit" disabled={!q.trim() || scanning} className="shrink-0 rounded-lg bg-black px-5 py-2 text-[12px] font-bold text-white hover:bg-gray-800 disabled:opacity-20 transition">
                      {scanning ? "..." : t("Scannen", "Scan")}
                    </button>
                  </form>
                </div>

                {scanning && <ScanningAnimation q={q} de={de} />}

                {!scanning && result && (
                  <div className="space-y-5">
                    {/* Verdict */}
                    <div className="relative">
                      <VerdictCard result={result} animScore={animScore} de={de} />
                      <button onClick={() => toggleSave({ result, id: result.keyword + result.scannedAt, date: result.scannedAt })}
                        className="absolute top-4 right-4 rounded-full bg-white/90 p-2.5 border border-gray-200 hover:bg-white shadow-sm transition" title={t("Speichern", "Save")}>
                        <IconBookmark className={`h-4 w-4 ${isSaved(result.keyword) ? "text-amber-500 fill-amber-500" : "text-gray-400"}`} />
                      </button>
                    </div>

                    {/* Summary */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                      <p className="text-[13px] font-bold text-gray-900 mb-2">{t("Einschatzung", "Assessment")}</p>
                      <p className="text-[13px] leading-relaxed text-gray-600">{result.score.summary}</p>
                      {result.score.total >= 60 && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2.5">
                          <IconCheck className="h-4 w-4 text-green-600 shrink-0" />
                          <p className="text-[11px] text-green-800 font-medium">{t("Diese Nische hat Potenzial — scrolle zu den Produkten!", "This niche has potential — scroll to products!")}</p>
                        </div>
                      )}
                      {result.score.total < 40 && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5">
                          <IconX className="h-4 w-4 text-red-500 shrink-0" />
                          <p className="text-[11px] text-red-700 font-medium">{t("Zu viel Konkurrenz. Probier spezifischere Keywords.", "Too much competition. Try more specific keywords.")}</p>
                        </div>
                      )}
                    </div>

                    {/* 4 metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <MetricCard label={t("Nachfrage", "Demand")} value={result.score.demand} desc={`${result.autocomplete.count} suggestions`} color={result.score.demand >= 65 ? "green" : result.score.demand >= 40 ? "amber" : "red"} />
                      <MetricCard label={t("Konkurrenz", "Competition")} value={result.score.competitionRaw || (100 - result.score.competition)} desc={result.competition?.googleResults ? fmtNum(result.competition.googleResults) : ""} color={(result.score.competitionRaw || 50) >= 65 ? "red" : (result.score.competitionRaw || 50) >= 40 ? "amber" : "green"} inverted />
                      <MetricCard label="Trend" value={result.score.trend} desc={result.score.trendLabel} color={result.score.trend >= 60 ? "green" : result.score.trend >= 40 ? "amber" : "red"} />
                      <MetricCard label={t("Kaufintent", "Buy Intent")} value={result.score.intent} desc={result.autocomplete.commercialIntent ? t("Kaufsignale", "Buy signals") : "—"} color={result.score.intent >= 60 ? "green" : result.score.intent >= 35 ? "amber" : "red"} />
                    </div>

                    {/* Trend chart */}
                    {result.trend.timeline.length > 0 && (
                      <div className="rounded-2xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[13px] font-bold text-gray-900"><IconTrending className="h-4 w-4 inline mr-1.5 text-gray-400" />{t("Suchinteresse", "Search Interest")}</p>
                          <TrendBadge dir={result.trend.direction} growth={result.trend.growthPercent} de={de} />
                        </div>
                        <TrendChart data={result.trend.timeline} direction={result.trend.direction} />
                      </div>
                    )}

                    {/* CJ PRODUCTS */}
                    <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50/50 to-white p-6">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <IconBag className="h-5 w-5 text-blue-600" />
                          <p className="text-[15px] font-bold text-gray-900">{t("Produkte zum Verkaufen", "Products to Sell")}</p>
                        </div>
                        <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[9px] font-bold text-white tracking-wider">CJ DROPSHIPPING</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-4">{t("Kein Lager notig — CJ versendet direkt an deinen Kunden", "No inventory needed — CJ ships directly to your customer")}</p>

                      {prodLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                          <div className="h-8 w-8 rounded-full border-3 border-gray-200 border-t-blue-600 animate-spin" />
                          <p className="text-[12px] text-gray-400">{t("Suche passende Produkte...", "Finding matching products...")}</p>
                        </div>
                      ) : products.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {products.slice(0, 6).map(p => <ProductCard key={p.id} p={p} de={de} />)}
                          </div>
                          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3.5 flex items-start gap-2.5">
                            <IconZap className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[11px] font-bold text-blue-900">{t("So funktioniert's", "How it works")}</p>
                              <p className="text-[10px] text-blue-700 leading-relaxed mt-0.5">{t("1. Wahle ein Produkt → 2. Liste es in deinem Shop → 3. Kunde bestellt → 4. CJ versendet direkt → 5. Du behaltst die Marge", "1. Pick a product → 2. List it in your shop → 3. Customer orders → 4. CJ ships directly → 5. You keep the margin")}</p>
                            </div>
                          </div>
                          {products.length > 6 && (
                            <button onClick={() => { setProdQ(result.keyword); setTab("products"); }} className="mt-3 text-[11px] font-medium text-blue-600 hover:text-blue-800 transition">
                              {t("Alle Produkte anzeigen", "View all products")} →
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-[12px] text-gray-400">{t("Keine Produkte gefunden. Probier den Produkte-Tab mit einem englischen Suchbegriff.", "No products found. Try the Products tab with an English search term.")}</p>
                        </div>
                      )}
                    </div>

                    {/* Expandable details */}
                    <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-[11px] font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition">
                      {showDetails ? t("Weniger", "Less") : t("Detaillierte Daten", "Detailed data")}
                      <IconChevDown className={`h-3.5 w-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`} />
                    </button>

                    {showDetails && (
                      <div className="space-y-4">
                        {result.platforms && (
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-[13px] font-bold text-gray-900 mb-3">{t("Plattform-Signale", "Platform Signals")}</p>
                            <div className="space-y-3">
                              {result.platforms.amazon.length > 0 && <PillRow title="Amazon" items={result.platforms.amazon.slice(0, 6)} c="amber" />}
                              {result.platforms.youtube.length > 0 && <PillRow title="YouTube" items={result.platforms.youtube.slice(0, 6)} c="red" />}
                              {result.platforms.reddit.length > 0 && (
                                <div>
                                  <p className="text-[11px] font-bold text-gray-600 mb-1.5">Reddit</p>
                                  {result.platforms.reddit.slice(0, 3).map((p, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5 mb-1 text-[10px]">
                                      <span className="font-bold text-orange-700">{p.score}</span>
                                      <span className="text-gray-600 truncate">{p.title}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {result.competition && (
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-[13px] font-bold text-gray-900 mb-3">{t("Konkurrenz-Details", "Competition Details")}</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-xl bg-gray-50 p-4 text-center">
                                <p className="text-[20px] font-bold">{result.competition.googleResults > 0 ? fmtNum(result.competition.googleResults) : "—"}</p>
                                <p className="text-[10px] text-gray-400">Google {t("Ergebnisse", "results")}</p>
                              </div>
                              <div className="rounded-xl bg-gray-50 p-4 text-center">
                                <p className="text-[20px] font-bold">{result.competition.wikipedia ? "Ja" : "Nein"}</p>
                                <p className="text-[10px] text-gray-400">Wikipedia</p>
                              </div>
                            </div>
                            {result.competition.reasons.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {result.competition.reasons.map((r, i) => <span key={i} className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] text-gray-500">{r}</span>)}
                              </div>
                            )}
                          </div>
                        )}
                        {(result.trend.relatedQueries.length > 0 || result.expandedKeywords.length > 0) && (
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <p className="text-[13px] font-bold text-gray-900 mb-3">{t("Verwandte Nischen zum Testen", "Related Niches to Test")}</p>
                            <div className="flex flex-wrap gap-2">
                              {[...result.trend.relatedQueries.slice(0, 6), ...result.expandedKeywords.slice(0, 8)].map((kw, i) => (
                                <button key={i} onClick={() => scan(kw)} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:border-black hover:text-black transition">{kw}</button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action plan */}
                    {result.score.total >= 40 && (
                      <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black p-6 text-white">
                        <div className="flex items-center gap-2 mb-4">
                          <IconZap className="h-5 w-5 text-amber-400" />
                          <p className="text-[15px] font-bold">{t("Dein Action Plan", "Your Action Plan")}</p>
                        </div>
                        <div className="space-y-2.5">
                          <ActionStep n={1} title={t("Sub-Nische finden", "Find sub-niche")} desc={t(`Teste: ${[...result.trend.relatedQueries.slice(0, 2), ...result.expandedKeywords.slice(0, 1)].join(", ")}`, `Test: ${[...result.trend.relatedQueries.slice(0, 2), ...result.expandedKeywords.slice(0, 1)].join(", ")}`)} />
                          <ActionStep n={2} title={t("CJ Produkt wahlen", "Pick CJ product")} desc={t("Wahle oben ein Produkt mit 60%+ Marge.", "Pick a product above with 60%+ margin.")} />
                          <ActionStep n={3} title={t("Shop aufsetzen", "Set up shop")} desc={t("Erstelle deinen Shop mit Lovable oder Shopify.", "Create your store with Lovable or Shopify.")} />
                          <ActionStep n={4} title={t("Ersten Kunden gewinnen", "Get first customer")} desc={t("Starte mit Instagram/TikTok Ads — Budget: 5-10€/Tag.", "Start with Instagram/TikTok Ads — budget: $5-10/day.")} />
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-2">
                          <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center rounded-xl bg-white text-[12px] font-bold text-black hover:bg-gray-100 transition gap-1.5">
                            {t("Shop bauen", "Build Shop")} <IconExt className="h-3 w-3" />
                          </a>
                          <button onClick={() => { const kw = result.trend.relatedQueries[0] || result.expandedKeywords[0]; if (kw) scan(kw); }} className="flex h-11 items-center justify-center rounded-xl border border-white/20 text-[12px] font-bold hover:bg-white/10 transition gap-1.5">
                            <IconRefresh className="h-3 w-3" /> {t("Sub-Nische testen", "Test sub-niche")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!scanning && !result && (
                  <div className="text-center py-24">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-gray-300"><IconSearch className="h-9 w-9" /></div>
                    <p className="text-[17px] font-bold text-gray-900">{t("Nische eingeben und scannen", "Enter a niche and scan")}</p>
                    <p className="mt-1.5 text-[13px] text-gray-400 max-w-md mx-auto">{t("Du bekommst Score, Trend, Konkurrenz-Analyse und passende Dropshipping-Produkte — alles in 30 Sekunden.", "Get score, trend, competition analysis, and matching dropshipping products — all in 30 seconds.")}</p>
                  </div>
                )}
              </div>
            )}

            {/* ═══ PRODUCTS ═══ */}
            {tab === "products" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">CJ Dropshipping</p>
                  <h2 className="text-[26px] font-bold text-gray-900 mt-1">{t("Produkte finden", "Find Products")}</h2>
                  <p className="text-[13px] text-gray-500 mt-1">{t("Suche auf Englisch fur beste Ergebnisse (z.B. 'dog bed' statt 'Hundebett')", "Search products to dropship — no inventory needed")}</p>
                </div>

                <form onSubmit={(e: FormEvent) => { e.preventDefault(); searchProds(prodQ); }} className="flex gap-3">
                  <div className="flex-1 flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 focus-within:border-black transition shadow-sm">
                    <IconBag className="h-4 w-4 text-gray-400 shrink-0" />
                    <input value={prodQ} onChange={e => setProdQ(e.target.value)} placeholder="e.g. dog bed, phone case, yoga mat..." className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-gray-400" autoFocus />
                  </div>
                  <button type="submit" disabled={!prodQ.trim() || prodLoading} className="shrink-0 rounded-xl bg-black px-6 py-3 text-[13px] font-bold text-white hover:bg-gray-800 disabled:opacity-20 transition">
                    {prodLoading ? "..." : t("Suchen", "Search")}
                  </button>
                </form>

                {prodLoading && (
                  <div className="flex items-center justify-center py-20 gap-3 text-[13px] text-gray-400">
                    <div className="h-6 w-6 rounded-full border-2 border-gray-200 border-t-black animate-spin" />
                    {t("Lade Produkte von CJ...", "Loading products from CJ...")}
                  </div>
                )}

                {!prodLoading && products.length > 0 && (
                  <>
                    <p className="text-[12px] text-gray-400">{products.length} {t("Produkte gefunden", "products found")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map(p => <ProductCard key={p.id} p={p} de={de} large />)}
                    </div>
                  </>
                )}

                {!prodLoading && products.length === 0 && prodQ && (
                  <div className="text-center py-16">
                    <p className="text-[13px] text-gray-400">{t("Keine Produkte gefunden. Probier einen englischen Begriff.", "No products found. Try a different term.")}</p>
                  </div>
                )}
              </div>
            )}

            {/* ═══ HISTORY ═══ */}
            {tab === "history" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">{t("Verlauf", "History")}</p>
                    <h2 className="text-[26px] font-bold text-gray-900 mt-1">{t("Deine Scans", "Your Scans")}</h2>
                  </div>
                  {history.length > 0 && (
                    <button onClick={() => { if (confirm(t("Verlauf wirklich loschen?", "Really delete history?"))) { setHistory([]); saveLS("kos_history", []); } }} className="text-[11px] text-gray-300 hover:text-red-500 transition">{t("Alles loschen", "Clear all")}</button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-20">
                    <IconClock className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-[14px] text-gray-400">{t("Noch keine Scans.", "No scans yet.")}</p>
                    <button onClick={() => setTab("scanner")} className="mt-3 rounded-lg bg-black px-5 py-2.5 text-[12px] font-bold text-white">{t("Ersten Scan starten", "Start first scan")}</button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-50">
                    {history.map(h => (
                      <div key={h.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition">
                        <ScoreBadge score={h.result.score.total} />
                        <button onClick={() => { setResult(h.result); setAnimScore(h.result.score.total); setTab("scanner"); }} className="flex-1 min-w-0 text-left">
                          <p className="text-[13px] font-semibold text-gray-900">{h.result.keyword}</p>
                          <div className="flex gap-3 mt-0.5 text-[10px] text-gray-400">
                            <span>{t("Nachfrage", "Demand")}: {h.result.score.demand}</span>
                            <span>{t("Konkurrenz", "Comp.")}: {h.result.score.competitionRaw || "—"}</span>
                            <span>Trend: {h.result.score.trend}</span>
                          </div>
                        </button>
                        <span className="text-[10px] text-gray-300 shrink-0 hidden sm:block">{new Date(h.date).toLocaleDateString(de ? "de-DE" : "en-US", { day: "numeric", month: "short" })}</span>
                        <button onClick={() => toggleSave(h)} className="p-1.5 rounded-lg hover:bg-gray-100 transition"><IconBookmark className={`h-3.5 w-3.5 ${saved.find(s => s.id === h.id) ? "text-amber-500" : "text-gray-200"}`} /></button>
                        <button onClick={() => delHistory(h.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition"><IconTrash className="h-3.5 w-3.5 text-gray-200 hover:text-red-400" /></button>
                      </div>
                    ))}
                  </div>
                )}
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

function ScoreBadge({ score, small }: { score: number; small?: boolean }) {
  const c = score >= 65 ? "bg-green-100 text-green-700 border-green-200" : score >= 40 ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-red-100 text-red-700 border-red-200";
  return <span className={`inline-flex items-center justify-center rounded-full border font-bold ${c} ${small ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-[12px]"}`}>{score}</span>;
}

function MiniMetric({ label, val, invert }: { label: string; val: number; invert?: boolean }) {
  const c = invert ? (val >= 65 ? "text-red-600" : val >= 40 ? "text-amber-600" : "text-green-600") : (val >= 65 ? "text-green-600" : val >= 40 ? "text-amber-600" : "text-red-600");
  return <div className="text-center"><p className={`text-[18px] font-bold ${c}`}>{val}</p><p className="text-[9px] text-gray-400 mt-0.5">{label}</p></div>;
}

function VerdictCard({ result, animScore, de }: { result: ScanResult; animScore: number; de: boolean }) {
  const s = result.score.total;
  const good = s >= 65, mid = s >= 40 && s < 65;
  const grad = good ? "from-green-50 to-white border-green-200" : mid ? "from-amber-50 to-white border-amber-200" : "from-red-50 to-white border-red-200";
  const verdict = good ? (de ? "Gute Nische!" : "Good niche!") : mid ? (de ? "Machbar, aber..." : "Possible, but...") : (de ? "Schwierig" : "Tough market");
  const sub = good ? (de ? "Nachfrage + machbare Konkurrenz." : "Demand + manageable competition.") : mid ? (de ? "Du brauchst einen klaren Winkel." : "You need a clear angle.") : (de ? "Werde spezifischer." : "Get more specific.");

  return (
    <div className={`rounded-2xl border-2 bg-gradient-to-b ${grad} p-7 text-center`}>
      <div className="relative inline-flex items-center justify-center">
        <svg className="h-28 w-28" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle cx="60" cy="60" r="52" fill="none" stroke={good ? "#22c55e" : mid ? "#f59e0b" : "#ef4444"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(animScore / 100) * 327} 327`} transform="rotate(-90 60 60)" className="transition-all duration-700" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[32px] font-bold tracking-tight">{animScore}</span>
          <span className="text-[10px] text-gray-400">/100</span>
        </div>
      </div>
      <h2 className="mt-3 text-[20px] font-bold text-gray-900">{verdict}</h2>
      <p className="mt-1 text-[12px] text-gray-500">{sub}</p>
      <p className="mt-2 inline-block rounded-full bg-white/80 border border-gray-200 px-3 py-1 text-[11px] font-medium text-gray-500">&ldquo;{result.keyword}&rdquo;</p>
    </div>
  );
}

function TrendBadge({ dir, growth, de }: { dir: string; growth: number; de: boolean }) {
  const cls = dir === "rising" ? "bg-green-100 text-green-700" : dir === "falling" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600";
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${cls}`}>{dir === "rising" ? (de ? "Steigend" : "Rising") : dir === "falling" ? (de ? "Fallend" : "Falling") : (de ? "Stabil" : "Stable")} {growth !== 0 && `${growth > 0 ? "+" : ""}${growth}%`}</span>;
}

function TrendChart({ data, direction }: { data: { date: string; value: number }[]; direction: string }) {
  const pts = data.slice(-30);
  const max = Math.max(...pts.map(p => p.value), 1);
  const c = direction === "rising" ? "bg-green-500" : direction === "falling" ? "bg-red-400" : "bg-gray-400";
  return (
    <div className="flex h-24 items-end gap-[2px] rounded-lg bg-gray-50 p-2">
      {pts.map((p, i) => <span key={i} className={`flex-1 rounded-sm ${c} hover:opacity-70 transition`} style={{ height: `${Math.max(4, (p.value / max) * 100)}%` }} />)}
    </div>
  );
}

function MetricCard({ label, value, desc, color, inverted }: { label: string; value: number; desc: string; color: "green" | "amber" | "red"; inverted?: boolean }) {
  const bar = color === "green" ? "bg-green-500" : color === "amber" ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1.5 text-[22px] font-bold tracking-tight">{value}<span className="text-[10px] text-gray-300 ml-0.5">/100</span></p>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className={`h-full rounded-full ${bar} transition-all duration-700`} style={{ width: `${value}%` }} /></div>
      {desc && <p className="mt-1.5 text-[10px] text-gray-400 truncate">{desc}</p>}
    </div>
  );
}

function ProductCard({ p, de, large }: { p: CJProduct; de: boolean; large?: boolean }) {
  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer" className={`group flex gap-3 rounded-xl border border-gray-200 bg-white ${large ? "p-4" : "p-3"} transition hover:border-blue-300 hover:shadow-md hover:shadow-blue-100/50`}>
      {p.image ? <img src={p.image} alt="" className={`${large ? "h-28 w-28" : "h-20 w-20"} shrink-0 rounded-lg object-cover bg-gray-100`} />
               : <div className={`${large ? "h-28 w-28" : "h-20 w-20"} shrink-0 rounded-lg bg-gray-100`} />}
      <div className="flex-1 min-w-0">
        <p className={`${large ? "text-[13px]" : "text-[12px]"} font-semibold text-gray-900 line-clamp-2 leading-snug`}>{p.name}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[10px] text-gray-400 line-through">${p.wholesalePrice.toFixed(2)}</span>
          <span className={`${large ? "text-[18px]" : "text-[15px]"} font-bold text-green-700`}>${p.retail.low.toFixed(0)}–${p.retail.high.toFixed(0)}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="rounded-md bg-green-100 px-2 py-0.5 text-[9px] font-bold text-green-800">{p.retail.margin}% {de ? "Marge" : "margin"}</span>
          <span className="text-[9px] text-gray-300 group-hover:text-blue-500 transition">{de ? "Auf CJ ansehen" : "View on CJ"} →</span>
        </div>
      </div>
    </a>
  );
}

function ActionStep({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/10 p-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-bold text-black">{n}</span>
      <div><p className="text-[12px] font-bold">{title}</p><p className="text-[11px] text-white/60 leading-relaxed mt-0.5">{desc}</p></div>
    </div>
  );
}

function PillRow({ title, items, c }: { title: string; items: string[]; c: "amber" | "red" }) {
  const cls = c === "amber" ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-red-50 border-red-200 text-red-800";
  return (
    <div>
      <p className="text-[11px] font-bold text-gray-600 mb-1.5">{title}</p>
      <div className="flex flex-wrap gap-1.5">{items.map((x, i) => <span key={i} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${cls}`}>{x}</span>)}</div>
    </div>
  );
}

function ScanningAnimation({ q, de }: { q: string; de: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-gray-200 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center"><div className="h-16 w-16 rounded-full border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent animate-spin" /></div>
        <div className="absolute inset-0 flex items-center justify-center"><IconSearch className="h-6 w-6 text-gray-400" /></div>
      </div>
      <p className="mt-5 text-[16px] font-bold text-gray-900">{de ? "Analysiere" : "Analyzing"} &ldquo;{q}&rdquo;</p>
      <div className="mt-3 space-y-2 text-[12px]">
        {[{ l: "Google + Trends", d: 0 }, { l: "Amazon + YouTube + Reddit", d: 400 }, { l: de ? "Konkurrenz + Produkte" : "Competition + Products", d: 800 }].map((s, i) => (
          <ScanStep key={i} label={s.l} delay={s.d} />
        ))}
      </div>
    </div>
  );
}

function ScanStep({ label, delay }: { label: string; delay: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={`flex items-center gap-2 transition-all duration-300 ${on ? "opacity-100" : "opacity-0 translate-x-3"}`}>
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-gray-600">{label}</span>
    </div>
  );
}
