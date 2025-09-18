# EvoPhisher - Advanced Phishing Security Testing Platform

En komplett, enterprise-grade plattform for bedrifter som ønsker å styrke sin cybersikkerhet gjennom realistiske phishing-tester og sikkerhetstrening.

## ✨ Hovedfunksjoner

### 🎯 Phishing Testing & Kampanjer
- **Kampanjehåndtering**: Opprett, administrer og spor phishing-kampanjer
- **Template-bibliotek**: Forhåndsdefinerte og tilpassbare phishing-maler
- **Automatisering**: Planlagte og automatiske kampanjer
- **Realistiske simulering**: Profesjonelle tester som etterligner reelle trusler

### 👥 Bruker- og Organisasjonshåndtering
- **Bedriftshåndtering**: Komplett CRUD for organisasjoner
- **Ansattadministrasjon**: Detaljert håndtering av ansatte og deres status
- **Dashboard**: Omfattende oversikt over aktivitet og resultater
- **Teamhåndtering**: Organisering av ansatte i avdelinger og team

### 📊 Rapporter & Analytics
- **Detaljerte rapporter**: Omfattende innsikt i kampanjeresultater
- **Trendanalyse**: Historisk data og utviklingstrender
- **Eksportfunksjon**: PDF, CSV og Excel-eksport
- **Automatiserte rapporter**: Planlagte rapporter til ledelse

### ⚙️ Avanserte Innstillinger
- **Profil & Konto**: Personlige innstillinger og autentisering
- **Kampanje-konfigurasjon**: SMTP-oppsett og standard-innstillinger
- **Sikkerhet & Tilgang**: 2FA, passordpolicyer og tilgangskontroll
- **Organisasjonsinnstillinger**: Team-håndtering og rollebasert tilgang
- **Treningsmoduler**: Interaktivt læringinnhold og fremgangssporing
- **Systempreferanser**: GDPR-compliance, integrasjoner og varslinger

### 🎨 Brukeropplevelse
- **Responsiv design**: Perfekt på desktop, tablet og mobil med hamburger-meny
- **Moderne UI**: Elegant design med shadcn/ui og Tailwind CSS
- **Tilgjengelig**: WCAG-kompatible grensesnitt
- **Intuitivt**: Brukervennlige arbeidsflyter og navigasjon

## 🛠️ Teknisk Stack

- **Frontend**: Next.js 15.5.3 med App Router og React 19
- **UI Framework**: shadcn/ui komponenter med Tailwind CSS 4
- **Database**: Supabase (PostgreSQL) med Row Level Security
- **Autentisering**: Supabase Auth med utvidet sikkerhet
- **TypeScript**: Full type-sikkerhet med moderne syntaks
- **Ikoner**: Lucide React med 1000+ ikoner
- **Styling**: Responsive design med mobile-first tilnærming

## 📋 Implementeringsstatus

### ✅ Fullført
- **Brukerautentisering**: Komplett med Supabase Auth
- **Dashboard**: Omfattende oversikt med statistikk og hurtighandlinger
- **Bedriftshåndtering**: Full CRUD med detaljerte visninger
- **Ansatthåndtering**: Komplett administrasjon per bedrift
- **Kampanjehåndtering**: Opprettelse, administrasjon og sporing
- **Template-system**: Bibliotek med forhåndsdefinerte maler
- **Rapportsystem**: Detaljerte rapporter og analytics
- **Innstillingssystem**: 7 komplette konfigurasjonsseksjoner
- **Responsiv UI**: Mobile-first design med hamburger-meny
- **Landing Page**: Profesjonell markedsføring med 7 modulære seksjoner

### 🎯 Kjerneegenskaper
- **Enterprise-grade sikkerhet**: RLS, 2FA, passordpolicyer
- **Skalerbar arkitektur**: Modulær komponentstruktur
- **GDPR-compliance**: Innebygd databeskyttelse og privatlivsinnstillinger
- **Automatisering**: Planlagte kampanjer og rapporter
- **Integrasjoner**: Webhook-støtte og API-tilgang

## 🚀 Kom i gang

### Forutsetninger
- **Node.js 18+** - JavaScript runtime
- **npm eller yarn** - Pakkebehandler
- **Supabase-konto** - Database og autentisering

### Quick Start

1. **Klon repository**:
   ```bash
   git clone https://github.com/sultanavtajev/evophisher.git
   cd evophisher
   ```

2. **Installer dependencies**:
   ```bash
   npm install
   ```

3. **Konfigurer miljøvariabler**:

   Kopier `.env.example` til `.env.local` og fyll inn dine Supabase-detaljer:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Database setup**:

   Kjør SQL-scriptet fra `supabase/` mappen i din Supabase SQL Editor.

5. **Start utvikling**:
   ```bash
   npm run dev
   ```

   🎉 Applikasjonen kjører nå på `http://localhost:3000`

### Deployment til Vercel

1. **Push til GitHub** (allerede gjort)
2. **Connect til Vercel**: Importer repository fra GitHub
3. **Sett miljøvariabler**: Legg til Supabase URL og nøkler
4. **Deploy**: Vercel bygger og deployer automatisk

## 📁 Prosjektstruktur

