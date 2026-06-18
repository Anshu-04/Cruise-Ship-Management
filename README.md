# 🚢 Cruise Ship Management System

A full-stack MERN application designed to streamline onboard cruise ship operations. The system allows voyagers to order services and products during their journey while enabling administrators and staff to efficiently manage and fulfill requests.

---

## 📌 Overview

The Cruise Ship Management System digitizes onboard service management by allowing voyagers to:

* Order catering items
* Order stationery and gift items
* Book movie tickets
* Reserve resort seating
* Book beauty salon services
* Schedule fitness center sessions
* Reserve party halls

The system replaces manual ordering methods and provides a centralized platform for tracking, assigning, and completing requests.

---

## 👥 User Roles

### 🚶 Voyager

Voyagers can:

* Register and login
* Browse catering items
* Browse stationery items
* Book movie tickets
* Reserve resort seating
* Book beauty salon appointments
* Schedule fitness center sessions
* Reserve party halls
* Add services/items to cart
* Place orders
* Track order status
* View order history

---

### 🛠️ Staff

Staff members are responsible for fulfilling assigned requests.

Staff can:

* Login securely
* View assigned tasks
* View task details
* Mark assigned tasks as completed
* Add completion remarks
* Track completed requests

---

### 👨‍💼 Admin

Administrators manage the entire system.

Admin can:

* Manage voyagers and staff
* Create staff accounts
* Manage catering inventory
* Manage stationery inventory
* View all orders and bookings
* Assign tasks to staff
* Monitor pending, assigned, and completed requests
* Track completion time and service status
* View system statistics

---

## ✨ Features

### 🍽 Catering Management

* View catering menu
* Add new catering items
* Update catering items
* Delete catering items
* Order food and beverages

---

### 🎁 Stationery Management

* View stationery and gift items
* Add new items
* Update existing items
* Delete items
* Place stationery orders

---

### 🎬 Movie Booking

* Select movie
* Choose date
* Reserve seats

---

### 🏖 Resort Reservation

Available options:

* Ocean View
* Balcony View
* Corridor View
* Lounge

---

### 💇 Beauty Salon Booking

* Select service
* Choose date
* Select time slot

---

### 🏋️ Fitness Center Booking

* Select equipment/session
* Choose preferred time slot

---

### 🎉 Party Hall Booking

Available halls:

* Birthday Party
* Wedding Party
* Engagement Party
* Business Party
* Get Together

---

### 🛒 Cart System

* Add multiple services/items
* Review orders before submission
* Place orders in one workflow

---

### 📋 Order Management Workflow

Voyager places order

⬇️

Admin reviews order

⬇️

Admin assigns task to Staff

⬇️

Staff completes task

⬇️

Order marked as Completed

⬇️

Admin monitors completion time and status

---

## 🏗 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```bash
cruise-ship-management/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## 🗄 Database Models

### User

```javascript
{
  username,
  email,
  password,
  role
}
```

Roles:

```javascript
voyager
staff
admin
```

### CateringItem

```javascript
{
  name,
  description,
  price,
  image
}
```

### StationeryItem

```javascript
{
  name,
  description,
  price,
  image
}
```

### Order

```javascript
{
  voyagerId,
  type,
  details,
  assignedTo,
  status,
  remarks,
  createdAt,
  assignedAt,
  completedAt
}
```

Status:

```javascript
pending
assigned
completed
```

---

## 🔐 Authentication & Authorization

* JWT-based Authentication
* Password hashing using bcryptjs
* Protected Routes
* Role-based Access Control
* Secure API Endpoints

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Anshu-04/Cruise-Ship-Management.git
```

### Backend Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 📊 System Workflow

```text
Voyager
   │
   ▼
Place Order
   │
   ▼
Admin Reviews Order
   │
   ▼
Assign Staff
   │
   ▼
Staff Completes Task
   │
   ▼
Order Completed
   │
   ▼
Admin Tracks Status & Completion Time
```

---

## 🎯 Future Enhancements

* Email Notifications
* Payment Gateway Integration
* Real-Time Task Updates
* Analytics Dashboard
* QR Code-Based Service Requests
* Mobile Application
* Multi-Cruise Support

---

## 👨‍💻 Author

**Anshu Patel**
