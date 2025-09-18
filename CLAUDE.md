# Claude Configuration

Dette er konfigurasjonen for Claude Code for EvoPhisher prosjektet.

## Prosjektinfo
- **Navn**: EvoPhisher - Phishing Test Plattform
- **Type**: Next.js applikasjon med Supabase
- **Hovedspråk**: TypeScript
- **UI-bibliotek**: shadcn/ui med Tailwind CSS

## Kommandoer
- **Start utvikling**: `npm run dev`
- **Bygg prosjekt**: `npm run build`
- **Lint kode**: `npm run lint`
- **Type-sjekk**: `npm run type-check` (hvis tilgjengelig)

## Mappestruktur
- `src/app/` - Next.js App Router sider
- `src/components/` - Gjenbrukbare komponenter
- `src/lib/` - Utilities og konfigurasjoner
- `supabase/` - Database schema og konfigurasjoner

## Database
- **Provider**: Supabase (PostgreSQL)
- **Schema**: Definert i `supabase/schema.sql`
- **Auth**: Supabase Auth med Row Level Security

## Tekniske notater
- Bruker App Router i Next.js 14+
- Alle komponenter er TypeScript
- Responsivt design med Tailwind CSS
- Sikkerhet implementert med RLS i Supabase