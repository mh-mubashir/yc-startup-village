import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET: Fetch all approved cities with search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('approved_cities')
      .select('*')
      .order('tier', { ascending: true })
      .order('usage_count', { ascending: false })
      .order('city_name', { ascending: true })
      .limit(limit)

    if (search) {
      query = query.or(`city_name.ilike.%${search}%,country.ilike.%${search}%,region.ilike.%${search}%`)
    }

    const { data: cities, error } = await query

    if (error) {
      console.error('Error fetching cities:', error)
      return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 })
    }

    return NextResponse.json({ cities: cities || [] })
  } catch (error) {
    console.error('Cities fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 })
  }
}

// POST: Submit new city for approval
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const { city_name, country, region } = body

    if (!city_name || !country) {
      return NextResponse.json({ 
        error: 'City name and country are required' 
      }, { status: 400 })
    }

    // Check if city already exists (approved or pending)
    const { data: existingApproved } = await supabase
      .from('approved_cities')
      .select('id')
      .eq('city_name', city_name)
      .single()

    if (existingApproved) {
      return NextResponse.json({ 
        error: 'This city already exists in our database' 
      }, { status: 400 })
    }

    const { data: existingSubmission } = await supabase
      .from('city_submissions')
      .select('id')
      .eq('city_name', city_name)
      .eq('status', 'pending')
      .single()

    if (existingSubmission) {
      return NextResponse.json({ 
        error: 'This city has already been submitted and is awaiting approval' 
      }, { status: 400 })
    }

    // Create submission
    const { data: submission, error } = await supabase
      .from('city_submissions')
      .insert([{
        city_name: city_name.trim(),
        country: country.trim(),
        region: region?.trim() || null,
        submitted_by: user.id
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating city submission:', error)
      return NextResponse.json({ 
        error: 'Failed to submit city for approval' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'City submitted for approval! It will be reviewed and added within 24-48 hours.',
      submission
    })

  } catch (error) {
    console.error('City submission error:', error)
    return NextResponse.json({ 
      error: 'Failed to submit city' 
    }, { status: 500 })
  }
}