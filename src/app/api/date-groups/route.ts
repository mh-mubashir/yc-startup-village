import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, checkDateGroupExists, createDateGroup, getAllDateGroups } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const groups = await getAllDateGroups()
    
    return NextResponse.json({
      groups
    })
  } catch (error) {
    console.error('Date groups fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch date groups' },
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

    const { start_date, end_date } = body

    // Check if group already exists for these exact dates
    const existingGroup = await checkDateGroupExists(start_date, end_date)
    if (existingGroup) {
      return NextResponse.json(
        { error: `A date group for ${start_date} to ${end_date} already exists. You can join the existing group instead.` },
        { status: 400 }
      )
    }

    // Create the date group
    const group = await createDateGroup({
      start_date,
      end_date,
      creator_id: user.id
    })

    console.log('Date group created successfully:', group)

    return NextResponse.json({
      success: true,
      group
    })

  } catch (error) {
    console.error('Date group creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create date group' },
      { status: 500 }
    )
  }
}