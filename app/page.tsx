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
function IconCheck(p: { className?: string }) { return <I {...p}><path d="M5 12l5 5L20 7" /></I>; }
function IconChevronDown(p: { className?: string }) { return <I {...p}><path d="m6 9 6 6 6-6" /></I>; }
function IconCrown(p: { className?: string }) { return <I {...p}><path d="m3 18 2-10 7 5 7-5 2 10H3z" /><path d="M3 18h18" /></I>; }
function IconGauge(p: { className?: string }) { return <I {...p}><path d="M12 14 16 10" /><path d="M5.2 18a8 8 0 1 1 13.6 0" /><path d="M8 18h8" /></I>; }
function IconMenu(p: { className?: string }) { return <I {...p}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></I>; }
function IconRefresh(p: { className?: string }) { return <I {...p}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></I>; }
function IconSearch(p: { className?: string }) { return <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>; }
function IconStar(p: { className?: string }) { return <I {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2-4.4-4.3 6.1-.9L12 3Z" fill="currentColor" /></I>; }
function IconTrending(p: { className?: string }) { return <I {...p}><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></I>; }
function IconWand(p: { className?: string }) { return <I {...p}><path d="m3 21 9-9" /><path d="m12 12 9-9" /><path d="M15 3v4" /><path d="M13 5h4" /><path d="M19 9v4" /><path d="M17 11h4" /><path d="M5 15v4" /><path d="M3 17h4" /></I>; }
function IconX(p: { className?: string }) { return <I {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></I>; }
function IconZap(p: { className?: string }) { return <I {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></I>; }
function IconUsers(p: { className?: string }) { return <I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></I>; }
function IconFire(p: { className?: string }) { return <I {...p}><path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.04-2-4-1.786 2-2.792 3-4 1Z" /></I>; }
function IconLogout(p: { className?: string }) { return <I {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></I>; }
function IconExternalLink(p: { className?: string }) { return <I {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></I>; }
function IconTarget(p: { className?: string }) { return <I {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></I>; }
function IconRocket(p: { className?: string }) { return <I {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></I>; }
function IconDollar(p: { className?: string }) { return <I {...p}><line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></I>; }

/* ── Data ── */
const useCases = [
  { tool: "Shopify", title: "D2C-Shop in 48h", titleEn: "D2C Shop in 48h", desc: "Sarah fand eine Nische fur nachhaltige Haustier-Snacks. Monat 1: 4.200 EUR Umsatz.", descEn: "Sarah found a niche for sustainable pet snacks. Month 1: 4,200 EUR revenue.", tag: "E-Commerce", revenue: "4.200" },
  { tool: "Lovable", title: "Micro-SaaS mit KI", titleEn: "Micro-SaaS with AI", desc: "Tim baute einen KI-Termin-Assistenten. 14 zahlende Kunden im ersten Monat.", descEn: "Tim built an AI scheduling assistant. 14 paying customers in month 1.", tag: "SaaS", revenue: "2.800" },
  { tool: "Framer", title: "Agentur-Landingpage", titleEn: "Agency Landing Page", desc: "Julia: Local-SEO fur Handwerker. 23 qualifizierte Leads in Woche 1.", descEn: "Julia: Local SEO for contractors. 23 qualified leads in week 1.", tag: "Agency", revenue: "3.500" },
  { tool: "Gumroad", title: "Digitales Produkt", titleEn: "Digital Product", desc: "Markus: Notion-Templates fur Freelancer. 890 EUR passiv in Monat 1.", descEn: "Markus: Notion templates for freelancers. 890 EUR passive in month 1.", tag: "Digital", revenue: "890" },
];

const testimonials = [
  { name: "Sarah K.", role: "Shopify-Grunderin", roleEn: "Shopify Founder", text: "Ich habe vorher 3 Produkte gelauncht, die niemand wollte. Mit Kaching OS habe ich zum ersten Mal VOR dem Bauen gepruft, ob Nachfrage da ist.", textEn: "I previously launched 3 products nobody wanted. With Kaching OS, for the first time I validated demand BEFORE building.", avatar: "SK" },
  { name: "Tim R.", role: "Solo-Founder", roleEn: "Solo Founder", text: "In 20 Minuten eine validierte Nische. In 3 Tagen ein MVP. In 2 Wochen zahlende Kunden.", textEn: "A validated niche in 20 minutes. An MVP in 3 days. Paying customers in 2 weeks.", avatar: "TR" },
  { name: "Julia M.", role: "Marketerin", roleEn: "Marketer", text: "Kaching OS ist wie ein Cheat-Code. Du siehst sofort, wo die Leute Geld ausgeben wollen.", textEn: "Kaching OS is like a cheat code. You instantly see where people want to spend money.", avatar: "JM" },
  { name: "Markus B.", role: "Creator", roleEn: "Creator", text: "Endlich kein Bauchgefuhl mehr. Die Daten zeigen klar: hier ist Nachfrage, hier baust du.", textEn: "No more gut feeling. The data shows clearly: here's demand, here you build.", avatar: "MB" }
];

const pricingTiers = [
  { name: "Free", price: "0", period: "", desc: "Teste ob es fur dich passt.", descEn: "Test if it works for you.", cta: "Kostenlos starten", ctaEn: "Start free", items: ["3 Scans / Monat", "Basis-Score", "Autocomplete-Daten", "Community-Zugang"], itemsEn: ["3 scans / month", "Basic score", "Autocomplete data", "Community access"] },
  { name: "Builder", price: "29", period: "/mo", desc: "Fur Grunder, die diese Woche starten.", descEn: "For founders starting this week.", cta: "Jetzt Builder werden", ctaEn: "Become a Builder", featured: true, items: ["Unbegrenzte Scans", "KI Business-Vorschlage", "Google Trends + Konkurrenz", "Amazon + YouTube + Reddit", "Nischen-Alerts per E-Mail", "Prioritats-Support"], itemsEn: ["Unlimited scans", "AI business suggestions", "Google Trends + competition", "Amazon + YouTube + Reddit", "Niche alerts via email", "Priority support"], seats: "Noch 19 Platze zum Launch-Preis", seatsEn: "19 spots left at launch price", annual: "oder 19 EUR/mo bei Jahreszahlung", annualEn: "or 19 EUR/mo billed annually" },
  { name: "Agency", price: "79", period: "/mo", desc: "Fur Teams die Kunden beraten.", descEn: "For teams advising clients.", cta: "Team starten", ctaEn: "Start team", items: ["Alles aus Builder", "5 Team-Seats", "White-Label Reports", "API-Zugang", "Kunden-Dashboard"], itemsEn: ["Everything in Builder", "5 team seats", "White-label reports", "API access", "Client dashboard"] }
];

const faqItemsDe: [string, string][] = [
  ["Kann ich das nicht einfach selbst googeln?", "Klar — das dauert pro Nische 2-3 Stunden. Kaching OS macht das in 30 Sekunden und kombiniert 4 Datenquellen zu einem Score. Die Frage ist: Willst du 10 Nischen manuell recherchieren oder in 5 Minuten die beste finden?"],
  ["Woher kommen die Daten?", "Direkt von Google, Amazon, YouTube und Reddit: Autocomplete zeigt echte Suchnachfrage, Google Trends zeigt ob die Nachfrage steigt, Amazon zeigt Kaufintent, Reddit zeigt Community-Engagement."],
  ["Ich habe noch keine konkrete Idee. Hilft mir das trotzdem?", "Genau dafur ist es gebaut. Gib ein Thema ein (z.B. 'Hunde', 'Fitness', 'Handwerker') und Kaching OS zeigt dir profitable Sub-Nischen mit wenig Konkurrenz."],
  ["Was mache ich mit dem Ergebnis?", "Du nimmst die Nische mit dem hoechsten Score und die KI schlagt dir direkt vor, was du bauen sollst — inkl. Tool-Empfehlung und 3-Schritte-Plan."],
  ["Gibt es eine Geld-zuruck-Garantie?", "14 Tage, keine Fragen. Wenn dir Kaching OS keine profitable Nische zeigt, bekommst du dein Geld zurueck. Kein Risiko."],
  ["Warum sollte ich jetzt starten und nicht spaeter?", "Jede Nische hat ein Zeitfenster. Wenn du eine steigende Nische mit wenig Konkurrenz findest, zaehlt Geschwindigkeit. Wer zuerst baut, gewinnt."]
];

const faqItemsEn: [string, string][] = [
  ["Can't I just Google this myself?", "Sure — that takes 2-3 hours per niche. Kaching OS does it in 30 seconds combining 4 data sources into one score. The question is: Do you want to manually research 10 niches or find the best one in 5 minutes?"],
  ["Where does the data come from?", "Directly from Google, Amazon, YouTube and Reddit: Autocomplete shows real search demand, Google Trends shows if demand is rising, Amazon shows buying intent, Reddit shows community engagement."],
  ["I don't have a specific idea yet. Can this still help?", "That's exactly what it's built for. Enter a topic (e.g. 'dogs', 'fitness', 'contractors') and Kaching OS shows you profitable sub-niches with low competition."],
  ["What do I do with the results?", "Take the niche with the highest score and our AI suggests exactly what to build — including tool recommendation and a 3-step plan."],
  ["Is there a money-back guarantee?", "14 days, no questions asked. If Kaching OS doesn't show you a profitable niche, you get your money back. Zero risk."],
  ["Why should I start now and not later?", "Every niche has a time window. When you find a rising niche with low competition, speed matters. First to build wins."]
];

/* ══════════════════════════════════════
   LIVE NOTIFICATION TOASTS
   ══════════════════════════════════════ */
const toastMessages = [
  { text: "Sarah K. hat gerade eine Nische gescannt", textEn: "Sarah K. just scanned a niche", time: "12s", type: "scan" as const },
  { text: "Neue Trending-Nische: KI fur Handwerker", textEn: "New trending niche: AI for contractors", time: "1m", type: "trend" as const },
  { text: "Julia M. ist gerade Builder geworden", textEn: "Julia M. just became a Builder", time: "2m", type: "upgrade" as const },
  { text: "47 Grunder scannen gerade live", textEn: "47 founders scanning live", time: "now", type: "live" as const },
];

function LiveToast() {
  const { locale } = useLocale();
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
          <p className="text-[13px] font-medium leading-snug text-gray-900">{locale === "en" ? msg.textEn : msg.text}</p>
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
  const { locale } = useLocale();
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex h-12 items-center justify-between border-b border-gray-200 px-5"><Logo /><button onClick={onClose}><IconX className="h-5 w-5" /></button></div>
      <nav className="p-4 space-y-1">
        <a href="#how" onClick={onClose} className="block rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-gray-50">{t("nav.how", locale)}</a>
        <a href="#demo" onClick={onClose} className="block rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-gray-50">{t("nav.dashboard", locale)}</a>
        <a href="#usecases" onClick={onClose} className="block rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-gray-50">{t("nav.results", locale)}</a>
        <a href="#preise" onClick={onClose} className="block rounded-md px-3 py-2.5 text-[15px] font-medium hover:bg-gray-50">{t("nav.pricing", locale)}</a>
        <a href="#demo" onClick={onClose} className="mt-3 block rounded-md bg-black py-2.5 text-center text-[14px] font-semibold text-white">{t("nav.cta", locale)}</a>
      </nav>
    </div>
  );
}

/* ══════════════════════════════════════
   HERO
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

          <div className="relative">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDashboardMockup() {
  const { locale } = useLocale();
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
      <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] font-medium text-gray-400">Kaching OS</span>
      </div>

      <div className="p-4 space-y-3">
        <div className={`flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 transition-all duration-500 ${animStep >= 1 ? "border-black ring-1 ring-black" : ""}`}>
          <IconSearch className="h-3.5 w-3.5 text-gray-400" />
          <span className={`text-[13px] transition-all duration-700 ${animStep >= 1 ? "text-black" : "text-gray-300"}`}>
            {animStep >= 1 ? (locale === "en" ? "Pet Snacks" : "Haustier Snacks") : (locale === "en" ? "Enter niche..." : "Nische eingeben...")}
          </span>
          <span className={`ml-auto rounded bg-black px-2 py-0.5 text-[10px] font-semibold text-white transition-all duration-300 ${animStep >= 2 ? "opacity-100" : "opacity-40"}`}>{t("ui.scan", locale)}</span>
        </div>

        <div className={`transition-all duration-500 ${animStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-gray-400">Opportunity Score</span>
            <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700">{t("ui.excellent", locale)}</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-[40px] font-bold tracking-tight leading-none">{animScore}</span>
            <span className="mb-1 text-[13px] text-gray-400">/100</span>
          </div>

          <div className="mt-3 space-y-1.5">
            {[
              { label: t("ui.demand", locale), value: 91, color: "bg-green-500" },
              { label: t("ui.trend", locale), value: 78, color: "bg-blue-500" },
              { label: t("ui.competition", locale), value: 85, color: "bg-emerald-500" },
              { label: t("ui.intent", locale), value: 70, color: "bg-amber-500" },
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

          {/* AI suggestion preview */}
          <div className="mt-3 rounded-md border border-green-200 bg-green-50/50 p-2">
            <div className="flex items-center gap-1.5">
              <IconWand className="h-3 w-3 text-green-600" />
              <span className="text-[10px] font-semibold text-green-700">{t("ui.ai.title", locale)}</span>
            </div>
            <p className="mt-1 text-[10px] text-green-800 leading-relaxed">
              {locale === "en" ? "Build a D2C subscription box for organic pet snacks with Shopify" : "Baue eine D2C Abo-Box fur Bio-Haustier-Snacks mit Shopify"}
            </p>
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

/* ── PAIN ── */
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

/* ── COST OF INACTION ── */
function CostSection() {
  const { locale } = useLocale();
  return (
    <section className="border-t border-gray-200/60 bg-black text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-500">{t("cost.label", locale)}</p>
          <h2 className="mt-2 text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[1.75rem]">{t("cost.h2", locale)}</h2>
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

/* ── HOW — 3 steps ── */
function HowSection() {
  const { locale } = useLocale();
  return (
    <section id="how" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">{t("how.label", locale)}</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">{t("how.h2", locale)}</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { n: "01", title: t("how.step1.title", locale), desc: t("how.step1.desc", locale), icon: <IconSearch className="h-5 w-5" /> },
            { n: "02", title: t("how.step2.title", locale), desc: t("how.step2.desc", locale), icon: <IconGauge className="h-5 w-5" /> },
            { n: "03", title: t("how.step3.title", locale), desc: t("how.step3.desc", locale), icon: <IconZap className="h-5 w-5" /> },
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
  const { locale } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"email" | "login">("email");
  const [error, setError] = useState("");

  function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError(t("login.error.email", locale));
      return;
    }
    onLogin(email);
  }

  function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      onLogin(email);
    } else {
      setError(t("login.error.creds", locale));
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
        <h3 className="text-center text-[17px] font-bold">{t("login.h3", locale)}</h3>
        <p className="mt-1.5 text-center text-[13px] text-gray-500">{t("login.desc", locale)}</p>

        {mode === "email" ? (
          <form onSubmit={handleEmailSubmit} className="mt-5 space-y-3">
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder={locale === "en" ? "your@email.com" : "deine@email.de"} className="h-10 w-full rounded-md border border-gray-200 px-3 text-[13px] outline-none transition focus:border-black focus:ring-1 focus:ring-black" />
            {error && <p className="text-[12px] text-red-600">{error}</p>}
            <button type="submit" className="h-10 w-full rounded-md bg-black text-[13px] font-semibold text-white transition hover:bg-gray-800">{t("login.cta", locale)}</button>
            <p className="text-center text-[11px] text-gray-400">{t("login.legal", locale)}</p>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="mt-5 space-y-3">
            <div>
              <label className="text-[12px] font-medium text-gray-500">E-Mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="test@kaching.os" className="mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-[13px] outline-none transition focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-500">{locale === "en" ? "Password" : "Passwort"}</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="kaching2024" className="mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-[13px] outline-none transition focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            {error && <p className="text-[12px] text-red-600">{error}</p>}
            <button type="submit" className="h-10 w-full rounded-md bg-black text-[13px] font-semibold text-white transition hover:bg-gray-800">{locale === "en" ? "Login" : "Einloggen"}</button>
            <div className="rounded-md bg-gray-50 p-2.5">
              <p className="font-mono text-[10px] text-gray-500">Test: test@kaching.os / kaching2024</p>
            </div>
          </form>
        )}

        <button onClick={() => { setMode(mode === "email" ? "login" : "email"); setError(""); }} className="mt-3 w-full text-center text-[11px] text-gray-400 hover:text-gray-600 transition">
          {mode === "email" ? t("login.switch.login", locale) : t("login.switch.email", locale)}
        </button>
      </div>
    </div>
  );
}

/* ── Dashboard API types ── */
type AiInsight = {
  businessIdea: string;
  tool: string;
  toolReason: string;
  steps: string[];
  revenueModel: string;
  expectedRevenue: string;
  targetAudience: string;
  oneLinePitch: string;
} | null;

type ScanResult = {
  keyword: string;
  score: { total: number; demand: number; trend: number; competition: number; intent: number; label: string; demandLabel: string; trendLabel: string; competitionLabel: string; summary: string };
  autocomplete: { suggestions: string[]; count: number; commercialIntent: boolean; intentSignals: string[] };
  trend: { direction: string; currentInterest: number; averageInterest: number; growthPercent: number; timeline: { date: string; value: number }[]; relatedQueries: string[] };
  platforms?: { amazon: string[]; youtube: string[]; reddit: { title: string; subreddit: string; score: number }[] };
  expandedKeywords: string[];
  scannedAt: string;
} | null;

/* ══════════════════════════════════════
   REDESIGNED DASHBOARD — Clear, actionable, visual
   ══════════════════════════════════════ */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { locale } = useLocale();
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [liveResult, setLiveResult] = useState<ScanResult>(null);
  const [aiInsight, setAiInsight] = useState<AiInsight>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [scanError, setScanError] = useState("");

  async function fetchAiInsight(scanData: NonNullable<ScanResult>) {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: scanData.keyword,
          score: scanData.score,
          trend: scanData.trend,
          platforms: scanData.platforms,
          locale
        })
      });
      if (!res.ok) throw new Error("AI failed");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiInsight(data);
    } catch {
      setAiInsight(null);
    } finally {
      setAiLoading(false);
    }
  }

  async function realScan(keyword: string) {
    if (!keyword.trim()) return;
    setLoading(true);
    setScanError("");
    setAiInsight(null);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword })
      });
      if (!res.ok) throw new Error("Scan failed");
      const data: NonNullable<ScanResult> = await res.json();
      setLiveResult(data);
      setScanCount(c => c + 1);
      // Auto-fetch AI insight
      fetchAiInsight(data);
    } catch {
      setScanError(t("ui.scan.error", locale));
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) { e.preventDefault(); realScan(q); }
  function pick(kw: string) { setQ(kw); realScan(kw); }

  const scoreColor = (v: number) => v >= 75 ? "text-green-600" : v >= 50 ? "text-amber-600" : "text-red-500";
  const scoreBg = (v: number) => v >= 75 ? "bg-green-50 border-green-200" : v >= 50 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <form onSubmit={onSubmit} className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <IconSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={t("ui.placeholder", locale)} className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-[14px] outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/5" />
          </div>
          <button type="submit" disabled={loading || !q.trim()} className="h-11 rounded-lg bg-black px-6 text-[13px] font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40">
            {loading ? t("ui.scanning", locale) : t("ui.scan", locale)}
          </button>
        </form>

        {/* Quick keywords */}
        <div className="mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(locale === "en"
            ? ["AI Automation", "Pet Food", "Online Course", "Shopify Upsell", "Local SEO", "Fitness Coach"]
            : ["KI Automatisierung", "Haustier Snacks", "Online Kurs", "Shopify Upsell", "Local SEO", "Fitness Coach"]
          ).map(kw => (
            <button key={kw} onClick={() => pick(kw)} className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition ${q === kw ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{kw}</button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
          <p className="mt-3 text-[13px] text-gray-500">{t("ui.scanning.desc", locale)}</p>
          <div className="mt-4 mx-auto max-w-xs">
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-black" />
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {scanError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{scanError}</div>
      )}

      {/* Results */}
      {liveResult && !loading && (
        <div className="space-y-4">
          {/* ── TOP ROW: Score + Verdict ── */}
          <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
            {/* Score Card */}
            <div className={`rounded-xl border p-5 shadow-sm ${scoreBg(liveResult.score.total)}`}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Opportunity Score</p>
              <div className="mt-3 flex items-end gap-2">
                <span className={`text-[56px] font-bold tracking-tight leading-none ${scoreColor(liveResult.score.total)}`}>{liveResult.score.total}</span>
                <span className="mb-2 text-[16px] text-gray-400">/100</span>
              </div>
              <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold ${
                liveResult.score.total >= 75 ? "bg-green-100 text-green-800" :
                liveResult.score.total >= 50 ? "bg-amber-100 text-amber-800" :
                "bg-red-100 text-red-800"
              }`}>
                {liveResult.score.total >= 75 ? t("ui.verdict.go", locale) :
                 liveResult.score.total >= 50 ? t("ui.verdict.maybe", locale) :
                 t("ui.verdict.nogo", locale)}
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-gray-600">{liveResult.score.summary}</p>
            </div>

            {/* Score Breakdown */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-4">{locale === "en" ? "Score Breakdown" : "Score-Aufschlusselung"}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: t("ui.demand", locale), value: liveResult.score.demand, icon: <IconBarChart className="h-4 w-4" />, color: "green" },
                  { label: t("ui.trend", locale), value: liveResult.score.trend, icon: <IconTrending className="h-4 w-4" />, color: "blue" },
                  { label: t("ui.competition", locale), value: liveResult.score.competition, icon: <IconTarget className="h-4 w-4" />, color: "emerald" },
                  { label: t("ui.intent", locale), value: liveResult.score.intent, icon: <IconDollar className="h-4 w-4" />, color: "amber" },
                ].map(metric => (
                  <div key={metric.label} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      {metric.icon}
                      <span className="text-[11px] font-medium">{metric.label}</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-[22px] font-bold tracking-tight">{metric.value}</span>
                      <span className="text-[11px] text-gray-400">/100</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div className={`h-full rounded-full transition-all duration-700 ${
                        metric.color === "green" ? "bg-green-500" :
                        metric.color === "blue" ? "bg-blue-500" :
                        metric.color === "emerald" ? "bg-emerald-500" : "bg-amber-500"
                      }`} style={{ width: `${metric.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TREND CHART ── */}
          {liveResult.trend.timeline.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconTrending className="h-4 w-4 text-gray-400" />
                  <p className="text-[12px] font-semibold text-gray-500">Google Trends — 12 {locale === "en" ? "months" : "Monate"}</p>
                </div>
                <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  liveResult.trend.direction === "rising" ? "bg-green-50 text-green-700" :
                  liveResult.trend.direction === "falling" ? "bg-red-50 text-red-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {liveResult.trend.direction === "rising" ? t("ui.rising", locale) :
                   liveResult.trend.direction === "falling" ? t("ui.falling", locale) : t("ui.stable", locale)}
                  {liveResult.trend.growthPercent !== 0 && ` ${liveResult.trend.growthPercent > 0 ? "+" : ""}${liveResult.trend.growthPercent}%`}
                </div>
              </div>
              <div className="flex h-20 items-end gap-[3px]">
                {liveResult.trend.timeline.slice(-30).map((point, i) => {
                  const max = Math.max(...liveResult!.trend.timeline.map(p => p.value), 1);
                  return (
                    <span key={i} className={`flex-1 rounded-sm transition-all duration-300 ${
                      liveResult!.trend.direction === "rising" ? "bg-green-400 hover:bg-green-500" :
                      liveResult!.trend.direction === "falling" ? "bg-red-300 hover:bg-red-400" :
                      "bg-gray-300 hover:bg-gray-400"
                    }`} style={{ height: `${Math.max(6, (point.value / max) * 100)}%` }} />
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                <span>{locale === "en" ? "Current Interest" : "Aktuelles Interesse"}: {liveResult.trend.currentInterest}/100</span>
                <span>{locale === "en" ? "Average" : "Durchschnitt"}: {liveResult.trend.averageInterest}/100</span>
              </div>
            </div>
          )}

          {/* ── AI BUSINESS SUGGESTION ── */}
          <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                <IconWand className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-green-900">{t("ui.ai.title", locale)}</p>
                <p className="text-[10px] text-green-600">Powered by GPT-4o</p>
              </div>
            </div>

            {aiLoading && (
              <div className="flex items-center gap-3 py-4">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-300 border-t-green-700" />
                <p className="text-[13px] text-green-700">{t("ui.ai.loading", locale)}</p>
              </div>
            )}

            {aiInsight && !aiLoading && (
              <div className="space-y-4">
                {/* Main idea */}
                <div className="rounded-lg bg-white/80 border border-green-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-1">{locale === "en" ? "Your Business Idea" : "Deine Business-Idee"}</p>
                  <p className="text-[15px] font-bold text-gray-900 leading-snug">{aiInsight.businessIdea}</p>
                  <p className="mt-2 text-[12px] italic text-gray-500">&ldquo;{aiInsight.oneLinePitch}&rdquo;</p>
                </div>

                {/* Key metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-white/80 border border-green-100 p-3 text-center">
                    <IconRocket className="h-4 w-4 mx-auto text-green-600" />
                    <p className="mt-1 text-[10px] font-medium text-gray-500">{t("ui.ai.tool", locale)}</p>
                    <p className="mt-0.5 text-[13px] font-bold text-gray-900">{aiInsight.tool}</p>
                  </div>
                  <div className="rounded-lg bg-white/80 border border-green-100 p-3 text-center">
                    <IconDollar className="h-4 w-4 mx-auto text-green-600" />
                    <p className="mt-1 text-[10px] font-medium text-gray-500">{t("ui.ai.revenue", locale)}</p>
                    <p className="mt-0.5 text-[13px] font-bold text-gray-900">{aiInsight.expectedRevenue}</p>
                  </div>
                  <div className="rounded-lg bg-white/80 border border-green-100 p-3 text-center">
                    <IconUsers className="h-4 w-4 mx-auto text-green-600" />
                    <p className="mt-1 text-[10px] font-medium text-gray-500">{t("ui.ai.audience", locale)}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-gray-900 leading-tight">{aiInsight.targetAudience}</p>
                  </div>
                </div>

                {/* 3-Step Plan */}
                <div className="rounded-lg bg-white/80 border border-green-100 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-3">{t("ui.ai.steps", locale)}</p>
                  <div className="space-y-2.5">
                    {aiInsight.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-[11px] font-bold text-white">{i + 1}</span>
                        <p className="text-[13px] text-gray-700 leading-snug pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA to build */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {aiInsight.tool === "Lovable" && (
                    <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-700 text-[13px] font-semibold text-white transition hover:bg-green-800">
                      {t("ui.ai.build", locale)} Lovable <IconExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {aiInsight.tool === "Shopify" && (
                    <a href="https://shopify.com" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-700 text-[13px] font-semibold text-white transition hover:bg-green-800">
                      {t("ui.ai.build", locale)} Shopify <IconExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {!["Lovable", "Shopify"].includes(aiInsight.tool) && (
                    <button className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-700 text-[13px] font-semibold text-white transition hover:bg-green-800">
                      {t("ui.ai.build", locale)} {aiInsight.tool} <IconExternalLink className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button onClick={() => realScan(q)} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-[13px] font-medium text-gray-700 transition hover:bg-gray-50">
                    <IconRefresh className="h-3.5 w-3.5" /> {locale === "en" ? "Rescan" : "Neu scannen"}
                  </button>
                </div>
              </div>
            )}

            {!aiInsight && !aiLoading && (
              <p className="text-[12px] text-green-600 italic">{t("ui.ai.error", locale)}</p>
            )}
          </div>

          {/* ── PLATFORM SIGNALS ── */}
          {liveResult.platforms && (liveResult.platforms.amazon.length > 0 || liveResult.platforms.youtube.length > 0 || liveResult.platforms.reddit.length > 0) && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-4">{t("ui.platforms", locale)}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Amazon */}
                {liveResult.platforms.amazon.length > 0 && (
                  <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3">
                    <p className="text-[11px] font-bold text-amber-800 mb-2">{t("ui.amazon", locale)}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {liveResult.platforms.amazon.slice(0, 6).map((s, i) => (
                        <span key={i} className="rounded-full bg-white border border-amber-200 px-2 py-0.5 text-[10px] text-amber-800">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* YouTube */}
                {liveResult.platforms.youtube.length > 0 && (
                  <div className="rounded-lg border border-red-100 bg-red-50/50 p-3">
                    <p className="text-[11px] font-bold text-red-800 mb-2">{t("ui.youtube", locale)}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {liveResult.platforms.youtube.slice(0, 6).map((s, i) => (
                        <span key={i} className="rounded-full bg-white border border-red-200 px-2 py-0.5 text-[10px] text-red-800">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reddit */}
                {liveResult.platforms.reddit.length > 0 && (
                  <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-3">
                    <p className="text-[11px] font-bold text-orange-800 mb-2">{t("ui.reddit", locale)}</p>
                    <div className="space-y-1.5">
                      {liveResult.platforms.reddit.slice(0, 3).map((post, i) => (
                        <div key={i} className="text-[10px]">
                          <p className="text-gray-700 line-clamp-1 font-medium">{post.title}</p>
                          <p className="text-gray-400">r/{post.subreddit} · {post.score} upvotes</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── RELATED KEYWORDS ── */}
          {(liveResult.trend.relatedQueries.length > 0 || liveResult.expandedKeywords.length > 0) && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-3">{t("ui.keywords", locale)}</p>
              <div className="flex flex-wrap gap-2">
                {liveResult.trend.relatedQueries.slice(0, 8).map((rq, i) => (
                  <button key={`rq-${i}`} onClick={() => pick(rq)} className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 transition hover:bg-blue-100">{rq}</button>
                ))}
                {liveResult.expandedKeywords.slice(0, 8).map((kw, i) => (
                  <button key={`ek-${i}`} onClick={() => pick(kw)} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600 transition hover:bg-gray-100">{kw}</button>
                ))}
              </div>
            </div>
          )}

          {/* ── AUTOCOMPLETE DETAILS ── */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Google Autocomplete</p>
              <span className="text-[11px] text-gray-400">{liveResult.autocomplete.count} {locale === "en" ? "suggestions" : "Vorschlage"}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {liveResult.autocomplete.suggestions.map((s, i) => (
                <button key={i} onClick={() => pick(s)} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-700 transition hover:bg-gray-100 hover:border-gray-300">{s}</button>
              ))}
            </div>
            {liveResult.autocomplete.commercialIntent && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 border border-green-100 px-3 py-2">
                <IconDollar className="h-3.5 w-3.5 text-green-600" />
                <span className="text-[11px] font-medium text-green-700">
                  {locale === "en" ? "Commercial intent detected" : "Kaufintent erkannt"}: {liveResult.autocomplete.intentSignals.join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!liveResult && !loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
            <IconSearch className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mt-4 text-[15px] font-semibold text-gray-900">
            {locale === "en" ? "Enter a niche to scan" : "Gib eine Nische ein"}
          </h3>
          <p className="mt-1.5 text-[13px] text-gray-500 max-w-sm mx-auto">
            {locale === "en"
              ? "Type any business idea, topic, or keyword. We'll analyze demand, competition, and trends across 4 platforms."
              : "Tippe eine Business-Idee, ein Thema oder Keyword ein. Wir analysieren Nachfrage, Konkurrenz und Trends uber 4 Plattformen."
            }
          </p>
        </div>
      )}

      {/* Footer bar */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1"><IconUsers className="h-3 w-3" />2.847 {locale === "en" ? "founders" : "Grunder"}</span>
          <span className="flex items-center gap-1"><IconFire className="h-3 w-3" />12.400+ Scans</span>
          {scanCount > 0 && <span>{scanCount}/3 Scans · <span className="font-medium text-gray-600">{Math.max(0, 3 - scanCount)} {t("ui.scans.left", locale)}</span></span>}
        </div>
        <div className="flex items-center gap-3">
          <a href="#preise" className="text-[11px] font-medium text-black underline decoration-gray-300 underline-offset-2">{t("ui.upgraden", locale)}</a>
          <button onClick={onLogout} className="text-[11px] text-gray-400 hover:text-gray-600 transition">{t("ui.ausloggen", locale)}</button>
        </div>
      </div>

      {/* Scan limit nudge */}
      {scanCount >= 2 && (
        <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-[12px] font-medium text-amber-800">
            {locale === "en"
              ? `You have ${Math.max(0, 3 - scanCount)} free scans left. Upgrade for unlimited access + AI suggestions.`
              : `Du hast noch ${Math.max(0, 3 - scanCount)} kostenlose Scans. ${t("ui.upgrade.msg", locale)}`
            }
          </p>
          <a href="#preise" className="shrink-0 rounded-lg bg-black px-4 py-1.5 text-[11px] font-semibold text-white">{t("ui.upgraden", locale)}</a>
        </div>
      )}
    </div>
  );
}

/* ── Dashboard Section wrapper ── */
function DashboardSection({ isLoggedIn, onLogin, onLogout }: { isLoggedIn: boolean; onLogin: (email: string) => void; onLogout: () => void }) {
  const { locale } = useLocale();
  return (
    <section id="demo" className="border-t border-gray-200/60">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">{t("dash.label", locale)}</p>
            <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">{t("dash.h2", locale)}</h2>
            <p className="mt-1 text-[14px] text-gray-500">{isLoggedIn ? t("dash.loggedin", locale) : t("dash.loggedout", locale)}</p>
          </div>
          {isLoggedIn && (
            <div className="flex items-center gap-2 text-[12px] text-gray-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span>{t("dash.live", locale)}</span>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <Dashboard onLogout={onLogout} />
        ) : (
          <div className="relative">
            <div className="pointer-events-none select-none overflow-hidden rounded-xl border border-gray-200 opacity-30 blur-[2px]">
              <div className="p-4 space-y-4">
                <div className="h-11 rounded-lg border border-gray-200 bg-gray-50" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-lg border border-gray-200 bg-gray-50" />)}
                </div>
                <div className="h-32 rounded-lg border border-gray-200 bg-gray-50" />
                <div className="h-40 rounded-lg border border-green-200 bg-green-50" />
              </div>
            </div>
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
  const { locale } = useLocale();
  return (
    <section id="usecases" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">{t("uc.label", locale)}</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">{t("uc.h2", locale)}</h2>
          <p className="mt-2 text-[14px] text-gray-500">{t("uc.desc", locale)}</p>
        </div>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map(uc => (
            <div key={uc.title} className="rounded-lg border border-gray-200/60 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">{uc.tag}</span>
                <span className="text-[11px] text-gray-400">via {uc.tool}</span>
              </div>
              <h3 className="mt-2.5 text-[14px] font-semibold">{locale === "en" ? uc.titleEn : uc.title}</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-gray-500">{locale === "en" ? uc.descEn : uc.desc}</p>
              <div className="mt-3 border-t border-gray-100 pt-2">
                <span className="text-[20px] font-bold tracking-tight">{uc.revenue} EUR</span>
                <span className="ml-1 text-[11px] text-gray-400">{locale === "en" ? "Month 1" : "Monat 1"}</span>
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
  const { locale } = useLocale();
  return (
    <section className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">{t("test.label", locale)}</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">{t("test.h2", locale)}</h2>
        </div>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map(tm => (
            <div key={tm.name} className="rounded-lg border border-gray-200/60 p-4">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <IconStar key={i} className="h-3.5 w-3.5 text-amber-400" />)}</div>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-gray-600">&ldquo;{locale === "en" ? tm.textEn : tm.text}&rdquo;</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-gray-900 text-[10px] font-bold text-white">{tm.avatar}</div>
                <div><p className="text-[12px] font-semibold">{tm.name}</p><p className="text-[11px] text-gray-400">{locale === "en" ? tm.roleEn : tm.role}</p></div>
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
  const { locale } = useLocale();
  return (
    <section className="border-t border-gray-200/60 bg-black text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          {[
            { v: "2.847+", l: t("num.founders", locale) },
            { v: "12.400+", l: t("num.scanned", locale) },
            { v: "30 Sek.", l: t("num.time", locale) },
            { v: "68%", l: t("num.launch", locale) }
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
  const { locale } = useLocale();
  return (
    <section id="preise" className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-md text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">{t("price.label", locale)}</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">{t("price.h2", locale)}</h2>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-3">
          {pricingTiers.map(tier => {
            const f = !!tier.featured;
            const items = locale === "en" ? tier.itemsEn : tier.items;
            return (
              <div key={tier.name} className={`flex flex-col p-5 sm:p-6 ${f ? "bg-black text-white" : "bg-white"}`}>
                {f && <span className="mb-2.5 w-fit rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold">{locale === "en" ? "Recommended" : "Empfohlen"}</span>}
                <p className={`text-[13px] font-semibold ${f ? "text-gray-400" : "text-gray-500"}`}>{tier.name}</p>
                <div className="mt-2 flex items-baseline gap-0.5">
                  {tier.price !== "0" && <span className={`text-[13px] ${f ? "text-gray-500" : "text-gray-400"}`}>EUR</span>}
                  <span className="text-[36px] font-bold tracking-tight">{tier.price === "0" ? "Free" : tier.price}</span>
                  {tier.period && <span className={`text-[13px] ${f ? "text-gray-500" : "text-gray-400"}`}>{tier.period}</span>}
                </div>
                <p className={`mt-1 text-[13px] ${f ? "text-gray-400" : "text-gray-500"}`}>{locale === "en" ? tier.descEn : tier.desc}</p>
                {tier.seats && <p className="mt-2 rounded bg-amber-500/20 px-2 py-1 text-[11px] font-semibold text-amber-200">{locale === "en" ? tier.seatsEn : tier.seats}</p>}
                {tier.annual && <p className={`mt-1 text-[11px] ${f ? "text-gray-500" : "text-gray-400"}`}>{locale === "en" ? tier.annualEn : tier.annual}</p>}
                <button className={`mt-4 w-full rounded-md py-2.5 text-[13px] font-semibold transition ${f ? "bg-white text-black hover:bg-gray-100" : "border border-gray-200 hover:bg-gray-50"}`}>{locale === "en" ? tier.ctaEn : tier.cta}</button>
                <ul className={`mt-4 space-y-2 text-[13px] ${f ? "text-gray-300" : "text-gray-500"}`}>
                  {items.map(item => <li key={item} className="flex items-center gap-2"><IconCheck className={`h-3.5 w-3.5 shrink-0 ${f ? "text-gray-500" : "text-gray-400"}`} />{item}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-[12px] text-gray-400">{t("price.guarantee", locale)}</p>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQSection() {
  const { locale } = useLocale();
  const items = locale === "en" ? faqItemsEn : faqItemsDe;
  return (
    <section id="faq" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
        <h2 className="text-center text-[1.75rem] font-bold tracking-[-0.02em] sm:text-[2rem]">{t("faq.h2", locale)}</h2>
        <div className="mt-8 divide-y divide-gray-200">
          {items.map(([q, a]) => (
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
  const { locale } = useLocale();
  return (
    <footer className="border-t border-gray-200/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p className="text-[12px] text-gray-400">&copy; 2026 Kaching OS</p>
        <div className="flex gap-5 text-[12px] text-gray-400">
          <a href="#how" className="hover:text-black transition">{t("nav.how", locale)}</a>
          <a href="#demo" className="hover:text-black transition">{t("nav.dashboard", locale)}</a>
          <a href="#preise" className="hover:text-black transition">{t("nav.pricing", locale)}</a>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   PAGE
   ══════════════════════════════════════ */
export default function Home() {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  function handleLogin(email: string) {
    setIsLoggedIn(true);
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
