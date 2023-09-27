package com.epicode.Spring.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.epicode.Spring.model.User_role;
import com.epicode.Spring.security.entity.Role;
import com.epicode.Spring.security.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    
    @Query("SELECT u.id AS user_id, r.id AS role_id FROM User u JOIN u.roles r WHERE u.id = ?1")
    List<Object[]> findUserRolesIdsByUserId(Long userId);
    
}


