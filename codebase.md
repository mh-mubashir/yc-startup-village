# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# eslint.config.mjs

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

# next

```

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

# package.json

```json
{
  "name": "yc-hotel-sharing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.49.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.511.0",
    "next": "15.3.2",
    "openai": "^4.103.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.4",
    "resend": "^4.5.1",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.3.0",
    "zod": "^3.25.32"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "15.3.2",
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}

```

# postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# postcss.config.mjs

```mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;

```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src/app/(auth)/login/page.tsx

```tsx
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-orange-600">
            YC Startup Village
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to the community platform
          </p>
        </div>
        
        <LoginForm />
        
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
          <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

```

# src/app/(auth)/recover/page.tsx

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
          <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

```

# src/app/(auth)/sign-up/page.tsx

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            YC Startup Village
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect with fellow YC attendees for accommodation sharing
          </p>
          
          {/* Disclaimer */}
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-md p-3">
            <p className="text-xs text-orange-800">
              <strong>Independent Project:</strong> Not affiliated with Y Combinator. 
              Created by fellow developers to help attendees find accommodation.
            </p>
          </div>
        </div>
        
        <Card className="w-full max-w-md mx-auto border border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-700">Complete Your Profile</CardTitle>
            <CardDescription>
              Set up your profile to start connecting with other attendees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessCode">Your Access Code</Label>
                <Input
                  id="accessCode"
                  name="accessCode"
                  placeholder="YC-XXXX-YYYY"
                  className="font-mono focus:border-orange-500 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-500">
                  Enter the code sent to your email after verification
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">I plan to</Label>
                <Select 
                  id="userType" 
                  name="userType"
                  className="focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="seeker">Find accommodation</option>
                  <option value="host">Offer accommodation</option>
                  <option value="both">Both find and offer</option>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                Complete Profile
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Don't have a code? <a href="/verify" className="text-orange-600 underline hover:text-orange-700">Get verified first</a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Safety reminder */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            <strong>Safety First:</strong> Always meet in public places and trust your instincts 
            when arranging accommodation with fellow attendees.
          </p>
        </div>
      </div>
    </div>
  )
}

```

# src/app/(auth)/verify/page.tsx

```tsx
import { VerificationForm } from '@/components/auth/verification-form'

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-orange-600">
            YC Startup Village
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Exclusive verification for YC AI Startup School attendees
          </p>
          
          {/* Important disclaimer */}
          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-md p-3">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-orange-600">⚠️</span>
              </div>
              <div className="ml-2">
                <p className="text-xs text-orange-800">
                  <strong>Community Project:</strong> This platform is NOT officially affiliated with Y Combinator. 
                  Built by fellow attendees to help with accommodation sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <VerificationForm />
        
        {/* Help section */}
        <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
          <h3 className="font-medium text-orange-800 mb-2 flex items-center">
            <span className="mr-2">🛡️</span>
            Why These Questions?
          </h3>
          <div className="text-sm text-orange-700 space-y-1">
            <p>• These details are only shared with registered YC attendees</p>
            <p>• LinkedIn profiles help prevent duplicate accounts</p>
            <p>• Helps us ensure platform exclusivity and safety</p>
            <p>• Protects against fake accounts and spam</p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <a href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

```

# src/app/(dashboard)/accommodations/[id]/contact/page.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
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

export default function ContactRequestPage({ params }: { params: { id: string } }) {
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

    // Fetch accommodation details
    fetchAccommodation()
  }, [params.id, router])

  const fetchAccommodation = async () => {
    try {
      const response = await fetch(`/api/accommodations/${params.id}`)
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
          accommodationId: params.id,
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
                      Introduce yourself and explain why you're interested in this accommodation
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

```

# src/app/(dashboard)/accommodations/page.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

interface Accommodation {
  id: string
  host_id: string
  title: string
  description: string
  address: string
  price_per_night: number
  max_guests: number
  available_spots: number
  amenities: string[]
  house_rules?: string
  available_from: string
  available_until: string
  status: string
  created_at: string
}

