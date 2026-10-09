package com.baggagetrack.service;

import com.baggagetrack.entity.User;
import com.baggagetrack.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {

        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(
            String email) {

        return userRepository.findByEmail(email);
    }

    public void deleteUser(Long id) {

        userRepository.deleteById(id);
    }
}