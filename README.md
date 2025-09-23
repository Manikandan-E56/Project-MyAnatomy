### 🗄️ Backend README



# 🔑 ClubHub - Student Club Management (Backend)

This is the backend for ClubHub, a robust REST API built with Node.js, Express, and MongoDB. It handles all business logic, data storage, and authentication for the student club management platform.

---

## ✨ Features

- **JWT Authentication**: Secure, token-based authentication for all protected routes.
- **Role-Based Authorization**: Differentiated access control for 'student' and 'admin' roles.
- **Mongoose Modeling**: Well-defined schemas for Students, Clubs, Admins, and Posts with data relationships.
- **Transactional Operations**: Guarantees data integrity for critical operations like accepting or removing members using Mongoose transactions.
- **RESTful API**: A clean and predictable API for all frontend interactions.

---

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JSON Web Token (`jsonwebtoken`)
- **Password Hashing**: `bcryptjs`
- **Environment Variables**: `dotenv`

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- MongoDB (running locally or a cloud instance like MongoDB Atlas)

### Installation

1. **Clone the repository:**
     ```sh
     git clone
2. **Navigate to the backend directory:**
   ```sh
    cd server
4. **Install NPM packages:**
   ```sh
     npm install
5. ** Create a .env file in the frontend root directory and add the backend API URL:**
    -- PORT=3000
    -- MANGO_URI="Your Mango url"
    -- jwt_Secre_key 
   
7. **Start the development server:**
   ```sh
     npm start
