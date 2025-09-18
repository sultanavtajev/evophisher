'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { Company, Employee } from '@/lib/types/database'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditEmployeePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
    company_id: ''
  })
  const params = useParams()
  const router = useRouter()
  const employeeId = params.id as string

  useEffect(() => {
    if (employeeId) {
      loadData()
    }
  }, [employeeId])

  const loadData = async () => {
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

      // Load employee
      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .select(`
          *,
          companies!inner(user_id)
        `)
        .eq('id', employeeId)
        .eq('companies.user_id', user.id)
        .single()

      if (employeeError) {
        console.error('Error loading employee:', employeeError)
        router.push('/dashboard/employees')
        return
      }

      setEmployee(employeeData)
      setFormData({
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        email: employeeData.email,
        position: employeeData.position || '',
        department: employeeData.department || '',
        company_id: employeeData.company_id
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.company_id) {
      alert('Vennligst fyll inn alle påkrevde felt')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('employees')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          position: formData.position || null,
          department: formData.department || null,
          company_id: formData.company_id
        })
        .eq('id', employeeId)

      if (error) {
        console.error('Error updating employee:', error)
        alert('Feil ved oppdatering av ansatt')
        return
      }

      router.push('/dashboard/employees')
    } catch (error) {
      console.error('Error updating employee:', error)
      alert('En uventet feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Ansatt ikke funnet</h1>
            <Button asChild className="mt-4">
              <Link href="/dashboard/employees">Tilbake til ansatte</Link>
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
            <Link href="/dashboard/employees">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til ansatte
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rediger ansatt</h1>
            <p className="text-muted-foreground">
              Oppdater informasjonen for {employee.first_name} {employee.last_name}
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Ansattinformasjon</CardTitle>
              <CardDescription>
                Oppdater informasjonen om ansatt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Selection */}
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

                {/* Name Fields */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Fornavn *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      placeholder="Ola"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Etternavn *</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      placeholder="Nordmann"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-post *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="ola.nordmann@bedrift.no"
                    required
                  />
                </div>

                {/* Position and Department */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="position">Stilling</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      placeholder="Systemutvikler"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Avdeling</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="IT"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center space-x-4">
                  <Button type="submit" disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Lagrer...' : 'Lagre endringer'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard/employees">
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