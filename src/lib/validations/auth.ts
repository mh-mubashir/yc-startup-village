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
