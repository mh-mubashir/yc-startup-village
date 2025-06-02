'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const contactRequestSchema = z.object({
  message: z.string().min(20, 'Please write at least 20 characters introducing yourself'),
  phone: z.string().min(10, 'Please provide a valid phone number'),
})

type ContactRequestForm = z.infer<typeof contactRequestSchema>

interface Accommodation {
  id: string
  title: string
  description: string
  address: string
  price_per_night: number
  max_guests: number
  available_spots: number
}

export default function ContactRequestPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const { id } = use(params)
  
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<ContactRequestForm>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      message: '',
      phone: '',
    },
  })

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    if (!accessCode) {
      router.push('/login')
      return
    }

    // Fetch accommodation details - now using the unwrapped id
    fetchAccommodation()
  }, [id, router]) // Use the unwrapped id in the dependency array

  const fetchAccommodation = async () => {
    try {
      // Use the unwrapped id here
      const response = await fetch(`/api/accommodations/${id}`)
      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Accommodation not found')
        return
      }

      setAccommodation(result.accommodation)
    } catch (error) {
      console.error('Error fetching accommodation:', error)
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ContactRequestForm) => {
    setSubmitting(true)
    setError('')

    try {
      const accessCode = localStorage.getItem('accessCode')
      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode!,
        },
        body: JSON.stringify({
          accommodationId: id, // Use the unwrapped id
          message: data.message,
          phone: data.phone,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to send contact request')
        return
      }

      setSuccess(true)
    } catch (error) {
      console.error('Contact request error:', error)
      setError('Network error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading accommodation details...</p>
        </div>
      </div>
    )
  }

  if (error && !accommodation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Accommodation Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/accommodations')}>
            ← Back to Listings
          </Button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Card className="border border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600 text-center">✅ Request Sent!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Your contact request has been sent to the host. They'll review your message and decide whether to share their contact information.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm text-green-700 space-y-2">
                    <p><strong>What happens next:</strong></p>
                    <p>1. The host will see your message and phone number</p>
                    <p>2. If they approve, you'll get their phone number</p>
                    <p>3. You can then coordinate directly via phone/text</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={() => router.push('/accommodations')}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Browse More Listings
                  </Button>
                  <Button 
                    onClick={() => router.push('/dashboard')}
                    variant="outline"
                    className="w-full"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">YC Startup Village</h1>
              <p className="text-sm text-gray-600">Request contact information</p>
            </div>
            <Button onClick={() => router.push('/accommodations')} variant="outline" size="sm">
              ← Back to Listings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Accommodation Details */}
          <div>
            <Card className="border border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-700">🏠 Accommodation Details</CardTitle>
              </CardHeader>
              <CardContent>
                {accommodation && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{accommodation.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">📍 {accommodation.address}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Price per night:</span>
                          <div className="font-semibold text-orange-600">${accommodation.price_per_night}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Max guests:</span>
                          <div className="font-semibold">{accommodation.max_guests} people</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Available spots:</span>
                          <div className="font-semibold text-green-600">{accommodation.available_spots} remaining</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {accommodation.description}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Request Form */}
          <div>
            <Card className="border border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-700">📱 Contact Request</CardTitle>
                <CardDescription>
                  Send a message to the host to request their contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      {...form.register('message')}
                      placeholder="Hi! I'm attending YC AI Startup School and am interested in your accommodation. I'm a [describe yourself briefly] and would love to connect..."
                      rows={6}
                      disabled={submitting}
                      className="focus:border-orange-500 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500">
                      Introduce yourself and explain why You&apos;re interested in this accommodation
                    </p>
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-600">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Your Phone Number *</Label>
                    <Input
                      id="phone"
                      {...form.register('phone')}
                      placeholder="+1 (555) 123-4567"
                      disabled={submitting}
                      className="focus:border-orange-500 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-500">
                      The host will see this and can contact you if they approve your request
                    </p>
                    {form.formState.errors.phone && (
                      <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                    )}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                    <h4 className="font-medium text-orange-800 mb-2">📋 What happens next:</h4>
                    <div className="text-sm text-orange-700 space-y-1">
                      <p>1. Your message and phone number will be sent to the host</p>
                      <p>2. They'll review your request and decide whether to approve it</p>
                      <p>3. If approved, you'll receive their phone number</p>
                      <p>4. You can then coordinate directly via phone or text</p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600" 
                    disabled={submitting}
                  >
                    {submitting ? 'Sending Request...' : '📤 Send Contact Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}