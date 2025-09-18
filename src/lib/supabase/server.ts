import { createServerComponentClient, createServerActionClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServerClient = () => {
  return createServerComponentClient({ cookies })
}

export const createActionClient = () => {
  return createServerActionClient({ cookies })
}