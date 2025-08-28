type ErrorDisplayProps = {
  message: string | null
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  if (!message) {
    return null
  }

  return (
    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">Error:</span> {message}
    </div>
  )
}
