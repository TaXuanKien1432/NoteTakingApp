package com.noteapp.notetaking.repository;

import com.noteapp.notetaking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByGithubId(String githubId);
}
