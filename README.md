# 🚢 Cruise Ship Management System

A web-based application designed to manage onboard services and operations for cruise ship voyagers. This system streamlines ordering, reservations, and departmental coordination, replacing traditional walkie-talkie or in-person requests.

Only registered **Voyagers** can access ship facilities after logging in with their unique ID and password. The app supports multi-role operations across **Voyager**, **Admin**, **Manager**, **Head-Cook**, and **Supervisor** dashboards.

---

## 🚀 Core Features

### 👤 Voyager
- Login with username & password
- Order:
  - 🥗 Catering items (snacks, meals, beverages)
  - ✍️ Stationery items (books, gifts, chocolates, etc.)
- Book:
  - 🎬 Resort-Movie tickets (with seat availability check)
  - 💇 Beauty salon appointments
  - 🏋️ Fitness center sessions & equipment
  - 🏛️ Party halls (birthday, wedding, business, etc.)

### 🛠️ Admin
- Secure login
- Add, edit, delete items across categories
- Manage menus and offerings
- Register new voyagers

### 📋 Manager
- View all bookings for:
  - Resort-Movies
  - Beauty Salon
  - Fitness Center
  - Party Hall

### 👨‍🍳 Head-Cook
- View all ordered catering items
- Pass orders to kitchen departments

### 📦 Supervisor
- View all ordered stationery items
- Authorize and issue delivery orders

---

## 🛠️ Built With

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js (ES Modules), Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT with Cookies
- **Routing**: React Router DOM (Client) + Express Router (Server)

---

## ⚙️ Environment Variables

In the `server/` folder, create a `.env` file with:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

📦 Installation
Run frontend and backend separately.

▶️ Start Backend
```bash
cd server
npm install
npm run dev
```
Runs at: http://localhost:5000


▶️ Start Frontend
```bash
cd client
npm install
npm run dev
```
Runs at: http://localhost:5173

👨‍💻 Developed By
Made with 🌊 by Anshu Patel
