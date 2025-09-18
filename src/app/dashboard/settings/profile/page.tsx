'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  User,
  Mail,
  Phone,
  Globe,
  Bell,
  Eye,
  Lock,
  Save,
  AlertTriangle
} from 'lucide-react'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  phone: string | null
  email: string
  timezone: string
  language: string
  email_notifications: boolean
  push_notifications: boolean
  marketing_emails: boolean
}

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    timezone: 'Europe/Oslo',
    language: 'no',
    email_notifications: true,
    push_notifications: false,
    marketing_emails: false
  })
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('Error loading profile:', profileError)
        return
      }

      setProfile({
        id: user.id,
        first_name: profileData?.first_name || '',
        last_name: profileData?.last_name || '',
        phone: profileData?.phone || '',
        email: user.email || '',
        timezone: 'Europe/Oslo', // Default for Norway
        language: 'no',
        email_notifications: true,
        push_notifications: false,
        marketing_emails: false
      })

    } catch (error) {
      console.error('Error loading user data:', error)
      setMessage({ type: 'error', text: 'Feil ved lasting av profil' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone || null,
          updated_at: new Date().toISOString()
        })

      if (error) {
        throw error
      }

      setMessage({ type: 'success', text: 'Profil oppdatert' })
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Feil ved oppdatering av profil' })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passordene stemmer ikke overens' })
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Passordet må være minst 6 tegn' })
      return
    }

    setIsSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      })

      if (error) {
        throw error
      }

      setMessage({ type: 'success', text: 'Passord endret' })
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error('Error changing password:', error)
      setMessage({ type: 'error', text: 'Feil ved endring av passord' })
    } finally {
      setIsSaving(false)
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
            <h1 className="text-3xl font-bold tracking-tight">Profil & Konto</h1>
            <p className="text-muted-foreground">
              Administrer personlig informasjon og kontoinnstillinger
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
              {message.text}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personlig informasjon
              </CardTitle>
              <CardDescription>
                Oppdater din personlige informasjon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">Fornavn *</Label>
                    <Input
                      id="firstName"
                      value={profile.first_name}
                      onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Etternavn *</Label>
                    <Input
                      id="lastName"
                      value={profile.last_name}
                      onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-post</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    E-post kan ikke endres. Kontakt support for å endre.
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+47 123 45 678"
                  />
                </div>

                <Button type="submit" disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Lagrer...' : 'Lagre endringer'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Preferanser
              </CardTitle>
              <CardDescription>
                Språk, tidszone og andre preferanser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Språk</Label>
                <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg språk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Norsk</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sv">Svenska</SelectItem>
                    <SelectItem value="da">Dansk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone">Tidszone</Label>
                <Select value={profile.timezone} onValueChange={(value) => setProfile({ ...profile, timezone: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg tidszone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Oslo">Europa/Oslo (CET)</SelectItem>
                    <SelectItem value="Europe/Stockholm">Europa/Stockholm (CET)</SelectItem>
                    <SelectItem value="Europe/Copenhagen">Europa/København (CET)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Varslingsinnstillinger
              </CardTitle>
              <CardDescription>
                Administrer hvordan du mottar varslinger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">E-post varslinger</Label>
                  <p className="text-sm text-muted-foreground">
                    Motta varslinger om kampanjer og rapporter
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={profile.email_notifications}
                  onCheckedChange={(checked) => setProfile({ ...profile, email_notifications: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push-varslinger</Label>
                  <p className="text-sm text-muted-foreground">
                    Motta push-varslinger i nettleseren
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={profile.push_notifications}
                  onCheckedChange={(checked) => setProfile({ ...profile, push_notifications: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Markedsførings-e-post</Label>
                  <p className="text-sm text-muted-foreground">
                    Motta e-post om nye funksjoner og tips
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={profile.marketing_emails}
                  onCheckedChange={(checked) => setProfile({ ...profile, marketing_emails: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Endre passord
              </CardTitle>
              <CardDescription>
                Oppdater ditt passord for økt sikkerhet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Nåværende passord</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">Nytt passord</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 6 tegn
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Bekreft nytt passord</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" disabled={isSaving}>
                  <Lock className="mr-2 h-4 w-4" />
                  {isSaving ? 'Endrer...' : 'Endre passord'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}