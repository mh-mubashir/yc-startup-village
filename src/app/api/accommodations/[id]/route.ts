import { NextRequest, NextResponse } from 'next/server'
import { getAccommodationById } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params before accessing its properties
    const { id } = await params
    const accommodation = await getAccommodationById(id)

    if (!accommodation) {
      return NextResponse.json(
        { error: 'Accommodation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      accommodation
    })

  } catch (error) {
    console.error('Accommodation fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch accommodation' },
      { status: 500 }
    )
  }
}