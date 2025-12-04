import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import NoteEditor from '../components/NoteEditor'

export interface Note {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const Home:React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar 
        key={refreshKey}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}/>
      <NoteEditor 
        note={selectedNote}
        refreshSidebar={() => setRefreshKey((prev) => prev+1)}/>
    </div>
  )
}

export default Home