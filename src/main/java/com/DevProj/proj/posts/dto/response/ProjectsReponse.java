package com.DevProj.proj.posts.dto.response;

import com.DevProj.proj.dtosGlobal.UserDTO;
import java.time.LocalDateTime;

public record ProjectsReponse(
    String titulo,
    UserDTO user,
    String descricao,
    int likes,

    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
