# Projectly-back

Business back end for Projectly project.

# Launch project

Open a terminal at project root and enter "npm start"

# API routes

## Accepted authentication in header

On some routes you need to be authenticated with a token (when Auth is Admin or User).

To do so, you can either put your token in "x-access-token" or in "authorization".

## Auth

### Sign-in

**Method:** POST

**Route:** /auth/signin

**Auth:** NONE

**Description:** Checks the credentials and sends an appropriate token if they are correct.

**Params:**

```js
{
    email: string, // Has to fit following format: [name]@[domain].[extension]
    password: string
}
```

**Response:**

Status: 200

```js
{
    accessToken: string
}
```

**Errors:**

Status code you can get:
- 401 if the email and password don't match.
- 403 if the corresponding user doesn't have their password set up.
- 404 if the corresponding user isn't found.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 401, 403, and 404 errors the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Forgot password

**Method:** POST

**Route:** /auth/forgot-password

**Auth:** NONE

**Description:** Sends a mail to the user with a link to change the password.

**Params:**

```js
{
    email: string // Has to fit following format: [name]@[domain].[extension]
}
```

**Response:**

Status: 201

```js
{
    message: string
}
```

**Errors:**

Status code you can get:
- 404 if the corresponding user isn't found.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Update password

**Method:** PUT

**Route:** /auth/update-password

**Auth:**

For this request you will need a token that is sent by mail.

**Description:** Modifies user's password.

**Params:**

```js
{
    password: string // Will be rejected if not strong enough
}
```

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the update cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Reset password

**Method:** PUT

**Route:** /auth/reset-password

**Auth:** Admin

**Description:** Resets the password of a user to null. It will send an email to the user to make them set their password up again.

**Params:**

```js
{
    email: string // Has to fit following format: [name]@[domain].[extension]
}
```

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the update cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

### Test routes

#### Public

**Method:** GET

**Route:** /auth/test/public

**Auth:** NONE

**Description:** Test for public content

**Params:** NONE

**Response:**

Status: 204

```js
"Public content."
```

**Errors:** NONE

#### Authenticated

**Method:** GET

**Route:** /auth/test/authenticated

**Auth:** User

**Description:** Test for authenticated user content

**Params:** NONE

**Response:**

Status: 204

```js
"Authenticated content."
```

**Errors:**

