'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import ErrorDisplay from './ErrorDisplay'

type User = {
  id: string
  username: string
}

export default function UserSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const { data, error } = await supabase
      .from('profiles')
      .select('id, username')
      .ilike('username', `%${query}%`)
      .limit(10)

    if (error) {
      setError(error.message)
    } else {
      setResults(data)
    }
  }

  const handleAddFriend = async (friendId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('friendships').insert({
      user_id_1: user.id,
      user_id_2: friendId,
      status: 'pending',
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Friend request sent!')
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for users..."
          className="w-full px-3 py-2 border rounded-md"
        />
        <button type="submit" className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Search
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      <ul className="mt-4">
        {results.map((user) => (
          <li key={user.id} className="flex justify-between items-center">
            <span>{user.username}</span>
            <button onClick={() => handleAddFriend(user.id)} className="text-secondary hover:text-secondary/90 transition-colors">
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
