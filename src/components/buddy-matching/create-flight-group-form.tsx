'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const flightGroupSchema = z.object({
  departureCity: z.string().min(2, 'Please enter or select a departure city'),
})

type FlightGroupForm = z.infer<typeof flightGroupSchema>

interface CreateFlightGroupFormProps {
  onSuccess: () => void
}

// Comprehensive city database (500+ cities)
const COMPREHENSIVE_CITIES = [
  // TIER 1: Major Tech Hubs & Direct SF Routes
  { name: 'San Francisco', country: 'USA', region: 'North America', tier: 1, hasDirectSF: true },
  { name: 'New York City', country: 'USA', region: 'North America', tier: 1, hasDirectSF: true },
  { name: 'Los Angeles', country: 'USA', region: 'North America', tier: 1, hasDirectSF: true },
  { name: 'London', country: 'UK', region: 'Europe', tier: 1, hasDirectSF: true },
  { name: 'Paris', country: 'France', region: 'Europe', tier: 1, hasDirectSF: true },
  { name: 'Tokyo', country: 'Japan', region: 'Asia-Pacific', tier: 1, hasDirectSF: true },
  { name: 'Seoul', country: 'South Korea', region: 'Asia-Pacific', tier: 1, hasDirectSF: true },
  { name: 'Singapore', country: 'Singapore', region: 'Asia-Pacific', tier: 1, hasDirectSF: true },
  { name: 'Frankfurt', country: 'Germany', region: 'Europe', tier: 1, hasDirectSF: true },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', tier: 1, hasDirectSF: true },
  { name: 'Zurich', country: 'Switzerland', region: 'Europe', tier: 1, hasDirectSF: true },
  { name: 'Dublin', country: 'Ireland', region: 'Europe', tier: 1, hasDirectSF: true },
  { name: 'Tel Aviv', country: 'Israel', region: 'Middle East', tier: 1, hasDirectSF: true },
  
  // USA - Major Cities
  { name: 'Boston', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Seattle', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Austin', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Chicago', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Denver', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Miami', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Atlanta', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Washington DC', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Philadelphia', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Dallas', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Houston', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Phoenix', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Las Vegas', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Portland', country: 'USA', region: 'North America', tier: 1 },
  { name: 'San Diego', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Minneapolis', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Detroit', country: 'USA', region: 'North America', tier: 1 },
  { name: 'Tampa', country: 'USA', region: 'North America', tier: 2 },
  { name: 'Orlando', country: 'USA', region: 'North America', tier: 2 },
  { name: 'Nashville', country: 'USA', region: 'North America', tier: 2 },
  { name: 'Charlotte', country: 'USA', region: 'North America', tier: 2 },
  { name: 'Raleigh', country: 'USA', region: 'North America', tier: 2 },
  { name: 'Salt Lake City', country: 'USA', region: 'North America', tier: 2 },
  
  // Canada
  { name: 'Toronto', country: 'Canada', region: 'North America', tier: 1 },
  { name: 'Vancouver', country: 'Canada', region: 'North America', tier: 1 },
  { name: 'Montreal', country: 'Canada', region: 'North America', tier: 1 },
  { name: 'Ottawa', country: 'Canada', region: 'North America', tier: 2 },
  { name: 'Calgary', country: 'Canada', region: 'North America', tier: 2 },
  { name: 'Edmonton', country: 'Canada', region: 'North America', tier: 2 },
  { name: 'Winnipeg', country: 'Canada', region: 'North America', tier: 2 },
  { name: 'Halifax', country: 'Canada', region: 'North America', tier: 2 },
  
  // Mexico
  { name: 'Mexico City', country: 'Mexico', region: 'North America', tier: 1 },
  { name: 'Guadalajara', country: 'Mexico', region: 'North America', tier: 1 },
  { name: 'Monterrey', country: 'Mexico', region: 'North America', tier: 1 },
  { name: 'Tijuana', country: 'Mexico', region: 'North America', tier: 2 },
  { name: 'Cancun', country: 'Mexico', region: 'North America', tier: 2 },
  
  // Europe - Major Hubs
  { name: 'Berlin', country: 'Germany', region: 'Europe', tier: 1 },
  { name: 'Munich', country: 'Germany', region: 'Europe', tier: 1 },
  { name: 'Hamburg', country: 'Germany', region: 'Europe', tier: 2 },
  { name: 'Cologne', country: 'Germany', region: 'Europe', tier: 2 },
  { name: 'Madrid', country: 'Spain', region: 'Europe', tier: 1 },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', tier: 1 },
  { name: 'Rome', country: 'Italy', region: 'Europe', tier: 1 },
  { name: 'Milan', country: 'Italy', region: 'Europe', tier: 1 },
  { name: 'Stockholm', country: 'Sweden', region: 'Europe', tier: 1 },
  { name: 'Copenhagen', country: 'Denmark', region: 'Europe', tier: 1 },
  { name: 'Oslo', country: 'Norway', region: 'Europe', tier: 1 },
  { name: 'Helsinki', country: 'Finland', region: 'Europe', tier: 1 },
  { name: 'Vienna', country: 'Austria', region: 'Europe', tier: 1 },
  { name: 'Brussels', country: 'Belgium', region: 'Europe', tier: 1 },
  { name: 'Warsaw', country: 'Poland', region: 'Europe', tier: 1 },
  { name: 'Prague', country: 'Czech Republic', region: 'Europe', tier: 1 },
  { name: 'Budapest', country: 'Hungary', region: 'Europe', tier: 1 },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe', tier: 1 },
  { name: 'Athens', country: 'Greece', region: 'Europe', tier: 1 },
  { name: 'Istanbul', country: 'Turkey', region: 'Europe', tier: 1 },
  { name: 'Moscow', country: 'Russia', region: 'Europe', tier: 1 },
  { name: 'Kiev', country: 'Ukraine', region: 'Europe', tier: 2 },
  { name: 'Bucharest', country: 'Romania', region: 'Europe', tier: 2 },
  { name: 'Sofia', country: 'Bulgaria', region: 'Europe', tier: 2 },
  { name: 'Belgrade', country: 'Serbia', region: 'Europe', tier: 2 },
  { name: 'Zagreb', country: 'Croatia', region: 'Europe', tier: 2 },
  
  // Asia-Pacific
  { name: 'Beijing', country: 'China', region: 'Asia-Pacific', tier: 1 },
  { name: 'Shanghai', country: 'China', region: 'Asia-Pacific', tier: 1 },
  { name: 'Shenzhen', country: 'China', region: 'Asia-Pacific', tier: 1 },
  { name: 'Guangzhou', country: 'China', region: 'Asia-Pacific', tier: 1 },
  { name: 'Hong Kong', country: 'Hong Kong', region: 'Asia-Pacific', tier: 1 },
  { name: 'Taipei', country: 'Taiwan', region: 'Asia-Pacific', tier: 1 },
  { name: 'Osaka', country: 'Japan', region: 'Asia-Pacific', tier: 1 },
  { name: 'Kyoto', country: 'Japan', region: 'Asia-Pacific', tier: 2 },
  { name: 'Nagoya', country: 'Japan', region: 'Asia-Pacific', tier: 2 },
  { name: 'Mumbai', country: 'India', region: 'Asia-Pacific', tier: 1 },
  { name: 'Delhi', country: 'India', region: 'Asia-Pacific', tier: 1 },
  { name: 'Bangalore', country: 'India', region: 'Asia-Pacific', tier: 1 },
  { name: 'Hyderabad', country: 'India', region: 'Asia-Pacific', tier: 1 },
  { name: 'Pune', country: 'India', region: 'Asia-Pacific', tier: 1 },
  { name: 'Chennai', country: 'India', region: 'Asia-Pacific', tier: 1 },
  { name: 'Kolkata', country: 'India', region: 'Asia-Pacific', tier: 2 },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia-Pacific', tier: 1 },
  { name: 'Jakarta', country: 'Indonesia', region: 'Asia-Pacific', tier: 1 },
  { name: 'Manila', country: 'Philippines', region: 'Asia-Pacific', tier: 1 },
  { name: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia-Pacific', tier: 1 },
  { name: 'Ho Chi Minh City', country: 'Vietnam', region: 'Asia-Pacific', tier: 1 },
  { name: 'Hanoi', country: 'Vietnam', region: 'Asia-Pacific', tier: 1 },
  { name: 'Sydney', country: 'Australia', region: 'Asia-Pacific', tier: 1 },
  { name: 'Melbourne', country: 'Australia', region: 'Asia-Pacific', tier: 1 },
  { name: 'Brisbane', country: 'Australia', region: 'Asia-Pacific', tier: 1 },
  { name: 'Perth', country: 'Australia', region: 'Asia-Pacific', tier: 2 },
  { name: 'Adelaide', country: 'Australia', region: 'Asia-Pacific', tier: 2 },
  { name: 'Auckland', country: 'New Zealand', region: 'Asia-Pacific', tier: 1 },
  { name: 'Wellington', country: 'New Zealand', region: 'Asia-Pacific', tier: 2 },
  
  // Latin America
  { name: 'São Paulo', country: 'Brazil', region: 'Latin America', tier: 1 },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'Latin America', tier: 1 },
  { name: 'Brasília', country: 'Brazil', region: 'Latin America', tier: 2 },
  { name: 'Buenos Aires', country: 'Argentina', region: 'Latin America', tier: 1 },
  { name: 'Santiago', country: 'Chile', region: 'Latin America', tier: 1 },
  { name: 'Lima', country: 'Peru', region: 'Latin America', tier: 1 },
  { name: 'Bogotá', country: 'Colombia', region: 'Latin America', tier: 1 },
  { name: 'Medellín', country: 'Colombia', region: 'Latin America', tier: 1 },
  { name: 'Caracas', country: 'Venezuela', region: 'Latin America', tier: 2 },
  { name: 'Quito', country: 'Ecuador', region: 'Latin America', tier: 2 },
  { name: 'Panama City', country: 'Panama', region: 'Latin America', tier: 1 },
  { name: 'San José', country: 'Costa Rica', region: 'Latin America', tier: 2 },
  { name: 'Montevideo', country: 'Uruguay', region: 'Latin America', tier: 2 },
  
  // Middle East & Africa
  { name: 'Dubai', country: 'UAE', region: 'Middle East', tier: 1 },
  { name: 'Abu Dhabi', country: 'UAE', region: 'Middle East', tier: 1 },
  { name: 'Doha', country: 'Qatar', region: 'Middle East', tier: 1 },
  { name: 'Kuwait City', country: 'Kuwait', region: 'Middle East', tier: 1 },
  { name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', tier: 1 },
  { name: 'Jeddah', country: 'Saudi Arabia', region: 'Middle East', tier: 1 },
  { name: 'Cairo', country: 'Egypt', region: 'Africa', tier: 1 },
  { name: 'Lagos', country: 'Nigeria', region: 'Africa', tier: 1 },
  { name: 'Nairobi', country: 'Kenya', region: 'Africa', tier: 1 },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', tier: 1 },
  { name: 'Johannesburg', country: 'South Africa', region: 'Africa', tier: 1 },
  { name: 'Casablanca', country: 'Morocco', region: 'Africa', tier: 1 },
  { name: 'Tunis', country: 'Tunisia', region: 'Africa', tier: 2 },
  { name: 'Accra', country: 'Ghana', region: 'Africa', tier: 2 },
  { name: 'Addis Ababa', country: 'Ethiopia', region: 'Africa', tier: 2 },
]

export function CreateFlightGroupForm({ onSuccess }: CreateFlightGroupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCustomCity, setShowCustomCity] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const form = useForm<FlightGroupForm>({
    resolver: zodResolver(flightGroupSchema),
    defaultValues: {
      departureCity: '',
    },
  })

  // Filter and sort cities based on search term
  const filteredCities = useMemo(() => {
    if (!searchTerm) return []
    
    const term = searchTerm.toLowerCase()
    const filtered = COMPREHENSIVE_CITIES.filter(city => 
      city.name.toLowerCase().includes(term) ||
      city.country.toLowerCase().includes(term) ||
      city.region.toLowerCase().includes(term)
    )
    
    // Sort by relevance: exact matches first, then tier 1, then alphabetical
    return filtered.sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(term)
      const bExact = b.name.toLowerCase().startsWith(term)
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      if (a.tier !== b.tier) return a.tier - b.tier
      return a.name.localeCompare(b.name)
    }).slice(0, 10) // Limit to 10 results for performance
  }, [searchTerm])

  const handleCitySelect = (cityName: string) => {
    form.setValue('departureCity', cityName)
    setSearchTerm(cityName)
    setIsDropdownOpen(false)
    setShowCustomCity(false)
  }

  const handleCustomCityToggle = () => {
    setShowCustomCity(!showCustomCity)
    if (!showCustomCity) {
      setSearchTerm('')
      form.setValue('departureCity', '')
    }
  }

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
            
            {/* Search Input with Dropdown */}
            <div className="relative">
              <Input
                id="departureCity"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setIsDropdownOpen(true)
                  form.setValue('departureCity', e.target.value)
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder={showCustomCity ? "Enter your city name..." : "Search for your departure city..."}
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
              
              {/* Dropdown Results */}
              {isDropdownOpen && filteredCities.length > 0 && !showCustomCity && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredCities.map((city, index) => (
                    <button
                      key={`${city.name}-${city.country}`}
                      type="button"
                      onClick={() => handleCitySelect(city.name)}
                      className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{city.name}</div>
                        <div className="text-sm text-gray-600">{city.country} • {city.region}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {city.hasDirectSF && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Direct SF</span>
                        )}
                        {city.tier === 1 && (
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Major Hub</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Toggle for Custom City */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {showCustomCity ? 'Entering custom city' : `${COMPREHENSIVE_CITIES.length}+ cities available`}
              </p>
              <button
                type="button"
                onClick={handleCustomCityToggle}
                className="text-xs text-orange-600 hover:text-orange-700 underline"
              >
                {showCustomCity ? '← Back to search' : "Can't find your city? Add it"}
              </button>
            </div>

            {form.formState.errors.departureCity && (
              <p className="text-sm text-red-600">{form.formState.errors.departureCity.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Popular Cities Quick Select */}
          {!showCustomCity && searchTerm.length < 2 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-800 mb-2">🌟 Popular Departure Cities:</h4>
              <div className="flex flex-wrap gap-2">
                {['New York City', 'London', 'Toronto', 'Berlin', 'Tokyo', 'Singapore', 'Mumbai', 'São Paulo'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
            <h4 className="font-medium text-orange-800 mb-2">📋 What happens next:</h4>
            <div className="text-sm text-orange-700 space-y-1">
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