see [Auth responses](#auth-middleware-responses)

#### Personnal data

**Method:** GET

**Route:** /auth/test/my-content

**Auth:** User

**Description:** Test for authenticated user self content

**Params:** NONE

**Response:**

Status: 204

```js
"Personnal content."
```

**Errors:**

see [Auth responses](#auth-middleware-responses)

#### Personnal data

**Method:** GET

**Route:** /auth/test/admin

**Auth:** Admin

**Description:** Test for admin content

**Params:** NONE

**Response:**

Status: 204

```js
"Admin content."
```

**Errors:**

see [Auth responses](#auth-middleware-responses)

---

## Users

### Create user

**Method:** POST

**Route:** /users

**Auth:** Admin

**Description:** Creates a new user and sends them a mail for password setup.

**Params:**

```js
{
    email: string, // Has to fit following format: [name]@[domain].[extension]
    firstname: string,
    lastname: string
}
```

**Response:**

Status: 201

**Errors:**

Status code you can get:
- 409 if the create cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Get all users

**Method:** GET

**Route:** /users

**Auth:** Admin

**Description:** Returns all users.

**Params:** NONE

**Response:**

Status: 200

```js
{
    email: string,
    firstname: string,
    lastname: string,
    passwordsetup: boolean,
    isadmin: boolean
}[]
```

**Errors:**

Status code you can get:
- 404 if nothing has been found.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Get self user info

**Method:** GET

**Route:** /users/me

**Auth:** User

**Description:** Gets infos of the user corresponding to the given token and email. (They should match)

**Params:**

(If no email is provided, email decoded from the token is used)

```js
{
    email: string // Has to fit following format: [name]@[domain].[extension]
}
```

**Response:**

Status: 200

```js
{
    email: string,
    firstname: string,
    lastname: string,
    passwordsetup: boolean,
    isadmin: boolean
}
```

**Errors:**

Status code you can get:
- 404 if nothing has been found.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Modify self user info

**Method:** PUT

**Route:** /users/me

**Auth:** User

**Description:** Modifies infos of the user corresponding to the given token and email. (They should match)

**Params:**

(If no email is provided, email decoded from the token is used)

```js
{
    email: string, // Has to fit following format: [name]@[domain].[extension]
    firstname: string,
    lastname: string
}
```

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the update cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Modify any user info

**Method:** PUT

**Route:** /users

**Auth:** Admin

**Description:** Modifies infos of the user corresponding to the given email.

**Params:**

```js
{
    email: string, // Has to fit following format: [name]@[domain].[extension]
    firstname: string,
    lastname: string
}
```

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the update cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Promote user to admin

**Method:** PUT

**Route:** /users/promote

**Auth:** Admin

**Description:** Promotes given user to admin.

**Params:**

```js
{
    email: string // Has to fit following format: [name]@[domain].[extension]
}
```

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the promote cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Delete user

**Method:** DELETE

**Route:** /users

**Auth:** Admin

**Description:** Deletes the given user.

**Params:**

```js
{
    email: string // Has to fit following format: [name]@[domain].[extension]
}
```

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the delete cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

## Files

### Create file

**Method:** POST

**Route:** /files

**Auth:** User

**Description:** Creates a new file in the database.

**Params:**

```js
{
    file: File, // Has to be a file with accepted file extension (see File Extensions)
    description: string, // Max 300 characters
    typeid: number, // Has to be found in the database
    creator: string, // Has to fit following format: [name]@[domain].[extension] and has to be found in the database
    externalid: number
}
```

**Response:**

Status: 201

**Errors:**

Status code you can get:
- 400 if the file upload cannot be done for any reason.
- 409 if the create cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 400 and 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Get file

**Method:** GET

**Route:** /files/:id

**Auth:** User

**Description:** Get a specific file

**Params:** NONE

**Response:**

Status: 200

**Errors:**

Status code you can get:
- 404 if the file cannot be found.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Get all files

**Method:** GET

**Route:** /files

**Auth:** User

**Description:** Get all files found in the database

**Params:** NONE

**Response:**

Status: 200

**Errors:**

Status code you can get:
- 404 if an error occured during the search.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Modify file meta data

**Method:** PUT

**Route:** /files/:id

**Auth:** User

**Description:** Modify meta data of file corresponding to the id.

**Params:**

```js
{
    description: string, // Max 300 characters
    typeid: number // Has to be found in the database
}
```

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the info update cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Delete file

**Method:** DELETE

**Route:** /files/:id

**Auth:** User

**Description:** Delete file corresponding to the id.

**Params:** NONE

**Response:**

Status: 204

**Errors:**

Status code you can get:
- 409 if the file delete cannot be done for any reason.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 409 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

## File Extensions

Accepted files are filtered with file extensions present in the database.

### Get file extension

**Method:** GET

**Route:** /files/extensions/:id

**Auth:** User

**Description:** Get a specific file extension

**Params:** NONE

**Response:**

Status: 200

**Errors:**

Status code you can get:
- 404 if the file extension cannot be found.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Get all file extensions

**Method:** GET

**Route:** /files/extensions

**Auth:** User

**Description:** Get all file extensions found in the database

**Params:** NONE

**Response:**

Status: 200

**Errors:**

Status code you can get:
- 404 if an error occured during the search.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

## Data Types

Data types correspond to categories of file to classify them more easily.

### Get data type

**Method:** GET

**Route:** /datatypes/:id

**Auth:** User

**Description:** Get a specific data type

**Params:** NONE

**Response:**

Status: 200

**Errors:**

Status code you can get:
- 404 if the data type cannot be found.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

### Get all data types

**Method:** GET

**Route:** /datatypes

**Auth:** User

**Description:** Get all data types found in the database

**Params:** NONE

**Response:**

Status: 200

**Errors:**

Status code you can get:
- 404 if an error occured during the search.
- (see [Generic errors](#generic-errors) if you don't see the error code you got)

For 404 error the response should contain:

```js
{
    message: string // Explicit error message
}
```

---

## Generic Errors

Those are errors that occurs in multiple different routes.

### Invalid params 

This error can occur in response to every request.

It gives a 400 status code and it means that you didn't enter the right params.

Here is the response it gives:

```js
{
    errors: {
        type: string, // Error type
        msg: string, // Error message
        value: string, // Value that recieved the 
        location: string,
        path: string
    }
}
```

---

### Auth middleware responses

**400: No token provided**

This error occurs when you don't provide a token. (see [Accepted authentication in header](#accepted-authentication-in-header))

Here is the response it gives:

```js
{
    message: string // Explicit error message
}
```

---

**401: Unauthorized**

This error occurs when you do provide a token but it is not accepted.

Here is the response it gives:

```js
{
    message: string // Explicit error message
}
```

---

**403: Forbidden**

This error occurs when you do provide a token and it is accepted but the resource you are trying to access isn't for you.

Here is the response it gives:

```js
{
    message: string // Explicit error message
}
```

---

**403: Requires admin role**

This error occurs when you do provide a token and it is accepted but the resource you are trying to access is for admins only.

Here is the response it gives:

```js
{
    message: string // Explicit error message
}
```

---

**404: User not found**

This error occurs if the email given to authenticate is not is the database.

Here is the response it gives:

```js
{
    message: string // Explicit error message
}
```