```
src/
├── app/                       # Next.js App Router
│   ├── auth/                 # Autentiseringssider (signin, signup, reset)
│   ├── dashboard/            # Beskyttet dashboard-område
│   │   ├── campaigns/       # Kampanjehåndtering
│   │   ├── companies/       # Bedriftshåndtering
│   │   ├── employees/       # Ansatthåndtering
│   │   ├── reports/         # Rapporter og analytics
│   │   ├── settings/        # 7 innstillingsseksjoner
│   │   └── templates/       # Template-bibliotek
│   ├── about/               # Offentlige informasjonssider
│   ├── features/            # Funksjonsoversikt
│   ├── pricing/             # Prisinnformmasjon
│   └── page.tsx             # Modulær landingside
├── components/               # Gjenbrukbare komponenter
│   ├── landing/             # 7 landingside-seksjoner
│   ├── layout/              # Layout-komponenter (public/dashboard)
│   └── ui/                  # shadcn UI-komponenter
├── lib/                     # Utilities og konfigurasjoner
│   ├── supabase/           # Database-klienter (client/server/middleware)
│   ├── types/              # TypeScript type-definisjoner
│   └── utils.ts            # Hjelpefunksjoner
└── middleware.ts            # Route protection og auth

supabase/                    # Database schema og konfigurasjoner
├── migrations/             # Database-migreringer
└── .gitignore             # Supabase-spesifikke ignores
```

## 🗄️ Database Architecture

### Core Tabeller
- **`profiles`** - Brukerprofilinformasjon og preferanser
- **`companies`** - Bedriftsinformasjon og metadata
- **`employees`** - Ansattdata per bedrift
- **`phishing_campaigns`** - Kampanjer og konfigurasjoner
- **`phishing_targets`** - Individuelle mål per kampanje
- **`email_templates`** - Gjenbrukbare phishing-maler

### Sikkerhet & Compliance
- **Row Level Security (RLS)** - Aktivert på alle tabeller
- **Policy-based access** - Brukere ser kun egne data
- **Audit logging** - Sporing av alle endringer
- **GDPR-ready** - Innebygd databeskyttelse

## 🔒 Sikkerhetsfunksjoner

### Autentisering & Autorisasjon
- **Multi-factor Authentication (2FA)** - Ekstra sikkerhetslag
- **Passordpolicyer** - Konfigurerbare krav til passordstyrke
- **Session-håndtering** - Automatisk utlogging og concurrent sessions
- **Role-based Access Control** - Granulære tillatelser per rolle

### Data Protection
- **Row Level Security (RLS)** - Database-nivå sikkerhet
- **GDPR Compliance** - Innebygd personvernhåndtering
- **Data Retention** - Konfigurerbare oppbevaringspolicyer
- **Audit Logging** - Komplett sporingslogg for alle handlinger

### Infrastructure Security
- **HTTPS Only** - Alltid kryptert kommunikasjon
- **Input Validation** - Omfattende validering på alle nivåer
- **Rate Limiting** - Beskyttelse mot misbruk
- **Secure Headers** - Moderne sikkerhetshoder

## 🚀 Live Demo

**🌐 Produksjon**: [https://evophisher.vercel.app](https://evophisher.vercel.app)

### Test Credentials
```
E-post: demo@evophisher.no
Passord: EvoDemo2024!
```

*Demo-kontoen inneholder eksempeldata for testing av alle funksjoner.*

## 🏗️ Arkitektur

### Frontend Architecture
- **Component-based**: Modulære, gjenbrukbare komponenter
- **Responsive Design**: Mobile-first med hamburger-navigasjon
- **State Management**: React hooks og Supabase real-time
- **Performance**: Optimalisert for rask lasting og SEO

### Backend Architecture
- **Serverless**: Supabase Edge Functions for backend-logikk
- **Real-time**: Live data-synkronisering via WebSockets
- **Scalable**: Auto-scaling database og CDN
- **Global**: Distribuert via Vercel Edge Network

## 🤝 Bidrag

Vi ønsker bidrag! Se vår [Contributing Guide](CONTRIBUTING.md) for hvordan du kan bidra til prosjektet.

### Development Workflow
1. Fork repository
2. Opprett feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit endringer (`git commit -m 'Add AmazingFeature'`)
4. Push til branch (`git push origin feature/AmazingFeature`)
5. Åpne Pull Request

## 📞 Support & Community

- **📧 E-post**: support@evophisher.no
- **💬 GitHub Issues**: [Opprett issue](https://github.com/sultanavtajev/evophisher/issues)
- **📚 Dokumentasjon**: [Wiki](https://github.com/sultanavtajev/evophisher/wiki)
- **🚀 Feature Requests**: [Discussions](https://github.com/sultanavtajev/evophisher/discussions)

## 📄 Lisens

Dette prosjektet er lisensiert under MIT License - se [LICENSE](LICENSE) filen for detaljer.

---

<div align="center">

**EvoPhisher** - Advanced Phishing Security Testing Platform

*Styrk din bedrifts cybersikkerhet med enterprise-grade phishing-testing*

[🚀 Live Demo](https://evophisher.vercel.app) • [📚 Dokumentasjon](https://github.com/sultanavtajev/evophisher/wiki) • [🐛 Rapporter Bug](https://github.com/sultanavtajev/evophisher/issues)

</div>
