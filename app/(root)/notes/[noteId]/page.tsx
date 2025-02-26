'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Trash } from 'lucide-react';
import { getNoteById, deleteNote } from '@/lib/actions/note.actions';
import { Note } from '@prisma/client';
import Loader from '@/components/loader';

export default function NotePage({ params }: { params: { noteId: string } }) {
  const router = useRouter();
  const [noteId, setNoteId] = useState<string | null>(null);
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNoteId = async () => {
      const resolvedParams = await params;
      setNoteId(resolvedParams.noteId);
    };
    fetchNoteId();
  }, [params]);

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return;
      setIsLoading(true);
      const { data, success } = await getNoteById(noteId);
      if (success && data) {
        setNote(data);
      } else {
        toast.error('Failed to load note');
      }
      setIsLoading(false);
    };
    fetchNote();
  }, [noteId]);

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
        <Loader />
      </div>
    );
  }

  if (!note) {
    return <p className="text-center text-gray-500">Note not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg border border-gray-200">
     
      <div className="mb-4 text-2xl font-bold" dangerouslySetInnerHTML={{ __html: note.title }} />
      <div dangerouslySetInnerHTML={{ __html: note.content }} />

      <div className="flex gap-4 mt-6">
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
