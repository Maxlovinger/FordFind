import SignupForm from '@/components/SignupForm'

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <SignupForm />
      </div>
    </div>
  )
}
