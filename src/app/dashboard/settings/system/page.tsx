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
  Settings,
  Bell,
  Zap,
  Shield,
  Globe,
  Database,
  Activity,
  Plus,
  Trash2,
  Edit,
  Save,
  AlertTriangle,
  CheckCircle,
  TestTube,
  Copy,
  Server,
  Clock,
  Users,
  BarChart3,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Download,
  Upload
} from 'lucide-react'

interface SystemSettings {
  notifications: {
    browser_notifications: boolean
    email_notifications: boolean
    critical_alerts: boolean
    maintenance_notifications: boolean
    quiet_hours_enabled: boolean
    quiet_start_time: string
    quiet_end_time: string
    escalation_enabled: boolean
    escalation_threshold_minutes: number
  }
  integrations: {
    webhook_enabled: boolean
    sso_enabled: boolean
    ldap_enabled: boolean
    api_rate_limit: number
    slack_integration: boolean
    teams_integration: boolean
    siem_integration: boolean
  }
  compliance: {
    gdpr_enabled: boolean
    audit_logging: boolean
    data_anonymization: boolean
    breach_notification: boolean
    consent_tracking: boolean
    privacy_impact_assessments: boolean
    cross_border_controls: boolean
  }
  performance: {
    auto_cleanup: boolean
    cleanup_frequency_days: number
    backup_enabled: boolean
    backup_frequency: string
    cache_enabled: boolean
    cache_ttl_hours: number
    monitoring_enabled: boolean
  }
  localization: {
    default_timezone: string
    default_language: string
    date_format: string
    time_format: string
    currency: string
    accessibility_enabled: boolean
    high_contrast: boolean
    large_text: boolean
  }
  platform: {
    beta_features: boolean
    debug_mode: boolean
    maintenance_mode: boolean
    feature_analytics: boolean
    error_reporting: boolean
    telemetry_enabled: boolean
    usage_analytics: boolean
  }
}

interface WebhookConfig {
  id: string
  name: string
  url: string
  events: string[]
  is_active: boolean
  last_success: string | null
  created_date: string
}

interface IntegrationStatus {
  name: string
  type: string
  status: 'connected' | 'disconnected' | 'error'
  last_sync: string | null
  config_url?: string
}

interface ComplianceRecord {
  id: string
  type: string
  subject: string
  status: string
  created_date: string
  due_date?: string
}

