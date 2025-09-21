package com.noteapp.notetaking.service;

import com.noteapp.notetaking.dto.NoteRequestDTO;
import com.noteapp.notetaking.dto.NoteResponseDTO;
import com.noteapp.notetaking.entity.Note;
import com.noteapp.notetaking.entity.User;
import com.noteapp.notetaking.repository.NoteRepository;
import com.noteapp.notetaking.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {
    private final UserRepository userRepository;
    private final NoteRepository noteRepository;

    public NoteService(UserRepository userRepository, NoteRepository noteRepository) {
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
    }

    public NoteResponseDTO createNote(Long ownerId, NoteRequestDTO noteRequestDTO) {
        User owner = userRepository.findById(ownerId).orElseThrow(() -> new RuntimeException("User not found"));

        Note note = new Note();
        note.setOwner(owner);
        note.setTitle(noteRequestDTO.getTitle());
        note.setBody(noteRequestDTO.getBody());

        Note created = noteRepository.save(note);
        return mapToDTO(created);
    }

    public List<NoteResponseDTO> getNotes(Long ownerId) {
        return noteRepository.findByOwnerId(ownerId).stream().map(this::mapToDTO).toList();
    }

    public NoteResponseDTO getNote(Long noteId, Long ownerId) {
        Note note = noteRepository.findByOwnerIdAndId(ownerId, noteId).orElseThrow(() -> new RuntimeException("Note not found"));
        return mapToDTO(note);
    }

    public NoteResponseDTO updateNote(Long noteId, Long ownerId, NoteRequestDTO noteRequestDTO) {
        Note note = noteRepository.findByOwnerIdAndId(ownerId, noteId).orElseThrow(() -> new RuntimeException("Note not found"));
        note.setTitle(noteRequestDTO.getTitle());
        note.setBody(noteRequestDTO.getBody());

        Note updated = noteRepository.save(note);
        return mapToDTO(updated);
    }

    public void deleteNote(Long noteId, Long ownerId) {
        Note note = noteRepository.findByOwnerIdAndId(ownerId, noteId).orElseThrow(() -> new RuntimeException("Note not found"));
        noteRepository.delete(note);
    }

    private NoteResponseDTO mapToDTO(Note note) {
        return new NoteResponseDTO(
                note.getId(),
                note.getTitle(),
                note.getBody(),
                note.getCreatedAt(),
                note.getUpdatedAt()
        );
    }
}
