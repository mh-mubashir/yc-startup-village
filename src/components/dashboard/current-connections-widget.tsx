'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

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

interface CurrentConnectionsWidgetProps {
  accessCode: string
}

export function CurrentConnectionsWidget({ accessCode }: CurrentConnectionsWidgetProps) {
  const [connections, setConnections] = useState<ContactShare[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchConnections()
  }, [accessCode])

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/host/contact-shares', {
        headers: {
          'x-access-code': accessCode,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setConnections(data.shares || [])
      }
    } catch (error) {
      console.error('Error fetching connections:', error)
    } finally {
      setLoading(false)
    }
  }

  const openLinkedInProfile = (url: string) => {
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getLinkedInUsername = (url: string) => {
    try {
      const match = url.match(/linkedin\.com\/in\/([^\/]+)/)
      return match ? match[1].replace(/-/g, ' ') : 'LinkedIn'
    } catch {
      return 'LinkedIn'
    }
  }

  if (loading) {
    return (
      <Card className="border border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🤝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Connections</p>
              <div className="animate-pulse bg-gray-200 h-6 w-8 rounded mt-1"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-green-200 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-green-700 flex items-center">
          🤝 Active Connections
        </CardTitle>
        <CardDescription>
          {connections.length > 0 
            ? `${connections.length} active connection${connections.length !== 1 ? 's' : ''} with fellow attendees`
            : 'No active connections yet'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Connection Count Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${connections.length > 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                <span className="text-3xl">
                  {connections.length > 0 ? '🌟' : '🤝'}
                </span>
              </div>
              <div className="ml-4">
                <p className={`text-3xl font-bold ${connections.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {connections.length}
                </p>
                <p className="text-sm text-gray-600">
                  {connections.length === 1 ? 'Connection' : 'Connections'}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => router.push('/host')}
              variant={connections.length > 0 ? "default" : "outline"}
              className={connections.length > 0 ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {connections.length > 0 ? '👥 View All' : '📋 Host Dashboard'}
            </Button>
          </div>

          {/* Recent Connections Preview */}
          {connections.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Recent Connections:</h4>
              <div className="space-y-2">
                {connections.slice(0, 2).map((connection) => (
                  <div key={connection.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            {connection.isCurrentUserHost ? 'Guest' : 'Host'}
                          </Badge>
                          <span className="text-sm font-medium text-gray-900">
                            {connection.otherPerson.email.split('@')[0]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {connection.accommodations.title} • Connected {formatDate(connection.shared_at)}
                        </p>
                      </div>
                      <Button
                        onClick={() => openLinkedInProfile(connection.otherPerson.linkedin_url)}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-green-600 hover:text-green-700 p-1 h-auto"
                      >
                        🔗 {getLinkedInUsername(connection.otherPerson.linkedin_url)}
                      </Button>
                    </div>
                  </div>
                ))}
                
                {connections.length > 2 && (
                  <p className="text-xs text-gray-500 text-center">
                    +{connections.length - 2} more connection{connections.length - 2 !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          {connections.length > 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                <strong>Keep connecting!</strong> Your active connections can help expand your YC network and create lasting relationships.
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                <strong>Start connecting!</strong> Browse accommodations or create listings to connect with fellow YC attendees.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}