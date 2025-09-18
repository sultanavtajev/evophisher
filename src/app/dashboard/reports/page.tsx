'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Mail,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  MousePointerClick,
  Download,
  Calendar,
  Building2
} from 'lucide-react'

interface OverallStats {
  totalCampaigns: number
  totalTargets: number
  overallClickRate: number
  overallReportRate: number
  overallOpenRate: number
  riskiestCompany: string | null
  bestCompany: string | null
  averageResponseTime: number // hours
}

interface CompanyPerformance {
  id: string
  name: string
  totalTargets: number
  clickRate: number
  reportRate: number
  riskLevel: 'low' | 'medium' | 'high'
}

interface RecentCampaign {
  id: string
  name: string
  company_name: string
  status: string
  clickRate: number
  createdAt: string
}

export default function ReportsPage() {
  const [overallStats, setOverallStats] = useState<OverallStats>({
    totalCampaigns: 0,
    totalTargets: 0,
    overallClickRate: 0,
    overallReportRate: 0,
    overallOpenRate: 0,
    riskiestCompany: null,
    bestCompany: null,
    averageResponseTime: 0
  })
  const [companyPerformances, setCompanyPerformances] = useState<CompanyPerformance[]>([])
  const [recentCampaigns, setRecentCampaigns] = useState<RecentCampaign[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('30') // days
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadReportsData()
  }, [selectedPeriod])

  const loadReportsData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Calculate date filter
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(selectedPeriod))
      const dateFilter = daysAgo.toISOString()

      // Load all companies first
      const { data: allCompanies, error: companiesError } = await supabase
        .from('companies')
        .select('id, name')
        .eq('user_id', user.id)

      if (companiesError) {
        console.error('Error loading companies:', companiesError)
        return
      }

      // Load campaigns with targets
      const { data: campaigns, error: campaignsError } = await supabase
        .from('phishing_campaigns')
        .select(`
          id,
          name,
          status,
          created_at,
          companies!inner(id, name, user_id),
          phishing_targets(
            id,
            status,
            email_sent_at,
            email_opened_at,
            link_clicked_at,
            reported_at,
            employees(first_name, last_name, department)
          )
        `)
        .eq('companies.user_id', user.id)
        .gte('created_at', dateFilter)
        .order('created_at', { ascending: false })

      if (campaignsError) {
        console.error('Error loading campaigns:', campaignsError)
        return
      }

      // Initialize company stats for all companies
      const companyStats = new Map()
      if (allCompanies) {
        allCompanies.forEach(company => {
          companyStats.set(company.id, {
            id: company.id,
            name: company.name,
            totalTargets: 0,
            clickedTargets: 0,
            reportedTargets: 0
          })
        })
      }

      // Calculate overall statistics
      const allTargets = campaigns ? campaigns.flatMap(c => c.phishing_targets || []) : []
      const clickedTargets = allTargets.filter(t => t.link_clicked_at !== null)
      const reportedTargets = allTargets.filter(t => t.reported_at !== null)
      const openedTargets = allTargets.filter(t => t.email_opened_at !== null)

      // Add campaign data to company stats
      if (campaigns) {
        campaigns.forEach(campaign => {
          const companyId = campaign.companies.id
          const targets = campaign.phishing_targets || []

          if (companyStats.has(companyId)) {
            const stats = companyStats.get(companyId)
            stats.totalTargets += targets.length
            stats.clickedTargets += targets.filter(t => t.link_clicked_at !== null).length
            stats.reportedTargets += targets.filter(t => t.reported_at !== null).length
          }
        })
      }

      const companyPerformanceData: CompanyPerformance[] = Array.from(companyStats.values()).map(stats => {
        const clickRate = stats.totalTargets > 0 ? (stats.clickedTargets / stats.totalTargets) * 100 : 0
        const reportRate = stats.totalTargets > 0 ? (stats.reportedTargets / stats.totalTargets) * 100 : 0

        let riskLevel: 'low' | 'medium' | 'high' = 'low'
        if (clickRate > 30) riskLevel = 'high'
        else if (clickRate > 15) riskLevel = 'medium'

        return {
          id: stats.id,
          name: stats.name,
          totalTargets: stats.totalTargets,
          clickRate: Math.round(clickRate),
          reportRate: Math.round(reportRate),
          riskLevel
        }
      })

      // Find best and worst performing companies
      const sortedByClickRate = [...companyPerformanceData].sort((a, b) => a.clickRate - b.clickRate)
      const bestCompany = sortedByClickRate[0]?.name || null
      const riskiestCompany = sortedByClickRate[sortedByClickRate.length - 1]?.name || null

      setOverallStats({
        totalCampaigns: campaigns ? campaigns.length : 0,
        totalTargets: allTargets.length,
        overallClickRate: allTargets.length > 0 ? Math.round((clickedTargets.length / allTargets.length) * 100) : 0,
        overallReportRate: allTargets.length > 0 ? Math.round((reportedTargets.length / allTargets.length) * 100) : 0,
        overallOpenRate: allTargets.length > 0 ? Math.round((openedTargets.length / allTargets.length) * 100) : 0,
        bestCompany,
        riskiestCompany,
        averageResponseTime: 24 // Placeholder - could be calculated from actual timestamps
      })

      setCompanyPerformances(companyPerformanceData)

      // Recent campaigns for quick view
      const recentCampaignsData = campaigns ? campaigns.slice(0, 5).map(campaign => {
        const targets = campaign.phishing_targets || []
        const clickRate = targets.length > 0
          ? Math.round((targets.filter(t => t.link_clicked_at !== null).length / targets.length) * 100)
          : 0

        return {
          id: campaign.id,
          name: campaign.name,
          company_name: campaign.companies.name,
          status: campaign.status,
          clickRate,
          createdAt: campaign.created_at
        }
      }) : []

      setRecentCampaigns(recentCampaignsData)

    } catch (error) {
      console.error('Error loading reports data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskBadge = (level: 'low' | 'medium' | 'high') => {
    const config = {
      low: { label: 'Lav risiko', variant: 'default' as const, color: 'bg-green-500' },
      medium: { label: 'Middels risiko', variant: 'secondary' as const, color: 'bg-yellow-500' },
      high: { label: 'Høy risiko', variant: 'destructive' as const, color: 'bg-red-500' }
    }

    const riskConfig = config[level]
    return (
      <Badge variant={riskConfig.variant} className={riskConfig.color}>
        {riskConfig.label}
      </Badge>
    )
  }

  const getTrendIcon = (value: number, threshold: number = 20) => {
    if (value > threshold) {
      return <TrendingUp className="h-4 w-4 text-red-500" />
    }
    return <TrendingDown className="h-4 w-4 text-green-500" />
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rapporter</h1>
            <p className="text-muted-foreground">
              Omfattende analyse av sikkerhetstrenings-effektivitet
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tidsperiode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Siste 7 dager</SelectItem>
                <SelectItem value="30">Siste 30 dager</SelectItem>
                <SelectItem value="90">Siste 3 måneder</SelectItem>
                <SelectItem value="365">Siste år</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Eksporter
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total klikkrate</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{overallStats.overallClickRate}%</div>
                {getTrendIcon(overallStats.overallClickRate)}
              </div>
              <p className="text-xs text-muted-foreground">
                {overallStats.totalTargets} totale mål testet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rapporteringsrate</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{overallStats.overallReportRate}%</div>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                Ansatte som rapporterte phishing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Åpningsrate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.overallOpenRate}%</div>
              <p className="text-xs text-muted-foreground">
                E-poster som ble åpnet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive kampanjer</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                I valgt tidsperiode
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Performance & Recent Campaigns */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Company Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Bedriftsytelse
              </CardTitle>
              <CardDescription>
                Sikkerhetskunnskap per bedrift
              </CardDescription>
            </CardHeader>
            <CardContent>
              {companyPerformances.length > 0 ? (
                <div className="space-y-4">
                  {companyPerformances.map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {company.totalTargets} mål • {company.clickRate}% klikkrate
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="text-sm font-medium">{company.reportRate}%</div>
                          <div className="text-xs text-muted-foreground">rapportert</div>
                        </div>
                        {getRiskBadge(company.riskLevel)}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/reports/companies">Se detaljert analyse</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium">Ingen data tilgjengelig</h3>
                  <p className="text-sm text-muted-foreground">
                    Opprett kampanjer for å se bedriftsytelse
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Nylige kampanjer
              </CardTitle>
              <CardDescription>
                Siste kampanjeresultater
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentCampaigns.length > 0 ? (
                <div className="space-y-4">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {campaign.company_name} • {new Date(campaign.createdAt).toLocaleDateString('no-NO')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{campaign.clickRate}%</div>
                        <Badge variant={campaign.status === 'completed' ? 'outline' : 'default'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/reports/campaigns">Se alle kampanjer</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium">Ingen kampanjer funnet</h3>
                  <p className="text-sm text-muted-foreground">
                    Start en kampanje for å se resultater
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Rapporthandlinger</CardTitle>
            <CardDescription>
              Hurtigtilgang til detaljerte analyser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="justify-start h-16" asChild>
                <Link href="/dashboard/reports/campaigns">
                  <div className="mr-4">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Kampanjeanalyse</div>
                    <div className="text-sm text-muted-foreground">Detaljert sammenligning</div>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="justify-start h-16" asChild>
                <Link href="/dashboard/reports/employees">
                  <div className="mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Ansattanalyse</div>
                    <div className="text-sm text-muted-foreground">Individuell ytelse</div>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="justify-start h-16" asChild>
                <Link href="/dashboard/reports/trends">
                  <div className="mr-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Trendanalyse</div>
                    <div className="text-sm text-muted-foreground">Historisk utvikling</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}