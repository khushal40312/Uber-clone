# Day 1 – Backend Setup & User Authentication

Welcome to **Day 1** of my **#100DaysOfCode** journey! 🚀

## ✅ What I Did Today

- Initialized the backend project using **Node.js** and **Express**.
- Set up **user authentication** with:
  - **Registration**
  - **Login**
  - **Logout**
  - **Profile retrieval**
- Implemented **input validation** with `express-validator`.
- Used **JWT tokens** for secure authentication.
- Added **token blacklisting** for secure logout.

## 🔐 Routes Implemented

| Method | Route         | Description          |
|--------|---------------|----------------------|
| POST   | `/register`   | Register a new user  |
| POST   | `/login`      | Login existing user  |
| GET    | `/profile`    | Get user profile     |
| GET    | `/logout`     | Logout user          |

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Express Validator
- Cookies for token storage

## 🧠 Lessons Learned

- Middleware setup for auth checks
- Structuring Express routes and controllers
- Secure cookie handling and blacklisting tokens

---

📅 More updates coming soon as I continue this 100-day journey!


# Day 2 – Captain Module (Driver Auth)

Welcome to **Day 2** of my **#100DaysOfCode** challenge! 🚀

## ✅ What I Did Today

- Created **Captain model** with:
  - Full name
  - Email & password
  - Vehicle details (color, plate, capacity, type)
  - Location & status
- Built secure **Captain registration**, **login**, **logout**, and **profile** routes.
- Implemented:
  - JWT-based authentication with 24h expiry
  - Token blacklisting on logout
  - Express Validator for input validation
- Added middleware for captain-specific authentication.

## 🧠 Key Features

- Captains can:
  - Register with vehicle details
  - Log in securely
  - Access their profile
  - Log out (and invalidate token)
- Passwords are hashed using **bcrypt**
- Tokens are securely handled using **cookies**

## 🔐 Captain Routes

| Method | Route         | Description                |
|--------|---------------|----------------------------|
| POST   | `/captain/register` | Register a new captain      |
| POST   | `/captain/login`    | Login existing captain      |
| GET    | `/captain/profile`  | Get captain's profile       |
| GET    | `/captain/logout`   | Logout the captain          |

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- bcrypt for hashing
- JWT for authentication
- express-validator for validation
- Cookie-based session tokens

## 🧠 Lessons Learned

- Nested schema design for structured data (like vehicle info)
- Role-specific middleware (`authCaptain`)
- Server-side form validation
- Token management and logout security

---

📅 On to Day 3 tomorrow! Thinking about ride requests or captain location updates next.

