import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, getAccommodationById } from '@/lib/database'
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

    const { accommodationId, message, phone } = body

    // Get accommodation details
    const accommodation = await getAccommodationById(accommodationId)
    if (!accommodation) {
      return NextResponse.json(
        { error: 'Accommodation not found' },
        { status: 404 }
      )
    }

    // Don't allow hosts to request contact for their own listings
    if (accommodation.host_id === user.id) {
      return NextResponse.json(
        { error: 'You cannot request contact for your own listing' },
        { status: 400 }
      )
    }

    // Check if user already has a pending request for this accommodation
    const { data: existingRequest } = await supabase
      .from('contact_requests')
      .select('id')
      .eq('from_user_id', user.id)
      .eq('listing_id', accommodationId)
      .eq('status', 'pending')
      .single()

    if (existingRequest) {
      return NextResponse.json(
        { error: 'You already have a pending request for this accommodation' },
        { status: 400 }
      )
    }

    // Create contact request
    const { data: contactRequest, error } = await supabase
      .from('contact_requests')
      .insert([{
        listing_id: accommodationId,
        from_user_id: user.id,
        to_user_id: accommodation.host_id,
        message,
        sender_phone: phone,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating contact request:', error)
      return NextResponse.json(
        { error: 'Failed to send contact request' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      contactRequest
    })

  } catch (error) {
    console.error('Contact request error:', error)
    return NextResponse.json(
      { error: 'Failed to send contact request' },
      { status: 500 }
    )
  }
}
