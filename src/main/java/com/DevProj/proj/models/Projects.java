package com.DevProj.proj.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "Projects")
public class Projects {

    public Projects() {}

    public Projects(
        String name,
        String github_url,
        String link_url,
        String description,
        int likes,
        LocalDateTime created_at,
        LocalDateTime updated_at,
        List<Tag> tags,
        Users owner
    ) {
        this.name = name;
        this.github_url = github_url;
        this.link_url = link_url;
        this.description = description;
        this.likes = likes;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.tags = tags;
        this.owner = owner;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String github_url;

    private String link_url;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private int likes;

    @Column(nullable = false)
    private LocalDateTime created_at;

    @Column(nullable = false)
    private LocalDateTime updated_at;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "has_tag",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Users owner;

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "projectId")
    private java.util.List<Comments> comments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGithub_url() {
        return github_url;
    }

    public void setGithub_url(String github_url) {
        this.github_url = github_url;
    }

    public String getLink_url() {
        return link_url;
    }

    public void setLink_url(String link_url) {
        this.link_url = link_url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public Users getOwner() {
        return owner;
    }

    public void setOwner(Users owner) {
        this.owner = owner;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public java.util.List<Comments> getComments() {
        return comments;
    }

    public void setComments(java.util.List<Comments> comments) {
        this.comments = comments;
    }
}
