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

| Method | Route       | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Login existing user |
| GET    | `/profile`  | Get user profile    |
| GET    | `/logout`   | Logout user         |

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

| Method | Route               | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/captain/register` | Register a new captain |
| POST   | `/captain/login`    | Login existing captain |
| GET    | `/captain/profile`  | Get captain's profile  |
| GET    | `/captain/logout`   | Logout the captain     |

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

| Method | Route                    | Description                            |
| ------ | ------------------------ | -------------------------------------- |
| GET    | `/map/get-coordinates`   | Get lat/lng from an address            |
| GET    | `/map/get-distance-time` | Get distance & duration between points |
| GET    | `/map/get-suggestion`    | Get autocomplete suggestions for input |

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

| Method | Route              | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | `/ride/create`     | User requests a ride             |
| GET    | `/ride/get-fare`   | Get fare estimate for a trip     |
| POST   | `/ride/confirm`    | Captain confirms a ride          |
| GET    | `/ride/start-ride` | Start ride with OTP verification |
| POST   | `/ride/end-ride`   | Mark a ride as completed         |

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

# 🚀 Day 6: Uber Clone – User Home & Ride Flow

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

# 🚗 Day 8 - Captain Home Page Complete

## ✅ What I Did Today

- Built the full **Captain Home Page**.
- Fetched captain profile using token and stored it in Redux state.
- Established **WebSocket** connection for captains.
- Handled real-time **new ride** events from users.
- Implemented:
  - **RidePopup** component: shows ride details & accept button
  - **ConfirmRidePopup**: slide-up confirmation with ride info
  - Real-time **location sharing** via WebSocket every 10 seconds
- Added captain **logout** button with route handling.
- Integrated **GSAP** for smooth popup animation.
- After ride confirmation, fetched OTP from user and navigated to `CaptainRiding` page.

## 🧠 Tech Stack

- React
- Redux
- WebSocket
- Axios
- GSAP (`useGSAP`)
- Tailwind CSS

## 📦 Components Overview

- `CaptainDetails`: Displays profile info
- `RidePopup`: Displays incoming ride request
- `ConfirmRidePopup`: Confirmation UI after ride is accepted
- `LiveTracking`: Shows map and location
- `Loading`: Spinner for API actions

## 🔗 WebSocket Events

- `new-ride`: Listen for incoming user ride requests
- `join`: Identify as captain when connected
- `update-location-captain`: Send periodic location updates

## 🗂️ Features Added

- Profile fetch using bearer token
- Smooth GSAP transition for ride confirmation panel
- Real-time ride requests
- OTP input & validation (planned in next steps)
- Dynamic UI changes based on ride status
- Realtime location tracking on map

## 🔮 What's Next (Day 9 Goals)

- Build **CaptainRiding** page
- Integrate OTP verification before ride starts
- Show user info, ride details during ride
- Implement ride end and payment trigger

---

👨‍✈️ Captain side starting to shape up beautifully.  
🚀 Day 9 we roll into the actual **ride in progress** flow.

# 🛣️ Day 9 – Captain Riding Page & Route Tracking

## ✅ What I Did Today

- Built the **CaptainRiding** page.
- Connected captain’s real-time location with WebSocket updates every 10s.
- Integrated **react-leaflet** map with custom car and pin markers.
- Drew live **route polyline** from pickup to destination using OpenRouteService.
- Implemented smooth **Finish Ride Modal** with **GSAP** animation.
- Added `toastify` for all error/success notifications.
- Fetched and used accurate route data on both frontend & backend.

## 🧠 Tech Stack

- React
- Redux
- WebSocket
- Axios
- GSAP (`useGSAP`)
- React Leaflet (OpenStreetMap)
- Tailwind CSS
- React Toastify

## 📦 Components Overview

- `CaptainRiding`: Main live tracking and ride UI
- `MapComponent`: Renders route, captain location, and destination using leaflet
- `FinishRide`: Modal to trigger ride completion
- `Loading`: Fullscreen spinner for GPS loading

## 🌍 Live Map Route (Frontend)

- Used **OpenRouteService** API to fetch driving route.
- Parsed GeoJSON data and plotted as polyline:

```js
const coords = data.features[0].geometry.coordinates.map((c) => [c[1], c[0]]);
setRouteCoords(coords);
```

# Displayed:

🚗 Captain: car icon (/car.png)

📍 Destination: default leaflet marker

🟦 Route: blue polyline

---

# 🔁 WebSocket Logic

-join: Captain joins on page mount

-location-update: Sent every 10 seconds with current lat/lng

-Handled geolocation access error with toast fallback

---

# 🧾 Backend Update

-Updated getDistanceTime() to call GoMaps API and return:

-Start & End coordinates

-Distance in meters

-Duration in seconds

---

# 🛠️ Tech Stack & Tools

-- React + Redux

--GSAP (useGSAP) for smooth transitions

--WebSocket (custom wrapper)

--react-toastify for global toast messages

--OpenRouteService for polyline route drawing

--Google Maps API for ride info (backend)

---

# 🔮 Day 10 Goals (Planned)

⛔ Add route protection for captain/user pages (auth guards)

🛑 Prevent unauthorized route access

✅ Show custom redirect if token not present or expired

🔐 Improve logout & login redirection logic

# 🧑‍💼 Day 10 – User Profile Page & Ride History

## ✅ What I Did Today

- Built the **UserProfile** page to show user details and ride history.
- Fetched user profile and all rides from the backend using `axios`.
- Filtered **completed rides** and displayed them dynamically.
- Integrated **Redux** to store and manage user data.
- Added **auth token check** to prevent fetching if user already loaded.
- Designed profile with **Tailwind CSS** and icons from `react-icons`.
- Linked back to home using a fixed **home button**.
- Applied responsive and scrollable UI for ride listings.

## 🧠 Tech Stack

- React
- Redux Toolkit
- Axios
- React Router
- Tailwind CSS
- React Icons

## 📄 Component Overview

- `UserProfile`:
  - Fetches user data with token
  - Displays full name and email
  - Filters and shows number of completed rides
  - Lists each ride with pickup → destination format

## 🧾 Backend API

**GET /users/profile**  
Protected route using token  
Returns:

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  },
  "rides": [
    {
      "pickup": "123 Street, City",
      "destination": "456 Avenue, City",
      "status": "completed"
    }
  ]
}
```

