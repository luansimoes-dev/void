package com.DevProj.proj.repository;

import com.DevProj.proj.models.Users;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
}
