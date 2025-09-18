'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { Building2, Users, Mail, TrendingUp, Plus } from 'lucide-react'

interface DashboardStats {
  companies: number
  employees: number
  campaigns: number
  clickRate: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    companies: 0,
    employees: 0,
    campaigns: 0,
    clickRate: 0
  })
  const [recentCompanies, setRecentCompanies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load companies
      const { data: companies } = await supabase
        .from('companies')
        .select('*, employees(count)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // Load campaigns for statistics
      const { data: campaigns } = await supabase
        .from('phishing_campaigns')
        .select(`
          id,
          status,
          phishing_targets(
            id,
            status,
            link_clicked_at
          )
        `)
        .in('company_id', companies?.map(c => c.id) || [])

      if (companies) {
        const totalEmployees = companies.reduce((sum, company) =>
          sum + (company.employees?.[0]?.count || 0), 0
        )

        // Calculate click rate from campaigns
        const allTargets = campaigns?.flatMap(c => c.phishing_targets || []) || []
        const clickedTargets = allTargets.filter(t => t.link_clicked_at !== null)
        const clickRate = allTargets.length > 0
          ? Math.round((clickedTargets.length / allTargets.length) * 100)
          : 0

        setStats({
          companies: companies.length,
          employees: totalEmployees,
          campaigns: campaigns?.length || 0,
          clickRate
        })

        setRecentCompanies(companies.slice(0, 5))
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Oversikt over dine phishing-tester og sikkerhetstrening
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bedrifter</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.companies}</div>
              <p className="text-xs text-muted-foreground">
                Totalt antall registrerte bedrifter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ansatte</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.employees}</div>
              <p className="text-xs text-muted-foreground">
                Totalt antall ansatte under testing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kampanjer</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.campaigns}</div>
              <p className="text-xs text-muted-foreground">
                Aktive phishing-kampanjer
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Klikkrate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clickRate}%</div>
              <p className="text-xs text-muted-foreground">
                Gjennomsnittlig klikkrate på phishing-e-post
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Companies */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Nylig registrerte bedrifter</CardTitle>
              <CardDescription>
                Dine sist opprettede bedrifter
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentCompanies.length > 0 ? (
                <div className="space-y-4">
                  {recentCompanies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {company.employees?.[0]?.count || 0} ansatte
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/companies/${company.id}`}>
                          Vis
                        </Link>
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/companies">Se alle bedrifter</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium">Ingen bedrifter ennå</h3>
                  <p className="text-sm text-muted-foreground">
                    Start med å legge til din første bedrift
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/companies/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Legg til bedrift
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hurtighandlinger</CardTitle>
              <CardDescription>
                Ofte brukte handlinger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/companies/new">
                  <Building2 className="mr-2 h-4 w-4" />
                  Legg til ny bedrift
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/employees/new">
                  <Users className="mr-2 h-4 w-4" />
                  Legg til ansatt
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/campaigns/new">
                  <Mail className="mr-2 h-4 w-4" />
                  Start phishing-kampanje
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/campaigns">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Vis kampanjer
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/dashboard/templates">
                  <Mail className="mr-2 h-4 w-4" />
                  Administrer maler
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}