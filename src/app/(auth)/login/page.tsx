import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

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
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
