package com.DevProj.proj.posts.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record ProjectsReponse(
    String title,
    String description,
    List<String> tags,
    UserResponse user,
    String githubLink,
    String demoLink,
    Boolean thisUserIsOwner,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
