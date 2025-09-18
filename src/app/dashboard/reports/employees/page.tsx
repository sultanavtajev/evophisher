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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Users,
  Search,
  MousePointerClick,
  Shield,
  Mail,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Download
} from 'lucide-react'

interface EmployeeAnalysis {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  companyName: string
  totalTargeted: number
  emailsSent: number
  emailsOpened: number
  linksClicked: number
  phishingReported: number
  clickRate: number
  reportRate: number
  openRate: number
  riskLevel: 'low' | 'medium' | 'high'
  lastActivity: string | null
  improvement: number // percentage change compared to previous period
}

export default function EmployeeAnalysisPage() {
  const [employees, setEmployees] = useState<EmployeeAnalysis[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeAnalysis[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('riskLevel')
  const [companies, setCompanies] = useState<{id: string, name: string}[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadEmployeeAnalysis()
  }, [selectedPeriod, sortBy])

  useEffect(() => {
    filterEmployees()
  }, [employees, selectedCompany, selectedDepartment, searchTerm])

  const loadEmployeeAnalysis = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Calculate date filter
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(selectedPeriod))
      const dateFilter = daysAgo.toISOString()

      // Load employees with their phishing target data
      const { data: employees, error: employeesError } = await supabase
        .from('employees')
        .select(`
          id,
          first_name,
          last_name,
          email,
          department,
          position,
          companies!inner(id, name, user_id),
          phishing_targets(
            id,
            status,
            email_sent_at,
            email_opened_at,
            link_clicked_at,
            reported_at,
            phishing_campaigns!inner(created_at)
          )
        `)
        .eq('companies.user_id', user.id)

      if (employeesError) {
        console.error('Error loading employees:', employeesError)
        return
      }

      if (!employees || employees.length === 0) {
        setIsLoading(false)
        return
      }

      // Process employee data
      const analysisData: EmployeeAnalysis[] = employees.map(employee => {
        // Filter targets by date
        const targets = (employee.phishing_targets || []).filter(
          t => new Date(t.phishing_campaigns.created_at) >= daysAgo
        )

        const emailsSent = targets.filter(t => t.email_sent_at !== null).length
        const emailsOpened = targets.filter(t => t.email_opened_at !== null).length
        const linksClicked = targets.filter(t => t.link_clicked_at !== null).length
        const phishingReported = targets.filter(t => t.reported_at !== null).length

        const clickRate = targets.length > 0 ? (linksClicked / targets.length) * 100 : 0
        const reportRate = targets.length > 0 ? (phishingReported / targets.length) * 100 : 0
        const openRate = targets.length > 0 ? (emailsOpened / targets.length) * 100 : 0

        // Calculate risk level
        let riskLevel: 'low' | 'medium' | 'high' = 'low'
        if (clickRate > 50) riskLevel = 'high'
        else if (clickRate > 25) riskLevel = 'medium'

        // Find last activity
        const allDates = targets.map(t => [
          t.email_sent_at,
          t.email_opened_at,
          t.link_clicked_at,
          t.reported_at
        ]).flat().filter(Boolean)
        const lastActivity = allDates.length > 0 ? Math.max(...allDates.map(d => new Date(d as string).getTime())) : null

        return {
          id: employee.id,
          firstName: employee.first_name,
          lastName: employee.last_name,
          email: employee.email,
          department: employee.department || 'Ukjent',
          position: employee.position || 'Ukjent',
          companyName: employee.companies.name,
          totalTargeted: targets.length,
          emailsSent,
          emailsOpened,
          linksClicked,
          phishingReported,
          clickRate: Math.round(clickRate),
          reportRate: Math.round(reportRate),
          openRate: Math.round(openRate),
          riskLevel,
          lastActivity: lastActivity ? new Date(lastActivity).toISOString() : null,
          improvement: Math.round((Math.random() - 0.5) * 40) // Mock improvement data
        }
      })

      // Sort employees
      const sortedEmployees = [...analysisData].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
          case 'clickRate':
            return b.clickRate - a.clickRate
          case 'reportRate':
            return b.reportRate - a.reportRate
          case 'riskLevel':
            const riskOrder = { high: 3, medium: 2, low: 1 }
            return riskOrder[b.riskLevel] - riskOrder[a.riskLevel]
          case 'lastActivity':
            const aTime = a.lastActivity ? new Date(a.lastActivity).getTime() : 0
            const bTime = b.lastActivity ? new Date(b.lastActivity).getTime() : 0
            return bTime - aTime
          default:
            return 0
        }
      })

      setEmployees(sortedEmployees)

      // Extract unique companies and departments
      const uniqueCompanies = Array.from(new Set(analysisData.map(e => e.companyName)))
        .map(name => ({ id: name, name }))
      const uniqueDepartments = Array.from(new Set(analysisData.map(e => e.department)))

      setCompanies(uniqueCompanies)
      setDepartments(uniqueDepartments)

    } catch (error) {
      console.error('Error loading employee analysis:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterEmployees = () => {
    let filtered = employees

    if (selectedCompany !== 'all') {
      filtered = filtered.filter(emp => emp.companyName === selectedCompany)
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term)
      )
    }

    setFilteredEmployees(filtered)
  }

  const getRiskBadge = (level: 'low' | 'medium' | 'high') => {
    const config = {
      low: { label: 'Lav risiko', variant: 'default' as const, color: 'bg-green-500' },
      medium: { label: 'Middels risiko', variant: 'secondary' as const, color: 'bg-yellow-500' },
      high: { label: 'Høy risiko', variant: 'destructive' as const, color: 'bg-red-500' }
    }

    const riskConfig = config[level]
    return (
      <Badge variant={riskConfig.variant} className={riskConfig.color}>
        {riskConfig.label}
      </Badge>
    )
  }

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) {
      return <TrendingDown className="h-4 w-4 text-green-500" />
    } else if (improvement < 0) {
      return <TrendingUp className="h-4 w-4 text-red-500" />
    }
    return null
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

  // Calculate overview stats
  const totalEmployees = filteredEmployees.length
  const highRiskEmployees = filteredEmployees.filter(e => e.riskLevel === 'high').length
  const averageClickRate = totalEmployees > 0
    ? Math.round(filteredEmployees.reduce((sum, e) => sum + e.clickRate, 0) / totalEmployees)
    : 0
  const averageReportRate = totalEmployees > 0
    ? Math.round(filteredEmployees.reduce((sum, e) => sum + e.reportRate, 0) / totalEmployees)
    : 0

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/reports">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tilbake til rapporter
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Ansattanalyse</h1>
              <p className="text-muted-foreground">
                Individuell sikkerhetskunnskap og ytelse
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tidsperiode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Siste 7 dager</SelectItem>
                <SelectItem value="30">Siste 30 dager</SelectItem>
                <SelectItem value="90">Siste 3 måneder</SelectItem>
                <SelectItem value="365">Siste år</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Eksporter
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total ansatte</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
              <p className="text-xs text-muted-foreground">
                I valgt periode
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Høy risiko</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highRiskEmployees}</div>
              <p className="text-xs text-muted-foreground">
                Ansatte med høy sårbarhet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Snitt klikkrate</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageClickRate}%</div>
              <p className="text-xs text-muted-foreground">
                Gjennomsnittlig sårbarhet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Snitt rapportrate</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageReportRate}%</div>
              <p className="text-xs text-muted-foreground">
                Gjennomsnittlig oppmerksom
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Søk ansatte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Alle bedrifter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle bedrifter</SelectItem>
              {companies.map(company => (
                <SelectItem key={company.id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Alle avdelinger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle avdelinger</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sorter etter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="riskLevel">Risikonivå</SelectItem>
              <SelectItem value="clickRate">Klikkrate</SelectItem>
              <SelectItem value="reportRate">Rapportrate</SelectItem>
              <SelectItem value="name">Navn</SelectItem>
              <SelectItem value="lastActivity">Siste aktivitet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employee Table */}
        {filteredEmployees.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen ansatte funnet</h3>
              <p className="text-muted-foreground mb-6">
                Prøv å justere filtrene eller tidsperioden
              </p>
              <Button variant="outline" onClick={() => {
                setSelectedCompany('all')
                setSelectedDepartment('all')
                setSearchTerm('')
              }}>
                Nullstill filtre
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Ansattytelse</CardTitle>
              <CardDescription>
                {filteredEmployees.length} ansatte i valgt periode og filtre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ansatt</TableHead>
                      <TableHead>Bedrift</TableHead>
                      <TableHead>Avdeling</TableHead>
                      <TableHead className="text-center">Testet</TableHead>
                      <TableHead className="text-center">Klikkrate</TableHead>
                      <TableHead className="text-center">Rapportrate</TableHead>
                      <TableHead className="text-center">Risiko</TableHead>
                      <TableHead className="text-center">Trend</TableHead>
                      <TableHead>Siste aktivitet</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {employee.email}
                            </div>
                            {employee.position && (
                              <div className="text-xs text-muted-foreground">
                                {employee.position}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{employee.companyName}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell className="text-center">{employee.totalTargeted}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <span className={employee.clickRate > 30 ? 'text-red-600 font-semibold' : ''}>
                              {employee.clickRate}%
                            </span>
                            {employee.clickRate > 30 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <span className={employee.reportRate > 50 ? 'text-green-600 font-semibold' : ''}>
                              {employee.reportRate}%
                            </span>
                            {employee.reportRate > 50 && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {getRiskBadge(employee.riskLevel)}
                        </TableCell>
                        <TableCell className="text-center">
                          {employee.improvement !== 0 && (
                            <div className="flex items-center justify-center space-x-1">
                              {getImprovementIcon(employee.improvement)}
                              <span className={`text-sm ${employee.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {Math.abs(employee.improvement)}%
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {employee.lastActivity ? (
                            <div className="text-sm">
                              {new Date(employee.lastActivity).toLocaleDateString('no-NO')}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}