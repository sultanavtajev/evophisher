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
import { ArrowLeft, UserPlus } from 'lucide-react'

interface EmployeeForm {
  first_name: string
  last_name: string
  email: string
  position: string
  department: string
}

export default function NewEmployeePage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [formData, setFormData] = useState<EmployeeForm>({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: ''
  })
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
    } catch (error) {
      console.error('Error loading company:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof EmployeeForm, value: string) => {
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
        .from('employees')
        .insert({
          company_id: companyId,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          position: formData.position || null,
          department: formData.department || null
        })

      if (error) {
        setError(error.message)
        return
      }

      // Redirect to employees list
      router.push(`/dashboard/companies/${companyId}/employees`)
    } catch (err) {
      setError('En uventet feil oppstod')
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/companies/${companyId}/employees`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Legg til ansatt</h1>
            <p className="text-muted-foreground">
              Legg til en ny ansatt til {company.name}
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Ansattinformasjon
              </CardTitle>
              <CardDescription>
                Fyll inn informasjon om den ansatte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="first_name">
                      Fornavn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="first_name"
                      type="text"
                      placeholder="Fornavn"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="last_name">
                      Etternavn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Etternavn"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="email">
                      E-post <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ansatt@bedrift.no"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Stilling</Label>
                    <Input
                      id="position"
                      type="text"
                      placeholder="Utvikler, Manager, etc."
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="department">Avdeling</Label>
                    <Input
                      id="department"
                      type="text"
                      placeholder="IT, Økonomi, etc."
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={
                      isSaving ||
                      !formData.first_name.trim() ||
                      !formData.last_name.trim() ||
                      !formData.email.trim()
                    }
                  >
                    {isSaving ? 'Legger til...' : 'Legg til ansatt'}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/companies/${companyId}/employees`}>
                      Avbryt
                    </Link>
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