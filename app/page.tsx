import React from "react";

type IconProps = { className?: string };
type IconComponent = (props: IconProps) => JSX.Element;

function IconBase({ children, className = "h-4 w-4" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function IconArrowRight(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></IconBase>;
}
function IconBarChart3(props: IconProps) {
  return <IconBase {...props}><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-8" /><path d="M22 20v-5" /></IconBase>;
}
function IconBell(props: IconProps) {
  return <IconBase {...props}><path d="M15 17H5l1.4-1.4A2 2 0 0 0 7 14.2V11a5 5 0 1 1 10 0v3.2a2 2 0 0 0 .6 1.4L19 17h-4" /><path d="M10 21a2 2 0 0 0 4 0" /></IconBase>;
}
function IconBookmark(props: IconProps) {
  return <IconBase {...props}><path d="M6 4h12v16l-6-4-6 4V4z" /></IconBase>;
}
function IconBriefcase(props: IconProps) {
  return <IconBase {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M3 12h18" /></IconBase>;
}
function IconChevronDown(props: IconProps) {
  return <IconBase {...props}><path d="m6 9 6 6 6-6" /></IconBase>;
}
function IconCrown(props: IconProps) {
  return <IconBase {...props}><path d="m3 18 2-10 7 5 7-5 2 10H3z" /><path d="M3 18h18" /></IconBase>;
}
function IconDollar(props: IconProps) {
  return <IconBase {...props}><path d="M12 2v20" /><path d="M17 7c0-2-2-3-5-3S7 5 7 7s2 3 5 3 5 1 5 3-2 3-5 3-5-1-5-3" /></IconBase>;
}
function IconGauge(props: IconProps) {
  return <IconBase {...props}><path d="M12 14 16 10" /><path d="M5.2 18a8 8 0 1 1 13.6 0" /><path d="M8 18h8" /></IconBase>;
}
function IconGlobe(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></IconBase>;
}
function IconHome(props: IconProps) {
  return <IconBase {...props}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10.5V20h14v-9.5" /></IconBase>;
}
function IconLayers(props: IconProps) {
  return <IconBase {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></IconBase>;
}
function IconLineChart(props: IconProps) {
  return <IconBase {...props}><path d="M3 17 9 11l4 4 8-8" /><path d="M3 21h18" /></IconBase>;
}
function IconListChecks(props: IconProps) {
  return <IconBase {...props}><path d="M9 6h12" /><path d="M9 12h12" /><path d="M9 18h12" /><path d="m3 6 1.5 1.5L7 5" /><path d="m3 12 1.5 1.5L7 11" /><path d="m3 18 1.5 1.5L7 17" /></IconBase>;
}
function IconMenu(props: IconProps) {
  return <IconBase {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></IconBase>;
}
function IconPlay(props: IconProps) {
  return <IconBase {...props}><path d="m8 6 10 6-10 6V6z" /></IconBase>;
}
function IconRefresh(props: IconProps) {
  return <IconBase {...props}><path d="M20 11a8 8 0 1 0 2 5.3" /><path d="M20 4v7h-7" /></IconBase>;
}
function IconSearch(props: IconProps) {
  return <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></IconBase>;
}
function IconShieldCheck(props: IconProps) {
  return <IconBase {...props}><path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></IconBase>;
}
function IconSparkles(props: IconProps) {
  return <IconBase {...props}><path d="M12 3 13.5 8.5 19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="M5 3v3" /><path d="M3.5 4.5h3" /><path d="M19 17v4" /><path d="M17 19h4" /></IconBase>;
}
function IconStar(props: IconProps) {
  return <IconBase {...props}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2-4.4-4.3 6.1-.9L12 3Z" /></IconBase>;
}
function IconTrendingUp(props: IconProps) {
  return <IconBase {...props}><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></IconBase>;
}
function IconWand(props: IconProps) {
  return <IconBase {...props}><path d="m3 21 9-9" /><path d="m12 12 9-9" /><path d="M15 3v4" /><path d="M13 5h4" /><path d="M19 9v4" /><path d="M17 11h4" /><path d="M5 15v4" /><path d="M3 17h4" /></IconBase>;
}
function IconZap(props: IconProps) {
  return <IconBase {...props}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></IconBase>;
}

const navItems = ["Produkt", "Features", "Use Cases", "Preise", "FAQ"];
const heroPills = [
  { label: "Hohe Nachfrage", Icon: IconTrendingUp, className: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Wenig Konkurrenz", Icon: IconShieldCheck, className: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { label: "Trend steigend", Icon: IconLineChart, className: "bg-violet-50 text-violet-700 border-violet-100" },
  { label: "Online Geld verdienen", Icon: IconDollar, className: "bg-amber-50 text-amber-700 border-amber-100" },
  { label: "Sofort validieren", Icon: IconZap, className: "bg-rose-50 text-rose-700 border-rose-100" }
];
const sidebarItems = [
  { label: "Übersicht", Icon: IconHome, active: true },
  { label: "Nischen finden", Icon: IconSearch },
  { label: "Ideen-Generator", Icon: IconWand },
  { label: "Beobachtungsliste", Icon: IconStar },
  { label: "Validierungen", Icon: IconListChecks },
  { label: "Trends", Icon: IconBarChart3 },
  { label: "Keyword-Explorer", Icon: IconGauge },
  { label: "Reports", Icon: IconLayers }
];
const filters = [
  { title: "Region", value: "Deutschland", Icon: IconGlobe },
  { title: "Modell", value: "Alle", Icon: IconBriefcase },
  { title: "Nachfrage", value: "Hoch", Icon: IconTrendingUp },
  { title: "Konkurrenz", value: "Niedrig", Icon: IconShieldCheck },
  { title: "Dringlichkeit", value: "Hoch", Icon: IconZap }
];
const nicheStyles = {
  blue: { badge: "bg-blue-600", ring: "border-blue-400", bar: "bg-blue-500", demand: "bg-blue-50 text-blue-700" },
  emerald: { badge: "bg-emerald-600", ring: "border-emerald-400", bar: "bg-emerald-500", demand: "bg-blue-50 text-blue-700" },
  amber: { badge: "bg-amber-500", ring: "border-amber-400", bar: "bg-amber-500", demand: "bg-amber-50 text-amber-700" }
};
const niches = [
  { rank: "#1", title: "KI-Terminassistenz für Kosmetikstudios", desc: "Automatisierte Terminplanung & Erinnerung speziell für Beauty & Kosmetik.", score: 92, accent: "blue", demand: "Nachfrage: Hoch", competition: "Konkurrenz: Niedrig" },
  { rank: "#2", title: "Buchhaltungsservice für Creator", desc: "Finanzverwaltung & Steuer-Optimierung für Content Creator & Influencer.", score: 87, accent: "emerald", demand: "Nachfrage: Hoch", competition: "Konkurrenz: Niedrig" },
  { rank: "#3", title: "Leadgenerierung für Dachdecker", desc: "Qualifizierte Anfragen & Kundenakquise für Dachdeckerbetriebe.", score: 81, accent: "amber", demand: "Nachfrage: Mittel", competition: "Konkurrenz: Niedrig" }
] as const;
const keywords = ["KI Automatisierung", "Terminbuchung", "Online Kurs", "Nachhaltigkeit", "Coaching Online", "Local SEO", "Subscription Box", "Chatbot", "Finanzen für Creator", "Digitale Produkte"];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 shadow-lg shadow-indigo-200">
        <IconSparkles className="h-5 w-5 text-white" />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-300 ring-4 ring-white" />
      </div>
      {!compact && <span className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">StarvingCrowd</span>}
    </div>
  );
}
function Pill({ children, className = "", Icon }: { children: React.ReactNode; className?: string; Icon?: IconComponent }) {
  return <span className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold shadow-sm ${className}`}>{Icon ? <Icon className="h-4 w-4" /> : null}{children}</span>;
}
function MiniBars({ color = "bg-blue-500", bars = [25, 30, 28, 42, 34, 58, 47, 65, 75, 92] }: { color?: string; bars?: number[] }) {
  return <div className="flex h-12 items-end gap-1.5">{bars.map((height, index) => <div key={`${height}-${index}`} className={`w-2 rounded-t-full ${color}`} style={{ height: `${height}%`, opacity: 0.25 + index * 0.06 }} />)}</div>;
}
function SparkLine({ className = "text-blue-600" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 60" className={`h-14 w-36 ${className}`} fill="none" aria-hidden="true">
      <path d="M5 45 C18 22, 30 40, 42 29 S62 16, 76 30 S103 49, 116 24 S138 12, 154 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M5 45 C18 22, 30 40, 42 29 S62 16, 76 30 S103 49, 116 24 S138 12, 154 8" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity="0.08" />
    </svg>
  );
}
function FloatingCard({ className, Icon, title, value, children }: { className: string; Icon: IconComponent; title: string; value: string; children?: React.ReactNode }) {
  return (
    <div className={`absolute rounded-3xl border border-white/70 bg-white/80 p-4 shadow-2xl shadow-slate-200/80 backdrop-blur-xl ${className}`}>
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-2xl bg-white shadow-sm"><Icon className="h-4 w-4 text-indigo-600" /></span>
        <div><p className="text-xs font-semibold text-slate-500">{title}</p><p className="text-sm font-bold text-slate-900">{value}</p></div>
      </div>
      {children}
    </div>
  );
}
function MetricCard({ dot, title, value, label, labelClass, change, changeClass, children }: { dot: string; title: string; value: string; label: string; labelClass: string; change: string; changeClass: string; children: React.ReactNode }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-sm font-bold text-slate-800"><span className={`h-3 w-3 rounded-full ${dot}`} />{title}</div><div className="mt-3 flex items-end justify-between gap-4"><div><span className="text-5xl font-semibold tracking-tight text-slate-950">{value}</span><span className={`ml-2 rounded-full px-2.5 py-1 text-xs font-bold ${labelClass}`}>{label}</span><p className={`mt-3 text-xs font-semibold ${changeClass}`}>{change}</p></div>{children}</div></div>;
}
function KeywordPill({ label, index }: { label: string; index: number }) {
  const classes = ["bg-indigo-50 text-indigo-700", "bg-violet-50 text-violet-700", "bg-blue-50 text-blue-700", "bg-emerald-50 text-emerald-700", "bg-rose-50 text-rose-700"];
  return <span className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold ${classes[index % classes.length]}`}>{label}</span>;
}
function ResultCard({ niche }: { niche: (typeof niches)[number] }) {
  const style = nicheStyles[niche.accent];
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3"><span className={`rounded-xl px-3 py-1 text-sm font-bold text-white ${style.badge}`}>{niche.rank}</span><IconBookmark className="h-5 w-5 text-slate-400" /></div>
      <div className="mt-4 flex gap-4"><div className="flex-1"><h4 className="min-h-[48px] text-base font-bold leading-tight text-slate-950">{niche.title}</h4><p className="mt-3 min-h-[44px] text-sm leading-relaxed text-slate-600">{niche.desc}</p></div><div className={`grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 text-lg font-bold text-slate-900 ${style.ring}`}>{niche.score}</div></div>
      <div className="mt-4 flex flex-wrap gap-2"><span className={`rounded-xl px-3 py-1 text-xs font-bold ${style.demand}`}>{niche.demand}</span><span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{niche.competition}</span></div>
      <div className="mt-4 flex h-12 items-end gap-1">{Array.from({ length: 30 }).map((_, index) => <span key={index} className={`w-1.5 rounded-full ${style.bar}`} style={{ height: `${15 + ((index * 17) % 42) + (index > 22 ? index : 0)}%`, opacity: 0.38 + index / 55 }} />)}</div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div id="produkt" className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-soft">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
      <div className="grid min-h-[610px] grid-cols-1 lg:grid-cols-[250px_1fr]">
        <aside className="relative border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-5 lg:border-b-0 lg:border-r">
          <div className="mb-7 flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-400" /><span className="h-3 w-3 rounded-full bg-emerald-500" /></div>
          <Logo compact />
          <p className="mt-3 text-lg font-semibold text-slate-950">StarvingCrowd</p>
          <nav className="mt-7 space-y-1.5">{sidebarItems.map((item) => <div key={item.label} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${item.active ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}><item.Icon className="h-4 w-4" />{item.label}</div>)}</nav>
          <div className="mt-7 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4"><div className="flex items-center gap-2 text-indigo-700"><IconCrown className="h-4 w-4" /><p className="font-bold">Pro Plan</p></div><p className="mt-2 text-xs leading-relaxed text-slate-600">Unbegrenzte Analysen. Erweiterte Daten & Export.</p><button className="mt-3 w-full rounded-2xl bg-white px-3 py-2 text-sm font-bold text-indigo-700 shadow-sm">Upgrade</button></div>
          <div className="mt-7 flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm lg:absolute lg:bottom-5 lg:left-5 lg:w-[210px]"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-600 text-sm font-bold text-white">M</div><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-900">Max Mustermann</p><p className="truncate text-xs text-slate-500">max@beispiel.de</p></div><IconChevronDown className="ml-auto h-4 w-4 text-slate-400" /></div>
        </aside>
        <main className="bg-white p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center"><div className="relative flex-1"><IconSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium outline-none shadow-sm placeholder:text-slate-400" placeholder="z. B. KI Automationen für Handwerker" /></div><div className="flex gap-3"><button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm"><IconPlay className="h-4 w-4 text-indigo-600" />Tutorial ansehen</button><button className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm"><IconBell className="h-5 w-5 text-slate-500" /></button></div></div>
          <div className="mt-4 flex flex-wrap items-center gap-3">{filters.map((filter) => <button key={filter.title} className="flex min-w-[145px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><div className="flex items-center gap-3 text-left"><span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-50"><filter.Icon className="h-4 w-4 text-slate-700" /></span><span><span className="block text-xs font-semibold text-slate-500">{filter.title}</span><span className="block text-sm font-bold text-slate-900">{filter.value}</span></span></div><IconChevronDown className="h-4 w-4 text-slate-400" /></button>)}<button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm lg:ml-auto"><IconRefresh className="h-4 w-4" />Filter zurücksetzen</button></div>
          <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_1.25fr]"><MetricCard dot="bg-blue-500" title="Nachfrage" value="92" label="Sehr hoch" labelClass="bg-emerald-50 text-emerald-700" change="↑ 24% vs. letzter Monat" changeClass="text-emerald-600"><SparkLine /></MetricCard><MetricCard dot="bg-emerald-500" title="Konkurrenz" value="24" label="Niedrig" labelClass="bg-emerald-50 text-emerald-700" change="↓ 18% vs. letzter Monat" changeClass="text-rose-500"><MiniBars color="bg-emerald-500" /></MetricCard><MetricCard dot="bg-violet-500" title="Opportunity Score" value="88" label="Ausgezeichnet" labelClass="bg-emerald-50 text-emerald-700" change="Top 12% aller Nischen" changeClass="text-slate-500"><SparkLine className="text-violet-600" /></MetricCard><div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-3 text-center text-sm font-bold text-slate-900">Nachfrage vs. Konkurrenz</div><div className="relative h-32 rounded-2xl border border-slate-100 bg-gradient-to-br from-indigo-50/70 to-white"><span className="absolute left-5 top-5 rounded-xl bg-indigo-100 px-3 py-2 text-xs font-bold text-indigo-700">Idealer Bereich ✦</span><span className="absolute left-[18%] top-[72%] h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="absolute left-[45%] top-[47%] h-2.5 w-2.5 rounded-full bg-blue-500" /><span className="absolute left-[73%] top-[34%] h-2.5 w-2.5 rounded-full bg-blue-600" /><span className="absolute left-[82%] top-[72%] h-2.5 w-2.5 rounded-full bg-rose-500" /><span className="absolute left-[56%] top-[80%] h-2.5 w-2.5 rounded-full bg-amber-500" /><span className="absolute bottom-2 left-6 text-[10px] font-bold text-slate-500">Niedrig</span><span className="absolute bottom-2 right-6 text-[10px] font-bold text-slate-500">Hoch</span></div></div></div>
          <div className="mt-6 flex items-center justify-between"><h3 className="text-xl font-bold tracking-tight text-slate-950">Top Nischen für dich</h3><button className="text-sm font-bold text-indigo-600">Alle anzeigen →</button></div>
          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">{niches.map((niche) => <ResultCard key={niche.title} niche={niche} />)}</div>
          <div className="mt-5 flex items-center gap-3 overflow-hidden"><h3 className="mr-1 shrink-0 text-lg font-bold text-slate-950">Trending Keywords</h3>{keywords.map((keyword, index) => <KeywordPill key={keyword} label={keyword} index={index} />)}<IconArrowRight className="h-5 w-5 shrink-0 text-slate-400" /></div>
        </main>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">{eyebrow}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-6xl">{title}</h2><p className="mt-5 text-lg leading-8 text-slate-600">{text}</p></div>;
}

function FeatureGrid() {
  const features = [
    { Icon: IconTrendingUp, title: "Nachfrage erkennen", text: "Erkenne Themen, Keywords und Märkte, bei denen Menschen aktiv nach Lösungen suchen." },
    { Icon: IconShieldCheck, title: "Konkurrenz prüfen", text: "Bewerte Anbieterqualität, Spezialisierung und Marktdichte in einem einfachen Score." },
    { Icon: IconZap, title: "Schnell validieren", text: "Von der Idee zur ersten Einschätzung in Minuten — ideal für Produkte, Services und digitale Offers." },
    { Icon: IconListChecks, title: "Klare Checklisten", text: "Nutze eine strukturierte Opportunity-Logik statt Bauchgefühl und verstreuter Recherche." },
    { Icon: IconBarChart3, title: "Trend-Signale", text: "Priorisiere Nischen mit steigendem Interesse, hoher Dringlichkeit und Zahlungsbereitschaft." },
    { Icon: IconLayers, title: "Nischen-Reports", text: "Speichere Chancen, vergleiche Ideen und erstelle kompakte Reports für deine nächsten Tests." }
  ];
  return <div id="features" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <div key={feature.title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><feature.Icon className="h-5 w-5" /></div><h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950">{feature.title}</h3><p className="mt-3 leading-7 text-slate-600">{feature.text}</p></div>)}</div>;
}
function UseCases() {
  const cases = ["D2C-Produkte", "SaaS-Ideen", "Agenturangebote", "Creator-Business", "Lokale Dienstleistungen", "Digitale Produkte"];
  return <div id="use-cases" className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-soft md:p-10"><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-600">Use Cases</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">Für jeden, der online bessere Chancen finden will.</h2><p className="mt-5 text-lg leading-8 text-slate-600">StarvingCrowd hilft dir, aus vagen Ideen echte Marktchancen zu machen — mit einem klaren Blick auf Nachfrage, Wettbewerb und Monetarisierung.</p></div><div className="grid gap-3 sm:grid-cols-2">{cases.map((item, index) => <div key={item} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-indigo-600 shadow-sm">{index + 1}</span><span className="font-bold text-slate-800">{item}</span></div>)}</div></div></div>;
}
function Pricing() {
  return <div id="preise" className="grid gap-6 lg:grid-cols-3"><div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><p className="font-bold text-slate-500">Starter</p><h3 className="mt-3 text-4xl font-semibold tracking-tight">€0</h3><p className="mt-3 text-slate-600">Für erste Tests und Ideen.</p><button className="mt-7 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold">Kostenlos starten</button><ul className="mt-7 space-y-3 text-sm font-medium text-slate-600"><li>✓ 5 Nischenanalysen</li><li>✓ Demo-Dashboard</li><li>✓ Basis-Scores</li></ul></div><div className="relative rounded-[2rem] border border-indigo-200 bg-gradient-to-b from-indigo-600 to-violet-600 p-8 text-white shadow-glow"><span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Beliebt</span><p className="font-bold text-indigo-100">Pro</p><h3 className="mt-3 text-4xl font-semibold tracking-tight">€29</h3><p className="mt-3 text-indigo-100">Für Creator, Founder und Marketer.</p><button className="mt-7 w-full rounded-2xl bg-white px-5 py-3 font-bold text-indigo-700">Pro testen</button><ul className="mt-7 space-y-3 text-sm font-medium text-indigo-50"><li>✓ Unbegrenzte Analysen</li><li>✓ Opportunity Scores</li><li>✓ Keyword- und Trend-Signale</li><li>✓ Reports & Export</li></ul></div><div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"><p className="font-bold text-slate-500">Team</p><h3 className="mt-3 text-4xl font-semibold tracking-tight">Custom</h3><p className="mt-3 text-slate-600">Für Agenturen und Research-Teams.</p><button className="mt-7 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold">Kontakt aufnehmen</button><ul className="mt-7 space-y-3 text-sm font-medium text-slate-600"><li>✓ Team-Workspaces</li><li>✓ Priorisierte Reports</li><li>✓ API-Optionen</li></ul></div></div>;
}
function FAQ() {
  const items = [
    ["Ist StarvingCrowd schon mit echten Daten verbunden?", "Diese Version ist eine deploybare Marketing-Website mit Demo-Dashboard. Für echte Daten kannst du später APIs wie Trends-, SERP- oder Keyword-Datenquellen anschließen."],
    ["Kann ich das direkt auf Vercel deployen?", "Ja. Das Projekt ist ein Next.js-Projekt mit Tailwind CSS und kann direkt in Vercel importiert werden."],
    ["Brauche ich externe Icon-Pakete?", "Nein. Alle Icons sind als inline SVG-Komponenten enthalten, damit keine CDN-Icon-Fehler entstehen."],
    ["Kann daraus eine echte SaaS-App werden?", "Ja. Die Struktur ist so angelegt, dass du später Auth, Datenbank, API-Routes, Payments und echte Analysen ergänzen kannst."]
  ];
  return <div id="faq" className="mx-auto max-w-4xl space-y-4">{items.map(([q, a]) => <details key={q} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><summary className="cursor-pointer list-none text-lg font-bold text-slate-950">{q}</summary><p className="mt-4 leading-7 text-slate-600">{a}</p></details>)}</div>;
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfcff] text-slate-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute -top-44 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-100 via-violet-100 to-pink-100 blur-3xl" /><div className="absolute right-[-180px] top-48 h-[420px] w-[420px] rounded-full bg-cyan-100 blur-3xl" /><div className="noise absolute inset-0 opacity-40" /></div>
      <header className="relative z-10 mx-auto flex max-w-[1480px] items-center justify-between px-5 py-5 sm:px-8"><Logo /><nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">{navItems.map((item) => <a key={item} href={`#${item === "Produkt" ? "produkt" : item === "Features" ? "features" : item === "Use Cases" ? "use-cases" : item === "Preise" ? "preise" : "faq"}`} className="inline-flex items-center gap-1.5 transition hover:text-slate-950">{item}{(item === "Produkt" || item === "FAQ") && <IconChevronDown className="h-4 w-4" />}</a>)}</nav><div className="flex items-center gap-3"><a href="#preise" className="hidden text-sm font-semibold text-slate-700 sm:block">Anmelden</a><a href="#produkt" className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 sm:px-6">Kostenlos testen <IconArrowRight className="ml-1 inline h-4 w-4" /></a><button aria-label="Menü öffnen" className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white lg:hidden"><IconMenu className="h-5 w-5" /></button></div></header>
      <section className="relative z-10 mx-auto grid max-w-[1480px] items-center gap-12 px-5 pb-12 pt-12 sm:px-8 lg:grid-cols-[1fr_0.95fr]"><div><Pill Icon={IconSparkles} className="border-indigo-100 bg-indigo-50 text-indigo-700">KI-gestützte Nischenanalyse in wenigen Minuten</Pill><h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.7rem]">Finde profitable Nischen <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">in Minuten.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">Entdecke hochprofitable Chancen mit hoher Nachfrage und geringer Konkurrenz — für Produkte, Services und digitale Angebote. Schnell. Datenbasiert. Profitabel.</p><div className="mt-6 flex max-w-3xl flex-wrap gap-3">{heroPills.map((pill) => <Pill key={pill.label} Icon={pill.Icon} className={pill.className}>{pill.label}</Pill>)}</div><div className="mt-8 flex flex-wrap gap-4"><a href="#produkt" className="rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-indigo-200 transition hover:-translate-y-1 hover:bg-indigo-500">Nischen finden <IconArrowRight className="ml-2 inline h-5 w-5" /></a><a href="#features" className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1"><IconPlay className="mr-2 inline h-5 w-5 text-indigo-600" />Demo ansehen</a></div><div className="mt-9 grid max-w-xl grid-cols-3 gap-4 text-sm"><div><strong className="block text-2xl text-slate-950">3 Min.</strong><span className="text-slate-500">bis zur Shortlist</span></div><div><strong className="block text-2xl text-slate-950">88/100</strong><span className="text-slate-500">Opportunity Score</span></div><div><strong className="block text-2xl text-slate-950">10k+</strong><span className="text-slate-500">Nischen-Signale</span></div></div></div><div className="relative hidden h-[500px] lg:block"><div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-100" /><div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-100" /><div className="absolute left-1/2 top-1/2 grid h-64 w-72 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2.4rem] border border-white bg-white/70 shadow-2xl shadow-indigo-200/80 backdrop-blur-xl"><div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-400 to-pink-300 shadow-2xl shadow-violet-200"><div className="grid h-20 w-20 place-items-center rounded-full border-8 border-white/80"><IconSparkles className="h-9 w-9 text-white" /></div></div></div><FloatingCard className="left-12 top-16 w-36" Icon={IconTrendingUp} title="Nachfrage" value="Hoch"><SparkLine className="mt-2 text-emerald-600" /></FloatingCard><FloatingCard className="right-5 top-20 w-36" Icon={IconShieldCheck} title="Konkurrenz" value="Niedrig"><MiniBars color="bg-blue-500" bars={[20, 48, 75, 35, 26, 48, 58]} /></FloatingCard><FloatingCard className="bottom-20 left-0 w-36" Icon={IconLineChart} title="Trend" value="Steigend"><SparkLine className="mt-2 text-amber-500" /></FloatingCard><FloatingCard className="bottom-12 right-16 w-40" Icon={IconDollar} title="Profit-Potenzial" value="Hoch"><div className="mt-4 flex gap-5"><span className="h-3 w-3 rounded-full bg-rose-500" /><span className="h-3 w-3 rounded-full bg-rose-500" /><span className="h-3 w-3 rounded-full bg-rose-500" /></div></FloatingCard></div></section>
      <section className="relative z-10 mx-auto max-w-[1480px] px-5 py-10 sm:px-8"><DashboardPreview /></section>
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 py-20 sm:px-8"><SectionHeading eyebrow="Features" title="Research, der nicht nach Spreadsheet aussieht." text="Alles, was du brauchst, um Nischen schneller zu bewerten: Nachfrage, Konkurrenz, Trend-Signale und klare Priorisierung." /><div className="mt-12"><FeatureGrid /></div></section>
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 py-12 sm:px-8"><UseCases /></section>
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 py-20 sm:px-8"><SectionHeading eyebrow="Preise" title="Starte klein. Skaliere, wenn du Chancen findest." text="Die Pricing-Sektion ist bereits vorbereitet und kann später mit Stripe verbunden werden." /><div className="mt-12"><Pricing /></div></section>
      <section className="relative z-10 mx-auto max-w-[1280px] px-5 py-20 sm:px-8"><SectionHeading eyebrow="FAQ" title="Bereit für deinen ersten Nischen-Scan?" text="Diese Version ist bewusst als starke Marketing- und Demo-Website gebaut. Der nächste Schritt ist echte Datenintegration." /><div className="mt-12"><FAQ /></div></section>
      <footer className="relative z-10 border-t border-slate-200 bg-white/70 px-5 py-10 backdrop-blur sm:px-8"><div className="mx-auto flex max-w-[1480px] flex-col gap-6 md:flex-row md:items-center md:justify-between"><Logo /><p className="text-sm text-slate-500">© 2026 StarvingCrowd. Profitable Nischen schneller finden.</p><div className="flex gap-5 text-sm font-semibold text-slate-600"><a href="#features">Features</a><a href="#preise">Preise</a><a href="#faq">FAQ</a></div></div></footer>
    </main>
  );
}
