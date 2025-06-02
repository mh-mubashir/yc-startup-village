'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <>
      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(251, 146, 60, 0.5); }
          to { box-shadow: 0 0 30px rgba(251, 146, 60, 0.8); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gradient-bg {
          background: linear-gradient(-45deg, #FF6B35, #F7931E, #FF8C00, #FF4500);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .yc-logo {
          filter: brightness(1.5);
          transition: all 0.3s ease;
        }

        .yc-logo:hover {
          filter: brightness(0) invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.8));
          transform: scale(1.05);
        }

        .stats-counter {
          background: linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.1));
          border: 1px solid rgba(255, 107, 53, 0.2);
        }

        .cta-button {
          background: linear-gradient(135deg, #FF6B35, #F7931E);
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #F7931E, #FF6B35);
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.6);
          transform: translateY(-2px);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        .floating-particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background with animated gradient */}
      <div className="fixed inset-0 gradient-bg -z-10"></div>
      
      {/* Floating particles effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-4 h-4 bg-white bg-opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-white bg-opacity-15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-white bg-opacity-25 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-60 right-20 w-5 h-5 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-50">
        <nav 
          className={`glass-effect transition-all duration-300 ${
            scrollY > 50 ? 'bg-black bg-opacity-30' : 'bg-white bg-opacity-10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                {/* YC Logo */}
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1200px-Y_Combinator_logo.svg.png" 
                  alt="Y Combinator" 
                  className="h-8 w-8 yc-logo"
                />
                <div className="text-white font-bold text-xl text-shadow">YC Startup Village</div>
              </div>
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-white hover:text-orange-200 transition-colors duration-300"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-white hover:text-orange-200 transition-colors duration-300"
                >
                  How It Works
                </button>
                <Link 
                  href="/login" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-300 hover-lift"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 text-shadow leading-tight">
              Connect.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">Stay.</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-red-200">Thrive.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white text-opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed text-shadow">
              The exclusive community platform connecting <strong>YC AI Startup School</strong> attendees. 
              Find accommodation, coordinate flights, and build lasting connections with fellow founders.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link 
                href="/verify" 
                className="cta-button text-white px-8 py-4 rounded-xl font-bold text-lg hover-lift inline-flex items-center space-x-2"
              >
                <span>🚀</span>
                <span>Get Verified Now</span>
              </Link>
              <Link 
                href="/login" 
                className="glass-effect text-white px-8 py-4 rounded-xl font-semibold text-lg hover-lift inline-flex items-center space-x-2"
              >
                <span>🔑</span>
                <span>Already Have Access?</span>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="stats-counter rounded-2xl p-6 hover-lift">
              <div className="text-4xl font-bold text-white mb-2">🏠</div>
              <div className="text-2xl font-bold text-white">Find Housing</div>
              <div className="text-white text-opacity-80">Connect with hosts offering space</div>
            </div>
            <div className="stats-counter rounded-2xl p-6 hover-lift">
              <div className="text-4xl font-bold text-white mb-2">✈️</div>
              <div className="text-2xl font-bold text-white">Flight Buddies</div>
              <div className="text-white text-opacity-80">Coordinate travel with fellow attendees</div>
            </div>
            <div className="stats-counter rounded-2xl p-6 hover-lift">
              <div className="text-4xl font-bold text-white mb-2">🤝</div>
              <div className="text-2xl font-bold text-white">Build Network</div>
              <div className="text-white text-opacity-80">Connect with the AI Startup School community</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 text-shadow">Why Choose YC Startup Village?</h2>
            <p className="text-xl text-white text-opacity-90 max-w-3xl mx-auto">
              Built by founders, for founders. Everything you need to make the most of your AI Startup School experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card rounded-2xl p-8 text-center">
              <div className="text-5xl mb-6">🏠</div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Accommodation Matching</h3>
              <p className="text-white text-opacity-80 leading-relaxed">
                Find the perfect place to stay with fellow YC attendees. From shared rooms to entire apartments, 
                connect with verified founders and split costs while building relationships.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card rounded-2xl p-8 text-center">
              <div className="text-5xl mb-6">✈️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Flight Coordination</h3>
              <p className="text-white text-opacity-80 leading-relaxed">
                Connect with attendees flying from your city. Coordinate flights, share airport rides, 
                and start networking before you even land in San Francisco.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card rounded-2xl p-8 text-center">
              <div className="text-5xl mb-6">📅</div>
              <h3 className="text-2xl font-bold text-white mb-4">Date-Based Groups</h3>
              <p className="text-white text-opacity-80 leading-relaxed">
                Find people staying the same dates as you. Plan group activities, explore SF together, 
                and make the most of your time in the city.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card rounded-2xl p-8 text-center">
              <div className="text-5xl mb-6">🔐</div>
              <h3 className="text-2xl font-bold text-white mb-4">Verified Community</h3>
              <p className="text-white text-opacity-80 leading-relaxed">
                Every member is verified as a YC attendee. Connect with confidence knowing You&apos;re 
                interacting with fellow founders who share your journey.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card rounded-2xl p-8 text-center">
              <div className="text-5xl mb-6">💬</div>
              <h3 className="text-2xl font-bold text-white mb-4">Direct Messaging</h3>
              <p className="text-white text-opacity-80 leading-relaxed">
                Share contact information securely. Host approval system ensures quality connections 
                while maintaining privacy and safety for all members.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card rounded-2xl p-8 text-center">
              <div className="text-5xl mb-6">🌟</div>
              <h3 className="text-2xl font-bold text-white mb-4">Built by the Community</h3>
              <p className="text-white text-opacity-80 leading-relaxed">
                Created by fellow Startup School attendees who understand your needs. Open source and constantly 
                improving based on community feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 text-shadow">How It Works</h2>
            <p className="text-xl text-white text-opacity-90">
              Get started in minutes and connect with your YC community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="glass-effect w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover-lift">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">1. Get Verified</h3>
              <p className="text-white text-opacity-80">
                Answer questions only YC attendees would know to join our exclusive community
              </p>
            </div>

            <div className="text-center">
              <div className="glass-effect w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover-lift">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">2. Find or Offer</h3>
              <p className="text-white text-opacity-80">
                Browse accommodations or create your own listing to help fellow founders
              </p>
            </div>

            <div className="text-center">
              <div className="glass-effect w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover-lift">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">3. Connect Safely</h3>
              <p className="text-white text-opacity-80">
                Send contact requests and share information only when both parties approve
              </p>
            </div>

            <div className="text-center">
              <div className="glass-effect w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover-lift">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">4. Build Network</h3>
              <p className="text-white text-opacity-80">
                Form lasting connections that extend beyond your YC experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-12 hover-lift">
            <h2 className="text-4xl font-bold text-white mb-6 text-shadow">Ready to Connect?</h2>
            <p className="text-xl text-white text-opacity-90 mb-8">
              Join hundreds of YC founders who are already using our platform to enhance their startup school experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/verify" 
                className="cta-button text-white px-8 py-4 rounded-xl font-bold text-lg hover-lift inline-flex items-center justify-center space-x-2"
              >
                <span>🚀</span>
                <span>Start Your Journey</span>
              </Link>
              <Link 
                href="/login" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover-lift inline-flex items-center justify-center space-x-2"
              >
                <span>🔑</span>
                <span>I Have Access</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left: Branding */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1200px-Y_Combinator_logo.svg.png" 
                    alt="Y Combinator" 
                    className="h-6 w-6 yc-logo"
                  />
                  <span className="text-white font-bold text-lg">YC Startup Village</span>
                </div>
                <p className="text-white text-opacity-70 text-sm">
                  Connecting YC founders, one stay at a time.
                </p>
              </div>

              {/* Center: Community Notice */}
              <div className="text-center">
                <div className="bg-orange-500 bg-opacity-20 border border-orange-400 border-opacity-30 rounded-lg p-4">
                  <p className="text-white text-sm">
                    <span className="font-semibold">Community Project:</span><br/>
                    Built by fellow attendees, not officially affiliated with Y Combinator
                  </p>
                </div>
              </div>

              {/* Right: Links */}
              <div className="text-center md:text-right">
                <div className="flex flex-col space-y-3">
                  <a 
                    href="https://github.com/mh-mubashir/yc-startup-village#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-200 transition-colors duration-300 inline-flex items-center justify-center md:justify-end space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/hamza--mubashir/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-200 transition-colors duration-300 inline-flex items-center justify-center md:justify-end space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                    </svg>
                    <span>Contact Creator</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center">
              <p className="text-white text-opacity-60 text-sm">
                Made with ❤️ by the YC AI Startup School Attendees community • Use at your own discretion • Exercise normal caution when meeting new people
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}