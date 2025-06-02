'use client'

import React, { useState, useEffect, useMemo } from 'react'

interface City {
  id: string
  city_name: string
  country: string
  region: string
  tier: number
  has_direct_sf: boolean
  usage_count: number
  is_user_submitted: boolean
}

interface CitySelectProps {
  value: string
  onChange: (city: string) => void
  onCitySubmit?: (city: { city_name: string, country: string, region?: string }) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function CitySelect({ 
  value, 
  onChange, 
  onCitySubmit, 
  placeholder = "Search for your city...",
  disabled = false,
  className = ""
}: CitySelectProps) {
  const [searchTerm, setSearchTerm] = useState(value)
  const [cities, setCities] = useState<City[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [submissionData, setSubmissionData] = useState({
    city_name: '',
    country: '',
    region: ''
  })
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Fetch cities based on search
  useEffect(() => {
    if (searchTerm.length >= 2) {
      fetchCities(searchTerm)
    } else {
      setCities([])
    }
  }, [searchTerm])

  const fetchCities = async (search: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/cities?search=${encodeURIComponent(search)}&limit=10`)
      const result = await response.json()
      
      if (response.ok) {
        setCities(result.cities || [])
      }
    } catch (error) {
      console.error('Error fetching cities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCitySelect = (cityName: string) => {
    setSearchTerm(cityName)
    onChange(cityName)
    setIsDropdownOpen(false)
    
    // Update usage count
    updateCityUsage(cityName)
  }

  const updateCityUsage = async (cityName: string) => {
    try {
      await fetch('/api/cities/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city_name: cityName })
      })
    } catch (error) {
      console.error('Error updating city usage:', error)
    }
  }

  const handleSubmission = async () => {
    if (!submissionData.city_name || !submissionData.country) {
      return
    }

    setSubmissionStatus('submitting')
    
    try {
      const accessCode = localStorage.getItem('accessCode')
      const response = await fetch('/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode!
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmissionStatus('success')
        setShowSubmissionForm(false)
        setSubmissionData({ city_name: '', country: '', region: '' })
        
        // Use the submitted city name immediately
        setSearchTerm(submissionData.city_name)
        onChange(submissionData.city_name)
        
        if (onCitySubmit) {
          onCitySubmit(submissionData)
        }
      } else {
        setSubmissionStatus('error')
      }
    } catch (error) {
      console.error('City submission error:', error)
      setSubmissionStatus('error')
    }
  }

  const filteredCities = useMemo(() => {
    return cities.sort((a, b) => {
      // Prioritize: exact matches → tier 1 → usage count → alphabetical
      const aExact = a.city_name.toLowerCase().startsWith(searchTerm.toLowerCase())
      const bExact = b.city_name.toLowerCase().startsWith(searchTerm.toLowerCase())
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      if (a.tier !== b.tier) return a.tier - b.tier
      if (a.usage_count !== b.usage_count) return b.usage_count - a.usage_count
      return a.city_name.localeCompare(b.city_name)
    })
  }, [cities, searchTerm])

  return (
    <div className="relative">
      {/* Main Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsDropdownOpen(true)
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500 focus:outline-none ${className}`}
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isDropdownOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.length > 0 ? (
            <>
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleCitySelect(city.city_name)}
                  className="w-full px-4 py-3 text-left hover:bg-orange-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{city.city_name}</div>
                    <div className="text-sm text-gray-600">{city.country} • {city.region}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {city.has_direct_sf && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Direct SF</span>
                    )}
                    {city.tier === 1 && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Major Hub</span>
                    )}
                    {city.is_user_submitted && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Community Added</span>
                    )}
                  </div>
                </button>
              ))}
            </>
          ) : searchTerm.length >= 2 && !isLoading ? (
            <div className="px-4 py-6 text-center">
              <div className="text-gray-500 mb-3">City not found</div>
              <button
                type="button"
                onClick={() => {
                  setShowSubmissionForm(true)
                  setSubmissionData({ ...submissionData, city_name: searchTerm })
                  setIsDropdownOpen(false)
                }}
                className="text-orange-600 hover:text-orange-700 text-sm underline"
              >
                + Add "{searchTerm}" to our database
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* City Submission Form */}
      {showSubmissionForm && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Add New City</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="City name"
              value={submissionData.city_name}
              onChange={(e) => setSubmissionData({ ...submissionData, city_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Country"
              value={submissionData.country}
              onChange={(e) => setSubmissionData({ ...submissionData, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Region (optional)"
              value={submissionData.region}
              onChange={(e) => setSubmissionData({ ...submissionData, region: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
            />
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleSubmission}
                disabled={submissionStatus === 'submitting' || !submissionData.city_name || !submissionData.country}
                className="flex-1 bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit for Approval'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmissionForm(false)
                  setSubmissionStatus('idle')
                }}
                className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
            {submissionStatus === 'success' && (
              <p className="text-green-600 text-xs">City submitted successfully! It will be reviewed within 24-48 hours.</p>
            )}
            {submissionStatus === 'error' && (
              <p className="text-red-600 text-xs">Failed to submit city. Please try again.</p>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {(isDropdownOpen || showSubmissionForm) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsDropdownOpen(false)
            setShowSubmissionForm(false)
            setSubmissionStatus('idle')
          }}
        />
      )}
    </div>
  )
}