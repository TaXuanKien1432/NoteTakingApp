package com.noteapp.notetaking.repository;

import com.noteapp.notetaking.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByOwnerId(Long ownerId);
    Optional<Note> findByOwnerIdAndId(Long ownerId, Long noteId);
}
