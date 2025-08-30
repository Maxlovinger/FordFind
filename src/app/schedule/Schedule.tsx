'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Modal from '@/components/Modal'
import ScheduleForm from '@/components/ScheduleForm'
import { useRouter } from 'next/navigation'
import ErrorDisplay from '@/components/ErrorDisplay'

type Schedule = {
  id: number
  course_name: string
  course_code: string
  days_of_week: string[]
  start_time: string
  end_time: string
  location: string
}

export default function Schedule() {
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
            .from('schedules')
            .select('*')
            .eq('user_id', user.id)
          
          if (error) {
            throw error
          }
          
          if (data) {
            setSchedule(data)
          }
        }
      } catch (error) {
        setError((error as Error).message)
      }
    }
    getSchedule()
  }, [supabase])

  const handleSuccess = () => {
    setIsModalOpen(false)
    router.refresh()
  }

  return (
    <div className="container mx-auto p-4">
      <ErrorDisplay message={error} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Schedule</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary btn-fill"
        >
          Add Class
        </button>
      </div>

      {/* Display schedule here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <h2 className="font-bold text-lg">{item.course_name}</h2>
            <p className="text-gray-600">{item.course_code}</p>
            <p>{item.days_of_week.join(', ')}</p>
            <p>{item.start_time} - {item.end_time}</p>
            <p>{item.location}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ScheduleForm onSuccess={handleSuccess} />
      </Modal>
    </div>
  )
}
