package com.DevProj.proj.dtosGlobal;

public record UserDTO(
    boolean isAdmin,
    String name,
    Long id,
    String photo,
    String email
) {}
