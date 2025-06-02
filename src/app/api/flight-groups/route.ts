import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, checkFlightGroupExists, createFlightGroup, getAllFlightGroups } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const groups = await getAllFlightGroups()
    
    return NextResponse.json({
      groups
    })
  } catch (error) {
    console.error('Flight groups fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch flight groups' },
      { status: 500 }
    )
  }
}

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

    const { departure_city } = body

    // Check if group already exists
    const existingGroup = await checkFlightGroupExists(departure_city)
    if (existingGroup) {
      return NextResponse.json(
        { error: `A flight group for ${departure_city} already exists. You can join the existing group instead.` },
        { status: 400 }
      )
    }

    // Create the flight group
    const group = await createFlightGroup({
      departure_city,
      creator_id: user.id
    })

    console.log('Flight group created successfully:', group)

    return NextResponse.json({
      success: true,
      group
    })

  } catch (error) {
    console.error('Flight group creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create flight group' },
      { status: 500 }
    )
  }
}
