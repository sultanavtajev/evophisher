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
import { PhishingCampaign, Company } from '@/lib/types/database'
import { Plus, Mail, MoreHorizontal, Eye, Play, Pause, Square, SkipForward, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SeedCampaignsComponent } from './seed-campaigns'

interface CampaignWithCompany extends PhishingCampaign {
  company_name?: string
  target_count?: number
  click_count?: number
}

type CampaignStatus = 'all' | 'draft' | 'active' | 'completed' | 'paused'

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignWithCompany[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<CampaignWithCompany[]>([])
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCampaigns()
  }, [])

  useEffect(() => {
    filterCampaigns()
  }, [selectedStatus, campaigns])

  const loadCampaigns = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('phishing_campaigns')
        .select(`
          *,
          companies!inner(name, user_id),
          phishing_targets(
            id,
            link_clicked_at
          )
        `)
        .eq('companies.user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading campaigns:', error)
        return
      }

      const campaignsWithStats = (data || []).map(campaign => ({
        ...campaign,
        company_name: campaign.companies?.name,
        target_count: campaign.phishing_targets?.length || 0,
        click_count: campaign.phishing_targets?.filter(t => t.link_clicked_at !== null).length || 0
      }))

      setCampaigns(campaignsWithStats)
    } catch (error) {
      console.error('Error loading campaigns:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterCampaigns = () => {
    if (selectedStatus === 'all') {
      setFilteredCampaigns(campaigns)
    } else {
      setFilteredCampaigns(campaigns.filter(campaign => campaign.status === selectedStatus))
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

  const handleCampaignAction = async (campaignId: string, action: 'start' | 'pause' | 'resume' | 'stop') => {
    try {
      if (action === 'stop') {
        const campaign = campaigns.find(c => c.id === campaignId)
        if (!confirm(`Er du sikker på at du vil stoppe kampanjen "${campaign?.name}"? Dette vil markere den som fullført.`)) {
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
        .eq('id', campaignId)

      if (error) {
        console.error('Error updating campaign:', error)
        alert('Feil ved oppdatering av kampanje')
        return
      }

      loadCampaigns()
    } catch (error) {
      console.error('Error updating campaign:', error)
      alert('En uventet feil oppstod')
    }
  }

  const handleDeleteCampaign = async (campaignId: string, campaignName: string) => {
    if (!confirm(`Er du sikker på at du vil slette kampanjen "${campaignName}"? Dette kan ikke angres.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('phishing_campaigns')
        .delete()
        .eq('id', campaignId)

      if (error) {
        console.error('Error deleting campaign:', error)
        alert('Feil ved sletting av kampanje')
        return
      }

      loadCampaigns()
    } catch (error) {
      console.error('Error deleting campaign:', error)
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

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Phishing-kampanjer</h1>
            <p className="text-muted-foreground">
              Administrer og overvåk dine phishing-tester
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/campaigns/new">
              <Plus className="mr-2 h-4 w-4" />
              Ny kampanje
            </Link>
          </Button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium">Filtrer etter status:</label>
          <Select value={selectedStatus} onValueChange={(value: CampaignStatus) => setSelectedStatus(value)}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Alle statuser" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statuser</SelectItem>
              <SelectItem value="draft">Utkast</SelectItem>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="completed">Fullført</SelectItem>
              <SelectItem value="paused">Pauset</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredCampaigns.length === 0 && campaigns.length === 0 ? (
          <div className="space-y-6">
            <SeedCampaignsComponent />
            <Card>
              <CardContent className="text-center py-12">
                <Mail className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ingen kampanjer ennå</h3>
                <p className="text-muted-foreground mb-6">
                  Start med å opprette din første phishing-kampanje
                </p>
                <Button asChild>
                  <Link href="/dashboard/campaigns/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Opprett kampanje
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen kampanjer funnet</h3>
              <p className="text-muted-foreground mb-6">
                Ingen kampanjer matcher det valgte filteret.
              </p>
              <Button variant="outline" onClick={() => setSelectedStatus('all')}>
                Vis alle kampanjer
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Kampanjeoversikt</CardTitle>
              <CardDescription>
                {filteredCampaigns.length} kampanje{filteredCampaigns.length !== 1 ? 'r' : ''}
                {selectedStatus !== 'all' ? ` med status "${selectedStatus}"` : ' totalt'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>Bedrift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mål</TableHead>
                    <TableHead>Klikkrate</TableHead>
                    <TableHead>Opprettet</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="font-medium">{campaign.name}</div>
                        {campaign.description && (
                          <div className="text-sm text-muted-foreground">
                            {campaign.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{campaign.company_name}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>{campaign.target_count}</TableCell>
                      <TableCell>
                        {campaign.target_count > 0
                          ? `${Math.round((campaign.click_count / campaign.target_count) * 100)}%`
                          : '-'
                        }
                      </TableCell>
                      <TableCell>
                        {new Date(campaign.created_at).toLocaleDateString('no-NO')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/campaigns/${campaign.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Vis detaljer
                              </Link>
                            </DropdownMenuItem>
                            {campaign.status === 'draft' && (
                              <DropdownMenuItem onClick={() => handleCampaignAction(campaign.id, 'start')}>
                                <Play className="mr-2 h-4 w-4" />
                                Start kampanje
                              </DropdownMenuItem>
                            )}
                            {campaign.status === 'active' && (
                              <>
                                <DropdownMenuItem onClick={() => handleCampaignAction(campaign.id, 'pause')}>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause kampanje
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCampaignAction(campaign.id, 'stop')}>
                                  <Square className="mr-2 h-4 w-4" />
                                  Stopp kampanje
                                </DropdownMenuItem>
                              </>
                            )}
                            {campaign.status === 'paused' && (
                              <>
                                <DropdownMenuItem onClick={() => handleCampaignAction(campaign.id, 'resume')}>
                                  <SkipForward className="mr-2 h-4 w-4" />
                                  Fortsett kampanje
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCampaignAction(campaign.id, 'stop')}>
                                  <Square className="mr-2 h-4 w-4" />
                                  Stopp kampanje
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteCampaign(campaign.id, campaign.name)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Slett
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}