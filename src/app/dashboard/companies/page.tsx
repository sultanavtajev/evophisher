'use client'

import { useEffect, useState } from 'react'
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
import { Company } from '@/lib/types/database'
import { Plus, Building2, Users, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface CompanyWithEmployees extends Company {
  employee_count?: number
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyWithEmployees[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('companies')
        .select(`
          *,
          employees!inner(count)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading companies:', error)
        return
      }

      // Transform the data to include employee count
      const companiesWithCount = await Promise.all(
        (data || []).map(async (company) => {
          const { count } = await supabase
            .from('employees')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', company.id)

          return {
            ...company,
            employee_count: count || 0
          }
        })
      )

      setCompanies(companiesWithCount)
    } catch (error) {
      console.error('Error loading companies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCompany = async (companyId: string) => {
    if (!confirm('Er du sikker på at du vil slette denne bedriften? Dette kan ikke angres.')) {
      return
    }

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

      // Refresh the list
      loadCompanies()
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
            <h1 className="text-3xl font-bold tracking-tight">Bedrifter</h1>
            <p className="text-muted-foreground">
              Administrer dine registrerte bedrifter
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/companies/new">
              <Plus className="mr-2 h-4 w-4" />
              Legg til bedrift
            </Link>
          </Button>
        </div>

        {companies.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Building2 className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen bedrifter ennå</h3>
              <p className="text-muted-foreground mb-6">
                Start med å legge til din første bedrift for å komme i gang med phishing-tester
              </p>
              <Button asChild>
                <Link href="/dashboard/companies/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Legg til bedrift
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Bedriftsoversikt</CardTitle>
              <CardDescription>
                {companies.length} bedrift{companies.length !== 1 ? 'er' : ''} registrert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>Org.nummer</TableHead>
                    <TableHead>E-post</TableHead>
                    <TableHead>Ansatte</TableHead>
                    <TableHead>Opprettet</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          {company.address && (
                            <div className="text-sm text-muted-foreground">
                              {company.address}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {company.org_number || '-'}
                      </TableCell>
                      <TableCell>
                        {company.email || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {company.employee_count} ansatt{company.employee_count !== 1 ? 'e' : ''}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(company.created_at).toLocaleDateString('no-NO')}
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
                              <Link href={`/dashboard/companies/${company.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Rediger
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteCompany(company.id)}
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