'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { PhishingCampaign, PhishingTarget, Employee } from '@/lib/types/database'
import {
  ArrowLeft,
  Mail,
  Users,
  MousePointerClick,
  Eye,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Square,
  SkipForward,
  Trash2
} from 'lucide-react'

interface CampaignWithDetails extends PhishingCampaign {
  company_name?: string
  targets?: (PhishingTarget & {
    employee: Employee
  })[]
}

interface CampaignStats {
  total: number
  sent: number
  opened: number
  clicked: number
  submitted: number
  reported: number
}

export default function CampaignDetailsPage() {
  const [campaign, setCampaign] = useState<CampaignWithDetails | null>(null)
  const [stats, setStats] = useState<CampaignStats>({
    total: 0,
    sent: 0,
    opened: 0,
    clicked: 0,
    submitted: 0,
    reported: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const campaignId = params.id as string

  useEffect(() => {
    if (campaignId) {
      loadCampaignDetails()
    }
  }, [campaignId])

  const loadCampaignDetails = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('phishing_campaigns')
        .select(`
          *,
          companies!inner(name, user_id),
          phishing_targets(
            *,
            employees(*)
          )
        `)
        .eq('id', campaignId)
        .eq('companies.user_id', user.id)
        .single()

      if (error) {
        console.error('Error loading campaign:', error)
        return
      }

      setCampaign({
        ...data,
        company_name: data.companies?.name,
        targets: data.phishing_targets?.map((target: any) => ({
          ...target,
          employee: target.employees
        })) || []
      })

      // Calculate stats
      const targets = data.phishing_targets || []
      const newStats = {
        total: targets.length,
        sent: targets.filter((t: PhishingTarget) => t.email_sent_at !== null).length,
        opened: targets.filter((t: PhishingTarget) => t.email_opened_at !== null).length,
        clicked: targets.filter((t: PhishingTarget) => t.link_clicked_at !== null).length,
        submitted: targets.filter((t: PhishingTarget) => t.form_submitted_at !== null).length,
        reported: targets.filter((t: PhishingTarget) => t.reported_at !== null).length
      }
      setStats(newStats)

    } catch (error) {
      console.error('Error loading campaign details:', error)
    } finally {
      setIsLoading(false)
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

  const getTargetStatusBadge = (target: PhishingTarget) => {
    if (target.reported_at) {
      return <Badge variant="default" className="bg-green-500">Rapportert</Badge>
    }
    if (target.form_submitted_at) {
      return <Badge variant="destructive">Inntastet data</Badge>
    }
    if (target.link_clicked_at) {
      return <Badge variant="destructive">Klikket</Badge>
    }
    if (target.email_opened_at) {
      return <Badge variant="outline">Åpnet</Badge>
    }
    if (target.email_sent_at) {
      return <Badge variant="secondary">Sendt</Badge>
    }
    return <Badge variant="secondary">Venter</Badge>
  }

  const handleCampaignAction = async (action: 'start' | 'pause' | 'resume' | 'stop' | 'delete') => {
    if (!campaign) return

    try {
      if (action === 'delete') {
        if (!confirm(`Er du sikker på at du vil slette kampanjen "${campaign.name}"?`)) {
          return
        }

        const { error } = await supabase
          .from('phishing_campaigns')
          .delete()
          .eq('id', campaign.id)

        if (error) {
          console.error('Error deleting campaign:', error)
          alert('Feil ved sletting av kampanje')
          return
        }

        // Redirect to campaigns list
        window.location.href = '/dashboard/campaigns'
        return
      }

      if (action === 'stop') {
        if (!confirm(`Er du sikker på at du vil stoppe kampanjen "${campaign.name}"? Dette vil markere den som fullført.`)) {
          return
        }
      }

      let updateData: any = {}

      switch (action) {
        case 'start':
          updateData = {
            status: 'active',
            start_date: new Date().toISOString()
          }
          break
        case 'pause':
          updateData = { status: 'paused' }
          break
        case 'resume':
          updateData = { status: 'active' }
          break
        case 'stop':
          updateData = {
            status: 'completed',
            end_date: new Date().toISOString()
          }
          break
      }

      const { error } = await supabase
        .from('phishing_campaigns')
        .update(updateData)
        .eq('id', campaign.id)

      if (error) {
        console.error('Error updating campaign:', error)
        alert('Feil ved oppdatering av kampanje')
        return
      }

      // Reload data
      loadCampaignDetails()
    } catch (error) {
      console.error('Error handling campaign action:', error)
      alert('En uventet feil oppstod')
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

  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Kampanje ikke funnet</h1>
            <Button asChild className="mt-4">
              <Link href="/dashboard/campaigns">Tilbake til kampanjer</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const clickRate = stats.total > 0 ? Math.round((stats.clicked / stats.total) * 100) : 0
  const openRate = stats.total > 0 ? Math.round((stats.opened / stats.total) * 100) : 0
  const reportRate = stats.total > 0 ? Math.round((stats.reported / stats.total) * 100) : 0

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/campaigns">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tilbake til kampanjer
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
              <p className="text-muted-foreground">
                {campaign.company_name} • {getStatusBadge(campaign.status)}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            {campaign.status === 'draft' && (
              <Button onClick={() => handleCampaignAction('start')}>
                <Play className="mr-2 h-4 w-4" />
                Start kampanje
              </Button>
            )}

            {campaign.status === 'active' && (
              <>
                <Button variant="outline" onClick={() => handleCampaignAction('pause')}>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause kampanje
                </Button>
                <Button variant="outline" onClick={() => handleCampaignAction('stop')}>
                  <Square className="mr-2 h-4 w-4" />
                  Stopp kampanje
                </Button>
              </>
            )}

            {campaign.status === 'paused' && (
              <>
                <Button onClick={() => handleCampaignAction('resume')}>
                  <SkipForward className="mr-2 h-4 w-4" />
                  Fortsett kampanje
                </Button>
                <Button variant="outline" onClick={() => handleCampaignAction('stop')}>
                  <Square className="mr-2 h-4 w-4" />
                  Stopp kampanje
                </Button>
              </>
            )}

            {campaign.status !== 'completed' && (
              <Button
                variant="destructive"
                onClick={() => handleCampaignAction('delete')}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Slett
              </Button>
            )}

            {campaign.status === 'completed' && (
              <Button
                variant="destructive"
                onClick={() => handleCampaignAction('delete')}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Slett kampanje
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totalt sendt</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sent}</div>
              <p className="text-xs text-muted-foreground">
                av {stats.total} mål
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Åpningsrate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{openRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.opened} av {stats.total} åpnet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Klikkrate</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clickRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.clicked} av {stats.total} klikket
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rapportert</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.reported} rapporterte phishing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Details */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Kampanjedetaljer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaign.description && (
                <div>
                  <strong>Beskrivelse:</strong>
                  <p className="text-muted-foreground">{campaign.description}</p>
                </div>
              )}
              <div>
                <strong>E-post emne:</strong>
                <p className="text-muted-foreground">{campaign.template_subject}</p>
              </div>
              <div>
                <strong>Avsender:</strong>
                <p className="text-muted-foreground">
                  {campaign.sender_name} ({campaign.sender_email})
                </p>
              </div>
              {campaign.landing_page_url && (
                <div>
                  <strong>Landing page:</strong>
                  <p className="text-muted-foreground">{campaign.landing_page_url}</p>
                </div>
              )}
              <div>
                <strong>Opprettet:</strong>
                <p className="text-muted-foreground">
                  {new Date(campaign.created_at).toLocaleString('no-NO')}
                </p>
              </div>
              {campaign.start_date && (
                <div>
                  <strong>Starttid:</strong>
                  <p className="text-muted-foreground">
                    {new Date(campaign.start_date).toLocaleString('no-NO')}
                  </p>
                </div>
              )}
              {campaign.end_date && (
                <div>
                  <strong>Sluttid:</strong>
                  <p className="text-muted-foreground">
                    {new Date(campaign.end_date).toLocaleString('no-NO')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>E-post innhold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {campaign.template_body}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Targets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Målresultater</CardTitle>
            <CardDescription>
              Detaljert oversikt over hver ansatts interaksjon med phishing-e-posten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ansatt</TableHead>
                  <TableHead>E-post</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sendt</TableHead>
                  <TableHead>Åpnet</TableHead>
                  <TableHead>Klikket</TableHead>
                  <TableHead>Rapportert</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaign.targets?.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell>
                      <div className="font-medium">
                        {target.employee.first_name} {target.employee.last_name}
                      </div>
                      {target.employee.position && (
                        <div className="text-sm text-muted-foreground">
                          {target.employee.position}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{target.employee.email}</TableCell>
                    <TableCell>{getTargetStatusBadge(target)}</TableCell>
                    <TableCell>
                      {target.email_sent_at
                        ? new Date(target.email_sent_at).toLocaleString('no-NO')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      {target.email_opened_at
                        ? new Date(target.email_opened_at).toLocaleString('no-NO')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      {target.link_clicked_at
                        ? new Date(target.link_clicked_at).toLocaleString('no-NO')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      {target.reported_at
                        ? new Date(target.reported_at).toLocaleString('no-NO')
                        : '-'
                      }
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