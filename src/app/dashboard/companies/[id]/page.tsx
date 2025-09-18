'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { Company } from '@/lib/types/database'
import { ArrowLeft, Building2, Users, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface CompanyForm {
  name: string
  org_number: string
  address: string
  phone: string
  email: string
}

export default function EditCompanyPage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [formData, setFormData] = useState<CompanyForm>({
    name: '',
    org_number: '',
    address: '',
    phone: '',
    email: ''
  })
  const [employeeCount, setEmployeeCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const companyId = params.id as string

  useEffect(() => {
    if (companyId) {
      loadCompany()
    }
  }, [companyId])

  const loadCompany = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('Error loading company:', error)
        router.push('/dashboard/companies')
        return
      }

      setCompany(data)
      setFormData({
        name: data.name,
        org_number: data.org_number || '',
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || ''
      })

      // Load employee count
      const { count } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)

      setEmployeeCount(count || 0)
    } catch (error) {
      console.error('Error loading company:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof CompanyForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')

    try {
      const { error } = await supabase
        .from('companies')
        .update({
          name: formData.name,
          org_number: formData.org_number || null,
          address: formData.address || null,
          phone: formData.phone || null,
          email: formData.email || null
        })
        .eq('id', companyId)

      if (error) {
        setError(error.message)
        return
      }

      router.push('/dashboard/companies')
    } catch (err) {
      setError('En uventet feil oppstod')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId)

      if (error) {
        console.error('Error deleting company:', error)
        alert('Feil ved sletting av bedrift')
        return
      }

      router.push('/dashboard/companies')
    } catch (error) {
      console.error('Error deleting company:', error)
      alert('En uventet feil oppstod')
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!company) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Bedrift ikke funnet</h1>
            <Button asChild className="mt-4">
              <Link href="/dashboard/companies">Tilbake til bedrifter</Link>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/companies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tilbake
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Rediger bedrift</h1>
              <p className="text-muted-foreground">
                Oppdater informasjon for {company.name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/companies/${companyId}/employees`}>
                <Users className="mr-2 h-4 w-4" />
                Ansatte ({employeeCount})
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Slett bedrift
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Dette vil permanent slette bedriften &quot;{company.name}&quot; og alle tilhørende
                    ansatte. Denne handlingen kan ikke angres.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Avbryt</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Slett bedrift
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                Oppdater informasjon om bedriften
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
                  <Button type="submit" disabled={isSaving || !formData.name.trim()}>
                    {isSaving ? 'Lagrer...' : 'Lagre endringer'}
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