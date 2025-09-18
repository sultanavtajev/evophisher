'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import {
  ArrowLeft,
  GraduationCap,
  Users,
  Clock,
  Award,
  Bell,
  BookOpen,
  Target,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Save,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Settings,
  Mail,
  Calendar,
  Star
} from 'lucide-react'

interface TrainingSettings {
  auto_assignment: {
    enabled: boolean
    new_employee_training: boolean
    failed_phishing_training: boolean
    periodic_refresher: boolean
    refresher_frequency: number // months
    high_risk_threshold: number // click rate %
  }
  certification: {
    enabled: boolean
    passing_score: number // percentage
    allow_retakes: boolean
    max_retakes: number
    certificate_template: string
    expiry_months: number
  }
  notifications: {
    assignment_notification: boolean
    reminder_frequency: number // days
    deadline_warning_days: number
    escalation_enabled: boolean
    escalation_after_days: number
    completion_celebration: boolean
  }
  content_settings: {
    default_language: string
    include_company_branding: boolean
    adaptive_difficulty: boolean
    gamification_enabled: boolean
    mobile_optimized: boolean
  }
  scoring: {
    points_per_module: number
    bonus_points_early_completion: number
    penalty_for_late_completion: number
    leaderboard_enabled: boolean
    team_competition: boolean
  }
}

interface TrainingModule {
  id: string
  title: string
  description: string
  module_type: 'awareness' | 'technical' | 'policy' | 'assessment'
  estimated_duration: number
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  is_active: boolean
  completion_rate: number
  average_score: number
}

interface LearningPath {
  id: string
  name: string
  description: string
  modules: string[] // module IDs
  target_audience: string
  estimated_total_duration: number
  completion_rate: number
  is_active: boolean
}

interface AutoAssignmentRule {
  id: string
  name: string
  trigger: string
  target_modules: string[]
  target_groups: string[]
  is_active: boolean
  created_date: string
}

