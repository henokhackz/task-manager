import Editor from '@/components/editor/tiptap'
import React from 'react'

const NewNotePage = () => {
  return (
    <div className='min-h-screen px-4 py-6  '>
        <h1 className='text-2xl font-bold mb-4'>create new note</h1>
        <Editor/>
      
    </div>
  )
}

export default NewNotePage
