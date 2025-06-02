import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface UserRecord {
  id: string
  email: string
  linkedin_url: string
  access_code: string
  name?: string
  phone?: string
  verified: boolean
  created_at: string
  updated_at: string
}

export interface AccommodationListing {
  id: string
  host_id: string
  title: string
  description: string
  address: string
  price_per_night: number
  max_guests: number
  available_spots: number
  amenities: string[]
  house_rules?: string
  available_from: string
  available_until: string
  status: 'active' | 'inactive' | 'full' | 'deleted'
  created_at: string
  updated_at: string
}

// User functions
export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email.toLowerCase())
    .single()
  
  return !error && !!data
}

export async function checkLinkedInExists(linkedinUrl: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('linkedin_url', linkedinUrl) // Don't convert to lowercase for comparison
    .single()
  
  return !error && !!data
}

export async function createUser(userData: {
  email: string
  linkedin_url: string
  access_code: string
}): Promise<UserRecord> {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      email: userData.email.toLowerCase(),
      linkedin_url: userData.linkedin_url, // Keep original case for LinkedIn URL
      access_code: userData.access_code,
      verified: true
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }

  return data
}

export async function getUserByAccessCode(accessCode: string): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('access_code', accessCode)
    .single()
  
  if (error) {
    console.error('Error fetching user by access code:', error)
    return null
  }
  
  return data
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching user by ID:', error)
    return null
  }
  
  return data
}

export async function updateUser(id: string, updates: Partial<UserRecord>): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating user:', error)
    return null
  }

  return data
}

// Accommodation functions
export async function createAccommodation(accommodationData: {
  hostId: string
  title: string
  description: string
  address: string
  pricePerNight: number
  maxGuests: number
  availableSpots: number
  amenities: string[]
  houseRules?: string
  availableFrom: string
  availableUntil: string
  status: 'active' | 'inactive' | 'full' | 'deleted'
}): Promise<AccommodationListing> {
  
  // Map camelCase to snake_case for database
  const dbData = {
    host_id: accommodationData.hostId,
    title: accommodationData.title,
    description: accommodationData.description,
    address: accommodationData.address,
    price_per_night: accommodationData.pricePerNight,
    max_guests: accommodationData.maxGuests,
    available_spots: accommodationData.availableSpots,
    amenities: accommodationData.amenities,
    house_rules: accommodationData.houseRules,
    available_from: accommodationData.availableFrom,
    available_until: accommodationData.availableUntil,
    status: accommodationData.status
  }

  console.log('Creating accommodation with data:', dbData)

  const { data: listing, error } = await supabase
    .from('accommodations')
    .insert([dbData])
    .select()
    .single()

  if (error) {
    console.error('Error creating accommodation:', error)
    throw new Error('Failed to create accommodation')
  }

  return listing
}

export async function getAccommodationsByStatus(status: 'active' | 'inactive' | 'full' | 'deleted'): Promise<AccommodationListing[]> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching accommodations:', error)
    return []
  }

  return data || []
}

export async function getAccommodationById(id: string): Promise<AccommodationListing | null> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching accommodation:', error)
    return null
  }

  return data
}

export async function getAccommodationsByHost(hostId: string): Promise<AccommodationListing[]> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('host_id', hostId)
    .neq('status', 'deleted') // Exclude deleted listings
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching host accommodations:', error)
    return []
  }

  return data || []
}

// NEW: Function to update accommodation status (for soft delete)
export async function updateAccommodationStatus(
  listingId: string, 
  hostId: string, 
  status: 'active' | 'inactive' | 'full' | 'deleted'
): Promise<boolean> {
  const { error } = await supabase
    .from('accommodations')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', listingId)
    .eq('host_id', hostId) // Ensure only the owner can modify

  if (error) {
    console.error('Error updating accommodation status:', error)
    return false
  }

  return true
}

// Contact request functions
export async function getContactRequestsForHost(hostId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('contact_requests')
    .select(`
      *,
      accommodations!inner(title, address),
      users!contact_requests_from_user_id_fkey(email, linkedin_url)
    `)
    .eq('to_user_id', hostId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact requests:', error)
    return []
  }

  return data || []
}

export async function updateContactRequestStatus(
  requestId: string, 
  status: 'approved' | 'rejected'
): Promise<boolean> {
  const { error } = await supabase
    .from('contact_requests')
    .update({ status })
    .eq('id', requestId)

  if (error) {
    console.error('Error updating contact request:', error)
    return false
  }

  return true
}

export async function createContactShare(data: {
  listing_id: string
  host_id: string
  guest_id: string
  host_phone: string
  guest_phone: string
}): Promise<boolean> {
  const { error } = await supabase
    .from('contact_shares')
    .insert([data])

  if (error) {
    console.error('Error creating contact share:', error)
    return false
  }

  return true
}

export async function getContactSharesForUser(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('contact_shares')
    .select(`
      *,
      accommodations(title, address),
      host:users!contact_shares_host_id_fkey(email, linkedin_url),
      guest:users!contact_shares_guest_id_fkey(email, linkedin_url)
    `)
    .or(`host_id.eq.${userId},guest_id.eq.${userId}`)
    .order('shared_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact shares:', error)
    return []
  }

  return data || []
}

// Flight Buddy Types
export interface FlightGroup {
  id: string
  departure_city: string
  creator_id: string
  created_at: string
  updated_at: string
}

