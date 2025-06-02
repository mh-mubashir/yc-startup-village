import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessCode } = body

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Access code is required' },
        { status: 400 }
      )
    }

    // Find user by access code
    const user = await getUserByAccessCode(accessCode)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid access code. Please check your code and try again.' },
        { status: 401 }
      )
    }

    // Log successful login
    console.log('Successful login:', {
      email: user.email,
      linkedinUrl: user.linkedin_url, // Make sure this is included
      accessCode,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        linkedinUrl: user.linkedin_url, // Properly return LinkedIn URL
        verified: user.verified
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
