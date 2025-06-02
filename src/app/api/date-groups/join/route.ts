import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, joinDateGroup } from '@/lib/database'

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

    const {
      group_id,
      notes,
      phone,
      show_phone,
      show_email,
      show_linkedin
    } = body

    // Join the date group
    const participant = await joinDateGroup({
      group_id,
      user_id: user.id,
      notes: notes || null,
      phone,
      show_phone,
      show_email,
      show_linkedin
    })

    console.log('User joined date group successfully:', participant)

    return NextResponse.json({
      success: true,
      participant
    })

  } catch (error) {
    console.error('Join date group error:', error)
    return NextResponse.json(
      { error: 'Failed to join date group' },
      { status: 500 }
    )
  }
}