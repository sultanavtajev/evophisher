'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
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
  Shield,
  Key,
  Smartphone,
  Monitor,
  Globe,
  Activity,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin
} from 'lucide-react'

interface SecuritySettings {
  two_factor_enabled: boolean
  login_notifications: boolean
  suspicious_activity_alerts: boolean
  session_timeout_minutes: number
  require_password_change_days: number
}

interface ApiKey {
  id: string
  name: string
  key: string
  created_at: string
  last_used: string | null
  permissions: string[]
}

interface ActiveSession {
  id: string
  device: string
  location: string
  ip_address: string
  created_at: string
  last_active: string
  is_current: boolean
}

interface SecurityEvent {
  id: string
  type: 'login' | 'logout' | 'password_change' | 'api_access' | 'suspicious'
  description: string
  ip_address: string
  location: string
  timestamp: string
  severity: 'low' | 'medium' | 'high'
}

export default function SecuritySettingsPage() {
  const [settings, setSettings] = useState<SecuritySettings>({
    two_factor_enabled: false,
    login_notifications: true,
    suspicious_activity_alerts: true,
    session_timeout_minutes: 480, // 8 hours
    require_password_change_days: 90
  })
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([])
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showNewApiKey, setShowNewApiKey] = useState(false)
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [generatedApiKey, setGeneratedApiKey] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load mock data for demonstration
      setApiKeys([
        {
          id: '1',
          name: 'Dashboard API',
          key: 'ep_1234567890abcdef',
          created_at: '2024-01-15T10:00:00Z',
          last_used: '2024-01-20T14:30:00Z',
          permissions: ['read', 'write']
        },
        {
          id: '2',
          name: 'Reports Integration',
          key: 'ep_abcdef1234567890',
          created_at: '2024-01-10T09:00:00Z',
          last_used: null,
          permissions: ['read']
        }
      ])

      setActiveSessions([
        {
          id: '1',
          device: 'Chrome på Windows',
          location: 'Oslo, Norge',
          ip_address: '192.168.1.100',
          created_at: '2024-01-20T08:00:00Z',
          last_active: '2024-01-20T15:30:00Z',
          is_current: true
        },
        {
          id: '2',
          device: 'Safari på iPhone',
          location: 'Oslo, Norge',
          ip_address: '192.168.1.101',
          created_at: '2024-01-19T18:00:00Z',
          last_active: '2024-01-20T12:00:00Z',
          is_current: false
        }
      ])

      setSecurityEvents([
        {
          id: '1',
          type: 'login',
          description: 'Vellykket innlogging',
          ip_address: '192.168.1.100',
          location: 'Oslo, Norge',
          timestamp: '2024-01-20T08:00:00Z',
          severity: 'low'
        },
        {
          id: '2',
          type: 'api_access',
          description: 'API-nøkkel brukt: Dashboard API',
          ip_address: '192.168.1.105',
          location: 'Bergen, Norge',
          timestamp: '2024-01-20T14:30:00Z',
          severity: 'low'
        },
        {
          id: '3',
          type: 'suspicious',
          description: 'Flere mislykkede innloggingsforsøk',
          ip_address: '203.45.67.89',
          location: 'Ukjent lokasjon',
          timestamp: '2024-01-19T22:15:00Z',
          severity: 'high'
        }
      ])

    } catch (error) {
      console.error('Error loading security data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Sikkerhetsinnstillinger lagret' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved lagring av innstillinger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEnable2FA = async () => {
    try {
      // In a real app, this would generate QR code and setup 2FA
      setSettings({ ...settings, two_factor_enabled: true })
      setMessage({ type: 'success', text: 'To-faktor autentisering aktivert' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved aktivering av 2FA' })
    }
  }

  const handleDisable2FA = async () => {
    try {
      setSettings({ ...settings, two_factor_enabled: false })
      setMessage({ type: 'success', text: 'To-faktor autentisering deaktivert' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved deaktivering av 2FA' })
    }
  }

  const handleCreateApiKey = async () => {
    if (!newApiKeyName.trim()) return

    try {
      const newKey = `ep_${Math.random().toString(36).substr(2, 16)}`
      setGeneratedApiKey(newKey)

      const newApiKey: ApiKey = {
        id: Date.now().toString(),
        name: newApiKeyName,
        key: newKey,
        created_at: new Date().toISOString(),
        last_used: null,
        permissions: ['read', 'write']
      }

      setApiKeys([...apiKeys, newApiKey])
      setNewApiKeyName('')
      setMessage({ type: 'success', text: 'API-nøkkel opprettet' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved opprettelse av API-nøkkel' })
    }
  }

  const handleDeleteApiKey = async (keyId: string) => {
    try {
      setApiKeys(apiKeys.filter(key => key.id !== keyId))
      setMessage({ type: 'success', text: 'API-nøkkel slettet' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved sletting av API-nøkkel' })
    }
  }

  const handleTerminateSession = async (sessionId: string) => {
    try {
      setActiveSessions(activeSessions.filter(session => session.id !== sessionId))
      setMessage({ type: 'success', text: 'Sesjon avsluttet' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved avslutting av sesjon' })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setMessage({ type: 'success', text: 'Kopiert til utklippstavlen' })
  }

  const getSeverityBadge = (severity: string) => {
    const config = {
      low: { label: 'Lav', variant: 'default' as const },
      medium: { label: 'Middels', variant: 'secondary' as const },
      high: { label: 'Høy', variant: 'destructive' as const }
    }
    const { label, variant } = config[severity as keyof typeof config] || config.low
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
            <h1 className="text-3xl font-bold tracking-tight">Sikkerhet & Tilganger</h1>
            <p className="text-muted-foreground">
              To-faktor autentisering, API-nøkler og sikkerhetshendelser
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
          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                To-faktor autentisering (2FA)
              </CardTitle>
              <CardDescription>
                Øk sikkerheten med to-faktor autentisering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Status: {settings.two_factor_enabled ? 'Aktivert' : 'Deaktivert'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {settings.two_factor_enabled
                      ? 'Din konto er beskyttet med 2FA'
                      : 'Aktiver 2FA for økt sikkerhet'
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {settings.two_factor_enabled ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              </div>

              {!settings.two_factor_enabled ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Aktiver 2FA
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Aktiver To-faktor autentisering</DialogTitle>
                      <DialogDescription>
                        Scan QR-koden med din autentiserings-app eller skriv inn den hemmelige nøkkelen manuelt.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-gray-100 p-8 rounded-lg text-center">
                        <div className="w-32 h-32 bg-gray-300 mx-auto rounded-lg flex items-center justify-center">
                          <span className="text-sm text-gray-600">QR-kode</span>
                        </div>
                      </div>
                      <div>
                        <Label>Hemmelig nøkkel</Label>
                        <div className="flex space-x-2">
                          <Input value="JBSWY3DPEHPK3PXP" readOnly />
                          <Button variant="outline" size="sm" onClick={() => copyToClipboard("JBSWY3DPEHPK3PXP")}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Bekreftelseskode</Label>
                        <Input placeholder="Skriv inn 6-sifret kode fra din app" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Avbryt</Button>
                      <Button onClick={handleEnable2FA}>Aktiver 2FA</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button variant="destructive" className="w-full" onClick={handleDisable2FA}>
                  <Shield className="mr-2 h-4 w-4" />
                  Deaktiver 2FA
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Sikkerhetsinnstillinger
              </CardTitle>
              <CardDescription>
                Administrer sikkerhetspreferanser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Innloggingsvarslinger</Label>
                  <p className="text-sm text-muted-foreground">
                    Få varsling ved nye innlogginger
                  </p>
                </div>
                <Switch
                  checked={settings.login_notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, login_notifications: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Varsling om mistenkelig aktivitet</Label>
                  <p className="text-sm text-muted-foreground">
                    Få varsling ved mistenkelig aktivitet
                  </p>
                </div>
                <Switch
                  checked={settings.suspicious_activity_alerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, suspicious_activity_alerts: checked })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Sesjon timeout (minutter)</Label>
                <Input
                  type="number"
                  min="30"
                  max="1440"
                  value={settings.session_timeout_minutes}
                  onChange={(e) => setSettings({ ...settings, session_timeout_minutes: parseInt(e.target.value) || 480 })}
                />
                <p className="text-xs text-muted-foreground">
                  Automatisk utlogging etter inaktivitet (30-1440 minutter)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Krev passordendring (dager)</Label>
                <Input
                  type="number"
                  min="30"
                  max="365"
                  value={settings.require_password_change_days}
                  onChange={(e) => setSettings({ ...settings, require_password_change_days: parseInt(e.target.value) || 90 })}
                />
                <p className="text-xs text-muted-foreground">
                  Påkrev passordendring hvert X antall dager (30-365 dager)
                </p>
              </div>

              <Button onClick={handleSaveSettings} disabled={isSaving} className="w-full">
                {isSaving ? 'Lagrer...' : 'Lagre innstillinger'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  API-nøkler
                </CardTitle>
                <CardDescription>
                  Administrer API-nøkler for integrasjoner
                </CardDescription>
              </div>
              <Dialog open={showNewApiKey} onOpenChange={setShowNewApiKey}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ny API-nøkkel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Opprett ny API-nøkkel</DialogTitle>
                    <DialogDescription>
                      Gi API-nøkkelen et beskrivende navn for å holde oversikt
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Navn på API-nøkkel</Label>
                      <Input
                        value={newApiKeyName}
                        onChange={(e) => setNewApiKeyName(e.target.value)}
                        placeholder="f.eks. Dashboard Integration"
                      />
                    </div>
                    {generatedApiKey && (
                      <div>
                        <Label>Din nye API-nøkkel</Label>
                        <div className="flex space-x-2">
                          <Input value={generatedApiKey} readOnly />
                          <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedApiKey)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-red-600 mt-1">
                          Lagre denne nøkkelen nå - den vil ikke vises igjen!
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {setShowNewApiKey(false); setGeneratedApiKey('')}}>
                      {generatedApiKey ? 'Lukk' : 'Avbryt'}
                    </Button>
                    {!generatedApiKey && (
                      <Button onClick={handleCreateApiKey} disabled={!newApiKeyName.trim()}>
                        Opprett nøkkel
                      </Button>
                    )}
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
                  <TableHead>Nøkkel</TableHead>
                  <TableHead>Sist brukt</TableHead>
                  <TableHead>Opprettet</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {apiKey.key.substring(0, 8)}...
                      </code>
                    </TableCell>
                    <TableCell>
                      {apiKey.last_used
                        ? new Date(apiKey.last_used).toLocaleDateString('no-NO')
                        : 'Aldri'
                      }
                    </TableCell>
                    <TableCell>
                      {new Date(apiKey.created_at).toLocaleDateString('no-NO')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteApiKey(apiKey.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="mr-2 h-5 w-5" />
              Aktive sesjoner
            </CardTitle>
            <CardDescription>
              Administrer hvor du er innlogget
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Enhet</TableHead>
                  <TableHead>Lokasjon</TableHead>
                  <TableHead>IP-adresse</TableHead>
                  <TableHead>Sist aktiv</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Monitor className="h-4 w-4" />
                        <span>{session.device}</span>
                        {session.is_current && (
                          <Badge variant="default">Nåværende</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{session.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm">{session.ip_address}</code>
                    </TableCell>
                    <TableCell>
                      {new Date(session.last_active).toLocaleString('no-NO')}
                    </TableCell>
                    <TableCell>
                      {!session.is_current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTerminateSession(session.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Security Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Sikkerhetshendelser
            </CardTitle>
            <CardDescription>
              Siste sikkerhetsrelaterte hendelser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Beskrivelse</TableHead>
                  <TableHead>Lokasjon</TableHead>
                  <TableHead>Tidspunkt</TableHead>
                  <TableHead>Alvorlighet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Badge variant="outline">{event.type}</Badge>
                    </TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <code className="text-xs text-muted-foreground">{event.ip_address}</code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(event.timestamp).toLocaleString('no-NO')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getSeverityBadge(event.severity)}
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