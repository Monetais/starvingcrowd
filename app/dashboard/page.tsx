"use client";

import React, { FormEvent, useState, useEffect, useRef } from "react";
import { type Locale, detectLocale } from "@/lib/i18n";

/* ══════════════════════════════════════
   DASHBOARD — Guided experience with dopamine triggers

   Journey: Scan → Celebrate → Understand → Act
   Every step gives the user a small win.
   ══════════════════════════════════════ */

/* ── Minimal Icons (inline SVG) ── */
function I({ children, className = "h-4 w-4" }: { children: React.ReactNode; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}
const IconSearch = (p: { className?: string }) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>;
const IconArrowRight = (p: { className?: string }) => <I {...p}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></I>;
const IconCheck = (p: { className?: string }) => <I {...p}><path d="M5 12l5 5L20 7" /></I>;
const IconTrending = (p: { className?: string }) => <I {...p}><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></I>;
const IconX = (p: { className?: string }) => <I {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></I>;
const IconStar = (p: { className?: string }) => <I {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2-4.4-4.3 6.1-.9L12 3Z" fill="currentColor" /></I>;
const IconZap = (p: { className?: string }) => <I {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></I>;
const IconTarget = (p: { className?: string }) => <I {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></I>;
const IconClock = (p: { className?: string }) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></I>;
const IconExternalLink = (p: { className?: string }) => <I {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></I>;
const IconChevronDown = (p: { className?: string }) => <I {...p}><path d="m6 9 6 6 6-6" /></I>;
const IconRefresh = (p: { className?: string }) => <I {...p}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></I>;
const IconShoppingBag = (p: { className?: string }) => <I {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></I>;

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
  id: string;
  name: string;
  image: string;
  wholesalePrice: number;
  retail: { low: number; high: number; margin: number };
  category: string;
  weight: number;
  supplier: string;
  link: string;
};

type HistoryItem = { result: ScanResult; id: string; date: string };

/* ── Helpers ── */
function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("kos_history") || "[]"); } catch { return []; }
}
function saveHistory(h: HistoryItem[]) {
  if (typeof window !== "undefined") localStorage.setItem("kos_history", JSON.stringify(h.slice(0, 30)));
}
function formatNum(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return n.toString();
}

/* ══════════════════════════════════════
   MAIN DASHBOARD COMPONENT
   ══════════════════════════════════════ */
export default function DashboardPage() {
  const [locale, setLocale] = useState<Locale>("de");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [step, setStep] = useState<"input" | "scanning" | "result">("input");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [animScore, setAnimScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [products, setProducts] = useState<CJProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const de = locale === "de";

  useEffect(() => { setLocale(detectLocale()); }, []);
  useEffect(() => { setHistory(loadHistory()); setScanCount(loadHistory().length); }, []);

  async function scan(keyword: string) {
    if (!keyword.trim()) return;
    setQ(keyword);
    setStep("scanning");
    setResult(null);
    setAnimScore(0);
    setShowDetails(false);
    setProducts([]);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword })
      });
      if (!res.ok) throw new Error("fail");
      const data: ScanResult = await res.json();
      setResult(data);
      setStep("result");
      setScanCount(c => c + 1);

      // Save to history
      const item: HistoryItem = { result: data, id: Date.now().toString(), date: new Date().toISOString() };
      const updated = [item, ...history].slice(0, 30);
      setHistory(updated);
      saveHistory(updated);

      // Animate score counting up
      let s = 0;
      const target = data.score.total;
      const interval = setInterval(() => {
        s += 2;
        if (s >= target) { s = target; clearInterval(interval); }
        setAnimScore(s);
      }, 15);

      // Fetch CJ products in background
      setProductsLoading(true);
      fetch(`/api/products?keyword=${encodeURIComponent(keyword)}`)
        .then(r => r.json())
        .then(d => { if (d.products) setProducts(d.products.slice(0, 6)); })
        .catch(() => {})
        .finally(() => setProductsLoading(false));
    } catch {
      setStep("input");
    }
  }

  function onSubmit(e: FormEvent) { e.preventDefault(); scan(q); }
  function reset() { setStep("input"); setResult(null); setShowDetails(false); }

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-black text-[12px] font-black text-white">K</span>
            <span className="text-[16px] font-bold tracking-tight">Kaching OS</span>
          </a>
          <div className="flex items-center gap-3">
            {scanCount > 0 && (
              <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[12px] font-medium text-gray-600 transition hover:bg-gray-200">
                <IconClock className="h-3.5 w-3.5" />
                {scanCount} {de ? "Scans" : "scans"}
              </button>
            )}
            <button onClick={() => setLocale(locale === "de" ? "en" : "de")} className="rounded-full bg-gray-100 px-2.5 py-1.5 text-[11px] font-medium text-gray-500 hover:bg-gray-200 transition">
              {locale === "de" ? "EN" : "DE"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8">
        {/* ═══ STEP 1: INPUT ═══ */}
        {step === "input" && (
          <div className="space-y-8">
            {/* Welcome */}
            <div className="text-center pt-8 pb-4">
              <h1 className="text-[28px] font-bold tracking-tight text-gray-900 sm:text-[36px]">
                {de ? "Welche Nische willst du testen?" : "Which niche do you want to test?"}
              </h1>
              <p className="mt-2 text-[15px] text-gray-500 max-w-md mx-auto">
                {de ? "Tippe ein Thema, Produkt oder eine Idee ein. Du bekommst in 30 Sekunden eine ehrliche Einschatzung." : "Type a topic, product, or idea. You'll get an honest assessment in 30 seconds."}
              </p>
            </div>

            {/* Search */}
            <form onSubmit={onSubmit} className="relative">
              <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg shadow-gray-200/50 transition-all focus-within:border-black focus-within:shadow-xl focus-within:shadow-gray-300/30">
                <div className="flex items-center px-5 py-4">
                  <IconSearch className="h-5 w-5 text-gray-400 shrink-0" />
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder={de ? "z.B. Hundefutter, KI Coaching, Nachhilfe App..." : "e.g. Dog Food, AI Coaching, Tutoring App..."}
                    className="flex-1 ml-3 text-[16px] outline-none placeholder:text-gray-400"
                    autoFocus
                  />
                </div>
                <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3 flex items-center justify-between">
                  <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {(de ? ["Hundefutter", "KI Coaching", "Nachhilfe", "Schmuck", "Fitness App"] : ["Dog Food", "AI Coaching", "Tutoring", "Jewelry", "Fitness App"]).map(kw => (
                      <button key={kw} type="button" onClick={() => { setQ(kw); scan(kw); }} className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-medium text-gray-600 transition hover:border-gray-400 hover:text-black">{kw}</button>
                    ))}
                  </div>
                  <button type="submit" disabled={!q.trim()} className="shrink-0 ml-3 rounded-full bg-black px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-gray-800 disabled:opacity-30">
                    {de ? "Scannen" : "Scan"} <IconArrowRight className="h-3.5 w-3.5 inline ml-1" />
                  </button>
                </div>
              </div>
            </form>

            {/* What you'll get */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: <IconTarget className="h-5 w-5" />, label: de ? "Echte Nachfrage" : "Real Demand", sub: "Google + Amazon" },
                { icon: <IconTrending className="h-5 w-5" />, label: de ? "Trend-Richtung" : "Trend Direction", sub: "12 Monate" },
                { icon: <IconZap className="h-5 w-5" />, label: de ? "Konkurrenz-Check" : "Competition Check", sub: de ? "Ehrlich bewertet" : "Honestly rated" },
              ].map(item => (
                <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">{item.icon}</div>
                  <p className="text-[13px] font-semibold text-gray-900">{item.label}</p>
                  <p className="mt-0.5 text-[11px] text-gray-400">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] font-semibold text-gray-500">{de ? "Deine letzten Scans" : "Your recent scans"}</p>
                </div>
                <div className="space-y-2">
                  {history.slice(0, showHistory ? 10 : 3).map(h => (
                    <button key={h.id} onClick={() => { setResult(h.result); setStep("result"); setAnimScore(h.result.score.total); }} className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition hover:border-gray-300 hover:shadow-sm">
                      <div>
                        <p className="text-[14px] font-medium text-gray-900">{h.result.keyword}</p>
                        <p className="text-[11px] text-gray-400">{new Date(h.date).toLocaleDateString(de ? "de-DE" : "en-US", { day: "numeric", month: "short" })}</p>
                      </div>
                      <ScoreBadge score={h.result.score.total} small />
                    </button>
                  ))}
                </div>
                {history.length > 3 && (
                  <button onClick={() => setShowHistory(!showHistory)} className="mt-2 text-[12px] text-gray-400 hover:text-gray-600 transition">
                    {showHistory ? (de ? "Weniger anzeigen" : "Show less") : `+ ${history.length - 3} ${de ? "mehr" : "more"}`}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══ STEP 2: SCANNING ═══ */}
        {step === "scanning" && (
          <div className="flex flex-col items-center justify-center pt-20 pb-10">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-gray-200 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <IconSearch className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <p className="mt-6 text-[18px] font-bold text-gray-900">{de ? "Analysiere" : "Analyzing"} &ldquo;{q}&rdquo;</p>
            <div className="mt-4 space-y-2.5 text-[13px]">
              {[
                { label: "Google Autocomplete", delay: 0 },
                { label: "Google Trends", delay: 300 },
                { label: "Amazon + YouTube", delay: 600 },
                { label: de ? "Konkurrenz-Daten" : "Competition Data", delay: 900 },
              ].map((item, i) => (
                <ScanStep key={i} label={item.label} delay={item.delay} />
              ))}
            </div>
          </div>
        )}

        {/* ═══ STEP 3: RESULT ═══ */}
        {step === "result" && result && (
          <div className="space-y-6 pb-12">
            {/* Back button */}
            <button onClick={reset} className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-600 transition">
              <IconArrowRight className="h-3.5 w-3.5 rotate-180" /> {de ? "Neue Suche" : "New search"}
            </button>

            {/* ── THE VERDICT ── */}
            <VerdictCard result={result} animScore={animScore} de={de} />

            {/* ── WHAT THIS MEANS (human readable) ── */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-[14px] font-bold text-gray-900 mb-3">{de ? "Was bedeutet das fur dich?" : "What does this mean for you?"}</p>
              <p className="text-[14px] leading-[1.7] text-gray-600">{result.score.summary}</p>

              {result.score.total >= 65 && (
                <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white"><IconCheck className="h-4 w-4" /></div>
                    <div>
                      <p className="text-[13px] font-bold text-green-900">{de ? "Das sieht gut aus!" : "This looks promising!"}</p>
                      <p className="mt-0.5 text-[12px] text-green-700">{de ? "Diese Nische hat echtes Potenzial. Lies weiter um zu sehen, was du konkret tun kannst." : "This niche has real potential. Read on to see what you can do."}</p>
                    </div>
                  </div>
                </div>
              )}

              {result.score.total < 40 && (
                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white"><IconX className="h-4 w-4" /></div>
                    <div>
                      <p className="text-[13px] font-bold text-red-900">{de ? "Eher schwierig." : "This will be tough."}</p>
                      <p className="mt-0.5 text-[12px] text-red-700">{de ? "Hohe Konkurrenz oder wenig Nachfrage. Probier eine spezifischere Nische." : "High competition or low demand. Try a more specific niche."}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── 4 KEY METRICS ── */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                label={de ? "Nachfrage" : "Demand"}
                value={result.score.demand}
                desc={de ? `${result.autocomplete.count} Google-Vorschlage` : `${result.autocomplete.count} Google suggestions`}
                color={result.score.demand >= 65 ? "green" : result.score.demand >= 40 ? "amber" : "red"}
              />
              <MetricCard
                label={de ? "Konkurrenz" : "Competition"}
                value={result.score.competitionRaw || (100 - result.score.competition)}
                desc={result.competition?.googleResults ? `${formatNum(result.competition.googleResults)} ${de ? "Ergebnisse" : "results"}` : ""}
                color={(result.score.competitionRaw || 50) >= 65 ? "red" : (result.score.competitionRaw || 50) >= 40 ? "amber" : "green"}
                inverted
              />
              <MetricCard
                label={de ? "Trend" : "Trend"}
                value={result.score.trend}
                desc={result.score.trendLabel}
                color={result.score.trend >= 60 ? "green" : result.score.trend >= 40 ? "amber" : "red"}
              />
              <MetricCard
                label={de ? "Kaufbereitschaft" : "Buy Intent"}
                value={result.score.intent}
                desc={result.autocomplete.commercialIntent ? (de ? "Kaufsignale erkannt" : "Buy signals detected") : (de ? "Wenig Kaufsignale" : "Low buy signals")}
                color={result.score.intent >= 60 ? "green" : result.score.intent >= 35 ? "amber" : "red"}
              />
            </div>

            {/* ── TREND CHART ── */}
            {result.trend.timeline.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[14px] font-bold text-gray-900">{de ? "Suchinteresse (12 Monate)" : "Search Interest (12 months)"}</p>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                    result.trend.direction === "rising" ? "bg-green-100 text-green-800" :
                    result.trend.direction === "falling" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"
                  }`}>
                    {result.trend.direction === "rising" ? (de ? "Steigend" : "Rising") : result.trend.direction === "falling" ? (de ? "Fallend" : "Falling") : (de ? "Stabil" : "Stable")}
                    {result.trend.growthPercent !== 0 && ` ${result.trend.growthPercent > 0 ? "+" : ""}${result.trend.growthPercent}%`}
                  </span>
                </div>
                <div className="flex h-28 items-end gap-[3px] rounded-lg bg-gray-50 p-3">
                  {result.trend.timeline.slice(-30).map((point, i) => {
                    const max = Math.max(...result.trend.timeline.map(p => p.value), 1);
                    const color = result.trend.direction === "rising" ? "bg-green-500" : result.trend.direction === "falling" ? "bg-red-400" : "bg-gray-400";
                    return <span key={i} className={`flex-1 rounded-sm ${color} transition-all hover:opacity-80`} style={{ height: `${Math.max(6, (point.value / max) * 100)}%` }} />;
                  })}
                </div>
              </div>
            )}

            {/* ── PRODUCT OPPORTUNITIES (CJ Dropshipping) ── */}
            {(productsLoading || products.length > 0) && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">{de ? "Produkte die du verkaufen kannst" : "Products you can sell"}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{de ? "Direkt von CJ Dropshipping — kein Lager nötig" : "Direct from CJ Dropshipping — no inventory needed"}</p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700">DROPSHIPPING</span>
                </div>

                {productsLoading ? (
                  <div className="flex items-center justify-center py-8 gap-2 text-[13px] text-gray-400">
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-black animate-spin" />
                    {de ? "Suche Produkte..." : "Finding products..."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.map(p => (
                      <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className="group flex gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3 transition hover:border-gray-300 hover:shadow-sm">
                        {p.image ? (
                          <img src={p.image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover bg-gray-200" />
                        ) : (
                          <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-200 flex items-center justify-center text-[10px] text-gray-400">No img</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-gray-900 line-clamp-2 leading-tight">{p.name}</p>
                          <div className="mt-1.5 flex items-baseline gap-2">
                            <span className="text-[11px] text-gray-400 line-through">${p.wholesalePrice.toFixed(2)}</span>
                            <span className="text-[14px] font-bold text-green-700">${p.retail.low.toFixed(0)}-${p.retail.high.toFixed(0)}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-800">{p.retail.margin}% {de ? "Marge" : "margin"}</span>
                            <span className="text-[10px] text-gray-400 group-hover:text-blue-600 transition">{de ? "Ansehen" : "View"} <IconExternalLink className="h-2.5 w-2.5 inline" /></span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {products.length > 0 && (
                  <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-3">
                    <p className="text-[11px] text-blue-800 leading-relaxed">
                      <span className="font-bold">{de ? "So funktioniert's:" : "How it works:"}</span>{" "}
                      {de
                        ? "Du listest das Produkt in deinem Shop. Wenn ein Kunde bestellt, kauft CJ es und schickt es direkt an deinen Kunden. Du zahlst nur den Einkaufspreis."
                        : "List the product in your store. When a customer orders, CJ buys and ships it directly to them. You only pay the wholesale price."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── SHOW MORE DETAILS (expandable) ── */}
            <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-4 text-[13px] font-medium text-gray-600 transition hover:bg-gray-50 hover:border-gray-300">
              {showDetails ? (de ? "Details ausblenden" : "Hide details") : (de ? "Alle Daten anzeigen" : "Show all data")}
              <IconChevronDown className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
            </button>

            {showDetails && (
              <div className="space-y-4 animate-in">
                {/* Platform signals */}
                {result.platforms && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <p className="text-[14px] font-bold text-gray-900 mb-4">{de ? "Was die Plattformen sagen" : "What platforms say"}</p>
                    <div className="space-y-4">
                      {result.platforms.amazon.length > 0 && (
                        <PlatformRow title="Amazon" subtitle={de ? "Was Leute kaufen wollen" : "What people want to buy"} items={result.platforms.amazon.slice(0, 5)} color="amber" />
                      )}
                      {result.platforms.youtube.length > 0 && (
                        <PlatformRow title="YouTube" subtitle={de ? "Was Leute lernen wollen" : "What people want to learn"} items={result.platforms.youtube.slice(0, 5)} color="red" />
                      )}
                      {result.platforms.reddit.length > 0 && (
                        <div>
                          <p className="text-[12px] font-bold text-gray-700">Reddit <span className="font-normal text-gray-400">— {de ? "Woruber diskutiert wird" : "What's being discussed"}</span></p>
                          <div className="mt-2 space-y-1.5">
                            {result.platforms.reddit.slice(0, 3).map((post, i) => (
                              <div key={i} className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2">
                                <span className="shrink-0 rounded bg-orange-200 px-1.5 py-0.5 text-[10px] font-bold text-orange-800">{post.score}</span>
                                <span className="text-[12px] text-gray-700 line-clamp-1">{post.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Competition details */}
                {result.competition && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <p className="text-[14px] font-bold text-gray-900 mb-3">{de ? "Konkurrenz-Details" : "Competition Details"}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-[11px] font-medium text-gray-500">Google</p>
                        <p className="mt-1 text-[20px] font-bold">{result.competition.googleResults > 0 ? formatNum(result.competition.googleResults) : "—"}</p>
                        <p className="text-[11px] text-gray-400">{de ? "Suchergebnisse" : "search results"}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-[11px] font-medium text-gray-500">Wikipedia</p>
                        <p className="mt-1 text-[14px] font-bold">{result.competition.wikipedia ? (de ? "Vorhanden" : "Exists") : (de ? "Nicht vorhanden" : "None")}</p>
                        <p className="text-[11px] text-gray-400">{result.competition.wikipedia ? (de ? "Etablierter Markt" : "Established market") : (de ? "Nischen-Thema" : "Niche topic")}</p>
                      </div>
                    </div>
                    {result.competition.reasons.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {result.competition.reasons.map((r, i) => (
                          <span key={i} className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600">{r}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Keywords to explore */}
                {(result.trend.relatedQueries.length > 0 || result.expandedKeywords.length > 0) && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <p className="text-[14px] font-bold text-gray-900 mb-3">{de ? "Verwandte Nischen zum Testen" : "Related niches to test"}</p>
                    <div className="flex flex-wrap gap-2">
                      {[...result.trend.relatedQueries.slice(0, 6), ...result.expandedKeywords.slice(0, 6)].map((kw, i) => (
                        <button key={i} onClick={() => { setQ(kw); scan(kw); }} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 transition hover:border-black hover:text-black">
                          {kw} <IconArrowRight className="h-3 w-3 inline ml-0.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── WHAT TO DO NEXT (the actual value) ── */}
            {result.score.total >= 45 && (
              <div className="rounded-2xl border-2 border-black bg-black p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"><IconZap className="h-4 w-4" /></div>
                  <p className="text-[16px] font-bold">{de ? "Dein nachster Schritt" : "Your next step"}</p>
                </div>

                <div className="space-y-3">
                  <NextStep
                    num={1}
                    title={de ? "Nische eingrenzen" : "Narrow the niche"}
                    desc={de
                      ? `Statt "${result.keyword}" probier spezifischere Varianten: ${result.trend.relatedQueries.slice(0, 2).join(", ") || result.expandedKeywords.slice(0, 2).join(", ")}`
                      : `Instead of "${result.keyword}" try more specific variations: ${result.trend.relatedQueries.slice(0, 2).join(", ") || result.expandedKeywords.slice(0, 2).join(", ")}`
                    }
                  />
                  <NextStep
                    num={2}
                    title={de ? "Angebot definieren" : "Define your offer"}
                    desc={de
                      ? `Basierend auf ${result.platforms?.amazon?.length || 0} Amazon-Signalen und ${result.autocomplete.count} Suchanfragen: Menschen suchen aktiv nach Losungen in diesem Bereich.`
                      : `Based on ${result.platforms?.amazon?.length || 0} Amazon signals and ${result.autocomplete.count} search queries: people are actively looking for solutions here.`
                    }
                  />
                  <NextStep
                    num={3}
                    title={de ? "MVP in 48h bauen" : "Build MVP in 48h"}
                    desc={de
                      ? "Starte mit einer einfachen Landingpage. Teste ob jemand klickt, bevor du baust."
                      : "Start with a simple landing page. Test if anyone clicks before you build."
                    }
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-[13px] font-bold text-black transition hover:bg-gray-100">
                    {de ? "MVP bauen" : "Build MVP"} <IconExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button onClick={() => { const kw = result.trend.relatedQueries[0] || result.expandedKeywords[0]; if (kw) scan(kw); }} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/30 text-[13px] font-bold text-white transition hover:bg-white/10">
                    <IconRefresh className="h-3.5 w-3.5" /> {de ? "Sub-Nische testen" : "Test sub-niche"}
                  </button>
                </div>
              </div>
            )}

            {/* New scan CTA */}
            <div className="text-center pt-4">
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-medium text-gray-600 transition hover:border-gray-400 hover:text-black">
                <IconSearch className="h-4 w-4" /> {de ? "Neue Nische testen" : "Test another niche"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ══════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════ */

function ScoreBadge({ score, small }: { score: number; small?: boolean }) {
  const color = score >= 65 ? "bg-green-100 text-green-800 border-green-200" :
                score >= 40 ? "bg-amber-100 text-amber-800 border-amber-200" :
                "bg-red-100 text-red-800 border-red-200";
  return (
    <span className={`inline-flex items-center justify-center rounded-full border font-bold ${color} ${small ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-[13px]"}`}>
      {score}
    </span>
  );
}

function VerdictCard({ result, animScore, de }: { result: ScanResult; animScore: number; de: boolean }) {
  const score = result.score.total;
  const isGood = score >= 65;
  const isMeh = score >= 40 && score < 65;

  const bgGradient = isGood ? "from-green-50 via-emerald-50 to-white border-green-200" :
                     isMeh ? "from-amber-50 via-orange-50 to-white border-amber-200" :
                     "from-red-50 via-pink-50 to-white border-red-200";

  const verdictText = isGood ? (de ? "Gute Nische!" : "Good niche!") :
                      isMeh ? (de ? "Machbar, aber..." : "Possible, but...") :
                      (de ? "Zu viel Konkurrenz" : "Too competitive");

  const verdictSub = isGood ? (de ? "Hier ist echte Nachfrage mit machbarer Konkurrenz." : "Real demand with manageable competition.") :
                     isMeh ? (de ? "Es gibt Nachfrage, aber du brauchst einen klaren Winkel." : "There's demand, but you need a clear angle.") :
                     (de ? "Dieser Markt ist bereits voll. Werde spezifischer." : "This market is already full. Get more specific.");

  return (
    <div className={`rounded-2xl border-2 bg-gradient-to-b ${bgGradient} p-8 text-center`}>
      {/* Animated score */}
      <div className="relative inline-flex items-center justify-center">
        <svg className="h-32 w-32" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="52" fill="none"
            stroke={isGood ? "#22c55e" : isMeh ? "#f59e0b" : "#ef4444"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(animScore / 100) * 327} 327`}
            transform="rotate(-90 60 60)"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[36px] font-bold tracking-tight">{animScore}</span>
          <span className="text-[11px] text-gray-400">/100</span>
        </div>
      </div>

      <h2 className="mt-4 text-[22px] font-bold text-gray-900">{verdictText}</h2>
      <p className="mt-1.5 text-[14px] text-gray-600 max-w-sm mx-auto">{verdictSub}</p>

      {/* Mini keyword */}
      <p className="mt-3 inline-block rounded-full bg-white/80 border border-gray-200 px-4 py-1.5 text-[12px] font-medium text-gray-500">
        &ldquo;{result.keyword}&rdquo;
      </p>
    </div>
  );
}

function MetricCard({ label, value, desc, color, inverted }: { label: string; value: number; desc: string; color: "green" | "amber" | "red"; inverted?: boolean }) {
  const barColor = color === "green" ? "bg-green-500" : color === "amber" ? "bg-amber-500" : "bg-red-500";
  const labelColor = color === "green" ? "text-green-700" : color === "amber" ? "text-amber-700" : "text-red-700";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-[12px] font-medium text-gray-500">{label}</p>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[28px] font-bold tracking-tight">{value}</span>
        <span className="text-[12px] text-gray-400">/100</span>
        {inverted && value >= 65 && <span className={`ml-auto text-[10px] font-bold ${labelColor}`}>{color === "red" ? "HOCH" : "OK"}</span>}
        {!inverted && value >= 65 && <span className={`ml-auto text-[10px] font-bold ${labelColor}`}>STARK</span>}
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${barColor} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
      {desc && <p className="mt-2 text-[11px] text-gray-400">{desc}</p>}
    </div>
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

function PlatformRow({ title, subtitle, items, color }: { title: string; subtitle: string; items: string[]; color: "amber" | "red" }) {
  const pillColor = color === "amber" ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-red-50 border-red-200 text-red-800";
  return (
    <div>
      <p className="text-[12px] font-bold text-gray-700">{title} <span className="font-normal text-gray-400">— {subtitle}</span></p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span key={i} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${pillColor}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ScanStep({ label, delay }: { label: string; delay: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`flex items-center gap-2.5 transition-all duration-300 ${active ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-300">...</span>
    </div>
  );
}
