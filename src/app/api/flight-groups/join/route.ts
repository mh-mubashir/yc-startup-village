import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, joinFlightGroup } from '@/lib/database'

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
      flight_date,
      flight_time,
      airline,
      notes,
      phone,
      show_phone,
      show_email,
      show_linkedin
    } = body

    // Join the flight group
    const participant = await joinFlightGroup({
      group_id,
      user_id: user.id,
      flight_date: flight_date || null,
      flight_time: flight_time || null,
      airline: airline || null,
      notes: notes || null,
      phone,
      show_phone,
      show_email,
      show_linkedin
    })

    console.log('User joined flight group successfully:', participant)

    return NextResponse.json({
      success: true,
      participant
    })

  } catch (error) {
    console.error('Join flight group error:', error)
    return NextResponse.json(
      { error: 'Failed to join flight group' },
      { status: 500 }
    )
  }
}
