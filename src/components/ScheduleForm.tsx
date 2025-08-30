'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'


type ScheduleFormProps = {
  onSuccess: () => void
}

export default function ScheduleForm({ onSuccess }: ScheduleFormProps) {
  const [courseName, setCourseName] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in to add a class.')
      return
    }

    const { error: insertError } = await supabase.from('schedules').insert({
      user_id: user.id,
      course_name: courseName,
      course_code: courseCode,
      days_of_week: daysOfWeek,
      start_time: startTime,
      end_time: endTime,
      location,
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      onSuccess()
    }
  }

  const handleDayChange = (day: string) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day))
    } else {
      setDaysOfWeek([...daysOfWeek, day])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Add a Class</h2>
      {/* Form fields will go here */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="courseName">
          Course Name
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="courseCode">
          Course Code
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          type="text"
          id="courseCode"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Days of the Week</label>
        <div className="flex gap-2">
          {['M', 'T', 'W', 'Th', 'F'].map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayChange(day)}
              className={`px-3 py-1 border rounded-md ${
                daysOfWeek.includes(day) ? 'bg-haverford-red text-white' : ''
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="startTime">
            Start Time
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="endTime">
            End Time
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="location">
          Location
        </label>
        <input
          className="w-full px-3 py-2 border rounded-md"
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button
        className="w-full btn btn-primary"
        type="submit"
      >
        Add Class
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  )
}
