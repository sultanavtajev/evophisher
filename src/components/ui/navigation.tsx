'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      <Link href="/">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">EP</span>
          </div>
          <span className="font-semibold text-lg">EvoPhisher</span>
        </div>
      </Link>

      <div className="flex items-center space-x-4 ml-8">
        <Link
          href="/features"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === '/features' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          Funksjoner
        </Link>
        <Link
          href="/pricing"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === '/pricing' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          Priser
        </Link>
        <Link
          href="/about"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          Om oss
        </Link>
      </div>

      <div className="flex items-center space-x-2 ml-auto">
        <Button variant="ghost" asChild>
          <Link href="/auth/signin">Logg inn</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/signup">Kom i gang</Link>
        </Button>
      </div>
    </nav>
  )
}