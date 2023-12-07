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
    constraint admin_needspassword check (PasswordSetup AND IsAdmin)
);
