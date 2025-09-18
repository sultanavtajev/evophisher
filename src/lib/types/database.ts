export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          phone: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          phone?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          phone?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          user_id: string
          name: string
          org_number: string | null
          address: string | null
          phone: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          org_number?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          org_number?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          company_id: string
          first_name: string
          last_name: string
          email: string
          position: string | null
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          first_name: string
          last_name: string
          email: string
          position?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          first_name?: string
          last_name?: string
          email?: string
          position?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      phishing_campaigns: {
        Row: {
          id: string
          company_id: string
          name: string
          description: string | null
          status: 'draft' | 'active' | 'completed' | 'paused'
          template_subject: string | null
          template_body: string | null
          sender_name: string | null
          sender_email: string | null
          landing_page_url: string | null
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          description?: string | null
          status?: 'draft' | 'active' | 'completed' | 'paused'
          template_subject?: string | null
          template_body?: string | null
          sender_name?: string | null
          sender_email?: string | null
          landing_page_url?: string | null
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          description?: string | null
          status?: 'draft' | 'active' | 'completed' | 'paused'
          template_subject?: string | null
          template_body?: string | null
          sender_name?: string | null
          sender_email?: string | null
          landing_page_url?: string | null
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      phishing_targets: {
        Row: {
          id: string
          campaign_id: string
          employee_id: string
          email_sent_at: string | null
          email_opened_at: string | null
          link_clicked_at: string | null
          form_submitted_at: string | null
          reported_at: string | null
          status: 'pending' | 'sent' | 'opened' | 'clicked' | 'submitted' | 'reported'
          unique_token: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          employee_id: string
          email_sent_at?: string | null
          email_opened_at?: string | null
          link_clicked_at?: string | null
          form_submitted_at?: string | null
          reported_at?: string | null
          status?: 'pending' | 'sent' | 'opened' | 'clicked' | 'submitted' | 'reported'
          unique_token?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          employee_id?: string
          email_sent_at?: string | null
          email_opened_at?: string | null
          link_clicked_at?: string | null
          form_submitted_at?: string | null
          reported_at?: string | null
          status?: 'pending' | 'sent' | 'opened' | 'clicked' | 'submitted' | 'reported'
          unique_token?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      email_templates: {
        Row: {
          id: string
          user_id: string
          name: string
          subject: string
          body: string
          template_type: 'phishing' | 'training' | 'notification'
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          subject: string
          body: string
          template_type?: 'phishing' | 'training' | 'notification'
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          subject?: string
          body?: string
          template_type?: 'phishing' | 'training' | 'notification'
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      training_modules: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          content: string
          module_type: 'awareness' | 'technical' | 'policy' | 'assessment'
          estimated_duration: number | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          content: string
          module_type?: 'awareness' | 'technical' | 'policy' | 'assessment'
          estimated_duration?: number | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          content?: string
          module_type?: 'awareness' | 'technical' | 'policy' | 'assessment'
          estimated_duration?: number | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      employee_training: {
        Row: {
          id: string
          employee_id: string
          training_module_id: string
          started_at: string | null
          completed_at: string | null
          score: number | null
          status: 'assigned' | 'in_progress' | 'completed' | 'failed'
          assigned_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          training_module_id: string
          started_at?: string | null
          completed_at?: string | null
          score?: number | null
          status?: 'assigned' | 'in_progress' | 'completed' | 'failed'
          assigned_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          training_module_id?: string
          started_at?: string | null
          completed_at?: string | null
          score?: number | null
          status?: 'assigned' | 'in_progress' | 'completed' | 'failed'
          assigned_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Company = Database['public']['Tables']['companies']['Row']
export type Employee = Database['public']['Tables']['employees']['Row']
export type PhishingCampaign = Database['public']['Tables']['phishing_campaigns']['Row']
export type PhishingTarget = Database['public']['Tables']['phishing_targets']['Row']
export type EmailTemplate = Database['public']['Tables']['email_templates']['Row']
export type TrainingModule = Database['public']['Tables']['training_modules']['Row']
export type EmployeeTraining = Database['public']['Tables']['employee_training']['Row']

export type InsertProfile = Database['public']['Tables']['profiles']['Insert']
export type InsertCompany = Database['public']['Tables']['companies']['Insert']
export type InsertEmployee = Database['public']['Tables']['employees']['Insert']
export type InsertPhishingCampaign = Database['public']['Tables']['phishing_campaigns']['Insert']
export type InsertPhishingTarget = Database['public']['Tables']['phishing_targets']['Insert']
export type InsertEmailTemplate = Database['public']['Tables']['email_templates']['Insert']
export type InsertTrainingModule = Database['public']['Tables']['training_modules']['Insert']
export type InsertEmployeeTraining = Database['public']['Tables']['employee_training']['Insert']

export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type UpdateCompany = Database['public']['Tables']['companies']['Update']
export type UpdateEmployee = Database['public']['Tables']['employees']['Update']
export type UpdatePhishingCampaign = Database['public']['Tables']['phishing_campaigns']['Update']
export type UpdatePhishingTarget = Database['public']['Tables']['phishing_targets']['Update']
export type UpdateEmailTemplate = Database['public']['Tables']['email_templates']['Update']
export type UpdateTrainingModule = Database['public']['Tables']['training_modules']['Update']
export type UpdateEmployeeTraining = Database['public']['Tables']['employee_training']['Update']