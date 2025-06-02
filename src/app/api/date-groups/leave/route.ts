import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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

    const { group_id } = body

    if (!group_id) {
      return NextResponse.json(
        { error: 'Group ID is required' },
        { status: 400 }
      )
    }

    console.log('Attempting to leave date group:', {
      userId: user.id,
      groupId: group_id,
      userEmail: user.email
    })

    // First, check if the user is actually in the group
    const { data: existingParticipation, error: checkError } = await supabase
      .from('date_participants')
      .select('*')
      .eq('user_id', user.id)
      .eq('group_id', group_id)
      .single()

    if (checkError) {
      console.error('Error checking participation:', checkError)
      return NextResponse.json(
        { error: 'User is not a member of this group' },
        { status: 400 }
      )
    }

    if (!existingParticipation) {
      return NextResponse.json(
        { error: 'User is not a member of this group' },
        { status: 400 }
      )
    }

    console.log('Found existing participation:', existingParticipation)

    // Now delete the participation record
    const { error: deleteError } = await supabase
      .from('date_participants')
      .delete()
      .eq('user_id', user.id)
      .eq('group_id', group_id)

    if (deleteError) {
      console.error('Error deleting participation:', deleteError)
      return NextResponse.json(
        { error: 'Failed to leave date group: ' + deleteError.message },
        { status: 500 }
      )
    }

    // Verify the deletion worked
    const { data: verifyData, error: verifyError } = await supabase
      .from('date_participants')
      .select('*')
      .eq('user_id', user.id)
      .eq('group_id', group_id)

    if (verifyError) {
      console.error('Error verifying deletion:', verifyError)
    } else if (verifyData && verifyData.length > 0) {
      console.error('Deletion failed - record still exists:', verifyData)
      return NextResponse.json(
        { error: 'Failed to leave date group - deletion unsuccessful' },
        { status: 500 }
      )
    } else {
      console.log('Deletion verified - user successfully left the group')
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully left the date group'
    })

  } catch (error) {
    console.error('Leave date group error:', error)
    return NextResponse.json(
      { error: 'Failed to leave date group' },
      { status: 500 }
    )
  }
}