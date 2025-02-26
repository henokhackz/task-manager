'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getNotes } from '@/lib/actions/note.actions'
import { toast } from 'react-toastify'
import { Note } from '@prisma/client'

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
   const fetchNotes = async () => {
    try {
      setIsLoading(true)
      const {success, data } = await getNotes()
      if(success && data){
          setNotes(data)
      }else{
        setNotes([])
        toast.error('something went wrong please try later or never i dont care ')
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
   }
   fetchNotes()
  }, [])
  


  if(isLoading){
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen px-4 py-6  '>
      <div className='w-full flex justify-between items-center mb-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Notes</h1>
      <Link href='/notes/new'>
        <button className='bg-indigo-500 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-indigo-600'>create new note</button>
      </Link>

      </div>

      {notes.map((note) => (
        <div key={note.id} className="mb-4 p-4 border border-gray-300 rounded shadow bg-white ">
          <Link href={`/notes/${note.id}`}>
            <h2 className="text-lg font-semibold mb-4">{note.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </Link>
        </div>
      ))}
    </div>
  )
}