# 🖼️ UI Features

👤 User Name: BsPersonRaisedHand

📧 Email: FcGoogle

✅ Completed rides: counted and displayed

📍 Ride Summary: pickup → destination using FcMinus

🏠 Home Button: floating top-left with AiFillHome

---

🔮 Day 11 Goals (Planned)
🔐 Set up route protection for all user/captain pages
🚫 Redirect unauthorized access to login
🧹 Cleanup Redux logic and organize slices
📱 Improve mobile responsiveness of all profile & map pages

# 🧑‍💼 Day 11 – Light Day Due to Health

## 🤒 Context

Today I was down with **fever and cold**, so I couldn’t manage to get much work done. Tried to take it easy and get some rest. However, I still managed to stay lightly connected with the project.

## ✅ What I Did Today

- ✅ **Reviewed existing `CaptainDetails` component** for any bugs or missing logic.
- 🧪 **Tested backend API** response format with mock requests.
- 🧼 Cleaned up and slightly optimized component layout using Tailwind spacing.
- 💡 Started **planning microservices breakdown** for future refactor (User, Rides, Auth).
- 🧠 Skimmed through articles and tutorials on **Node.js Microservices** (focused on theory).

## 🚧 WIP / Planned for Tomorrow (If Feeling Better)

- 🧩 Start breaking app into **core microservices**:
  - User Service
  - Ride Management
  - Auth Gateway
- 🔐 Implement **JWT Auth Middleware** in each service
- 🌍 Set up **API Gateway** (possibly using Express or a lightweight proxy)
- 🗃️ Dockerize initial services for containerized dev environment
- 🔁 Setup inter-service communication (likely via REST, then shift to message broker later)

## 🔮 Vision Moving Forward

> If I feel better, the next few days will focus heavily on **back-end architecture** and restructuring the current monolith into a more scalable, service-driven model.

## 🧠 Tech Stack (Upcoming)

- Node.js (Express)
- MongoDB
- JWT Auth
- Docker
- NGINX (possibly)
- React (frontend stays the same)
- Redis / Message Broker (later stage)

---

🧘‍♂️ _Taking care of health first, tech second today._

# 🧑‍💼 Day 12 – Microservices Refactor Kickoff 🚀

## 🛠️ Today's Focus

Started the transition from a **monolithic backend** to a **microservices architecture**. Reviewed current folder structure and began laying out isolated services for each domain:

- 👤 User Service
- 🚗 Ride Service
- 🧭 Captain Service
- 🌐 Gateway Service (API Gateway)
- 🧪 Auth Middleware (Planned)

## ✅ What I Did Today

- 🧩 Reviewed existing backend structure and identified **modular domains**.
- 📁 Reorganized code into **dedicated microservice folders** (`user`, `rides`, `captain`, `gateway`).
- 🔗 Configured a basic **Express-based API Gateway** using `express-http-proxy`:

  ```js
  const express = require("express");
  const expressProxy = require("express-http-proxy");

  const app = express();

  app.use("/user", expressProxy("http://localhost:3001"));
  app.use("/captain", expressProxy("http://localhost:3002"));
  app.use("/ride", expressProxy("http://localhost:3003"));

  app.listen(3000, () => {
    console.log("Gateway server listening on port 3000");
  });
  ```

