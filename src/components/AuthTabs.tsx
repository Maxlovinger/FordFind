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
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-foreground text-background rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Welcome</h1>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}
