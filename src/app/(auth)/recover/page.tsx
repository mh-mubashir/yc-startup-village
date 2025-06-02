'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const recoverySchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type RecoveryForm = z.infer<typeof recoverySchema>

export default function RecoverPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<RecoveryForm>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: RecoveryForm) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/recover-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Recovery failed')
        return
      }

      setSuccess(true)
    } catch (error) {
      console.error('Recovery error:', error)
      setError('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="border border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600 text-center">✅ Recovery Email Sent!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">📧</div>
                
                <div className="space-y-3">
                  <p className="text-gray-700 font-medium">
                    We've sent your access code to your email address.
                  </p>
                  <p className="text-sm text-gray-600">
                    Check your inbox for an email from YC Startup Village with your access code.
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm text-green-700 space-y-2">
                    <p><strong>What to do next:</strong></p>
                    <p>1. Check your email inbox (and spam folder)</p>
                    <p>2. Copy your access code from the email</p>
                    <p>3. Use it to login to YC Startup Village</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button 
                    onClick={() => window.location.href = '/login'}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Go to Login Page
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                </div>

                <div className="text-xs text-gray-500 pt-2">
                  <p>Didn't receive the email? Check your spam folder or try again in a few minutes.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-orange-600">
            Recover Access Code
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive your access code
          </p>
        </div>
        
        <Card className="w-full max-w-md mx-auto border border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-700">🔑 Lost Your Access Code?</CardTitle>
            <CardDescription>
              No worries! Enter your email address and we'll send you your access code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="john@example.com"
                  disabled={isLoading}
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500">
                  Enter the same email you used when getting verified for YC Startup Village
                </p>
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                <h4 className="font-medium text-orange-800 mb-2">📧 How it works:</h4>
                <div className="text-sm text-orange-700 space-y-1">
                  <p>1. Enter the email you used during verification</p>
                  <p>2. We'll check if you have an account with that email</p>
                  <p>3. If found, we'll email you your access code instantly</p>
                  <p>4. Use the code to login and access the platform</p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending Recovery Email...' : '📤 Send My Access Code'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-500">Remember your code?</p>
              <div className="space-y-1">
                <a 
                  href="/login" 
                  className="block text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  Login with Access Code →
                </a>
                <a 
                  href="/verify" 
                  className="block text-gray-500 hover:text-gray-700 text-sm"
                >
                  Don't have an account? Get verified
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Community disclaimer */}
        <div className="text-center">
          <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
            <p className="text-xs text-orange-700">
              <strong>Community Project:</strong> Built by fellow attendees, not officially affiliated with Y Combinator
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
