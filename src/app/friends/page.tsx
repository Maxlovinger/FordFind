import { Suspense } from 'react'
import Spinner from '@/components/Spinner'
import Friends from './Friends'

export default function FriendsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Friends />
    </Suspense>
  )
}