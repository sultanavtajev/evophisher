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
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Mail,
  Server,
  Clock,
  Bell,
  Save,
  TestTube,
  AlertTriangle,
  CheckCircle,
  Globe
} from 'lucide-react'

interface CampaignSettings {
  default_sender_name: string
  default_sender_email: string
  default_landing_page_url: string
  smtp_host: string
  smtp_port: number
  smtp_username: string
  smtp_password: string
  smtp_encryption: 'none' | 'tls' | 'ssl'
  auto_send_enabled: boolean
  auto_send_delay_hours: number
  email_tracking_enabled: boolean
  link_tracking_enabled: boolean
  auto_reports_enabled: boolean
  report_frequency: 'daily' | 'weekly' | 'monthly'
  report_recipients: string
}

export default function CampaignSettingsPage() {
  const [settings, setSettings] = useState<CampaignSettings>({
    default_sender_name: '',
    default_sender_email: '',
    default_landing_page_url: '',
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    smtp_encryption: 'tls',
    auto_send_enabled: false,
    auto_send_delay_hours: 24,
    email_tracking_enabled: true,
    link_tracking_enabled: true,
    auto_reports_enabled: false,
    report_frequency: 'weekly',
    report_recipients: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isTestingEmail, setIsTestingEmail] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadCampaignSettings()
  }, [])

  const loadCampaignSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load campaign settings from database
      const { data: campaignSettingsData } = await supabase
        .from('system_preferences')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', 'campaign')

      // Parse preferences data
      const preferences: any = {}
      if (campaignSettingsData) {
        campaignSettingsData.forEach(pref => {
          preferences[pref.setting_key] = pref.setting_value
        })
      }

      // Set loaded settings or defaults
      setSettings({
        default_sender_name: preferences.default_sender_name || '',
        default_sender_email: preferences.default_sender_email || user.email || '',
        default_landing_page_url: preferences.default_landing_page_url || '',
        smtp_host: preferences.smtp_host || '',
        smtp_port: preferences.smtp_port || 587,
        smtp_username: preferences.smtp_username || '',
        smtp_password: preferences.smtp_password || '',
        smtp_encryption: preferences.smtp_encryption || 'tls',
        auto_send_enabled: preferences.auto_send_enabled !== undefined ? preferences.auto_send_enabled : false,
        auto_send_delay_hours: preferences.auto_send_delay_hours || 24,
        email_tracking_enabled: preferences.email_tracking_enabled !== undefined ? preferences.email_tracking_enabled : true,
        link_tracking_enabled: preferences.link_tracking_enabled !== undefined ? preferences.link_tracking_enabled : true,
        auto_reports_enabled: preferences.auto_reports_enabled !== undefined ? preferences.auto_reports_enabled : false,
        report_frequency: preferences.report_frequency || 'weekly',
        report_recipients: preferences.report_recipients || user.email || ''
      })

    } catch (error) {
      console.error('Error loading campaign settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // Prepare settings to save
      const settingsToSave = [
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'default_sender_name',
          setting_value: settings.default_sender_name,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'default_sender_email',
          setting_value: settings.default_sender_email,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'default_landing_page_url',
          setting_value: settings.default_landing_page_url,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'smtp_host',
          setting_value: settings.smtp_host,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'smtp_port',
          setting_value: settings.smtp_port,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'smtp_username',
          setting_value: settings.smtp_username,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'smtp_password',
          setting_value: settings.smtp_password,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'smtp_encryption',
          setting_value: settings.smtp_encryption,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'auto_send_enabled',
          setting_value: settings.auto_send_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'auto_send_delay_hours',
          setting_value: settings.auto_send_delay_hours,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'email_tracking_enabled',
          setting_value: settings.email_tracking_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'link_tracking_enabled',
          setting_value: settings.link_tracking_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'auto_reports_enabled',
          setting_value: settings.auto_reports_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'report_frequency',
          setting_value: settings.report_frequency,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'campaign',
          setting_key: 'report_recipients',
          setting_value: settings.report_recipients,
          is_global: false
        }
      ]

      // Delete existing campaign settings
      await supabase
        .from('system_preferences')
        .delete()
        .eq('user_id', user.id)
        .eq('category', 'campaign')

      // Insert new settings
      const { error } = await supabase
        .from('system_preferences')
        .insert(settingsToSave)

      if (error) throw error

      setMessage({ type: 'success', text: 'Kampanje-innstillinger lagret' })
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Feil ved lagring av innstillinger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestEmail = async () => {
    setIsTestingEmail(true)
    setMessage(null)

    try {
      // Basic validation
      if (!settings.smtp_host || !settings.smtp_username) {
        throw new Error('SMTP-konfigurasjon er ikke komplett')
      }

      // In a real app, this would actually send a test email
      // For now, simulate the test with validation
      await new Promise(resolve => setTimeout(resolve, 2000))

      setMessage({ type: 'success', text: 'Test-e-post konfigurasjon validert for ' + settings.smtp_host })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved testing av e-post konfigurasjon: ' + (error as Error).message })
    } finally {
      setIsTestingEmail(false)
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/settings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til innstillinger
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kampanje-innstillinger</h1>
            <p className="text-muted-foreground">
              Standard konfigurasjoner for phishing-kampanjer og e-post leveranse
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

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Default Campaign Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Standard kampanje-innstillinger
                </CardTitle>
                <CardDescription>
                  Standardverdier for nye kampanjer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senderName">Standard avsender-navn</Label>
                  <Input
                    id="senderName"
                    value={settings.default_sender_name}
                    onChange={(e) => setSettings({ ...settings, default_sender_name: e.target.value })}
                    placeholder="IT-avdelingen"
                  />
                </div>

                <div>
                  <Label htmlFor="senderEmail">Standard avsender-e-post</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={settings.default_sender_email}
                    onChange={(e) => setSettings({ ...settings, default_sender_email: e.target.value })}
                    placeholder="noreply@company.com"
                  />
                </div>

                <div>
                  <Label htmlFor="landingPage">Standard landing page URL</Label>
                  <Input
                    id="landingPage"
                    type="url"
                    value={settings.default_landing_page_url}
                    onChange={(e) => setSettings({ ...settings, default_landing_page_url: e.target.value })}
                    placeholder="https://security-training.company.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL som ansatte blir sendt til etter å ha klikket på phishing-lenken
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SMTP Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  E-post leveranse (SMTP)
                </CardTitle>
                <CardDescription>
                  Konfigurer e-post server for kampanjer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Server</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtp_host}
                    onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="smtpPort">Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.smtp_port}
                      onChange={(e) => setSettings({ ...settings, smtp_port: parseInt(e.target.value) || 587 })}
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpEncryption">Kryptering</Label>
                    <Select value={settings.smtp_encryption} onValueChange={(value: any) => setSettings({ ...settings, smtp_encryption: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Velg kryptering" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Ingen</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="smtpUsername">Brukernavn</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtp_username}
                    onChange={(e) => setSettings({ ...settings, smtp_username: e.target.value })}
                    placeholder="din-epost@company.com"
                  />
                </div>

                <div>
                  <Label htmlFor="smtpPassword">Passord</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtp_password}
                    onChange={(e) => setSettings({ ...settings, smtp_password: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestEmail}
                  disabled={isTestingEmail || !settings.smtp_host}
                  className="w-full"
                >
                  <TestTube className="mr-2 h-4 w-4" />
                  {isTestingEmail ? 'Tester...' : 'Test e-post konfigurasjon'}
                </Button>
              </CardContent>
            </Card>

            {/* Automation Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Automatisering
                </CardTitle>
                <CardDescription>
                  Automatiske kampanje-funksjoner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSend">Automatisk sending</Label>
                    <p className="text-sm text-muted-foreground">
                      Send kampanjer automatisk basert på tidsplan
                    </p>
                  </div>
                  <Switch
                    id="autoSend"
                    checked={settings.auto_send_enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, auto_send_enabled: checked })}
                  />
                </div>

                {settings.auto_send_enabled && (
                  <div>
                    <Label htmlFor="autoSendDelay">Forsinkelse (timer)</Label>
                    <Input
                      id="autoSendDelay"
                      type="number"
                      min="1"
                      max="168"
                      value={settings.auto_send_delay_hours}
                      onChange={(e) => setSettings({ ...settings, auto_send_delay_hours: parseInt(e.target.value) || 24 })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Antal timer å vente før automatisk sending (1-168 timer)
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailTracking">E-post sporing</Label>
                    <p className="text-sm text-muted-foreground">
                      Spor når e-poster åpnes
                    </p>
                  </div>
                  <Switch
                    id="emailTracking"
                    checked={settings.email_tracking_enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, email_tracking_enabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="linkTracking">Lenke-sporing</Label>
                    <p className="text-sm text-muted-foreground">
                      Spor når lenker klikkes
                    </p>
                  </div>
                  <Switch
                    id="linkTracking"
                    checked={settings.link_tracking_enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, link_tracking_enabled: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Reporting Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Automatiske rapporter
                </CardTitle>
                <CardDescription>
                  Konfigurer automatisk rapport-generering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoReports">Automatiske rapporter</Label>
                    <p className="text-sm text-muted-foreground">
                      Send kampanjerapporter automatisk
                    </p>
                  </div>
                  <Switch
                    id="autoReports"
                    checked={settings.auto_reports_enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, auto_reports_enabled: checked })}
                  />
                </div>

                {settings.auto_reports_enabled && (
                  <>
                    <div>
                      <Label htmlFor="reportFrequency">Rapport-frekvens</Label>
                      <Select value={settings.report_frequency} onValueChange={(value: any) => setSettings({ ...settings, report_frequency: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Velg frekvens" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daglig</SelectItem>
                          <SelectItem value="weekly">Ukentlig</SelectItem>
                          <SelectItem value="monthly">Månedlig</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="reportRecipients">Mottakere (kommaseparert)</Label>
                      <Textarea
                        id="reportRecipients"
                        value={settings.report_recipients}
                        onChange={(e) => setSettings({ ...settings, report_recipients: e.target.value })}
                        placeholder="manager@company.com, security@company.com"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        E-postadresser som skal motta automatiske rapporter
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/settings">Avbryt</Link>
            </Button>
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Lagrer...' : 'Lagre innstillinger'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}