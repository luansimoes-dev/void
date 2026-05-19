package com.DevProj.proj.posts.dto.response;

import com.DevProj.proj.posts.dto.request.TagRequest;
import com.DevProj.proj.posts.dto.request.UserOwnerPost;
import java.time.LocalDateTime;
import java.util.List;

public record PostRequest(
    String name,
    String LinkGithub,
    String linkProjeto,
    long likes,
    String description,
    List<TagRequest> tags,
    UserOwnerPost owner,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