export default function TrainingSettingsPage() {
  const [settings, setSettings] = useState<TrainingSettings>({
    auto_assignment: {
      enabled: true,
      new_employee_training: true,
      failed_phishing_training: true,
      periodic_refresher: true,
      refresher_frequency: 6,
      high_risk_threshold: 30
    },
    certification: {
      enabled: true,
      passing_score: 80,
      allow_retakes: true,
      max_retakes: 3,
      certificate_template: 'standard',
      expiry_months: 12
    },
    notifications: {
      assignment_notification: true,
      reminder_frequency: 7,
      deadline_warning_days: 3,
      escalation_enabled: true,
      escalation_after_days: 14,
      completion_celebration: true
    },
    content_settings: {
      default_language: 'no',
      include_company_branding: true,
      adaptive_difficulty: false,
      gamification_enabled: true,
      mobile_optimized: true
    },
    scoring: {
      points_per_module: 100,
      bonus_points_early_completion: 20,
      penalty_for_late_completion: 10,
      leaderboard_enabled: true,
      team_competition: false
    }
  })
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([])
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [assignmentRules, setAssignmentRules] = useState<AutoAssignmentRule[]>([])
  const [showNewPath, setShowNewPath] = useState(false)
  const [showNewRule, setShowNewRule] = useState(false)
  const [newPath, setNewPath] = useState({ name: '', description: '', target_audience: '' })
  const [newRule, setNewRule] = useState({ name: '', trigger: '', target_groups: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadTrainingData()
  }, [])

  const loadTrainingData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load mock training modules
      setTrainingModules([
        {
          id: '1',
          title: 'Grunnleggende phishing-awareness',
          description: 'Introduksjon til phishing-angrep og hvordan gjenkjenne dem',
          module_type: 'awareness',
          estimated_duration: 15,
          difficulty_level: 'beginner',
          is_active: true,
          completion_rate: 85,
          average_score: 78
        },
        {
          id: '2',
          title: 'Avansert e-post sikkerhet',
          description: 'Dype tekniske aspekter ved e-post sikkerhet',
          module_type: 'technical',
          estimated_duration: 45,
          difficulty_level: 'advanced',
          is_active: true,
          completion_rate: 62,
          average_score: 82
        },
        {
          id: '3',
          title: 'Sikkerhetspolicyer og prosedyrer',
          description: 'Organisasjonens sikkerhetspolicyer',
          module_type: 'policy',
          estimated_duration: 30,
          difficulty_level: 'intermediate',
          is_active: false,
          completion_rate: 71,
          average_score: 76
        },
        {
          id: '4',
          title: 'Sikkerhetskunnskap-test',
          description: 'Omfattende test av sikkerhetskunnskap',
          module_type: 'assessment',
          estimated_duration: 20,
          difficulty_level: 'intermediate',
          is_active: true,
          completion_rate: 58,
          average_score: 85
        }
      ])

      // Load mock learning paths
      setLearningPaths([
        {
          id: '1',
          name: 'Ny ansatt sikkerhetstrening',
          description: 'Komplett onboarding-program for nye ansatte',
          modules: ['1', '3', '4'],
          target_audience: 'Alle nye ansatte',
          estimated_total_duration: 65,
          completion_rate: 78,
          is_active: true
        },
        {
          id: '2',
          name: 'IT-spesialist sertifisering',
          description: 'Avansert treningsløp for IT-personell',
          modules: ['2', '4'],
          target_audience: 'IT-avdeling',
          estimated_total_duration: 65,
          completion_rate: 45,
          is_active: true
        },
        {
          id: '3',
          name: 'Ledelsestrening',
          description: 'Sikkerhetsledelse og risikohåndtering',
          modules: ['3'],
          target_audience: 'Ledere og mellomledere',
          estimated_total_duration: 30,
          completion_rate: 67,
          is_active: false
        }
      ])

      // Load mock assignment rules
      setAssignmentRules([
        {
          id: '1',
          name: 'Ny ansatt onboarding',
          trigger: 'new_employee',
          target_modules: ['1', '3'],
          target_groups: ['Alle ansatte'],
          is_active: true,
          created_date: '2024-01-15'
        },
        {
          id: '2',
          name: 'Høy risiko oppfølging',
          trigger: 'failed_phishing',
          target_modules: ['1', '2'],
          target_groups: ['Ansatte med >30% klikkrate'],
          is_active: true,
          created_date: '2024-01-10'
        },
        {
          id: '3',
          name: 'Kvartalsvis oppfriskning',
          trigger: 'periodic',
          target_modules: ['4'],
          target_groups: ['Alle ansatte'],
          is_active: false,
          created_date: '2024-01-05'
        }
      ])

    } catch (error) {
      console.error('Error loading training data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      // In a real app, this would save to training_settings table
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ type: 'success', text: 'Treningsinnstillinger lagret' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Feil ved lagring av innstillinger' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleModule = async (moduleId: string) => {
    setTrainingModules(trainingModules.map(module =>
      module.id === moduleId ? { ...module, is_active: !module.is_active } : module
    ))
    setMessage({ type: 'success', text: 'Modul-status oppdatert' })
  }

  const handleToggleLearningPath = async (pathId: string) => {
    setLearningPaths(learningPaths.map(path =>
      path.id === pathId ? { ...path, is_active: !path.is_active } : path
    ))
    setMessage({ type: 'success', text: 'Læringsstier-status oppdatert' })
  }

  const handleToggleRule = async (ruleId: string) => {
    setAssignmentRules(assignmentRules.map(rule =>
      rule.id === ruleId ? { ...rule, is_active: !rule.is_active } : rule
    ))
    setMessage({ type: 'success', text: 'Regel-status oppdatert' })
  }

  const handleAddLearningPath = async () => {
    if (!newPath.name.trim()) return

    const path: LearningPath = {
      id: Date.now().toString(),
      name: newPath.name,
      description: newPath.description,
      modules: [],
      target_audience: newPath.target_audience,
      estimated_total_duration: 0,
      completion_rate: 0,
      is_active: true
    }

    setLearningPaths([...learningPaths, path])
    setNewPath({ name: '', description: '', target_audience: '' })
    setShowNewPath(false)
    setMessage({ type: 'success', text: 'Læringsstier lagt til' })
  }

  const handleAddRule = async () => {
    if (!newRule.name.trim()) return

    const rule: AutoAssignmentRule = {
      id: Date.now().toString(),
      name: newRule.name,
      trigger: newRule.trigger,
      target_modules: [],
      target_groups: [newRule.target_groups],
      is_active: true,
      created_date: new Date().toISOString().split('T')[0]
    }

    setAssignmentRules([...assignmentRules, rule])
    setNewRule({ name: '', trigger: '', target_groups: '' })
    setShowNewRule(false)
    setMessage({ type: 'success', text: 'Regel lagt til' })
  }

  const getModuleTypeBadge = (type: string) => {
    const config = {
      awareness: { label: 'Bevissthet', variant: 'default' as const },
      technical: { label: 'Teknisk', variant: 'secondary' as const },
      policy: { label: 'Policy', variant: 'outline' as const },
      assessment: { label: 'Vurdering', variant: 'destructive' as const }
    }
    const { label, variant } = config[type as keyof typeof config] || config.awareness
    return <Badge variant={variant}>{label}</Badge>
  }

  const getDifficultyBadge = (level: string) => {
    const config = {
      beginner: { label: 'Nybegynner', color: 'bg-green-500' },
      intermediate: { label: 'Mellom', color: 'bg-yellow-500' },
      advanced: { label: 'Avansert', color: 'bg-red-500' }
    }
    const { label, color } = config[level as keyof typeof config] || config.beginner
    return <Badge className={color}>{label}</Badge>
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/settings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbake til innstillinger
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Treningsmodul-innstillinger</h1>
            <p className="text-muted-foreground">
              Standard treningsinnhold og automatisk tildeling
            </p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center">
              {message.type === 'error' && <AlertTriangle className="h-4 w-4 mr-2" />}
              {message.type === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
              {message.text}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Auto Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Automatisk tildeling
              </CardTitle>
              <CardDescription>
                Regler for automatisk tildeling av treningsmoduler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aktiver automatisk tildeling</Label>
                  <p className="text-sm text-muted-foreground">
                    Tildel treningsmoduler automatisk basert på regler
                  </p>
                </div>
                <Switch
                  checked={settings.auto_assignment.enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    auto_assignment: { ...settings.auto_assignment, enabled: checked }
                  })}
                />
              </div>

              {settings.auto_assignment.enabled && (
                <>
                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Nye ansatte</Label>
                    <Switch
                      checked={settings.auto_assignment.new_employee_training}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        auto_assignment: { ...settings.auto_assignment, new_employee_training: checked }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Etter feilede phishing-tester</Label>
                    <Switch
                      checked={settings.auto_assignment.failed_phishing_training}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        auto_assignment: { ...settings.auto_assignment, failed_phishing_training: checked }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Periodisk oppfriskning</Label>
                    <Switch
                      checked={settings.auto_assignment.periodic_refresher}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        auto_assignment: { ...settings.auto_assignment, periodic_refresher: checked }
                      })}
                    />
                  </div>

                  {settings.auto_assignment.periodic_refresher && (
                    <div>
                      <Label className="text-sm">Oppfrisknings-frekvens (måneder)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="24"
                        value={settings.auto_assignment.refresher_frequency}
                        onChange={(e) => setSettings({
                          ...settings,
                          auto_assignment: { ...settings.auto_assignment, refresher_frequency: parseInt(e.target.value) || 6 }
                        })}
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <Label className="text-sm">Høy risiko terskel (klikkrate %)</Label>
                    <Input
                      type="number"
                      min="10"
                      max="100"
                      value={settings.auto_assignment.high_risk_threshold}
                      onChange={(e) => setSettings({
                        ...settings,
                        auto_assignment: { ...settings.auto_assignment, high_risk_threshold: parseInt(e.target.value) || 30 }
                      })}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Klikkrate som utløser automatisk tillegstrening
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Certification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Sertifisering og poenggiving
              </CardTitle>
              <CardDescription>
                Konfigurasjon av sertifikater og scoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aktiver sertifisering</Label>
                  <p className="text-sm text-muted-foreground">
                    Generer sertifikater ved bestått trening
                  </p>
                </div>
                <Switch
                  checked={settings.certification.enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    certification: { ...settings.certification, enabled: checked }
                  })}
                />
              </div>

              {settings.certification.enabled && (
                <>
                  <Separator />

                  <div>
                    <Label className="text-sm">Bestått-score (%)</Label>
                    <Input
                      type="number"
                      min="50"
                      max="100"
                      value={settings.certification.passing_score}
                      onChange={(e) => setSettings({
                        ...settings,
                        certification: { ...settings.certification, passing_score: parseInt(e.target.value) || 80 }
                      })}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Tillat nye forsøk</Label>
                    <Switch
                      checked={settings.certification.allow_retakes}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        certification: { ...settings.certification, allow_retakes: checked }
                      })}
                    />
                  </div>

                  {settings.certification.allow_retakes && (
                    <div>
                      <Label className="text-sm">Maksimum forsøk</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={settings.certification.max_retakes}
                        onChange={(e) => setSettings({
                          ...settings,
                          certification: { ...settings.certification, max_retakes: parseInt(e.target.value) || 3 }
                        })}
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <Label className="text-sm">Sertifikat utløper etter (måneder)</Label>
                    <Input
                      type="number"
                      min="3"
                      max="36"
                      value={settings.certification.expiry_months}
                      onChange={(e) => setSettings({
                        ...settings,
                        certification: { ...settings.certification, expiry_months: parseInt(e.target.value) || 12 }
                      })}
                      className="mt-1"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Varslinger og påminnelser
              </CardTitle>
              <CardDescription>
                Konfigurasjon av treningsvarslinger
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Tildelings-varsling</Label>
                <Switch
                  checked={settings.notifications.assignment_notification}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, assignment_notification: checked }
                  })}
                />
              </div>

              <div>
                <Label className="text-sm">Påminnelse-frekvens (dager)</Label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.notifications.reminder_frequency}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, reminder_frequency: parseInt(e.target.value) || 7 }
                  })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Frist-advarsel (dager før)</Label>
                <Input
                  type="number"
                  min="1"
                  max="14"
                  value={settings.notifications.deadline_warning_days}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, deadline_warning_days: parseInt(e.target.value) || 3 }
                  })}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Eskalering til ledelse</Label>
                  <p className="text-xs text-muted-foreground">
                    Varsle ledelse ved manglende gjennomføring
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.escalation_enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, escalation_enabled: checked }
                  })}
                />
              </div>

              {settings.notifications.escalation_enabled && (
                <div>
                  <Label className="text-sm">Eskalering etter (dager)</Label>
                  <Input
                    type="number"
                    min="7"
                    max="60"
                    value={settings.notifications.escalation_after_days}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, escalation_after_days: parseInt(e.target.value) || 14 }
                    })}
                    className="mt-1"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label className="text-sm">Fullførings-feiring</Label>
                <Switch
                  checked={settings.notifications.completion_celebration}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, completion_celebration: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Innholds-innstillinger
              </CardTitle>
              <CardDescription>
                Tilpasning av treningsinnhold
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm">Standard språk</Label>
                <Select value={settings.content_settings.default_language} onValueChange={(value) =>
                  setSettings({...settings, content_settings: {...settings.content_settings, default_language: value}})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Norsk</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sv">Svenska</SelectItem>
                    <SelectItem value="da">Dansk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Inkluder bedrifts-branding</Label>
                <Switch
                  checked={settings.content_settings.include_company_branding}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    content_settings: { ...settings.content_settings, include_company_branding: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Adaptiv vanskelighetsgrad</Label>
                <Switch
                  checked={settings.content_settings.adaptive_difficulty}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    content_settings: { ...settings.content_settings, adaptive_difficulty: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Gamification</Label>
                <Switch
                  checked={settings.content_settings.gamification_enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    content_settings: { ...settings.content_settings, gamification_enabled: checked }
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Mobil-optimalisert</Label>
                <Switch
                  checked={settings.content_settings.mobile_optimized}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    content_settings: { ...settings.content_settings, mobile_optimized: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Modules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Tilgjengelige treningsmoduler
            </CardTitle>
            <CardDescription>
              Administrer treningsmoduler og deres status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tittel</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Vanskelighet</TableHead>
                  <TableHead className="text-center">Varighet</TableHead>
                  <TableHead className="text-center">Fullføring</TableHead>
                  <TableHead className="text-center">Snitt score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingModules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{module.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {module.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getModuleTypeBadge(module.module_type)}
                    </TableCell>
                    <TableCell>
                      {getDifficultyBadge(module.difficulty_level)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {module.estimated_duration}min
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{module.completion_rate}%</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {module.average_score}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={module.is_active ? 'default' : 'secondary'}>
                        {module.is_active ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleModule(module.id)}
                        >
                          {module.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Learning Paths */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Læringsstier
                </CardTitle>
                <CardDescription>
                  Strukturerte treningsforløp for forskjellige målgrupper
                </CardDescription>
              </div>
              <Dialog open={showNewPath} onOpenChange={setShowNewPath}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ny læringsstier
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Opprett ny læringsstier</DialogTitle>
                    <DialogDescription>
                      Definer en strukturert treningssekvens for en målgruppe
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Navn</Label>
                      <Input
                        value={newPath.name}
                        onChange={(e) => setNewPath({...newPath, name: e.target.value})}
                        placeholder="f.eks. Ny ansatt onboarding"
                      />
                    </div>
                    <div>
                      <Label>Beskrivelse</Label>
                      <Textarea
                        value={newPath.description}
                        onChange={(e) => setNewPath({...newPath, description: e.target.value})}
                        placeholder="Beskriv formålet med læringsstieren"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Målgruppe</Label>
                      <Input
                        value={newPath.target_audience}
                        onChange={(e) => setNewPath({...newPath, target_audience: e.target.value})}
                        placeholder="f.eks. Alle nye ansatte"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewPath(false)}>
                      Avbryt
                    </Button>
                    <Button onClick={handleAddLearningPath} disabled={!newPath.name.trim()}>
                      Opprett læringsstier
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Navn</TableHead>
                  <TableHead>Målgruppe</TableHead>
                  <TableHead className="text-center">Moduler</TableHead>
                  <TableHead className="text-center">Total tid</TableHead>
                  <TableHead className="text-center">Fullføring</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {learningPaths.map((path) => (
                  <TableRow key={path.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{path.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {path.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{path.target_audience}</TableCell>
                    <TableCell className="text-center">{path.modules.length}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {path.estimated_total_duration}min
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{path.completion_rate}%</TableCell>
                    <TableCell>
                      <Badge variant={path.is_active ? 'default' : 'secondary'}>
                        {path.is_active ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleLearningPath(path.id)}
                        >
                          {path.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Assignment Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Automatiske tildelings-regler
                </CardTitle>
                <CardDescription>
                  Definer når treningsmoduler skal tildeles automatisk
                </CardDescription>
              </div>
              <Dialog open={showNewRule} onOpenChange={setShowNewRule}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Ny regel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Opprett ny tildelings-regel</DialogTitle>
                    <DialogDescription>
                      Definer betingelser for automatisk tildeling av trening
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Regel-navn</Label>
                      <Input
                        value={newRule.name}
                        onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                        placeholder="f.eks. Høy risiko oppfølging"
                      />
                    </div>
                    <div>
                      <Label>Utløser</Label>
                      <Select value={newRule.trigger} onValueChange={(value) => setNewRule({...newRule, trigger: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Velg utløser" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new_employee">Ny ansatt</SelectItem>
                          <SelectItem value="failed_phishing">Feilet phishing-test</SelectItem>
                          <SelectItem value="periodic">Periodisk</SelectItem>
                          <SelectItem value="high_risk">Høy risiko-score</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Målgruppe</Label>
                      <Input
                        value={newRule.target_groups}
                        onChange={(e) => setNewRule({...newRule, target_groups: e.target.value})}
                        placeholder="f.eks. Alle ansatte, IT-avdeling"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewRule(false)}>
                      Avbryt
                    </Button>
                    <Button onClick={handleAddRule} disabled={!newRule.name.trim()}>
                      Opprett regel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Regel-navn</TableHead>
                  <TableHead>Utløser</TableHead>
                  <TableHead>Målgrupper</TableHead>
                  <TableHead>Moduler</TableHead>
                  <TableHead>Opprettet</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignmentRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{rule.trigger}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {rule.target_groups.join(', ')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {rule.target_modules.length} modul(er)
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(rule.created_date).toLocaleDateString('no-NO')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={rule.is_active ? 'default' : 'secondary'}>
                        {rule.is_active ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleRule(rule.id)}
                        >
                          {rule.is_active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/settings">Avbryt</Link>
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Lagrer...' : 'Lagre alle innstillinger'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}