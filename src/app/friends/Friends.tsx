'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import UserSearch from '@/components/UserSearch'
import FriendList from '@/components/FriendList'
import ErrorDisplay from '@/components/ErrorDisplay'

type Friend = {
  user_id_1: { id: string; username: string }
  user_id_2: { id: string; username: string }
  status: string
}

export default function Friends() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserId(user.id)
          const { data, error } = await supabase
            .from('friendships')
            .select('*, user_id_1(id, username), user_id_2(id, username)')
            .or(`user_id_1.eq.${user.id},user_id_2.eq.${user.id}`)
          
          if (error) {
            throw error
          }
          
          if (data) {
            setFriends(data)
          }
        }
      } catch (error) {
        setError((error as Error).message)
      }
    }
    getFriends()
  }, [supabase])

  return (
    <div className="container mx-auto p-4">
      <ErrorDisplay message={error} />
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">My Friends</h2>
          {userId && <FriendList friends={friends} userId={userId} />}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Find Friends</h2>
          <UserSearch />
        </div>
      </div>
    </div>
  )
}
