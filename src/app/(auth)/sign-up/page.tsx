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
