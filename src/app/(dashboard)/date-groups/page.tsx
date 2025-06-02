'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CreateDateGroupForm } from '@/components/buddy-matching/create-date-group-form'
import { JoinDateGroupForm } from '@/components/buddy-matching/join-date-group-form'
import { GroupDetailsModal } from '@/components/buddy-matching/group-details-modal'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

interface DateGroup {
  id: string
  start_date: string
  end_date: string
  creator_id: string
  created_at: string
  creator: {
    email: string
    linkedin_url: string
  }
  date_participants: Array<{
    id: string
    user_id: string
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

export default function DateGroupsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([])
  const [filteredGroups, setFilteredGroups] = useState<DateGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<DateGroup | null>(null)
  const [selectedGroupForDetails, setSelectedGroupForDetails] = useState<DateGroup | null>(null)
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

    fetchDateGroups()
  }, [router])

  useEffect(() => {
    // Filter groups based on search term
    const filtered = dateGroups.filter(group => {
      const dateRange = `${formatDate(group.start_date)} - ${formatDate(group.end_date)}`
      return dateRange.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredGroups(filtered)
  }, [dateGroups, searchTerm])

  const fetchDateGroups = async () => {
    try {
      console.log('Fetching date groups...')
      const response = await fetch('/api/date-groups')
      const result = await response.json()
  
      console.log('Fetch date groups response:', { status: response.status, groupCount: result.groups?.length || 0 })
  
      if (response.ok) {
        setDateGroups(result.groups || [])
      } else {
        console.error('Failed to fetch date groups:', result)
      }
    } catch (error) {
      console.error('Error fetching date groups:', error)
    } finally {
      setLoading(false)
    }
  }
  const handleGroupCreated = () => {
    setShowCreateForm(false)
    fetchDateGroups()
  }

  const handleJoinSuccess = () => {
    setSelectedGroup(null)
    fetchDateGroups()
  }

  const handleViewDetails = (group: DateGroup) => {
    setSelectedGroupForDetails(group)
    setShowDetailsModal(true)
  }

  const handleLeaveGroup = async (groupId: string) => {
    try {
      const accessCode = localStorage.getItem('accessCode')
      
      console.log('Leaving date group:', { groupId, accessCode: accessCode ? 'present' : 'missing' })
      
      const response = await fetch('/api/date-groups/leave', {
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
        await fetchDateGroups()
        
        alert('✅ Successfully left the date group!')
      } else {
        console.error('Failed to leave group:', result)
        alert('❌ Failed to leave group: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error leaving group:', error)
      alert('❌ Network error occurred: ' + error.message)
    }
  }

  const formatDate = (dateString: string) => {
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

  const isUserInGroup = (group: DateGroup) => {
    return group.date_participants.some(p => p.user.email === user?.email)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading date groups...</p>
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
                <h1 className="text-2xl font-bold text-orange-600">Create Date Group</h1>
                <p className="text-sm text-gray-600">Start a group for your stay dates</p>
              </div>
              <Button onClick={() => setShowCreateForm(false)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <CreateDateGroupForm onSuccess={handleGroupCreated} />
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
                <h1 className="text-2xl font-bold text-orange-600">Join Date Group</h1>
                <p className="text-sm text-gray-600">
                  {formatDate(selectedGroup.start_date)} - {formatDate(selectedGroup.end_date)}
                </p>
              </div>
              <Button onClick={() => setSelectedGroup(null)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <JoinDateGroupForm 
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
              <h1 className="text-2xl font-bold text-orange-600">📅 Date Groups</h1>
              <p className="text-sm text-gray-600">Connect with attendees staying the same dates</p>
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
              placeholder="Search by date range..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-orange-500 hover:bg-orange-600 ml-4"
          >
            📅 Create Date Group
          </Button>
        </div>

        {/* Date Groups */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No groups found' : 'No date groups yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No date groups found matching "${searchTerm}"`
                : 'Be the first to create a date group for your stay dates!'
              }
            </p>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create First Date Group
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
                        📅 {formatDate(group.start_date)} - {formatDate(group.end_date)}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        Stay dates in San Francisco
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {group.date_participants.length + 1} member{group.date_participants.length !== 0 ? 's' : ''}
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
                    {group.date_participants.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Recent Members:</h4>
                        <div className="space-y-1">
                          {group.date_participants.slice(0, 2).map((participant) => (
                            <div key={participant.id} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span>{participant.user.email.split('@')[0]}</span>
                                <span className="text-orange-600">
                                  {participant.notes ? '💬' : '👤'}
                                </span>
                              </div>
                            </div>
                          ))}
                          {group.date_participants.length > 2 && (
                            <p className="text-xs text-gray-500 text-center">
                              +{group.date_participants.length - 2} more members
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
            📅 How Date Groups Work
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            <p>• <strong>Create a group</strong> for your exact stay dates if one doesn't exist</p>
            <p>• <strong>Join existing groups</strong> with matching stay dates</p>
            <p>• <strong>Connect with others</strong> staying the same time as you</p>
            <p>• <strong>Plan activities</strong> and explore SF together</p>
            <p>• <strong>Share contact info</strong> via phone, email, or LinkedIn</p>
            <p>• <strong>View member messages</strong> to find like-minded travel companions</p>
          </div>
        </div>
      </div>

      {/* Group Details Modal */}
      {showDetailsModal && selectedGroupForDetails && (
        <GroupDetailsModal
          group={selectedGroupForDetails}
          currentUser={user!}
          type="date"
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