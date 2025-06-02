'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreateListingForm } from '@/components/accommodations/create-listing-form'
import { PendingRequestsWidget } from '@/components/dashboard/pending-requests-widget'
import { CurrentConnectionsWidget } from '@/components/dashboard/current-connections-widget'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateListing, setShowCreateListing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    const userEmail = localStorage.getItem('userEmail')
    const userLinkedIn = localStorage.getItem('userLinkedIn')

    console.log('Dashboard - Retrieved LinkedIn URL:', userLinkedIn) // Debug log

    if (!accessCode || !userEmail) {
      router.push('/login')
      return
    }

    setUser({
      email: userEmail,
      linkedinUrl: userLinkedIn || '',
      accessCode
    })
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('accessCode')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userLinkedIn')
    router.push('/')
  }

  const handleListingCreated = () => {
    setShowCreateListing(false)
    alert('🎉 Listing created successfully! Other attendees can now find and contact you.')
  }

  const openLinkedInProfile = (url: string) => {
    console.log('Opening LinkedIn URL:', url) // Debug log
    
    if (!url || url === 'undefined' || url === '') {
      alert('LinkedIn profile not available. Please contact support.')
      return
    }
    
    // Ensure the URL is properly formatted
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    
    console.log('Final LinkedIn URL:', linkedinUrl) // Debug log
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">YC Startup Village</h1>
              <p className="text-sm text-gray-600">Welcome back to the community!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => router.push('/accommodations')}
                variant="outline" 
                size="sm"
              >
                Browse Listings
              </Button>
              <Button 
                onClick={() => router.push('/host')}
                variant="outline" 
                size="sm"
              >
                Host Dashboard
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!showCreateListing ? (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎉 Welcome to YC Startup Village!
              </h2>
              <p className="text-gray-600">
                You&apos;re now connected with the exclusive community of YC AI Startup School attendees.
              </p>
            </div>

            {/* Main Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Profile Card */}
              <Card className="border border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center">
                    👤 Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email:</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">LinkedIn:</p>
                      {user.linkedinUrl && user.linkedinUrl !== '' ? (
                        <Button
                          onClick={() => openLinkedInProfile(user.linkedinUrl)}
                          variant="outline"
                          size="sm"
                          className="text-orange-600 border-orange-300 hover:bg-orange-50 mt-1"
                        >
                          🔗 View Your Profile
                        </Button>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">Not available</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">Access Code:</p>
                      <code className="text-xs bg-orange-100 px-2 py-1 rounded font-mono block mt-1">
                        {user.accessCode}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accommodation Features */}
              <Card className="border border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center">
                    🏠 Find Housing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Browse available accommodations from fellow YC attendees.
                  </p>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => router.push('/accommodations')}
                  >
                    Browse Listings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center">
                    🤝 Offer Space
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    List your extra space and connect with fellow founders.
                  </p>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setShowCreateListing(true)}
                  >
                    Create Listing
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* NEW: Buddy Matching Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🤝 Connect & Coordinate</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      ✈️ Flight Buddies
                    </CardTitle>
                    <CardDescription>
                      Find travel companions flying from your city
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Connect with fellow attendees flying from the same departure city. Coordinate flights, share rides, and travel together!
                      </p>
                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        onClick={() => router.push('/flight-buddies')}
                      >
                        🛫 Find Flight Buddies
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      📅 Date Groups
                    </CardTitle>
                    <CardDescription>
                      Connect with people staying the same dates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Find attendees with matching stay dates. Perfect for group activities, shared experiences, and networking!
                      </p>
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600"
                        onClick={() => router.push('/date-groups')}
                      >
                        📅 Join Date Groups
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Enhanced Host Management with Both Widgets */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Host Dashboard</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Pending Requests Widget */}
                <PendingRequestsWidget accessCode={user.accessCode} />
                
                {/* NEW: Current Connections Widget */}
                <CurrentConnectionsWidget accessCode={user.accessCode} />
              </div>
              
              {/* Host Management Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center">
                      🏠 Manage Listings
                    </CardTitle>
                    <CardDescription>
                      View and manage your accommodation listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => router.push('/host')}
                        variant="outline"
                        className="w-full"
                      >
                        📋 Full Host Dashboard
                      </Button>
                      <Button 
                        onClick={() => setShowCreateListing(true)}
                        className="w-full bg-orange-500 hover:bg-orange-600"
                      >
                        ➕ Create New Listing
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center">
                      🌟 Community Stats
                    </CardTitle>
                    <CardDescription>
                      Your impact in the YC community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Profile Complete:</span>
                        <span className="text-sm font-semibold text-purple-600">100%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Community Member Since:</span>
                        <span className="text-sm font-semibold text-purple-600">Recently</span>
                      </div>
                      <Button 
                        onClick={() => router.push('/accommodations')}
                        variant="outline"
                        className="w-full text-purple-600 border-purple-300 hover:bg-purple-50"
                      >
                        🚀 Explore Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* How It Works */}
            <Card className="border border-orange-200 mb-8">
              <CardHeader>
                <CardTitle className="text-orange-700">📞 How Our Platform Works</CardTitle>
                <CardDescription>Four ways to connect with fellow YC attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🏠 Accommodation Sharing:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Create listings for extra space you have</p>
                      <p>• Browse available accommodations</p>
                      <p>• Send contact requests to hosts</p>
                      <p>• Exchange contact info when approved</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">✈️ Travel Coordination:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Join flight groups from your departure city</p>
                      <p>• Share flight details and coordinate travel</p>
                      <p>• Find travel companions and split costs</p>
                      <p>• Connect via WhatsApp, email, or LinkedIn</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                🛡️ Safety Reminder
              </h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p>• Always meet potential roommates/travel buddies in public places first</p>
                <p>• Trust your instincts and prioritize your safety</p>
                <p>• Verify identity through video calls before committing to accommodation</p>
                <p>• Your contact info is only shared when you approve requests</p>
                <p>• Report any suspicious behavior to our community team</p>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Button 
                onClick={() => setShowCreateListing(false)}
                variant="outline"
                className="mb-4"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <CreateListingForm onSuccess={handleListingCreated} />
          </div>
        )}
      </div>
    </div>
  )
}