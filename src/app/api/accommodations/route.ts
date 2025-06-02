import { NextRequest, NextResponse } from 'next/server'
import { createAccommodation, getAccommodationsByStatus, getUserByAccessCode, updateUser, updateAccommodationStatus } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get user from session - the access code is sent in the request headers
    const accessCode = request.headers.get('x-access-code')
    
    console.log('Received access code:', accessCode) // Debug log
    
    if (!accessCode) {
      console.log('No access code provided in headers')
      return NextResponse.json(
        { error: 'Authentication required - no access code provided' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    console.log('Found user:', user ? 'Yes' : 'No') // Debug log
    
    if (!user) {
      console.log('User not found for access code:', accessCode)
      return NextResponse.json(
        { error: 'Invalid access code - user not found' },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      address,
      pricePerNight,
      maxGuests,
      availableSpots,
      amenities,
      houseRules,
      availableFrom,
      availableUntil,
      hostPhone
    } = body

    // Update user with phone number
    await updateUser(user.id, { phone: hostPhone })

    // Create the accommodation listing
    const listing = await createAccommodation({
      hostId: user.id,
      title,
      description,
      address,
      pricePerNight,
      maxGuests,
      availableSpots,
      amenities,
      houseRules,
      availableFrom,
      availableUntil,
      status: 'active'
    })

    console.log('Successfully created listing:', listing.id)

    return NextResponse.json({
      success: true,
      listing
    })

  } catch (error) {
    console.error('Accommodation creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create listing: ' + error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get all active listings (excluding deleted ones)
    const listings = await getAccommodationsByStatus('active')
    
    return NextResponse.json({
      listings
    })

  } catch (error) {
    console.error('Accommodations fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { listingId } = await request.json()
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

    // Soft delete the listing (change status to 'deleted')
    const success = await updateAccommodationStatus(listingId, user.id, 'deleted')
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete listing or unauthorized' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Listing deleted successfully'
    })

  } catch (error) {
    console.error('Listing deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete listing' },
      { status: 500 }
    )
  }
}