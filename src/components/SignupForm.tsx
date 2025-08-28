'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import ErrorDisplay from './ErrorDisplay'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email.endsWith('@haverford.edu')) {
      setError('Please use a valid Haverford email address.')
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Please check your email to confirm your sign up.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="w-full bg-secondary text-secondary-foreground py-2 rounded-md hover:bg-secondary/90 transition-colors"
        type="submit"
      >
        Sign Up
      </button>
      <ErrorDisplay message={error} />
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </form>
  )
}
