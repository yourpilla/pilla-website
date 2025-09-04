'use client'

import { useState } from 'react'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isButtonDisabled = isLoading || !email.trim() || !isValidEmail(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setMessage('✅ Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage(error instanceof Error ? `❌ ${error.message}` : '❌ Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
      <div>
        <h3 className="h6">Subscribe to our newsletter</h3>
        <p className="mt-2 small-blue">
          The latest news, articles, and resources, sent to your inbox weekly.
        </p>
      </div>
      <form className="mt-6 sm:flex sm:max-w-md lg:mt-0" onSubmit={handleSubmit}>
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          name="email-address"
          type="email"
          required
          placeholder="Enter your email"
          autoComplete="email"
          className="input w-full sm:w-56"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
          <button
            type="submit"
            className="btn w-full disabled:cursor-not-allowed"
            disabled={isButtonDisabled}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}