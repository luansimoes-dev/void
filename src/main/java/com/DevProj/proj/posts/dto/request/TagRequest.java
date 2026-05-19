package com.DevProj.proj.posts.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TagRequest(@NotBlank String name) {}
