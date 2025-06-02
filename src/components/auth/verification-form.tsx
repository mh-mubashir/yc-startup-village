'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verificationSchema, type VerificationForm } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface VerificationResult {
  score: number
  passed: boolean
  reasoning: string
  accessCode?: string
  riskLevel: string
  error?: string
}

export function VerificationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const router = useRouter()

  const form = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      afterpartyHost: '',
      afterpartyCount: '',
      parkingInfo: '',
      weatherRange: '',
      hotelDiscount: '',
      ticketTiming: '',
      email: '',
      linkedinUrl: '',
    },
  })

  const onSubmit = async (data: VerificationForm) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/verify-attendee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      setResult(result)

      if (result.passed && !result.error) {
        // Show success for 4 seconds, then redirect
        setTimeout(() => {
          router.push('/login')
        }, 5000)
      }
    } catch (error) {
      console.error('Verification error:', error)
      setResult({
        score: 0,
        passed: false,
        reasoning: 'Network error occurred. Please check your connection and try again.',
        riskLevel: 'high'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Show results if verification completed
  if (result) {
    return (
      <Card className="w-full max-w-md mx-auto border border-orange-200">
        <CardHeader>
          <CardTitle className={`text-center ${result.passed && !result.error ? 'text-green-600' : 'text-red-600'}`}>
            {result.passed && !result.error ? '✅ Verification Passed!' : '❌ Verification Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {result.error ? 'Account Issue' : `Score: ${result.score}/100 points`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              {result.reasoning}
            </p>
            
            {result.passed && !result.error ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-center space-y-3">
                  <div className="text-green-800">
                    <h3 className="font-semibold">🎉 Welcome to YC Startup Village!</h3>
                    <p className="text-sm mt-1">Your access code has been generated:</p>
                  </div>
                  
                  <div className="bg-white border-2 border-green-300 rounded-lg p-3">
                    <code className="text-lg font-bold text-green-700 tracking-wider">
                      {result.accessCode}
                    </code>
                  </div>
                  
                  <div className="text-sm text-green-700">
                    <p className="font-medium">📧 Important:</p>
                    <p>Save this code! You'll need it to login.</p>
                    <p className="text-xs mt-1">
                      (In production, this would be emailed to you)
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      Redirecting to login page in a few seconds...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-center space-y-3">
                  <div className="text-red-800">
                    <h3 className="font-semibold">
                      {result.error ? '⚠️ Account Issue' : '📚 Study Up!'}
                    </h3>
                    <p className="text-sm mt-1">
                      {result.error || 'Double-check your YC event materials for the correct information.'}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => setResult(null)} 
                    variant="outline" 
                    className="w-full border-red-300 text-red-700 hover:bg-red-50"
                  >
                    🔄 Try Again
                  </Button>
                  
                  <div className="text-xs text-gray-500">
                    <p>
                      {result.error 
                        ? 'Make sure to use unique email and LinkedIn profile'
                        : 'Tip: All answers should be found in your YC AI Startup School event details'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show verification form
  return (
    <Card className="w-full max-w-lg mx-auto border border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700">🔐 Attendee Verification</CardTitle>
        <CardDescription>
          Answer these questions that only YC AI Startup School attendees would know
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* LinkedIn Profile */}
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">Your LinkedIn Profile URL *</Label>
            <Input
              id="linkedinUrl"
              {...form.register('linkedinUrl')}
              placeholder="https://www.linkedin.com/in/your-username"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500">
              Format: https://www.linkedin.com/in/your-username (helps prevent duplicate accounts)
            </p>
            {form.formState.errors.linkedinUrl && (
              <p className="text-sm text-red-600">{form.formState.errors.linkedinUrl.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Your email (for access code delivery) *</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="john@example.com"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500">
              Must be unique - one account per person
            </p>
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">YC Event Questions</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="afterpartyHost">Who is hosting the hackathon after party on day 1? *</Label>
            <Input
              id="afterpartyHost"
              {...form.register('afterpartyHost')}
              placeholder="Enter the host/company name..."
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.afterpartyHost && (
              <p className="text-sm text-red-600">{form.formState.errors.afterpartyHost.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="afterpartyCount">How many after party options are available on the first day? *</Label>
            <Input
              id="afterpartyCount"
              {...form.register('afterpartyCount')}
              placeholder="Enter the number..."
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.afterpartyCount && (
              <p className="text-sm text-red-600">{form.formState.errors.afterpartyCount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parkingInfo">Is parking available at the venue according to YC event info? *</Label>
            <Input
              id="parkingInfo"
              {...form.register('parkingInfo')}
              placeholder="Yes or No"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.parkingInfo && (
              <p className="text-sm text-red-600">{form.formState.errors.parkingInfo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weatherRange">What temperature range does YC mention for SF weather during the event? *</Label>
            <Input
              id="weatherRange"
              {...form.register('weatherRange')}
              placeholder="e.g., 40-65°F or similar format"
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.weatherRange && (
              <p className="text-sm text-red-600">{form.formState.errors.weatherRange.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="hotelDiscount">What is the YC discount code for hotels? *</Label>
            <Input
              id="hotelDiscount"
              {...form.register('hotelDiscount')}
              placeholder="Enter the discount code..."
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.hotelDiscount && (
              <p className="text-sm text-red-600">{form.formState.errors.hotelDiscount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ticketTiming">When will YC provide the event tickets/access passes? *</Label>
            <Input
              id="ticketTiming"
              {...form.register('ticketTiming')}
              placeholder="e.g., 1 week before, 1 day after, etc."
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
            {form.formState.errors.ticketTiming && (
              <p className="text-sm text-red-600">{form.formState.errors.ticketTiming.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : '🔍 Verify My Attendance'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
