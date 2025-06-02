'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInForm } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      accessCode: '',
    },
  })

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Login failed')
        return
      }

      if (result.success) {
        // Store user session with proper LinkedIn URL
        localStorage.setItem('accessCode', data.accessCode)
        localStorage.setItem('userEmail', result.user.email)
        localStorage.setItem('userLinkedIn', result.user.linkedinUrl || '') // Fix this line
        
        console.log('Storing LinkedIn URL:', result.user.linkedinUrl) // Debug log
        
        // Redirect to dashboard
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700 text-center">🔑 Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Enter your access code to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input
              id="accessCode"
              {...form.register('accessCode')}
              placeholder="YC25-XXXXXX"
              className="text-center font-mono tracking-wider focus:border-orange-500 focus:ring-orange-500"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 text-center">
              Enter the code you received after verification
            </p>
            {form.formState.errors.accessCode && (
              <p className="text-sm text-red-600 text-center">{form.formState.errors.accessCode.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : '🚀 Access Platform'}
          </Button>

          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-gray-500">Need help?</p>
            <div className="space-y-1">
              <a 
                href="/verify" 
                className="block text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                Don't have a code? Get verified →
              </a>
              <a 
                href="/recover" 
                className="block text-red-600 hover:text-gray-700 text-sm"
              >
                Lost your code? DW We'll resend it to you!
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
