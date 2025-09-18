'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { href: '/features', label: 'Funksjoner' },
    { href: '/pricing', label: 'Priser' },
    { href: '/about', label: 'Om oss' },
  ]

  return (
    <nav className={cn('flex items-center justify-between', className)}>
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">EP</span>
          </div>
          <span className="font-semibold text-lg">EvoPhisher</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === link.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <Link href="/auth/signin">Logg inn</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/signup">Kom i gang</Link>
        </Button>
      </div>

      {/* Mobile Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg md:hidden">
          <div className="px-4 py-6 space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  Logg inn
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  Kom i gang
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}