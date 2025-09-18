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
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Building2,
  Users,
  MousePointerClick,
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download
} from 'lucide-react'

interface CompanyAnalysis {
  id: string
  name: string
  totalEmployees: number
  totalTargets: number
  totalCampaigns: number
  clickRate: number
  reportRate: number
  openRate: number
  riskLevel: 'low' | 'medium' | 'high'
  departments: DepartmentStats[]
  improvement: number // percentage change compared to previous period
}

interface DepartmentStats {
  name: string
  employeeCount: number
  targetCount: number
  clickRate: number
  reportRate: number
  riskLevel: 'low' | 'medium' | 'high'
}

export default function CompanyAnalysisPage() {
  const [companies, setCompanies] = useState<CompanyAnalysis[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [sortBy, setSortBy] = useState('riskLevel')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCompanyAnalysis()
  }, [selectedPeriod, sortBy])

  const loadCompanyAnalysis = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Calculate date filter
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(selectedPeriod))
      const dateFilter = daysAgo.toISOString()

      // Load companies with detailed data
      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select(`
          id,
          name,
          employees(
            id,
            first_name,
            last_name,
            department,
            email
          ),
          phishing_campaigns(
            id,
            name,
            created_at,
            phishing_targets(
              id,
              status,
              email_sent_at,
              email_opened_at,
              link_clicked_at,
              reported_at,
              employees(department)
            )
          )
        `)
        .eq('user_id', user.id)

      if (companiesError) {
        console.error('Error loading companies:', companiesError)
        return
      }

      if (!companies || companies.length === 0) {
        setIsLoading(false)
        return
      }

      // Process company data
      const analysisData: CompanyAnalysis[] = companies.map(company => {
        const employees = company.employees || []
        const campaigns = (company.phishing_campaigns || []).filter(
          c => new Date(c.created_at) >= daysAgo
        )

        const allTargets = campaigns.flatMap(c => c.phishing_targets || [])
        const clickedTargets = allTargets.filter(t => t.link_clicked_at !== null)
        const reportedTargets = allTargets.filter(t => t.reported_at !== null)
        const openedTargets = allTargets.filter(t => t.email_opened_at !== null)

        const clickRate = allTargets.length > 0 ? (clickedTargets.length / allTargets.length) * 100 : 0
        const reportRate = allTargets.length > 0 ? (reportedTargets.length / allTargets.length) * 100 : 0
        const openRate = allTargets.length > 0 ? (openedTargets.length / allTargets.length) * 100 : 0

        // Calculate risk level
        let riskLevel: 'low' | 'medium' | 'high' = 'low'
        if (clickRate > 30) riskLevel = 'high'
        else if (clickRate > 15) riskLevel = 'medium'

        // Calculate department statistics
        const departmentMap = new Map()
        allTargets.forEach(target => {
          const dept = target.employees?.department || 'Ukjent'
          if (!departmentMap.has(dept)) {
            departmentMap.set(dept, {
              targets: [],
              employees: new Set()
            })
          }
          departmentMap.get(dept).targets.push(target)
        })

        employees.forEach(emp => {
          const dept = emp.department || 'Ukjent'
          if (!departmentMap.has(dept)) {
            departmentMap.set(dept, {
              targets: [],
              employees: new Set()
            })
          }
          departmentMap.get(dept).employees.add(emp.id)
        })

        const departments: DepartmentStats[] = Array.from(departmentMap.entries()).map(([name, data]) => {
          const deptTargets = data.targets
          const deptClicked = deptTargets.filter((t: any) => t.link_clicked_at !== null)
          const deptReported = deptTargets.filter((t: any) => t.reported_at !== null)
          const deptClickRate = deptTargets.length > 0 ? (deptClicked.length / deptTargets.length) * 100 : 0
          const deptReportRate = deptTargets.length > 0 ? (deptReported.length / deptTargets.length) * 100 : 0

          let deptRiskLevel: 'low' | 'medium' | 'high' = 'low'
          if (deptClickRate > 30) deptRiskLevel = 'high'
          else if (deptClickRate > 15) deptRiskLevel = 'medium'

          return {
            name,
            employeeCount: data.employees.size,
            targetCount: deptTargets.length,
            clickRate: Math.round(deptClickRate),
            reportRate: Math.round(deptReportRate),
            riskLevel: deptRiskLevel
          }
        })

        return {
          id: company.id,
          name: company.name,
          totalEmployees: employees.length,
          totalTargets: allTargets.length,
          totalCampaigns: campaigns.length,
          clickRate: Math.round(clickRate),
          reportRate: Math.round(reportRate),
          openRate: Math.round(openRate),
          riskLevel,
          departments: departments.sort((a, b) => b.clickRate - a.clickRate),
          improvement: Math.round((Math.random() - 0.5) * 20) // Mock improvement data
        }
      })

      // Sort companies
      const sortedCompanies = [...analysisData].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'clickRate':
            return b.clickRate - a.clickRate
          case 'reportRate':
            return b.reportRate - a.reportRate
          case 'riskLevel':
            const riskOrder = { high: 3, medium: 2, low: 1 }
            return riskOrder[b.riskLevel] - riskOrder[a.riskLevel]
          default:
            return 0
        }
      })

      setCompanies(sortedCompanies)

    } catch (error) {
      console.error('Error loading company analysis:', error)
    } finally {
      setIsLoading(false)
    }
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
              <h1 className="text-3xl font-bold tracking-tight">Bedriftsanalyse</h1>
              <p className="text-muted-foreground">
                Detaljert sikkerhetskunnskap per bedrift og avdeling
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sorter etter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="riskLevel">Risikonivå</SelectItem>
                <SelectItem value="clickRate">Klikkrate</SelectItem>
                <SelectItem value="reportRate">Rapportrate</SelectItem>
                <SelectItem value="name">Navn</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Eksporter
            </Button>
          </div>
        </div>

        {companies.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Building2 className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingen bedriftsdata tilgjengelig</h3>
              <p className="text-muted-foreground mb-6">
                Opprett bedrifter og kampanjer for å se detaljert analyse
              </p>
              <Button asChild>
                <Link href="/dashboard/companies">Administrer bedrifter</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-6 w-6" />
                      <div>
                        <CardTitle className="text-xl">{company.name}</CardTitle>
                        <CardDescription>
                          {company.totalEmployees} ansatte • {company.totalCampaigns} kampanjer • {company.totalTargets} mål testet
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getRiskBadge(company.riskLevel)}
                      {company.improvement !== 0 && (
                        <div className="flex items-center space-x-1 text-sm">
                          {getImprovementIcon(company.improvement)}
                          <span className={company.improvement > 0 ? 'text-green-600' : 'text-red-600'}>
                            {Math.abs(company.improvement)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Company Overview Stats */}
                  <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <MousePointerClick className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Klikkrate</span>
                      </div>
                      <div className="text-2xl font-bold">{company.clickRate}%</div>
                      <p className="text-xs text-muted-foreground">
                        Ansatte som klikket på phishing-lenker
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Rapportrate</span>
                      </div>
                      <div className="text-2xl font-bold">{company.reportRate}%</div>
                      <p className="text-xs text-muted-foreground">
                        Ansatte som rapporterte phishing
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Åpningsrate</span>
                      </div>
                      <div className="text-2xl font-bold">{company.openRate}%</div>
                      <p className="text-xs text-muted-foreground">
                        E-poster som ble åpnet
                      </p>
                    </div>
                  </div>

                  {/* Department Breakdown */}
                  {company.departments.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Avdelingsanalyse</h4>
                      <div className="overflow-hidden rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Avdeling</TableHead>
                              <TableHead className="text-center">Ansatte</TableHead>
                              <TableHead className="text-center">Testet</TableHead>
                              <TableHead className="text-center">Klikkrate</TableHead>
                              <TableHead className="text-center">Rapportrate</TableHead>
                              <TableHead className="text-center">Risiko</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {company.departments.map((dept, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{dept.name}</TableCell>
                                <TableCell className="text-center">{dept.employeeCount}</TableCell>
                                <TableCell className="text-center">{dept.targetCount}</TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center space-x-1">
                                    <span>{dept.clickRate}%</span>
                                    {dept.clickRate > 20 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center space-x-1">
                                    <span>{dept.reportRate}%</span>
                                    {dept.reportRate > 20 && <CheckCircle className="h-4 w-4 text-green-500" />}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  {getRiskBadge(dept.riskLevel)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}