export interface FlightParticipant {
  id: string
  group_id: string
  user_id: string
  flight_date?: string
  flight_time?: string
  airline?: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
  created_at: string
  updated_at: string
}

export interface DateGroup {
  id: string
  start_date: string
  end_date: string
  creator_id: string
  created_at: string
  updated_at: string
}

export interface DateParticipant {
  id: string
  group_id: string
  user_id: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
  created_at: string
  updated_at: string
}

// Flight Group Functions
export async function checkFlightGroupExists(departureCity: string): Promise<FlightGroup | null> {
  const { data, error } = await supabase
    .from('flight_groups')
    .select('*')
    .eq('departure_city', departureCity)
    .single()

  if (error) return null
  return data
}

export async function createFlightGroup(data: {
  departure_city: string
  creator_id: string
}): Promise<FlightGroup> {
  const { data: group, error } = await supabase
    .from('flight_groups')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error creating flight group:', error)
    throw new Error('Failed to create flight group')
  }

  return group
}

export async function getAllFlightGroups(): Promise<any[]> {
  const { data, error } = await supabase
    .from('flight_groups')
    .select(`
      *,
      creator:users!flight_groups_creator_id_fkey(email, linkedin_url),
      flight_participants(
        *,
        user:users!flight_participants_user_id_fkey(email, linkedin_url, phone)
      )
    `)
    .order('departure_city', { ascending: true })

  if (error) {
    console.error('Error fetching flight groups:', error)
    return []
  }

  return data || []
}

export async function joinFlightGroup(data: {
  group_id: string
  user_id: string
  flight_date?: string
  flight_time?: string
  airline?: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
}): Promise<FlightParticipant> {
  const { data: participant, error } = await supabase
    .from('flight_participants')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error joining flight group:', error)
    throw new Error('Failed to join flight group')
  }

  return participant
}

export async function leaveFlightGroup(userId: string, groupId: string): Promise<boolean> {
  const { error } = await supabase
    .from('flight_participants')
    .delete()
    .eq('user_id', userId)
    .eq('group_id', groupId)

  if (error) {
    console.error('Error leaving flight group:', error)
    return false
  }

  return true
}

// Date Group Functions - FIXED for timezone issues
export async function checkDateGroupExists(startDate: string, endDate: string): Promise<DateGroup | null> {
  // Ensure dates are in YYYY-MM-DD format
  const formattedStartDate = startDate.includes('T') ? startDate.split('T')[0] : startDate
  const formattedEndDate = endDate.includes('T') ? endDate.split('T')[0] : endDate

  console.log('Checking for existing date group:', { formattedStartDate, formattedEndDate })

  const { data, error } = await supabase
    .from('date_groups')
    .select('*')
    .eq('start_date', formattedStartDate)
    .eq('end_date', formattedEndDate)
    .single()

  if (error) {
    console.log('No existing date group found or error:', error.message)
    return null
  }
  
  console.log('Found existing date group:', data)
  return data
}

export async function createDateGroup(data: {
  start_date: string
  end_date: string
  creator_id: string
}): Promise<DateGroup> {
  // Ensure dates are in YYYY-MM-DD format without timezone conversion
  const formattedStartDate = data.start_date.includes('T') ? data.start_date.split('T')[0] : data.start_date
  const formattedEndDate = data.end_date.includes('T') ? data.end_date.split('T')[0] : data.end_date

  const insertData = {
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    creator_id: data.creator_id
  }

  console.log('Creating date group with data:', insertData)

  const { data: group, error } = await supabase
    .from('date_groups')
    .insert([insertData])
    .select()
    .single()

  if (error) {
    console.error('Error creating date group:', error)
    throw new Error('Failed to create date group: ' + error.message)
  }

  console.log('Date group created successfully:', group)
  return group
}

export async function getAllDateGroups(): Promise<any[]> {
  const { data, error } = await supabase
    .from('date_groups')
    .select(`
      *,
      creator:users!date_groups_creator_id_fkey(email, linkedin_url),
      date_participants(
        *,
        user:users!date_participants_user_id_fkey(email, linkedin_url, phone)
      )
    `)
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching date groups:', error)
    return []
  }

  // Log the fetched data to verify dates are correct
  console.log('Fetched date groups:', data?.map(g => ({ 
    id: g.id, 
    start_date: g.start_date, 
    end_date: g.end_date 
  })))

  return data || []
}

export async function joinDateGroup(data: {
  group_id: string
  user_id: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
}): Promise<DateParticipant> {
  const { data: participant, error } = await supabase
    .from('date_participants')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error joining date group:', error)
    throw new Error('Failed to join date group')
  }

  return participant
}

export async function leaveDateGroup(userId: string, groupId: string): Promise<boolean> {
  const { error } = await supabase
    .from('date_participants')
    .delete()
    .eq('user_id', userId)
    .eq('group_id', groupId)

  if (error) {
    console.error('Error leaving date group:', error)
    return false
  }

  return true
}

export async function getUserDateParticipations(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('date_participants')
    .select(`
      *,
      date_groups(start_date, end_date, creator_id)
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user date participations:', error)
    return []
  }

  return data || []
}

export async function getUserFlightParticipations(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('flight_participants')
    .select(`
      *,
      flight_groups(departure_city, creator_id)
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user flight participations:', error)
    return []
  }

  return data || []
}