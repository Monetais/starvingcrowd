# Kaching OS — API & Daten-Architektur

## Ziel
Kaching OS soll Nutzern echte, aktuelle Marktdaten liefern: Nachfrage (Suchvolumen), Konkurrenz (SERP-Dichte), Trends (steigend/fallend), und daraus einen Opportunity-Score berechnen.

---

## 1. Core Data Pipeline

### 1.1 Keyword & Suchvolumen-Daten
**Was:** Monatliches Suchvolumen, CPC, Keyword-Difficulty, Related Keywords

| API | Kosten | Was sie liefert |
|-----|--------|----------------|
| **Google Ads API (Keyword Planner)** | Kostenlos (mit Ads-Konto) | Suchvolumen, CPC, Wettbewerb, Saisonalität |
| **SEMrush API** | ab $129/mo | Keyword-Daten, SERP-Analyse, Domain-Analyse, Keyword-Magic-Tool |
| **Ahrefs API** | ab $99/mo | Keyword Difficulty, Suchvolumen, SERP-Übersicht, Content Gap |
| **Mangools (KWFinder) API** | ab $49/mo | Günstigere Alternative, Keyword-Schwierigkeit, SERP |
| **Keywords Everywhere API** | Pay-per-Credit | Suchvolumen, Trend, CPC — sehr günstig für Bulk |
| **DataForSEO API** | ab $50/mo (pay-per-use) | SERP, Keywords, Google Trends, Backlinks — All-in-One, sehr flexibel |

**Empfehlung:** DataForSEO als Haupt-API (pay-per-use, alle Daten an einem Ort) + Google Ads API als kostenlose Ergänzung.

### 1.2 Trend-Daten
**Was:** Ist das Interesse steigend, fallend oder stabil?

| API | Kosten | Was sie liefert |
|-----|--------|----------------|
| **Google Trends (inoffiziell via SerpApi)** | ab $50/mo | Trend-Kurven, Related Queries, Breakout-Themen |
| **DataForSEO Google Trends** | In DataForSEO enthalten | Trend-Daten programmatisch |
| **Exploding Topics API** | ab $97/mo | Frühzeitig steigende Themen erkennen, bevor sie Mainstream werden |
| **Glimpse** | ab $100/mo | Google Trends auf Steroiden — Growth-Rate, Forecasts |

**Empfehlung:** DataForSEO für Basis-Trends + Exploding Topics für "Early Signal Detection".

### 1.3 Konkurrenz-Analyse
**Was:** Wie stark sind bestehende Anbieter? Wie schwer ist es, reinzukommen?

| API | Kosten | Was sie liefert |
|-----|--------|----------------|
| **DataForSEO SERP API** | In DataForSEO enthalten | Top-10 Ergebnisse, Domain Authority, Backlinks der Ergebnisse |
| **SimilarWeb API** | Enterprise (teuer) | Traffic-Schätzungen für Wettbewerber-Domains |
| **BuiltWith API** | ab $295/mo | Tech-Stack von Wettbewerber-Websites |
| **SpyFu API** | ab $39/mo | PPC-Konkurrenz, Keyword-Overlap, Ad-History |

**Empfehlung:** DataForSEO SERP API + eigener Scoring-Algorithmus basierend auf Domain-Authority und Anzahl der starken Ergebnisse.

### 1.4 Marktgröße & Monetarisierungs-Signale
**Was:** Gibt es zahlungsbereite Kunden? Wie groß ist der Markt?

| Datenquelle | Wie nutzen |
|-------------|-----------|
| **Google Ads CPC** | Hoher CPC = hohe Zahlungsbereitschaft |
| **Amazon Product API** | Produkt-Preise, Bewertungen, Bestseller-Rang in Nischen |
| **Shopify-Stores (über BuiltWith/Store Leads)** | Wie viele Shops existieren in der Nische? |
| **Stripe Atlas / Crunchbase API** | Funding-Daten für SaaS-Nischen |
| **Reddit API** | Pain-Points und echte Nutzer-Probleme in Subreddits |
| **Product Hunt API** | Kürzlich gelaunchte Produkte in ähnlichen Nischen |

---

## 2. Opportunity-Score Algorithmus

```
Opportunity Score = (Nachfrage × 0.35) + (Inverse Konkurrenz × 0.25) + (Trend × 0.20) + (Monetarisierung × 0.20)

Nachfrage (0-100):
  - Suchvolumen normalisiert (log-scale)
  - Gewichtet nach Relevanz der Keywords
  - Bonus für Long-Tail mit hohem Intent

Inverse Konkurrenz (0-100):
  - 100 - normalisierte Keyword Difficulty
  - Bonus wenn Top-10 schwache Domains hat
  - Bonus wenn wenige spezialisierte Anbieter

Trend (0-100):
  - Google Trends Steigung (12 Monate)
  - Exploding Topics Score
  - Saisonalität-Bereinigung

Monetarisierung (0-100):
  - CPC als Proxy für Zahlungsbereitschaft
  - Produkt-Preisniveau in der Nische
  - Wiederkauf-Potenzial (Abo-fähig?)
```

