import React, { useState } from 'react'
import type { Note } from '../pages/Home'
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { apiFetch } from '../services/api';

interface NoteEditorProps {
  note: Note | null;
  refreshSidebar: () => void;
}

const NoteEditor = ({note, refreshSidebar}: NoteEditorProps) => {
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editor, setEditor] = useState<any>(null);

  const blockNoteEditor = useCreateBlockNote({
    initialContent: note?.body ? JSON.parse(note.body) : undefined,
  });

  const saveNote = async (contentJSON: string) => {
    if (!note) return;
    try {
      setIsSaving(true);
      await apiFetch(`/api/notes/${note.id}`, {
        method: "PUT",
        body: { title, body: contentJSON }
      });
      refreshSidebar();
    } catch (err) {
      console.error("Failed to save note:", err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <BlockNoteView 
      editor={blockNoteEditor}
      editable={!!note}
      onChange={async (editor) => {
        if (!note) return;
        const contentJSON = JSON.stringify(editor.document);
        await saveNote(contentJSON);
      }}
      />
  )
}

export default NoteEditor