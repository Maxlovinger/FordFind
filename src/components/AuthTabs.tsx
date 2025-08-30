'use client'

import Tabs from '@/components/Tabs'
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'

export default function AuthTabs() {
  const tabs = [
    {
      label: 'Sign In',
      content: <LoginForm />,
    },
    {
      label: 'Sign Up',
      content: <SignupForm />,
    },
  ]

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-redPrimary">FordFind</h1>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}
