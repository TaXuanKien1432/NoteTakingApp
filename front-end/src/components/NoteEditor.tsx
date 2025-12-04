import { useEffect, useRef, useState } from 'react'
import type { Note } from '../pages/Home'
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { apiFetch } from '../services/api';

interface NoteEditorProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
}

const NoteEditor = ({notes, setNotes, selectedNote, setSelectedNote}: NoteEditorProps) => {
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState("");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const blockNoteEditor = useCreateBlockNote({
    initialContent: selectedNote?.body ? JSON.parse(selectedNote.body) : undefined,
  });

  // Load content when note changes
  useEffect(() => {
    if (!blockNoteEditor) return;
    
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      blockNoteEditor.replaceBlocks(blockNoteEditor.document, selectedNote.body ? JSON.parse(selectedNote.body) : []);
      setContent(selectedNote.body || "[]");
    }
  }, [selectedNote, blockNoteEditor]);

  useEffect(() => {
    if (!selectedNote) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        setIsSaving(true);
        await apiFetch(`/api/notes/${selectedNote.id}`, {
          method: "PUT",
          body: { title, body: content }
        });
        setNotes(prev => prev.map(n => n.id === selectedNote.id ? { ...n, title, body: content} : n));
      } catch (err) {
        console.error("Failed to save note:", err);
      } finally {
        setIsSaving(false);
      }
    }, 1000);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [title, content, selectedNote]);

  const handleCreateNote = async () => {
    try {
      const newNote = await apiFetch<Note>("/api/notes", {method: "POST"});
      setSelectedNote(newNote);
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  }

  const handleEditorChange = (editor: any) => {
    setContent(JSON.stringify(editor.document));
  }
  
  if (!selectedNote) {
    return (
      <div className='flex flex-col items-center justify-center h-screen w-full text-gray-500'>
        <h1 className='text-2xl font-semibold mb-4'>Hello</h1>
        <p className='mb-6 text-center text-gray-600'>
          Choose a note from the sidebar or create a new one to start writing.
        </p>
        <button
          className='px-5 py-2 bg-jotpool text-white rounded-lg hover:bg-blue-600 transition'
          onClick={handleCreateNote}>
            Create New Note
          </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen w-full p-8 bg-white overflow-y-auto'>
      {/* Title */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Untitled'
        className='text-2xl font-semibold border-none outline-none mb-4 w-full text-gray-800'
      />
      {/* Editor */}
      <div className='flex-1 p-4 min-h-[70vh]'>
        <BlockNoteView 
          editor={blockNoteEditor}
          editable={!!selectedNote}
          onChange={handleEditorChange}
        />
      </div>

      <div className='text-sm text-gray-400 mt-2 text-right'>{isSaving ? "Saving..." : "Saved"}</div>
      
    </div>
    
  )
}

export default NoteEditor