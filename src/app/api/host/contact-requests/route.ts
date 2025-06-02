import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, getContactRequestsForHost, updateContactRequestStatus, createContactShare } from '@/lib/database'
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

    const requests = await getContactRequestsForHost(user.id)

    return NextResponse.json({
      requests
    })

  } catch (error) {
    console.error('Host requests fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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

    const { requestId, action } = body

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Get the contact request details
    const { data: contactRequest, error: fetchError } = await supabase
      .from('contact_requests')
      .select('*, accommodations(*)')
      .eq('id', requestId)
      .eq('to_user_id', user.id) // Make sure this request belongs to the host
      .single()

    if (fetchError || !contactRequest) {
      return NextResponse.json(
        { error: 'Contact request not found' },
        { status: 404 }
      )
    }

    const status = action === 'approve' ? 'approved' : 'rejected'
    const success = await updateContactRequestStatus(requestId, status)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update request status' },
        { status: 500 }
      )
    }

    // If approved, create contact share record
    if (action === 'approve') {
      const shareSuccess = await createContactShare({
        listing_id: contactRequest.listing_id,
        host_id: user.id,
        guest_id: contactRequest.from_user_id,
        host_phone: user.phone || 'Not provided',
        guest_phone: contactRequest.sender_phone
      })

      if (!shareSuccess) {
        console.error('Failed to create contact share, but request was approved')
      }
    }

    return NextResponse.json({
      success: true,
      action,
      status
    })

  } catch (error) {
    console.error('Host request action error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
