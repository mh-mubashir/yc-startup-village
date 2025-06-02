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

interface ContactRequest {
  id: string
  message: string
  sender_phone: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  accommodations: {
    title: string
    address: string
  }
  users: {
    email: string
    linkedin_url: string
  }
}

interface ContactShare {
  id: string
  host_phone: string
  guest_phone: string
  shared_at: string
  isCurrentUserHost: boolean
  accommodations: {
    title: string
    address: string
  }
  otherPerson: {
    id: string
    email: string
    linkedin_url: string
  }
  currentUser: {
    id: string
    email: string
    linkedin_url: string
  }
}

export default function HostDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [contactShares, setContactShares] = useState<ContactShare[]>([])
  const [loading, setLoading] = useState(true)
  const [processingRequest, setProcessingRequest] = useState<string | null>(null)
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

    fetchHostData()
  }, [router])

  const fetchHostData = async () => {
    try {
      const accessCode = localStorage.getItem('accessCode')
      
      // Fetch contact requests
      const requestsResponse = await fetch('/api/host/contact-requests', {
        headers: {
          'x-access-code': accessCode!,
        },
      })

      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json()
        setContactRequests(requestsData.requests || [])
      }

      // Fetch contact shares
      const sharesResponse = await fetch('/api/host/contact-shares', {
        headers: {
          'x-access-code': accessCode!,
        },
      })

      if (sharesResponse.ok) {
        const sharesData = await sharesResponse.json()
        console.log('Contact shares data:', sharesData.shares) // Debug log
        setContactShares(sharesData.shares || [])
      }

    } catch (error) {
      console.error('Error fetching host data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject') => {
    setProcessingRequest(requestId)

    try {
      const accessCode = localStorage.getItem('accessCode')
      const response = await fetch('/api/host/contact-requests', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode!,
        },
        body: JSON.stringify({
          requestId,
          action
        }),
      })

      if (response.ok) {
        // Refresh the data
        fetchHostData()
      } else {
        alert('Failed to process request. Please try again.')
      }

    } catch (error) {
      console.error('Error processing request:', error)
      alert('Network error occurred. Please try again.')
    } finally {
      setProcessingRequest(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const openLinkedInProfile = (url: string) => {
    // Ensure the URL is properly formatted
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    console.log('Opening LinkedIn URL:', linkedinUrl) // Debug log
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const getLinkedInUsername = (url: string) => {
    // Extract username from LinkedIn URL for display
    try {
      const match = url.match(/linkedin\.com\/in\/([^\/]+)/)
      return match ? match[1].replace(/-/g, ' ') : 'LinkedIn Profile'
    } catch {
      return 'LinkedIn Profile'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your host dashboard...</p>
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
              <h1 className="text-2xl font-bold text-orange-600">Host Dashboard</h1>
              <p className="text-sm text-gray-600">Manage your contact requests and connections</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/accommodations')} variant="outline" size="sm">
                Browse Listings
              </Button>
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Main Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contactRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Connections</p>
                  <p className="text-2xl font-bold text-gray-900">{contactShares.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📨</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{contactRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Contact Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ⏳ Pending Contact Requests
          </h2>
          
          {contactRequests.filter(r => r.status === 'pending').length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-600">New contact requests will appear here for your review.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {contactRequests
                .filter(request => request.status === 'pending')
                .map((request) => (
                <Card key={request.id} className="border border-orange-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">
                          Request for: {request.accommodations.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          📍 {request.accommodations.address}
                        </CardDescription>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {formatDate(request.created_at)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Guest Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">👤 Guest Information</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong>Email:</strong> {request.users.email}
                          </div>
                          <div className="flex items-center justify-between">
                            <strong>LinkedIn Profile:</strong>
                            <Button
                              onClick={() => openLinkedInProfile(request.users.linkedin_url)}
                              variant="outline"
                              size="sm"
                              className="text-orange-600 border-orange-300 hover:bg-orange-50"
                            >
                              🔗 View {getLinkedInUsername(request.users.linkedin_url)}
                            </Button>
                          </div>
                          <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                            <strong>Phone Number:</strong>
                            <div className="font-mono text-lg text-blue-800 mt-1">
                              {request.sender_phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">💬 Their Message</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed">
                            "{request.message}"
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3 pt-4">
                        <Button
                          onClick={() => handleRequestAction(request.id, 'approve')}
                          disabled={processingRequest === request.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {processingRequest === request.id ? 'Processing...' : '✅ Approve & Share Contact'}
                        </Button>
                        
                        <Button
                          onClick={() => handleRequestAction(request.id, 'reject')}
                          disabled={processingRequest === request.id}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          {processingRequest === request.id ? 'Processing...' : '❌ Decline'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Active Connections - FIXED to show correct LinkedIn profiles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🤝 Active Connections
          </h2>
          
          {contactShares.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No active connections</h3>
                <p className="text-gray-600">Approved contact requests will show here with shared phone numbers and LinkedIn profiles.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {contactShares.map((share) => (
                <Card key={share.id} className="border border-green-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">
                          {share.accommodations.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          📍 {share.accommodations.address} • Connected: {formatDate(share.shared_at)}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {share.isCurrentUserHost ? 'You are Host' : 'You are Guest'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Contact Information */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-3">📱 Contact Information</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong>Their Phone:</strong>
                            <div className="font-mono text-lg text-blue-700 bg-white px-3 py-2 rounded mt-1">
                              {share.isCurrentUserHost ? share.guest_phone : share.host_phone}
                            </div>
                          </div>
                          <div>
                            <strong>Your Phone:</strong>
                            <div className="font-mono text-sm text-gray-600 bg-white px-3 py-2 rounded mt-1">
                              {share.isCurrentUserHost ? share.host_phone : share.guest_phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* LinkedIn Connection - FIXED */}
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-medium text-orange-800 mb-3">🔗 LinkedIn Connection</h4>
                        <div className="space-y-3">
                          <div>
                            <strong className="text-sm">
                              {share.isCurrentUserHost ? 'Guest' : 'Host'} Profile:
                            </strong>
                            <div className="mt-2">
                              <Button
                                onClick={() => openLinkedInProfile(share.otherPerson.linkedin_url)}
                                variant="outline"
                                size="sm"
                                className="text-orange-600 border-orange-300 hover:bg-orange-100"
                              >
                                🔗 View {getLinkedInUsername(share.otherPerson.linkedin_url)}
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {share.otherPerson.email}
                            </p>
                          </div>
                          
                          <div className="text-xs text-orange-700 bg-orange-100 rounded p-2">
                            💡 <strong>Pro tip:</strong> Connect on LinkedIn to expand your YC network and stay in touch!
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Suggestions */}
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">🎯 Next Steps</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• Call or text them directly to coordinate accommodation details</p>
                        <p>• Connect on LinkedIn to expand your professional network</p>
                        <p>• Consider meeting in person before finalizing arrangements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Request History */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📋 All Contact Requests
          </h2>
          
          {contactRequests.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📬</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests yet</h3>
                <p className="text-gray-600">Contact requests will appear here when guests are interested in your listings.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {contactRequests.map((request) => (
                <Card key={request.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">
                            {request.accommodations.title}
                          </h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-600">
                            From: {request.users.email}
                          </p>
                          <Button
                            onClick={() => openLinkedInProfile(request.users.linkedin_url)}
                            variant="ghost"
                            size="sm"
                            className="text-xs text-orange-600 hover:text-orange-700 p-1 h-auto"
                          >
                            🔗 LinkedIn
                          </Button>
                          <span className="text-sm text-gray-500">
                            {formatDate(request.created_at)}
                          </span>
                        </div>
                      </div>
                      
                      {request.status === 'approved' && (
                        <div className="text-sm text-green-600 font-medium">
                          Contact shared ✓
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
