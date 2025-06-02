'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface PendingRequestsWidgetProps {
  accessCode: string
}

export function PendingRequestsWidget({ accessCode }: PendingRequestsWidgetProps) {
  const [pendingCount, setPendingCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPendingCount()
  }, [accessCode])

  const fetchPendingCount = async () => {
    try {
      const response = await fetch('/api/host/contact-requests', {
        headers: {
          'x-access-code': accessCode,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const pending = data.requests?.filter((req: any) => req.status === 'pending').length || 0
        setPendingCount(pending)
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="border border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <div className="animate-pulse bg-gray-200 h-6 w-8 rounded mt-1"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="text-orange-700 flex items-center">
          ⏳ Accommodation Requests
        </CardTitle>
        <CardDescription>
          {pendingCount > 0 
            ? `${pendingCount} pending request${pendingCount !== 1 ? 's' : ''} need${pendingCount === 1 ? 's' : ''} your attention`
            : 'No pending requests'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${pendingCount > 0 ? 'bg-orange-100' : 'bg-gray-100'}`}>
              <span className={`text-3xl ${pendingCount > 0 ? 'animate-pulse' : ''}`}>
                {pendingCount > 0 ? '🔔' : '📭'}
              </span>
            </div>
            <div className="ml-4">
              <p className={`text-3xl font-bold ${pendingCount > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
                {pendingCount}
              </p>
              <p className="text-sm text-gray-600">
                {pendingCount === 1 ? 'Request' : 'Requests'}
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => router.push('/host')}
            variant={pendingCount > 0 ? "default" : "outline"}
            className={pendingCount > 0 ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            {pendingCount > 0 ? '🔍 Review Requests' : '📋 View Dashboard'}
          </Button>
        </div>

        {pendingCount > 0 && (
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-700">
              <strong>Action needed:</strong> Guests are waiting for you to approve or decline their accommodation requests.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}