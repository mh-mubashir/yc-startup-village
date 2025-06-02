import { NextRequest, NextResponse } from 'next/server'
import { checkEmailExists, checkLinkedInExists, createUser } from '@/lib/database'

// Correct answers (insider knowledge)
const CORRECT_ANSWERS = {
  afterpartyHost: 'corgi',
  afterpartyCount: '21',
  parkingInfo: 'yes',
  weatherRange: '50-75',
  hotelDiscount: 'YCAI25',
  ticketTiming: '1 day before',
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
