# DevTinder 🔥

A **Tinder-like** matching platform for developers, focused on networking, collaboration, and learning rather than dating.  
Users sign up, create profiles, send/receive connection requests, and build a network of developers based on skills, interests, and tech stack. [github](https://github.com/harshmann10/DevTinder-backend)

---

## Table of Contents

- Project Overview
- Features
- System Design Diagram
- Tech Stack
- Project Structure
- Getting Started
- Available Scripts
- API Design
- Authentication & Authorization
- Database & Models
- Validation, Security & Error Handling
- Dev Notes / Learnings
- Future Enhancements

---

## Project Overview

DevTinder is a REST API backend built with Node.js, Express, MongoDB, and Mongoose.  
It exposes routes for authentication, profile management, connection requests, and feed discovery, and is designed to be consumed by a web or mobile frontend. [github](https://github.com/sohamkamani/node-express-mongo-example)

---

## Features

- User signup, login, logout with JWT-based authentication and HTTP-only cookies. [dev](https://dev.to/alexmercedcoder/auth-with-express-with-jwt-mongodb-and-postgres-4a5)
- Profile creation and editing (bio, skills, photo, gender, etc.). [github](https://github.com/libeyondea/backend-node-express/blob/main/README.md)
- Send/receive connection requests (interested / ignored / accepted / rejected). [github](https://github.com/harshmann10/DevTinder-backend)
- View received requests, accepted connections, and a paginated “feed” of other users. [github](https://github.com/bezkoder/node-express-mongodb)
- Robust validation using Mongoose schema validations and the `validator` library. [github](https://github.com/maitraysuthar/rest-api-nodejs-mongodb/blob/master/README.md)
- Password hashing using `bcrypt` for secure storage. [github](https://github.com/PraneshASP/node-authentication-jwt-mongodb)
- Cookie-based session with JWT expiry (7 days) and user auth middleware. [geeksforgeeks](https://www.geeksforgeeks.org/node-js/how-to-implement-jwt-authentication-in-express-js-app/)
- Modular routing using `express.Router` for auth, profile, request, and user-related endpoints. [github](https://github.com/libeyondea/backend-node-express/blob/main/README.md)

---

## System Design Diagram

You can add a diagram (e.g., via Excalidraw / Mermaid) that conceptually looks like this:

- **Client (Postman / Frontend App)**  
  → sends HTTP requests with JSON body and cookies

- **Express Server (app.js)**
  - Parses JSON using `express.json()`
  - Parses cookies using `cookie-parser`
  - Routes requests to:
    - `authRouter`
    - `profileRouter`
    - `requestRouter`
    - `userRouter`
  - Applies middlewares:
    - Logging / validation middlewares
    - `userAuth` for protected routes
    - Error-handling middleware

- **MongoDB (Atlas)**
  - Collections:
    - `users`
    - `connectionRequests`
  - Accessed using Mongoose models and queries (`find`, `findOne`, `findOneAndUpdate`, etc.). [github](https://github.com/sohamkamani/node-express-mongo-example)

(Use a simple architecture diagram in your README image section later.)

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Auth:** JSON Web Tokens (JWT) + HTTP-only cookies
- **Validation:** `validator`, Mongoose schema validations
- **Dev Tools:** nodemon, Postman

---

## Project Structure

```bash
devTinder/
│
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection logic
│   ├── middleWare/           # Custom middlewares (auth, validation, etc.)
│   ├── models/               # Mongoose schemas & models (User, ConnectionRequest)
│   ├── routers/
│   │   ├── auth.js           # /signup, /login, /logout
│   │   ├── profile.js        # /profile routes
│   │   ├── request.js        # connection request routes
│   │   └── user.js           # feed, requests, connections
│   ├── utils/                # helpers (JWT, error handling, etc.)
│   ├── app.js                # main Express app (entry point)
│   ├── errorHandling.js      # central error-handling utilities
│   └── multipleRouteHandellers.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

Your current `app.js` (simplified) looks like:

```js
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url> devTinder
cd devTinder

# Initialize npm (if not done)
npm init -y

# Install dependencies
npm install express mongoose cookie-parser jsonwebtoken bcrypt validator
npm install --save-dev nodemon
```

- `dependencies` are packages required in production (e.g., express, mongoose).
- `devDependencies` are used only in development (e.g., nodemon). [github](https://github.com/maitraysuthar/rest-api-nodejs-mongodb/blob/master/README.md)

### 2. Scripts (`package.json`)

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```

- `nodemon` automatically restarts the server when files change. [github](https://github.com/FortechRomania/express-mongo-example-project/blob/master/README.md)
- `npm install -g <package>` installs a package **globally**, making its binary available from any project (useful for tools like nodemon), but it does not add it to the current project's `package.json`. [github](https://github.com/FortechRomania/express-mongo-example-project/blob/master/README.md)

### 3. Version ranges: `^` vs `~`

- `^1.2.3` → allows updates that do not change the **major** version (e.g., 1.3.0, 1.9.9).
- `~1.2.3` → allows updates only within the same **minor** version (e.g., 1.2.4, 1.2.9). [github](https://github.com/FortechRomania/express-mongo-example-project/blob/master/README.md)

---

## API Design

### Route Groups

#### `authRouter`

- `POST /signup` – Create a new user (validated, password hashed, saved to DB). [github](https://github.com/PraneshASP/node-authentication-jwt-mongodb)
- `POST /login` – Verify email + password, generate JWT, send token in HTTP-only cookie. [dev](https://dev.to/alexmercedcoder/auth-with-express-with-jwt-mongodb-and-postgres-4a5)
- `POST /logout` – Clear auth cookie.

#### `profileRouter`

- `GET /profile/view` – Get current user’s profile (protected).
- `PATCH /profile/edit` – Update profile fields (with validation).
- `PATCH /profile/password` – Change/forgot password.

#### `connectionRequestRouter`

- `POST /request/send/interested/:userId`
- `POST /request/send/ignored/:userId`
- `POST /request/review/accepted/:requestId`
- `POST /request/review/rejected/:requestId`

Includes logic and validations around status transitions:  
`ignore`, `interested` → `accepted` / `rejected`.

#### `userRouter`

- `GET /user/requests/received` – All pending requests for logged‑in user.
- `GET /user/connections` – All accepted connections.
- `GET /user/feed` – Paginated feed of other users.

Example for pagination:

- `/feed?page=1&limit=10` → `.skip(0).limit(10)`
- `/feed?page=2&limit=10` → `.skip(10).limit(10)`
- General formula: `skip = (page - 1) * limit`. [github](https://github.com/bezkoder/node-express-mongodb)

---

## Authentication & Authorization

- Passwords are hashed with `bcrypt.hash()` before saving. [github](https://github.com/maitraysuthar/rest-api-nodejs-mongodb/blob/master/README.md)
- Login endpoint validates credentials, then creates a JWT token with a 7‑day expiry. [geeksforgeeks](https://www.geeksforgeeks.org/node-js/how-to-implement-jwt-authentication-in-express-js-app/)
- Token is sent as an HTTP‑only cookie and read on subsequent requests.
- `userAuth` middleware:
  - Reads and verifies JWT from cookies.
  - Attaches user data to `req.user`.
  - Blocks unauthenticated access to protected endpoints. [dev](https://dev.to/alexmercedcoder/auth-with-express-with-jwt-mongodb-and-postgres-4a5)

Example rules:

- Global userAuth for most user routes.
- `/user/login` and `/signup` are public.
- Admin-only middleware can be added for admin routes (dummy middleware now).

---

## Database & Models

### User Schema (examples)

- Fields: name, email, password, gender, skills, about, photoURL, etc.
- Schema options:
  - `required`, `unique`, `lowercase`, `trim`, `min`, `minLength`, `default`. [github](https://github.com/bezkoder/node-express-mongodb)
- Custom validators:
  - Gender validation (e.g., only allow `"male"`, `"female"`, `"other"`).
  - Email, URL, and password validation using `validator`. [github](https://github.com/libeyondea/backend-node-express/blob/main/README.md)
- Methods:
  - `userSchema.methods.getJWT()` – returns signed JWT for user. [geeksforgeeks](https://www.geeksforgeeks.org/node-js/how-to-implement-jwt-authentication-in-express-js-app/)
  - `userSchema.methods.comparePassword(passwordInput)` – compares plaintext password with hashed password.

### ConnectionRequest Schema

- Stores sender, receiver, status, timestamps.
- Uses `ref` to `User` model and `populate` for richer queries (e.g., `populate("fromUser toUser")`). [github](https://github.com/bezkoder/node-express-mongodb)
- Uses `schema.pre("save")` for pre-save logic (e.g., validation, normalization). [github](https://github.com/bezkoder/node-express-mongodb)

### Indexes

- Indexes on frequently queried fields (e.g., `email`, combination of `fromUser` + `toUser`). [github](https://github.com/maitraysuthar/rest-api-nodejs-mongodb/blob/master/README.md)
- Compound indexes improve query performance but increase write cost and storage. [github](https://github.com/harshmann10/DevTinder-backend)

---

## Validation, Security & Error Handling

- `express.json()` parses JSON body; JS object vs JSON:
  - JSON is a text format, JS object is an in-memory data structure.
- Request-level validation:
  - Every POST/PATCH route validates fields (never trust `req.body`). [github](https://github.com/libeyondea/backend-node-express/blob/main/README.md)
  - Uses `validator` to check email, password strength, photo URL, etc. [github](https://github.com/libeyondea/backend-node-express/blob/main/README.md)
- Error handling:
  - Custom error-handling middleware: `app.use((err, req, res, next) => { ... })`. [dev](https://dev.to/alexmercedcoder/auth-with-express-with-jwt-mongodb-and-postgres-4a5)
  - Uses `next(err)` chain in multiple route handlers to propagate errors.
- Difference between **PATCH** vs **PUT**:
  - `PATCH` partially updates a resource (only specified fields).
  - `PUT` replaces a resource entirely. [github](https://github.com/maitraysuthar/rest-api-nodejs-mongodb/blob/master/README.md)

---

## Dev Notes / Learnings

Some of the concepts practiced in this project:

- Initializing Node project, setting up `package.json`, understanding `dependencies` vs `devDependencies`. [github](https://github.com/sohamkamani/node-express-mongo-example)
- Installing Express and creating a basic server that listens on port `7777` with `/`, `/hello`, `/test` handlers. [github](https://github.com/sohamkamani/node-express-mongo-example)
- Route order and matching, path patterns, and the effect of `?`, `+`, `*`, `()`, and regex-based routes like `/a/` or `/.*fly$/`. [github](https://github.com/FortechRomania/express-mongo-example-project/blob/master/README.md)
- Multiple route handlers and `next()` usage, and the difference between `app.use()` and `app.all()`. [geeksforgeeks](https://www.geeksforgeeks.org/node-js/how-to-implement-jwt-authentication-in-express-js-app/)
- CRUD APIs (GET, POST, PATCH, DELETE) tested via Postman collections and workspaces. [github](https://github.com/bezkoder/node-express-mongodb)
- Connecting to MongoDB Atlas using Mongoose before starting the server. [github](https://github.com/sohamkamani/node-express-mongo-example)
- Exploring query operators: `$or`, `$and`, `$nin`, `$ne`, etc., and using them in building queries like `/feed` and connection logic. [github](https://github.com/bezkoder/node-express-mongodb)

---

## Future Enhancements

- Add rate limiting and CORS configuration. [github](https://github.com/libeyondea/backend-node-express/blob/main/README.md)
- Add refresh tokens and better session management. [github](https://github.com/PraneshASP/node-authentication-jwt-mongodb)
- Build a frontend (React / Next.js) to consume this API. [linkedin](https://www.linkedin.com/posts/rohit-kumar-morya-6a1375202_nodejs-expressjs-mongodb-activity-7395869048280039424-DGBE)
- Add unit/integration tests with Jest or Mocha. [github](https://github.com/libeyondea/backend-node-express/blob/main/README.md)

---

# DevTinder – Complete Deployment & AWS SES Notes

> **Beginner‑friendly, end‑to‑end guide** covering everything done from scratch: EC2 setup, frontend & backend deployment, NGINX reverse proxy, PM2, `/api` proxying, update workflow, AWS SES email setup, and cron jobs.
>
> This README is **reusable for any Node.js + React project**.

---

## 🔷 Architecture Overview

**Stack**

- Frontend: React (Vite)
- Backend: Node.js (Express)
- Database: MongoDB Atlas
- Server: AWS EC2 (Ubuntu)
- Process Manager: PM2
- Web Server / Reverse Proxy: NGINX
- Email: AWS SES
- Jobs: node-cron

**Request Flow**

```
Browser → NGINX (80/443)
        ├─ /        → React build (static files)
        └─ /api     → proxy_pass → Node.js (7777)
```

**URLs**

```
Frontend (IP)        : http://<EC2_PUBLIC_IP>/
Backend (Direct)    : http://<EC2_PUBLIC_IP>:7777   (internal use)
Domain (optional)   : https://devtinder.com
API (via proxy)     : https://devtinder.com/api
```

---

## 1️⃣ Prerequisites (Local)

- Git installed
- Node.js installed (prefer same major version as server)

  ```bash
  node -v
  npm -v
  ```

- Frontend & Backend pushed to GitHub

---

## 2️⃣ AWS EC2 Setup

### Launch Instance

- Create AWS account
- Launch **Ubuntu** EC2
- Download PEM key

### Connect to EC2

```bash
chmod 400 devTinder-secret.pem
ssh -i "devTinder-secret.pem" ubuntu@<EC2_PUBLIC_IP>
```

---

## 3️⃣ Server Basic Setup

```bash
sudo apt update
```

> Ensure Node.js version is compatible with your local setup (minor mismatch is OK for college projects).

---

## 4️⃣ Frontend Deployment (React + Vite)

### Clone & Install

```bash
git clone https://github.com/Priyasaha7/Dev_Tinder_Web.git
cd Dev_Tinder_Web
npm install
```

### Build

```bash
npm run build
```

> Output is generated in `dist/`

---

## 5️⃣ Install & Configure NGINX

### Install & Start

```bash
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Copy Build to NGINX

```bash
sudo cp -r dist/* /var/www/html/
```

### Open Port 80 (AWS Security Group)

- Inbound Rule → HTTP → Port 80 → `0.0.0.0/0`

---

## 6️⃣ Backend Deployment (Node + Express)

### Clone Backend

```bash
git clone https://github.com/Priyasaha7/Dev_Tinder.git
cd Dev_Tinder
npm install
```

### Environment Variables

Create `.env`:

```env
DB_USERNAME=...
DB_PASSWORD=...
DB_HOST=...
```

### MongoDB Atlas

- Network Access → Add EC2 Public IP (`curl ifconfig.me`)

### Test Backend

```bash
npm start
```

Expected:

```
Database connected
Server running on port 7777
```

---

## 7️⃣ PM2 (Process Manager)

### Install & Run

```bash
sudo npm install -g pm2
pm2 start npm --name "devTinder-backend" -- start
```

### Useful Commands

```bash
pm2 list
pm2 logs devTinder-backend
pm2 restart devTinder-backend
pm2 stop devTinder-backend
pm2 delete devTinder-backend
```

### Auto‑start on Reboot

```bash
pm2 startup
pm2 save
```

---

## 8️⃣ NGINX Reverse Proxy (`/api → backend`)

Edit config:

```bash
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
  listen 80;
  server_name devtinder.com www.devtinder.com;

  location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location / {
    root /var/www/html;
    index index.html;
    try_files $uri /index.html;
  }
}
```

Apply:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 9️⃣ Frontend API Base URL

**Before (local)**

```js
const BASE_URL = "http://localhost:7777";
```

**After (production)**

```js
const BASE_URL = "/api";
```

Rebuild & deploy:

```bash
npm run build
sudo cp -r dist/* /var/www/html/
sudo systemctl reload nginx
```

---

## 🔁 Updating Code Later

### Frontend

```bash
git pull
npm run build
sudo cp -r dist/* /var/www/html/
```

### Backend

```bash
git pull
npm install   # if deps changed
pm2 restart devTinder-backend
```

---

## 🔟 AWS SES – Email Setup

### IAM User

- Create IAM user (programmatic access)
- Attach policy: `AmazonSESFullAccess`
- Generate Access Key & Secret

### SES (Sandbox Mode)

- Region: `ap-south-1`
- Verify **FROM** and **TO** email addresses

### Environment Variables

```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=XXXX
AWS_SECRET_ACCESS_KEY=XXXX
SES_FROM_EMAIL=verified_email@gmail.com
```

---

## 1️⃣1️⃣ SES Client

```js
const { SESClient } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = sesClient;
```

---

## 1️⃣2️⃣ Send Email Utility

```js
const { SendEmailCommand } = require("@aws-sdk/client-ses");
const sesClient = require("./sesClient");

const sendEmail = async ({ to, subject, body }) => {
  try {
    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Text: { Data: body, Charset: "UTF-8" } },
      },
    });

    await sesClient.send(command);
    return true;
  } catch (err) {
    console.error("SES error:", err.message);
    return false;
  }
};

module.exports = sendEmail;
```

---

## 1️⃣3️⃣ Cron Job (Daily Reminder)

```js
cron.schedule(
  "0 8 * * *",
  async () => {
    try {
      const yesterday = subDays(new Date(), 1);

      const requests = await ConnectionRequest.find({
        status: "interested",
        createdAt: {
          $gte: startOfDay(yesterday),
          $lt: endOfDay(yesterday),
        },
      }).populate("toUserId");

      const emails = [...new Set(requests.map((r) => r.toUserId.emailID))];

      for (const email of emails) {
        await sendEmail({
          to: email,
          subject: "New Connection Request",
          body: "You have pending requests on DevTinder.",
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
  { timezone: "Asia/Kolkata" },
);
```

---

## ⚠️ SES Sandbox Notes

- FROM email must be verified
- TO email must be verified
- Perfect for demos & college projects

---

## 🔐 Security Best Practices

- Do **not** expose port `7777`
- Open only: `22`, `80`, `443`
- Never commit `.env`
- Never expose AWS keys to frontend

---

## ✅ Final Result

- Frontend served by NGINX
- Backend secured behind `/api`
- PM2 keeps backend alive
- SES emails working
- Production‑ready learning setup

---

🎯 **This document can be reused as a deployment template for any future Node + React project.**

**Author:** Priya Saha  
**Status:**

- ✅ Project initialized
- ✅ Express server and MongoDB connected
- ✅ Auth, profile, request, and user routers structured
- 🔄 Continuously adding features, validations, and optimizations.
