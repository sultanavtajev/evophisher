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
import { Company, Employee } from '@/lib/types/database'
import { ArrowLeft, User, Trash2 } from 'lucide-react'
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

interface EmployeeForm {
  first_name: string
  last_name: string
  email: string
  position: string
  department: string
}

export default function EditEmployeePage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [employee, setEmployee] = useState<Employee | null>(null)
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
  const employeeId = params.employeeId as string

  useEffect(() => {
    if (companyId && employeeId) {
      loadData()
    }
  }, [companyId, employeeId])

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load company
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .eq('user_id', user.id)
        .single()

      if (companyError) {
        console.error('Error loading company:', companyError)
        router.push('/dashboard/companies')
        return
      }

      setCompany(companyData)

      // Load employee
      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .select('*')
        .eq('id', employeeId)
        .eq('company_id', companyId)
        .single()

      if (employeeError) {
        console.error('Error loading employee:', employeeError)
        router.push(`/dashboard/companies/${companyId}/employees`)
        return
      }

      setEmployee(employeeData)
      setFormData({
        first_name: employeeData.first_name,
        last_name: employeeData.last_name,
        email: employeeData.email,
        position: employeeData.position || '',
        department: employeeData.department || ''
      })
    } catch (error) {
      console.error('Error loading data:', error)
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
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          position: formData.position || null,
          department: formData.department || null
        })
        .eq('id', employeeId)

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

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', employeeId)

      if (error) {
        console.error('Error deleting employee:', error)
        alert('Feil ved sletting av ansatt')
        return
      }

      router.push(`/dashboard/companies/${companyId}/employees`)
    } catch (error) {
      console.error('Error deleting employee:', error)
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

  if (!company || !employee) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Ansatt ikke funnet</h1>
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
              <Link href={`/dashboard/companies/${companyId}/employees`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tilbake
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Rediger ansatt</h1>
              <p className="text-muted-foreground">
                Oppdater informasjon for {employee.first_name} {employee.last_name}
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Slett ansatt
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Dette vil permanent slette &quot;{employee.first_name} {employee.last_name}&quot; fra {company.name}.
                  Denne handlingen kan ikke angres.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Avbryt</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Slett ansatt
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Ansattinformasjon
              </CardTitle>
              <CardDescription>
                Oppdater informasjon om den ansatte
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
                    {isSaving ? 'Lagrer...' : 'Lagre endringer'}
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