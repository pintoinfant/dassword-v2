import { createClient } from '@supabase/supabase-js'

const supabaseUrl: any = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey: any = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)