import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // Get contact shares with proper user information
    const { data: shares, error } = await supabase
      .from('contact_shares')
      .select(`
        *,
        accommodations(title, address),
        host_user:users!contact_shares_host_id_fkey(id, email, linkedin_url),
        guest_user:users!contact_shares_guest_id_fkey(id, email, linkedin_url)
      `)
      .or(`host_id.eq.${user.id},guest_id.eq.${user.id}`)
      .order('shared_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact shares:', error)
      return NextResponse.json(
        { error: 'Failed to fetch contact shares' },
        { status: 500 }
      )
    }

    // Process the data to show the correct "other person" info
    const processedShares = (shares || []).map(share => ({
      ...share,
      // If current user is the host, show guest info as "other person"
      // If current user is the guest, show host info as "other person"
      isCurrentUserHost: share.host_id === user.id,
      otherPerson: share.host_id === user.id ? share.guest_user : share.host_user,
      currentUser: share.host_id === user.id ? share.host_user : share.guest_user
    }))

    return NextResponse.json({
      shares: processedShares
    })

  } catch (error) {
    console.error('Host shares fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact shares' },
      { status: 500 }
    )
  }
}
