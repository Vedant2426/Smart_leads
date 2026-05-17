# Smart Leads Dashboard
GitHub Repository: https://github.com/Vedant2426/Smart_leads

A production-grade full-stack CRM-style lead management dashboard built using the MERN stack with TypeScript. The application provides secure authentication, role-based access control, advanced lead filtering, pagination, CSV export functionality, and a responsive dashboard UI designed with scalable architecture and clean engineering practices.

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
- Delete Lead
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
- Pagination Metadata
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
- Dockerized Setup
- Environment Variable Configuration

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

## DevOps & Deployment
- Docker
- Docker Compose
- MongoDB Atlas
- Vercel / Netlify
- Render / Railway

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
smart-leads-dashboard/
│
├── client/
│
├── server/
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

# Environment Variables

## Server (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

## Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
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

# Demo Credentials

## Admin User

```txt
Email: admin@example.com
Password: password123
```

## Sales User

```txt
Email: sales@example.com
Password: password123
```

---

# Deployment

Frontend: Pending Deployment  
Backend: Pending Deployment

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

This project was built as part of a Full Stack Internship Assignment.