'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Tabs from '@/components/Tabs'
import ScheduleView from '@/components/ScheduleView'
import ErrorDisplay from '@/components/ErrorDisplay'

type ScheduleItem = {
  id: number
  course_name: string
  course_code: string
  days_of_week: string[]
  start_time: string
  end_time: string
  location: string
}

type Friend = {
  id: string
  username: string
  schedule: ScheduleItem[]
}

export default function Dashboard() {
  const [mySchedule, setMySchedule] = useState<ScheduleItem[]>([])
  const [friendSchedules, setFriendSchedules] = useState<Friend[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Fetch user's schedule
          const { data: myScheduleData, error: myScheduleError } = await supabase
            .from('schedules')
            .select('*')
            .eq('user_id', user.id)
          
          if (myScheduleError) throw myScheduleError
          if (myScheduleData) setMySchedule(myScheduleData)

          // Fetch friends
          const { data: friendsData, error: friendsError } = await supabase
            .from('friendships')
            .select('*, user_id_1(id, username), user_id_2(id, username)')
            .eq('status', 'accepted')
            .or(`user_id_1.eq.${user.id},user_id_2.eq.${user.id}`)

          if (friendsError) throw friendsError

          const friendUsers = friendsData?.map(f => f.user_id_1.id === user.id ? f.user_id_2 : f.user_id_1) || []

          // Fetch friends' schedules
          const schedules = await Promise.all(
            friendUsers.map(async (friend) => {
              const { data: schedule, error: scheduleError } = await supabase
                .from('schedules')
                .select('*')
                .eq('user_id', friend.id)
              
              if (scheduleError) throw scheduleError
              return { ...friend, schedule: schedule || [] }
            })
          )
          setFriendSchedules(schedules)
        }
      } catch (error) {
        setError((error as Error).message)
      }
    }
    getDashboardData()
  }, [supabase])

  const tabs = [
    {
      label: 'My Schedule',
      content: <ScheduleView schedule={mySchedule} />,
    },
    ...friendSchedules.map((friend) => ({
      label: friend.username,
      content: <ScheduleView schedule={friend.schedule} />,
    })),
  ]

  return (
    <div className="container mx-auto p-4">
      <ErrorDisplay message={error} />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Tabs tabs={tabs} />
    </div>
  )
}
