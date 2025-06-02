'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const dateGroupSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
}).refine((data) => {
  const start = new Date(data.startDate)
  const end = new Date(data.endDate)
  return start <= end
}, {
  message: "End date must be after or equal to start date",
  path: ["endDate"],
})

type DateGroupForm = z.infer<typeof dateGroupSchema>

interface CreateDateGroupFormProps {
  onSuccess: () => void
}

export function CreateDateGroupForm({ onSuccess }: CreateDateGroupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<DateGroupForm>({
    resolver: zodResolver(dateGroupSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  })

  const onSubmit = async (data: DateGroupForm) => {
    setIsLoading(true)
    setError('')

    try {
      const accessCode = localStorage.getItem('accessCode')
      if (!accessCode) {
        setError('Please log in again')
        return
      }

      const response = await fetch('/api/date-groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode,
        },
        body: JSON.stringify({
          start_date: data.startDate,
          end_date: data.endDate
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to create date group')
        return
      }

      onSuccess()
    } catch (error) {
      console.error('Date group creation error:', error)
      setError('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="border border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700">📅 Create Date Group</CardTitle>
        <CardDescription>
          Start a date group for your stay dates. Other attendees with matching dates can join and coordinate activities together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                {...form.register('startDate')}
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.startDate && (
                <p className="text-sm text-red-600">{form.formState.errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                {...form.register('endDate')}
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.endDate && (
                <p className="text-sm text-red-600">{form.formState.errors.endDate.message}</p>
              )}
            </div>
          </div>

          {form.watch('startDate') && form.watch('endDate') && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-blue-800 font-medium">
                📅 Date Range: {formatDate(form.watch('startDate'))} - {formatDate(form.watch('endDate'))}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <h4 className="font-medium text-green-800 mb-2">📋 What happens next:</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p>1. You'll create the date group for your stay dates</p>
              <p>2. Other attendees with matching dates can join your group</p>
              <p>3. Everyone can share contact info and coordinate activities</p>
              <p>4. Plan group activities, meals, and explore SF together</p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Group...' : '🚀 Create Date Group'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}