'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CreateFlightGroupForm } from '@/components/buddy-matching/create-flight-group-form'
import { JoinFlightGroupForm } from '@/components/buddy-matching/join-flight-group-form'
import { GroupDetailsModal } from '@/components/buddy-matching/group-details-modal'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

interface FlightGroup {
  id: string
  departure_city: string
  creator_id: string
  created_at: string
  creator: {
    email: string
    linkedin_url: string
  }
  flight_participants: Array<{
    id: string
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
    user: {
      email: string
      linkedin_url: string
      phone?: string
    }
  }>
}

export default function FlightBuddiesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [flightGroups, setFlightGroups] = useState<FlightGroup[]>([])
  const [filteredGroups, setFilteredGroups] = useState<FlightGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<FlightGroup | null>(null)
  const [selectedGroupForDetails, setSelectedGroupForDetails] = useState<FlightGroup | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
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

    fetchFlightGroups()
  }, [router])

  useEffect(() => {
    // Filter groups based on search term
    const filtered = flightGroups.filter(group =>
      group.departure_city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredGroups(filtered)
  }, [flightGroups, searchTerm])

  const fetchFlightGroups = async () => {
    try {
      console.log('Fetching flight groups...')
      const response = await fetch('/api/flight-groups')
      const result = await response.json()
  
      console.log('Fetch flight groups response:', { status: response.status, groupCount: result.groups?.length || 0 })
  
      if (response.ok) {
        setFlightGroups(result.groups || [])
      } else {
        console.error('Failed to fetch flight groups:', result)
      }
    } catch (error) {
      console.error('Error fetching flight groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGroupCreated = () => {
    setShowCreateForm(false)
    fetchFlightGroups()
  }

  const handleJoinSuccess = () => {
    setSelectedGroup(null)
    fetchFlightGroups()
  }

  const handleViewDetails = (group: FlightGroup) => {
    setSelectedGroupForDetails(group)
    setShowDetailsModal(true)
  }

  const handleLeaveGroup = async (groupId: string) => {
    try {
      const accessCode = localStorage.getItem('accessCode')
      
      console.log('Leaving flight group:', { groupId, accessCode: accessCode ? 'present' : 'missing' })
      
      const response = await fetch('/api/flight-groups/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode!,
        },
        body: JSON.stringify({ group_id: groupId }),
      })
  
      const result = await response.json()
      console.log('Leave group response:', { status: response.status, result })
  
      if (response.ok) {
        // Close modal if open
        if (showDetailsModal) {
          setShowDetailsModal(false)
          setSelectedGroupForDetails(null)
        }
        
        // Refresh the groups data
        await fetchFlightGroups()
        
        alert('✅ Successfully left the flight group!')
      } else {
        console.error('Failed to leave group:', result)
        alert('❌ Failed to leave group: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error leaving group:', error)
      alert('❌ Network error occurred: ' + error.message)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const openLinkedInProfile = (url: string) => {
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const isUserInGroup = (group: FlightGroup) => {
    return group.flight_participants.some(p => p.user.email === user?.email)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flight groups...</p>
        </div>
      </div>
    )
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Create Flight Group</h1>
                <p className="text-sm text-gray-600">Start a group for your departure city</p>
              </div>
              <Button onClick={() => setShowCreateForm(false)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <CreateFlightGroupForm onSuccess={handleGroupCreated} />
        </div>
      </div>
    )
  }

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Join Flight Group</h1>
                <p className="text-sm text-gray-600">{selectedGroup.departure_city} → San Francisco</p>
              </div>
              <Button onClick={() => setSelectedGroup(null)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <JoinFlightGroupForm 
            group={selectedGroup} 
            onSuccess={handleJoinSuccess} 
          />
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
              <h1 className="text-2xl font-bold text-orange-600">🛫 Flight Buddies</h1>
              <p className="text-sm text-gray-600">Connect with fellow attendees flying to SF</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Create */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by departure city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-orange-500 hover:bg-orange-600 ml-4"
          >
            ✈️ Create Flight Group
          </Button>
        </div>

        {/* Flight Groups */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No groups found' : 'No flight groups yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No flight groups found for "${searchTerm}"`
                : 'Be the first to create a flight group for your departure city!'
              }
            </p>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create First Flight Group
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="border border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        ✈️ {group.departure_city}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        → San Francisco
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {group.flight_participants.length + 1} member{group.flight_participants.length !== 0 ? 's' : ''}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Group Creator */}
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Created by:</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-600">{group.creator.email.split('@')[0]}</span>
                        <Button
                          onClick={() => openLinkedInProfile(group.creator.linkedin_url)}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-orange-600 hover:text-orange-700 p-1 h-auto"
                        >
                          🔗 LinkedIn
                        </Button>
                      </div>
                    </div>

                    {/* Participants Preview */}
                    {group.flight_participants.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Recent Members:</h4>
                        <div className="space-y-1">
                          {group.flight_participants.slice(0, 2).map((participant) => (
                            <div key={participant.id} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span>{participant.user.email.split('@')[0]}</span>
                                <span className="text-orange-600">
                                  {participant.flight_date ? formatDate(participant.flight_date) : '✈️'}
                                </span>
                              </div>
                            </div>
                          ))}
                          {group.flight_participants.length > 2 && (
                            <p className="text-xs text-gray-500 text-center">
                              +{group.flight_participants.length - 2} more members
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2">
                      {/* View Details Button */}
                      <Button 
                        onClick={() => handleViewDetails(group)}
                        variant="outline"
                        className="w-full text-orange-600 border-orange-300 hover:bg-orange-50"
                      >
                        👁️ View Details & Messages
                      </Button>
                      
                      {/* Join/Leave Button */}
                      {isUserInGroup(group) ? (
                        <Button 
                          onClick={() => handleLeaveGroup(group.id)}
                          variant="outline"
                          className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        >
                          🚪 Leave Group
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => setSelectedGroup(group)}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          🤝 Join Group
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
            ✈️ How Flight Buddies Work
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            <p>• <strong>Create a group</strong> for your departure city if one doesn't exist</p>
            <p>• <strong>Join existing groups</strong> from your departure city</p>
            <p>• <strong>Share flight details</strong> like dates, times, and airlines (optional)</p>
            <p>• <strong>Connect directly</strong> with other travelers via phone, email, or LinkedIn</p>
            <p>• <strong>Coordinate travel</strong> like shared rides to the airport or sitting together</p>
            <p>• <strong>View member messages</strong> to find compatible travel companions</p>
          </div>
        </div>
      </div>

      {/* Group Details Modal */}
      {showDetailsModal && selectedGroupForDetails && (
        <GroupDetailsModal
          group={selectedGroupForDetails}
          currentUser={user!}
          type="flight"
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedGroupForDetails(null)
          }}
          onLeave={handleLeaveGroup}
          onJoin={() => {
            setShowDetailsModal(false)
            setSelectedGroup(selectedGroupForDetails)
          }}
          isUserInGroup={isUserInGroup(selectedGroupForDetails)}
        />
      )}
    </div>
  )
}