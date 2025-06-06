# Clinic API

## Overview

Clinic API is a backend service for managing a medical clinic system.  
It provides RESTful endpoints to manage users, doctors, medical services, and clinics.  
The API supports JWT-based authentication and role-based authorization.

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Authentication](#authentication)
- [Modules and Endpoints](#modules-and-endpoints)
  - [Users](#users)
  - [Doctors](#doctors)
  - [Clinics](#clinics)
  - [Medical Services](#medical-services)
- [Authorization and Roles](#authorization-and-roles)
- [Technologies](#technologies)
- [License](#license)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/clinic-api.git
cd clinic-api
```

2. Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory with the following content:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=clinic

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
```

Replace `your_jwt_secret_here` with a secure secret key.

---

## Running the Application

```bash
npm run start:dev
```

NestJS app will run at `http://localhost:3000`

---

## Authentication

Authentication is implemented via JWT tokens.

1. Register or log in to receive a token.
2. Use the token in requests to protected endpoints:

```
Authorization: Bearer <your_token>
```

---

## Modules and Endpoints

### Users

- `POST /auth/register` — Register a new user.
- `POST /auth/login` — Login and receive a JWT token.
- `GET /users` — Get all users (admin only).
- `PATCH /users/:id` — Update a user (admin or owner).
- `DELETE /users/:id` — Delete a user (admin only).

### Doctors

- `GET /doctors` — Get all doctors.
- `GET /doctors/:id` — Get doctor by ID.
- `POST /doctors` — Create doctor (admin only).
- `PATCH /doctors/:id` — Update doctor (admin only).
- `DELETE /doctors/:id` — Delete doctor (admin only).

### Clinics

- `GET /clinics` — Get all clinics.
- `GET /clinics/:id` — Get clinic by ID.
- `POST /clinics` — Create clinic (admin only).
- `PATCH /clinics/:id` — Update clinic (admin only).
- `DELETE /clinics/:id` — Delete clinic (admin only).

### Medical Services

- `GET /services` — Get all medical services.
- `GET /services/search?name=xxx` — Search services by name.
- `GET /services/:id` — Get service by ID.
- `POST /services` — Create service (admin only).
- `PATCH /services/:id` — Update service (admin only).
- `DELETE /services/:id` — Delete service (admin only).

---

## Authorization and Roles

Role-based access is enforced using custom `@Roles()` decorator and guards.

Available roles:
- `user` — Can view doctors, clinics, services.
- `admin` — Full access to all endpoints.

Example of protected route:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Post()
createSomething() {
  // ...
}
```

---

## Technologies

- **NestJS** — Progressive Node.js framework.
- **TypeORM** — ORM for PostgreSQL.
- **PostgreSQL** — Database.
- **Passport.js** — Authentication.
- **JWT** — Secure user sessions.
- **Swagger** — API documentation.

---

## License

This project is licensed under the MIT License.
