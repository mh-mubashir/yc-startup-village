'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const flightGroupSchema = z.object({
  departureCity: z.string().min(2, 'Please select a departure city'),
})

type FlightGroupForm = z.infer<typeof flightGroupSchema>

interface CreateFlightGroupFormProps {
  onSuccess: () => void
}

// Major cities/airports dropdown options
const DEPARTURE_CITIES = [
  'Atlanta (ATL)', 'Austin (AUS)', 'Boston (BOS)', 'Chicago (ORD)', 'Dallas (DFW)', 
  'Denver (DEN)', 'Detroit (DTW)', 'Houston (IAH)', 'Las Vegas (LAS)', 'Los Angeles (LAX)',
  'Miami (MIA)', 'Minneapolis (MSP)', 'New York (JFK)', 'New York (LGA)', 'Orlando (MCO)',
  'Philadelphia (PHL)', 'Phoenix (PHX)', 'Portland (PDX)', 'San Diego (SAN)', 'Seattle (SEA)',
  'Washington DC (DCA)', 'London (LHR)', 'Toronto (YYZ)', 'Vancouver (YVR)', 'Beijing (PEK)',
  'Shanghai (PVG)', 'Tokyo (NRT)', 'Mumbai (BOM)', 'Delhi (DEL)', 'Sydney (SYD)'
]

export function CreateFlightGroupForm({ onSuccess }: CreateFlightGroupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<FlightGroupForm>({
    resolver: zodResolver(flightGroupSchema),
    defaultValues: {
      departureCity: '',
    },
  })

  const onSubmit = async (data: FlightGroupForm) => {
    setIsLoading(true)
    setError('')

    try {
      const accessCode = localStorage.getItem('accessCode')
      if (!accessCode) {
        setError('Please log in again')
        return
      }

      const response = await fetch('/api/flight-groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode,
        },
        body: JSON.stringify({
          departure_city: data.departureCity
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to create flight group')
        return
      }

      onSuccess()
    } catch (error) {
      console.error('Flight group creation error:', error)
      setError('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700">✈️ Create Flight Group</CardTitle>
        <CardDescription>
          Start a flight group for your departure city. Other attendees can then join and coordinate travel together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="departureCity">Departure City/Airport *</Label>
            <Select
              id="departureCity"
              {...form.register('departureCity')}
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select your departure city...</option>
              {DEPARTURE_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
            {form.formState.errors.departureCity && (
              <p className="text-sm text-red-600">{form.formState.errors.departureCity.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="font-medium text-blue-800 mb-2">📋 What happens next:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>1. You'll create the flight group for {form.watch('departureCity') || 'your city'}</p>
              <p>2. Other attendees flying from the same city can join your group</p>
              <p>3. Everyone can share flight details and coordinate travel</p>
              <p>4. Connect via phone, email, or LinkedIn to plan together</p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Group...' : '🚀 Create Flight Group'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
