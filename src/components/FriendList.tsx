'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type Friend = {
  user_id_1: { id: string; username: string }
  user_id_2: { id: string; username: string }
  status: string
}

type FriendListProps = {
  friends: Friend[]
  userId: string
}

export default function FriendList({ friends, userId }: FriendListProps) {
  const supabase = createClient()
  const router = useRouter()

  const handleAccept = async (friend: Friend) => {
    const { error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('user_id_1', friend.user_id_1.id)
      .eq('user_id_2', friend.user_id_2.id)
    
    if (!error) {
      router.refresh()
    }
  }

  const handleDecline = async (friend: Friend) => {
    const { error } = await supabase
      .from('friendships')
      .delete()
      .eq('user_id_1', friend.user_id_1.id)
      .eq('user_id_2', friend.user_id_2.id)

    if (!error) {
      router.refresh()
    }
  }

  const acceptedFriends = friends.filter((f) => f.status === 'accepted')
  const pendingRequests = friends.filter((f) => f.status === 'pending' && f.user_id_2.id === userId)

  return (
    <div>
      <h3 className="text-lg font-semibold">Accepted Friends</h3>
      <ul>
        {acceptedFriends.map((friend) => {
          const friendUser = friend.user_id_1.id === userId ? friend.user_id_2 : friend.user_id_1
          return <li key={friendUser.id}>{friendUser.username}</li>
        })}
      </ul>

      <h3 className="text-lg font-semibold mt-4">Pending Requests</h3>
      <ul>
        {pendingRequests.map((friend) => (
          <li key={friend.user_id_1.id} className="flex justify-between items-center">
            <span>{friend.user_id_1.username}</span>
            <div>
              <button onClick={() => handleAccept(friend)} className="text-green-500 mr-2 hover:text-green-700 transition-colors">Accept</button>
              <button onClick={() => handleDecline(friend)} className="text-red-500 hover:text-red-700 transition-colors">Decline</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