- 🔄 Verified routing from gateway to each service.
- 📦 Introduced structure for future **Dockerization**.
- 📚 Continued reading up on **Node.js microservice communication patterns**.

## 🧠 Tech Stack (Active)

- Node.js (Express)
- Axios
- express-http-proxy
- React (frontend)
- Redux Toolkit
- Tailwind CSS

## 📦 Folder Structure Snapshot

```plaintext
UBER/
├── Backend/
│   ├── captain/     # Captain microservice
│   ├── gateway/     # API Gateway
│   ├── rides/       # Ride management microservice
│   ├── user/        # User microservice
│   ├── withoutMS/   # Legacy monolith code (for reference)
├── frontend/        # React frontend
```

## 📈 Microservice Goals

| Service   | Description                           | Status         |
| --------- | ------------------------------------- | -------------- |
| `user`    | Handles user profile, auth, and data  | 🟡 In Progress |
| `captain` | Manages captain info and availability | 🔜 Planned     |
| `rides`   | Controls ride logic and history       | 🔜 Planned     |
| `gateway` | Unified entry point for APIs          | ✅ Basic Setup |
| `auth`    | JWT-based token validation middleware | 🔜 Tomorrow    |

---

## 🤒 Health Check-in

Feeling **better than yesterday**, so pushed ahead with a productive backend session. Still pacing myself to avoid burnout.

---

## 🔮 Tomorrow's Goals (Day 13)

- 🔐 Add **JWT auth middleware** to services
- 🧪 Implement token verification in Gateway
- 🌉 Explore message broker setup (RabbitMQ or Redis pub/sub)
- 📱 Start syncing frontend with new microservice APIs

> “Monolith to Microservices isn’t just about structure — it’s about scaling _intelligently_.” — _Me, probably 😄_

---

🧘‍♂️ _Small wins, strong systems, sustainable progress._
# 🚧 Day 13 – Cross-Service Messaging & Auth Middleware Magic ✨

## 🧠 Today's Focus

Dove into **RabbitMQ integration** to enable **cross-service communication** and **decoupled architecture**. Also kicked off the **JWT Auth Middleware**, enabling secure user validation across services without tight coupling. The microservice transition is really taking shape now! 💪

---

## ✅ What I Did Today

- 📨 Integrated **RabbitMQ Cloud** (via `amqplib`) for internal service communication.
- 🔄 Set up **RPC-style request/reply** pattern for:

  - 🔍 `getCaptainNear(payload)` → triggered by ride service to fetch nearby captains.
  - 🔐 `getMiddleware(token)` → validates JWT token by sending it to user service via queue.

- 🧱 Abstracted middleware logic so the **API Gateway** can verify tokens asynchronously without needing direct DB access.

### 🔐 Auth Middleware Sample (via RabbitMQ)

```js
// gateway/middleware/auth.js
const getMiddleware = require('../rpc/getMiddleware');

module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await getMiddleware(token); // via RabbitMQ
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(403).json({ error: "Forbidden" });
  }
};
```
🧹 Cleaned and modularized message queue logic.

🌐 Updated API Gateway routing to use new middleware.
🧰 Tech Stack Additions
🐇 RabbitMQ (amqplib)

🔁 RPC message pattern

🧩 Environment-based configs (.env)
```plaintext
Backend/
├── user/
│   └── rpc/
│       ├── getCaptainNear.js
│       └── getUserByToken.js
├── rides/
│   └── rpc/
├── captain/
│   └── rpc/
├── gateway/
│   ├── middleware/
│   │   └── auth.js
│   └── rpc/
│       └── getMiddleware.js
```
---

💡 Takeaways
Microservices aren't just separate servers — they're independent minds working in sync.
Messaging queues = the nervous system. 🧠⚡

RabbitMQ unlocked true decoupling — services don’t need direct access to each other.

Middleware via messaging = smart gateway, minimal coupling.

Architecture is scaling smoothly with each service extracted.

---

🔮 Tomorrow's Goals (Day 14)
🧪 Expand JWT auth with role-based access (user, captain)

🧭 Finish captain service logic + DB models

🐳 Dockerize all services and gateway

🔗 Hook frontend with new API Gateway endpoints
```
🛤️ Microservice highway is open. Building traffic signals, not roadblocks.
Let’s keep pushing — sustainably and smart. 🧘‍♂️
```
