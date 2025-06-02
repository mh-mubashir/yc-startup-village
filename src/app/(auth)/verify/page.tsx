import { VerificationForm } from '@/components/auth/verification-form'
import Link from 'next/link'

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
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
