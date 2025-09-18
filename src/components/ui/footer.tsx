import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">EP</span>
              </div>
              <span className="font-semibold">EvoPhisher</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Profesjonell phishing-testplattform for bedrifter som ønsker å styrke sin cybersikkerhet.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Produkt</h3>
            <div className="space-y-2">
              <Link href="/features" className="block text-sm text-muted-foreground hover:text-foreground">
                Funksjoner
              </Link>
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground">
                Priser
              </Link>
              <Link href="/security" className="block text-sm text-muted-foreground hover:text-foreground">
                Sikkerhet
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Selskap</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                Om oss
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground">
                Kontakt
              </Link>
              <Link href="/careers" className="block text-sm text-muted-foreground hover:text-foreground">
                Karriere
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Juridisk</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">
                Personvern
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground">
                Vilkår
              </Link>
              <Link href="/gdpr" className="block text-sm text-muted-foreground hover:text-foreground">
                GDPR
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 EvoPhisher. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}