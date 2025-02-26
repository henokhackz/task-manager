'use client'

import './tiptap'
import { useState, useEffect } from 'react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useUserId } from '@/hooks/useUser'
import { toast } from 'react-toastify'
import { createNote, getLatestNote } from '@/lib/actions/note.actions'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  if (!editor) return null

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-100 border-b shadow-sm">
      <button 
        onClick={() => editor.chain().focus().toggleBold().run()} 
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${
          editor.isActive('bold') ? 'bg-black text-white' : 'hover:bg-gray-200'
        }`}>
        B
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()} 
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${
          editor.isActive('italic') ? 'bg-black text-white' : 'hover:bg-gray-200'
        }`}>
        I
      </button>
      <button 
        onClick={() => editor.chain().focus().toggleStrike().run()} 
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${
          editor.isActive('strike') ? 'bg-black text-white' : 'hover:bg-gray-200'
        }`}>
        S
      </button>
      <button 
        onClick={() => editor.chain().focus().setColor('#958DF1').run()} 
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-[#958DF1] text-white' : 'hover:bg-gray-200'
        }`}>
        A
      </button>
    </div>
  )
}


const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  
  //@ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true },
    orderedList: { keepMarks: true },
  }),
]

export default function EditorComponent() {
  const { userId } = useUserId()
  const [editorContent, setEditorContent] = useState('<p>Start writing...</p>')
  const [isLoading, setIsLoading] = useState(false)

  // Fetch latest note
  useEffect(() => {
    const fetchLatestNote = async () => {
      try {
        setIsLoading(true)
        const { data, success } = await getLatestNote()
        if (success && data) {
          setEditorContent(data.content)
        } else {
          setEditorContent('<p>Start writing...</p>')
        }
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong while fetching the latest note')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestNote()
  }, [userId])

  return (
    <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={editorContent}
    >
      <EditorContentWrapper userId={userId} />
    </EditorProvider>
  )
}

function EditorContentWrapper({ userId }: { userId: string | null }) {
  const { editor } = useCurrentEditor()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!editor) return
    editor.on('update', ({ editor }) => {
    })
  }, [editor])

  const saveNote = async () => {
    if (!userId || isLoading || !editor) return
    try {
      setIsLoading(true)
      const title = editor.getText().trim().slice(0, 50)
      const content = editor.getHTML()

      const { success } = await createNote({ title, content }, userId)

      if (success) {
        toast.success('Note saved successfully')
        router.push('/notes')
      } else {
        toast.error('Failed to save note')
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error saving note:', error)
      toast.error('Failed to save note')

    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-grow p-4 mx-auto w-full max-w-3xl">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <EditorContent 
  editor={editor} 
/>

        )}
      </div>

      <button 
        onClick={saveNote} 
        className="fixed bottom-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition">
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin " /> : 'Save Note'}
      </button>
    </div>
  )
}
