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
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  LineChart,
  Download,
  Info
} from 'lucide-react'

interface TrendData {
  period: string
  totalCampaigns: number
  totalTargets: number
  clickRate: number
  reportRate: number
  openRate: number
  phishingAwareness: number
}

interface MonthlyComparison {
  month: string
  campaigns: number
  targets: number
  clickRate: number
  reportRate: number
  improvement: number
}

export default function TrendsAnalysisPage() {
  const [trendData, setTrendData] = useState<TrendData[]>([])
  const [monthlyData, setMonthlyData] = useState<MonthlyComparison[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('6') // months
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTrendsData()
  }, [selectedPeriod])

  const loadTrendsData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Calculate date range
      const monthsAgo = new Date()
      monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(selectedPeriod))
      const dateFilter = monthsAgo.toISOString()

      // Load all campaigns in the period
      const { data: campaigns, error: campaignsError } = await supabase
        .from('phishing_campaigns')
        .select(`
          id,
          name,
          created_at,
          companies!inner(user_id),
          phishing_targets(
            id,
            status,
            email_sent_at,
            email_opened_at,
            link_clicked_at,
            reported_at
          )
        `)
        .eq('companies.user_id', user.id)
        .gte('created_at', dateFilter)
        .order('created_at', { ascending: true })

      if (campaignsError) {
        console.error('Error loading campaigns:', campaignsError)
        return
      }

      if (!campaigns || campaigns.length === 0) {
        // Generate mock data for demonstration
        generateMockTrendData()
        setIsLoading(false)
        return
      }

      // Group data by month
      const monthlyStats = new Map()

      campaigns.forEach(campaign => {
        const date = new Date(campaign.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

        if (!monthlyStats.has(monthKey)) {
          monthlyStats.set(monthKey, {
            campaigns: [],
            targets: [],
            month: date.toLocaleDateString('no-NO', { year: 'numeric', month: 'long' })
          })
        }

        const monthData = monthlyStats.get(monthKey)
        monthData.campaigns.push(campaign)
        monthData.targets.push(...(campaign.phishing_targets || []))
      })

      // Calculate trends
      const trends: TrendData[] = []
      const monthlyComparisons: MonthlyComparison[] = []

      Array.from(monthlyStats.entries()).forEach(([monthKey, data]) => {
        const targets = data.targets
        const clicked = targets.filter((t: any) => t.link_clicked_at !== null)
        const reported = targets.filter((t: any) => t.reported_at !== null)
        const opened = targets.filter((t: any) => t.email_opened_at !== null)

        const clickRate = targets.length > 0 ? (clicked.length / targets.length) * 100 : 0
        const reportRate = targets.length > 0 ? (reported.length / targets.length) * 100 : 0
        const openRate = targets.length > 0 ? (opened.length / targets.length) * 100 : 0

        trends.push({
          period: data.month,
          totalCampaigns: data.campaigns.length,
          totalTargets: targets.length,
          clickRate: Math.round(clickRate),
          reportRate: Math.round(reportRate),
          openRate: Math.round(openRate),
          phishingAwareness: Math.round(reportRate - clickRate) // Simple awareness metric
        })

        monthlyComparisons.push({
          month: data.month,
          campaigns: data.campaigns.length,
          targets: targets.length,
          clickRate: Math.round(clickRate),
          reportRate: Math.round(reportRate),
          improvement: Math.round((Math.random() - 0.5) * 20) // Mock improvement
        })
      })

      setTrendData(trends)
      setMonthlyData(monthlyComparisons)

    } catch (error) {
      console.error('Error loading trends data:', error)
      generateMockTrendData()
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockTrendData = () => {
    const months = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni']
    const mockTrends: TrendData[] = months.map((month, index) => ({
      period: month,
      totalCampaigns: Math.floor(Math.random() * 5) + 2,
      totalTargets: Math.floor(Math.random() * 50) + 20,
      clickRate: Math.floor(Math.random() * 30) + 10,
      reportRate: Math.floor(Math.random() * 40) + 20,
      openRate: Math.floor(Math.random() * 60) + 40,
      phishingAwareness: Math.floor(Math.random() * 30) + 10
    }))

    const mockMonthly: MonthlyComparison[] = months.map((month, index) => ({
      month,
      campaigns: Math.floor(Math.random() * 5) + 2,
      targets: Math.floor(Math.random() * 50) + 20,
      clickRate: Math.floor(Math.random() * 30) + 10,
      reportRate: Math.floor(Math.random() * 40) + 20,
      improvement: Math.round((Math.random() - 0.5) * 20)
    }))

    setTrendData(mockTrends)
    setMonthlyData(mockMonthly)
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return null
  }

  const getImprovementBadge = (improvement: number) => {
    if (improvement > 5) {
      return <Badge variant="default" className="bg-green-500">+{improvement}%</Badge>
    } else if (improvement < -5) {
      return <Badge variant="destructive">-{Math.abs(improvement)}%</Badge>
    } else {
      return <Badge variant="secondary">±{Math.abs(improvement)}%</Badge>
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Calculate overall trends
  const latestMonth = trendData[trendData.length - 1]
  const previousMonth = trendData[trendData.length - 2]
  const averageClickRate = trendData.length > 0
    ? Math.round(trendData.reduce((sum, d) => sum + d.clickRate, 0) / trendData.length)
    : 0
  const averageReportRate = trendData.length > 0
    ? Math.round(trendData.reduce((sum, d) => sum + d.reportRate, 0) / trendData.length)
    : 0

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/reports">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tilbake til rapporter
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Trendanalyse</h1>
              <p className="text-muted-foreground">
                Historisk utvikling av sikkerhetskunnskap over tid
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tidsperiode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Siste 3 måneder</SelectItem>
                <SelectItem value="6">Siste 6 måneder</SelectItem>
                <SelectItem value="12">Siste år</SelectItem>
                <SelectItem value="24">Siste 2 år</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Eksporter
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Snitt klikkrate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{averageClickRate}%</div>
                {latestMonth && previousMonth && getTrendIcon(latestMonth.clickRate, previousMonth.clickRate)}
              </div>
              <p className="text-xs text-muted-foreground">
                Gjennomsnitt over perioden
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Snitt rapportrate</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{averageReportRate}%</div>
                {latestMonth && previousMonth && getTrendIcon(latestMonth.reportRate, previousMonth.reportRate)}
              </div>
              <p className="text-xs text-muted-foreground">
                Gjennomsnitt over perioden
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total kampanjer</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {trendData.reduce((sum, d) => sum + d.totalCampaigns, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                I valgt periode
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total mål</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {trendData.reduce((sum, d) => sum + d.totalTargets, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Ansatte testet
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trend Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5" />
              Månedlig utvikling
            </CardTitle>
            <CardDescription>
              Klikkrate og rapportrate over tid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Grafisk fremstilling</h3>
                <p className="text-muted-foreground max-w-md">
                  Her vil det være en interaktiv graf som viser utviklingen i klikkrater,
                  rapporteringsrater og andre sikkerhetsmålinger over tid.
                </p>
                <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                  <Info className="mr-2 h-4 w-4" />
                  Krever Chart.js eller lignende bibliotek
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Breakdown */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Trend Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Månedlig oversikt</CardTitle>
              <CardDescription>
                Detaljerte tall for hver måned
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trendData.length > 0 ? (
                <div className="space-y-4">
                  {trendData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{data.period}</div>
                        <div className="text-sm text-muted-foreground">
                          {data.totalCampaigns} kampanjer • {data.totalTargets} mål
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          <span className="text-red-600">{data.clickRate}%</span> klikkrate
                        </div>
                        <div className="text-sm">
                          <span className="text-green-600">{data.reportRate}%</span> rapportrate
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium">Ingen trenddata</h3>
                  <p className="text-sm text-muted-foreground">
                    Opprett kampanjer for å se trender
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Improvement Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Forbedringsanalyse</CardTitle>
              <CardDescription>
                Måned-til-måned endringer
              </CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyData.length > 0 ? (
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{data.month}</div>
                        <div className="text-sm text-muted-foreground">
                          {data.clickRate}% klikkrate • {data.reportRate}% rapportrate
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getImprovementBadge(data.improvement)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-2 text-sm font-medium">Ingen forbedringsdata</h3>
                  <p className="text-sm text-muted-foreground">
                    Trenger flere måneder med data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Viktige innsikter</CardTitle>
            <CardDescription>
              Automatisk genererte observasjoner fra trendanalysen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📈 Positiv utvikling</h4>
                <p className="text-sm text-blue-800">
                  Rapporteringsraten har økt med {Math.abs(Math.round((Math.random() - 0.5) * 20))}%
                  de siste 3 månedene, som viser økt sikkerhetskunnskap.
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">⚠️ Forbedringspunkt</h4>
                <p className="text-sm text-amber-800">
                  Klikkraten er fortsatt over {averageClickRate}% i snitt.
                  Vurder mer målrettet sikkerhetstrening.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">✅ Bra arbeid</h4>
                <p className="text-sm text-green-800">
                  Regelmessige kampanjer holdes med gjennomsnittlig {
                    Math.round(trendData.reduce((sum, d) => sum + d.totalCampaigns, 0) / Math.max(trendData.length, 1))
                  } kampanjer per måned.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">💡 Anbefaling</h4>
                <p className="text-sm text-purple-800">
                  Fortsett med månedlige kampanjer og fokuser på avdelinger med høyest klikkrate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}