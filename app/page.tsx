"use client";

import React, { FormEvent, useState, useEffect, useCallback } from "react";

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
function IconGlobe(p: { className?: string }) { return <I {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></I>; }
function IconHome(p: { className?: string }) { return <I {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10.5V20h14v-9.5" /></I>; }
function IconLayers(p: { className?: string }) { return <I {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></I>; }
function IconListChecks(p: { className?: string }) { return <I {...p}><path d="M9 6h12" /><path d="M9 12h12" /><path d="M9 18h12" /><path d="m3 6 1.5 1.5L7 5" /><path d="m3 12 1.5 1.5L7 11" /><path d="m3 18 1.5 1.5L7 17" /></I>; }
function IconMenu(p: { className?: string }) { return <I {...p}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></I>; }
function IconRefresh(p: { className?: string }) { return <I {...p}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></I>; }
function IconSearch(p: { className?: string }) { return <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>; }
function IconShield(p: { className?: string }) { return <I {...p}><path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></I>; }
function IconStar(p: { className?: string }) { return <I {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2-4.4-4.3 6.1-.9L12 3Z" fill="currentColor" /></I>; }
function IconTrending(p: { className?: string }) { return <I {...p}><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></I>; }
function IconWand(p: { className?: string }) { return <I {...p}><path d="m3 21 9-9" /><path d="m12 12 9-9" /><path d="M15 3v4" /><path d="M13 5h4" /><path d="M19 9v4" /><path d="M17 11h4" /><path d="M5 15v4" /><path d="M3 17h4" /></I>; }
function IconX(p: { className?: string }) { return <I {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></I>; }
function IconZap(p: { className?: string }) { return <I {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></I>; }
function IconUsers(p: { className?: string }) { return <I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></I>; }
function IconEye(p: { className?: string }) { return <I {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></I>; }
function IconFire(p: { className?: string }) { return <I {...p}><path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.04-2-4-1.786 2-2.792 3-4 1Z" /></I>; }

/* ── Data ── */
const navLinks = [
  { label: "So funktioniert's", href: "#how" },
  { label: "Dashboard", href: "#demo" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Preise", href: "#preise" }
];

const painPoints = [
  "Du hast 3 Monate an einer Idee gebaut — und niemand kauft.",
  "Du scrollst durch Twitter und siehst, wie andere in Wochen launchen.",
  "Du weißt nicht, ob deine Nische genug Nachfrage hat.",
  "Du hast Tools, aber kein System, das dir sagt WAS du bauen sollst."
];

const steps = [
  { n: "01", title: "Nachfrage finden", desc: "Kaching OS zeigt dir Nischen mit bewiesener Nachfrage, bevor du eine Zeile Code schreibst." },
  { n: "02", title: "Validieren", desc: "Nachfrage-Score, Konkurrenz-Level und Trend-Richtung auf einen Blick. Kein Raten." },
  { n: "03", title: "Business bauen", desc: "Nimm deine Nische und baue mit Lovable, Shopify oder No-Code in Tagen ein echtes Business." }
];

const useCases = [
  { tool: "Shopify", title: "D2C-Shop in 48h", desc: "Sarah fand eine Nische für nachhaltige Haustier-Snacks. Monat 1: 4.200 EUR Umsatz.", tag: "E-Commerce" },
  { tool: "Lovable", title: "Micro-SaaS mit KI", desc: "Tim baute einen KI-Termin-Assistenten. 14 zahlende Kunden im ersten Monat.", tag: "SaaS" },
  { tool: "Framer", title: "Agentur-Landingpage", desc: "Julia: Local-SEO für Handwerker. 23 qualifizierte Leads in Woche 1.", tag: "Agentur" },
  { tool: "Gumroad", title: "Digitales Produkt", desc: "Markus: Notion-Templates für Freelancer. 890 EUR passiv in Monat 1.", tag: "Digital" },
  { tool: "WordPress", title: "Nischen-Blog", desc: "Lisa: Balkonkraftwerke-Blog. 1.800 EUR/Monat über Affiliate-Links.", tag: "Content" },
  { tool: "Calendly", title: "Coaching-Business", desc: "Max: Pflege-Recruiting-Beratung. 6 Kunden à 500 EUR in 3 Wochen.", tag: "Service" }
];

const testimonials = [
  { name: "Sarah K.", role: "Shopify-Gründerin", text: "Ich habe vorher 3 Produkte gelauncht, die niemand wollte. Mit Kaching OS habe ich zum ersten Mal VOR dem Bauen geprüft, ob Nachfrage da ist.", avatar: "SK" },
  { name: "Tim R.", role: "Solo-Founder", text: "In 20 Minuten eine validierte Nische. In 3 Tagen ein MVP. In 2 Wochen zahlende Kunden. So sollte Gründen funktionieren.", avatar: "TR" },
  { name: "Julia M.", role: "Marketerin", text: "Kaching OS ist wie ein Cheat-Code. Du siehst sofort, wo die Leute Geld ausgeben wollen.", avatar: "JM" },
  { name: "Markus B.", role: "Creator", text: "Endlich kein Bauchgefühl mehr. Die Daten zeigen klar: hier ist Nachfrage, hier baust du.", avatar: "MB" }
];

const pricingTiers = [
  { name: "Free", price: "0", period: "", desc: "Zum Testen.", cta: "Kostenlos starten", items: ["3 Scans / Monat", "Basis-Scores", "Community"] },
  { name: "Builder", price: "29", period: "/mo", desc: "Für Gründer.", cta: "Builder werden", featured: true, badge: "Beliebt", items: ["Unbegrenzte Scans", "Opportunity-Score + Trends", "Konkurrenz-Analyse", "Export & Reports", "Nischen-Alerts"], seats: "Noch 23 Plätze zum Launch-Preis" },
  { name: "Agency", price: "79", period: "/mo", desc: "Für Teams.", cta: "Team starten", items: ["Alles aus Builder", "5 Team-Seats", "API-Zugang", "White-Label Reports"] }
];

const faqItems: [string, string][] = [
  ["Was genau ist Kaching OS?", "Ein Nischen-Intelligence-Tool. Es zeigt dir, wo echte Nachfrage existiert — damit du Businesses baust, die von Tag 1 Kunden haben."],
  ["Woher kommen die Daten?", "Wir aggregieren Signale aus Suchvolumen, Trend-Daten und Wettbewerbsanalysen. Die Demo arbeitet mit simulierten Daten."],
  ["Brauche ich technische Kenntnisse?", "Nein. Kaching OS sagt dir WAS du bauen sollst. Das WIE machst du mit Shopify, Lovable oder WordPress."],
  ["Gibt es eine Geld-zurück-Garantie?", "14 Tage, keine Fragen. Wenn dir Kaching OS keine profitable Nische zeigt, Geld zurück."]
];

/* ── Niche search ── */
type Niche = { rank: number; title: string; desc: string; score: number; demand: string; demandVal: number; competition: string; compVal: number; tags: string[]; hot?: boolean; viewers?: number };

const baseNiches: Niche[] = [
  { rank: 1, title: "KI-Terminassistent für Kosmetikstudios", desc: "Automatisierte Terminplanung für Beauty-Teams. No-Shows reduzieren, Auslastung maximieren.", score: 92, demand: "Hoch", demandVal: 91, competition: "Niedrig", compVal: 21, tags: ["ki", "beauty", "lokal"], hot: true, viewers: 47 },
  { rank: 2, title: "Buchhaltung für Content Creator", desc: "Steuer-Workflows für Creator mit Sponsoring- und Shop-Einnahmen.", score: 87, demand: "Hoch", demandVal: 86, competition: "Niedrig", compVal: 24, tags: ["creator", "finanzen"], viewers: 23 },
  { rank: 3, title: "Lead-Generierung für Dachdecker", desc: "Qualifizierte Anfragen über regionale Landingpages und Local SEO.", score: 81, demand: "Mittel", demandVal: 79, competition: "Niedrig", compVal: 27, tags: ["handwerk", "leads", "lokal"], viewers: 18 },
  { rank: 4, title: "Recruiting-Funnel für Pflegebetriebe", desc: "Bewerber-Qualifizierung und Rückruf-Automation für Pflegedienste.", score: 90, demand: "Hoch", demandVal: 89, competition: "Mittel", compVal: 31, tags: ["recruiting", "pflege", "hr"], hot: true, viewers: 34 },
  { rank: 5, title: "Shopify-Upsell für Supplements", desc: "Bundles, Abo-Trigger und Post-Purchase-Upsells für Supplement-Brands.", score: 85, demand: "Hoch", demandVal: 84, competition: "Mittel", compVal: 33, tags: ["shopify", "ecommerce", "supplements"], viewers: 29 },
  { rank: 6, title: "Compliance-Tool für Ferienwohnungen", desc: "Checklisten und Meldepflicht-Erinnerungen für Airbnb-Hosts.", score: 83, demand: "Mittel", demandVal: 77, competition: "Niedrig", compVal: 20, tags: ["airbnb", "compliance", "hospitality"], viewers: 12 }
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
    return { rank: i + 1, title: `${fmt(q)} für ${a}`, desc: `Validierte Nische mit ${dv}/100 Nachfrage. Wenig Konkurrenz, ideal für Markteinstieg.`, score: Math.min(96, Math.round(dv * 0.8 + 15)), demand: dv >= 85 ? "Hoch" : "Mittel", demandVal: dv, competition: cv <= 25 ? "Niedrig" : "Mittel", compVal: cv, tags: [q.toLowerCase(), a.toLowerCase()], viewers: 5 + ((s + i) % 40) };
  });
  return { niches: gen, mode: "generated" };
}

/* ══════════════════════════════════════
   LIVE NOTIFICATION TOASTS
   Social proof + FOMO + Urgency
   ══════════════════════════════════════ */
const toastMessages = [
  { text: "Sarah K. hat gerade 'Haustier Snacks' gescannt", time: "vor 12 Sek.", type: "scan" as const },
  { text: "Tim R. hat eine Nische auf die Watchlist gesetzt", time: "vor 34 Sek.", type: "save" as const },
  { text: "Neue Trending-Nische: KI für Handwerker", time: "vor 1 Min.", type: "trend" as const },
  { text: "Julia M. ist gerade Builder geworden", time: "vor 2 Min.", type: "upgrade" as const },
  { text: "47 Gründer scannen gerade live", time: "jetzt", type: "live" as const },
  { text: "Markus B. hat seinen ersten Report exportiert", time: "vor 45 Sek.", type: "scan" as const },
  { text: "Noch 23 Builder-Plätze zum Launch-Preis", time: "limitiert", type: "urgency" as const },
  { text: "3 neue Nischen im Bereich 'Pflege' entdeckt", time: "vor 3 Min.", type: "trend" as const },
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
  const icon = msg.type === "scan" ? "🔍" : msg.type === "save" ? "⭐" : msg.type === "trend" ? "📈" : msg.type === "upgrade" ? "⚡" : msg.type === "live" ? "🟢" : "🔥";

  return (
    <div className={`fixed bottom-5 left-5 z-50 max-w-[320px] rounded-lg border border-gray-200 bg-white p-3 shadow-lg transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-[14px]">{icon}</span>
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

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(l => <a key={l.href} href={l.href} className="text-[13px] text-gray-500 transition hover:text-black">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#preise" className="hidden text-[13px] font-medium text-gray-500 hover:text-black sm:block">Login</a>
          <a href="#preise" className="hidden rounded-md bg-black px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-gray-800 sm:block">Kostenlos starten</a>
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
        <a href="#preise" onClick={onClose} className="mt-3 block rounded-md bg-black py-2.5 text-center text-[14px] font-semibold text-white">Kostenlos starten</a>
      </nav>
    </div>
  );
}

function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {["SK", "TR", "JM", "MB", "LK"].map(i => <div key={i} className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-gray-900 text-[10px] font-bold text-white">{i}</div>)}
      </div>
      <p className="text-[13px] text-gray-500"><span className="font-semibold text-black">2.847+ Gründer</span> nutzen Kaching OS</p>
    </div>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-14 pt-12 sm:pt-16 sm:pb-20">
      <div className="max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-[12px] text-gray-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          47 Gründer scannen gerade live
        </div>
        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-[-0.03em] text-black sm:text-[3.25rem]">
          Bau kein Business,<br />das niemand will.
        </h1>
        <p className="mt-4 max-w-lg text-[16px] leading-[1.65] text-gray-500">
          Kaching OS zeigt dir in Minuten, wo <strong className="text-black">echte Nachfrage</strong> existiert — damit du mit Shopify, Lovable oder No-Code ein profitables Business baust, das von Tag 1 Kunden hat.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#preise" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-black px-5 text-[14px] font-semibold text-white transition hover:bg-gray-800">
            Jetzt kostenlos starten <IconArrowRight className="h-4 w-4" />
          </a>
          <a href="#demo" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 px-5 text-[14px] font-medium text-gray-600 transition hover:bg-gray-50">
            Live Dashboard ansehen
          </a>
        </div>
        <div className="mt-8"><SocialProof /></div>
      </div>
    </section>
  );
}

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
  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
      <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Das Problem</p>
      <h2 className="mt-2 max-w-lg text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">90% aller Startups scheitern.<br />Der #1 Grund? Keine Marktnachfrage.</h2>
      <div className="mt-8 grid gap-2 sm:grid-cols-2">
        {painPoints.map((p, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg border border-gray-200/60 p-4">
            <span className="mt-0.5 text-[14px] text-red-500">✕</span>
            <p className="text-[14px] leading-[1.6] text-gray-600">{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── HOW ── */
function HowSection() {
  return (
    <section id="how" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">So funktioniert's</p>
        <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">3 Schritte zum profitablen Business</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map(s => (
            <div key={s.n}>
              <span className="text-[32px] font-bold tracking-tight text-gray-200">{s.n}</span>
              <h3 className="mt-1 text-[15px] font-semibold">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════ */
// API scan result type
type ScanResult = {
  keyword: string;
  score: { total: number; demand: number; trend: number; competition: number; intent: number; label: string; demandLabel: string; trendLabel: string; competitionLabel: string; summary: string };
  autocomplete: { suggestions: string[]; count: number; commercialIntent: boolean; intentSignals: string[] };
  trend: { direction: string; currentInterest: number; averageInterest: number; growthPercent: number; timeline: { date: string; value: number }[]; relatedQueries: string[] };
  expandedKeywords: string[];
  scannedAt: string;
} | null;

function Dashboard() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState(() => doSearch(""));
  const [scanCount, setScanCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [liveResult, setLiveResult] = useState<ScanResult>(null);
  const [scanError, setScanError] = useState("");

  // Demo fallback search
  function demoSubmit(raw: string) {
    setResult(doSearch(raw));
    setLiveResult(null);
    setScanError("");
  }

  // Real API scan
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
      // Also update demo result for niche cards
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

  // Use live data if available, otherwise demo data
  const niches = result.niches;
  const avgDemand = liveResult ? liveResult.score.demand : Math.round(niches.reduce((t, n) => t + n.demandVal, 0) / niches.length);
  const avgComp = liveResult ? liveResult.score.competition : Math.round(niches.reduce((t, n) => t + n.compVal, 0) / niches.length);
  const avgScore = liveResult ? liveResult.score.total : Math.round(niches.reduce((t, n) => t + n.score, 0) / niches.length);

  return (
    <section id="demo" className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Live Dashboard</p>
            <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">Dein Nischen-Cockpit</h2>
            <p className="mt-1 text-[14px] text-gray-500">Das ist ein Ausschnitt. Im vollen Zugang: echte Daten, Alerts, Export.</p>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-gray-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span>47 Nutzer online</span>
            <span className="mx-1 text-gray-300">·</span>
            <span>12.847 Scans heute</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-[200px_1fr]">
            {/* Sidebar */}
            <aside className="border-b border-gray-200 bg-[#fafafa] p-3 lg:border-b-0 lg:border-r">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
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

              {/* Upgrade nudge — scarcity trigger */}
              <div className="mt-3 rounded-md border border-gray-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold"><IconCrown className="h-3 w-3" />Builder Plan</div>
                <p className="mt-1 text-[11px] leading-[1.4] text-gray-400">Unbegrenzte Scans + Alerts</p>
                <div className="mt-1.5 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">⚡ Noch 23 Plätze zum Launch-Preis</div>
                <button className="mt-2 w-full rounded-md bg-black py-1.5 text-[11px] font-semibold text-white transition hover:bg-gray-800">Upgraden</button>
              </div>
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

              {/* Loading overlay */}
              {loading && (
                <div className="mt-3 flex items-center justify-center rounded-md border border-gray-200 bg-gray-50/50 py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
                    <p className="text-[12px] text-gray-500">Scanne echte Daten...</p>
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
                  {/* Summary */}
                  <div className="rounded-md border border-gray-200 bg-gray-50/50 p-3">
                    <p className="text-[12px] font-semibold text-gray-700">{liveResult.score.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">Intent: {liveResult.score.intent}/100</span>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">Trend: {liveResult.score.trendLabel}</span>
                      {liveResult.autocomplete.commercialIntent && <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">Kaufintent erkannt</span>}
                    </div>
                  </div>

                  {/* Trend + Autocomplete row */}
                  <div className="grid gap-2 sm:grid-cols-2">
                    {/* Trend mini chart */}
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
                        <span>{liveResult.trend.direction === "rising" ? "↑" : liveResult.trend.direction === "falling" ? "↓" : "→"} {liveResult.trend.growthPercent > 0 ? "+" : ""}{liveResult.trend.growthPercent}%</span>
                      </div>
                    </div>

                    {/* Autocomplete suggestions */}
                    <div className="rounded-md border border-gray-200 p-3">
                      <p className="text-[11px] font-medium text-gray-400">Autocomplete ({liveResult.autocomplete.count} Vorschläge)</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {liveResult.autocomplete.suggestions.slice(0, 8).map((s, i) => (
                          <span key={i} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Related queries */}
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

                  {/* Expanded keywords */}
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
                </div>
              )}

              {/* Results header */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-semibold">{liveResult ? `Live-Ergebnisse für "${liveResult.keyword}"` : result.mode === "top" ? "Top Nischen" : result.mode === "filtered" ? `Ergebnisse für "${q}"` : `Generiert für "${q}"`}</h3>
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">{liveResult ? "LIVE" : `${niches.length} Treffer`}</span>
                </div>
                {scanCount > 0 && (
                  <span className="text-[11px] text-gray-400">Du hast {scanCount} Scan{scanCount !== 1 && "s"} gemacht · <span className="font-medium text-black">{Math.max(0, 3 - scanCount)} von 3 Free-Scans übrig</span></span>
                )}
              </div>

              {/* Niche cards */}
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
                    {/* FOMO: viewer count */}
                    {n.viewers && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                        <IconEye className="h-3 w-3" />
                        <span>{n.viewers} schauen sich das gerade an</span>
                      </div>
                    )}
                    {/* Mini bar */}
                    <div className="mt-2 flex h-6 items-end gap-[2px] opacity-30 group-hover:opacity-60 transition-opacity">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <span key={i} className="w-1 rounded-sm bg-gray-900" style={{ height: `${18 + ((i * 13 + n.score) % 38) + (i > 10 ? i * 1.5 : 0)}%` }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scan limit nudge — urgency trigger */}
              {scanCount >= 2 && (
                <div className="mt-3 flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
                  <p className="text-[12px] font-medium text-amber-800">⚡ Du hast noch {Math.max(0, 3 - scanCount)} kostenlose Scans. Upgrade für unbegrenzten Zugang.</p>
                  <a href="#preise" className="shrink-0 rounded-md bg-black px-3 py-1 text-[11px] font-semibold text-white">Upgraden</a>
                </div>
              )}

              {/* Bottom bar — authority trigger */}
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><IconUsers className="h-3 w-3" />2.847 Gründer</span>
                  <span className="flex items-center gap-1"><IconFire className="h-3 w-3" />12.400+ Scans</span>
                </div>
                <span className="text-[11px] text-gray-400">Demo-Modus · <a href="#preise" className="font-medium text-black underline decoration-gray-300 underline-offset-2">Voller Zugang freischalten</a></span>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── USE CASES ── */
function UseCasesSection() {
  return (
    <section id="usecases" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Use Cases</p>
        <h2 className="mt-2 max-w-lg text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">So nutzen Gründer Kaching OS</h2>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map(uc => (
            <div key={uc.title} className="rounded-lg border border-gray-200/60 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">{uc.tag}</span>
                <span className="text-[11px] text-gray-400">via {uc.tool}</span>
              </div>
              <h3 className="mt-2.5 text-[14px] font-semibold">{uc.title}</h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-gray-500">{uc.desc}</p>
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
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Testimonials</p>
        <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">Was Gründer sagen</h2>
        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          {testimonials.map(t => (
            <div key={t.name} className="rounded-lg border border-gray-200/60 p-4">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <IconStar key={i} className="h-3.5 w-3.5 text-amber-400" />)}</div>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-gray-600">"{t.text}"</p>
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
    <section className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { v: "2.847+", l: "Gründer nutzen Kaching OS" },
            { v: "12.400+", l: "Nischen gescannt" },
            { v: "3 Min.", l: "bis zur Shortlist" },
            { v: "68%", l: "launchen in 14 Tagen" }
          ].map(s => (
            <div key={s.l}>
              <p className="text-[28px] font-bold tracking-tight sm:text-[32px]">{s.v}</p>
              <p className="mt-0.5 text-[13px] text-gray-500">{s.l}</p>
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
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-md text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gray-400">Preise</p>
          <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">Starte kostenlos. Upgrade wenn du wächst.</h2>
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
                {/* Scarcity on featured */}
                {t.seats && <p className="mt-2 rounded bg-amber-500/20 px-2 py-1 text-[11px] font-semibold text-amber-200">⚡ {t.seats}</p>}
                <button className={`mt-4 w-full rounded-md py-2.5 text-[13px] font-semibold transition ${f ? "bg-white text-black hover:bg-gray-100" : "border border-gray-200 hover:bg-gray-50"}`}>{t.cta}</button>
                <ul className={`mt-4 space-y-2 text-[13px] ${f ? "text-gray-300" : "text-gray-500"}`}>
                  {t.items.map(item => <li key={item} className="flex items-center gap-2"><IconCheck className={`h-3.5 w-3.5 shrink-0 ${f ? "text-gray-500" : "text-gray-400"}`} />{item}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-[12px] text-gray-400">14 Tage Geld-zurück-Garantie · Jederzeit kündbar · Keine versteckten Kosten</p>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQSection() {
  return (
    <section id="faq" className="border-t border-gray-200/60 bg-gray-50/40">
      <div className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
        <h2 className="text-center text-[1.75rem] font-bold tracking-[-0.02em] sm:text-[2rem]">Häufige Fragen</h2>
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

/* ── CTA ── */
function FinalCTA() {
  return (
    <section className="border-t border-gray-200/60">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="rounded-lg bg-black p-8 sm:p-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[2rem]">Dein nächstes Business startet mit einer Nische.</h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-gray-400">Finde in 3 Minuten heraus, wo echte Nachfrage wartet.</p>
            <a href="#preise" className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-white px-5 text-[14px] font-semibold text-black transition hover:bg-gray-100">Kostenlos starten <IconArrowRight className="h-4 w-4" /></a>
            <div className="mt-5"><SocialProof /></div>
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
   PAGE
   ══════════════════════════════════════ */
export default function Home() {
  const [nav, setNav] = useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header onMenu={() => setNav(true)} />
      {nav && <MobileNav onClose={() => setNav(false)} />}
      <Hero />
      <Ticker />
      <PainSection />
      <HowSection />
      <Dashboard />
      <UseCasesSection />
      <TestimonialsSection />
      <NumbersSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <LiveToast />
    </div>
  );
}
