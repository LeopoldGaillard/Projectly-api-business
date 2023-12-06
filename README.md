# Projectly-back

Business back end for Projectly project.

# Launch project

Open a terminal at project root and enter "npm start"

# API methods

## Authentification

| Method | URL | Action | Auth
|---|---|---|---|
| POST | api/auth/signin | identification | NONE

## Users

| Method | URL | Action | Auth
|---|---|---|---|
| GET | api/users | fetch all users | ADMIN
| GET | api/users/me | fetch our account infos | USER