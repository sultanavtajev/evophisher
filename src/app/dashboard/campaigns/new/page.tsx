'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { Checkbox } from '@/components/ui/checkbox'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { Company, Employee, EmailTemplate, InsertPhishingCampaign, InsertPhishingTarget } from '@/lib/types/database'
import { ArrowLeft, ArrowRight, Mail, Users, Calendar, ChevronRight } from 'lucide-react'

interface StepProps {
  currentStep: number
  totalSteps: number
}

interface CampaignFormData {
  name: string
  description: string
  company_id: string
  template_subject: string
  template_body: string
  sender_name: string
  sender_email: string
  landing_page_url: string
  selected_employees: string[]
  start_date: string
}

const STEPS = [
  { id: 1, title: 'Kampanjeinformasjon', description: 'Grunnleggende informasjon' },
  { id: 2, title: 'E-post innhold', description: 'Velg eller opprett e-post mal' },
  { id: 3, title: 'Velg mål', description: 'Velg ansatte som skal motta e-posten' },
  { id: 4, title: 'Planlegg sending', description: 'Når skal kampanjen startes' }
]

function StepIndicator({ currentStep, totalSteps }: StepProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${
            step.id <= currentStep
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-muted text-muted-foreground border-muted-foreground'
          }`}>
            {step.id}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium">{step.title}</div>
            <div className="text-xs text-muted-foreground">{step.description}</div>
          </div>
          {index < STEPS.length - 1 && (
            <ChevronRight className="mx-4 h-4 w-4 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  )
}

export default function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [companies, setCompanies] = useState<Company[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    description: '',
    company_id: '',
    template_subject: '',
    template_body: '',
    sender_name: '',
    sender_email: '',
    landing_page_url: '',
    selected_employees: [],
    start_date: ''
  })
  const router = useRouter()

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    if (formData.company_id) {
      loadEmployees()
    }
  }, [formData.company_id])

  const loadInitialData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load companies
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .order('name')

      if (companiesError) {
        console.error('Error loading companies:', companiesError)
        return
      }

      setCompanies(companiesData || [])

      // Load email templates
      const { data: templatesData, error: templatesError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('template_type', 'phishing')
        .or(`user_id.eq.${user.id},is_public.eq.true`)
        .order('name')

      if (templatesError) {
        console.error('Error loading templates:', templatesError)
        return
      }

      setTemplates(templatesData || [])
    } catch (error) {
      console.error('Error loading initial data:', error)
    }
  }

  const loadEmployees = async () => {
    try {
      const { data: employeesData, error } = await supabase
        .from('employees')
        .select('*')
        .eq('company_id', formData.company_id)
        .order('first_name')

      if (error) {
        console.error('Error loading employees:', error)
        return
      }

      setEmployees(employeesData || [])
    } catch (error) {
      console.error('Error loading employees:', error)
    }
  }

  const handleInputChange = (field: keyof CampaignFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setFormData(prev => ({
        ...prev,
        template_subject: template.subject,
        template_body: template.body
      }))
    }
  }

  const handleEmployeeToggle = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      selected_employees: prev.selected_employees.includes(employeeId)
        ? prev.selected_employees.filter(id => id !== employeeId)
        : [...prev.selected_employees, employeeId]
    }))
  }

  const handleSelectAll = () => {
    setFormData(prev => ({
      ...prev,
      selected_employees: prev.selected_employees.length === employees.length
        ? []
        : employees.map(e => e.id)
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.company_id
      case 2:
        return formData.template_subject && formData.template_body && formData.sender_name && formData.sender_email
      case 3:
        return formData.selected_employees.length > 0
      case 4:
        return true // Optional scheduling
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return

    setIsLoading(true)

    try {
      // Create campaign
      const campaignData: InsertPhishingCampaign = {
        name: formData.name,
        description: formData.description || null,
        company_id: formData.company_id,
        status: 'draft',
        template_subject: formData.template_subject,
        template_body: formData.template_body,
        sender_name: formData.sender_name,
        sender_email: formData.sender_email,
        landing_page_url: formData.landing_page_url || null,
        start_date: formData.start_date || null
      }

      const { data: campaign, error: campaignError } = await supabase
        .from('phishing_campaigns')
        .insert([campaignData])
        .select()
        .single()

      if (campaignError) {
        console.error('Error creating campaign:', campaignError)
        alert('Feil ved opprettelse av kampanje')
        return
      }

      // Create targets
      const targetsData: InsertPhishingTarget[] = formData.selected_employees.map(employeeId => ({
        campaign_id: campaign.id,
        employee_id: employeeId,
        status: 'pending'
      }))

      const { error: targetsError } = await supabase
        .from('phishing_targets')
        .insert(targetsData)

      if (targetsError) {
        console.error('Error creating targets:', targetsError)
        alert('Feil ved opprettelse av mål')
        return
      }

      router.push('/dashboard/campaigns')
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('En uventet feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Kampanjenavn *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Phishing test Q1 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beskrivelse</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Beskrivelse av kampanjen..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Bedrift *</Label>
              <Select
                value={formData.company_id}
                onValueChange={(value) => handleInputChange('company_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg bedrift" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Velg eksisterende mal</Label>
              <Select onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Velg en mal eller opprett ny" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sender_name">Avsendernavn *</Label>
                <Input
                  id="sender_name"
                  value={formData.sender_name}
                  onChange={(e) => handleInputChange('sender_name', e.target.value)}
                  placeholder="IT Support"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender_email">Avsender e-post *</Label>
                <Input
                  id="sender_email"
                  type="email"
                  value={formData.sender_email}
                  onChange={(e) => handleInputChange('sender_email', e.target.value)}
                  placeholder="it-support@bedrift.no"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">E-post emne *</Label>
              <Input
                id="subject"
                value={formData.template_subject}
                onChange={(e) => handleInputChange('template_subject', e.target.value)}
                placeholder="Viktig: Oppdater ditt passord"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">E-post innhold *</Label>
              <Textarea
                id="body"
                value={formData.template_body}
                onChange={(e) => handleInputChange('template_body', e.target.value)}
                placeholder="Hei {{name}}, du må oppdatere passordet ditt umiddelbart..."
                rows={8}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="landing_page">Landing page URL</Label>
              <Input
                id="landing_page"
                type="url"
                value={formData.landing_page_url}
                onChange={(e) => handleInputChange('landing_page_url', e.target.value)}
                placeholder="https://phishing-test.bedrift.no"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Velg ansatte som skal motta e-posten</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {formData.selected_employees.length === employees.length ? 'Fjern alle' : 'Velg alle'}
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              {formData.selected_employees.length} av {employees.length} ansatte valgt
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={employee.id}
                    checked={formData.selected_employees.includes(employee.id)}
                    onCheckedChange={() => handleEmployeeToggle(employee.id)}
                  />
                  <label htmlFor={employee.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">
                      {employee.first_name} {employee.last_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {employee.email}
                      {employee.position && ` • ${employee.position}`}
                      {employee.department && ` • ${employee.department}`}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="start_date">Startdato (valgfritt)</Label>
              <Input
                id="start_date"
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                La stå tom for å lagre som utkast. Du kan starte kampanjen manuelt senere.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sammendrag av kampanje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <strong>Navn:</strong> {formData.name}
                </div>
                <div>
                  <strong>Bedrift:</strong> {companies.find(c => c.id === formData.company_id)?.name}
                </div>
                <div>
                  <strong>Emne:</strong> {formData.template_subject}
                </div>
                <div>
                  <strong>Avsender:</strong> {formData.sender_name} ({formData.sender_email})
                </div>
                <div>
                  <strong>Antall mål:</strong> {formData.selected_employees.length}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/campaigns">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til kampanjer
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ny phishing-kampanje</h1>
            <p className="text-muted-foreground">
              Opprett en ny phishing-test for ansatte
            </p>
          </div>
        </div>

        <div className="max-w-4xl">
          <Card>
            <CardHeader>
              <StepIndicator currentStep={currentStep} totalSteps={4} />
            </CardHeader>
            <CardContent>
              {renderStep()}

              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Forrige
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                  >
                    Neste
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {isLoading ? 'Oppretter...' : 'Opprett kampanje'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}