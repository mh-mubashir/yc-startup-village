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

    // Validate date format (should be YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Please use YYYY-MM-DD format.' },
        { status: 400 }
      )
    }

    // Parse dates without timezone conversion
    const startDate = new Date(start_date + 'T00:00:00')
    const endDate = new Date(end_date + 'T00:00:00')

    // Validate date range
    if (startDate > endDate) {
      return NextResponse.json(
        { error: 'Start date must be before or equal to end date.' },
        { status: 400 }
      )
    }

    console.log('Creating date group with dates:', {
      start_date,
      end_date,
      startDateObj: startDate.toISOString(),
      endDateObj: endDate.toISOString()
    })

    // Check if group already exists for these exact dates
    const existingGroup = await checkDateGroupExists(start_date, end_date)
    if (existingGroup) {
      return NextResponse.json(
        { error: `A date group for ${start_date} to ${end_date} already exists. You can join the existing group instead.` },
        { status: 400 }
      )
    }

    // Create the date group with exact dates (no timezone conversion)
    const group = await createDateGroup({
      start_date: start_date, // Keep as string to prevent timezone conversion
      end_date: end_date,     // Keep as string to prevent timezone conversion
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