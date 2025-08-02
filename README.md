# Full-Stack Job Management System

A full-stack web application built with **React (Vite)** for the frontend, **Node.js (Express + Prisma)** for the backend, and **MySQL** as the database. The system is containerized using **Docker**.

## 📁 Project Structure

<pre lang="markdown">
  ```
   ├── backend
   │ ├── prisma
   │ │ ├── schema.prisma
   │ │ └── seed.js
   │ ├── src
   │ │ ├── controllers
   │ │ ├── routes
   │ │ └── index.js
   │ └── Dockerfile
   ├── frontend
   │ ├── src
   │ │ ├── components
   │ │ ├── pages
   │ │ └── main.jsx
   │ └── Dockerfile
   ├── docker-compose.yml
   └── README.md
  ```
</pre>

## ⚙️ Setup Instructions

### Prerequisites

- Docker & Docker Compose installed
- Node.js and npm installed (for running locally without Docker)

---

## 🚀 Running the Project with Docker (Recommended)

1. Clone the repository:

   git clone https://github.com/hamzehjbour/BBook.git

2. Build and run the app:

   docker compose up --build

3. Access the app:

   Frontend: http://localhost:5173

   Backend API: http://localhost:3000/api

   MySQL: Exposed internally to the backend at db:3306

## Test Accounts

1. Admin account

   email: admin@example.com
   password: pass1234

2. Receptionist account

   email: receptionist@example.com
   password: pass1234

3. Staff accounts

   email: staff1@example.com  password: pass1234 
   email: staff2@example.com  password: pass1234 
   email: staff3@example.com  password: pass1234

   
