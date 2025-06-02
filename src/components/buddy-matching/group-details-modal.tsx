'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface GroupMember {
  id: string
  user: {
    email: string
    linkedin_url: string
    phone?: string
  }
  notes?: string
  phone?: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
  flight_date?: string
  flight_time?: string
  airline?: string
  created_at: string
}

interface GroupDetailsModalProps {
  group: {
    id: string
    departure_city?: string
    start_date?: string
    end_date?: string
    creator: {
      email: string
      linkedin_url: string
    }
    flight_participants?: GroupMember[]
    date_participants?: GroupMember[]
  }
  currentUser: {
    email: string
  }
  type: 'flight' | 'date'
  onClose: () => void
  onLeave: (groupId: string) => void
  onJoin: () => void
  isUserInGroup: boolean
}

export function GroupDetailsModal({ 
  group, 
  currentUser, 
  type, 
  onClose, 
  onLeave, 
  onJoin,
  isUserInGroup 
}: GroupDetailsModalProps) {
  const [isLeaving, setIsLeaving] = useState(false)
  
  const participants = type === 'flight' ? group.flight_participants || [] : group.date_participants || []
  
  const handleLeave = async () => {
    setIsLeaving(true)
    try {
      await onLeave(group.id)
      onClose()
    } catch (error) {
      console.error('Error leaving group:', error)
    } finally {
      setIsLeaving(false)
    }
  }

  const openLinkedInProfile = (url: string) => {
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getGroupTitle = () => {
    if (type === 'flight') {
      return `✈️ ${group.departure_city} → San Francisco`
    } else {
      return `📅 ${formatDate(group.start_date)} - ${formatDate(group.end_date)}`
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-gray-900">
                  {getGroupTitle()}
                </CardTitle>
                <CardDescription>
                  {participants.length + 1} member{participants.length !== 0 ? 's' : ''} • Created by {group.creator.email.split('@')[0]}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {isUserInGroup ? (
                  <Button
                    onClick={handleLeave}
                    disabled={isLeaving}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    {isLeaving ? 'Leaving...' : '🚪 Leave Group'}
                  </Button>
                ) : (
                  <Button
                    onClick={onJoin}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    🤝 Join Group
                  </Button>
                )}
                <Button onClick={onClose} variant="outline">
                  ✕ Close
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Group Creator */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">👑 Group Creator</h3>
              <Card className="border border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{group.creator.email.split('@')[0]}</p>
                      <p className="text-sm text-gray-600">{group.creator.email}</p>
                    </div>
                    <Button
                      onClick={() => openLinkedInProfile(group.creator.linkedin_url)}
                      variant="outline"
                      size="sm"
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      🔗 LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Group Members */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                🤝 Group Members ({participants.length})
              </h3>
              
              {participants.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No members have joined yet. Be the first!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {participants.map((participant) => (
                    <Card key={participant.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Member Info */}
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {participant.user.email.split('@')[0]}
                              </p>
                              <p className="text-sm text-gray-600">
                                Joined {formatDate(participant.created_at)}
                              </p>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Member
                            </Badge>
                          </div>

                          {/* Flight-specific info */}
                          {type === 'flight' && (participant.flight_date || participant.airline) && (
                            <div className="bg-blue-50 rounded-lg p-3">
                              <h4 className="font-medium text-blue-800 mb-2">✈️ Flight Details</h4>
                              <div className="text-sm text-blue-700 space-y-1">
                                {participant.flight_date && (
                                  <p>📅 Date: {formatDate(participant.flight_date)}</p>
                                )}
                                {participant.flight_time && (
                                  <p>🕐 Time: {participant.flight_time}</p>
                                )}
                                {participant.airline && (
                                  <p>✈️ Airline: {participant.airline}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Notes/Message */}
                          {participant.notes && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <h4 className="font-medium text-gray-800 mb-2">💬 Message</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                "{participant.notes}"
                              </p>
                            </div>
                          )}

                          {/* Contact Information */}
                          <div className="bg-orange-50 rounded-lg p-3">
                            <h4 className="font-medium text-orange-800 mb-2">📞 Contact Options</h4>
                            <div className="flex flex-wrap gap-3">
                              {participant.show_email && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-orange-700">📧</span>
                                  <span className="text-sm text-orange-700">{participant.user.email}</span>
                                </div>
                              )}
                              
                              {participant.show_phone && participant.phone && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-orange-700">📱</span>
                                  <span className="text-sm text-orange-700 font-mono">{participant.phone}</span>
                                </div>
                              )}
                              
                              {participant.show_linkedin && (
                                <Button
                                  onClick={() => openLinkedInProfile(participant.user.linkedin_url)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-orange-600 hover:text-orange-700 p-1 h-auto"
                                >
                                  🔗 LinkedIn
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Group Guidelines */}
            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-800 mb-2">
                {type === 'flight' ? '✈️ Flight Coordination Tips' : '📅 Activity Planning Tips'}
              </h4>
              <div className="text-sm text-orange-700 space-y-1">
                {type === 'flight' ? (
                  <>
                    <p>• Share your flight details to find travel companions</p>
                    <p>• Coordinate airport rides or sitting together on flights</p>
                    <p>• Connect directly via phone, email, or LinkedIn</p>
                    <p>• Consider meeting at the airport before your flight</p>
                  </>
                ) : (
                  <>
                    <p>• Plan group activities and explore SF together</p>
                    <p>• Share meal plans and restaurant recommendations</p>
                    <p>• Coordinate transportation and sightseeing</p>
                    <p>• Connect directly via phone, email, or LinkedIn</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}