---

## 3. Tech-Stack für die App

### Backend
```
Next.js API Routes (oder separate Express/Fastify)
├── /api/scan          → Nimmt Keyword, ruft Pipeline auf
├── /api/trends        → Trend-Daten für ein Keyword
├── /api/competitors   → SERP-Analyse
├── /api/watchlist     → CRUD für gespeicherte Nischen
├── /api/alerts        → Nischen-Alerts konfigurieren
└── /api/reports       → PDF/CSV Export
```

### Datenbank
| Option | Warum |
|--------|-------|
| **Supabase (PostgreSQL)** | Auth + DB + Realtime in einem. Perfekt für MVP. Kostenloser Tier. |
| **PlanetScale (MySQL)** | Wenn du branching brauchst |
| **Neon (PostgreSQL)** | Serverless Postgres, sehr schnell |

**Schema (Kernmodell):**
```sql
users (id, email, plan, scans_used, created_at)
scans (id, user_id, keyword, results_json, score, created_at)
watchlist (id, user_id, scan_id, notes, alert_enabled)
niche_cache (keyword_hash, data_json, fetched_at, expires_at)
```

### Auth
- **Clerk** oder **Supabase Auth** — beides hat kostenlosen Tier, Social Login, Magic Links

### Payments
- **Stripe** — Subscriptions mit 3 Tiers (Free / Builder / Agency)
- Stripe Checkout + Customer Portal für Self-Service
- Webhook für plan-Upgrades → `users.plan` updaten

### Caching
- **Redis (Upstash)** — Keyword-Ergebnisse 24h cachen, spart API-Kosten
- Oder: `niche_cache` Tabelle mit `expires_at`

---

## 4. API-Kosten Kalkulation (MVP)

| Service | Monatliche Kosten | Abdeckung |
|---------|-------------------|-----------|
| DataForSEO | ~$50-100 | Keywords, SERP, Trends |
| Exploding Topics | $97 | Early Trend Detection |
| Supabase | $0-25 | DB + Auth |
| Upstash Redis | $0-10 | Caching |
| Vercel | $0-20 | Hosting |
| Stripe | 2.9% + 30¢ per txn | Payments |
| **Gesamt** | **~$150-250/mo** | |

**Break-even:** 6-9 Builder-Kunden à 29 EUR/mo

---

## 5. Nischen-Alert System

Killer-Feature für Retention:

1. User setzt Keyword auf Watchlist
2. Cron-Job (Vercel Cron oder Trigger.dev) prüft wöchentlich:
   - Hat sich das Suchvolumen verändert?
   - Gibt es neue Wettbewerber?
   - Ist der Trend gestiegen/gefallen?
3. Notification per E-Mail (Resend API) oder In-App
4. Alert-Types:
   - 🔥 "Deine Nische 'KI Terminbuchung' ist gerade trending (+34%)"
   - ⚠️ "Neuer Wettbewerber in 'Dachdecker Leads' entdeckt"
   - ✅ "Opportunity Score für 'Creator Buchhaltung' gestiegen auf 91"

---

## 6. Implementierungs-Reihenfolge

### Phase 1: MVP (Woche 1-2)
- [ ] Supabase Setup (Auth + DB)
- [ ] DataForSEO Integration (Keywords + SERP)
- [ ] Basis Opportunity-Score Berechnung
- [ ] Scan-Ergebnisse speichern + anzeigen
- [ ] Stripe Integration (Free + Builder)
- [ ] Scan-Limit Enforcement (3 free / unlimited paid)

### Phase 2: Intelligence (Woche 3-4)
- [ ] Google Trends Integration
- [ ] Konkurrenz-Scoring verfeinern
- [ ] Watchlist + Speichern
- [ ] Nischen-Vergleich (2 Nischen side-by-side)
- [ ] PDF Report Export

### Phase 3: Retention (Woche 5-6)
- [ ] Nischen-Alerts (Cron + E-Mail)
- [ ] Exploding Topics Integration
- [ ] Dashboard mit historischen Daten
- [ ] Team-Features (Agency Plan)
- [ ] API für Agency-Kunden

### Phase 4: Growth (Woche 7+)
- [ ] Ideen-Generator (KI-basiert, OpenAI API)
- [ ] Community-Feature (Top-Nischen der Woche)
- [ ] Affiliate-System
- [ ] Chrome Extension (Nischen-Score auf jeder Website)

---

## 7. Zusammenfassung: Minimum Viable APIs

Für einen funktionierenden MVP brauchst du **genau 3 externe Services:**

1. **DataForSEO** (~$50/mo) → Keywords, SERP, Trends
2. **Supabase** (kostenlos) → Auth, DB, Realtime
3. **Stripe** (transaktionsbasiert) → Payments

Alles andere (Exploding Topics, Reddit, Amazon) ist Nice-to-have für Phase 2+.
