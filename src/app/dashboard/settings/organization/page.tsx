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
  Building2,
  Users,
  Download,
  Upload,
  Settings,
  Shield,
  Database,
  Plus,
  Trash2,
  Edit,
  Save,
  AlertTriangle,
  CheckCircle,
  FileText,
  Globe
} from 'lucide-react'

interface OrganizationSettings {
  default_company_info: {
    country: string
    timezone: string
    business_type: string
    default_address: string
    default_phone: string
  }
  employee_settings: {
    required_fields: string[]
    allowed_email_domains: string[]
    auto_categorize: boolean
    default_department: string
  }
  data_retention: {
    campaign_data_months: number
    employee_data_years: number
    auto_anonymize: boolean
    gdpr_compliant: boolean
  }
  import_export: {
    csv_delimiter: string
    date_format: string
    encoding: string
    validate_emails: boolean
  }
}

interface Department {
  id: string
  name: string
  description: string
  parent_id?: string
  employee_count: number
}

interface EmailDomain {
  id: string
  domain: string
  verified: boolean
  added_date: string
}

export default function OrganizationSettingsPage() {
  const [settings, setSettings] = useState<OrganizationSettings>({
    default_company_info: {
      country: 'NO',
      timezone: 'Europe/Oslo',
      business_type: 'private',
      default_address: '',
      default_phone: ''
    },
    employee_settings: {
      required_fields: ['first_name', 'last_name', 'email'],
      allowed_email_domains: [],
      auto_categorize: true,
      default_department: 'none'
    },
    data_retention: {
      campaign_data_months: 24,
      employee_data_years: 7,
      auto_anonymize: true,
      gdpr_compliant: true
    },
    import_export: {
      csv_delimiter: ',',
      date_format: 'DD.MM.YYYY',
      encoding: 'UTF-8',
      validate_emails: true
    }
  })
  const [departments, setDepartments] = useState<Department[]>([])
  const [emailDomains, setEmailDomains] = useState<EmailDomain[]>([])
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' })
  const [newEmailDomain, setNewEmailDomain] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showNewDepartment, setShowNewDepartment] = useState(false)
  const [showNewDomain, setShowNewDomain] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadOrganizationData()
  }, [])

  const loadOrganizationData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load organization settings from database
      const { data: organizationSettingsData } = await supabase
        .from('organization_settings')
        .select('*')
        .eq('user_id', user.id)

      // Parse settings data by category
      const settingsByCategory: any = {}
      if (organizationSettingsData) {
        organizationSettingsData.forEach(setting => {
          if (!settingsByCategory[setting.category]) {
            settingsByCategory[setting.category] = {}
          }
          settingsByCategory[setting.category][setting.setting_key] = setting.setting_value
        })
      }

      // Update settings with loaded data or keep defaults
      setSettings({
        default_company_info: {
          country: settingsByCategory.default_company_info?.country || 'NO',
          timezone: settingsByCategory.default_company_info?.timezone || 'Europe/Oslo',
          business_type: settingsByCategory.default_company_info?.business_type || 'private',
          default_address: settingsByCategory.default_company_info?.default_address || '',
          default_phone: settingsByCategory.default_company_info?.default_phone || ''
        },
        employee_settings: {
          required_fields: settingsByCategory.employee_settings?.required_fields || ['first_name', 'last_name', 'email'],
          allowed_email_domains: settingsByCategory.employee_settings?.allowed_email_domains || [],
          auto_categorize: settingsByCategory.employee_settings?.auto_categorize !== undefined ? settingsByCategory.employee_settings.auto_categorize : true,
          default_department: settingsByCategory.employee_settings?.default_department || 'none'
        },
        data_retention: {
          campaign_data_months: settingsByCategory.data_retention?.campaign_data_months || 24,
          employee_data_years: settingsByCategory.data_retention?.employee_data_years || 7,
          auto_anonymize: settingsByCategory.data_retention?.auto_anonymize !== undefined ? settingsByCategory.data_retention.auto_anonymize : true,
          gdpr_compliant: settingsByCategory.data_retention?.gdpr_compliant !== undefined ? settingsByCategory.data_retention.gdpr_compliant : true
        },
        import_export: {
          csv_delimiter: settingsByCategory.import_export?.csv_delimiter || ',',
          date_format: settingsByCategory.import_export?.date_format || 'DD.MM.YYYY',
          encoding: settingsByCategory.import_export?.encoding || 'UTF-8',
          validate_emails: settingsByCategory.import_export?.validate_emails !== undefined ? settingsByCategory.import_export.validate_emails : true
        }
      })

      // Load mock departments data
      setDepartments([
        { id: '1', name: 'IT-avdeling', description: 'Informasjonsteknologi', employee_count: 15 },
        { id: '2', name: 'Økonomi', description: 'Regnskap og finans', employee_count: 8 },
        { id: '3', name: 'HR', description: 'Human Resources', employee_count: 5 },
        { id: '4', name: 'Salg', description: 'Salg og markedsføring', employee_count: 12 },
        { id: '5', name: 'Ledelse', description: 'Toppledelse', employee_count: 3 }
      ])

      // Load mock email domains
      setEmailDomains([
        { id: '1', domain: 'company.com', verified: true, added_date: '2024-01-15' },
        { id: '2', domain: 'company.no', verified: true, added_date: '2024-01-10' },
        { id: '3', domain: 'subsidiary.com', verified: false, added_date: '2024-01-20' }
      ])

    } catch (error) {
      console.error('Error loading organization data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // Save organization settings to database
      const organizationSettingsToSave = [
        // Default company info
        {
          user_id: user.id,
          setting_key: 'country',
          setting_value: settings.default_company_info.country,
          category: 'default_company_info'
        },
        {
          user_id: user.id,
          setting_key: 'timezone',
          setting_value: settings.default_company_info.timezone,
          category: 'default_company_info'
        },
        {
          user_id: user.id,
          setting_key: 'business_type',
          setting_value: settings.default_company_info.business_type,
          category: 'default_company_info'
        },
        {
          user_id: user.id,
          setting_key: 'default_address',
          setting_value: settings.default_company_info.default_address,
          category: 'default_company_info'
        },
        {
          user_id: user.id,
          setting_key: 'default_phone',
          setting_value: settings.default_company_info.default_phone,
          category: 'default_company_info'
        },
        // Employee settings
        {
          user_id: user.id,
          setting_key: 'required_fields',
          setting_value: settings.employee_settings.required_fields,
          category: 'employee_settings'
        },
        {
          user_id: user.id,
          setting_key: 'allowed_email_domains',
          setting_value: settings.employee_settings.allowed_email_domains,
          category: 'employee_settings'
        },
        {
          user_id: user.id,
          setting_key: 'auto_categorize',
          setting_value: settings.employee_settings.auto_categorize,
          category: 'employee_settings'
        },
        {
          user_id: user.id,
          setting_key: 'default_department',
          setting_value: settings.employee_settings.default_department,
          category: 'employee_settings'
        },
        // Data retention
        {
          user_id: user.id,
          setting_key: 'campaign_data_months',
          setting_value: settings.data_retention.campaign_data_months,
          category: 'data_retention'
        },
        {
          user_id: user.id,
          setting_key: 'employee_data_years',
          setting_value: settings.data_retention.employee_data_years,
          category: 'data_retention'
        },
        {
          user_id: user.id,
          setting_key: 'auto_anonymize',
          setting_value: settings.data_retention.auto_anonymize,
          category: 'data_retention'
        },
        {
          user_id: user.id,
          setting_key: 'gdpr_compliant',
          setting_value: settings.data_retention.gdpr_compliant,
          category: 'data_retention'
        },
        // Import/Export
        {
          user_id: user.id,
          setting_key: 'csv_delimiter',
          setting_value: settings.import_export.csv_delimiter,
          category: 'import_export'
        },
        {
          user_id: user.id,
          setting_key: 'date_format',
          setting_value: settings.import_export.date_format,
          category: 'import_export'
        },
        {
          user_id: user.id,
          setting_key: 'encoding',
          setting_value: settings.import_export.encoding,
          category: 'import_export'
        },
        {
          user_id: user.id,
          setting_key: 'validate_emails',
          setting_value: settings.import_export.validate_emails,
          category: 'import_export'
        }
      ]

      // Delete existing organization settings for this user
      await supabase
        .from('organization_settings')
        .delete()
        .eq('user_id', user.id)

      // Insert new settings
      const { error } = await supabase
        .from('organization_settings')
        .insert(organizationSettingsToSave)

      if (error) throw error

      setMessage({ type: 'success', text: 'Organisasjonsinnstillinger lagret' })
    } catch (error) {
      console.error('Error saving organization settings:', error)
      setMessage({ type: 'error', text: 'Feil ved lagring av innstillinger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddDepartment = async () => {
    if (!newDepartment.name.trim()) return

    try {
      const newDept: Department = {
        id: Date.now().toString(),
        name: newDepartment.name,
        description: newDepartment.description,
        employee_count: 0
      }

      setDepartments([...departments, newDept])
      setNewDepartment({ name: '', description: '' })
      setShowNewDepartment(false)
      setMessage({ type: 'success', text: 'Avdeling lagt til' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved opprettelse av avdeling' })
    }
  }

  const handleDeleteDepartment = async (deptId: string) => {
    try {
      setDepartments(departments.filter(dept => dept.id !== deptId))
      setMessage({ type: 'success', text: 'Avdeling slettet' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved sletting av avdeling' })
    }
  }

  const handleAddEmailDomain = async () => {
    if (!newEmailDomain.trim()) return

    try {
      const newDomain: EmailDomain = {
        id: Date.now().toString(),
        domain: newEmailDomain.toLowerCase(),
        verified: false,
        added_date: new Date().toISOString().split('T')[0]
      }

      setEmailDomains([...emailDomains, newDomain])
      setNewEmailDomain('')
      setShowNewDomain(false)
      setMessage({ type: 'success', text: 'E-post domene lagt til' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved opprettelse av domene' })
    }
  }

  const handleDeleteDomain = async (domainId: string) => {
    try {
      setEmailDomains(emailDomains.filter(domain => domain.id !== domainId))
      setMessage({ type: 'success', text: 'E-post domene slettet' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved sletting av domene' })
    }
  }

  const toggleRequiredField = (field: string) => {
    const currentFields = settings.employee_settings.required_fields
    const newFields = currentFields.includes(field)
      ? currentFields.filter(f => f !== field)
      : [...currentFields, field]

    setSettings({
      ...settings,
      employee_settings: { ...settings.employee_settings, required_fields: newFields }
    })
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
            <h1 className="text-3xl font-bold tracking-tight">Organisasjonsinnstillinger</h1>
            <p className="text-muted-foreground">
              Bedriftsinformasjon, ansatt-strukturer og dataretensjon
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
          {/* Company Defaults */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Standard bedriftsinformasjon
              </CardTitle>
              <CardDescription>
                Standardverdier for nye bedrifter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="country">Land</Label>
                  <Select value={settings.default_company_info.country} onValueChange={(value) =>
                    setSettings({...settings, default_company_info: {...settings.default_company_info, country: value}})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg land" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NO">Norge</SelectItem>
                      <SelectItem value="SE">Sverige</SelectItem>
                      <SelectItem value="DK">Danmark</SelectItem>
                      <SelectItem value="FI">Finland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Tidszone</Label>
                  <Select value={settings.default_company_info.timezone} onValueChange={(value) =>
                    setSettings({...settings, default_company_info: {...settings.default_company_info, timezone: value}})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg tidszone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Oslo">Europa/Oslo (CET)</SelectItem>
                      <SelectItem value="Europe/Stockholm">Europa/Stockholm (CET)</SelectItem>
                      <SelectItem value="Europe/Copenhagen">Europa/København (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="businessType">Bedriftstype</Label>
                <Select value={settings.default_company_info.business_type} onValueChange={(value) =>
                  setSettings({...settings, default_company_info: {...settings.default_company_info, business_type: value}})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg bedriftstype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Privat</SelectItem>
                    <SelectItem value="public">Offentlig</SelectItem>
                    <SelectItem value="nonprofit">Ideell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="defaultAddress">Standard adresse</Label>
                <Textarea
                  id="defaultAddress"
                  value={settings.default_company_info.default_address}
                  onChange={(e) => setSettings({...settings, default_company_info: {...settings.default_company_info, default_address: e.target.value}})}
                  placeholder="Gateadresse, postnummer og sted"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="defaultPhone">Standard telefonnummer</Label>
                <Input
                  id="defaultPhone"
                  value={settings.default_company_info.default_phone}
                  onChange={(e) => setSettings({...settings, default_company_info: {...settings.default_company_info, default_phone: e.target.value}})}
                  placeholder="+47 12 34 56 78"
                />
              </div>
            </CardContent>
          </Card>

          {/* Employee Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Ansatt-innstillinger
              </CardTitle>
              <CardDescription>
                Konfigurer ansatt-administrasjon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Obligatoriske felter</Label>
                <div className="grid gap-2 mt-2">
                  {['first_name', 'last_name', 'email', 'position', 'department', 'phone'].map(field => (
                    <div key={field} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={field}
                        checked={settings.employee_settings.required_fields.includes(field)}
                        onChange={() => toggleRequiredField(field)}
                        className="rounded"
                      />
                      <Label htmlFor={field} className="text-sm">
                        {field === 'first_name' ? 'Fornavn' :
                         field === 'last_name' ? 'Etternavn' :
                         field === 'email' ? 'E-post' :
                         field === 'position' ? 'Stilling' :
                         field === 'department' ? 'Avdeling' :
                         field === 'phone' ? 'Telefon' : field}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatisk kategorisering</Label>
                  <p className="text-sm text-muted-foreground">
                    Kategoriser ansatte automatisk basert på e-post domene
                  </p>
                </div>
                <Switch
                  checked={settings.employee_settings.auto_categorize}
                  onCheckedChange={(checked) => setSettings({...settings, employee_settings: {...settings.employee_settings, auto_categorize: checked}})}
                />
              </div>

              <div>
                <Label htmlFor="defaultDept">Standard avdeling</Label>
                <Select value={settings.employee_settings.default_department} onValueChange={(value) =>
                  setSettings({...settings, employee_settings: {...settings.employee_settings, default_department: value}})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg standard avdeling" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ingen standard</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Dataretensjon & GDPR
              </CardTitle>
              <CardDescription>
                Administrer datalagring og compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="campaignRetention">Kampanjedata (måneder)</Label>
                  <Input
                    id="campaignRetention"
                    type="number"
                    min="6"
                    max="60"
                    value={settings.data_retention.campaign_data_months}
                    onChange={(e) => setSettings({...settings, data_retention: {...settings.data_retention, campaign_data_months: parseInt(e.target.value) || 24}})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hvor lenge kampanjedata lagres (6-60 måneder)
                  </p>
                </div>
                <div>
                  <Label htmlFor="employeeRetention">Ansattdata (år)</Label>
                  <Input
                    id="employeeRetention"
                    type="number"
                    min="1"
                    max="10"
                    value={settings.data_retention.employee_data_years}
                    onChange={(e) => setSettings({...settings, data_retention: {...settings.data_retention, employee_data_years: parseInt(e.target.value) || 7}})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hvor lenge ansattdata lagres (1-10 år)
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatisk anonymisering</Label>
                  <p className="text-sm text-muted-foreground">
                    Anonymiser gamle data automatisk
                  </p>
                </div>
                <Switch
                  checked={settings.data_retention.auto_anonymize}
                  onCheckedChange={(checked) => setSettings({...settings, data_retention: {...settings.data_retention, auto_anonymize: checked}})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>GDPR-compliant</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktiver GDPR-kompatibel databehandling
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.data_retention.gdpr_compliant}
                    onCheckedChange={(checked) => setSettings({...settings, data_retention: {...settings.data_retention, gdpr_compliant: checked}})}
                  />
                  {settings.data_retention.gdpr_compliant && (
                    <Badge variant="default" className="bg-green-500">
                      <Shield className="h-3 w-3 mr-1" />
                      Aktiv
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Import/Export */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Import/Eksport-innstillinger
              </CardTitle>
              <CardDescription>
                Konfigurer databehandling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="csvDelimiter">CSV-separator</Label>
                  <Select value={settings.import_export.csv_delimiter} onValueChange={(value) =>
                    setSettings({...settings, import_export: {...settings.import_export, csv_delimiter: value}})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=",">,</SelectItem>
                      <SelectItem value=";">;</SelectItem>
                      <SelectItem value="\t">Tab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateFormat">Datoformat</Label>
                  <Select value={settings.import_export.date_format} onValueChange={(value) =>
                    setSettings({...settings, import_export: {...settings.import_export, date_format: value}})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="encoding">Tegnkoding</Label>
                <Select value={settings.import_export.encoding} onValueChange={(value) =>
                  setSettings({...settings, import_export: {...settings.import_export, encoding: value}})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTF-8">UTF-8</SelectItem>
                    <SelectItem value="ISO-8859-1">ISO-8859-1</SelectItem>
                    <SelectItem value="Windows-1252">Windows-1252</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Valider e-post adresser</Label>
                  <p className="text-sm text-muted-foreground">
                    Sjekk e-post format ved import
                  </p>
                </div>
                <Switch
                  checked={settings.import_export.validate_emails}
                  onCheckedChange={(checked) => setSettings({...settings, import_export: {...settings.import_export, validate_emails: checked}})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Departments Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Avdelingsstruktur
                </CardTitle>
                <CardDescription>
                  Administrer organisatoriske avdelinger
                </CardDescription>
              </div>
              <Dialog open={showNewDepartment} onOpenChange={setShowNewDepartment}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ny avdeling
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Opprett ny avdeling</DialogTitle>
                    <DialogDescription>
                      Legg til en ny avdeling i organisasjonsstrukturen
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Avdelingsnavn</Label>
                      <Input
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                        placeholder="f.eks. IT-avdeling"
                      />
                    </div>
                    <div>
                      <Label>Beskrivelse</Label>
                      <Textarea
                        value={newDepartment.description}
                        onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                        placeholder="Kort beskrivelse av avdelingen"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewDepartment(false)}>
                      Avbryt
                    </Button>
                    <Button onClick={handleAddDepartment} disabled={!newDepartment.name.trim()}>
                      Opprett avdeling
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
                  <TableHead>Beskrivelse</TableHead>
                  <TableHead className="text-center">Ansatte</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.description}</TableCell>
                    <TableCell className="text-center">{dept.employee_count}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDepartment(dept.id)}
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

        {/* Email Domains */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Tillatte e-post domener
                </CardTitle>
                <CardDescription>
                  Administrer godkjente e-post domener for ansatte
                </CardDescription>
              </div>
              <Dialog open={showNewDomain} onOpenChange={setShowNewDomain}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Legg til domene
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Legg til e-post domene</DialogTitle>
                    <DialogDescription>
                      Legg til et nytt tillatt e-post domene
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Domenenavn</Label>
                      <Input
                        value={newEmailDomain}
                        onChange={(e) => setNewEmailDomain(e.target.value)}
                        placeholder="f.eks. company.com"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Ikke inkluder @ eller www
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewDomain(false)}>
                      Avbryt
                    </Button>
                    <Button onClick={handleAddEmailDomain} disabled={!newEmailDomain.trim()}>
                      Legg til domene
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
                  <TableHead>Domene</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Lagt til</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emailDomains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell className="font-medium">{domain.domain}</TableCell>
                    <TableCell>
                      <Badge variant={domain.verified ? 'default' : 'secondary'}>
                        {domain.verified ? 'Verifisert' : 'Venter'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(domain.added_date).toLocaleDateString('no-NO')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDomain(domain.id)}
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