export default function AccommodationsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    const userEmail = localStorage.getItem('userEmail')
    const userLinkedIn = localStorage.getItem('userLinkedIn')

    if (!accessCode || !userEmail) {
      router.push('/login')
      return
    }

    setUser({
      email: userEmail,
      linkedinUrl: userLinkedIn || '',
      accessCode
    })

    // Fetch accommodations
    fetchAccommodations()
  }, [router])

  const fetchAccommodations = async () => {
    try {
      const response = await fetch('/api/accommodations')
      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to fetch accommodations')
        return
      }

      setAccommodations(result.listings || [])
    } catch (error) {
      console.error('Error fetching accommodations:', error)
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleContactRequest = (accommodationId: string) => {
    // We'll implement this next
    router.push(`/accommodations/${accommodationId}/contact`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">YC Startup Village</h1>
                <p className="text-sm text-gray-600">Browse available accommodations</p>
              </div>
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading accommodations...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">YC Startup Village</h1>
              <p className="text-sm text-gray-600">Browse available accommodations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Dashboard
              </Button>
              <Button onClick={() => router.push('/dashboard')} variant="ghost" size="sm">
                Create Listing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🏠 Available Accommodations
          </h2>
          <p className="text-gray-600">
            {accommodations.length} listings available from verified YC attendees
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Accommodations Grid */}
        {accommodations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No accommodations available yet</h3>
            <p className="text-gray-600 mb-6">Be the first to create a listing and help fellow attendees!</p>
            <Button 
              onClick={() => router.push('/dashboard')} 
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create First Listing
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.map((accommodation) => (
              <Card key={accommodation.id} className="border border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">
                        {accommodation.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mb-3">
                        📍 {accommodation.address}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {accommodation.available_spots} spots
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {accommodation.description}
                    </p>

                    {/* Key Details */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                          👥 Max {accommodation.max_guests} guests
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-orange-600">
                          ${accommodation.price_per_night}
                        </span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">
                        📅 Available: {formatDate(accommodation.available_from)} - {formatDate(accommodation.available_until)}
                      </div>
                    </div>

                    {/* Amenities */}
                    {accommodation.amenities && accommodation.amenities.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Amenities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {accommodation.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{accommodation.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* House Rules */}
                    {accommodation.house_rules && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">House Rules:</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {accommodation.house_rules}
                        </p>
                      </div>
                    )}

                    {/* Contact Button */}
                    <Button 
                      onClick={() => handleContactRequest(accommodation.id)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="sm"
                    >
                      📱 Request Contact Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
            💡 How to Connect with Hosts
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            <p>1. <strong>Click "Request Contact Info"</strong> on any listing that interests you</p>
            <p>2. <strong>Write a brief message</strong> introducing yourself and your accommodation needs</p>
            <p>3. <strong>Share your phone number</strong> so the host can contact you back</p>
            <p>4. <strong>Wait for approval</strong> - hosts will review your request and decide whether to share their contact info</p>
            <p>5. <strong>Connect directly</strong> - once approved, you'll get their phone number to coordinate details</p>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/(dashboard)/dashboard/page.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreateListingForm } from '@/components/accommodations/create-listing-form'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateListing, setShowCreateListing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    const userEmail = localStorage.getItem('userEmail')
    const userLinkedIn = localStorage.getItem('userLinkedIn')

    console.log('Dashboard - Retrieved LinkedIn URL:', userLinkedIn) // Debug log

    if (!accessCode || !userEmail) {
      router.push('/login')
      return
    }

    setUser({
      email: userEmail,
      linkedinUrl: userLinkedIn || '',
      accessCode
    })
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('accessCode')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userLinkedIn')
    router.push('/')
  }

  const handleListingCreated = () => {
    setShowCreateListing(false)
    alert('🎉 Listing created successfully! Other attendees can now find and contact you.')
  }

  const openLinkedInProfile = (url: string) => {
    console.log('Opening LinkedIn URL:', url) // Debug log
    
    if (!url || url === 'undefined' || url === '') {
      alert('LinkedIn profile not available. Please contact support.')
      return
    }
    
    // Ensure the URL is properly formatted
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    
    console.log('Final LinkedIn URL:', linkedinUrl) // Debug log
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">YC Startup Village</h1>
              <p className="text-sm text-gray-600">Welcome back to the community!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => router.push('/accommodations')}
                variant="outline" 
                size="sm"
              >
                Browse Listings
              </Button>
              <Button 
                onClick={() => router.push('/host')}
                variant="outline" 
                size="sm"
              >
                Host Dashboard
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!showCreateListing ? (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎉 Welcome to YC Startup Village!
              </h2>
              <p className="text-gray-600">
                You're now connected with the exclusive community of YC AI Startup School attendees.
              </p>
            </div>

            {/* Main Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Profile Card */}
              <Card className="border border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center">
                    👤 Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email:</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">LinkedIn:</p>
                      {user.linkedinUrl && user.linkedinUrl !== '' ? (
                        <Button
                          onClick={() => openLinkedInProfile(user.linkedinUrl)}
                          variant="outline"
                          size="sm"
                          className="text-orange-600 border-orange-300 hover:bg-orange-50 mt-1"
                        >
                          🔗 View Your Profile
                        </Button>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">Not available</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">Access Code:</p>
                      <code className="text-xs bg-orange-100 px-2 py-1 rounded font-mono block mt-1">
                        {user.accessCode}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accommodation Features */}
              <Card className="border border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center">
                    🏠 Find Housing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Browse available accommodations from fellow YC attendees.
                  </p>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => router.push('/accommodations')}
                  >
                    Browse Listings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center">
                    🤝 Offer Space
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    List your extra space and connect with fellow founders.
                  </p>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setShowCreateListing(true)}
                  >
                    Create Listing
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* NEW: Buddy Matching Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🤝 Connect & Coordinate</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center">
                      ✈️ Flight Buddies
                    </CardTitle>
                    <CardDescription>
                      Find travel companions flying from your city
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Connect with fellow attendees flying from the same departure city. Coordinate flights, share rides, and travel together!
                      </p>
                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        onClick={() => router.push('/flight-buddies')}
                      >
                        🛫 Find Flight Buddies
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center">
                      📅 Date Groups
                    </CardTitle>
                    <CardDescription>
                      Connect with people staying the same dates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Find attendees with matching stay dates. Perfect for group activities, shared experiences, and networking!
                      </p>
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600"
                        onClick={() => router.push('/date-groups')}
                      >
                        📅 Join Date Groups
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Host Management */}
            <div className="mb-8">
              <Card className="border border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700 flex items-center">
                    🎯 Host Dashboard
                  </CardTitle>
                  <CardDescription>
                    Manage your accommodation listings and contact requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      View and manage contact requests from guests interested in your listings.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => router.push('/host')}
                    >
                      Manage Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How It Works */}
            <Card className="border border-orange-200 mb-8">
              <CardHeader>
                <CardTitle className="text-orange-700">📞 How Our Platform Works</CardTitle>
                <CardDescription>Four ways to connect with fellow YC attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🏠 Accommodation Sharing:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Create listings for extra space you have</p>
                      <p>• Browse available accommodations</p>
                      <p>• Send contact requests to hosts</p>
                      <p>• Exchange contact info when approved</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">✈️ Travel Coordination:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Join flight groups from your departure city</p>
                      <p>• Share flight details and coordinate travel</p>
                      <p>• Find travel companions and split costs</p>
                      <p>• Connect via WhatsApp, email, or LinkedIn</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                🛡️ Safety Reminder
              </h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p>• Always meet potential roommates/travel buddies in public places first</p>
                <p>• Trust your instincts and prioritize your safety</p>
                <p>• Verify identity through video calls before committing to accommodation</p>
                <p>• Your contact info is only shared when you approve requests</p>
                <p>• Report any suspicious behavior to our community team</p>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Button 
                onClick={() => setShowCreateListing(false)}
                variant="outline"
                className="mb-4"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <CreateListingForm onSuccess={handleListingCreated} />
          </div>
        )}
      </div>
    </div>
  )
}

```

# src/app/(dashboard)/date-groups/page.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CreateDateGroupForm } from '@/components/buddy-matching/create-date-group-form'
import { JoinDateGroupForm } from '@/components/buddy-matching/join-date-group-form'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

interface DateGroup {
  id: string
  start_date: string
  end_date: string
  creator_id: string
  created_at: string
  creator: {
    email: string
    linkedin_url: string
  }
  date_participants: Array<{
    id: string
    user_id: string
    notes?: string
    show_phone: boolean
    show_email: boolean
    show_linkedin: boolean
    user: {
      email: string
      linkedin_url: string
      phone?: string
    }
  }>
}

export default function DateGroupsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([])
  const [filteredGroups, setFilteredGroups] = useState<DateGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<DateGroup | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    const userEmail = localStorage.getItem('userEmail')
    const userLinkedIn = localStorage.getItem('userLinkedIn')

    if (!accessCode || !userEmail) {
      router.push('/login')
      return
    }

    setUser({
      email: userEmail,
      linkedinUrl: userLinkedIn || '',
      accessCode
    })

    fetchDateGroups()
  }, [router])

  useEffect(() => {
    // Filter groups based on search term
    const filtered = dateGroups.filter(group => {
      const dateRange = `${formatDate(group.start_date)} - ${formatDate(group.end_date)}`
      return dateRange.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredGroups(filtered)
  }, [dateGroups, searchTerm])

  const fetchDateGroups = async () => {
    try {
      const response = await fetch('/api/date-groups')
      const result = await response.json()

      if (response.ok) {
        setDateGroups(result.groups || [])
      }
    } catch (error) {
      console.error('Error fetching date groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGroupCreated = () => {
    setShowCreateForm(false)
    fetchDateGroups()
  }

  const handleJoinSuccess = () => {
    setSelectedGroup(null)
    fetchDateGroups()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const openLinkedInProfile = (url: string) => {
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const isUserInGroup = (group: DateGroup) => {
    return group.date_participants.some(p => p.user.email === user?.email)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading date groups...</p>
        </div>
      </div>
    )
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Create Date Group</h1>
                <p className="text-sm text-gray-600">Start a group for your stay dates</p>
              </div>
              <Button onClick={() => setShowCreateForm(false)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <CreateDateGroupForm onSuccess={handleGroupCreated} />
        </div>
      </div>
    )
  }

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Join Date Group</h1>
                <p className="text-sm text-gray-600">
                  {formatDate(selectedGroup.start_date)} - {formatDate(selectedGroup.end_date)}
                </p>
              </div>
              <Button onClick={() => setSelectedGroup(null)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <JoinDateGroupForm 
            group={selectedGroup} 
            onSuccess={handleJoinSuccess} 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">📅 Date Groups</h1>
              <p className="text-sm text-gray-600">Connect with attendees staying the same dates</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Create */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by date range..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-orange-500 hover:bg-orange-600 ml-4"
          >
            📅 Create Date Group
          </Button>
        </div>

        {/* Date Groups */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No groups found' : 'No date groups yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No date groups found matching "${searchTerm}"`
                : 'Be the first to create a date group for your stay dates!'
              }
            </p>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create First Date Group
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="border border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        📅 {formatDate(group.start_date)} - {formatDate(group.end_date)}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        Stay dates in San Francisco
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {group.date_participants.length} member{group.date_participants.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Group Creator */}
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Created by:</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-600">{group.creator.email.split('@')[0]}</span>
                        <Button
                          onClick={() => openLinkedInProfile(group.creator.linkedin_url)}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-orange-600 hover:text-orange-700 p-1 h-auto"
                        >
                          🔗 LinkedIn
                        </Button>
                      </div>
                    </div>

                    {/* Participants Preview */}
                    {group.date_participants.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Recent Members:</h4>
                        <div className="space-y-1">
                          {group.date_participants.slice(0, 3).map((participant) => (
                            <div key={participant.id} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span>{participant.user.email.split('@')[0]}</span>
                                <span className="text-orange-600">
                                  {participant.notes ? '💬' : '👤'}
                                </span>
                              </div>
                            </div>
                          ))}
                          {group.date_participants.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{group.date_participants.length - 3} more members
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Join/View Button */}
                    <div className="pt-2">
                      {isUserInGroup(group) ? (
                        <Button 
                          className="w-full bg-green-100 text-green-800 hover:bg-green-200"
                          variant="outline"
                        >
                          ✅ You're in this group
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => setSelectedGroup(group)}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          🤝 Join Group
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
            📅 How Date Groups Work
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            <p>• <strong>Create a group</strong> for your exact stay dates if one doesn't exist</p>
            <p>• <strong>Join existing groups</strong> with matching stay dates</p>
            <p>• <strong>Connect with others</strong> staying the same time as you</p>
            <p>• <strong>Plan activities</strong> and explore SF together</p>
            <p>• <strong>Share contact info</strong> via phone, email, or LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/(dashboard)/flight-buddies/page.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CreateFlightGroupForm } from '@/components/buddy-matching/create-flight-group-form'
import { JoinFlightGroupForm } from '@/components/buddy-matching/join-flight-group-form'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

interface FlightGroup {
  id: string
  departure_city: string
  creator_id: string
  created_at: string
  creator: {
    email: string
    linkedin_url: string
  }
  flight_participants: Array<{
    id: string
    user_id: string
    flight_date?: string
    flight_time?: string
    airline?: string
    notes?: string
    show_phone: boolean
    show_email: boolean
    show_linkedin: boolean
    user: {
      email: string
      linkedin_url: string
      phone?: string
    }
  }>
}

export default function FlightBuddiesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [flightGroups, setFlightGroups] = useState<FlightGroup[]>([])
  const [filteredGroups, setFilteredGroups] = useState<FlightGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<FlightGroup | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    const userEmail = localStorage.getItem('userEmail')
    const userLinkedIn = localStorage.getItem('userLinkedIn')

    if (!accessCode || !userEmail) {
      router.push('/login')
      return
    }

    setUser({
      email: userEmail,
      linkedinUrl: userLinkedIn || '',
      accessCode
    })

    fetchFlightGroups()
  }, [router])

  useEffect(() => {
    // Filter groups based on search term
    const filtered = flightGroups.filter(group =>
      group.departure_city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredGroups(filtered)
  }, [flightGroups, searchTerm])

  const fetchFlightGroups = async () => {
    try {
      const response = await fetch('/api/flight-groups')
      const result = await response.json()

      if (response.ok) {
        setFlightGroups(result.groups || [])
      }
    } catch (error) {
      console.error('Error fetching flight groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGroupCreated = () => {
    setShowCreateForm(false)
    fetchFlightGroups()
  }

  const handleJoinSuccess = () => {
    setSelectedGroup(null)
    fetchFlightGroups()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const openLinkedInProfile = (url: string) => {
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const isUserInGroup = (group: FlightGroup) => {
    return group.flight_participants.some(p => p.user.email === user?.email)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flight groups...</p>
        </div>
      </div>
    )
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Create Flight Group</h1>
                <p className="text-sm text-gray-600">Start a group for your departure city</p>
              </div>
              <Button onClick={() => setShowCreateForm(false)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <CreateFlightGroupForm onSuccess={handleGroupCreated} />
        </div>
      </div>
    )
  }

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Join Flight Group</h1>
                <p className="text-sm text-gray-600">{selectedGroup.departure_city} → San Francisco</p>
              </div>
              <Button onClick={() => setSelectedGroup(null)} variant="outline">
                ← Back to Groups
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <JoinFlightGroupForm 
            group={selectedGroup} 
            onSuccess={handleJoinSuccess} 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">🛫 Flight Buddies</h1>
              <p className="text-sm text-gray-600">Connect with fellow attendees flying to SF</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Create */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by departure city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-orange-500 hover:bg-orange-600 ml-4"
          >
            ✈️ Create Flight Group
          </Button>
        </div>

        {/* Flight Groups */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No groups found' : 'No flight groups yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No flight groups found for "${searchTerm}"`
                : 'Be the first to create a flight group for your departure city!'
              }
            </p>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Create First Flight Group
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="border border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        ✈️ {group.departure_city}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        → San Francisco
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {group.flight_participants.length} member{group.flight_participants.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Group Creator */}
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Created by:</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-600">{group.creator.email.split('@')[0]}</span>
                        <Button
                          onClick={() => openLinkedInProfile(group.creator.linkedin_url)}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-orange-600 hover:text-orange-700 p-1 h-auto"
                        >
                          🔗 LinkedIn
                        </Button>
                      </div>
                    </div>

                    {/* Participants Preview */}
                    {group.flight_participants.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Recent Members:</h4>
                        <div className="space-y-1">
                          {group.flight_participants.slice(0, 3).map((participant) => (
                            <div key={participant.id} className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                              <div className="flex items-center justify-between">
                                <span>{participant.user.email.split('@')[0]}</span>
                                {participant.flight_date && (
                                  <span className="text-orange-600">
                                    {formatDate(participant.flight_date)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          {group.flight_participants.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{group.flight_participants.length - 3} more members
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Join/View Button */}
                    <div className="pt-2">
                      {isUserInGroup(group) ? (
                        <Button 
                          className="w-full bg-green-100 text-green-800 hover:bg-green-200"
                          variant="outline"
                        >
                          ✅ You're in this group
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => setSelectedGroup(group)}
                          className="w-full bg-orange-500 hover:bg-orange-600"
                        >
                          🤝 Join Group
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
            ✈️ How Flight Buddies Work
          </h3>
          <div className="text-sm text-orange-700 space-y-2">
            <p>• <strong>Create a group</strong> for your departure city if one doesn't exist</p>
            <p>• <strong>Join existing groups</strong> from your departure city</p>
            <p>• <strong>Share flight details</strong> like dates, times, and airlines (optional)</p>
            <p>• <strong>Connect directly</strong> with other travelers via phone, email, or LinkedIn</p>
            <p>• <strong>Coordinate travel</strong> like shared rides to the airport or sitting together</p>
          </div>
        </div>
      </div>
    </div>
  )
}

```

# src/app/(dashboard)/host/page.tsx

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface User {
  email: string
  linkedinUrl: string
  accessCode: string
}

interface ContactRequest {
  id: string
  message: string
  sender_phone: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  accommodations: {
    title: string
    address: string
  }
  users: {
    email: string
    linkedin_url: string
  }
}

interface ContactShare {
  id: string
  host_phone: string
  guest_phone: string
  shared_at: string
  isCurrentUserHost: boolean
  accommodations: {
    title: string
    address: string
  }
  otherPerson: {
    id: string
    email: string
    linkedin_url: string
  }
  currentUser: {
    id: string
    email: string
    linkedin_url: string
  }
}

export default function HostDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [contactShares, setContactShares] = useState<ContactShare[]>([])
  const [loading, setLoading] = useState(true)
  const [processingRequest, setProcessingRequest] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const accessCode = localStorage.getItem('accessCode')
    const userEmail = localStorage.getItem('userEmail')
    const userLinkedIn = localStorage.getItem('userLinkedIn')

    if (!accessCode || !userEmail) {
      router.push('/login')
      return
    }

    setUser({
      email: userEmail,
      linkedinUrl: userLinkedIn || '',
      accessCode
    })

    fetchHostData()
  }, [router])

  const fetchHostData = async () => {
    try {
      const accessCode = localStorage.getItem('accessCode')
      
      // Fetch contact requests
      const requestsResponse = await fetch('/api/host/contact-requests', {
        headers: {
          'x-access-code': accessCode!,
        },
      })

      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json()
        setContactRequests(requestsData.requests || [])
      }

      // Fetch contact shares
      const sharesResponse = await fetch('/api/host/contact-shares', {
        headers: {
          'x-access-code': accessCode!,
        },
      })

      if (sharesResponse.ok) {
        const sharesData = await sharesResponse.json()
        console.log('Contact shares data:', sharesData.shares) // Debug log
        setContactShares(sharesData.shares || [])
      }

    } catch (error) {
      console.error('Error fetching host data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject') => {
    setProcessingRequest(requestId)

    try {
      const accessCode = localStorage.getItem('accessCode')
      const response = await fetch('/api/host/contact-requests', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode!,
        },
        body: JSON.stringify({
          requestId,
          action
        }),
      })

      if (response.ok) {
        // Refresh the data
        fetchHostData()
      } else {
        alert('Failed to process request. Please try again.')
      }

    } catch (error) {
      console.error('Error processing request:', error)
      alert('Network error occurred. Please try again.')
    } finally {
      setProcessingRequest(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const openLinkedInProfile = (url: string) => {
    // Ensure the URL is properly formatted
    let linkedinUrl = url
    if (!linkedinUrl.startsWith('http')) {
      linkedinUrl = `https://${linkedinUrl}`
    }
    console.log('Opening LinkedIn URL:', linkedinUrl) // Debug log
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
  }

  const getLinkedInUsername = (url: string) => {
    // Extract username from LinkedIn URL for display
    try {
      const match = url.match(/linkedin\.com\/in\/([^\/]+)/)
      return match ? match[1].replace(/-/g, ' ') : 'LinkedIn Profile'
    } catch {
      return 'LinkedIn Profile'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your host dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-orange-600">Host Dashboard</h1>
              <p className="text-sm text-gray-600">Manage your contact requests and connections</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.push('/accommodations')} variant="outline" size="sm">
                Browse Listings
              </Button>
              <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm">
                ← Main Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contactRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Connections</p>
                  <p className="text-2xl font-bold text-gray-900">{contactShares.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📨</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{contactRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Contact Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ⏳ Pending Contact Requests
          </h2>
          
          {contactRequests.filter(r => r.status === 'pending').length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-600">New contact requests will appear here for your review.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {contactRequests
                .filter(request => request.status === 'pending')
                .map((request) => (
                <Card key={request.id} className="border border-orange-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">
                          Request for: {request.accommodations.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          📍 {request.accommodations.address}
                        </CardDescription>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {formatDate(request.created_at)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Guest Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">👤 Guest Information</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong>Email:</strong> {request.users.email}
                          </div>
                          <div className="flex items-center justify-between">
                            <strong>LinkedIn Profile:</strong>
                            <Button
                              onClick={() => openLinkedInProfile(request.users.linkedin_url)}
                              variant="outline"
                              size="sm"
                              className="text-orange-600 border-orange-300 hover:bg-orange-50"
                            >
                              🔗 View {getLinkedInUsername(request.users.linkedin_url)}
                            </Button>
                          </div>
                          <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                            <strong>Phone Number:</strong>
                            <div className="font-mono text-lg text-blue-800 mt-1">
                              {request.sender_phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">💬 Their Message</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-gray-700 leading-relaxed">
                            "{request.message}"
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3 pt-4">
                        <Button
                          onClick={() => handleRequestAction(request.id, 'approve')}
                          disabled={processingRequest === request.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {processingRequest === request.id ? 'Processing...' : '✅ Approve & Share Contact'}
                        </Button>
                        
                        <Button
                          onClick={() => handleRequestAction(request.id, 'reject')}
                          disabled={processingRequest === request.id}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          {processingRequest === request.id ? 'Processing...' : '❌ Decline'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Active Connections - FIXED to show correct LinkedIn profiles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🤝 Active Connections
          </h2>
          
          {contactShares.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No active connections</h3>
                <p className="text-gray-600">Approved contact requests will show here with shared phone numbers and LinkedIn profiles.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {contactShares.map((share) => (
                <Card key={share.id} className="border border-green-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">
                          {share.accommodations.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          📍 {share.accommodations.address} • Connected: {formatDate(share.shared_at)}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {share.isCurrentUserHost ? 'You are Host' : 'You are Guest'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Contact Information */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-3">📱 Contact Information</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong>Their Phone:</strong>
                            <div className="font-mono text-lg text-blue-700 bg-white px-3 py-2 rounded mt-1">
                              {share.isCurrentUserHost ? share.guest_phone : share.host_phone}
                            </div>
                          </div>
                          <div>
                            <strong>Your Phone:</strong>
                            <div className="font-mono text-sm text-gray-600 bg-white px-3 py-2 rounded mt-1">
                              {share.isCurrentUserHost ? share.host_phone : share.guest_phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* LinkedIn Connection - FIXED */}
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-medium text-orange-800 mb-3">🔗 LinkedIn Connection</h4>
                        <div className="space-y-3">
                          <div>
                            <strong className="text-sm">
                              {share.isCurrentUserHost ? 'Guest' : 'Host'} Profile:
                            </strong>
                            <div className="mt-2">
                              <Button
                                onClick={() => openLinkedInProfile(share.otherPerson.linkedin_url)}
                                variant="outline"
                                size="sm"
                                className="text-orange-600 border-orange-300 hover:bg-orange-100"
                              >
                                🔗 View {getLinkedInUsername(share.otherPerson.linkedin_url)}
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {share.otherPerson.email}
                            </p>
                          </div>
                          
                          <div className="text-xs text-orange-700 bg-orange-100 rounded p-2">
                            💡 <strong>Pro tip:</strong> Connect on LinkedIn to expand your YC network and stay in touch!
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Suggestions */}
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">🎯 Next Steps</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• Call or text them directly to coordinate accommodation details</p>
                        <p>• Connect on LinkedIn to expand your professional network</p>
                        <p>• Consider meeting in person before finalizing arrangements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Request History */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📋 All Contact Requests
          </h2>
          
          {contactRequests.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">📬</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests yet</h3>
                <p className="text-gray-600">Contact requests will appear here when guests are interested in your listings.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {contactRequests.map((request) => (
                <Card key={request.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">
                            {request.accommodations.title}
                          </h4>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-600">
                            From: {request.users.email}
                          </p>
                          <Button
                            onClick={() => openLinkedInProfile(request.users.linkedin_url)}
                            variant="ghost"
                            size="sm"
                            className="text-xs text-orange-600 hover:text-orange-700 p-1 h-auto"
                          >
                            🔗 LinkedIn
                          </Button>
                          <span className="text-sm text-gray-500">
                            {formatDate(request.created_at)}
                          </span>
                        </div>
                      </div>
                      
                      {request.status === 'approved' && (
                        <div className="text-sm text-green-600 font-medium">
                          Contact shared ✓
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

```

# src/app/api/accommodations/[id]/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getAccommodationById } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accommodation = await getAccommodationById(params.id)

    if (!accommodation) {
      return NextResponse.json(
        { error: 'Accommodation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      accommodation
    })

  } catch (error) {
    console.error('Accommodation fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch accommodation' },
      { status: 500 }
    )
  }
}

```

# src/app/api/accommodations/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { createAccommodation, getAccommodationsByStatus, getUserByAccessCode, updateUser } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get user from session - the access code is sent in the request headers
    const accessCode = request.headers.get('x-access-code')
    
    console.log('Received access code:', accessCode) // Debug log
    
    if (!accessCode) {
      console.log('No access code provided in headers')
      return NextResponse.json(
        { error: 'Authentication required - no access code provided' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    console.log('Found user:', user ? 'Yes' : 'No') // Debug log
    
    if (!user) {
      console.log('User not found for access code:', accessCode)
      return NextResponse.json(
        { error: 'Invalid access code - user not found' },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      address,
      pricePerNight,
      maxGuests,
      availableSpots,
      amenities,
      houseRules,
      availableFrom,
      availableUntil,
      hostPhone
    } = body

    // Update user with phone number
    await updateUser(user.id, { phone: hostPhone })

    // Create the accommodation listing
    const listing = await createAccommodation({
      hostId: user.id,
      title,
      description,
      address,
      pricePerNight,
      maxGuests,
      availableSpots,
      amenities,
      houseRules,
      availableFrom,
      availableUntil,
      status: 'active'
    })

    console.log('Successfully created listing:', listing.id)

    return NextResponse.json({
      success: true,
      listing
    })

  } catch (error) {
    console.error('Accommodation creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create listing: ' + error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get all active listings
    const listings = await getAccommodationsByStatus('active')
    
    return NextResponse.json({
      listings
    })

  } catch (error) {
    console.error('Accommodations fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}

```

# src/app/api/contact-requests/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, getAccommodationById } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    const { accommodationId, message, phone } = body

    // Get accommodation details
    const accommodation = await getAccommodationById(accommodationId)
    if (!accommodation) {
      return NextResponse.json(
        { error: 'Accommodation not found' },
        { status: 404 }
      )
    }

    // Don't allow hosts to request contact for their own listings
    if (accommodation.host_id === user.id) {
      return NextResponse.json(
        { error: 'You cannot request contact for your own listing' },
        { status: 400 }
      )
    }

    // Check if user already has a pending request for this accommodation
    const { data: existingRequest } = await supabase
      .from('contact_requests')
      .select('id')
      .eq('from_user_id', user.id)
      .eq('listing_id', accommodationId)
      .eq('status', 'pending')
      .single()

    if (existingRequest) {
      return NextResponse.json(
        { error: 'You already have a pending request for this accommodation' },
        { status: 400 }
      )
    }

    // Create contact request
    const { data: contactRequest, error } = await supabase
      .from('contact_requests')
      .insert([{
        listing_id: accommodationId,
        from_user_id: user.id,
        to_user_id: accommodation.host_id,
        message,
        sender_phone: phone,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating contact request:', error)
      return NextResponse.json(
        { error: 'Failed to send contact request' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      contactRequest
    })

  } catch (error) {
    console.error('Contact request error:', error)
    return NextResponse.json(
      { error: 'Failed to send contact request' },
      { status: 500 }
    )
  }
}

```

# src/app/api/flight-groups/join/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, joinFlightGroup } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    const {
      group_id,
      flight_date,
      flight_time,
      airline,
      notes,
      phone,
      show_phone,
      show_email,
      show_linkedin
    } = body

    // Join the flight group
    const participant = await joinFlightGroup({
      group_id,
      user_id: user.id,
      flight_date: flight_date || null,
      flight_time: flight_time || null,
      airline: airline || null,
      notes: notes || null,
      phone,
      show_phone,
      show_email,
      show_linkedin
    })

    console.log('User joined flight group successfully:', participant)

    return NextResponse.json({
      success: true,
      participant
    })

  } catch (error) {
    console.error('Join flight group error:', error)
    return NextResponse.json(
      { error: 'Failed to join flight group' },
      { status: 500 }
    )
  }
}

```

# src/app/api/flight-groups/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, checkFlightGroupExists, createFlightGroup, getAllFlightGroups } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const groups = await getAllFlightGroups()
    
    return NextResponse.json({
      groups
    })
  } catch (error) {
    console.error('Flight groups fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch flight groups' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    const { departure_city } = body

    // Check if group already exists
    const existingGroup = await checkFlightGroupExists(departure_city)
    if (existingGroup) {
      return NextResponse.json(
        { error: `A flight group for ${departure_city} already exists. You can join the existing group instead.` },
        { status: 400 }
      )
    }

    // Create the flight group
    const group = await createFlightGroup({
      departure_city,
      creator_id: user.id
    })

    console.log('Flight group created successfully:', group)

    return NextResponse.json({
      success: true,
      group
    })

  } catch (error) {
    console.error('Flight group creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create flight group' },
      { status: 500 }
    )
  }
}

```

# src/app/api/host/contact-requests/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode, getContactRequestsForHost, updateContactRequestStatus, createContactShare } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    const requests = await getContactRequestsForHost(user.id)

    return NextResponse.json({
      requests
    })

  } catch (error) {
    console.error('Host requests fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    const { requestId, action } = body

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Get the contact request details
    const { data: contactRequest, error: fetchError } = await supabase
      .from('contact_requests')
      .select('*, accommodations(*)')
      .eq('id', requestId)
      .eq('to_user_id', user.id) // Make sure this request belongs to the host
      .single()

    if (fetchError || !contactRequest) {
      return NextResponse.json(
        { error: 'Contact request not found' },
        { status: 404 }
      )
    }

    const status = action === 'approve' ? 'approved' : 'rejected'
    const success = await updateContactRequestStatus(requestId, status)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update request status' },
        { status: 500 }
      )
    }

    // If approved, create contact share record
    if (action === 'approve') {
      const shareSuccess = await createContactShare({
        listing_id: contactRequest.listing_id,
        host_id: user.id,
        guest_id: contactRequest.from_user_id,
        host_phone: user.phone || 'Not provided',
        guest_phone: contactRequest.sender_phone
      })

      if (!shareSuccess) {
        console.error('Failed to create contact share, but request was approved')
      }
    }

    return NextResponse.json({
      success: true,
      action,
      status
    })

  } catch (error) {
    console.error('Host request action error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

```

# src/app/api/host/contact-shares/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const accessCode = request.headers.get('x-access-code')

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await getUserByAccessCode(accessCode)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // Get contact shares with proper user information
    const { data: shares, error } = await supabase
      .from('contact_shares')
      .select(`
        *,
        accommodations(title, address),
        host_user:users!contact_shares_host_id_fkey(id, email, linkedin_url),
        guest_user:users!contact_shares_guest_id_fkey(id, email, linkedin_url)
      `)
      .or(`host_id.eq.${user.id},guest_id.eq.${user.id}`)
      .order('shared_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact shares:', error)
      return NextResponse.json(
        { error: 'Failed to fetch contact shares' },
        { status: 500 }
      )
    }

    // Process the data to show the correct "other person" info
    const processedShares = (shares || []).map(share => ({
      ...share,
      // If current user is the host, show guest info as "other person"
      // If current user is the guest, show host info as "other person"
      isCurrentUserHost: share.host_id === user.id,
      otherPerson: share.host_id === user.id ? share.guest_user : share.host_user,
      currentUser: share.host_id === user.id ? share.host_user : share.guest_user
    }))

    return NextResponse.json({
      shares: processedShares
    })

  } catch (error) {
    console.error('Host shares fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact shares' },
      { status: 500 }
    )
  }
}

```

# src/app/api/login/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getUserByAccessCode } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessCode } = body

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Access code is required' },
        { status: 400 }
      )
    }

    // Find user by access code
    const user = await getUserByAccessCode(accessCode)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid access code. Please check your code and try again.' },
        { status: 401 }
      )
    }

    // Log successful login
    console.log('Successful login:', {
      email: user.email,
      linkedinUrl: user.linkedin_url, // Make sure this is included
      accessCode,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        linkedinUrl: user.linkedin_url, // Properly return LinkedIn URL
        verified: user.verified
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}

```

# src/app/api/recover-code/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

async function sendRecoveryEmail(email: string, accessCode: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'YC Startup Village <noreply@ycaisus.mubashirs.com>',
      to: [email],
      subject: '🔑 Your YC Startup Village Access Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Your YC Startup Village Access Code</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .code-box { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
            .code { font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #92400e; letter-spacing: 2px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
            .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; margin: 20px 0; border-radius: 6px; color: #991b1b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏠 YC Startup Village</h1>
              <p>Your Access Code Recovery</p>
            </div>
            
            <div class="content">
              <h2>Hello! 👋</h2>
              
              <p>You requested to recover your access code for YC Startup Village. Here it is:</p>
              
              <div class="code-box">
                <p style="margin: 0; font-size: 16px; color: #92400e;">Your Access Code:</p>
                <div class="code">${accessCode}</div>
              </div>
              
              <h3>🔐 How to use your code:</h3>
              <ol>
                <li>Go to <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" style="color: #f97316;">YC Startup Village Login</a></li>
                <li>Enter this access code in the login form</li>
                <li>Click "Access Platform" to continue</li>
              </ol>
              
              <div class="warning">
                <strong>🛡️ Security Notice:</strong> Keep this code private. Anyone with this code can access your YC Startup Village account.
              </div>
              
              <h3>🤝 What you can do on YC Startup Village:</h3>
              <ul>
                <li><strong>Browse Accommodations:</strong> Find places to stay from fellow YC attendees</li>
                <li><strong>List Your Space:</strong> Share your accommodation with other founders</li>
                <li><strong>Connect Directly:</strong> Exchange contact info when both parties approve</li>
                <li><strong>Network:</strong> Connect with fellow YC AI Startup School attendees</li>
              </ul>
              
              <p>If you didn't request this code recovery, you can safely ignore this email.</p>
              
              <p style="margin-top: 30px;">
                Happy connecting!<br>
                <strong>The YC Startup Village Community</strong>
              </p>
            </div>
            
            <div class="footer">
              <p><strong>Important:</strong> YC Startup Village is a community project created by fellow YC attendees. It is NOT officially affiliated with Y Combinator.</p>
              <p>This platform helps YC AI Startup School attendees find and share accommodations safely.</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return false
    }

    console.log('Email sent successfully:', data)
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists with this email
    const { data: user, error } = await supabase
      .from('users')
      .select('access_code, email, created_at')
      .eq('email', email.toLowerCase())
      .single()

    if (error || !user) {
      // For security, always return success message
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, we\'ve sent the access code.'
      })
    }

    // Send recovery email
    const emailSent = await sendRecoveryEmail(email, user.access_code)
    
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send recovery email. Please try again.' },
        { status: 500 }
      )
    }

    // Log the recovery attempt
    console.log('Access code recovery:', {
      email: user.email,
      accessCode: user.access_code,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    })

    return NextResponse.json({
      success: true,
      message: 'Recovery email sent successfully.'
    })

  } catch (error) {
    console.error('Code recovery error:', error)
    return NextResponse.json(
      { error: 'Recovery failed. Please try again.' },
      { status: 500 }
    )
  }
}

```

# src/app/api/verify-attendee/route.ts

```ts
import { NextRequest, NextResponse } from 'next/server'
import { checkEmailExists, checkLinkedInExists, createUser } from '@/lib/database'

// Correct answers (insider knowledge)
const CORRECT_ANSWERS = {
  afterpartyHost: 'corgi',
  afterpartyCount: '19',
  parkingInfo: 'no',
  weatherRange: '50-75',
  hotelDiscount: 'YCAI25',
  ticketTiming: 'day before',
}

function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().trim().replace(/[^\w\s]/g, '')
}

function scoreAnswer(userAnswer: string, correctAnswer: string, maxPoints: number): number {
  const normalized = normalizeAnswer(userAnswer)
  const correct = normalizeAnswer(correctAnswer)
  
  if (normalized.includes(correct) || correct.includes(normalized)) {
    return maxPoints
  }
  
  // Partial credit for close answers
  if (normalized === correct) return maxPoints
  if (normalized.length > 2 && correct.includes(normalized.substring(0, 3))) return Math.floor(maxPoints * 0.7)
  
  return 0
}

function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'YC25-'
  
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return code // Format: YC25-ABC123
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      afterpartyHost, 
      afterpartyCount, 
      parkingInfo, 
      weatherRange, 
      hotelDiscount, 
      ticketTiming, 
      email,
      linkedinUrl  // This comes as linkedinUrl from the frontend
    } = body

    console.log('Received data:', { email, linkedinUrl }) // Debug log

    // Check for duplicate email
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      return NextResponse.json({
        score: 0,
        passed: false,
        reasoning: 'This email address has already been used to create an account. Each person can only have one account.',
        riskLevel: 'high',
        error: 'Email already registered'
      })
    }

    // Check for duplicate LinkedIn profile
    const linkedinExists = await checkLinkedInExists(linkedinUrl)
    if (linkedinExists) {
      return NextResponse.json({
        score: 0,
        passed: false,
        reasoning: 'This LinkedIn profile has already been used to create an account. Each person can only have one account.',
        riskLevel: 'high',
        error: 'LinkedIn profile already registered'
      })
    }

    // Score each answer
    let totalScore = 0
    const scoring = []

    // Question 1: After party host (20 points)
    const hostScore = scoreAnswer(afterpartyHost, CORRECT_ANSWERS.afterpartyHost, 20)
    totalScore += hostScore
    scoring.push({ question: 'After party host', score: hostScore, maxScore: 20 })

    // Question 2: After party count (20 points)
    const countScore = scoreAnswer(afterpartyCount, CORRECT_ANSWERS.afterpartyCount, 20)
    totalScore += countScore
    scoring.push({ question: 'After party count', score: countScore, maxScore: 20 })

    // Question 3: Parking (15 points)
    const parkingScore = scoreAnswer(parkingInfo, CORRECT_ANSWERS.parkingInfo, 15)
    totalScore += parkingScore
    scoring.push({ question: 'Parking info', score: parkingScore, maxScore: 15 })

    // Question 4: Weather (15 points)
    const weatherScore = scoreAnswer(weatherRange, CORRECT_ANSWERS.weatherRange, 15)
    totalScore += weatherScore
    scoring.push({ question: 'Weather range', score: weatherScore, maxScore: 15 })

    // Question 5: Discount code (20 points)
    const discountScore = scoreAnswer(hotelDiscount, CORRECT_ANSWERS.hotelDiscount, 20)
    totalScore += discountScore
    scoring.push({ question: 'Hotel discount', score: discountScore, maxScore: 20 })

    // Question 6: Ticket timing (10 points)
    const ticketScore = scoreAnswer(ticketTiming, CORRECT_ANSWERS.ticketTiming, 10)
    totalScore += ticketScore
    scoring.push({ question: 'Ticket timing', score: ticketScore, maxScore: 10 })

    // Determine if passed (70+ points required)
    const passed = totalScore >= 70
    const accessCode = passed ? generateAccessCode() : null

    // Create reasoning
    let reasoning = `Verification completed with ${totalScore}/100 points. `
    if (passed) {
      reasoning += "You've demonstrated knowledge of YC AI Startup School details that only attendees would know. Welcome to the community!"
      
      // Create user record if passed - preserve LinkedIn URL case
      await createUser({
        email,
        linkedin_url: linkedinUrl,  // Keep original case for LinkedIn URL
        access_code: accessCode!
      })
      
    } else {
      reasoning += "Some answers didn't match the official YC event information. Please double-check your YC event materials and try again."
    }

    // Log attempt for monitoring
    console.log('Verification attempt:', {
      email,
      linkedinUrl,
      score: totalScore,
      passed,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      scoring
    })

    const result = {
      score: totalScore,
      passed,
      reasoning,
      accessCode: passed ? accessCode : null,
      riskLevel: totalScore >= 85 ? 'low' : totalScore >= 70 ? 'medium' : 'high'
    }

    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { 
        error: 'Verification failed. Please check your answers and try again.',
        score: 0,
        passed: false,
        reasoning: 'Technical error occurred during verification.'
      },
      { status: 500 }
    )
  }
}

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

# src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YC Startup Village",
  description: "Community accommodation sharing for YC AI Startup School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

```

# src/app/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Orange */}
      <div className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-orange-600">
            YC Startup Village
          </h1>
          <p className="text-gray-600 mt-2">Community accommodation sharing for YC AI Startup School</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Orange disclaimer */}
        <div className="mb-8 bg-orange-100 border-2 border-orange-300 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-orange-600 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-orange-800 mb-2">Community Project Notice</h3>
              <p className="text-orange-700">
                This platform is <strong>NOT officially affiliated with Y Combinator</strong> or YC AI Startup School. 
                We're fellow developers who built this to help attendees find and share accommodation during the event.
              </p>
            </div>
          </div>
        </div>

        {/* Cards with Orange theme */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-orange-600">🏠 Need a Place to Stay?</CardTitle>
              <CardDescription>Find fellow attendees offering accommodation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Connect with other YC AI Startup School attendees who have extra space to share during the event.
                </p>
                <Link href="/verify" className="block">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Get Started - Find Housing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-orange-600">🤝 Have Space to Share?</CardTitle>
              <CardDescription>Help fellow attendees and split costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Got a hotel room, Airbnb, or apartment with extra space? Share with fellow founders and make new connections.
                </p>
                <Link href="/verify" className="block">
                  <Button className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 bg-white" variant="outline">
                    Get Started - Offer Space
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Existing users section */}
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-4">Already verified?</p>
          <Link href="/login">
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-100">
              Login with Access Code
            </Button>
          </Link>
        </div>

        {/* Safety notice with orange theme */}
        <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-6">
          <h3 className="text-lg font-medium text-orange-800 mb-2">🛡️ Safety First</h3>
          <div className="text-orange-700 space-y-2">
            <p>• Always meet in public places first</p>
            <p>• Trust your instincts when choosing accommodation partners</p>
            <p>• We screen for YC attendance but can't verify everyone completely</p>
            <p>• Use the same caution you'd use with any accommodation sharing</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-orange-100 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-2">Community Project Disclaimer</p>
              <p>
                YC Startup Village is an independent community project created by fellow developers 
                attending YC AI Startup School. This platform is NOT officially affiliated with, 
                endorsed by, or sponsored by Y Combinator.
              </p>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>Built by attendees, for attendees • Use at your own risk</p>
              <p>Exercise normal caution when meeting new people and sharing accommodation</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

```

# src/components/accommodations/create-listing-form.tsx

```tsx
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

```

# src/components/auth/login-form.tsx

```tsx
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
                className="block text-gray-500 hover:text-gray-700 text-sm"
              >
                Lost your code? Get help
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

```

# src/components/auth/verification-form.tsx

```tsx
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
            <Label htmlFor="afterpartyHost">Who is hosting the hackathon after parties on day 1? *</Label>
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
              placeholder="e.g., 1 week before, day of event, etc."
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

```

# src/components/buddy-matching/create-flight-group-form.tsx

```tsx
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

```

# src/components/buddy-matching/join-flight-group-form.tsx

```tsx
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

const joinFlightSchema = z.object({
  flightDate: z.string().optional(),
  flightTime: z.string().optional(),
  airline: z.string().optional(),
  notes: z.string().optional(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  showPhone: z.boolean().default(true),
  showEmail: z.boolean().default(true),
  showLinkedIn: z.boolean().default(true),
})

type JoinFlightForm = z.infer<typeof joinFlightSchema>

interface JoinFlightGroupFormProps {
  group: {
    id: string
    departure_city: string
    creator: {
      email: string
      linkedin_url: string
    }
    flight_participants: any[]
  }
  onSuccess: () => void
}

export function JoinFlightGroupForm({ group, onSuccess }: JoinFlightGroupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm<JoinFlightForm>({
    resolver: zodResolver(joinFlightSchema),
    defaultValues: {
      flightDate: '',
      flightTime: '',
      airline: '',
      notes: '',
      phone: '',
      showPhone: true,
      showEmail: true,
      showLinkedIn: true,
    },
  })

  const onSubmit = async (data: JoinFlightForm) => {
    setIsLoading(true)
    setError('')

    try {
      const accessCode = localStorage.getItem('accessCode')
      if (!accessCode) {
        setError('Please log in again')
        return
      }

      const response = await fetch('/api/flight-groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': accessCode,
        },
        body: JSON.stringify({
          group_id: group.id,
          flight_date: data.flightDate || null,
          flight_time: data.flightTime || null,
          airline: data.airline || null,
          notes: data.notes || null,
          phone: data.phone,
          show_phone: data.showPhone,
          show_email: data.showEmail,
          show_linkedin: data.showLinkedIn,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to join flight group')
        return
      }

      onSuccess()
    } catch (error) {
      console.error('Join flight group error:', error)
      setError('Network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-700">
          ✈️ Join Flight Group: {group.departure_city}
        </CardTitle>
        <CardDescription>
          Share your travel details and contact preferences with the group
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Flight Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Flight Details (Optional)</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="flightDate">Flight Date</Label>
                <Input
                  id="flightDate"
                  type="date"
                  {...form.register('flightDate')}
                  disabled={isLoading}
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="flightTime">Flight Time</Label>
                <Input
                  id="flightTime"
                  type="time"
                  {...form.register('flightTime')}
                  disabled={isLoading}
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="airline">Airline (Optional)</Label>
              <Input
                id="airline"
                {...form.register('airline')}
                placeholder="e.g., United, Delta, American Airlines"
                disabled={isLoading}
                className="focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>

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
            <h4 className="font-medium text-gray-900">What to Share with Group Members</h4>
            
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
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes for Group Members (Optional)</Label>
            <Textarea
              id="notes"
              {...form.register('notes')}
              placeholder="Any additional info you'd like to share with your travel buddies..."
              rows={3}
              disabled={isLoading}
              className="focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
            <h4 className="font-medium text-orange-800 mb-2">🤝 Group Members ({group.flight_participants.length + 1})</h4>
            <div className="text-sm text-orange-700 space-y-1">
              <p>• <strong>Group Creator:</strong> {group.creator.email.split('@')[0]}</p>
              {group.flight_participants.slice(0, 3).map((participant: any, index: number) => (
                <p key={index}>• <strong>Member:</strong> {participant.user.email.split('@')[0]}</p>
              ))}
              {group.flight_participants.length > 3 && (
                <p>• + {group.flight_participants.length - 3} more members</p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Joining Group...' : '🤝 Join Flight Group'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

```

# src/components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-orange-500 text-white hover:bg-orange-600",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-gray-600 border-gray-300 hover:bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-600",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-orange-300 bg-white hover:bg-orange-50 hover:text-orange-900",
        secondary: "bg-orange-100 text-orange-900 hover:bg-orange-200",
        ghost: "hover:bg-orange-100 hover:text-orange-900",
        link: "text-orange-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# src/components/ui/card.tsx

```tsx
import * as React from "react"
import { cn } from "@/utils/cn"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight text-gray-900",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# src/components/ui/input.tsx

```tsx
import * as React from "react"
import { cn } from "@/utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

# src/components/ui/label.tsx

```tsx
import * as React from "react"
import { cn } from "@/utils/cn"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }

```

# src/components/ui/select.tsx

```tsx
import * as React from "react"
import { cn } from "@/utils/cn"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

export { Select }

```

# src/components/ui/textarea.tsx

```tsx
import * as React from "react"
import { cn } from "@/utils/cn"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

```

# src/lib/database.ts

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface UserRecord {
  id: string
  email: string
  linkedin_url: string
  access_code: string
  name?: string
  phone?: string
  verified: boolean
  created_at: string
  updated_at: string
}

export interface AccommodationListing {
  id: string
  host_id: string
  title: string
  description: string
  address: string
  price_per_night: number
  max_guests: number
  available_spots: number
  amenities: string[]
  house_rules?: string
  available_from: string
  available_until: string
  status: 'active' | 'inactive' | 'full'
  created_at: string
  updated_at: string
}

// User functions
export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email.toLowerCase())
    .single()
  
  return !error && !!data
}

export async function checkLinkedInExists(linkedinUrl: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('linkedin_url', linkedinUrl) // Don't convert to lowercase for comparison
    .single()
  
  return !error && !!data
}

export async function createUser(userData: {
  email: string
  linkedin_url: string
  access_code: string
}): Promise<UserRecord> {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      email: userData.email.toLowerCase(),
      linkedin_url: userData.linkedin_url, // Keep original case for LinkedIn URL
      access_code: userData.access_code,
      verified: true
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }

  return data
}

export async function getUserByAccessCode(accessCode: string): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('access_code', accessCode)
    .single()
  
  if (error) {
    console.error('Error fetching user by access code:', error)
    return null
  }
  
  return data
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching user by ID:', error)
    return null
  }
  
  return data
}

export async function updateUser(id: string, updates: Partial<UserRecord>): Promise<UserRecord | null> {
  const { data, error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating user:', error)
    return null
  }

  return data
}

// Accommodation functions
export async function createAccommodation(accommodationData: {
  hostId: string
  title: string
  description: string
  address: string
  pricePerNight: number
  maxGuests: number
  availableSpots: number
  amenities: string[]
  houseRules?: string
  availableFrom: string
  availableUntil: string
  status: 'active' | 'inactive' | 'full'
}): Promise<AccommodationListing> {
  
  // Map camelCase to snake_case for database
  const dbData = {
    host_id: accommodationData.hostId,
    title: accommodationData.title,
    description: accommodationData.description,
    address: accommodationData.address,
    price_per_night: accommodationData.pricePerNight,
    max_guests: accommodationData.maxGuests,
    available_spots: accommodationData.availableSpots,
    amenities: accommodationData.amenities,
    house_rules: accommodationData.houseRules,
    available_from: accommodationData.availableFrom,
    available_until: accommodationData.availableUntil,
    status: accommodationData.status
  }

  console.log('Creating accommodation with data:', dbData)

  const { data: listing, error } = await supabase
    .from('accommodations')
    .insert([dbData])
    .select()
    .single()

  if (error) {
    console.error('Error creating accommodation:', error)
    throw new Error('Failed to create accommodation')
  }

  return listing
}

export async function getAccommodationsByStatus(status: 'active' | 'inactive' | 'full'): Promise<AccommodationListing[]> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching accommodations:', error)
    return []
  }

  return data || []
}

export async function getAccommodationById(id: string): Promise<AccommodationListing | null> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching accommodation:', error)
    return null
  }

  return data
}

export async function getAccommodationsByHost(hostId: string): Promise<AccommodationListing[]> {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('host_id', hostId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching host accommodations:', error)
    return []
  }

  return data || []
}

// Contact request functions
export async function getContactRequestsForHost(hostId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('contact_requests')
    .select(`
      *,
      accommodations!inner(title, address),
      users!contact_requests_from_user_id_fkey(email, linkedin_url)
    `)
    .eq('to_user_id', hostId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact requests:', error)
    return []
  }

  return data || []
}

export async function updateContactRequestStatus(
  requestId: string, 
  status: 'approved' | 'rejected'
): Promise<boolean> {
  const { error } = await supabase
    .from('contact_requests')
    .update({ status })
    .eq('id', requestId)

  if (error) {
    console.error('Error updating contact request:', error)
    return false
  }

  return true
}

export async function createContactShare(data: {
  listing_id: string
  host_id: string
  guest_id: string
  host_phone: string
  guest_phone: string
}): Promise<boolean> {
  const { error } = await supabase
    .from('contact_shares')
    .insert([data])

  if (error) {
    console.error('Error creating contact share:', error)
    return false
  }

  return true
}

export async function getContactSharesForUser(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('contact_shares')
    .select(`
      *,
      accommodations(title, address),
      host:users!contact_shares_host_id_fkey(email, linkedin_url),
      guest:users!contact_shares_guest_id_fkey(email, linkedin_url)
    `)
    .or(`host_id.eq.${userId},guest_id.eq.${userId}`)
    .order('shared_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact shares:', error)
    return []
  }

  return data || []
}

// Flight Buddy Types
export interface FlightGroup {
  id: string
  departure_city: string
  creator_id: string
  created_at: string
  updated_at: string
}

export interface FlightParticipant {
  id: string
  group_id: string
  user_id: string
  flight_date?: string
  flight_time?: string
  airline?: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
  created_at: string
  updated_at: string
}

export interface DateGroup {
  id: string
  start_date: string
  end_date: string
  creator_id: string
  created_at: string
  updated_at: string
}

export interface DateParticipant {
  id: string
  group_id: string
  user_id: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
  created_at: string
  updated_at: string
}

// Flight Group Functions
export async function checkFlightGroupExists(departureCity: string): Promise<FlightGroup | null> {
  const { data, error } = await supabase
    .from('flight_groups')
    .select('*')
    .eq('departure_city', departureCity)
    .single()

  if (error) return null
  return data
}

export async function createFlightGroup(data: {
  departure_city: string
  creator_id: string
}): Promise<FlightGroup> {
  const { data: group, error } = await supabase
    .from('flight_groups')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error creating flight group:', error)
    throw new Error('Failed to create flight group')
  }

  return group
}

export async function getAllFlightGroups(): Promise<any[]> {
  const { data, error } = await supabase
    .from('flight_groups')
    .select(`
      *,
      creator:users!flight_groups_creator_id_fkey(email, linkedin_url),
      flight_participants(
        *,
        user:users!flight_participants_user_id_fkey(email, linkedin_url, phone)
      )
    `)
    .order('departure_city', { ascending: true })

  if (error) {
    console.error('Error fetching flight groups:', error)
    return []
  }

  return data || []
}

export async function joinFlightGroup(data: {
  group_id: string
  user_id: string
  flight_date?: string
  flight_time?: string
  airline?: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
}): Promise<FlightParticipant> {
  const { data: participant, error } = await supabase
    .from('flight_participants')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error joining flight group:', error)
    throw new Error('Failed to join flight group')
  }

  return participant
}

export async function leaveFlightGroup(userId: string, groupId: string): Promise<boolean> {
  const { error } = await supabase
    .from('flight_participants')
    .delete()
    .eq('user_id', userId)
    .eq('group_id', groupId)

  if (error) {
    console.error('Error leaving flight group:', error)
    return false
  }

  return true
}

// Date Group Functions
export async function checkDateGroupExists(startDate: string, endDate: string): Promise<DateGroup | null> {
  const { data, error } = await supabase
    .from('date_groups')
    .select('*')
    .eq('start_date', startDate)
    .eq('end_date', endDate)
    .single()

  if (error) return null
  return data
}

export async function createDateGroup(data: {
  start_date: string
  end_date: string
  creator_id: string
}): Promise<DateGroup> {
  const { data: group, error } = await supabase
    .from('date_groups')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error creating date group:', error)
    throw new Error('Failed to create date group')
  }

  return group
}

export async function getAllDateGroups(): Promise<any[]> {
  const { data, error } = await supabase
    .from('date_groups')
    .select(`
      *,
      creator:users!date_groups_creator_id_fkey(email, linkedin_url),
      date_participants(
        *,
        user:users!date_participants_user_id_fkey(email, linkedin_url, phone)
      )
    `)
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching date groups:', error)
    return []
  }

  return data || []
}

export async function joinDateGroup(data: {
  group_id: string
  user_id: string
  notes?: string
  phone: string
  show_phone: boolean
  show_email: boolean
  show_linkedin: boolean
}): Promise<DateParticipant> {
  const { data: participant, error } = await supabase
    .from('date_participants')
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error('Error joining date group:', error)
    throw new Error('Failed to join date group')
  }

  return participant
}

export async function leaveDateGroup(userId: string, groupId: string): Promise<boolean> {
  const { error } = await supabase
    .from('date_participants')
    .delete()
    .eq('user_id', userId)
    .eq('group_id', groupId)

  if (error) {
    console.error('Error leaving date group:', error)
    return false
  }

  return true
}

export async function getUserFlightParticipations(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('flight_participants')
    .select(`
      *,
      flight_groups(departure_city, creator_id)
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user flight participations:', error)
    return []
  }

  return data || []
}

export async function getUserDateParticipations(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('date_participants')
    .select(`
      *,
      date_groups(start_date, end_date, creator_id)
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user date participations:', error)
    return []
  }

  return data || []
}

```

# src/lib/supabase/client.ts

```ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

```

# src/lib/supabase/server.ts

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting errors
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  )
}

```

# src/lib/validations/auth.ts

```ts
import { z } from 'zod'

const linkedinUrlRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/

export const verificationSchema = z.object({
  afterpartyHost: z.string().min(2, 'Please provide the host name'),
  afterpartyCount: z.string().min(1, 'Please provide the number of after parties'),
  parkingInfo: z.string().min(2, 'Please answer Yes or No'),
  weatherRange: z.string().min(5, 'Please provide the temperature range mentioned'),
  hotelDiscount: z.string().min(3, 'Please provide the discount code'),
  ticketTiming: z.string().min(5, 'Please provide when tickets are distributed'),
  email: z.string().email('Please enter a valid email address'),
  linkedinUrl: z.string()
    .url('Please enter a valid URL')
    .regex(linkedinUrlRegex, 'Please enter a valid LinkedIn profile URL (format: https://www.linkedin.com/in/your-username)')
    .refine(
      (url) => url.includes('/in/') && !url.includes('/company/'),
      'Please provide your personal LinkedIn profile, not a company page'
    ),
})

export const signInSchema = z.object({
  accessCode: z.string().min(8, 'Please enter a valid access code'),
})

export const profileSchema = z.object({
  accessCode: z.string().min(8, 'Please enter your access code'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  userType: z.enum(['host', 'seeker', 'both'], {
    required_error: 'Please select how you plan to use the platform',
  }),
})

export type VerificationForm = z.infer<typeof verificationSchema>
export type SignInForm = z.infer<typeof signInSchema>
export type ProfileForm = z.infer<typeof profileSchema>

```

# src/types/database.ts

```ts
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          linkedin_url: string | null
          phone: string | null
          bio: string | null
          verified: boolean
          user_type: 'host' | 'seeker' | 'both'
          preferences: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          linkedin_url?: string | null
          phone?: string | null
          bio?: string | null
          verified?: boolean
          user_type: 'host' | 'seeker' | 'both'
          preferences?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          linkedin_url?: string | null
          phone?: string | null
          bio?: string | null
          verified?: boolean
          user_type?: 'host' | 'seeker' | 'both'
          preferences?: Record<string, any>
          updated_at?: string
        }
      }
    }
  }
}

```

# src/utils/cn.ts

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# yc-hotel-sharing@0.1.0

```0

```

