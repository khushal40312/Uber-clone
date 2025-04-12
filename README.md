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
# Day 3 – Location & Maps Integration (Uber Clone Backend)

**Day 3** of my #100DaysOfCode challenge is done ✅  
Today was all about integrating **location-based services** into the backend for my **Uber clone project**.

## 🌍 What I Built

Added core map functionality to power ride discovery, ETA calculations, and autocomplete during pickup/dropoff.

- Integrated **GoMaps API** (a free Google Maps-compatible alternative).
- Created a service layer to handle:
  - 📍 Converting addresses into coordinates
  - 🚗 Calculating distance & estimated travel time between two locations
  - 🔍 Autocomplete suggestions for locations during input
- Built secure **protected API routes** for these services.

## ✨ API Endpoints

| Method | Route                      | Description                             |
|--------|----------------------------|-----------------------------------------|
| GET    | `/map/get-coordinates`     | Get lat/lng from an address             |
| GET    | `/map/get-distance-time`   | Get distance & duration between points  |
| GET    | `/map/get-suggestion`      | Get autocomplete suggestions for input  |

> All endpoints require user authentication.

## 🔑 Example Query

**GET** `/map/get-coordinates?address=Addis Ababa`  
**Response:**

```json
{
  "lat": 8.9806,
  "lng": 38.7578
}
```

## 🛠️ Tech Stack
-axios for API calls

-GoMaps API (Google Maps-compatible & free)

-express-validator for query validation

-Custom controller & service layers

## 🧠 Lessons Learned
-How to structure external API calls in a service layer

-Validating query parameters with express-validator

-Error handling best practices with external APIs

-Using alternatives to Google Maps that are cost-effective

---
🔥 Maps are now part of the project! On to Day 4 next. Thinking about implementing ride requests or driver discovery…


# Day 4 – Ride Management, Real-Time Updates & GPS Challenges (Uber Clone)

**Day 4** of my #100DaysOfCode is complete ✅  
Today I wrapped up the **ride management flow** for my **Uber clone backend**, including real-time socket updates, captain assignment, and trip tracking.

## 🛠️ What I Built

- 🚗 **Ride Request Flow**
  - Users can create ride requests with pickup, destination, and vehicle type.
  - Available captains are notified in real-time using Socket.io.
  
- 🧮 **Fare Estimation**
  - Built a fare calculator based on:
    - Base fare
    - Per km and per minute rates (customized by vehicle type)
    - Distance & duration via map service

- 📍 **Real-time Ride Lifecycle**
  - Confirming ride from captain side
  - Starting & ending rides with OTP verification
  - Periodic location updates (simulated via intervals)

- 🔒 All endpoints protected via **JWT-based authentication** (separate for users & captains)

## 🔁 Ride API Endpoints

| Method | Route             | Description                            |
|--------|------------------|----------------------------------------|
| POST   | `/ride/create`    | User requests a ride                   |
| GET    | `/ride/get-fare`  | Get fare estimate for a trip           |
| POST   | `/ride/confirm`   | Captain confirms a ride                |
| GET    | `/ride/start-ride`| Start ride with OTP verification       |
| POST   | `/ride/end-ride`  | Mark a ride as completed               |

## 📡 Real-time Features (Socket.io)

- On ride request: Nearby captains receive a `new-ride` event
- On confirm/start/end ride: User gets live updates via `ride-confirmed`, `ride-started`, and `ride-ended` events
- Captain location updated periodically, throttled to once per minute to save bandwidth

## ⚠️ Challenges Faced

Today I ran into an issue where **location updates weren’t accurate**, especially when testing on my device.  
Turns out: **My device doesn't support high-accuracy GPS**, so I was getting approximate locations via Wi-Fi/IP.  
**Lesson learned**: Always verify device GPS settings when testing geo features!

## 🧠 Key Takeaways

- How to chain ride status transitions (pending → accepted → ongoing → completed)
- Structuring ride-related logic in clean service layers
- Using **express-validator** to keep requests safe and predictable
- Handling geo location edge cases in real-world testing

