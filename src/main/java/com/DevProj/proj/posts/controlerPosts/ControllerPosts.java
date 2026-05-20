package com.DevProj.proj.posts.controlerPosts;

import com.DevProj.proj.models.Users;
import com.DevProj.proj.posts.dto.request.CreatePostRequest;
import com.DevProj.proj.posts.dto.response.ProjectsReponse;
import com.DevProj.proj.posts.serversePost.ServicesPosts;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class ControllerPosts {

    private final ServicesPosts servicesPosts;

    public ControllerPosts(ServicesPosts servicesPosts) {
        this.servicesPosts = servicesPosts;
    }

    @PostMapping("/new")
    public void createPost(
        @Valid @RequestBody CreatePostRequest post,
        @AuthenticationPrincipal Users user
    ) throws RuntimeException {
        servicesPosts.createPost(post, user);
    }

    @GetMapping
    public Page<ProjectsReponse> getAllPosts(
        @AuthenticationPrincipal Users user,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return servicesPosts.getAllPosts(user, page, size);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        servicesPosts.deletePost(id);
    }

    @GetMapping("/{id}")
    public void getPostById(@PathVariable Long id) {
        servicesPosts.getPostById(id);
    }
}
