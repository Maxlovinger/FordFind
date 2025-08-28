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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedule.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-bold text-lg">{item.course_name}</h2>
          <p className="text-gray-600">{item.course_code}</p>
          <p>{item.days_of_week.join(', ')}</p>
          <p>{item.start_time} - {item.end_time}</p>
          <p>{item.location}</p>
        </div>
      ))}
    </div>
  )
}
