import { z } from 'zod'

// More flexible LinkedIn URL regex that allows Unicode characters
const linkedinUrlRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\u00C0-\u017F\u0400-\u04FF\u4e00-\u9fff\u0590-\u05FF\u0600-\u06FF_-]+\/?$/

// Alternative: Even more relaxed version that just checks basic structure
// Now accepts both http:// and https://, with or without www.
const relaxedLinkedinUrlRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[^\/\s]+\/?$/

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
    .regex(relaxedLinkedinUrlRegex, 'Please enter a valid LinkedIn profile URL (formats: http://linkedin.com/in/username, https://linkedin.com/in/username, or with www.)')
    .refine(
      (url) => {
        // Check that it's a personal profile (contains /in/) and not a company page
        return url.includes('/in/') && !url.includes('/company/')
      },
      'Please provide your personal LinkedIn profile, not a company page'
    )
    .refine(
      (url) => {
        // Additional check to ensure the URL doesn't contain suspicious patterns
        const suspiciousPatterns = ['/company/', '/school/', '/pub/']
        return !suspiciousPatterns.some(pattern => url.includes(pattern))
      },
      'Please provide a valid personal LinkedIn profile URL'
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

// Utility function to normalize LinkedIn URLs for consistent storage
export function normalizeLinkedInUrl(url: string): string {
  // Remove trailing slash and normalize to consistent format
  let normalized = url.replace(/\/$/, '')
  
  // Convert HTTP to HTTPS (LinkedIn always redirects to HTTPS anyway)
  if (normalized.startsWith('http://')) {
    normalized = normalized.replace('http://', 'https://')
  }
  
  // Ensure www. prefix is consistent (add www. if not present)
  if (normalized.includes('linkedin.com/in/') && !normalized.includes('www.')) {
    normalized = normalized.replace('linkedin.com', 'www.linkedin.com')
  }
  
  return normalized
}

// Helper function to extract LinkedIn username from URL (useful for display)
export function extractLinkedInUsername(url: string): string {
  try {
    const match = url.match(/linkedin\.com\/in\/([^\/\?\s]+)/)
    return match ? match[1] : 'LinkedIn Profile'
  } catch {
    return 'LinkedIn Profile'
  }
}
