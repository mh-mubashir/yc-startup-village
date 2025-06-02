'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const joinDateSchema = z.object({
  notes: z.string().optional(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  showPhone: z.boolean().default(true),
  showEmail: z.boolean().default(true),
  showLinkedIn: z.boolean().default(true),
}).refine((data) => {
  return data.showPhone || data.showEmail || data.showLinkedIn
}, {
  message: "Please select at least one contact method to share with group members",
  path: ["showPhone"],
})

type JoinDateForm = z.infer<typeof joinDateSchema>

interface JoinDateGroupFormProps {
  group: {
    id: string
    start_date: string
    end_date: string
    creator: {
      email: string
      linkedin_url: string
    }
    date_participants: any[]
  }
  onSuccess: () => void
}

export function JoinDateGroupForm({ group, onSuccess }: JoinDateGroupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<JoinDateForm>({
    resolver: zodResolver(joinDateSchema),
    defaultValues: {
      notes: '',
      phone: '',
      showPhone: true,
      showEmail: true,
      showLinkedIn: true,
    },
  })

  const onSubmit = async (data: JoinDateForm) => {
    setIsLoading(true)
    setError('')

    try {
      const accessCode = localStorage.getItem('accessCode')
      if (!accessCode) {
        setError('Please log in again')
        return
      }

      const response = await fetch('/api/date-groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode,
        },
        body: JSON.stringify({
          group_id: group.id,
          notes: data.notes || null,
          phone: data.phone,
          show_phone: data.showPhone,
          show_email: data.showEmail,
          show_linkedin: data.showLinkedIn,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to join date group')
        return
      }

      onSuccess()
    } catch (error) {
      console.error('Join date group error:', error)
      setError('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="border border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700">
          📅 Join Date Group: {formatDate(group.start_date)} - {formatDate(group.end_date)}
        </CardTitle>
        <CardDescription>
          Share your contact preferences and connect with others staying the same dates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Contact Information</h4>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Your Phone Number *</Label>
              <Input
                id="phone"
                {...form.register('phone')}
                placeholder="+1 (555) 123-4567"
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">What to Share with Group Members *</h4>
            <p className="text-sm text-gray-600">Select at least one way for other members to contact you</p>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...form.register('showPhone')}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Share my phone number</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...form.register('showEmail')}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Share my email address</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...form.register('showLinkedIn')}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Share my LinkedIn profile</span>
              </label>
              
              {form.formState.errors.showPhone && (
                <p className="text-sm text-red-600">{form.formState.errors.showPhone.message}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Message for Group Members (Optional)</Label>
            <Textarea
              id="notes"
              {...form.register('notes')}
              placeholder="Share what You&apos;re interested in doing, places you'd like to visit, or how you'd like to connect..."
              rows={3}
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500">
              Other members will see this message when viewing group details
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
            <h4 className="font-medium text-orange-800 mb-2">🤝 Group Members ({group.date_participants.length + 1})</h4>
            <div className="text-sm text-orange-700 space-y-1">
              <p>• <strong>Group Creator:</strong> {group.creator.email.split('@')[0]}</p>
              {group.date_participants.slice(0, 3).map((participant: any, index: number) => (
                <p key={index}>• <strong>Member:</strong> {participant.user.email.split('@')[0]}</p>
              ))}
              {group.date_participants.length > 3 && (
                <p>• + {group.date_participants.length - 3} more members</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Joining Group...' : '🤝 Join Date Group'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}