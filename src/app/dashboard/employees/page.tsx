'use client'

import { useState, useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { Employee, Company } from '@/lib/types/database'
import { Plus, Users, MoreHorizontal, Pencil, Trash2, Mail, Building2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface EmployeeWithCompany extends Employee {
  company_name?: string
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeWithCompany[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeWithCompany[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [selectedCompany, employees])

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

      // Load employees
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          companies!inner(name, user_id)
        `)
        .eq('companies.user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading employees:', error)
        return
      }

      const employeesWithCompany = (data || []).map(employee => ({
        ...employee,
        company_name: employee.companies?.name
      }))

      setEmployees(employeesWithCompany)
    } catch (error) {
      console.error('Error loading employees:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterEmployees = () => {
    if (selectedCompany === 'all') {
      setFilteredEmployees(employees)
    } else {
      setFilteredEmployees(employees.filter(employee => employee.company_id === selectedCompany))
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
      loadData()
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

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ansatte</h1>
            <p className="text-muted-foreground">
              Administrer alle ansatte på tvers av bedrifter
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/employees/new">
              <Plus className="mr-2 h-4 w-4" />
              Legg til ansatt
            </Link>
          </Button>
        </div>

        {/* Company Filter */}
        {companies.length > 0 && (
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Filtrer etter bedrift:</label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Alle bedrifter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle bedrifter</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {filteredEmployees.length === 0 && employees.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen ansatte ennå</h3>
              <p className="text-muted-foreground mb-6">
                Start med å legge til bedrifter og ansatte for å se oversikten her
              </p>
              <Button asChild>
                <Link href="/dashboard/employees/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Legg til ansatt
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : filteredEmployees.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen ansatte funnet</h3>
              <p className="text-muted-foreground mb-6">
                Ingen ansatte matcher det valgte filteret.
              </p>
              <Button variant="outline" onClick={() => setSelectedCompany('all')}>
                Vis alle ansatte
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Ansattoversikt</CardTitle>
              <CardDescription>
                {filteredEmployees.length} ansatt{filteredEmployees.length !== 1 ? 'e' : ''}
                {selectedCompany !== 'all' ? ' i valgt bedrift' : ' registrert'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>E-post</TableHead>
                    <TableHead>Bedrift</TableHead>
                    <TableHead>Stilling</TableHead>
                    <TableHead>Avdeling</TableHead>
                    <TableHead>Lagt til</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="font-medium">
                          {employee.first_name} {employee.last_name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          {employee.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                          {employee.company_name}
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
                              <Link href={`/dashboard/employees/${employee.id}/edit`}>
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