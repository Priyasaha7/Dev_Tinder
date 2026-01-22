```md
# DevTinder 🔥

A Tinder-style matching platform for developers, focused on networking, collaboration, and learning instead of dating.  
Developers can sign up, create profiles, send/receive connection requests, and build a tech-focused network.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Routers & APIs](#routers--apis)
  - [authRouter](#authrouter)
  - [profileRouter](#profilerouter)
  - [connectionRequestRouter](#connectionrequestrouter)
  - [userRouter](#userrouter)
- [Connection Request Lifecycle](#connection-request-lifecycle)
- [Quick Flow with Example](#quick-flow-with-example)

---

## Overview

DevTinder exposes a REST API built with Node.js and Express, backed by MongoDB (via Mongoose) for persistence.  
The backend is organized by feature-based routers: authentication, profile management, connection requests, and user feed/connection utilities.

---

## Routers & APIs

### authRouter

Handles authentication and session management.

- `POST /signup`  
  Create a new user account, validate input, hash password, and store the user.

- `POST /login`  
  Verify email/password, generate a JWT, and send it to the client (usually via cookies).

- `POST /logout`  
  Invalidate user session (e.g., clear auth cookie) and log the user out.

---

### profileRouter

Manages operations related to the logged-in user’s profile.

- `GET /profile/view`  
  Returns the currently logged-in user’s profile.

- `POST /profile/edit`  
  Updates user profile details (bio, skills, photo, etc.) with appropriate validation.

- `PATCH /profile/password`  
  Allows the user to change their password (after validation / verification).

---

### connectionRequestRouter

Handles sending and reviewing connection requests between users.

- `POST /request/send/interested/:userId`  
  Send a connection request to another user with status `"interested"`.

- `POST /request/send/ignored/:userId`  
  Mark another user as `"ignored"` (do not show in feed / recommendations).

- `POST /request/review/accepted/:requestId`  
  Accept a received connection request, changing its status to `"accepted"`.

- `POST /request/review/rejected/:requestId`  
  Reject a received connection request, changing its status to `"rejected"`.

---

### userRouter

Provides views around the user’s requests, connections, and discovery feed.

- `GET /user/requests/received`  
  Get all incoming connection requests for the logged-in user.

- `GET /user/connected`  
  Get all users with whom the logged-in user has an `"accepted"` connection.

- `GET /user/feed`  
  Returns a list of other users on the platform (typically paginated) to show in the “DevTinder” feed.

---

## Connection Request Lifecycle

A connection request can move through the following statuses:

- `ignore` – User chooses to ignore (no further interaction).
- `interested` – Initial state when one user sends a request to another.
- `accepted` – Receiver approves the request and a connection is established.
- `rejected` – Receiver declines the request.

Simple visual flow:

```text
STATUS: ignore, interested
                 /      \
          accepted      rejected
```

Typical path:

1. User A sees User B in `/user/feed`.
2. User A sends a request using  
   `POST /request/send/interested/:userId`.
3. User B checks pending requests using  
   `GET /user/requests/received`.
4. User B either:
   - Accepts: `POST /request/review/accepted/:requestId` → they become connections.
   - Rejects: `POST /request/review/rejected/:requestId` → request is closed.

---

## Quick Flow with Example

1. **Signup & Login**
   - `POST /signup`
   - `POST /login`

2. **View & Edit Profile**
   - `GET /profile/view`
   - `POST /profile/edit`
   - `PATCH /profile/password`

3. **Discover Developers**
   - `GET /user/feed`

4. **Connection Requests**
   - Send interest: `POST /request/send/interested/:userId`
   - Ignore: `POST /request/send/ignored/:userId`
   - View received: `GET /user/requests/received`
   - Accept: `POST /request/review/accepted/:requestId`
   - Reject: `POST /request/review/rejected/:requestId`

5. **Connections**
   - `GET /user/connected`

This section can be expanded later with authentication details, request/response examples, and diagrams as the project grows.
```