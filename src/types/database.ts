export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          linkedin_url: string | null
          phone: string | null
          bio: string | null
          verified: boolean
          user_type: 'host' | 'seeker' | 'both'
          preferences: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          linkedin_url?: string | null
          phone?: string | null
          bio?: string | null
          verified?: boolean
          user_type: 'host' | 'seeker' | 'both'
          preferences?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          linkedin_url?: string | null
          phone?: string | null
          bio?: string | null
          verified?: boolean
          user_type?: 'host' | 'seeker' | 'both'
          preferences?: Record<string, any>
          updated_at?: string
        }
      }
    }
  }
}
