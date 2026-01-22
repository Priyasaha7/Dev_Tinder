```md
# DevTinder – API Overview

DevTinder is a backend API that connects developers through profiles and connection requests, similar to Tinder but focused on collaboration and networking.

---

## Auth Router (`/`)

- `POST /signup`  
  Create a new user account.

- `POST /login`  
  Log in an existing user and issue an auth token.

- `POST /logout`  
  Log out the current user and clear auth state.

---

## Profile Router (`/profile`)

- `GET /profile/view`  
  Get the currently logged‑in user's profile.

- `PATCH /profile/edit`  
  Update selected profile fields (bio, skills, photo, etc.).

- `PATCH /profile/password`  
  Change or reset the user's password.

---

## Connection Request Router (`/request`)

- `POST /request/send/interested/:userId`  
  Send a connection request showing interest in a user.

- `POST /request/send/ignored/:userId`  
  Mark a user as ignored (no interest).

- `POST /request/review/accepted/:requestId`  
  Accept a received connection request.

- `POST /request/review/rejected/:requestId`  
  Reject a received connection request.

**Request status flow:**

`ignore | interested` → `accepted | rejected`

---

## User Router (`/user`)

- `GET /user/requests/received`  
  Get all pending connection requests received by the logged‑in user.

- `GET /user/connected`  
  Get all accepted connections (developer network).

- `GET /user/feed`  
  Get a feed of other user profiles available on the platform (with filters/pagination in query params).
```