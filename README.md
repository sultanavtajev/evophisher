# EvoPhisher - Phishing Test Plattform

En moderne, sikker plattform for bedriftseiere å teste sine ansattes bevissthet rundt phishing-angrep.

## 🚀 Funksjoner

- **Brukerautentisering**: Sikker registrering og innlogging med Supabase Auth
- **Bedriftshåndtering**: CRUD-operasjoner for å administrere bedrifter
- **Ansatthåndtering**: Legg til, rediger og slett ansatte per bedrift
- **Moderne UI**: Minimalistisk design med shadcn/ui og Tailwind CSS
- **Responsivt design**: Fungerer perfekt på desktop, tablet og mobil
- **Sikkerhet**: Row Level Security (RLS) i Supabase for databeskyttelse

## 🛠️ Teknisk Stack

- **Frontend**: Next.js 14+ med App Router
- **UI-bibliotek**: shadcn/ui komponenter med Tailwind CSS
- **Database**: Supabase (PostgreSQL) med Row Level Security
- **Autentisering**: Supabase Auth
- **TypeScript**: Full type-sikkerhet
- **Ikoner**: Lucide React

## 📋 Kravspesifikasjon

### Funksjonelle Krav
- ✅ Brukerregistrering og innlogging
- ✅ Dashboard for bedriftseiere
- ✅ Bedriftshåndtering (opprett, les, oppdater, slett)
- ✅ Ansatthåndtering (opprett, les, oppdater, slett)
- ✅ Responsivt design
- 🔄 Phishing-kampanjer (kommer i neste versjon)
- 🔄 Rapporter og analytics (kommer i neste versjon)

### Ikke-funksjonelle Krav
- ✅ Sikkerhet med RLS
- ✅ Moderne, minimalistisk UI
- ✅ Rask ytelse
- ✅ Skalerbar arkitektur

## 🚀 Kom i gang

### Forutsetninger
- Node.js 18+
- npm eller yarn
- Supabase-konto

### Installasjon

1. **Klon prosjektet**:
   ```bash
   git clone <repository-url>
   cd evophisher
   ```

2. **installer avhengigheter**:
   ```bash
   npm install
   ```

3. **Konfigurer miljøvariabler**:

   Rediger `.env.local` filen og legg til dine Supabase-detaljer:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=din-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-key
   SUPABASE_SERVICE_ROLE_KEY=din-service-role-key
   ```

4. **Sett opp Supabase-databasen**:

   Kjør SQL-scriptet i `supabase/schema.sql` i din Supabase SQL Editor for å opprette tabeller og sikkerhetspolicyer.

5. **Start utviklingsserveren**:
   ```bash
   npm run dev
   ```

   Applikasjonen vil være tilgjengelig på `http://localhost:3000`

## 📁 Prosjektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Autentiseringssider
│   ├── dashboard/         # Beskyttet dashboard-område
│   └── page.tsx           # Landingpage
├── components/            # Gjenbrukbare komponenter
│   ├── layout/           # Layout-komponenter
│   └── ui/               # UI-komponenter (shadcn)
├── lib/                  # Utilities og konfigurasjoner
│   ├── supabase/        # Supabase-klienter
│   ├── types/           # TypeScript-typer
│   └── utils.ts         # Hjelpefunksjoner
└── middleware.ts         # Next.js middleware for auth
```

## 🗄️ Database Schema

### Tabeller:
- **profiles**: Brukerprofilinformasjon
- **companies**: Bedriftsinformasjon
- **employees**: Ansattinformasjon

Alle tabeller har Row Level Security (RLS) aktivert for å sikre at brukere kun kan se sine egne data.

## 🔒 Sikkerhet

- **Autentisering**: Supabase Auth med e-postbekreftelse
- **Autorisasjon**: Row Level Security policies
- **Input-validering**: Validering både client-side og server-side
- **HTTPS**: Alltid sikker kommunikasjon

## 🌟 Neste Steg

Plattformen er klar for grunnleggende bedrifts- og ansatthåndtering. Neste utviklingsfase kan inkludere:

1. **Phishing-kampanjer**: Implementere mulighet til å opprette og sende phishing-tester
2. **Rapporter**: Analytics og rapporter over resultater
3. **Maler**: Ferdiglagde phishing-maler
4. **Planlegging**: Automatiske og planlagte kampanjer
5. **Treningsressurser**: Utdanningsmateriale for ansatte

## 📞 Support

For spørsmål eller support, kontakt utviklingsteamet eller opprett en issue i prosjektets repository.

---

**EvoPhisher** - Styrk din bedrifts cybersikkerhet med profesjonell phishing-testing.