---

🎯 **Next Up (Day 5)**: I'm switching gears and starting the **client-side (mobile/web) app** for users to request and track rides! Excited to build out real-time UI with maps and socket updates.

Let’s gooo 🚀

# 🚀 Day 5: Building the Uber Clone (Frontend)


### ✅ What I Did Today

Today was all about building out the **user and captain authentication flow** in the frontend for my Uber Clone project. After setting up all necessary dependencies, I implemented the following key features using **React**:

---

### 👨‍💻 User Flow
- ✅ **User Signup** page  
- ✅ **User Login** page  
- ✅ **User Logout** functionality  
- ✅ Redirects based on auth token (user vs. captain)

---

### 🚖 Captain Flow
- ✅ **Captain Login** page  
- ✅ **Captain Logout** functionality
- ✅ **Captain Signup** page  
- ✅ Separate home screen for Captain

---

### ⚙️ Tech Stack & Tools
- React + React Router DOM
- Axios for HTTP requests
- Tailwind CSS for UI styling
- Context API for global auth state management
- Lazy loading with `React.Suspense` for routes
- Loading screen component

---


### 🔍 Next Up
- Start designing the **Home** screens (for users and captains)
- Implement **ride booking flow**
- Add **map integrations** and **location tracking**

---

### 🧠 Reflection
Feeling good about today’s progress. Routing and auth handling are now solid foundations to build on. Separating flows for users and captains turned out cleaner than expected!

 # 🚀  Day 6: Uber Clone – User Home & Ride Flow

#### ✅ What I Built Today:
- Created the **User Home Page**
- Integrated **Pickup & Destination Search** with live suggestions
- Implemented:
  - `Find Trip` feature with vehicle fare calculation
  - `Select Vehicle` modal
  - `Confirm Ride` modal
  - `Looking For Driver` screen
  - Live tracking setup (ready for use)
- Integrated **WebSocket for real-time updates** (ride confirmed, ride started)
- Enabled **geolocation tracking** and fallback prompt if disabled

---

#### 🧠 Tech Stack Used:
- React, Redux, GSAP, Axios, WebSocket
- Debounced search suggestions using custom + lodash debounce
- Geolocation API + conditional rendering based on permission
- Modular components: `VehicleModal`, `ConfirmRide`, `LiveLocation`, etc.

---

#### 📍 Next Steps:
- Start building the **Captain side Home**
- Ride acceptance and navigation for captains
- Real-time location sharing and ride updates

---

📅 **Day 6 / 100**  
🔨 Still building the Uber Clone, one screen at a time!
# 🚀 Day 7 - Riding Page (User Side) Complete

## ✅ What I Did Today

- Created the **Riding** page for the user.
- Integrated **WebSocket** to receive real-time captain location updates.
- Used `LiveLocation` component to render the map and show captain’s movement.
- Displayed essential ride information:
  - Captain’s name
  - Vehicle type & plate number
  - Destination
  - Fare
- Added a **"Make Payment"** button (UI only for now).
- Handled `ride-ended` event to automatically redirect user to `/home`.

## 🧠 Tech Stack

- React
- Redux (ride state)
- React Router DOM
- Tailwind CSS
- WebSocket (custom integration)

## 📦 Components Used

- `LiveLocation`
- `WebSocket` (helper function)
- Redux `ride` state
- React Router's `useNavigate` for redirection

## ⚙️ Features

- Real-time location tracking
- Dynamic ride details from state
- Smooth UI transition and responsive layout
- Home button for quick return

## 🔮 What's Next (Day 8 Goals)

- Build the **Captain's Riding Page**
- Emit live location updates from captain to backend
- Send `ride-ended` event from captain’s side
- Finalize real-time communication flow between user and captain

---

🧑‍💻 Progressing strong on the 100 Days of Code challenge.  
💡 Focus for tomorrow: real-time updates from the **driver's end**.

