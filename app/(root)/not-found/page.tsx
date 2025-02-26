
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="text-center text-white px-6 md:px-12">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <a className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full text-lg hover:bg-indigo-600 hover:text-white transition duration-300">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  )
}
