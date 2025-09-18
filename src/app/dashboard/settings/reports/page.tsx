'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  BarChart3,
  Download,
  Mail,
  Clock,
  Palette,
  Shield,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  Image,
  TestTube,
  Upload
} from 'lucide-react'

interface ReportSettings {
  automated_reports: {
    enabled: boolean
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
    time: string // HH:MM format
    reports_enabled: string[] // Which report types to include
    recipients: string[]
  }
  export_formats: {
    default_format: 'pdf' | 'excel' | 'csv' | 'json'
    pdf_settings: {
      include_logo: boolean
      color_theme: string
      page_orientation: 'portrait' | 'landscape'
      include_charts: boolean
    }
    excel_settings: {
      include_pivot_tables: boolean
      separate_sheets: boolean
      include_charts: boolean
    }
    csv_settings: {
      delimiter: string
      encoding: string
      include_headers: boolean
    }
  }
  email_settings: {
    sender_name: string
    sender_email: string
    subject_templates: {
      campaign_report: string
      security_report: string
      trend_report: string
    }
    include_attachments: boolean
    html_template: boolean
  }
  dashboard_settings: {
    default_period: string
    kpi_preferences: string[]
    chart_colors: string[]
    comparison_baseline: string
  }
  gdpr_settings: {
    auto_anonymize_exports: boolean
    include_personal_data: boolean
    retention_notice: boolean
    audit_trail: boolean
  }
}

interface ScheduledReport {
  id: string
  name: string
  type: string
  frequency: string
  last_sent: string | null
  recipients: string[]
  enabled: boolean
}

interface ReportTemplate {
  id: string
  name: string
  type: string
  description: string
  created_date: string
  is_default: boolean
}

