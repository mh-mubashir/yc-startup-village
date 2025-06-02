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

const listingSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),  
  address: z.string().min(10, 'Address must be at least 10 characters'),
  pricePerNight: z.number().min(1, 'Price must be at least $1'),
  maxGuests: z.number().min(1, 'Must accommodate at least 1 guest').max(10, 'Maximum 10 guests'),
  availableSpots: z.number().min(1, 'Must have at least 1 available spot'),
  amenities: z.string(),
  houseRules: z.string().optional(),
  availableFrom: z.string().min(1, 'Start date is required'),
  availableUntil: z.string().min(1, 'End date is required'),
  hostPhone: z.string().min(10, 'Valid phone number required (will be shared when you approve requests)'),
})

type ListingForm = z.infer<typeof listingSchema>

interface CreateListingFormProps {
  onSuccess: () => void
}

export function CreateListingForm({ onSuccess }: CreateListingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<ListingForm>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      pricePerNight: 0,
      maxGuests: 1,
      availableSpots: 1,
      amenities: '',
      houseRules: '',
      availableFrom: '',
      availableUntil: '',
      hostPhone: '',
    },
  })

  const onSubmit = async (data: ListingForm) => {
    setIsLoading(true)
    setError('')

    try {
      const accessCode = localStorage.getItem('accessCode')
      if (!accessCode) {
        setError('Please log in again')
        return
      }

      const response = await fetch('/api/accommodations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode,
        },
        body: JSON.stringify({
          ...data,
          amenities: data.amenities.split(',').map(a => a.trim()).filter(a => a.length > 0)
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to create listing')
        return
      }

      onSuccess()
    } catch (error) {
      console.error('Listing creation error:', error)
      setError('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700">🏠 Create Accommodation Listing</CardTitle>
        <CardDescription>
          Share your space with fellow YC attendees and help the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Listing Title *</Label>
            <Input
              id="title"
              {...form.register('title')}
              placeholder="e.g., Cozy 2BR near YC venue - Perfect for founders!"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Describe your space, what makes it great for YC attendees, nearby amenities, etc."
              rows={4}
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Location/Address *</Label>
            <Input
              id="address"
              {...form.register('address')}
              placeholder="e.g., Mission District, SF or specific address"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.address && (
              <p className="text-sm text-red-600">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricePerNight">Price per Night ($) *</Label>
              <Input
                id="pricePerNight"
                type="number"
                {...form.register('pricePerNight', { valueAsNumber: true })}
                placeholder="50"
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.pricePerNight && (
                <p className="text-sm text-red-600">{form.formState.errors.pricePerNight.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxGuests">Max Guests *</Label>
              <Input
                id="maxGuests"
                type="number"
                {...form.register('maxGuests', { valueAsNumber: true })}
                placeholder="2"
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.maxGuests && (
                <p className="text-sm text-red-600">{form.formState.errors.maxGuests.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableSpots">Available Spots *</Label>
              <Input
                id="availableSpots"
                type="number"
                {...form.register('availableSpots', { valueAsNumber: true })}
                placeholder="1"
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.availableSpots && (
                <p className="text-sm text-red-600">{form.formState.errors.availableSpots.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availableFrom">Available From *</Label>
              <Input
                id="availableFrom"
                type="date"
                {...form.register('availableFrom')}
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.availableFrom && (
                <p className="text-sm text-red-600">{form.formState.errors.availableFrom.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableUntil">Available Until *</Label>
              <Input
                id="availableUntil"
                type="date"
                {...form.register('availableUntil')}
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              {form.formState.errors.availableUntil && (
                <p className="text-sm text-red-600">{form.formState.errors.availableUntil.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities</Label>
            <Input
              id="amenities"
              {...form.register('amenities')}
              placeholder="WiFi, Kitchen, Parking, Gym, etc. (comma separated)"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500">Separate multiple amenities with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="houseRules">House Rules</Label>
            <Textarea
              id="houseRules"
              {...form.register('houseRules')}
              placeholder="Any specific rules for guests (optional)"
              rows={3}
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hostPhone">Your Phone Number *</Label>
            <Input
              id="hostPhone"
              {...form.register('hostPhone')}
              placeholder="+1 (555) 123-4567"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500">
              📱 This will only be shared when you approve contact requests from interested guests
            </p>
            {form.formState.errors.hostPhone && (
              <p className="text-sm text-red-600">{form.formState.errors.hostPhone.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
            <h3 className="font-medium text-orange-800 mb-2">📞 How Contact Sharing Works:</h3>
            <div className="text-sm text-orange-700 space-y-1">
              <p>1. Guests interested in your listing can send you a contact request</p>
              <p>2. You'll see their message and phone number</p>
              <p>3. If you approve, they'll get your phone number to coordinate directly</p>
              <p>4. Both parties can then communicate via phone/text</p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Listing...' : '🚀 Create Listing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
