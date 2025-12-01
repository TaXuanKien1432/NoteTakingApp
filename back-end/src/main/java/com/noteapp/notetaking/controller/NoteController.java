package com.noteapp.notetaking.controller;

import com.noteapp.notetaking.entity.Note;
import com.noteapp.notetaking.entity.User;
import com.noteapp.notetaking.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<Note>> getNotesByUser(@AuthenticationPrincipal User user) {
        List<Note> notes = noteService.getNotesByUser(user);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Note note = noteService.getNoteById(id, user);
        return ResponseEntity.ok(note);
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@AuthenticationPrincipal User user) {
        Note note = noteService.createNote(user);
        return ResponseEntity.ok(note);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note updated, @AuthenticationPrincipal User user) {
        Note note = noteService.updateNote(id, updated, user);
        return ResponseEntity.ok(note);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id, @AuthenticationPrincipal User user) {
        noteService.deleteNote(id, user);
        return ResponseEntity.noContent().build();
    }
}
