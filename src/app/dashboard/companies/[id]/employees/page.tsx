'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { Company, Employee } from '@/lib/types/database'
import { ArrowLeft, Plus, Users, MoreHorizontal, Pencil, Trash2, Mail } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function CompanyEmployeesPage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const companyId = params.id as string

  useEffect(() => {
    if (companyId) {
      loadCompanyAndEmployees()
    }
  }, [companyId])

  const loadCompanyAndEmployees = async () => {
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
        return
      }

      setCompany(companyData)

      // Load employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('employees')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })

      if (employeesError) {
        console.error('Error loading employees:', employeesError)
        return
      }

      setEmployees(employeesData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEmployee = async (employeeId: string, employeeName: string) => {
    if (!confirm(`Er du sikker på at du vil slette ${employeeName}? Dette kan ikke angres.`)) {
      return
    }

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

      // Refresh the list
      loadCompanyAndEmployees()
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
            <div className="h-64 bg-gray-200 rounded"></div>
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
              <Link href={`/dashboard/companies/${companyId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tilbake til {company.name}
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Ansatte</h1>
              <p className="text-muted-foreground">
                Administrer ansatte i {company.name}
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href={`/dashboard/companies/${companyId}/employees/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Legg til ansatt
            </Link>
          </Button>
        </div>

        {employees.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen ansatte ennå</h3>
              <p className="text-muted-foreground mb-6">
                Start med å legge til ansatte i {company.name} for å kunne kjøre phishing-tester
              </p>
              <Button asChild>
                <Link href={`/dashboard/companies/${companyId}/employees/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Legg til ansatt
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Ansatoversikt</CardTitle>
              <CardDescription>
                {employees.length} ansatt{employees.length !== 1 ? 'e' : ''} i {company.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>E-post</TableHead>
                    <TableHead>Stilling</TableHead>
                    <TableHead>Avdeling</TableHead>
                    <TableHead>Lagt til</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {employee.first_name} {employee.last_name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          {employee.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {employee.position ? (
                          <Badge variant="outline">{employee.position}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {employee.department || '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(employee.created_at).toLocaleDateString('no-NO')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/companies/${companyId}/employees/${employee.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Rediger
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteEmployee(
                                employee.id,
                                `${employee.first_name} ${employee.last_name}`
                              )}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Slett
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}