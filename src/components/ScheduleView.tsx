type ScheduleItem = {
  id: number
  course_name: string
  course_code: string
  days_of_week: string[]
  start_time: string
  end_time: string
  location: string
}

type ScheduleViewProps = {
  schedule: ScheduleItem[]
}

export default function ScheduleView({ schedule }: ScheduleViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schedule.map((item) => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-haverford-red mb-2">{item.course_name}</h2>
          <p className="text-gray-600 dark:text-gray-400 font-mono text-sm mb-4">{item.course_code}</p>
          <div className="text-sm">
            <p className="font-semibold">{item.days_of_week.join(', ')}</p>
            <p>{item.start_time} - {item.end_time}</p>
            <p className="text-gray-500">{item.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
