'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { ArrowLeft, Building2 } from 'lucide-react'

interface CompanyForm {
  name: string
  org_number: string
  address: string
  phone: string
  email: string
}

export default function NewCompanyPage() {
  const [formData, setFormData] = useState<CompanyForm>({
    name: '',
    org_number: '',
    address: '',
    phone: '',
    email: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (field: keyof CompanyForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Du må være logget inn')
        return
      }

      const { data, error } = await supabase
        .from('companies')
        .insert({
          user_id: user.id,
          name: formData.name,
          org_number: formData.org_number || null,
          address: formData.address || null,
          phone: formData.phone || null,
          email: formData.email || null
        })
        .select()
        .single()

      if (error) {
        setError(error.message)
        return
      }

      // Redirect to the company details page
      router.push(`/dashboard/companies/${data.id}`)
    } catch (err) {
      setError('En uventet feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/companies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Legg til bedrift</h1>
            <p className="text-muted-foreground">
              Opprett en ny bedrift for å administrere ansatte og phishing-tester
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Bedriftsinformasjon
              </CardTitle>
              <CardDescription>
                Fyll inn informasjon om bedriften du ønsker å legge til
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">
                      Bedriftsnavn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Skriv inn bedriftsnavn"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="org_number">Organisasjonsnummer</Label>
                    <Input
                      id="org_number"
                      type="text"
                      placeholder="123 456 789"
                      value={formData.org_number}
                      onChange={(e) => handleInputChange('org_number', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-post</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="kontakt@bedrift.no"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Gate 1, 0123 Oslo"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+47 123 45 678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={isLoading || !formData.name.trim()}>
                    {isLoading ? 'Oppretter...' : 'Opprett bedrift'}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/companies">Avbryt</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}