export type Locale = "de" | "en";

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "de";
  const lang = navigator.language || "";
  if (lang.startsWith("en")) return "en";
  return "de";
}

const translations = {
  // Nav
  "nav.how": { de: "So funktioniert's", en: "How it works" },
  "nav.dashboard": { de: "Dashboard", en: "Dashboard" },
  "nav.results": { de: "Ergebnisse", en: "Results" },
  "nav.pricing": { de: "Preise", en: "Pricing" },
  "nav.login": { de: "Login", en: "Login" },
  "nav.logout": { de: "Logout", en: "Logout" },
  "nav.cta": { de: "Kostenlos testen", en: "Try free" },

  // Hero
  "hero.badge": { de: "47 Grunder scannen gerade live", en: "47 founders scanning live right now" },
  "hero.h1a": { de: "Finde heraus, ob deine", en: "Find out if your" },
  "hero.h1b": { de: "Nische Geld bringt.", en: "niche makes money." },
  "hero.desc": { de: "Kostenloser Nischen-Audit: Kaching OS scannt echte Google-Daten und zeigt dir in 30 Sekunden Nachfrage, Konkurrenz und Kaufintent — bevor du Zeit und Geld in die falsche Idee steckst.", en: "Free Niche Audit: Kaching OS scans real Google data and shows you demand, competition, and buying intent in 30 seconds — before you waste time and money on the wrong idea." },
  "hero.cta": { de: "Kostenlosen Audit starten", en: "Start free audit" },
  "hero.subcta": { de: "30 Sek. Kein Abo. Keine Kreditkarte.", en: "30 sec. No subscription. No credit card." },
  "hero.social": { de: "nutzen Kaching OS", en: "use Kaching OS" },
  "hero.founders": { de: "2.847+ Grunder", en: "2,847+ founders" },

  // Pain
  "pain.label": { de: "Das Problem", en: "The Problem" },
  "pain.h2a": { de: "90% aller Startups scheitern.", en: "90% of startups fail." },
  "pain.h2b": { de: "Grund #1: Keine Nachfrage.", en: "Reason #1: No demand." },
  "pain.desc": { de: "Du baust 3 Monate an einer Idee — und niemand kauft. Das passiert, wenn du ratst statt zu messen.", en: "You build for 3 months — and nobody buys. That happens when you guess instead of measuring." },
  "pain.1": { de: "Du hast 3 Monate gebaut — und niemand kauft.", en: "You built for 3 months — and nobody buys." },
  "pain.2": { de: "Du weisst nicht, ob deine Nische genug Nachfrage hat.", en: "You don't know if your niche has enough demand." },
  "pain.3": { de: "Du siehst andere in Wochen launchen und verdienen.", en: "You see others launch and earn in weeks." },
  "pain.4": { de: "Du hast Tools, aber kein System das dir sagt WAS.", en: "You have tools, but no system telling you WHAT to build." },

  // Cost
  "cost.label": { de: "Was dich Raten kostet", en: "The cost of guessing" },
  "cost.h2": { de: "Jeder Monat ohne validierte Nische kostet dich:", en: "Every month without a validated niche costs you:" },
  "cost.time": { de: "Bauzeit fur ein Produkt das niemand will", en: "Build time for a product nobody wants" },
  "cost.money": { de: "fur Ads, Tools und Domains ohne Return", en: "on ads, tools and domains with no return" },
  "cost.motivation": { de: "Motivation verloren, Projekt aufgegeben", en: "Motivation lost, project abandoned" },
  "cost.bottom": { de: "Ein Nischen-Audit dauert 30 Sekunden. Das falsche Produkt zu bauen dauert Monate.", en: "A niche audit takes 30 seconds. Building the wrong product takes months." },
  "cost.cta": { de: "Jetzt kostenlos pruefen", en: "Check for free now" },

  // How
  "how.label": { de: "Die Losung", en: "The Solution" },
  "how.h2": { de: "Von Idee zu validierter Nische in 30 Sekunden", en: "From idea to validated niche in 30 seconds" },
  "how.step1.title": { de: "Keyword eingeben", en: "Enter keyword" },
  "how.step1.desc": { de: "Tippe eine Idee ein. Kaching OS scannt Google Autocomplete und Trends in Echtzeit.", en: "Type an idea. Kaching OS scans Google Autocomplete and Trends in real-time." },
  "how.step2.title": { de: "Score erhalten", en: "Get your score" },
  "how.step2.desc": { de: "Nachfrage, Konkurrenz, Trend-Richtung und Kaufintent — alles auf einen Blick als Opportunity-Score.", en: "Demand, competition, trend direction and buying intent — all in one Opportunity Score." },
  "how.step3.title": { de: "Business bauen", en: "Build your business" },
  "how.step3.desc": { de: "Nimm deine validierte Nische und baue mit Shopify, Lovable oder No-Code in Tagen dein Business.", en: "Take your validated niche and build with Shopify, Lovable, or no-code in days." },

  // Dashboard
  "dash.label": { de: "Kostenloser Nischen-Audit", en: "Free Niche Audit" },
  "dash.h2": { de: "Teste deine Idee in 30 Sekunden", en: "Test your idea in 30 seconds" },
  "dash.loggedin": { de: "Gib ein Keyword ein und erhalte echte Nachfrage-Daten von Google.", en: "Enter a keyword and get real demand data from Google." },
  "dash.loggedout": { de: "E-Mail eingeben, sofort scannen. Keine Kreditkarte.", en: "Enter your email, scan instantly. No credit card." },
  "dash.live": { de: "Live — Echte Google-Daten", en: "Live — Real Google data" },

  // Login gate
  "login.h3": { de: "Kostenloser Nischen-Audit", en: "Free Niche Audit" },
  "login.desc": { de: "Gib deine E-Mail ein und scanne deine erste Nische — in 30 Sekunden.", en: "Enter your email and scan your first niche — in 30 seconds." },
  "login.cta": { de: "Audit starten — kostenlos", en: "Start audit — free" },
  "login.legal": { de: "3 Scans gratis. Kein Spam. Jederzeit abmelden.", en: "3 free scans. No spam. Unsubscribe anytime." },
  "login.switch.login": { de: "Bereits registriert? Login", en: "Already registered? Login" },
  "login.switch.email": { de: "Noch kein Account? E-Mail reicht", en: "No account? Email is enough" },
  "login.error.email": { de: "Bitte gib eine gueltige E-Mail ein.", en: "Please enter a valid email." },
  "login.error.creds": { de: "Falsche Zugangsdaten. Teste: test@kaching.os / kaching2024", en: "Wrong credentials. Try: test@kaching.os / kaching2024" },

  // Use cases
  "uc.label": { de: "Ergebnisse", en: "Results" },
  "uc.h2": { de: "Von der Nische zum Business", en: "From niche to business" },
  "uc.desc": { de: "Grunder nutzen Kaching OS, um validierte Nischen zu finden — und bauen damit echte Businesses.", en: "Founders use Kaching OS to find validated niches — and build real businesses with them." },

  // Testimonials
  "test.label": { de: "Testimonials", en: "Testimonials" },
  "test.h2": { de: "Was Grunder sagen", en: "What founders say" },

  // Numbers
  "num.founders": { de: "Grunder", en: "Founders" },
  "num.scanned": { de: "Nischen gescannt", en: "Niches scanned" },
  "num.time": { de: "bis zum Score", en: "to get your score" },
  "num.launch": { de: "launchen in 14 Tagen", en: "launch within 14 days" },

  // Pricing
  "price.label": { de: "Preise", en: "Pricing" },
  "price.h2": { de: "Starte kostenlos. Upgrade wenn du wachst.", en: "Start free. Upgrade as you grow." },
  "price.guarantee": { de: "14 Tage Geld-zuruck-Garantie · Jederzeit kundbar · Keine versteckten Kosten", en: "14-day money-back guarantee · Cancel anytime · No hidden costs" },

  // FAQ
  "faq.h2": { de: "Haufige Fragen", en: "FAQ" },

  // Final CTA
  "cta.h2": { de: "Dein nachstes Business startet mit einer Nische.", en: "Your next business starts with a niche." },
  "cta.desc": { de: "Finde in 30 Sekunden heraus, wo echte Nachfrage wartet.", en: "Find out in 30 seconds where real demand is waiting." },
  "cta.button": { de: "Jetzt Nische scannen", en: "Scan a niche now" },
  "cta.legal": { de: "Kostenlos. Keine Kreditkarte nötig.", en: "Free. No credit card needed." },

  // Dashboard UI
  "ui.scan": { de: "Scannen", en: "Scan" },
  "ui.scanning": { de: "Scanne...", en: "Scanning..." },
  "ui.scanning.desc": { de: "Scanne echte Google-Daten...", en: "Scanning real Google data..." },
  "ui.demand": { de: "Nachfrage", en: "Demand" },
  "ui.competition": { de: "Konkurrenz", en: "Competition" },
  "ui.opportunity": { de: "Opportunity", en: "Opportunity" },
  "ui.upgraden": { de: "Upgraden", en: "Upgrade" },
  "ui.ausloggen": { de: "Ausloggen", en: "Logout" },
  "ui.placeholder": { de: "Nische scannen: z.B. KI Coaching, Hundefutter...", en: "Scan a niche: e.g. AI Coaching, Pet Food..." },
  "ui.trend": { de: "Trend", en: "Trend" },
  "ui.intent": { de: "Kaufintent", en: "Buying Intent" },
  "ui.rising": { de: "Steigend", en: "Rising" },
  "ui.falling": { de: "Fallend", en: "Falling" },
  "ui.stable": { de: "Stabil", en: "Stable" },
  "ui.high": { de: "Hoch", en: "High" },
  "ui.medium": { de: "Mittel", en: "Medium" },
  "ui.low": { de: "Niedrig", en: "Low" },
  "ui.excellent": { de: "Ausgezeichnet", en: "Excellent" },
  "ui.strong": { de: "Stark", en: "Strong" },
  "ui.solid": { de: "Solide", en: "Solid" },
  "ui.weak": { de: "Schwach", en: "Weak" },
  "ui.verdict.go": { de: "NISCHE VALIDIERT", en: "NICHE VALIDATED" },
  "ui.verdict.maybe": { de: "POTENZIAL VORHANDEN", en: "POTENTIAL EXISTS" },
  "ui.verdict.nogo": { de: "NISCHE UEBERDENKEN", en: "RECONSIDER NICHE" },
  "ui.ai.title": { de: "KI Business-Vorschlag", en: "AI Business Suggestion" },
  "ui.ai.loading": { de: "KI analysiert deine Nische...", en: "AI analyzing your niche..." },
  "ui.ai.tool": { de: "Empfohlenes Tool", en: "Recommended Tool" },
  "ui.ai.revenue": { de: "Erwarteter Umsatz", en: "Expected Revenue" },
  "ui.ai.audience": { de: "Zielgruppe", en: "Target Audience" },
  "ui.ai.steps": { de: "Dein 3-Schritte-Plan", en: "Your 3-Step Plan" },
  "ui.ai.build": { de: "Jetzt bauen mit", en: "Build now with" },
  "ui.ai.error": { de: "KI-Analyse nicht verfugbar", en: "AI analysis unavailable" },
  "ui.platforms": { de: "Plattform-Signale", en: "Platform Signals" },
  "ui.amazon": { de: "Amazon (Kaufintent)", en: "Amazon (Buy Intent)" },
  "ui.youtube": { de: "YouTube (Lernintent)", en: "YouTube (Learn Intent)" },
  "ui.reddit": { de: "Reddit (Community)", en: "Reddit (Community)" },
  "ui.keywords": { de: "Verwandte Keywords", en: "Related Keywords" },
  "ui.results.for": { de: "Ergebnisse fur", en: "Results for" },
  "ui.scans.left": { de: "Free ubrig", en: "free left" },
  "ui.upgrade.msg": { de: "Upgrade fur unbegrenzten Zugang.", en: "Upgrade for unlimited access." },
  "ui.scan.error": { de: "Scan fehlgeschlagen. Versuche es erneut.", en: "Scan failed. Please try again." },
  "ui.free.plan": { de: "Free Plan", en: "Free Plan" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, locale: Locale): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[locale] || entry["de"];
}
