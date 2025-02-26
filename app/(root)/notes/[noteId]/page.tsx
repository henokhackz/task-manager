'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loader2, Pencil, Trash } from 'lucide-react';
import { getNoteById, updateNote, deleteNote } from '@/lib/actions/note.actions';
import {Note} from '@prisma/client'
import Loader from '@/components/loader'

export default function NotePage({ params }:{ params: { noteId: string } }) {
  const router = useRouter();
  const [noteId, setNoteId] = useState<string | null>(null)
  const [note, setNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  useEffect(()=>{
    const fetchNoteId = async()=>{
        const resolvedParams = await params
        setNoteId(resolvedParams.noteId)

    }
    fetchNoteId()
  }, [params])

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return;
      setIsLoading(true);
      const { data, success } = await getNoteById(noteId);
      if (success && data) {
        setNote(data);
        setUpdatedContent(data.content);
      } else {
        toast.error('Failed to load note');
      }
      setIsLoading(false);
    };
    fetchNote();
  }, [noteId]);

  const handleUpdate = async () => {
    if (!updatedContent.trim()) return toast.error('Note content cannot be empty');
    if(!noteId) return
    setIsLoading(true);
    const { success } = await updateNote(noteId, { content: updatedContent });
    setIsLoading(false);
    if (success) {
      setNote((prev) => ({ ...prev, content: updatedContent }));
      setIsEditing(false);
      toast.success('Note updated successfully');
    } else {
      toast.error('Failed to update note');
    }
  };

  const handleDelete = async () => {
    if (!noteId) return;
    if (!confirm('Are you sure you want to delete this note?')) return;
    setIsLoading(true);
    const { success } = await deleteNote(noteId);
    setIsLoading(false);
    if (success) {
      toast.success('Note deleted');
      router.push('/notes');
    } else {
      toast.error('Failed to delete note');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader/>
      </div>
    );
  }

  if (!note) {
    return <p className="text-center text-gray-500">Note not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Note Details</h1>
      {isEditing ? (
        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      ) : (
        <p className="text-gray-700 text-lg leading-relaxed">{note.content}</p>
      )}

      <div className="flex gap-4 mt-6">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            <Pencil size={18} /> Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <Trash size={18} /> Delete
        </button>
      </div>
    </div>
  );
}
