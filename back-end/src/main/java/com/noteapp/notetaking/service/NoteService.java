package com.noteapp.notetaking.service;

import com.noteapp.notetaking.entity.Note;
import com.noteapp.notetaking.entity.User;
import com.noteapp.notetaking.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getNotesByUser(User user) {
        return noteRepository.findAllByOwnerOrderByUpdatedAtDesc(user);
    }

    public Note getNoteById(Long id, User user) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));
        if (!note.getOwner().getId().equals(user.getId())) {
            throw new SecurityException("You do not have access to this note");
        }
        return note;
    }

    public Note createNote(User user) {
        Note note = new Note();
        note.setOwner(user);
        note.setTitle("Untitled");
        note.setBody("[]");
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note updated, User user) {
        Note note = getNoteById(id, user);
        note.setTitle(updated.getTitle());
        note.setBody(updated.getBody());
        return noteRepository.save(note);
    }

    public void deleteNote(Long id, User user) {
        Note note = getNoteById(id, user);
        noteRepository.delete(note);
    }
}
