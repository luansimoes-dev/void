DROP TABLE has_tag;

CREATE TABLE has_tag (
    project_id int not null,
    tag_id int not null,
    primary key (project_id, tag_id),
    foreign key (project_id) references Projects(id),
    foreign key (tag_id) references Tag(id)
);
