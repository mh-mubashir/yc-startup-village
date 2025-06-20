'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

interface Accommodation {
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
  status: string
  created_at: string
}

export default function AccommodationsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingListing, setDeletingListing] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    const userEmail = localStorage.getItem('userEmail')
    const userLinkedIn = localStorage.getItem('userLinkedIn')

    if (!accessCode || !userEmail) {
      router.push('/login')
      return
    }

    setUser({
      email: userEmail,
      linkedinUrl: userLinkedIn || '',
      accessCode
    })

    // Fetch current user ID and accommodations
    fetchUserAndAccommodations(accessCode)
  }, [router])

  const fetchUserAndAccommodations = async (accessCode: string) => {
    try {
      // First get current user ID
      const userResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode }),
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        setCurrentUserId(userData.user.id)
      }

      // Then fetch accommodations
      const response = await fetch('/api/accommodations')
      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to fetch accommodations')
        return
      }

      setAccommodations(result.listings || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleContactRequest = (accommodationId: string) => {
    router.push(`/accommodations/${accommodationId}/contact`)
  }

  const handleDeleteListing = async (accommodationId: string) => {
    if (!confirm('Are you sure you want to delete this listing? It will be removed from public view but kept in our records.')) {
      return
    }

    setDeletingListing(accommodationId)

    try {
      const accessCode = localStorage.getItem('accessCode')
      const response = await fetch('/api/accommodations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode!,
        },
        body: JSON.stringify({ listingId: accommodationId }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert('Failed to delete listing: ' + (result.error || 'Unknown error'))
        return
      }

      // Remove the listing from the display
      setAccommodations(prev => prev.filter(acc => acc.id !== accommodationId))
      alert('✅ Listing deleted successfully!')

    } catch (error) {
      console.error('Delete error:', error)
      alert('❌ Network error occurred. Please try again.')
    } finally {
      setDeletingListing(null)
    }
  }

  const isOwnListing = (hostId: string) => {
    return currentUserId && currentUserId === hostId
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">YC Startup Village</h1>
                <p className="text-sm text-gray-600">Browse available accommodations</p>
              </div>
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading accommodations...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">YC Startup Village</h1>
              <p className="text-sm text-gray-600">Browse available accommodations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Dashboard
              </Button>
              <Button onClick={() => router.push('/dashboard')} variant="ghost" size="sm">
                Create Listing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🏠 Available Accommodations
          </h2>
          <p className="text-gray-600">
            {accommodations.length} listings available from verified YC attendees
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Accommodations Grid */}
        {accommodations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No accommodations available yet</h3>
            <p className="text-gray-600 mb-6">Be the first to create a listing and help fellow attendees!</p>
            <Button 
              onClick={() => router.push('/dashboard')} 
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create First Listing
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.map((accommodation) => (
              <Card key={accommodation.id} className="border border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">
                        {accommodation.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mb-3">
                        📍 {accommodation.address}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {accommodation.available_spots} spots
                      </Badge>
                      {isOwnListing(accommodation.host_id) && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          Your Listing
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {accommodation.description}
                    </p>

                    {/* Key Details */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                          👥 Max {accommodation.max_guests} guests
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-orange-600">
                          ${accommodation.price_per_night}
                        </span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">
                        📅 Available: {formatDate(accommodation.available_from)} - {formatDate(accommodation.available_until)}
                      </div>
                    </div>

                    {/* Amenities */}
                    {accommodation.amenities && accommodation.amenities.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Amenities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {accommodation.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{accommodation.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* House Rules */}
                    {accommodation.house_rules && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">House Rules:</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {accommodation.house_rules}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {isOwnListing(accommodation.host_id) ? (
                        <div className="space-y-2">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-700 text-center">
                              <strong>This is your listing</strong><br />
                              Manage it from your host dashboard
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => router.push('/host')}
                              variant="outline"
                              className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-50"
                              size="sm"
                            >
                              📋 Manage
                            </Button>
                            <Button 
                              onClick={() => handleDeleteListing(accommodation.id)}
                              disabled={deletingListing === accommodation.id}
                              variant="outline"
                              className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                              size="sm"
                            >
                              {deletingListing === accommodation.id ? '⏳ Deleting...' : '🗑️ Delete'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleContactRequest(accommodation.id)}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                          size="sm"
                        >
                          📱 Request Contact Info
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
            💡 How to Connect with Hosts
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            <p>1. <strong>Click "Request Contact Info"</strong> on any listing that interests you (except your own)</p>
            <p>2. <strong>Write a brief message</strong> introducing yourself and your accommodation needs</p>
            <p>3. <strong>Share your phone number</strong> so the host can contact you back</p>
            <p>4. <strong>Wait for approval</strong> - hosts will review your request and decide whether to share their contact info</p>
            <p>5. <strong>Connect directly</strong> - once approved, you'll get their phone number to coordinate details</p>
          </div>
        </div>
      </div>
    </div>
  )
}