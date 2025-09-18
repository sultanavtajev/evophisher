'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { Company } from '@/lib/types/database'
import { ArrowLeft, Plus } from 'lucide-react'

export default function NewEmployeePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
    company_id: ''
  })
  const router = useRouter()

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .order('name')

      if (error) {
        console.error('Error loading companies:', error)
        return
      }

      setCompanies(data || [])
    } catch (error) {
      console.error('Error loading companies:', error)
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
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          position: formData.position || null,
          department: formData.department || null,
          company_id: formData.company_id
        }])

      if (error) {
        console.error('Error creating employee:', error)
        alert('Feil ved opprettelse av ansatt')
        return
      }

      router.push('/dashboard/employees')
    } catch (error) {
      console.error('Error creating employee:', error)
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
            <h1 className="text-3xl font-bold tracking-tight">Legg til ansatt</h1>
            <p className="text-muted-foreground">
              Registrer en ny ansatt i systemet
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Ansattinformasjon</CardTitle>
              <CardDescription>
                Fyll inn informasjonen om den nye ansatte
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
                    <Plus className="mr-2 h-4 w-4" />
                    {isLoading ? 'Oppretter...' : 'Opprett ansatt'}
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