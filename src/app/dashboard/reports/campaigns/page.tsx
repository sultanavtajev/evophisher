'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  Shield,
  Mail,
  Calendar,
  Users,
  Building2,
  Download
} from 'lucide-react'

interface CampaignAnalysis {
  id: string
  name: string
  companyName: string
  status: string
  totalTargets: number
  sentCount: number
  openedCount: number
  clickedCount: number
  reportedCount: number
  submittedCount: number
  openRate: number
  clickRate: number
  reportRate: number
  submitRate: number
  createdAt: string
  startDate: string | null
  endDate: string | null
  duration: number | null // hours
  templateType: string
}

type SortField = 'name' | 'clickRate' | 'reportRate' | 'openRate' | 'createdAt'
type SortDirection = 'asc' | 'desc'

export default function CampaignAnalysisPage() {
  const [campaigns, setCampaigns] = useState<CampaignAnalysis[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<CampaignAnalysis[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('90') // days
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [companies, setCompanies] = useState<{id: string, name: string}[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCampaignData()
  }, [selectedPeriod])

  useEffect(() => {
    filterAndSortCampaigns()
  }, [campaigns, selectedStatus, selectedCompany, sortField, sortDirection])

  const loadCampaignData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Calculate date filter
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(selectedPeriod))
      const dateFilter = daysAgo.toISOString()

      // Load campaigns with full details
      const { data: campaignData, error } = await supabase
        .from('phishing_campaigns')
        .select(`
          id,
          name,
          status,
          created_at,
          start_date,
          end_date,
          template_subject,
          companies!inner(id, name, user_id),
          phishing_targets(
            id,
            status,
            email_sent_at,
            email_opened_at,
            link_clicked_at,
            form_submitted_at,
            reported_at
          )
        `)
        .eq('companies.user_id', user.id)
        .gte('created_at', dateFilter)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading campaign data:', error)
        return
      }

      if (!campaignData) {
        setIsLoading(false)
        return
      }

      // Extract unique companies
      const uniqueCompanies = Array.from(
        new Set(campaignData.map(c => JSON.stringify({id: c.companies.id, name: c.companies.name})))
      ).map(c => JSON.parse(c))
      setCompanies(uniqueCompanies)

      // Process campaign analytics
      const analysisData: CampaignAnalysis[] = campaignData.map(campaign => {
        const targets = campaign.phishing_targets || []
        const sentTargets = targets.filter(t => t.email_sent_at !== null)
        const openedTargets = targets.filter(t => t.email_opened_at !== null)
        const clickedTargets = targets.filter(t => t.link_clicked_at !== null)
        const reportedTargets = targets.filter(t => t.reported_at !== null)
        const submittedTargets = targets.filter(t => t.form_submitted_at !== null)

        const totalTargets = targets.length
        const openRate = totalTargets > 0 ? Math.round((openedTargets.length / totalTargets) * 100) : 0
        const clickRate = totalTargets > 0 ? Math.round((clickedTargets.length / totalTargets) * 100) : 0
        const reportRate = totalTargets > 0 ? Math.round((reportedTargets.length / totalTargets) * 100) : 0
        const submitRate = totalTargets > 0 ? Math.round((submittedTargets.length / totalTargets) * 100) : 0

        // Calculate duration if both start and end dates exist
        let duration = null
        if (campaign.start_date && campaign.end_date) {
          const start = new Date(campaign.start_date)
          const end = new Date(campaign.end_date)
          duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60)) // hours
        }

        // Determine template type based on subject
        let templateType = 'Øvrig'
        const subject = campaign.template_subject?.toLowerCase() || ''
        if (subject.includes('passord')) templateType = 'Passord'
        else if (subject.includes('microsoft') || subject.includes('office')) templateType = 'Microsoft'
        else if (subject.includes('lønn') || subject.includes('hr')) templateType = 'HR'
        else if (subject.includes('bank')) templateType = 'Bank'
        else if (subject.includes('ceo') || subject.includes('haster')) templateType = 'CEO'

        return {
          id: campaign.id,
          name: campaign.name,
          companyName: campaign.companies.name,
          status: campaign.status,
          totalTargets,
          sentCount: sentTargets.length,
          openedCount: openedTargets.length,
          clickedCount: clickedTargets.length,
          reportedCount: reportedTargets.length,
          submittedCount: submittedTargets.length,
          openRate,
          clickRate,
          reportRate,
          submitRate,
          createdAt: campaign.created_at,
          startDate: campaign.start_date,
          endDate: campaign.end_date,
          duration,
          templateType
        }
      })

      setCampaigns(analysisData)

    } catch (error) {
      console.error('Error loading campaign analysis:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortCampaigns = () => {
    let filtered = [...campaigns]

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === selectedStatus)
    }

    // Filter by company
    if (selectedCompany !== 'all') {
      filtered = filtered.filter(c => c.companyName === selectedCompany)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'createdAt') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredCampaigns(filtered)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Utkast', variant: 'secondary' as const },
      active: { label: 'Aktiv', variant: 'default' as const },
      completed: { label: 'Fullført', variant: 'outline' as const },
      paused: { label: 'Pauset', variant: 'destructive' as const }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getRiskBadge = (clickRate: number) => {
    if (clickRate > 30) return <Badge variant="destructive">Høy risiko</Badge>
    if (clickRate > 15) return <Badge variant="secondary" className="bg-yellow-500">Middels</Badge>
    return <Badge variant="default" className="bg-green-500">Lav risiko</Badge>
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
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
              <h1 className="text-3xl font-bold tracking-tight">Kampanjeanalyse</h1>
              <p className="text-muted-foreground">
                Detaljert sammenligning av alle phishing-kampanjer
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Eksporter rapport
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tidsperiode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Siste 30 dager</SelectItem>
              <SelectItem value="90">Siste 3 måneder</SelectItem>
              <SelectItem value="180">Siste 6 måneder</SelectItem>
              <SelectItem value="365">Siste år</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statuser</SelectItem>
              <SelectItem value="draft">Utkast</SelectItem>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="completed">Fullført</SelectItem>
              <SelectItem value="paused">Pauset</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Bedrift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle bedrifter</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Totale kampanjer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredCampaigns.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Gjennomsnittlig klikkrate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredCampaigns.length > 0
                  ? Math.round(filteredCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / filteredCampaigns.length)
                  : 0}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Beste rapporteringsrate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredCampaigns.length > 0
                  ? Math.max(...filteredCampaigns.map(c => c.reportRate))
                  : 0}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Totale mål</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredCampaigns.reduce((sum, c) => sum + c.totalTargets, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Analysis Table */}
        <Card>
          <CardHeader>
            <CardTitle>Kampanjeoversikt</CardTitle>
            <CardDescription>
              Klikk på kolonneoverskriftene for å sortere
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Kampanje</span>
                      {getSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead>Bedrift</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mål</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('openRate')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Åpnet</span>
                      {getSortIcon('openRate')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('clickRate')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Klikket</span>
                      {getSortIcon('clickRate')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('reportRate')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Rapportert</span>
                      {getSortIcon('reportRate')}
                    </div>
                  </TableHead>
                  <TableHead>Risiko</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Opprettet</span>
                      {getSortIcon('createdAt')}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}`}
                            className="hover:underline"
                          >
                            {campaign.name}
                          </Link>
                        </div>
                        {campaign.duration && (
                          <div className="text-sm text-muted-foreground">
                            Varighet: {campaign.duration}t
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{campaign.companyName}</TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{campaign.templateType}</Badge>
                    </TableCell>
                    <TableCell>{campaign.totalTargets}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.openRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.clickRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.reportRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getRiskBadge(campaign.clickRate)}</TableCell>
                    <TableCell>
                      {new Date(campaign.createdAt).toLocaleDateString('no-NO')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}