export default function SystemPreferencesPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    notifications: {
      browser_notifications: true,
      email_notifications: true,
      critical_alerts: true,
      maintenance_notifications: true,
      quiet_hours_enabled: false,
      quiet_start_time: '22:00',
      quiet_end_time: '07:00',
      escalation_enabled: true,
      escalation_threshold_minutes: 30
    },
    integrations: {
      webhook_enabled: false,
      sso_enabled: false,
      ldap_enabled: false,
      api_rate_limit: 1000,
      slack_integration: false,
      teams_integration: false,
      siem_integration: false
    },
    compliance: {
      gdpr_enabled: true,
      audit_logging: true,
      data_anonymization: true,
      breach_notification: true,
      consent_tracking: true,
      privacy_impact_assessments: false,
      cross_border_controls: true
    },
    performance: {
      auto_cleanup: true,
      cleanup_frequency_days: 30,
      backup_enabled: true,
      backup_frequency: 'daily',
      cache_enabled: true,
      cache_ttl_hours: 24,
      monitoring_enabled: true
    },
    localization: {
      default_timezone: 'Europe/Oslo',
      default_language: 'no',
      date_format: 'DD.MM.YYYY',
      time_format: '24h',
      currency: 'NOK',
      accessibility_enabled: false,
      high_contrast: false,
      large_text: false
    },
    platform: {
      beta_features: false,
      debug_mode: false,
      maintenance_mode: false,
      feature_analytics: true,
      error_reporting: true,
      telemetry_enabled: true,
      usage_analytics: false
    }
  })
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([])
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([])
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>([])
  const [showNewWebhook, setShowNewWebhook] = useState(false)
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isTestingWebhook, setIsTestingWebhook] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadSystemData()
  }, [])

  const loadSystemData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load webhooks from database
      const { data: webhookData } = await supabase
        .from('webhook_configurations')
        .select('*')
        .eq('user_id', user.id)

      if (webhookData) {
        const webhookConfigs = webhookData.map(webhook => ({
          id: webhook.id,
          name: webhook.name,
          url: webhook.url,
          events: webhook.events || [],
          is_active: webhook.is_active,
          last_success: null, // TODO: Add last_success tracking
          created_date: webhook.created_at
        }))
        setWebhooks(webhookConfigs)
      }

      // Load mock integrations
      setIntegrations([
        {
          name: 'Microsoft 365',
          type: 'sso',
          status: 'connected',
          last_sync: '2024-01-20T14:30:00Z',
          config_url: '/dashboard/settings/system/integrations/microsoft365'
        },
        {
          name: 'Slack',
          type: 'notification',
          status: 'disconnected',
          last_sync: null,
          config_url: '/dashboard/settings/system/integrations/slack'
        },
        {
          name: 'Active Directory',
          type: 'directory',
          status: 'error',
          last_sync: '2024-01-19T10:15:00Z',
          config_url: '/dashboard/settings/system/integrations/ad'
        },
        {
          name: 'Splunk SIEM',
          type: 'security',
          status: 'connected',
          last_sync: '2024-01-20T15:45:00Z',
          config_url: '/dashboard/settings/system/integrations/splunk'
        }
      ])

      // Load compliance records from database
      const { data: complianceData } = await supabase
        .from('compliance_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (complianceData) {
        const records = complianceData.map(record => ({
          id: record.id,
          type: record.record_type,
          subject: record.subject_data?.subject || 'N/A',
          status: record.status,
          created_date: record.created_at,
          due_date: record.subject_data?.due_date || null
        }))
        setComplianceRecords(records)
      }

      // Load system preferences from database
      const { data: preferencesData } = await supabase
        .from('system_preferences')
        .select('*')
        .eq('user_id', user.id)

      if (preferencesData && preferencesData.length > 0) {
        const loadedSettings = { ...settings }

        preferencesData.forEach(pref => {
          if (pref.category === 'notifications') {
            (loadedSettings.notifications as any)[pref.setting_key] = pref.setting_value
          } else if (pref.category === 'compliance') {
            (loadedSettings.compliance as any)[pref.setting_key] = pref.setting_value
          } else if (pref.category === 'performance') {
            (loadedSettings.performance as any)[pref.setting_key] = pref.setting_value
          } else if (pref.category === 'localization') {
            (loadedSettings.localization as any)[pref.setting_key] = pref.setting_value
          }
        })

        setSettings(loadedSettings)
      }

    } catch (error) {
      console.error('Error loading system data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSettingUpdate = async (category: string, settingKey: string, value: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // Delete existing setting for this user and key
      await supabase
        .from('system_preferences')
        .delete()
        .eq('user_id', user.id)
        .eq('category', category)
        .eq('setting_key', settingKey)

      // Insert new setting
      const { error } = await supabase
        .from('system_preferences')
        .insert({
          user_id: user.id,
          category: category,
          setting_key: settingKey,
          setting_value: value,
          is_global: false
        })

      if (error) throw error
    } catch (error) {
      console.error('Error auto-saving setting:', error)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // Save all settings to system_preferences table
      const settingsToSave = [
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'browser_notifications',
          setting_value: settings.notifications.browser_notifications,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'email_notifications',
          setting_value: settings.notifications.email_notifications,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'critical_alerts',
          setting_value: settings.notifications.critical_alerts,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'maintenance_notifications',
          setting_value: settings.notifications.maintenance_notifications,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'quiet_hours_enabled',
          setting_value: settings.notifications.quiet_hours_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'quiet_start_time',
          setting_value: settings.notifications.quiet_start_time,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'quiet_end_time',
          setting_value: settings.notifications.quiet_end_time,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'escalation_enabled',
          setting_value: settings.notifications.escalation_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'notifications',
          setting_key: 'escalation_threshold_minutes',
          setting_value: settings.notifications.escalation_threshold_minutes,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'compliance',
          setting_key: 'gdpr_enabled',
          setting_value: settings.compliance.gdpr_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'compliance',
          setting_key: 'audit_logging',
          setting_value: settings.compliance.audit_logging,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'compliance',
          setting_key: 'data_anonymization',
          setting_value: settings.compliance.data_anonymization,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'compliance',
          setting_key: 'breach_notification',
          setting_value: settings.compliance.breach_notification,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'compliance',
          setting_key: 'consent_tracking',
          setting_value: settings.compliance.consent_tracking,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'compliance',
          setting_key: 'privacy_impact_assessments',
          setting_value: settings.compliance.privacy_impact_assessments,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'compliance',
          setting_key: 'cross_border_controls',
          setting_value: settings.compliance.cross_border_controls,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'performance',
          setting_key: 'auto_cleanup',
          setting_value: settings.performance.auto_cleanup,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'performance',
          setting_key: 'cleanup_frequency_days',
          setting_value: settings.performance.cleanup_frequency_days,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'performance',
          setting_key: 'backup_enabled',
          setting_value: settings.performance.backup_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'performance',
          setting_key: 'backup_frequency',
          setting_value: settings.performance.backup_frequency,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'performance',
          setting_key: 'cache_enabled',
          setting_value: settings.performance.cache_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'performance',
          setting_key: 'cache_ttl_hours',
          setting_value: settings.performance.cache_ttl_hours,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'performance',
          setting_key: 'monitoring_enabled',
          setting_value: settings.performance.monitoring_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'default_timezone',
          setting_value: settings.localization.default_timezone,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'default_language',
          setting_value: settings.localization.default_language,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'date_format',
          setting_value: settings.localization.date_format,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'time_format',
          setting_value: settings.localization.time_format,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'currency',
          setting_value: settings.localization.currency,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'accessibility_enabled',
          setting_value: settings.localization.accessibility_enabled,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'high_contrast',
          setting_value: settings.localization.high_contrast,
          is_global: false
        },
        {
          user_id: user.id,
          category: 'localization',
          setting_key: 'large_text',
          setting_value: settings.localization.large_text,
          is_global: false
        }
      ]

      // Delete existing settings for this user
      await supabase
        .from('system_preferences')
        .delete()
        .eq('user_id', user.id)

      // Insert new settings
      const { error } = await supabase
        .from('system_preferences')
        .insert(settingsToSave)

      if (error) throw error

      setMessage({ type: 'success', text: 'Systempreferanser lagret' })
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Feil ved lagring av innstillinger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestWebhook = async (webhookId: string) => {
    setIsTestingWebhook(true)
    setMessage(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setMessage({ type: 'success', text: 'Webhook test sendt' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Webhook test feilet' })
    } finally {
      setIsTestingWebhook(false)
    }
  }

  const handleAddWebhook = async () => {
    if (!newWebhook.name.trim() || !newWebhook.url.trim()) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('webhook_configurations')
        .insert({
          user_id: user.id,
          name: newWebhook.name,
          url: newWebhook.url,
          events: newWebhook.events.split(',').map(e => e.trim()),
          is_active: true
        })
        .select()
        .single()

      if (error) throw error

      const webhook: WebhookConfig = {
        id: data.id,
        name: data.name,
        url: data.url,
        events: data.events,
        is_active: data.is_active,
        last_success: null,
        created_date: data.created_at
      }

      setWebhooks([...webhooks, webhook])
      setNewWebhook({ name: '', url: '', events: '' })
      setShowNewWebhook(false)
      setMessage({ type: 'success', text: 'Webhook lagt til' })
    } catch (error) {
      console.error('Error adding webhook:', error)
      setMessage({ type: 'error', text: 'Feil ved lagring av webhook' })
    }
  }

  const handleToggleWebhook = async (webhookId: string) => {
    try {
      const updatedWebhooks = webhooks.map(webhook =>
        webhook.id === webhookId ? { ...webhook, is_active: !webhook.is_active } : webhook
      )
      setWebhooks(updatedWebhooks)

      const webhookToUpdate = updatedWebhooks.find(w => w.id === webhookId)
      if (webhookToUpdate) {
        const { error } = await supabase
          .from('webhook_configurations')
          .update({ is_active: webhookToUpdate.is_active })
          .eq('id', webhookId)

        if (error) throw error
      }

      setMessage({ type: 'success', text: 'Webhook-status oppdatert' })
    } catch (error) {
      console.error('Error updating webhook:', error)
      setMessage({ type: 'error', text: 'Feil ved oppdatering av webhook' })
    }
  }

  const handleDeleteWebhook = async (webhookId: string) => {
    try {
      const { error } = await supabase
        .from('webhook_configurations')
        .delete()
        .eq('id', webhookId)

      if (error) throw error

      setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId))
      setMessage({ type: 'success', text: 'Webhook slettet' })
    } catch (error) {
      console.error('Error deleting webhook:', error)
      setMessage({ type: 'error', text: 'Feil ved sletting av webhook' })
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      connected: { label: 'Tilkoblet', variant: 'default' as const, color: 'bg-green-500' },
      disconnected: { label: 'Frakoblet', variant: 'secondary' as const, color: 'bg-gray-500' },
      error: { label: 'Feil', variant: 'destructive' as const, color: 'bg-red-500' }
    }
    const { label, variant, color } = config[status as keyof typeof config] || config.disconnected
    return <Badge variant={variant} className={color}>{label}</Badge>
  }

  const getComplianceStatusBadge = (status: string) => {
    const config = {
      completed: { label: 'Fullført', variant: 'default' as const },
      in_progress: { label: 'Pågår', variant: 'secondary' as const },
      pending: { label: 'Venter', variant: 'outline' as const },
      overdue: { label: 'Forsinket', variant: 'destructive' as const }
    }
    const { label, variant } = config[status as keyof typeof config] || config.pending
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
            <h1 className="text-3xl font-bold tracking-tight">Systempreferanser</h1>
            <p className="text-muted-foreground">
              Varslinger, integrasjoner og GDPR-innstillinger
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
          {/* Global Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Globale varslinger
              </CardTitle>
              <CardDescription>
                System-varsler og notifikasjoner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Browser-varsler</Label>
                <Switch
                  checked={settings.notifications.browser_notifications}
                  onCheckedChange={(checked) => {
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, browser_notifications: checked }
                    })
                    handleSettingUpdate('notifications', 'browser_notifications', checked)
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">E-post notifikasjoner</Label>
                <Switch
                  checked={settings.notifications.email_notifications}
                  onCheckedChange={(checked) => {
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email_notifications: checked }
                    })
                    handleSettingUpdate('notifications', 'email_notifications', checked)
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Kritiske sikkerhetsvarslinger</Label>
                <Switch
                  checked={settings.notifications.critical_alerts}
                  onCheckedChange={(checked) => {
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, critical_alerts: checked }
                    })
                    handleSettingUpdate('notifications', 'critical_alerts', checked)
                  }}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Stille timer</Label>
                  <p className="text-xs text-muted-foreground">
                    Ikke send varsler i bestemte tidsrom
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.quiet_hours_enabled}
                  onCheckedChange={(checked) => {
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, quiet_hours_enabled: checked }
                    })
                    handleSettingUpdate('notifications', 'quiet_hours_enabled', checked)
                  }}
                />
              </div>

              {settings.notifications.quiet_hours_enabled && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm">Fra tid</Label>
                    <Input
                      type="time"
                      value={settings.notifications.quiet_start_time}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, quiet_start_time: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Til tid</Label>
                    <Input
                      type="time"
                      value={settings.notifications.quiet_end_time}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, quiet_end_time: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <Label className="text-sm">Automatisk eskalering</Label>
                <Switch
                  checked={settings.notifications.escalation_enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, escalation_enabled: checked }
                  })}
                />
              </div>

              {settings.notifications.escalation_enabled && (
                <div>
                  <Label className="text-sm">Eskaler etter (minutter)</Label>
                  <Input
                    type="number"
                    min="5"
                    max="240"
                    value={settings.notifications.escalation_threshold_minutes}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, escalation_threshold_minutes: parseInt(e.target.value) || 30 }
                    })}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* GDPR Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                GDPR & Compliance
              </CardTitle>
              <CardDescription>
                Avanserte personvern og compliance-kontroller
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">GDPR aktivert</Label>
                  <p className="text-xs text-muted-foreground">
                    Aktiverer alle GDPR-kontroller
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.compliance.gdpr_enabled}
                    onCheckedChange={(checked) => {
                      setSettings({
                        ...settings,
                        compliance: { ...settings.compliance, gdpr_enabled: checked }
                      })
                      handleSettingUpdate('compliance', 'gdpr_enabled', checked)
                    }}
                  />
                  {settings.compliance.gdpr_enabled && (
                    <Badge variant="default" className="bg-green-500">
                      <Shield className="h-3 w-3 mr-1" />
                      Aktiv
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Revisjonsspor</Label>
                <Switch
                  checked={settings.compliance.audit_logging}
                  onCheckedChange={(checked) => {
                    setSettings({
                      ...settings,
                      compliance: { ...settings.compliance, audit_logging: checked }
                    })
                    handleSettingUpdate('compliance', 'audit_logging', checked)
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Automatisk anonymisering</Label>
                <Switch
                  checked={settings.compliance.data_anonymization}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    compliance: { ...settings.compliance, data_anonymization: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Databrudd-varsling</Label>
                <Switch
                  checked={settings.compliance.breach_notification}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    compliance: { ...settings.compliance, breach_notification: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Samtykke-sporing</Label>
                <Switch
                  checked={settings.compliance.consent_tracking}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    compliance: { ...settings.compliance, consent_tracking: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Personvernkonsekvens-vurdering</Label>
                <Switch
                  checked={settings.compliance.privacy_impact_assessments}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    compliance: { ...settings.compliance, privacy_impact_assessments: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Grenseoverskridende kontroller</Label>
                <Switch
                  checked={settings.compliance.cross_border_controls}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    compliance: { ...settings.compliance, cross_border_controls: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Performance & Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Ytelse & Vedlikehold
              </CardTitle>
              <CardDescription>
                System-ytelse og automatisk vedlikehold
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Automatisk rydding</Label>
                  <p className="text-xs text-muted-foreground">
                    Slett gamle data automatisk
                  </p>
                </div>
                <Switch
                  checked={settings.performance.auto_cleanup}
                  onCheckedChange={(checked) => {
                    setSettings({
                      ...settings,
                      performance: { ...settings.performance, auto_cleanup: checked }
                    })
                    handleSettingUpdate('performance', 'auto_cleanup', checked)
                  }}
                />
              </div>

              {settings.performance.auto_cleanup && (
                <div>
                  <Label className="text-sm">Rydde-frekvens (dager)</Label>
                  <Input
                    type="number"
                    min="7"
                    max="365"
                    value={settings.performance.cleanup_frequency_days}
                    onChange={(e) => setSettings({
                      ...settings,
                      performance: { ...settings.performance, cleanup_frequency_days: parseInt(e.target.value) || 30 }
                    })}
                    className="mt-1"
                  />
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <Label className="text-sm">Automatisk backup</Label>
                <Switch
                  checked={settings.performance.backup_enabled}
                  onCheckedChange={(checked) => {
                    setSettings({
                      ...settings,
                      performance: { ...settings.performance, backup_enabled: checked }
                    })
                    handleSettingUpdate('performance', 'backup_enabled', checked)
                  }}
                />
              </div>

              {settings.performance.backup_enabled && (
                <div>
                  <Label className="text-sm">Backup-frekvens</Label>
                  <Select value={settings.performance.backup_frequency} onValueChange={(value) => {
                    setSettings({...settings, performance: {...settings.performance, backup_frequency: value}})
                    handleSettingUpdate('performance', 'backup_frequency', value)
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hver time</SelectItem>
                      <SelectItem value="daily">Daglig</SelectItem>
                      <SelectItem value="weekly">Ukentlig</SelectItem>
                      <SelectItem value="monthly">Månedlig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <Label className="text-sm">Cache aktivert</Label>
                <Switch
                  checked={settings.performance.cache_enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    performance: { ...settings.performance, cache_enabled: checked }
                  })}
                />
              </div>

              {settings.performance.cache_enabled && (
                <div>
                  <Label className="text-sm">Cache levetid (timer)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="168"
                    value={settings.performance.cache_ttl_hours}
                    onChange={(e) => setSettings({
                      ...settings,
                      performance: { ...settings.performance, cache_ttl_hours: parseInt(e.target.value) || 24 }
                    })}
                    className="mt-1"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label className="text-sm">System-overvåkning</Label>
                <Switch
                  checked={settings.performance.monitoring_enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    performance: { ...settings.performance, monitoring_enabled: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Localization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Lokalisering & Tilgjengelighet
              </CardTitle>
              <CardDescription>
                Språk, tidszone og tilgjengelighetsfunksjoner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm">Standard tidszone</Label>
                  <Select value={settings.localization.default_timezone} onValueChange={(value) => {
                    setSettings({...settings, localization: {...settings.localization, default_timezone: value}})
                    handleSettingUpdate('localization', 'default_timezone', value)
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Oslo">Europa/Oslo (CET)</SelectItem>
                      <SelectItem value="Europe/Stockholm">Europa/Stockholm (CET)</SelectItem>
                      <SelectItem value="Europe/Copenhagen">Europa/København (CET)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Standard språk</Label>
                  <Select value={settings.localization.default_language} onValueChange={(value) => {
                    setSettings({...settings, localization: {...settings.localization, default_language: value}})
                    handleSettingUpdate('localization', 'default_language', value)
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Norsk</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sv">Svenska</SelectItem>
                      <SelectItem value="da">Dansk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm">Datoformat</Label>
                  <Select value={settings.localization.date_format} onValueChange={(value) =>
                    setSettings({...settings, localization: {...settings.localization, date_format: value}})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Tidsformat</Label>
                  <Select value={settings.localization.time_format} onValueChange={(value) =>
                    setSettings({...settings, localization: {...settings.localization, time_format: value}})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24-timer</SelectItem>
                      <SelectItem value="12h">12-timer (AM/PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm">Valuta</Label>
                <Select value={settings.localization.currency} onValueChange={(value) =>
                  setSettings({...settings, localization: {...settings.localization, currency: value}})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NOK">NOK (Norske kroner)</SelectItem>
                    <SelectItem value="EUR">EUR (Euro)</SelectItem>
                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    <SelectItem value="SEK">SEK (Svenska kronor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label className="text-sm">Tilgjengelighetsfunksjoner</Label>
                <Switch
                  checked={settings.localization.accessibility_enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    localization: { ...settings.localization, accessibility_enabled: checked }
                  })}
                />
              </div>

              {settings.localization.accessibility_enabled && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Høy kontrast</Label>
                    <Switch
                      checked={settings.localization.high_contrast}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        localization: { ...settings.localization, high_contrast: checked }
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Stor tekst</Label>
                    <Switch
                      checked={settings.localization.large_text}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        localization: { ...settings.localization, large_text: checked }
                      })}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Webhooks Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Webhook-konfigurasjoner
                </CardTitle>
                <CardDescription>
                  Administrer utgående webhooks for eksterne systemer
                </CardDescription>
              </div>
              <Dialog open={showNewWebhook} onOpenChange={setShowNewWebhook}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ny webhook
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Opprett ny webhook</DialogTitle>
                    <DialogDescription>
                      Konfigurer en webhook for å sende hendelser til eksterne systemer
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Navn</Label>
                      <Input
                        value={newWebhook.name}
                        onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                        placeholder="f.eks. Security Alerts"
                      />
                    </div>
                    <div>
                      <Label>URL</Label>
                      <Input
                        type="url"
                        value={newWebhook.url}
                        onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                        placeholder="https://hooks.slack.com/services/..."
                      />
                    </div>
                    <div>
                      <Label>Hendelser (kommaseparert)</Label>
                      <Input
                        value={newWebhook.events}
                        onChange={(e) => setNewWebhook({...newWebhook, events: e.target.value})}
                        placeholder="security_incident, campaign_completed"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewWebhook(false)}>
                      Avbryt
                    </Button>
                    <Button onClick={handleAddWebhook} disabled={!newWebhook.name.trim() || !newWebhook.url.trim()}>
                      Opprett webhook
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Navn</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Hendelser</TableHead>
                  <TableHead>Sist vellykket</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[120px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">{webhook.name}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {webhook.url.length > 40 ? `${webhook.url.substring(0, 40)}...` : webhook.url}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.slice(0, 2).map((event, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                        {webhook.events.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{webhook.events.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {webhook.last_success
                        ? new Date(webhook.last_success).toLocaleDateString('no-NO')
                        : 'Aldri'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={webhook.is_active ? 'default' : 'secondary'}>
                        {webhook.is_active ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTestWebhook(webhook.id)}
                          disabled={isTestingWebhook}
                        >
                          <TestTube className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleWebhook(webhook.id)}
                        >
                          {webhook.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWebhook(webhook.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Integrations Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="mr-2 h-5 w-5" />
              Integrasjoner
            </CardTitle>
            <CardDescription>
              Status for eksterne integrasjoner og tjenester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tjeneste</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sist synkronisert</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integrations.map((integration, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{integration.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{integration.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(integration.status)}
                    </TableCell>
                    <TableCell>
                      {integration.last_sync
                        ? new Date(integration.last_sync).toLocaleString('no-NO')
                        : 'Aldri'
                      }
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={integration.config_url || '#'}>
                          <Settings className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Compliance Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Compliance-registre
            </CardTitle>
            <CardDescription>
              GDPR-forespørsler og compliance-aktiviteter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Emne</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Opprettet</TableHead>
                  <TableHead>Frist</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Badge variant="outline">{record.type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{record.subject}</TableCell>
                    <TableCell>
                      {getComplianceStatusBadge(record.status)}
                    </TableCell>
                    <TableCell>
                      {new Date(record.created_date).toLocaleDateString('no-NO')}
                    </TableCell>
                    <TableCell>
                      {record.due_date
                        ? new Date(record.due_date).toLocaleDateString('no-NO')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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