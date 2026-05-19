package com.DevProj.proj.repository;

import com.DevProj.proj.models.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Projects, Long> {}
