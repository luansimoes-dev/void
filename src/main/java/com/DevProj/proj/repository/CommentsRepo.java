package com.DevProj.proj.repository;

import com.DevProj.proj.models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepo extends JpaRepository<Comments, Long> {}
