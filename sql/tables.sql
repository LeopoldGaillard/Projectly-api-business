create table if not exists Users (
    Email varchar(320) unique NOT NULL,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    Password varchar(256),
    PasswordSetup BOOLEAN NOT NULL,
    IsAdmin BOOLEAN NOT NULL,

    primary key (Email),

    constraint nonempty_email check (char_length(coalesce(Email, '')) > 0),
    constraint proper_email CHECK (email ~* '^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'),
    constraint nonempty_firstname check (char_length(coalesce(FirstName, '')) > 0),
    constraint nonempty_lastname check (char_length(coalesce(LastName, '')) > 0),
    constraint tooshort_newpassword check (char_length(coalesce(Password, '')) > 8 OR PasswordSetup),
    constraint admin_needspassword check (NOT (PasswordSetup AND IsAdmin))
);

create table if not exists FileExtensions (
    extension_id serial unique NOT NULL,
    ext_name varchar(20),

    primary key (extension_id)
);

create table if not exists DataTypes (
    type_id serial unique NOT NULL,
    type_name varchar(20),

    primary key (type_id)
);

create table if not exists Files (
    file_id serial unique NOT NULL,
    title varchar(100) NOT NULL,
    file_desc varchar(300) NOT NULL,
    file_url varchar(100) NOT NULL,
    file_ext_id integer NOT NULL,
    data_type_id integer NOT NULL,
    creator_name varchar(100) NOT NULL,
    external_id integer unique NOT NULL,

    primary key (file_id),

    constraint fk_file1 foreign key (file_ext_id) references FileExtensions(extension_id),
    constraint fk_file2 foreign key (data_type_id) references DataTypes(type_id),

    constraint nonempty_title check (char_length(coalesce(title, '')) > 0),
    constraint nonempty_file_desc check (char_length(coalesce(file_desc, '')) > 0),
    constraint nonempty_creator_name check (char_length(coalesce(creator_name, '')) > 0)
);