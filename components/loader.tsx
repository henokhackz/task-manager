import React from 'react'

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  )
}

export default Loader
