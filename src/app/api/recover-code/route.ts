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
