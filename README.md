# Event Management System (EMS)

A backend system to manage events, bookings, and attendance verification using unique ticket codes.

---

## Postman Collection

https://winter-meadow-381506.postman.co/workspace/Team-Workspace~a01a90a0-4a8e-4cea-89a2-3cd5fd659071/collection/37052292-1852281a-cca0-4cb6-be49-09d1656cbc1a?action=share&creator=37052292

---

## Hosted URL

https://ems-psi-five.vercel.app/

---

## Prerequisites

* Node.js (v16+)
* MySQL installed and running
* npm

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Abhishek-Soni-25/ems.git
cd ems
git checkout dev
```

Install dependencies:

```bash
npm install
```

---

## Database Setup

Run the following command:

```bash
npm run db:setup
```

> This will:
>
> * Create database `ems_db`
> * Create all tables
> * Insert sample data

---

## Environment Variables

Create a `.env` file in root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ems_db
```

---

## Running the Server

Start the server:

```bash
npm run dev
```

Server will run at:

```
http://localhost:8080
```

---

## API Endpoints

### Routes Docs

* `http://localhost:8080/api-docs` → Swagger OpenAPI Docs

### Events

* `GET /events` → Get all upcoming events
* `POST /events` → Create a new event
* `POST /events/{id}/attendance` → Verify attendance using code

### Bookings

* `POST /user/{id}/book_ticket` → Book a ticket
* `GET /user/{id}/bookings` → Get user bookings
