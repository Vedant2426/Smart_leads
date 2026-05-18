# Smart Leads Dashboard

GitHub Repository: https://github.com/Vedant2426/Smart_leads

A production-grade full-stack CRM-style Lead Management Dashboard built using the MERN stack with TypeScript. The application provides secure authentication, role-based access control, advanced lead filtering, pagination, CSV export functionality, and a responsive dashboard UI designed with scalable architecture and clean engineering practices.

---

# Live Deployment

### Frontend
https://smarlead.netlify.app

### Backend API
https://smart-leads-2eo6.onrender.com

> Note: Backend is hosted on Render free tier, so the first API request may take a few seconds due to server cold starts.

---

# Features

## Authentication & Authorization
- JWT-based Authentication
- Secure Login & Registration
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (Admin / Sales)

## Leads Management
- Create Lead
- View Leads
- Update Lead
- Delete Lead (Admin Only)
- View Single Lead Details

## Advanced Filtering & Search
- Filter by Status
- Filter by Source
- Search by Name or Email
- Sorting (Latest / Oldest)
- Debounced Search
- Combined Filters Support

## Pagination
- Backend Pagination
- Frontend Pagination Controls
- Optimized Database Queries using skip & limit

## CSV Export
- Export Filtered Leads to CSV
- Downloadable CSV Reports

## Frontend Features
- Responsive Dashboard UI
- Reusable Components
- Loading States
- Error States
- Empty States
- Form Validation
- Protected Routing

## Engineering Features
- RESTful API Architecture
- Centralized Error Handling
- Clean Folder Structure
- TypeScript Strict Typing
- Environment Variable Configuration
- Docker Support

---

# Tech Stack

## Frontend
- React
- TypeScript
- TailwindCSS
- React Router DOM
- Axios
- TanStack Query
- Zustand
- React Hook Form
- Zod

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Deployment & DevOps
- Netlify
- Render
- MongoDB Atlas
- Docker
- Docker Compose

---

# Architecture

The project follows a scalable full-stack architecture with clear separation of concerns.

## Backend Architecture
- Controllers handle request/response logic
- Services manage business logic
- Middleware handles authentication and authorization
- Validators manage request validation
- MongoDB models handle database interactions
- Centralized error handling ensures consistent API responses

## Frontend Architecture
- React Query manages server state
- Zustand manages authentication state
- Reusable UI components improve scalability
- Services layer centralizes API communication
- Custom hooks improve code reusability
- Protected routes handle authorization logic

---

# Folder Structure

```txt
Smart_leads/
│
├── client/
├── server/
├── docker-compose.yml
├── README.md
└── .env.example
```

---

# Environment Variables

## Server (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

## Client (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Vedant2426/Smart_leads.git
cd Smart_leads
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Docker Setup

Run the complete application using Docker:

```bash
docker compose up --build
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | Get Current User |

---

## Leads

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/leads | Fetch Leads |
| GET | /api/leads/:id | Fetch Single Lead |
| POST | /api/leads | Create Lead |
| PUT | /api/leads/:id | Update Lead |
| DELETE | /api/leads/:id | Delete Lead |
| GET | /api/leads/export/csv | Export Leads CSV |

---

# Query Parameters

## Leads Filtering Example

```txt
/api/leads?status=qualified&source=instagram&search=rahul&sort=latest&page=1
```

Supported Parameters:

| Parameter | Description |
|---|---|
| status | Filter by lead status |
| source | Filter by lead source |
| search | Search by name/email |
| sort | latest / oldest |
| page | Pagination page |

---

# RBAC Roles

| Role | Permissions |
|---|---|
| Admin | Full CRUD access including Delete |
| Sales | Create, Read, Update access |

---

# Production Improvements Implemented

- Strict TypeScript Usage
- Centralized Error Handling
- Modular Folder Structure
- Reusable Components
- Debounced Search Optimization
- Pagination Optimization
- Protected Routes
- RBAC Security
- Environment-Based Configuration
- Dockerized Development Environment

---

# Author

Vedant Awachar

---

# License

This project was developed as part of a Full Stack Internship Assignment submission.