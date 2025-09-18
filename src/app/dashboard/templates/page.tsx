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
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { supabase } from '@/lib/supabase/client'
import { EmailTemplate } from '@/lib/types/database'
import { Plus, Mail, MoreHorizontal, Pencil, Trash2, Copy, Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SeedTemplatesComponent } from './seed-templates'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .or(`user_id.eq.${user.id},is_public.eq.true`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading templates:', error)
        return
      }

      setTemplates(data || [])
    } catch (error) {
      console.error('Error loading templates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTypeeBadge = (type: string) => {
    const typeConfig = {
      phishing: { label: 'Phishing', variant: 'destructive' as const },
      training: { label: 'Trening', variant: 'default' as const },
      notification: { label: 'Notifikasjon', variant: 'secondary' as const }
    }

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.phishing
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const handleDeleteTemplate = async (templateId: string, templateName: string) => {
    if (!confirm(`Er du sikker på at du vil slette malen "${templateName}"? Dette kan ikke angres.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', templateId)

      if (error) {
        console.error('Error deleting template:', error)
        alert('Feil ved sletting av mal')
        return
      }

      loadTemplates()
    } catch (error) {
      console.error('Error deleting template:', error)
      alert('En uventet feil oppstod')
    }
  }

  const handleDuplicateTemplate = async (template: EmailTemplate) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const newTemplate = {
        user_id: user.id,
        name: `${template.name} (kopi)`,
        subject: template.subject,
        body: template.body,
        template_type: template.template_type,
        is_public: false
      }

      const { error } = await supabase
        .from('email_templates')
        .insert([newTemplate])

      if (error) {
        console.error('Error duplicating template:', error)
        alert('Feil ved kopiering av mal')
        return
      }

      loadTemplates()
    } catch (error) {
      console.error('Error duplicating template:', error)
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

  const userTemplates = templates.filter(t => !t.is_public)
  const publicTemplates = templates.filter(t => t.is_public)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">E-post maler</h1>
            <p className="text-muted-foreground">
              Administrer og opprett gjenbrukbare e-post maler for phishing-tester
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/templates/new">
              <Plus className="mr-2 h-4 w-4" />
              Ny mal
            </Link>
          </Button>
        </div>

        {/* Seed Templates */}
        {userTemplates.length === 0 && publicTemplates.length === 0 && (
          <SeedTemplatesComponent />
        )}

        {/* User Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Mine maler</CardTitle>
            <CardDescription>
              {userTemplates.length} egendefinerte maler
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userTemplates.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ingen egne maler ennå</h3>
                <p className="text-muted-foreground mb-6">
                  Opprett din første e-post mal for phishing-tester
                </p>
                <Button asChild>
                  <Link href="/dashboard/templates/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Opprett mal
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>Emne</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Opprettet</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div className="font-medium">{template.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md truncate">
                          {template.subject}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeeBadge(template.template_type)}</TableCell>
                      <TableCell>
                        {new Date(template.created_at).toLocaleDateString('no-NO')}
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
                              <Link href={`/dashboard/templates/${template.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Rediger
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDuplicateTemplate(template)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Dupliser
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteTemplate(template.id, template.name)}
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
            )}
          </CardContent>
        </Card>

        {/* Public Templates */}
        {publicTemplates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Offentlige maler
              </CardTitle>
              <CardDescription>
                {publicTemplates.length} forhåndsdefinerte maler tilgjengelig for alle brukere
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>Emne</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Opprettet</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {publicTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div className="font-medium">{template.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md truncate">
                          {template.subject}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeeBadge(template.template_type)}</TableCell>
                      <TableCell>
                        {new Date(template.created_at).toLocaleDateString('no-NO')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleDuplicateTemplate(template)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Kopier til mine maler
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