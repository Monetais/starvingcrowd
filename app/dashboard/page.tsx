"use client";

import React, { FormEvent, useState, useEffect, createContext, useContext } from "react";
import { type Locale, detectLocale, t } from "@/lib/i18n";

const LocaleContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({ locale: "de", setLocale: () => {} });
function useLocale() { return useContext(LocaleContext); }

/* ── Icons ── */
function I({ children, className = "h-4 w-4" }: { children: React.ReactNode; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
function IconArrowRight(p: { className?: string }) { return <I {...p}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></I>; }
function IconBarChart(p: { className?: string }) { return <I {...p}><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-8" /><path d="M22 20v-5" /></I>; }
function IconBookmark(p: { className?: string }) { return <I {...p}><path d="M6 4h12v16l-6-4-6 4V4z" /></I>; }
function IconCheck(p: { className?: string }) { return <I {...p}><path d="M5 12l5 5L20 7" /></I>; }
function IconChevronRight(p: { className?: string }) { return <I {...p}><path d="m9 6 6 6-6 6" /></I>; }
function IconClock(p: { className?: string }) { return <I {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></I>; }
function IconCrown(p: { className?: string }) { return <I {...p}><path d="m3 18 2-10 7 5 7-5 2 10H3z" /><path d="M3 18h18" /></I>; }
function IconDollar(p: { className?: string }) { return <I {...p}><line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></I>; }
function IconExternalLink(p: { className?: string }) { return <I {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></I>; }
function IconGauge(p: { className?: string }) { return <I {...p}><path d="M12 14 16 10" /><path d="M5.2 18a8 8 0 1 1 13.6 0" /><path d="M8 18h8" /></I>; }
function IconHome(p: { className?: string }) { return <I {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10.5V20h14v-9.5" /></I>; }
function IconLightbulb(p: { className?: string }) { return <I {...p}><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></I>; }
function IconLogout(p: { className?: string }) { return <I {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></I>; }
function IconMap(p: { className?: string }) { return <I {...p}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></I>; }
function IconPlay(p: { className?: string }) { return <I {...p}><polygon points="5 3 19 12 5 21 5 3" /></I>; }
function IconRefresh(p: { className?: string }) { return <I {...p}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></I>; }
function IconRocket(p: { className?: string }) { return <I {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></I>; }
function IconSearch(p: { className?: string }) { return <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>; }
function IconStar(p: { className?: string }) { return <I {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2-4.4-4.3 6.1-.9L12 3Z" fill="currentColor" /></I>; }
function IconTarget(p: { className?: string }) { return <I {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></I>; }
function IconTrash(p: { className?: string }) { return <I {...p}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></I>; }
function IconTrending(p: { className?: string }) { return <I {...p}><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></I>; }
function IconUsers(p: { className?: string }) { return <I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></I>; }
function IconWand(p: { className?: string }) { return <I {...p}><path d="m3 21 9-9" /><path d="m12 12 9-9" /><path d="M15 3v4" /><path d="M13 5h4" /><path d="M19 9v4" /><path d="M17 11h4" /><path d="M5 15v4" /><path d="M3 17h4" /></I>; }
function IconX(p: { className?: string }) { return <I {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></I>; }
function IconZap(p: { className?: string }) { return <I {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></I>; }
function IconWarning(p: { className?: string }) { return <I {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></I>; }

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

type Playbook = {
  nicheVerdict: string;
  businessModels: { name: string; description: string; tool: string; difficulty: string; timeToLaunch: string; monthlyRevenuePotential: string; revenueModel: string; targetAudience: string; whyItWorks: string }[];
  weeklyPlan: { week1: { title: string; tasks: string[] }; week2: { title: string; tasks: string[] }; week3: { title: string; tasks: string[] }; week4: { title: string; tasks: string[] } };
  contentIdeas: string[];
  monetizationStrategies: { strategy: string; description: string; expectedRevenue: string }[];
  competitorInsights: string;
  riskFactors: string[];
  quickWins: string[];
};

type SavedScan = {
  id: string;
  result: ScanResult;
  playbook?: Playbook;
  saved: boolean;
  createdAt: string;
};

/* ── LocalStorage helpers ── */
function loadScans(): SavedScan[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("kaching_scans") || "[]"); } catch { return []; }
}
function saveScans(scans: SavedScan[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("kaching_scans", JSON.stringify(scans));
}

/* ══════════════════════════════════════
   DASHBOARD APP
   ══════════════════════════════════════ */
export default function DashboardPage() {
  const [locale, setLocale] = useState<Locale>("de");
  const [view, setView] = useState<"scanner" | "history" | "playbook">("scanner");
  const [scans, setScans] = useState<SavedScan[]>([]);
  const [activeScan, setActiveScan] = useState<SavedScan | null>(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [playbookLoading, setPlaybookLoading] = useState(false);
  const [scanError, setScanError] = useState("");

  useEffect(() => { setLocale(detectLocale()); }, []);
  useEffect(() => { setScans(loadScans()); }, []);

  const de = locale === "de";

  async function runScan(keyword: string) {
    if (!keyword.trim()) return;
    setLoading(true);
    setScanError("");
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword })
      });
      if (!res.ok) throw new Error("Scan failed");
      const data: ScanResult = await res.json();
      const newScan: SavedScan = {
        id: Date.now().toString(),
        result: data,
        saved: false,
        createdAt: new Date().toISOString()
      };
      const updated = [newScan, ...scans].slice(0, 50);
      setScans(updated);
      saveScans(updated);
      setActiveScan(newScan);
      setView("scanner");
      // Auto-generate playbook for good niches
      if (data.score.total >= 50) {
        generatePlaybook(newScan, updated);
      }
    } catch {
      setScanError(de ? "Scan fehlgeschlagen. Versuche es erneut." : "Scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function generatePlaybook(scan: SavedScan, currentScans?: SavedScan[]) {
    setPlaybookLoading(true);
    try {
      const res = await fetch("/api/ai-playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: scan.result.keyword,
          score: scan.result.score,
          trend: scan.result.trend,
          platforms: scan.result.platforms,
          autocomplete: scan.result.autocomplete,
          locale
        })
      });
      if (!res.ok) throw new Error("Playbook failed");
      const playbook: Playbook = await res.json();
      if (playbook.nicheVerdict) {
        const updatedScan = { ...scan, playbook };
        setActiveScan(updatedScan);
        const base = currentScans || scans;
        const updated = base.map(s => s.id === scan.id ? updatedScan : s);
        setScans(updated);
        saveScans(updated);
      }
    } catch {
      // Silently fail — playbook is optional enhancement
    } finally {
      setPlaybookLoading(false);
    }
  }

  function toggleSave(id: string) {
    const updated = scans.map(s => s.id === id ? { ...s, saved: !s.saved } : s);
    setScans(updated);
    saveScans(updated);
    if (activeScan?.id === id) setActiveScan({ ...activeScan, saved: !activeScan.saved });
  }

  function deleteScan(id: string) {
    const updated = scans.filter(s => s.id !== id);
    setScans(updated);
    saveScans(updated);
    if (activeScan?.id === id) setActiveScan(null);
  }

  function onSubmit(e: FormEvent) { e.preventDefault(); runScan(q); }

  const savedScans = scans.filter(s => s.saved);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div className="flex h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
          <div className="flex h-14 items-center gap-2.5 border-b border-gray-100 px-5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-black text-[11px] font-black text-white">K</span>
            <span className="text-[15px] font-bold tracking-tight">Kaching OS</span>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            <SidebarBtn icon={<IconSearch className="h-4 w-4" />} label={de ? "Nischen-Scanner" : "Niche Scanner"} active={view === "scanner"} onClick={() => setView("scanner")} />
            <SidebarBtn icon={<IconClock className="h-4 w-4" />} label={de ? "Scan-Verlauf" : "Scan History"} active={view === "history"} onClick={() => setView("history")} badge={scans.length} />
            <SidebarBtn icon={<IconBookmark className="h-4 w-4" />} label={de ? "Gespeichert" : "Saved"} active={false} onClick={() => { setView("history"); }} badge={savedScans.length} />
            <SidebarBtn icon={<IconMap className="h-4 w-4" />} label={de ? "Playbook" : "Playbook"} active={view === "playbook"} onClick={() => { if (activeScan?.playbook) setView("playbook"); }} />

            <div className="!mt-4 border-t border-gray-100 pt-3">
              <SidebarBtn icon={<IconTrending className="h-4 w-4" />} label={de ? "Trend-Radar" : "Trend Radar"} active={false} onClick={() => {}} locked />
              <SidebarBtn icon={<IconLightbulb className="h-4 w-4" />} label={de ? "Ideen-Generator" : "Idea Generator"} active={false} onClick={() => {}} locked />
              <SidebarBtn icon={<IconBarChart className="h-4 w-4" />} label={de ? "Reports" : "Reports"} active={false} onClick={() => {}} locked />
            </div>
          </nav>

          <div className="border-t border-gray-100 p-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700"><IconCrown className="h-3.5 w-3.5 text-amber-500" />{de ? "Builder Plan" : "Builder Plan"}</div>
              <p className="mt-1 text-[11px] text-gray-500">{de ? "Unbegrenzte Scans + KI Playbooks" : "Unlimited scans + AI Playbooks"}</p>
              <button className="mt-2 w-full rounded-md bg-black py-1.5 text-[11px] font-semibold text-white hover:bg-gray-800 transition">{de ? "Upgraden" : "Upgrade"}</button>
            </div>
            <div className="mt-2 flex items-center justify-between px-1">
              <button onClick={() => setLocale(locale === "de" ? "en" : "de")} className="text-[11px] text-gray-400 hover:text-gray-600 transition">{locale === "de" ? "EN" : "DE"}</button>
              <a href="/" className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 transition"><IconLogout className="h-3 w-3" />{de ? "Zuruck" : "Back"}</a>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile header */}
          <div className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded bg-black text-[9px] font-black text-white">K</span>
              <span className="text-[13px] font-bold">Kaching OS</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setView("scanner")} className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${view === "scanner" ? "bg-black text-white" : "text-gray-500"}`}>{de ? "Scanner" : "Scanner"}</button>
              <button onClick={() => setView("history")} className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${view === "history" ? "bg-black text-white" : "text-gray-500"}`}>{de ? "Verlauf" : "History"}</button>
              {activeScan?.playbook && <button onClick={() => setView("playbook")} className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${view === "playbook" ? "bg-black text-white" : "text-gray-500"}`}>Playbook</button>}
            </div>
          </div>

          <div className="mx-auto max-w-5xl p-4 lg:p-6">
            {/* SCANNER VIEW */}
            {view === "scanner" && (
              <div className="space-y-5">
                {/* Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[18px] font-bold mb-1">{de ? "Nische scannen" : "Scan a Niche"}</h2>
                  <p className="text-[13px] text-gray-500 mb-4">{de ? "Gib ein Keyword ein — wir analysieren Nachfrage, Trend, Konkurrenz und Kaufintent uber 4 Plattformen." : "Enter a keyword — we analyze demand, trends, competition and buying intent across 4 platforms."}</p>
                  <form onSubmit={onSubmit} className="flex gap-2">
                    <div className="relative min-w-0 flex-1">
                      <IconSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input value={q} onChange={e => setQ(e.target.value)} placeholder={de ? "z.B. KI Coaching, Hundefutter, Nachhilfe..." : "e.g. AI Coaching, Pet Food, Tutoring..."} className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-[14px] outline-none transition focus:border-black focus:ring-2 focus:ring-black/5" />
                    </div>
                    <button type="submit" disabled={loading || !q.trim()} className="h-11 rounded-lg bg-black px-6 text-[13px] font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40">
                      {loading ? (de ? "Scanne..." : "Scanning...") : (de ? "Scannen" : "Scan")}
                    </button>
                  </form>
                  <div className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {(de ? ["KI Automatisierung", "Haustier Snacks", "Online Kurs", "Pflege Recruiting", "Fitness App", "Handwerker SEO"] : ["AI Automation", "Pet Snacks", "Online Course", "Care Recruiting", "Fitness App", "Local SEO"]).map(kw => (
                      <button key={kw} onClick={() => { setQ(kw); runScan(kw); }} className="shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-600 transition hover:bg-gray-100">{kw}</button>
                    ))}
                  </div>
                </div>

                {scanError && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{scanError}</div>}

                {loading && <LoadingState de={de} />}

                {/* Active scan result */}
                {activeScan && !loading && (
                  <ScanResultView scan={activeScan} de={de} onSave={() => toggleSave(activeScan.id)} onPlaybook={() => { if (activeScan.playbook) setView("playbook"); else generatePlaybook(activeScan); }} playbookLoading={playbookLoading} onRescan={(kw) => { setQ(kw); runScan(kw); }} />
                )}
              </div>
            )}

            {/* HISTORY VIEW */}
            {view === "history" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[18px] font-bold">{de ? "Scan-Verlauf" : "Scan History"}</h2>
                  <span className="text-[12px] text-gray-400">{scans.length} {de ? "Scans" : "scans"}</span>
                </div>
                {scans.length === 0 ? (
                  <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                    <IconSearch className="h-8 w-8 mx-auto text-gray-300" />
                    <p className="mt-3 text-[14px] text-gray-500">{de ? "Noch keine Scans. Starte deinen ersten Scan!" : "No scans yet. Start your first scan!"}</p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {scans.map(scan => (
                      <div key={scan.id} className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => { setActiveScan(scan); setView("scanner"); }}>
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[14px] font-semibold truncate">{scan.result.keyword}</h3>
                            <p className="mt-0.5 text-[11px] text-gray-400">{new Date(scan.createdAt).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${scan.result.score.total >= 75 ? "bg-green-100 text-green-800" : scan.result.score.total >= 50 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}>{scan.result.score.total}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-400">
                          <span>{de ? "Nachfrage" : "Demand"}: {scan.result.score.demand}</span>
                          <span>{de ? "Trend" : "Trend"}: {scan.result.score.trend}</span>
                          {scan.playbook && <span className="rounded bg-green-50 px-1.5 py-0.5 text-green-700 font-medium">Playbook</span>}
                          {scan.saved && <IconBookmark className="h-3 w-3 text-amber-500 fill-amber-500" />}
                        </div>
                        <div className="mt-2 flex gap-1">
                          <button onClick={(e) => { e.stopPropagation(); toggleSave(scan.id); }} className="rounded p-1 text-gray-300 hover:text-amber-500 transition"><IconBookmark className={`h-3.5 w-3.5 ${scan.saved ? "fill-amber-500 text-amber-500" : ""}`} /></button>
                          <button onClick={(e) => { e.stopPropagation(); deleteScan(scan.id); }} className="rounded p-1 text-gray-300 hover:text-red-500 transition"><IconTrash className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PLAYBOOK VIEW */}
            {view === "playbook" && activeScan?.playbook && (
              <PlaybookView scan={activeScan} playbook={activeScan.playbook} de={de} onRescan={(kw) => { setQ(kw); setView("scanner"); runScan(kw); }} />
            )}
          </div>
        </main>
      </div>
    </LocaleContext.Provider>
  );
}

/* ── Sidebar Button ── */
function SidebarBtn({ icon, label, active, onClick, badge, locked }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void; badge?: number; locked?: boolean }) {
  return (
    <button onClick={onClick} disabled={locked} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition ${active ? "bg-gray-100 text-black" : locked ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`}>
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {locked && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-400">PRO</span>}
      {badge !== undefined && badge > 0 && !locked && <span className="rounded-full bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold text-gray-600">{badge}</span>}
    </button>
  );
}

/* ── Loading State ── */
function LoadingState({ de }: { de: boolean }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-3 border-gray-200 border-t-black" />
      <p className="mt-4 text-[14px] font-medium">{de ? "Analysiere 4 Plattformen..." : "Analyzing 4 platforms..."}</p>
      <div className="mt-3 mx-auto max-w-xs space-y-2">
        {[
          { label: "Google Autocomplete", delay: "0ms" },
          { label: "Google Trends", delay: "200ms" },
          { label: "Amazon", delay: "400ms" },
          { label: "YouTube + Reddit", delay: "600ms" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 animate-pulse" style={{ animationDelay: item.delay }}>
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-[11px] text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SCAN RESULT VIEW — The core data display
   ══════════════════════════════════════ */
function ScanResultView({ scan, de, onSave, onPlaybook, playbookLoading, onRescan }: { scan: SavedScan; de: boolean; onSave: () => void; onPlaybook: () => void; playbookLoading: boolean; onRescan: (kw: string) => void }) {
  const r = scan.result;
  const scoreColor = r.score.total >= 75 ? "text-green-600" : r.score.total >= 50 ? "text-amber-600" : "text-red-500";
  const scoreBg = r.score.total >= 75 ? "from-green-50 to-emerald-50 border-green-200" : r.score.total >= 50 ? "from-amber-50 to-orange-50 border-amber-200" : "from-red-50 to-pink-50 border-red-200";

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold">&ldquo;{r.keyword}&rdquo;</h2>
          <p className="text-[12px] text-gray-400">{de ? "Gescannt am" : "Scanned on"} {new Date(r.scannedAt).toLocaleString(de ? "de-DE" : "en-US")}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onSave} className={`rounded-lg border px-3 py-1.5 text-[12px] font-medium transition ${scan.saved ? "border-amber-300 bg-amber-50 text-amber-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            <IconBookmark className={`h-3.5 w-3.5 inline mr-1 ${scan.saved ? "fill-amber-500" : ""}`} />{scan.saved ? (de ? "Gespeichert" : "Saved") : (de ? "Speichern" : "Save")}
          </button>
        </div>
      </div>

      {/* Score + Verdict */}
      <div className={`rounded-xl border-2 bg-gradient-to-br ${scoreBg} p-6 shadow-sm`}>
        <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
          <div className="text-center lg:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Opportunity Score</p>
            <div className="mt-2 flex items-end justify-center gap-2 lg:justify-start">
              <span className={`text-[60px] font-bold tracking-tight leading-none ${scoreColor}`}>{r.score.total}</span>
              <span className="mb-2 text-[18px] text-gray-400">/100</span>
            </div>
            <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold ${
              r.score.total >= 75 ? "bg-green-200/60 text-green-800" :
              r.score.total >= 50 ? "bg-amber-200/60 text-amber-800" :
              "bg-red-200/60 text-red-800"
            }`}>
              {r.score.total >= 75 ? (de ? "NISCHE VALIDIERT" : "NICHE VALIDATED") :
               r.score.total >= 50 ? (de ? "POTENZIAL VORHANDEN" : "POTENTIAL EXISTS") :
               (de ? "UEBERDENKEN" : "RECONSIDER")}
            </div>
          </div>

          {/* Score bars */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: de ? "Nachfrage" : "Demand", value: r.score.demand, color: "bg-green-500", icon: <IconBarChart className="h-3.5 w-3.5" /> },
              { label: de ? "Trend" : "Trend", value: r.score.trend, color: "bg-blue-500", icon: <IconTrending className="h-3.5 w-3.5" /> },
              { label: de ? "Konkurrenz" : "Competition", value: r.score.competition, color: "bg-emerald-500", icon: <IconTarget className="h-3.5 w-3.5" /> },
              { label: de ? "Kaufintent" : "Buy Intent", value: r.score.intent, color: "bg-amber-500", icon: <IconDollar className="h-3.5 w-3.5" /> },
            ].map(m => (
              <div key={m.label} className="rounded-lg bg-white/70 border border-white p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">{m.icon}{m.label}</div>
                <p className="mt-1 text-[20px] font-bold">{m.value}<span className="text-[11px] text-gray-400 font-normal">/100</span></p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[13px] text-gray-700 font-medium">{r.score.summary}</p>
      </div>

      {/* Quick Action: Generate Playbook */}
      {!scan.playbook && (
        <button onClick={onPlaybook} disabled={playbookLoading} className="w-full rounded-xl border-2 border-dashed border-green-300 bg-green-50/50 p-5 text-center transition hover:bg-green-50 hover:border-green-400 disabled:opacity-50">
          {playbookLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-300 border-t-green-700" />
              <span className="text-[14px] font-medium text-green-700">{de ? "KI erstellt deinen Playbook..." : "AI creating your playbook..."}</span>
            </div>
          ) : (
            <>
              <IconWand className="h-6 w-6 mx-auto text-green-600" />
              <p className="mt-2 text-[14px] font-bold text-green-800">{de ? "KI-Playbook generieren" : "Generate AI Playbook"}</p>
              <p className="mt-1 text-[12px] text-green-600">{de ? "3 Business-Modelle, 4-Wochen-Plan, Monetarisierung & Quick Wins" : "3 business models, 4-week plan, monetization & quick wins"}</p>
            </>
          )}
        </button>
      )}

      {/* Playbook preview */}
      {scan.playbook && (
        <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white"><IconWand className="h-4 w-4" /></div>
              <div>
                <p className="text-[14px] font-bold text-green-900">{de ? "KI-Playbook bereit" : "AI Playbook Ready"}</p>
                <p className="text-[11px] text-green-600">{de ? "3 Business-Modelle + 4-Wochen-Plan" : "3 business models + 4-week plan"}</p>
              </div>
            </div>
            <button onClick={() => onPlaybook()} className="rounded-lg bg-green-700 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-green-800">
              {de ? "Vollstandig ansehen" : "View full playbook"} <IconArrowRight className="h-3.5 w-3.5 inline ml-1" />
            </button>
          </div>
          <p className="text-[13px] text-green-800">{scan.playbook.nicheVerdict}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {scan.playbook.businessModels.slice(0, 3).map((model, i) => (
              <div key={i} className="rounded-lg bg-white/80 border border-green-100 p-3">
                <p className="text-[12px] font-bold text-gray-900">{model.name}</p>
                <p className="mt-0.5 text-[11px] text-gray-500">{model.tool} · {model.timeToLaunch}</p>
                <p className="mt-1 text-[11px] font-semibold text-green-700">{model.monthlyRevenuePotential}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trend Chart */}
      {r.trend.timeline.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <IconTrending className="h-4 w-4 text-gray-400" />
              <p className="text-[13px] font-semibold">Google Trends</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              r.trend.direction === "rising" ? "bg-green-50 text-green-700" :
              r.trend.direction === "falling" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-600"
            }`}>
              {r.trend.direction === "rising" ? (de ? "Steigend" : "Rising") : r.trend.direction === "falling" ? (de ? "Fallend" : "Falling") : (de ? "Stabil" : "Stable")}
              {r.trend.growthPercent !== 0 && ` ${r.trend.growthPercent > 0 ? "+" : ""}${r.trend.growthPercent}%`}
            </span>
          </div>
          <div className="flex h-24 items-end gap-[2px]">
            {r.trend.timeline.slice(-36).map((point, i) => {
              const max = Math.max(...r.trend.timeline.map(p => p.value), 1);
              return <span key={i} className={`flex-1 rounded-sm transition-all ${
                r.trend.direction === "rising" ? "bg-green-400" : r.trend.direction === "falling" ? "bg-red-300" : "bg-gray-300"
              }`} style={{ height: `${Math.max(4, (point.value / max) * 100)}%` }} />;
            })}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-gray-400">
            <span>{de ? "Aktuell" : "Current"}: {r.trend.currentInterest}/100</span>
            <span>{de ? "Durchschnitt" : "Average"}: {r.trend.averageInterest}/100</span>
          </div>
        </div>
      )}

      {/* Competition Details */}
      {scan.result.competition && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <IconTarget className="h-4 w-4 text-gray-400" />
              <p className="text-[13px] font-semibold">{de ? "Konkurrenz-Analyse" : "Competition Analysis"}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
              (r.score.competitionRaw || 0) >= 70 ? "bg-red-100 text-red-700" :
              (r.score.competitionRaw || 0) >= 40 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
            }`}>
              {de ? "Konkurrenz" : "Competition"}: {r.score.competitionLabel}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <p className="text-[11px] font-medium text-gray-500 mb-1">Google {de ? "Suchergebnisse" : "Search Results"}</p>
              <p className="text-[16px] font-bold">
                {scan.result.competition.googleResults > 0
                  ? (scan.result.competition.googleResults >= 1_000_000_000 ? `${(scan.result.competition.googleResults / 1_000_000_000).toFixed(1)}B`
                    : scan.result.competition.googleResults >= 1_000_000 ? `${(scan.result.competition.googleResults / 1_000_000).toFixed(0)}M`
                    : scan.result.competition.googleResults >= 1_000 ? `${(scan.result.competition.googleResults / 1_000).toFixed(0)}K`
                    : scan.result.competition.googleResults.toString())
                  : "N/A"}
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <p className="text-[11px] font-medium text-gray-500 mb-1">Wikipedia</p>
              <p className="text-[12px] font-medium">{scan.result.competition.wikipedia ? (de ? "Artikel vorhanden" : "Article exists") : (de ? "Kein Artikel" : "No article")}</p>
              {scan.result.competition.wikipedia && <p className="mt-1 text-[10px] text-gray-400 line-clamp-2">{scan.result.competition.wikipedia}</p>}
            </div>
          </div>
          {scan.result.competition.reasons.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {scan.result.competition.reasons.map((reason, i) => (
                <span key={i} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">{reason}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Platform Signals */}
      {r.platforms && (r.platforms.amazon.length > 0 || r.platforms.youtube.length > 0 || r.platforms.reddit.length > 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-[13px] font-semibold mb-4">{de ? "Plattform-Signale" : "Platform Signals"}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {r.platforms.amazon.length > 0 && (
              <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3">
                <p className="text-[11px] font-bold text-amber-800 mb-2">Amazon ({de ? "Kaufintent" : "Buy Intent"})</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.platforms.amazon.slice(0, 6).map((s, i) => <span key={i} className="rounded-full bg-white border border-amber-200 px-2 py-0.5 text-[10px] text-amber-800">{s}</span>)}
                </div>
              </div>
            )}
            {r.platforms.youtube.length > 0 && (
              <div className="rounded-lg border border-red-100 bg-red-50/50 p-3">
                <p className="text-[11px] font-bold text-red-800 mb-2">YouTube ({de ? "Lernintent" : "Learn Intent"})</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.platforms.youtube.slice(0, 6).map((s, i) => <span key={i} className="rounded-full bg-white border border-red-200 px-2 py-0.5 text-[10px] text-red-800">{s}</span>)}
                </div>
              </div>
            )}
            {r.platforms.reddit.length > 0 && (
              <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-3">
                <p className="text-[11px] font-bold text-orange-800 mb-2">Reddit ({de ? "Community" : "Community"})</p>
                <div className="space-y-1.5">
                  {r.platforms.reddit.slice(0, 3).map((post, i) => (
                    <div key={i} className="text-[10px]">
                      <p className="text-gray-700 line-clamp-1 font-medium">{post.title}</p>
                      <p className="text-gray-400">r/{post.subreddit} · {post.score} pts</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keywords */}
      {(r.trend.relatedQueries.length > 0 || r.expandedKeywords.length > 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-[13px] font-semibold mb-3">{de ? "Verwandte Keywords — klicke zum Scannen" : "Related Keywords — click to scan"}</p>
          <div className="flex flex-wrap gap-2">
            {r.trend.relatedQueries.slice(0, 10).map((kw, i) => (
              <button key={`rq-${i}`} onClick={() => onRescan(kw)} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 transition hover:bg-blue-100">{kw}</button>
            ))}
            {r.expandedKeywords.slice(0, 10).map((kw, i) => (
              <button key={`ek-${i}`} onClick={() => onRescan(kw)} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600 transition hover:bg-gray-100">{kw}</button>
            ))}
          </div>
        </div>
      )}

      {/* Autocomplete */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-semibold">Google Autocomplete</p>
          <span className="text-[11px] text-gray-400">{r.autocomplete.count} {de ? "Vorschlage" : "suggestions"}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {r.autocomplete.suggestions.map((s, i) => (
            <button key={i} onClick={() => onRescan(s)} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-700 transition hover:bg-gray-100">{s}</button>
          ))}
        </div>
        {r.autocomplete.commercialIntent && (
          <div className="mt-3 rounded-lg bg-green-50 border border-green-100 px-3 py-2 flex items-center gap-2">
            <IconDollar className="h-4 w-4 text-green-600" />
            <span className="text-[12px] font-medium text-green-700">{de ? "Kaufintent erkannt" : "Commercial intent detected"}: {r.autocomplete.intentSignals.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PLAYBOOK VIEW — Full action plan
   ══════════════════════════════════════ */
function PlaybookView({ scan, playbook, de, onRescan }: { scan: SavedScan; playbook: Playbook; de: boolean; onRescan: (kw: string) => void }) {
  const [activeWeek, setActiveWeek] = useState<1 | 2 | 3 | 4>(1);
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  function toggleTask(task: string) {
    const next = new Set(checkedTasks);
    if (next.has(task)) next.delete(task); else next.add(task);
    setCheckedTasks(next);
  }

  const weeks = [playbook.weeklyPlan.week1, playbook.weeklyPlan.week2, playbook.weeklyPlan.week3, playbook.weeklyPlan.week4];
  const activeWeekData = weeks[activeWeek - 1];
  const totalTasks = weeks.reduce((t, w) => t + w.tasks.length, 0);
  const completedTasks = checkedTasks.size;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold">{de ? "Dein Playbook" : "Your Playbook"}: &ldquo;{scan.result.keyword}&rdquo;</h2>
          <p className="text-[12px] text-gray-500">{de ? "KI-generierter Aktionsplan basierend auf echten Marktdaten" : "AI-generated action plan based on real market data"}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${scan.result.score.total >= 75 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>Score: {scan.result.score.total}</span>
        </div>
      </div>

      {/* Verdict */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white"><IconGauge className="h-4 w-4" /></div>
          <div>
            <p className="text-[13px] font-bold">{de ? "Experten-Einschatzung" : "Expert Assessment"}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-700">{playbook.nicheVerdict}</p>
          </div>
        </div>
      </div>

      {/* Business Models */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <IconRocket className="h-4 w-4 text-gray-400" />
          <p className="text-[14px] font-bold">{de ? "3 Business-Modelle fur diese Nische" : "3 Business Models for This Niche"}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {playbook.businessModels.map((model, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${model.difficulty === "easy" ? "bg-green-100 text-green-700" : model.difficulty === "medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                  {model.difficulty === "easy" ? (de ? "Einfach" : "Easy") : model.difficulty === "medium" ? (de ? "Mittel" : "Medium") : (de ? "Fortgeschritten" : "Advanced")}
                </span>
                <span className="text-[10px] text-gray-400">{model.timeToLaunch}</span>
              </div>
              <h3 className="text-[14px] font-bold">{model.name}</h3>
              <p className="mt-1.5 text-[12px] text-gray-500 leading-relaxed">{model.description}</p>
              <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 text-[11px]">
                  <IconZap className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-500">{de ? "Tool" : "Tool"}:</span>
                  <span className="font-semibold">{model.tool}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <IconDollar className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-500">{de ? "Umsatz" : "Revenue"}:</span>
                  <span className="font-semibold text-green-700">{model.monthlyRevenuePotential}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <IconUsers className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-500">{de ? "Zielgruppe" : "Audience"}:</span>
                  <span className="font-medium">{model.targetAudience}</span>
                </div>
              </div>
              <p className="mt-3 text-[11px] italic text-gray-400">{model.whyItWorks}</p>
              <a href={model.tool === "Shopify" ? "https://shopify.com" : model.tool === "Lovable" ? "https://lovable.dev" : model.tool === "Framer" ? "https://framer.com" : model.tool === "Gumroad" ? "https://gumroad.com" : model.tool === "Webflow" ? "https://webflow.com" : "#"} target="_blank" rel="noopener noreferrer" className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-black text-[12px] font-semibold text-white transition hover:bg-gray-800">
                {de ? "Starten mit" : "Start with"} {model.tool} <IconExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Week Plan */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconMap className="h-4 w-4 text-gray-400" />
            <p className="text-[14px] font-bold">{de ? "Dein 4-Wochen-Plan" : "Your 4-Week Plan"}</p>
          </div>
          <span className="text-[11px] text-gray-400">{completedTasks}/{totalTasks} {de ? "erledigt" : "done"}</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-gray-100 mb-4">
          <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }} />
        </div>

        {/* Week tabs */}
        <div className="flex gap-1 mb-4 border-b border-gray-100 pb-3">
          {[1, 2, 3, 4].map(w => (
            <button key={w} onClick={() => setActiveWeek(w as 1|2|3|4)} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeWeek === w ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100"}`}>
              {de ? `Woche ${w}` : `Week ${w}`}
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div>
          <p className="text-[13px] font-semibold mb-3">{activeWeekData.title}</p>
          <div className="space-y-2">
            {activeWeekData.tasks.map((task, i) => {
              const key = `w${activeWeek}-${i}`;
              const done = checkedTasks.has(key);
              return (
                <label key={i} className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition ${done ? "border-green-200 bg-green-50/50" : "border-gray-200 hover:bg-gray-50"}`}>
                  <input type="checkbox" checked={done} onChange={() => toggleTask(key)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className={`text-[13px] leading-relaxed ${done ? "text-gray-400 line-through" : "text-gray-700"}`}>{task}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Wins */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <IconZap className="h-4 w-4 text-amber-500" />
          <p className="text-[14px] font-bold">{de ? "Quick Wins — Heute noch umsetzbar" : "Quick Wins — Do These Today"}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {playbook.quickWins.map((win, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50/50 p-3">
              <IconPlay className="h-3.5 w-3.5 mt-0.5 text-amber-600 shrink-0" />
              <span className="text-[12px] text-amber-900">{win}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Ideas */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <IconLightbulb className="h-4 w-4 text-gray-400" />
          <p className="text-[14px] font-bold">{de ? "Content- & Produkt-Ideen" : "Content & Product Ideas"}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {playbook.contentIdeas.map((idea, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">{i + 1}</span>
              <span className="text-[12px] text-gray-700">{idea}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monetization */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <IconDollar className="h-4 w-4 text-gray-400" />
          <p className="text-[14px] font-bold">{de ? "Monetarisierung" : "Monetization"}</p>
        </div>
        <div className="space-y-3">
          {playbook.monetizationStrategies.map((strat, i) => (
            <div key={i} className="rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">{strat.strategy}</p>
                <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-bold text-green-700">{strat.expectedRevenue}</span>
              </div>
              <p className="mt-1 text-[12px] text-gray-500">{strat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk + Competition */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconTarget className="h-4 w-4 text-gray-400" />
            <p className="text-[13px] font-bold">{de ? "Wettbewerb" : "Competition"}</p>
          </div>
          <p className="text-[12px] text-gray-600 leading-relaxed">{playbook.competitorInsights}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <IconWarning className="h-4 w-4 text-amber-500" />
            <p className="text-[13px] font-bold">{de ? "Risiken beachten" : "Risk Factors"}</p>
          </div>
          <ul className="space-y-1.5">
            {playbook.riskFactors.map((risk, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next scan CTA */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
        <p className="text-[13px] text-gray-500 mb-3">{de ? "Willst du weitere Nischen in diesem Bereich scannen?" : "Want to scan more niches in this area?"}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {scan.result.trend.relatedQueries.slice(0, 4).map((kw, i) => (
            <button key={i} onClick={() => onRescan(kw)} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-[12px] font-medium text-gray-700 transition hover:bg-gray-100 hover:border-gray-300">{kw}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
