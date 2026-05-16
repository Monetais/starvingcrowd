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
function IconBell(p: { className?: string }) { return <I {...p}><path d="M15 17H5l1.4-1.4A2 2 0 0 0 7 14.2V11a5 5 0 1 1 10 0v3.2a2 2 0 0 0 .6 1.4L19 17h-4" /><path d="M10 21a2 2 0 0 0 4 0" /></I>; }
function IconBookmark(p: { className?: string }) { return <I {...p}><path d="M6 4h12v16l-6-4-6 4V4z" /></I>; }
function IconCheck(p: { className?: string }) { return <I {...p}><path d="M5 12l5 5L20 7" /></I>; }
function IconChevronDown(p: { className?: string }) { return <I {...p}><path d="m6 9 6 6 6-6" /></I>; }
function IconCrown(p: { className?: string }) { return <I {...p}><path d="m3 18 2-10 7 5 7-5 2 10H3z" /><path d="M3 18h18" /></I>; }
function IconGauge(p: { className?: string }) { return <I {...p}><path d="M12 14 16 10" /><path d="M5.2 18a8 8 0 1 1 13.6 0" /><path d="M8 18h8" /></I>; }
function IconHome(p: { className?: string }) { return <I {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10.5V20h14v-9.5" /></I>; }
function IconLayers(p: { className?: string }) { return <I {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></I>; }
function IconListChecks(p: { className?: string }) { return <I {...p}><path d="M9 6h12" /><path d="M9 12h12" /><path d="M9 18h12" /><path d="m3 6 1.5 1.5L7 5" /><path d="m3 12 1.5 1.5L7 11" /><path d="m3 18 1.5 1.5L7 17" /></I>; }
function IconLock(p: { className?: string }) { return <I {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></I>; }
function IconMenu(p: { className?: string }) { return <I {...p}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></I>; }
function IconRefresh(p: { className?: string }) { return <I {...p}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></I>; }
function IconSearch(p: { className?: string }) { return <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>; }
function IconStar(p: { className?: string }) { return <I {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2-4.4-4.3 6.1-.9L12 3Z" fill="currentColor" /></I>; }
function IconTrending(p: { className?: string }) { return <I {...p}><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></I>; }
function IconWand(p: { className?: string }) { return <I {...p}><path d="m3 21 9-9" /><path d="m12 12 9-9" /><path d="M15 3v4" /><path d="M13 5h4" /><path d="M19 9v4" /><path d="M17 11h4" /><path d="M5 15v4" /><path d="M3 17h4" /></I>; }
function IconX(p: { className?: string }) { return <I {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></I>; }
function IconZap(p: { className?: string }) { return <I {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></I>; }
function IconUsers(p: { className?: string }) { return <I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></I>; }
function IconEye(p: { className?: string }) { return <I {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></I>; }
function IconFire(p: { className?: string }) { return <I {...p}><path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.04-2-4-1.786 2-2.792 3-4 1Z" /></I>; }
function IconLogout(p: { className?: string }) { return <I {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></I>; }

/* ── Data ── */
const navLinks = [
  { label: "So funktioniert's", href: "#how" },
  { label: "Dashboard", href: "#demo" },
  { label: "Ergebnisse", href: "#usecases" },
  { label: "Preise", href: "#preise" }
];

const useCases = [
  { tool: "Shopify", title: "D2C-Shop in 48h", desc: "Sarah fand eine Nische fur nachhaltige Haustier-Snacks. Monat 1: 4.200 EUR Umsatz.", tag: "E-Commerce", revenue: "4.200" },
  { tool: "Lovable", title: "Micro-SaaS mit KI", desc: "Tim baute einen KI-Termin-Assistenten. 14 zahlende Kunden im ersten Monat.", tag: "SaaS", revenue: "2.800" },
  { tool: "Framer", title: "Agentur-Landingpage", desc: "Julia: Local-SEO fur Handwerker. 23 qualifizierte Leads in Woche 1.", tag: "Agentur", revenue: "3.500" },
  { tool: "Gumroad", title: "Digitales Produkt", desc: "Markus: Notion-Templates fur Freelancer. 890 EUR passiv in Monat 1.", tag: "Digital", revenue: "890" },
];

const testimonials = [
  { name: "Sarah K.", role: "Shopify-Grunderin", text: "Ich habe vorher 3 Produkte gelauncht, die niemand wollte. Mit Kaching OS habe ich zum ersten Mal VOR dem Bauen gepruft, ob Nachfrage da ist.", avatar: "SK" },
  { name: "Tim R.", role: "Solo-Founder", text: "In 20 Minuten eine validierte Nische. In 3 Tagen ein MVP. In 2 Wochen zahlende Kunden.", avatar: "TR" },
  { name: "Julia M.", role: "Marketerin", text: "Kaching OS ist wie ein Cheat-Code. Du siehst sofort, wo die Leute Geld ausgeben wollen.", avatar: "JM" },
  { name: "Markus B.", role: "Creator", text: "Endlich kein Bauchgefuhl mehr. Die Daten zeigen klar: hier ist Nachfrage, hier baust du.", avatar: "MB" }
];

const pricingTiers = [
  { name: "Free", price: "0", period: "", desc: "Teste ob es fur dich passt.", cta: "Kostenlos starten", items: ["3 Scans / Monat", "Basis-Score", "Autocomplete-Daten", "Community-Zugang"] },
  { name: "Builder", price: "29", period: "/mo", desc: "Fur Grunder, die diese Woche starten.", cta: "Jetzt Builder werden", featured: true, items: ["Unbegrenzte Scans", "Vollstandiger Opportunity-Score", "Google Trends + Konkurrenz", "Export als PDF/CSV", "Nischen-Alerts per E-Mail", "Prioritats-Support"], seats: "Noch 19 Platze zum Launch-Preis", annual: "oder 19 EUR/mo bei Jahreszahlung" },
  { name: "Agency", price: "79", period: "/mo", desc: "Fur Teams die Kunden beraten.", cta: "Team starten", items: ["Alles aus Builder", "5 Team-Seats", "White-Label Reports", "API-Zugang", "Kunden-Dashboard"] }
];

const faqItems: [string, string][] = [
  ["Kann ich das nicht einfach selbst googeln?", "Klar — das dauert pro Nische 2-3 Stunden. Kaching OS macht das in 30 Sekunden und kombiniert 4 Datenquellen zu einem Score. Die Frage ist: Willst du 10 Nischen manuell recherchieren oder in 5 Minuten die beste finden?"],
  ["Woher kommen die Daten?", "Direkt von Google: Autocomplete zeigt echte Suchnachfrage (was Menschen JETZT tippen), Google Trends zeigt ob die Nachfrage steigt oder faellt. Keine erfundenen Zahlen."],
  ["Ich habe noch keine konkrete Idee. Hilft mir das trotzdem?", "Genau dafur ist es gebaut. Gib ein Thema ein (z.B. 'Hunde', 'Fitness', 'Handwerker') und Kaching OS zeigt dir profitable Sub-Nischen mit wenig Konkurrenz."],
  ["Was mache ich mit dem Ergebnis?", "Du nimmst die Nische mit dem hoechsten Score und baust mit Shopify, Lovable oder WordPress dein Business. Kaching OS sagt dir WAS — das WIE machst du mit den Tools, die du kennst."],
  ["Gibt es eine Geld-zuruck-Garantie?", "14 Tage, keine Fragen. Wenn dir Kaching OS keine profitable Nische zeigt, bekommst du dein Geld zurueck. Kein Risiko."],
  ["Warum sollte ich jetzt starten und nicht spaeter?", "Jede Nische hat ein Zeitfenster. Wenn du eine steigende Nische mit wenig Konkurrenz findest, zaehlt Geschwindigkeit. Wer zuerst baut, gewinnt. Der Free Plan kostet nichts — du verlierst nur Zeit, wenn du wartest."]
];

/* ── Niche search ── */
type Niche = { rank: number; title: string; desc: string; score: number; demand: string; demandVal: number; competition: string; compVal: number; tags: string[]; hot?: boolean; viewers?: number };

const baseNiches: Niche[] = [
  { rank: 1, title: "KI-Terminassistent fur Kosmetikstudios", desc: "Automatisierte Terminplanung. No-Shows reduzieren.", score: 92, demand: "Hoch", demandVal: 91, competition: "Niedrig", compVal: 21, tags: ["ki", "beauty", "lokal"], hot: true, viewers: 47 },
  { rank: 2, title: "Buchhaltung fur Content Creator", desc: "Steuer-Workflows fur Creator-Einnahmen.", score: 87, demand: "Hoch", demandVal: 86, competition: "Niedrig", compVal: 24, tags: ["creator", "finanzen"], viewers: 23 },
  { rank: 3, title: "Lead-Generierung fur Dachdecker", desc: "Qualifizierte Anfragen uber Local SEO.", score: 81, demand: "Mittel", demandVal: 79, competition: "Niedrig", compVal: 27, tags: ["handwerk", "leads", "lokal"], viewers: 18 },
  { rank: 4, title: "Recruiting-Funnel fur Pflegebetriebe", desc: "Bewerber-Qualifizierung und Automation.", score: 90, demand: "Hoch", demandVal: 89, competition: "Mittel", compVal: 31, tags: ["recruiting", "pflege", "hr"], hot: true, viewers: 34 },
  { rank: 5, title: "Shopify-Upsell fur Supplements", desc: "Bundles und Post-Purchase-Upsells.", score: 85, demand: "Hoch", demandVal: 84, competition: "Mittel", compVal: 33, tags: ["shopify", "ecommerce", "supplements"], viewers: 29 },
  { rank: 6, title: "Compliance-Tool fur Ferienwohnungen", desc: "Meldepflicht-Erinnerungen fur Airbnb-Hosts.", score: 83, demand: "Mittel", demandVal: 77, competition: "Niedrig", compVal: 20, tags: ["airbnb", "compliance", "hospitality"], viewers: 12 }
];

const sidebarItems = [
  { label: "Dashboard", Icon: IconHome, active: true },
  { label: "Nischen-Scanner", Icon: IconSearch },
  { label: "Ideen-Generator", Icon: IconWand },
  { label: "Watchlist", Icon: IconBookmark },
  { label: "Validierungen", Icon: IconListChecks },
  { label: "Trends", Icon: IconBarChart },
  { label: "Keywords", Icon: IconGauge },
  { label: "Reports", Icon: IconLayers }
];

function hash(v: string) { return v.split("").reduce((t, c, i) => t + c.charCodeAt(0) * (i + 1), 0); }
function fmt(v: string) { return v.split(/\s+/).filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" "); }

function doSearch(q: string): { niches: Niche[]; mode: string } {
  if (!q.trim()) return { niches: baseNiches.slice(0, 3), mode: "top" };
  const tokens = q.toLowerCase().split(/\s+/);
  const matches = baseNiches.filter(n => {
    const hay = `${n.title} ${n.desc} ${n.tags.join(" ")}`.toLowerCase();
    return tokens.some(t => hay.includes(t));
  });
  if (matches.length > 0) return { niches: matches.slice(0, 3).map((n, i) => ({ ...n, rank: i + 1 })), mode: "filtered" };
  const s = hash(q.toLowerCase());
  const auds = ["Fitness-Coaches", "Solarbetriebe", "Immobilienmakler", "Praxisteams", "Online-Schulen"];
  const gen: Niche[] = Array.from({ length: 3 }, (_, i) => {
    const a = auds[(s + i) % auds.length]; const dv = 80 + ((s + i * 7) % 16); const cv = 18 + ((s + i * 11) % 18);
    return { rank: i + 1, title: `${fmt(q)} fur ${a}`, desc: `Validierte Nische mit ${dv}/100 Nachfrage.`, score: Math.min(96, Math.round(dv * 0.8 + 15)), demand: dv >= 85 ? "Hoch" : "Mittel", demandVal: dv, competition: cv <= 25 ? "Niedrig" : "Mittel", compVal: cv, tags: [q.toLowerCase(), a.toLowerCase()], viewers: 5 + ((s + i) % 40) };
  });
  return { niches: gen, mode: "generated" };
}

/* ══════════════════════════════════════
   LIVE NOTIFICATION TOASTS
   ══════════════════════════════════════ */
const toastMessages = [
  { text: "Sarah K. hat gerade eine Nische gescannt", time: "vor 12 Sek.", type: "scan" as const },
  { text: "Neue Trending-Nische: KI fur Handwerker", time: "vor 1 Min.", type: "trend" as const },
  { text: "Julia M. ist gerade Builder geworden", time: "vor 2 Min.", type: "upgrade" as const },
  { text: "47 Grunder scannen gerade live", time: "jetzt", type: "live" as const },
  { text: "Noch 23 Builder-Platze zum Launch-Preis", time: "limitiert", type: "urgency" as const },
];

function LiveToast() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const showTimer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(showTimer);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(c => (c + 1) % toastMessages.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;
  const msg = toastMessages[current];

  return (
    <div className={`fixed bottom-5 left-5 z-50 max-w-[320px] rounded-lg border border-gray-200 bg-white p-3 shadow-lg transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[9px] text-white">K</span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium leading-snug text-gray-900">{msg.text}</p>
          <p className="mt-0.5 text-[11px] text-gray-400">{msg.time}</p>
        </div>
        <button onClick={() => setDismissed(true)} className="mt-0.5 text-gray-300 hover:text-gray-500"><IconX className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════ */

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-black text-[11px] font-black text-white tracking-tight">K</span>
      <span className="text-[15px] font-bold tracking-tight">Kaching OS</span>
    </a>
  );
}

function Header({ onMenu, isLoggedIn, onLogout }: { onMenu: () => void; isLoggedIn: boolean; onLogout: () => void }) {
  const { locale, setLocale } = useLocale();
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#how" className="text-[13px] text-gray-500 transition hover:text-black">{t("nav.how", locale)}</a>
          <a href="#demo" className="text-[13px] text-gray-500 transition hover:text-black">{t("nav.dashboard", locale)}</a>
          <a href="#usecases" className="text-[13px] text-gray-500 transition hover:text-black">{t("nav.results", locale)}</a>
          <a href="#preise" className="text-[13px] text-gray-500 transition hover:text-black">{t("nav.pricing", locale)}</a>
        </nav>
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button onClick={() => setLocale(locale === "de" ? "en" : "de")} className="rounded-md border border-gray-200 px-2 py-1 text-[11px] font-medium text-gray-500 transition hover:bg-gray-50">
            {locale === "de" ? "EN" : "DE"}
          </button>
          {isLoggedIn ? (
            <button onClick={onLogout} className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-[13px] font-medium text-gray-500 transition hover:bg-gray-50">
              <IconLogout className="h-3.5 w-3.5" /> {t("nav.logout", locale)}
            </button>
          ) : (
            <>
              <a href="#demo" className="hidden text-[13px] font-medium text-gray-500 hover:text-black sm:block">{t("nav.login", locale)}</a>
              <a href="#demo" className="hidden rounded-md bg-black px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-gray-800 sm:block">{t("nav.cta", locale)}</a>
            </>
          )}
          <button onClick={onMenu} className="grid h-8 w-8 place-items-center rounded-md border border-gray-200 md:hidden"><IconMenu className="h-4 w-4" /></button>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex h-12 items-center justify-between border-b border-gray-200 px-5"><Logo /><button onClick={onClose}><IconX className="h-5 w-5" /></button></div>
      <nav className="p-4 space-y-1">
        {navLinks.map(l => <a key={l.href} href={l.href} onClick={onClose} className="block rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-gray-50">{l.label}</a>)}
        <a href="#demo" onClick={onClose} className="mt-3 block rounded-md bg-black py-2.5 text-center text-[14px] font-semibold text-white">Kostenlos testen</a>
      </nav>
    </div>
  );
}

/* ══════════════════════════════════════
   HERO — The money section
   Problem + Solution + Visual proof in 3 seconds
   ══════════════════════════════════════ */
function Hero() {
  const { locale } = useLocale();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-14 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] text-gray-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              {t("hero.badge", locale)}
            </div>

            <h1 className="text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-black sm:text-[3rem]">
              {t("hero.h1a", locale)}<br />
              <span className="text-gray-400">{t("hero.h1b", locale)}</span>
            </h1>

            <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-gray-500">
              {t("hero.desc", locale)}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#demo" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-black px-6 text-[14px] font-semibold text-white transition hover:bg-gray-800">
                {t("hero.cta", locale)} <IconArrowRight className="h-4 w-4" />
              </a>
              <span className="text-[12px] text-gray-400">{t("hero.subcta", locale)}</span>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["SK", "TR", "JM", "MB", "LK"].map(i => <div key={i} className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-gray-900 text-[10px] font-bold text-white">{i}</div>)}
              </div>
              <div className="text-[13px] text-gray-500">
                <span className="font-semibold text-black">{t("hero.founders", locale)}</span> {t("hero.social", locale)}
                <div className="flex gap-0.5 mt-0.5">{[1,2,3,4,5].map(i => <IconStar key={i} className="h-3 w-3 text-amber-400" />)}<span className="ml-1 text-[11px] text-gray-400">4.9/5</span></div>
              </div>
            </div>
          </div>

          {/* Right: Animated dashboard mockup */}
          <div className="relative">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Animated mini-dashboard in hero — pure CSS/code, no image needed */
function HeroDashboardMockup() {
  const [animScore, setAnimScore] = useState(0);
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimStep(1), 500);
    const t2 = setTimeout(() => setAnimStep(2), 1200);
    const t3 = setTimeout(() => {
      setAnimStep(3);
      let s = 0;
      const interval = setInterval(() => {
        s += 3;
        if (s >= 92) { s = 92; clearInterval(interval); }
        setAnimScore(s);
      }, 20);
      return () => clearInterval(interval);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] font-medium text-gray-400">Kaching OS — Nischen-Scanner</span>
      </div>

      <div className="p-4 space-y-3">
        {/* Search bar mockup */}
        <div className={`flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 transition-all duration-500 ${animStep >= 1 ? "border-black ring-1 ring-black" : ""}`}>
          <IconSearch className="h-3.5 w-3.5 text-gray-400" />
          <span className={`text-[13px] transition-all duration-700 ${animStep >= 1 ? "text-black" : "text-gray-300"}`}>
            {animStep >= 1 ? "Haustier Snacks" : "Nische eingeben..."}
          </span>
          <span className={`ml-auto rounded bg-black px-2 py-0.5 text-[10px] font-semibold text-white transition-all duration-300 ${animStep >= 2 ? "opacity-100" : "opacity-40"}`}>Scannen</span>
        </div>

        {/* Score */}
        <div className={`transition-all duration-500 ${animStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-gray-400">Opportunity Score</span>
            <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700">Ausgezeichnet</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-[40px] font-bold tracking-tight leading-none">{animScore}</span>
            <span className="mb-1 text-[13px] text-gray-400">/100</span>
          </div>

          {/* Score bars */}
          <div className="mt-3 space-y-1.5">
            {[
              { label: "Nachfrage", value: 91, color: "bg-green-500" },
              { label: "Trend", value: 78, color: "bg-blue-500" },
              { label: "Konkurrenz", value: 85, color: "bg-emerald-500" },
              { label: "Kaufintent", value: 70, color: "bg-amber-500" },
            ].map((bar) => (
              <div key={bar.label} className="flex items-center gap-2">
                <span className="w-16 text-[10px] text-gray-400">{bar.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${bar.color} transition-all duration-1000 ease-out`} style={{ width: animStep >= 3 ? `${bar.value}%` : "0%" }} />
                </div>
                <span className="w-6 text-right text-[10px] font-medium">{animStep >= 3 ? bar.value : 0}</span>
              </div>
            ))}
          </div>

          {/* Mini trend chart */}
          <div className="mt-3 flex h-8 items-end gap-[3px] pt-1">
            {[20, 25, 22, 30, 35, 32, 40, 45, 42, 50, 55, 60, 58, 65, 70, 75, 72, 80, 85, 88].map((v, i) => (
              <span key={i} className={`flex-1 rounded-sm bg-green-500 transition-all duration-500`} style={{ height: animStep >= 3 ? `${(v / 88) * 100}%` : "4%", transitionDelay: `${i * 30}ms` }} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-gray-300">
            <span>12 Monate</span>
            <span className="font-medium text-green-600">Steigend +34%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Trust Ticker ── */
function Ticker() {
  const items = ["Shopify", "Lovable", "Framer", "Gumroad", "WordPress", "Stripe", "Notion", "Calendly", "Webflow", "Carrd"];
  return (
    <div className="border-y border-gray-200/60 bg-gray-50/50 py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((t, i) => <span key={i} className="mx-6 text-[13px] font-medium text-gray-400">{t}</span>)}
      </div>
    </div>
  );
}

/* ── PAIN — Short, punchy ── */
function PainSection() {
  const { locale } = useLocale();
  const pains = [t("pain.1", locale), t("pain.2", locale), t("pain.3", locale), t("pain.4", locale)];
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-red-500">{t("pain.label", locale)}</p>
        <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">
          {t("pain.h2a", locale)}<br />{t("pain.h2b", locale)}
        </h2>
        <p className="mt-3 text-[15px] text-gray-500">{t("pain.desc", locale)}</p>
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-2">
        {pains.map((p, i) => (
          <div key={i} className="flex items-start gap-3 bg-white p-4">
            <span className="mt-0.5 text-[14px] text-red-400">&#x2715;</span>
            <p className="text-[14px] leading-[1.6] text-gray-600">{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── COST OF INACTION — translate pain into money ── */
function CostSection() {
  const { locale } = useLocale();
  return (
    <section className="border-t border-gray-200/60 bg-black text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-500">{t("cost.label", locale)}</p>
          <h2 className="mt-2 text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[1.75rem]">
            {t("cost.h2", locale)}
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-5 text-center">
            <p className="text-[32px] font-bold tracking-tight">{locale === "en" ? "3 months" : "3 Monate"}</p>
            <p className="mt-1 text-[13px] text-gray-400">{t("cost.time", locale)}</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-5 text-center">
            <p className="text-[32px] font-bold tracking-tight">{locale === "en" ? "$2,000+" : "2.000+ EUR"}</p>
            <p className="mt-1 text-[13px] text-gray-400">{t("cost.money", locale)}</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-5 text-center">
            <p className="text-[32px] font-bold tracking-tight">100%</p>
            <p className="mt-1 text-[13px] text-gray-400">{t("cost.motivation", locale)}</p>
          </div>
        </div>
        <p className="mt-6 text-center text-[14px] text-gray-400">{t("cost.bottom", locale)}</p>
        <div className="mt-5 text-center">
          <a href="#demo" className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-5 text-[13px] font-semibold text-black transition hover:bg-gray-100">
            {t("cost.cta", locale)} <IconArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── HOW — Solution in 3 steps ── */
function HowSection() {
  return (
    <section id="how" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Die Losung</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">Von Idee zu validierter Nische in 30 Sekunden</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { n: "01", title: "Keyword eingeben", desc: "Tippe eine Idee ein. Kaching OS scannt Google Autocomplete und Trends in Echtzeit.", icon: <IconSearch className="h-5 w-5" /> },
            { n: "02", title: "Score erhalten", desc: "Nachfrage, Konkurrenz, Trend-Richtung und Kaufintent — alles auf einen Blick als Opportunity-Score.", icon: <IconGauge className="h-5 w-5" /> },
            { n: "03", title: "Business bauen", desc: "Nimm deine validierte Nische und baue mit Shopify, Lovable oder No-Code in Tagen dein Business.", icon: <IconZap className="h-5 w-5" /> },
          ].map(s => (
            <div key={s.n} className="text-center sm:text-left">
              <div className="mb-3 mx-auto sm:mx-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">{s.icon}</div>
              <h3 className="text-[15px] font-semibold">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   AUTH GATE + DASHBOARD
   ══════════════════════════════════════ */

const TEST_EMAIL = "test@kaching.os";
const TEST_PASSWORD = "kaching2024";

function LoginGate({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"email" | "login">("email");
  const [error, setError] = useState("");

  function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Bitte gib eine gueltige E-Mail ein.");
      return;
    }
    // Email capture — any email unlocks, we collect the lead
    onLogin(email);
  }

  function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      onLogin(email);
    } else {
      setError("Falsche Zugangsdaten. Teste: test@kaching.os / kaching2024");
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black">
            <IconSearch className="h-5 w-5 text-white" />
          </div>
        </div>
        <h3 className="text-center text-[17px] font-bold">Kostenloser Nischen-Audit</h3>
        <p className="mt-1.5 text-center text-[13px] text-gray-500">Gib deine E-Mail ein und scanne deine erste Nische — in 30 Sekunden.</p>

        {mode === "email" ? (
          <form onSubmit={handleEmailSubmit} className="mt-5 space-y-3">
            <div>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="deine@email.de" className="h-10 w-full rounded-md border border-gray-200 px-3 text-[13px] outline-none transition focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            {error && <p className="text-[12px] text-red-600">{error}</p>}
            <button type="submit" className="h-10 w-full rounded-md bg-black text-[13px] font-semibold text-white transition hover:bg-gray-800">
              Audit starten — kostenlos
            </button>
            <p className="text-center text-[11px] text-gray-400">3 Scans gratis. Kein Spam. Jederzeit abmelden.</p>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="mt-5 space-y-3">
            <div>
              <label className="text-[12px] font-medium text-gray-500">E-Mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="test@kaching.os" className="mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-[13px] outline-none transition focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-500">Passwort</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="kaching2024" className="mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-[13px] outline-none transition focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            {error && <p className="text-[12px] text-red-600">{error}</p>}
            <button type="submit" className="h-10 w-full rounded-md bg-black text-[13px] font-semibold text-white transition hover:bg-gray-800">Einloggen</button>
            <div className="rounded-md bg-gray-50 p-2.5">
              <p className="font-mono text-[10px] text-gray-500">Test: test@kaching.os / kaching2024</p>
            </div>
          </form>
        )}

        <button onClick={() => { setMode(mode === "email" ? "login" : "email"); setError(""); }} className="mt-3 w-full text-center text-[11px] text-gray-400 hover:text-gray-600 transition">
          {mode === "email" ? "Bereits registriert? Login" : "Noch kein Account? E-Mail reicht"}
        </button>
      </div>
    </div>
  );
}

/* ── Dashboard API types ── */
type ScanResult = {
  keyword: string;
  score: { total: number; demand: number; trend: number; competition: number; intent: number; label: string; demandLabel: string; trendLabel: string; competitionLabel: string; summary: string };
  autocomplete: { suggestions: string[]; count: number; commercialIntent: boolean; intentSignals: string[] };
  trend: { direction: string; currentInterest: number; averageInterest: number; growthPercent: number; timeline: { date: string; value: number }[]; relatedQueries: string[] };
  platforms?: { amazon: string[]; youtube: string[]; reddit: { title: string; subreddit: string; score: number }[] };
  expandedKeywords: string[];
  scannedAt: string;
} | null;

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(() => doSearch(""));
  const [scanCount, setScanCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [liveResult, setLiveResult] = useState<ScanResult>(null);
  const [scanError, setScanError] = useState("");

  function demoSubmit(raw: string) {
    setResult(doSearch(raw));
    setLiveResult(null);
    setScanError("");
  }

  async function realScan(keyword: string) {
    if (!keyword.trim()) { demoSubmit(""); return; }
    setLoading(true);
    setScanError("");
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword })
      });
      if (!res.ok) throw new Error("Scan fehlgeschlagen");
      const data: ScanResult = await res.json();
      setLiveResult(data);
      setScanCount(c => c + 1);
      setResult(doSearch(keyword));
    } catch {
      setScanError("Scan fehlgeschlagen. Versuche es erneut.");
      demoSubmit(keyword);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) { e.preventDefault(); realScan(q); }
  function pick(kw: string) { setQ(kw); realScan(kw); }
  function reset() { setQ(""); demoSubmit(""); setLiveResult(null); }

  const niches = result.niches;
  const avgDemand = liveResult ? liveResult.score.demand : Math.round(niches.reduce((t, n) => t + n.demandVal, 0) / niches.length);
  const avgComp = liveResult ? liveResult.score.competition : Math.round(niches.reduce((t, n) => t + n.compVal, 0) / niches.length);
  const avgScore = liveResult ? liveResult.score.total : Math.round(niches.reduce((t, n) => t + n.score, 0) / niches.length);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="grid min-h-[540px] grid-cols-1 lg:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="border-b border-gray-200 bg-[#fafafa] p-3 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
          </div>
          <div className="flex items-center gap-2 px-1">
            <span className="grid h-6 w-6 place-items-center rounded bg-black text-[9px] font-black text-white">K</span>
            <span className="text-[13px] font-semibold">Kaching OS</span>
          </div>

          <nav className="mt-3 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-1">
            {sidebarItems.map(item => (
              <button key={item.label} className={`flex shrink-0 items-center gap-2 rounded-md px-2 py-[6px] text-[12px] font-medium transition sm:shrink ${item.active ? "bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-gray-200/80" : "text-gray-500 hover:bg-white hover:text-gray-700"}`}>
                <item.Icon className="h-3.5 w-3.5" />{item.label}
              </button>
            ))}
          </nav>

          <div className="mt-3 rounded-md border border-gray-200 bg-white p-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold"><IconCrown className="h-3 w-3" />Builder Plan</div>
            <p className="mt-1 text-[11px] leading-[1.4] text-gray-400">Unbegrenzte Scans + Alerts</p>
            <button className="mt-2 w-full rounded-md bg-black py-1.5 text-[11px] font-semibold text-white transition hover:bg-gray-800">Upgraden</button>
          </div>

          <button onClick={onLogout} className="mt-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium text-gray-400 transition hover:bg-white hover:text-gray-600">
            <IconLogout className="h-3 w-3" /> Ausloggen
          </button>
        </aside>

        {/* Main */}
        <main className="min-w-0 bg-white p-3.5 lg:p-4">
          {/* Search */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <form onSubmit={onSubmit} className="flex min-w-0 flex-1 gap-2">
              <div className="relative min-w-0 flex-1">
                <IconSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Nische scannen: z.B. KI Coaching, Hundefutter..." className="h-9 w-full rounded-md border border-gray-200 pl-9 pr-3 text-[13px] outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black" />
              </div>
              <button type="submit" disabled={loading} className="h-9 rounded-md bg-black px-4 text-[12px] font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50">{loading ? "Scanne..." : "Scannen"}</button>
            </form>
            <div className="flex gap-1.5">
              <button onClick={reset} className="h-9 rounded-md border border-gray-200 px-2.5 text-gray-500 transition hover:bg-gray-50"><IconRefresh className="h-3.5 w-3.5" /></button>
              <button className="relative h-9 rounded-md border border-gray-200 px-2.5 text-gray-500 transition hover:bg-gray-50">
                <IconBell className="h-3.5 w-3.5" />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
            </div>
          </div>

          {/* Quick keywords */}
          <div className="mt-2.5 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["KI Automatisierung", "Haustier Snacks", "Pflege Recruiting", "Shopify Upsell", "Local SEO", "Online Kurs"].map(kw => (
              <button key={kw} onClick={() => pick(kw)} className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-medium transition ${q === kw ? "bg-black text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}>{kw}</button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-3 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50/50 py-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
                <p className="text-[12px] text-gray-500">Scanne echte Google-Daten...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {scanError && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">{scanError}</div>
          )}

          {/* Metrics */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-[11px] font-medium text-gray-400">Nachfrage</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[24px] font-bold tracking-tight">{avgDemand}</span>
                <span className="text-[11px] text-gray-400">/100</span>
                <span className={`ml-auto rounded px-1 py-0.5 text-[10px] font-semibold ${avgDemand >= 75 ? "bg-green-50 text-green-700" : avgDemand >= 45 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>{liveResult ? liveResult.score.demandLabel : avgDemand >= 85 ? "Hoch" : "Mittel"}</span>
              </div>
            </div>
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-[11px] font-medium text-gray-400">Konkurrenz</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[24px] font-bold tracking-tight">{avgComp}</span>
                <span className="text-[11px] text-gray-400">/100</span>
                <span className={`ml-auto rounded px-1 py-0.5 text-[10px] font-semibold ${avgComp >= 70 ? "bg-green-50 text-green-700" : avgComp >= 45 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>{liveResult ? liveResult.score.competitionLabel : avgComp <= 25 ? "Niedrig" : "Mittel"}</span>
              </div>
            </div>
            <div className="rounded-md border border-gray-200 p-3">
              <p className="text-[11px] font-medium text-gray-400">Opportunity</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[24px] font-bold tracking-tight">{avgScore}</span>
                <span className="text-[11px] text-gray-400">/100</span>
                <span className={`ml-auto rounded px-1 py-0.5 text-[10px] font-semibold ${avgScore >= 80 ? "bg-green-50 text-green-700" : avgScore >= 65 ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>{liveResult ? liveResult.score.label : avgScore >= 85 ? "Stark" : "Solide"}</span>
              </div>
            </div>
          </div>

          {/* Live result details */}
          {liveResult && !loading && (
            <div className="mt-3 space-y-2">
              <div className="rounded-md border border-gray-200 bg-gray-50/50 p-3">
                <p className="text-[12px] font-semibold text-gray-700">{liveResult.score.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">Intent: {liveResult.score.intent}/100</span>
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">Trend: {liveResult.score.trendLabel}</span>
                  {liveResult.autocomplete.commercialIntent && <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">Kaufintent erkannt</span>}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-md border border-gray-200 p-3">
                  <p className="text-[11px] font-medium text-gray-400">Google Trends (12 Monate)</p>
                  <div className="mt-2 flex h-10 items-end gap-[2px]">
                    {liveResult.trend.timeline.slice(-24).map((point, i) => {
                      const max = Math.max(...liveResult!.trend.timeline.map(p => p.value), 1);
                      return <span key={i} className={`flex-1 rounded-sm ${liveResult!.trend.direction === "rising" ? "bg-green-500" : liveResult!.trend.direction === "falling" ? "bg-red-400" : "bg-gray-400"}`} style={{ height: `${Math.max(4, (point.value / max) * 100)}%` }} />;
                    })}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-400">
                    <span>Aktuell: {liveResult.trend.currentInterest}/100</span>
                    <span>{liveResult.trend.direction === "rising" ? "Steigend" : liveResult.trend.direction === "falling" ? "Fallend" : "Stabil"} {liveResult.trend.growthPercent > 0 ? "+" : ""}{liveResult.trend.growthPercent}%</span>
                  </div>
                </div>

                <div className="rounded-md border border-gray-200 p-3">
                  <p className="text-[11px] font-medium text-gray-400">Autocomplete ({liveResult.autocomplete.count} Vorschlage)</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {liveResult.autocomplete.suggestions.slice(0, 8).map((s, i) => (
                      <span key={i} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {liveResult.trend.relatedQueries.length > 0 && (
                <div className="rounded-md border border-gray-200 p-3">
                  <p className="text-[11px] font-medium text-gray-400">Verwandte Suchanfragen</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {liveResult.trend.relatedQueries.slice(0, 10).map((rq, i) => (
                      <button key={i} onClick={() => pick(rq)} className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 transition hover:bg-blue-100">{rq}</button>
                    ))}
                  </div>
                </div>
              )}

              {liveResult.expandedKeywords.length > 0 && (
                <div className="rounded-md border border-gray-200 p-3">
                  <p className="text-[11px] font-medium text-gray-400">Erweiterte Keywords ({liveResult.expandedKeywords.length})</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {liveResult.expandedKeywords.slice(0, 12).map((kw, i) => (
                      <span key={i} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">{kw}</span>
                    ))}
                    {liveResult.expandedKeywords.length > 12 && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-400">+{liveResult.expandedKeywords.length - 12} mehr</span>}
                  </div>
                </div>
              )}

              {/* Multi-platform data */}
              {liveResult.platforms && (
                <div className="grid gap-2 sm:grid-cols-3">
                  {/* Amazon */}
                  {liveResult.platforms.amazon.length > 0 && (
                    <div className="rounded-md border border-gray-200 p-3">
                      <p className="text-[11px] font-medium text-gray-400">Amazon Kaufintent</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {liveResult.platforms.amazon.slice(0, 6).map((s, i) => (
                          <span key={i} className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* YouTube */}
                  {liveResult.platforms.youtube.length > 0 && (
                    <div className="rounded-md border border-gray-200 p-3">
                      <p className="text-[11px] font-medium text-gray-400">YouTube Nachfrage</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {liveResult.platforms.youtube.slice(0, 6).map((s, i) => (
                          <span key={i} className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] text-red-700">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reddit */}
                  {liveResult.platforms.reddit.length > 0 && (
                    <div className="rounded-md border border-gray-200 p-3">
                      <p className="text-[11px] font-medium text-gray-400">Reddit Diskussionen</p>
                      <div className="mt-1.5 space-y-1">
                        {liveResult.platforms.reddit.slice(0, 3).map((post, i) => (
                          <div key={i} className="text-[10px]">
                            <span className="text-gray-600 line-clamp-1">{post.title}</span>
                            <span className="ml-1 text-gray-400">r/{post.subreddit} · {post.score} upvotes</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Results */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold">{liveResult ? `Ergebnisse fur "${liveResult.keyword}"` : result.mode === "top" ? "Top Nischen" : `Ergebnisse fur "${q}"`}</h3>
              {liveResult && <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700">LIVE</span>}
            </div>
            {scanCount > 0 && (
              <span className="text-[11px] text-gray-400">{scanCount} Scan{scanCount !== 1 && "s"} · <span className="font-medium text-black">{Math.max(0, 3 - scanCount)} Free ubrig</span></span>
            )}
          </div>

          <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
            {niches.map(n => (
              <div key={n.title} className="group rounded-md border border-gray-200 p-3 transition-colors hover:bg-[#fafafa]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="grid h-5 w-5 place-items-center rounded bg-black text-[10px] font-bold text-white">{n.rank}</span>
                    {n.hot && <span className="rounded bg-red-50 px-1 py-0.5 text-[9px] font-bold text-red-600">HOT</span>}
                  </div>
                  <button className="text-gray-300 transition hover:text-black"><IconBookmark className="h-3.5 w-3.5" /></button>
                </div>
                <h4 className="mt-2 text-[13px] font-semibold leading-snug">{n.title}</h4>
                <p className="mt-1 text-[12px] leading-[1.5] text-gray-400">{n.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">{n.demand}</span>
                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">{n.competition}</span>
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500">Score: {n.score}</span>
                </div>
                {n.viewers && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                    <IconEye className="h-3 w-3" />
                    <span>{n.viewers} schauen sich das gerade an</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scan limit nudge */}
          {scanCount >= 2 && (
            <div className="mt-3 flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
              <p className="text-[12px] font-medium text-amber-800">Du hast noch {Math.max(0, 3 - scanCount)} kostenlose Scans. Upgrade fur unbegrenzten Zugang.</p>
              <a href="#preise" className="shrink-0 rounded-md bg-black px-3 py-1 text-[11px] font-semibold text-white">Upgraden</a>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1"><IconUsers className="h-3 w-3" />2.847 Grunder</span>
              <span className="flex items-center gap-1"><IconFire className="h-3 w-3" />12.400+ Scans</span>
            </div>
            <span className="text-[11px] text-gray-400">Free Plan · <a href="#preise" className="font-medium text-black underline decoration-gray-300 underline-offset-2">Upgraden</a></span>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Dashboard Section wrapper with auth gate ── */
function DashboardSection({ isLoggedIn, onLogin, onLogout }: { isLoggedIn: boolean; onLogin: (email: string) => void; onLogout: () => void }) {
  return (
    <section id="demo" className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Kostenloser Nischen-Audit</p>
            <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">Teste deine Idee in 30 Sekunden</h2>
            <p className="mt-1 text-[14px] text-gray-500">{isLoggedIn ? "Gib ein Keyword ein und erhalte echte Nachfrage-Daten von Google." : "E-Mail eingeben, sofort scannen. Keine Kreditkarte."}</p>
          </div>
          {isLoggedIn && (
            <div className="flex items-center gap-2 text-[12px] text-gray-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span>Live — Echte Google-Daten</span>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <Dashboard onLogout={onLogout} />
        ) : (
          <div className="relative">
            {/* Blurred dashboard preview behind login */}
            <div className="pointer-events-none select-none overflow-hidden rounded-lg border border-gray-200 opacity-30 blur-[2px]">
              <div className="grid min-h-[300px] grid-cols-1 lg:grid-cols-[200px_1fr]">
                <aside className="border-r border-gray-200 bg-[#fafafa] p-3">
                  <div className="space-y-2">
                    {sidebarItems.slice(0, 4).map(item => (
                      <div key={item.label} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-gray-400">
                        <item.Icon className="h-3.5 w-3.5" />{item.label}
                      </div>
                    ))}
                  </div>
                </aside>
                <main className="p-4">
                  <div className="h-9 rounded-md border border-gray-200 bg-gray-50" />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[1,2,3].map(i => <div key={i} className="h-16 rounded-md border border-gray-200 bg-gray-50" />)}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[1,2,3].map(i => <div key={i} className="h-32 rounded-md border border-gray-200 bg-gray-50" />)}
                  </div>
                </main>
              </div>
            </div>
            {/* Login overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <LoginGate onLogin={onLogin} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── USE CASES ── */
function UseCasesSection() {
  return (
    <section id="usecases" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Ergebnisse</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">Von der Nische zum Business</h2>
          <p className="mt-2 text-[14px] text-gray-500">Grunder nutzen Kaching OS, um validierte Nischen zu finden — und bauen damit echte Businesses.</p>
        </div>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map(uc => (
            <div key={uc.title} className="rounded-lg border border-gray-200/60 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">{uc.tag}</span>
                <span className="text-[11px] text-gray-400">via {uc.tool}</span>
              </div>
              <h3 className="mt-2.5 text-[14px] font-semibold">{uc.title}</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-gray-500">{uc.desc}</p>
              <div className="mt-3 border-t border-gray-100 pt-2">
                <span className="text-[20px] font-bold tracking-tight">{uc.revenue} EUR</span>
                <span className="ml-1 text-[11px] text-gray-400">Monat 1</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function TestimonialsSection() {
  return (
    <section className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Testimonials</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">Was Grunder sagen</h2>
        </div>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map(t => (
            <div key={t.name} className="rounded-lg border border-gray-200/60 p-4">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <IconStar key={i} className="h-3.5 w-3.5 text-amber-400" />)}</div>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-gray-600">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-gray-900 text-[10px] font-bold text-white">{t.avatar}</div>
                <div><p className="text-[12px] font-semibold">{t.name}</p><p className="text-[11px] text-gray-400">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── NUMBERS ── */
function NumbersSection() {
  return (
    <section className="border-t border-gray-200/60 bg-black text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          {[
            { v: "2.847+", l: "Grunder" },
            { v: "12.400+", l: "Nischen gescannt" },
            { v: "30 Sek.", l: "bis zum Score" },
            { v: "68%", l: "launchen in 14 Tagen" }
          ].map(s => (
            <div key={s.l}>
              <p className="text-[28px] font-bold tracking-tight sm:text-[36px]">{s.v}</p>
              <p className="mt-0.5 text-[13px] text-gray-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ── */
function PricingSection() {
  return (
    <section id="preise" className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-md text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Preise</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">Starte kostenlos. Upgrade wenn du wachst.</h2>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-3">
          {pricingTiers.map(t => {
            const f = !!t.featured;
            return (
              <div key={t.name} className={`flex flex-col p-5 sm:p-6 ${f ? "bg-black text-white" : "bg-white"}`}>
                {f && <span className="mb-2.5 w-fit rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold">Empfohlen</span>}
                <p className={`text-[13px] font-semibold ${f ? "text-gray-400" : "text-gray-500"}`}>{t.name}</p>
                <div className="mt-2 flex items-baseline gap-0.5">
                  {t.price !== "0" && <span className={`text-[13px] ${f ? "text-gray-500" : "text-gray-400"}`}>EUR</span>}
                  <span className="text-[36px] font-bold tracking-tight">{t.price === "0" ? "Free" : t.price}</span>
                  {t.period && <span className={`text-[13px] ${f ? "text-gray-500" : "text-gray-400"}`}>{t.period}</span>}
                </div>
                <p className={`mt-1 text-[13px] ${f ? "text-gray-400" : "text-gray-500"}`}>{t.desc}</p>
                {t.seats && <p className="mt-2 rounded bg-amber-500/20 px-2 py-1 text-[11px] font-semibold text-amber-200">{t.seats}</p>}
                {"annual" in t && t.annual && <p className={`mt-1 text-[11px] ${f ? "text-gray-500" : "text-gray-400"}`}>{t.annual}</p>}
                <button className={`mt-4 w-full rounded-md py-2.5 text-[13px] font-semibold transition ${f ? "bg-white text-black hover:bg-gray-100" : "border border-gray-200 hover:bg-gray-50"}`}>{t.cta}</button>
                <ul className={`mt-4 space-y-2 text-[13px] ${f ? "text-gray-300" : "text-gray-500"}`}>
                  {t.items.map(item => <li key={item} className="flex items-center gap-2"><IconCheck className={`h-3.5 w-3.5 shrink-0 ${f ? "text-gray-500" : "text-gray-400"}`} />{item}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-[12px] text-gray-400">14 Tage Geld-zuruck-Garantie · Jederzeit kundbar · Keine versteckten Kosten</p>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQSection() {
  return (
    <section id="faq" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
        <h2 className="text-center text-[1.75rem] font-bold tracking-[-0.02em] sm:text-[2rem]">Haufige Fragen</h2>
        <div className="mt-8 divide-y divide-gray-200">
          {faqItems.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-[14px] font-medium">{q}<IconChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" /></summary>
              <p className="mt-2 text-[14px] leading-[1.65] text-gray-500">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ── */
function FinalCTA() {
  const { locale } = useLocale();
  return (
    <section className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="rounded-lg bg-black p-8 sm:p-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2rem]">{t("cta.h2", locale)}</h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-gray-400">{t("cta.desc", locale)}</p>
            <a href="#demo" className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-white px-6 text-[14px] font-semibold text-black transition hover:bg-gray-100">{t("cta.button", locale)} <IconArrowRight className="h-4 w-4" /></a>
            <p className="mt-3 text-[12px] text-gray-500">{t("cta.legal", locale)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p className="text-[12px] text-gray-400">&copy; 2026 Kaching OS</p>
        <div className="flex gap-5 text-[12px] text-gray-400">{navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-black transition">{l.label}</a>)}</div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   PAGE — Funnel structure
   Hero → Trust → Pain → Solution → Dashboard (gated) → Results → Testimonials → Numbers → Pricing → FAQ → CTA
   ══════════════════════════════════════ */
export default function Home() {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [locale, setLocale] = useState<Locale>("de");

  // Detect browser language on mount
  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  function handleLogin(email: string) {
    setIsLoggedIn(true);
    setUserEmail(email);
    setTimeout(() => {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div className="min-h-screen bg-white text-gray-900">
        <Header onMenu={() => setNav(true)} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        {nav && <MobileNav onClose={() => setNav(false)} />}
        <Hero />
        <Ticker />
        <PainSection />
        <CostSection />
        <HowSection />
        <DashboardSection isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
        <UseCasesSection />
        <TestimonialsSection />
        <NumbersSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
        <Footer />
        <LiveToast />
      </div>
    </LocaleContext.Provider>
  );
}
