import { Suspense } from 'react'
import Spinner from '@/components/Spinner'
import Schedule from './Schedule'

export default function SchedulePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Schedule />
    </Suspense>
  )
}
