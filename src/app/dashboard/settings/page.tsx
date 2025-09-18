'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  User,
  Mail,
  Shield,
  Building2,
  BarChart3,
  GraduationCap,
  Settings,
  ChevronRight,
  Bell,
  Database,
  Key,
  Download
} from 'lucide-react'

interface SettingsCategory {
  id: string
  title: string
  description: string
  icon: any
  href: string
  status?: 'configured' | 'needs_attention' | 'default'
}

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUser(user)

      // Get profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profile)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const settingsCategories: SettingsCategory[] = [
    {
      id: 'profile',
      title: 'Profil & Konto',
      description: 'Administrer personlig informasjon, passord og kontoinnstillinger',
      icon: User,
      href: '/dashboard/settings/profile',
      status: profile?.first_name ? 'configured' : 'needs_attention'
    },
    {
      id: 'campaigns',
      title: 'Kampanje-innstillinger',
      description: 'Standard konfigurasjoner for phishing-kampanjer og e-post leveranse',
      icon: Mail,
      href: '/dashboard/settings/campaigns',
      status: 'default'
    },
    {
      id: 'security',
      title: 'Sikkerhet & Tilganger',
      description: 'To-faktor autentisering, API-nøkler og sikkerhetshendelser',
      icon: Shield,
      href: '/dashboard/settings/security',
      status: 'default'
    },
    {
      id: 'organization',
      title: 'Organisasjonsinnstillinger',
      description: 'Bedriftsinformasjon, ansatt-strukturer og dataretensjon',
      icon: Building2,
      href: '/dashboard/settings/organization',
      status: 'default'
    },
    {
      id: 'reports',
      title: 'Rapportering & Eksport',
      description: 'Automatiske rapporter, eksportformater og distribusjon',
      icon: BarChart3,
      href: '/dashboard/settings/reports',
      status: 'default'
    },
    {
      id: 'training',
      title: 'Treningsmodul-innstillinger',
      description: 'Standard treningsinnhold og automatisk tildeling',
      icon: GraduationCap,
      href: '/dashboard/settings/training',
      status: 'default'
    },
    {
      id: 'system',
      title: 'Systempreferanser',
      description: 'Varslinger, integrasjoner og GDPR-innstillinger',
      icon: Settings,
      href: '/dashboard/settings/system',
      status: 'default'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'configured':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      case 'needs_attention':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Innstillinger</h1>
            <p className="text-muted-foreground">
              Administrer kontoinnstillinger, sikkerhet og systempreferanser
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konto status</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profile?.first_name ? 'Komplett' : 'Ufullstendig'}
              </div>
              <p className="text-xs text-muted-foreground">
                Profilinformasjon
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sikkerhet</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Standard</div>
              <p className="text-xs text-muted-foreground">
                2FA ikke aktivert
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Varslinger</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Aktivert</div>
              <p className="text-xs text-muted-foreground">
                E-post varsler på
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lagring</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GDPR</div>
              <p className="text-xs text-muted-foreground">
                Compliant lagring
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Settings Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Innstillingskategorier</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {settingsCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <Link href={category.href}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(category.status || 'default')}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hurtighandlinger</CardTitle>
            <CardDescription>
              Vanlige innstillingsoppgaver
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="justify-start h-12" asChild>
                <Link href="/dashboard/settings/profile">
                  <User className="mr-3 h-5 w-5" />
                  Oppdater profil
                </Link>
              </Button>

              <Button variant="outline" className="justify-start h-12" asChild>
                <Link href="/dashboard/settings/security">
                  <Key className="mr-3 h-5 w-5" />
                  Endre passord
                </Link>
              </Button>

              <Button variant="outline" className="justify-start h-12" asChild>
                <Link href="/dashboard/settings/reports">
                  <Download className="mr-3 h-5 w-5" />
                  Eksportinnstillinger
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>Systeminformasjon</CardTitle>
            <CardDescription>
              Kontodetaljer og systemstatus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Kontoinformasjon</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>E-post:</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Konto opprettet:</span>
                    <span>{user?.created_at ? new Date(user.created_at).toLocaleDateString('no-NO') : 'Ukjent'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sist innlogget:</span>
                    <span>{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('no-NO') : 'Ukjent'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Systemstatus</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Database tilkobling: OK</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>E-post tjeneste: OK</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Rapporter: OK</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}