export default function ReportingSettingsPage() {
  const [settings, setSettings] = useState<ReportSettings>({
    automated_reports: {
      enabled: false,
      frequency: 'weekly',
      time: '09:00',
      reports_enabled: ['campaign_summary', 'security_overview'],
      recipients: []
    },
    export_formats: {
      default_format: 'pdf',
      pdf_settings: {
        include_logo: true,
        color_theme: 'blue',
        page_orientation: 'portrait',
        include_charts: true
      },
      excel_settings: {
        include_pivot_tables: true,
        separate_sheets: true,
        include_charts: true
      },
      csv_settings: {
        delimiter: ',',
        encoding: 'UTF-8',
        include_headers: true
      }
    },
    email_settings: {
      sender_name: 'EvoPhisher Rapporter',
      sender_email: '',
      subject_templates: {
        campaign_report: 'Ukentlig kampanjerapport - {date}',
        security_report: 'Sikkerhetsanalyse - {date}',
        trend_report: 'Trendrapport - {period}'
      },
      include_attachments: true,
      html_template: true
    },
    dashboard_settings: {
      default_period: '30',
      kpi_preferences: ['click_rate', 'report_rate', 'open_rate'],
      chart_colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
      comparison_baseline: 'previous_period'
    },
    gdpr_settings: {
      auto_anonymize_exports: true,
      include_personal_data: false,
      retention_notice: true,
      audit_trail: true
    }
  })
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([])
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>([])
  const [newRecipient, setNewRecipient] = useState('')
  const [showNewRecipient, setShowNewRecipient] = useState(false)
  const [showNewTemplate, setShowNewTemplate] = useState(false)
  const [newTemplate, setNewTemplate] = useState({ name: '', type: '', description: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isTestingSend, setIsTestingSend] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadReportingData()
  }, [])

  const loadReportingData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Set user email as default sender
      setSettings(prev => ({
        ...prev,
        email_settings: {
          ...prev.email_settings,
          sender_email: user.email || ''
        },
        automated_reports: {
          ...prev.automated_reports,
          recipients: [user.email || '']
        }
      }))

      // Load mock scheduled reports
      setScheduledReports([
        {
          id: '1',
          name: 'Ukentlig kampanjeoversikt',
          type: 'campaign_summary',
          frequency: 'weekly',
          last_sent: '2024-01-15T09:00:00Z',
          recipients: [user.email || ''],
          enabled: true
        },
        {
          id: '2',
          name: 'Månedlig sikkerhetsrapport',
          type: 'security_analysis',
          frequency: 'monthly',
          last_sent: '2024-01-01T09:00:00Z',
          recipients: [user.email || '', 'manager@company.com'],
          enabled: true
        },
        {
          id: '3',
          name: 'Kvartalsvis trendanalyse',
          type: 'trend_analysis',
          frequency: 'quarterly',
          last_sent: null,
          recipients: ['leadership@company.com'],
          enabled: false
        }
      ])

      // Load mock report templates
      setReportTemplates([
        {
          id: '1',
          name: 'Standard kampanjerapport',
          type: 'campaign',
          description: 'Oversikt over kampanjeresultater og metrikker',
          created_date: '2024-01-10',
          is_default: true
        },
        {
          id: '2',
          name: 'GDPR compliance rapport',
          type: 'compliance',
          description: 'Persondata-håndtering og compliance-status',
          created_date: '2024-01-12',
          is_default: false
        },
        {
          id: '3',
          name: 'Ledelsessammendrag',
          type: 'executive',
          description: 'Høynivå oversikt for ledelsen',
          created_date: '2024-01-14',
          is_default: false
        }
      ])

    } catch (error) {
      console.error('Error loading reporting data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      // In a real app, this would save to report_settings table
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Rapportinnstillinger lagret' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved lagring av innstillinger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestReport = async () => {
    setIsTestingSend(true)
    setMessage(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setMessage({ type: 'success', text: 'Test-rapport sendt til ' + settings.email_settings.sender_email })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved sending av test-rapport' })
    } finally {
      setIsTestingSend(false)
    }
  }

  const handleAddRecipient = () => {
    if (!newRecipient.trim() || settings.automated_reports.recipients.includes(newRecipient)) return

    setSettings({
      ...settings,
      automated_reports: {
        ...settings.automated_reports,
        recipients: [...settings.automated_reports.recipients, newRecipient]
      }
    })
    setNewRecipient('')
    setShowNewRecipient(false)
    setMessage({ type: 'success', text: 'Mottaker lagt til' })
  }

  const handleRemoveRecipient = (email: string) => {
    setSettings({
      ...settings,
      automated_reports: {
        ...settings.automated_reports,
        recipients: settings.automated_reports.recipients.filter(r => r !== email)
      }
    })
    setMessage({ type: 'success', text: 'Mottaker fjernet' })
  }

  const handleToggleReportType = (reportType: string) => {
    const currentTypes = settings.automated_reports.reports_enabled
    const newTypes = currentTypes.includes(reportType)
      ? currentTypes.filter(t => t !== reportType)
      : [...currentTypes, reportType]

    setSettings({
      ...settings,
      automated_reports: {
        ...settings.automated_reports,
        reports_enabled: newTypes
      }
    })
  }

  const handleToggleScheduledReport = async (reportId: string) => {
    setScheduledReports(scheduledReports.map(report =>
      report.id === reportId ? { ...report, enabled: !report.enabled } : report
    ))
    setMessage({ type: 'success', text: 'Rapport-status oppdatert' })
  }

  const handleDeleteTemplate = async (templateId: string) => {
    setReportTemplates(reportTemplates.filter(template => template.id !== templateId))
    setMessage({ type: 'success', text: 'Mal slettet' })
  }

  const getFrequencyBadge = (frequency: string) => {
    const config = {
      daily: { label: 'Daglig', variant: 'default' as const },
      weekly: { label: 'Ukentlig', variant: 'secondary' as const },
      monthly: { label: 'Månedlig', variant: 'outline' as const },
      quarterly: { label: 'Kvartalsvis', variant: 'outline' as const }
    }
    const { label, variant } = config[frequency as keyof typeof config] || config.weekly
    return <Badge variant={variant}>{label}</Badge>
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/settings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til innstillinger
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rapportering & Eksport</h1>
            <p className="text-muted-foreground">
              Automatiske rapporter, eksportformater og distribusjon
            </p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center">
              {message.type === 'error' && <AlertTriangle className="h-4 w-4 mr-2" />}
              {message.type === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
              {message.text}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Automated Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Automatiske rapporter
              </CardTitle>
              <CardDescription>
                Planlegg automatisk sending av rapporter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aktiver automatiske rapporter</Label>
                  <p className="text-sm text-muted-foreground">
                    Send rapporter automatisk basert på tidsplan
                  </p>
                </div>
                <Switch
                  checked={settings.automated_reports.enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    automated_reports: { ...settings.automated_reports, enabled: checked }
                  })}
                />
              </div>

              {settings.automated_reports.enabled && (
                <>
                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="frequency">Frekvens</Label>
                      <Select value={settings.automated_reports.frequency} onValueChange={(value: any) =>
                        setSettings({...settings, automated_reports: {...settings.automated_reports, frequency: value}})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daglig</SelectItem>
                          <SelectItem value="weekly">Ukentlig</SelectItem>
                          <SelectItem value="monthly">Månedlig</SelectItem>
                          <SelectItem value="quarterly">Kvartalsvis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="time">Tidspunkt</Label>
                      <Input
                        id="time"
                        type="time"
                        value={settings.automated_reports.time}
                        onChange={(e) => setSettings({
                          ...settings,
                          automated_reports: { ...settings.automated_reports, time: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Rapport-typer</Label>
                    <div className="grid gap-2 mt-2">
                      {[
                        { id: 'campaign_summary', label: 'Kampanjeoversikt' },
                        { id: 'security_overview', label: 'Sikkerhetsoversikt' },
                        { id: 'trend_analysis', label: 'Trendanalyse' },
                        { id: 'compliance_report', label: 'Compliance-rapport' }
                      ].map(type => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={type.id}
                            checked={settings.automated_reports.reports_enabled.includes(type.id)}
                            onChange={() => handleToggleReportType(type.id)}
                            className="rounded"
                          />
                          <Label htmlFor={type.id} className="text-sm">{type.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Mottakere</Label>
                      <Dialog open={showNewRecipient} onOpenChange={setShowNewRecipient}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Legg til
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Legg til mottaker</DialogTitle>
                            <DialogDescription>
                              Legg til en e-postadresse som skal motta automatiske rapporter
                            </DialogDescription>
                          </DialogHeader>
                          <div>
                            <Label>E-postadresse</Label>
                            <Input
                              type="email"
                              value={newRecipient}
                              onChange={(e) => setNewRecipient(e.target.value)}
                              placeholder="navn@company.com"
                            />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowNewRecipient(false)}>
                              Avbryt
                            </Button>
                            <Button onClick={handleAddRecipient} disabled={!newRecipient.trim()}>
                              Legg til
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="space-y-2">
                      {settings.automated_reports.recipients.map((email, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRecipient(email)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Export Formats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="mr-2 h-5 w-5" />
                Eksportformater
              </CardTitle>
              <CardDescription>
                Konfigurer standard eksportinnstillinger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="defaultFormat">Standard format</Label>
                <Select value={settings.export_formats.default_format} onValueChange={(value: any) =>
                  setSettings({...settings, export_formats: {...settings.export_formats, default_format: value}})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel (XLSX)</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* PDF Settings */}
              <div>
                <h4 className="font-medium mb-3">PDF-innstillinger</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Inkluder logo</Label>
                    <Switch
                      checked={settings.export_formats.pdf_settings.include_logo}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        export_formats: {
                          ...settings.export_formats,
                          pdf_settings: { ...settings.export_formats.pdf_settings, include_logo: checked }
                        }
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Inkluder diagrammer</Label>
                    <Switch
                      checked={settings.export_formats.pdf_settings.include_charts}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        export_formats: {
                          ...settings.export_formats,
                          pdf_settings: { ...settings.export_formats.pdf_settings, include_charts: checked }
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Sideorientering</Label>
                    <Select value={settings.export_formats.pdf_settings.page_orientation} onValueChange={(value: any) =>
                      setSettings({
                        ...settings,
                        export_formats: {
                          ...settings.export_formats,
                          pdf_settings: { ...settings.export_formats.pdf_settings, page_orientation: value }
                        }
                      })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrett</SelectItem>
                        <SelectItem value="landscape">Landskap</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Excel Settings */}
              <div>
                <h4 className="font-medium mb-3">Excel-innstillinger</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Separate ark</Label>
                    <Switch
                      checked={settings.export_formats.excel_settings.separate_sheets}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        export_formats: {
                          ...settings.export_formats,
                          excel_settings: { ...settings.export_formats.excel_settings, separate_sheets: checked }
                        }
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Pivot-tabeller</Label>
                    <Switch
                      checked={settings.export_formats.excel_settings.include_pivot_tables}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        export_formats: {
                          ...settings.export_formats,
                          excel_settings: { ...settings.export_formats.excel_settings, include_pivot_tables: checked }
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                E-post innstillinger
              </CardTitle>
              <CardDescription>
                Konfigurer e-post for automatiske rapporter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="senderName">Avsender navn</Label>
                <Input
                  id="senderName"
                  value={settings.email_settings.sender_name}
                  onChange={(e) => setSettings({
                    ...settings,
                    email_settings: { ...settings.email_settings, sender_name: e.target.value }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="senderEmail">Avsender e-post</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={settings.email_settings.sender_email}
                  onChange={(e) => setSettings({
                    ...settings,
                    email_settings: { ...settings.email_settings, sender_email: e.target.value }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="campaignSubject">Emne: Kampanjerapport</Label>
                <Input
                  id="campaignSubject"
                  value={settings.email_settings.subject_templates.campaign_report}
                  onChange={(e) => setSettings({
                    ...settings,
                    email_settings: {
                      ...settings.email_settings,
                      subject_templates: {
                        ...settings.email_settings.subject_templates,
                        campaign_report: e.target.value
                      }
                    }
                  })}
                  placeholder="Bruk {date} for dato"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inkluder vedlegg</Label>
                  <p className="text-sm text-muted-foreground">
                    Legg ved detaljerte data som PDF/Excel
                  </p>
                </div>
                <Switch
                  checked={settings.email_settings.include_attachments}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    email_settings: { ...settings.email_settings, include_attachments: checked }
                  })}
                />
              </div>

              <Button onClick={handleTestReport} disabled={isTestingSend} className="w-full">
                <TestTube className="mr-2 h-4 w-4" />
                {isTestingSend ? 'Sender test...' : 'Send test-rapport'}
              </Button>
            </CardContent>
          </Card>

          {/* GDPR Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                GDPR & Compliance
              </CardTitle>
              <CardDescription>
                Persondata-håndtering i rapporter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatisk anonymisering</Label>
                  <p className="text-sm text-muted-foreground">
                    Anonymiser persondata i eksporter
                  </p>
                </div>
                <Switch
                  checked={settings.gdpr_settings.auto_anonymize_exports}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    gdpr_settings: { ...settings.gdpr_settings, auto_anonymize_exports: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inkluder persondata</Label>
                  <p className="text-sm text-muted-foreground">
                    Tillat persondata i detaljerte rapporter
                  </p>
                </div>
                <Switch
                  checked={settings.gdpr_settings.include_personal_data}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    gdpr_settings: { ...settings.gdpr_settings, include_personal_data: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lagrings-notis</Label>
                  <p className="text-sm text-muted-foreground">
                    Inkluder informasjon om datalagring
                  </p>
                </div>
                <Switch
                  checked={settings.gdpr_settings.retention_notice}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    gdpr_settings: { ...settings.gdpr_settings, retention_notice: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Revisjonsspor</Label>
                  <p className="text-sm text-muted-foreground">
                    Logg alle eksport-aktiviteter
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.gdpr_settings.audit_trail}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      gdpr_settings: { ...settings.gdpr_settings, audit_trail: checked }
                    })}
                  />
                  {settings.gdpr_settings.audit_trail && (
                    <Badge variant="default" className="bg-green-500">
                      <Shield className="h-3 w-3 mr-1" />
                      Aktiv
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Planlagte rapporter
            </CardTitle>
            <CardDescription>
              Oversikt over automatiske rapporter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Navn</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Frekvens</TableHead>
                  <TableHead>Sist sendt</TableHead>
                  <TableHead>Mottakere</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {getFrequencyBadge(report.frequency)}
                    </TableCell>
                    <TableCell>
                      {report.last_sent
                        ? new Date(report.last_sent).toLocaleDateString('no-NO')
                        : 'Aldri'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {report.recipients.length} mottaker(e)
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={report.enabled ? 'default' : 'secondary'}>
                        {report.enabled ? 'Aktiv' : 'Deaktivert'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleScheduledReport(report.id)}
                        >
                          {report.enabled ? 'Stopp' : 'Start'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Rapportmaler
                </CardTitle>
                <CardDescription>
                  Administrer maler for forskjellige rapport-typer
                </CardDescription>
              </div>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Last opp logo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Navn</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Beskrivelse</TableHead>
                  <TableHead>Opprettet</TableHead>
                  <TableHead>Standard</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{template.type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{template.description}</TableCell>
                    <TableCell>
                      {new Date(template.created_date).toLocaleDateString('no-NO')}
                    </TableCell>
                    <TableCell>
                      {template.is_default && (
                        <Badge variant="default">Standard</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {!template.is_default && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/settings">Avbryt</Link>
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Lagrer...' : 'Lagre alle innstillinger'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}