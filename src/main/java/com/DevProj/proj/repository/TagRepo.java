package com.DevProj.proj.repository;

import com.DevProj.proj.models.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepo extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);
}
