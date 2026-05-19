package com.DevProj.proj.posts.serversePost;

import com.DevProj.proj.models.Projects;
import com.DevProj.proj.models.Tag;
import com.DevProj.proj.models.Users;
import com.DevProj.proj.posts.dto.request.CreatePostRequest;
import com.DevProj.proj.posts.dto.request.TagRequest;
import com.DevProj.proj.posts.exception.NotFoundException;
import com.DevProj.proj.posts.exception.PostLenException;
import com.DevProj.proj.repository.ProjectRepo;
import com.DevProj.proj.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ServicesPosts {

    private final ProjectRepo projectRepo;
    private final UserRepo userRepo;

    public ServicesPosts(ProjectRepo projectRepo, UserRepo userRepo) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }

    public void createPost(CreatePostRequest post, Users user)
        throws RuntimeException {
        validatePost(post);
        List<Tag> tags = new ArrayList<Tag>();
        for (TagRequest tag : post.tags()) {
            tags.add(new Tag(tag.name()));
        }

        Projects pojeto = new Projects(
            post.name(),
            post.LinkGithub(),
            post.linkProjeto(),
            post.description(),
            0,
            LocalDateTime.now(),
            LocalDateTime.now(),
            tags,
            user
        );
        projectRepo.save(pojeto);
    }

    private void validatePost(CreatePostRequest post) throws RuntimeException {
        if (post.name().length() < 3 || post.name().length() > 35) {
            throw new PostLenException("name", 3, 35);
        }
        if (
            post.description().length() < 10 ||
            post.description().length() > 500
        ) {
            throw new PostLenException("description", 10, 500);
        }
        if (post.tags().size() < 1 || post.tags().size() > 10) {
            throw new PostLenException("tags", 1, 10);
        }
    }

    public void deletePost(Long id) {
        try {
            projectRepo.deleteById(id);
        } catch (EntityNotFoundException e) {
            throw new NotFoundException("Project with id = " + id);
        }
    }

    public void getPostById(Long id) {
        projectRepo
            .findById(id)
            .orElseThrow(() ->
                new NotFoundException("Project with id = " + id)
            );
    }
}
