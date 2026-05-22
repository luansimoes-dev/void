package com.DevProj.proj.posts.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record CreatePostRequest(
    @NotBlank String name,
    String LinkGithub,
    String linkProjeto,
    @NotBlank String description,
    List<TagRequest> tags
) {}
