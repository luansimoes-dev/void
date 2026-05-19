create table Users (
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    bio text,
    role varchar(255) not null,
    avatar_url varchar(255) not null,
    email varchar(255) not null unique,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);
create table Tag (
    id serial primary key,
    name varchar(255) not null
);

create table Projects (
    id serial primary key,
    name varchar(255) not null,
    github_url varchar(255) not null,
    link_url varchar(255),
    description text,
    likes int not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    owner_id int not null,
    foreign key (owner_id) references Users(id)
);
create table has_tag (
    project_id int not null,
    tag_id int not null,
    primary key (project_id, tag_id),
    foreign key (project_id) references Projects(id),
    foreign key (tag_id) references Tag(id)
);
create table Comments (
    id serial primary key,
    content text not null,
    user_id int not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    project_id int not null,
    foreign key (user_id) references Users(id),
    foreign key (project_id) references Projects(id)
);
