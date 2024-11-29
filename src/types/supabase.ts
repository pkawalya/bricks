export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          referral_code: string
          referred_by: string | null
          joined_at: string
          status: 'active' | 'pending' | 'suspended'
          earnings: number
          downline_count: number
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          referral_code?: string
          referred_by?: string | null
          joined_at?: string
          status?: 'active' | 'pending' | 'suspended'
          earnings?: number
          downline_count?: number
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          referral_code?: string
          referred_by?: string | null
          joined_at?: string
          status?: 'active' | 'pending' | 'suspended'
          earnings?: number
          downline_count?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}