'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
import { EmailTemplate } from '@/lib/types/database'
import { ArrowLeft, Save, Mail } from 'lucide-react'

export default function EditTemplatePage() {
  const [template, setTemplate] = useState<EmailTemplate | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    template_type: 'phishing' as 'phishing' | 'training' | 'notification',
    is_public: false
  })
  const params = useParams()
  const router = useRouter()
  const templateId = params.id as string

  useEffect(() => {
    if (templateId) {
      loadTemplate()
    }
  }, [templateId])

  const loadTemplate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('id', templateId)
        .eq('user_id', user.id) // Only allow editing own templates
        .single()

      if (error) {
        console.error('Error loading template:', error)
        router.push('/dashboard/templates')
        return
      }

      setTemplate(data)
      setFormData({
        name: data.name,
        subject: data.subject,
        body: data.body,
        template_type: data.template_type,
        is_public: data.is_public
      })
    } catch (error) {
      console.error('Error loading template:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.subject || !formData.body) {
      alert('Vennligst fyll inn alle påkrevde felt')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('email_templates')
        .update({
          name: formData.name,
          subject: formData.subject,
          body: formData.body,
          template_type: formData.template_type,
          is_public: formData.is_public
        })
        .eq('id', templateId)

      if (error) {
        console.error('Error updating template:', error)
        alert('Feil ved oppdatering av mal')
        return
      }

      router.push('/dashboard/templates')
    } catch (error) {
      console.error('Error updating template:', error)
      alert('En uventet feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }

  const previewTemplate = () => {
    // Simple variable replacement for preview
    const previewBody = formData.body
      .replace(/\{\{name\}\}/g, 'Ola Nordmann')
      .replace(/\{\{company\}\}/g, 'Bedrift AS')
      .replace(/\{\{email\}\}/g, 'ola.nordmann@bedrift.no')

    return previewBody
  }

  if (isLoadingData) {
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

  if (!template) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Mal ikke funnet</h1>
            <Button asChild className="mt-4">
              <Link href="/dashboard/templates">Tilbake til maler</Link>
            </Button>
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
            <Link href="/dashboard/templates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til maler
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rediger mal</h1>
            <p className="text-muted-foreground">
              Oppdater "{template.name}"
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Malinformasjon</CardTitle>
              <CardDescription>
                Oppdater detaljene for e-post malen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Navn på mal *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Passord utløper snart"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type mal *</Label>
                  <Select
                    value={formData.template_type}
                    onValueChange={(value: 'phishing' | 'training' | 'notification') =>
                      handleInputChange('template_type', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Velg type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="training">Trening</SelectItem>
                      <SelectItem value="notification">Notifikasjon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">E-post emne *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Viktig: Ditt passord utløper i dag"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">E-post innhold *</Label>
                  <Textarea
                    id="body"
                    value={formData.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                    placeholder="Hei {{name}},&#10;&#10;Ditt passord for {{company}} utløper snart..."
                    rows={12}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Du kan bruke variabler som <code>{'{{name}}'}</code>, <code>{'{{company}}'}</code>, <code>{'{{email}}'}</code>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_public"
                    checked={formData.is_public}
                    onCheckedChange={(checked) => handleInputChange('is_public', checked === true)}
                  />
                  <Label htmlFor="is_public" className="text-sm font-normal">
                    Gjør malen tilgjengelig for alle brukere
                  </Label>
                </div>

                <div className="flex items-center space-x-4">
                  <Button type="submit" disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Lagrer...' : 'Lagre endringer'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard/templates">
                      Avbryt
                    </Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Forhåndsvisning
              </CardTitle>
              <CardDescription>
                Slik vil e-posten se ut for mottakeren
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white space-y-4">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Fra:</strong> IT Support &lt;it-support@bedrift.no&gt;
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Til:</strong> ola.nordmann@bedrift.no
                  </div>
                  <div className="text-lg font-semibold">
                    <strong>Emne:</strong> {formData.subject || 'E-post emne...'}
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-sm">
                  {formData.body ? previewTemplate() : 'E-post innhold vil vises her...'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}