# BaggageTrack – Smart Baggage Management System

BaggageTrack is a web-based Smart Baggage Management System designed to help passengers, airline staff, and administrators manage and track baggage efficiently. It provides role-based access, baggage status tracking, and administrative functionalities through a user-friendly web application.

## 🌐 Live Demo

- **Frontend:** https://baggage-track.vercel.app/
- **Backend API:** https://baggagetrack-api.onrender.com
- **GitHub Repository:** https://github.com/Nehab137/BaggageTrack

## 📌 Project Abstract

BaggageTrack aims to simplify baggage management by providing a centralized platform for tracking baggage information and handling baggage-related operations. Passengers can view baggage details and tracking status, airline staff can validate baggage tags and update baggage status, and administrators can manage users and administrative records.

The application uses React for the frontend and Java Spring Boot for the backend. REST APIs enable communication between the frontend and backend, while Spring Security and JSON Web Tokens (JWT) support authentication and role-based authorization. Spring Data JPA and Hibernate handle database operations.

## ✨ Key Features

- User registration and login.
- Role-based access for Passengers, Airline Staff, and Admin.
- Baggage information and status tracking.
- Baggage-tag scanning or validation where supported.
- Baggage status updates by authorized staff.
- User management for administrators.
- Create, update, and delete user operations.
- Database-backed storage of user and baggage information.
- Responsive web interface for accessing the application.

## 👥 User Roles

### 1. Passenger
- Register and log in.
- View baggage information.
- Track baggage status.
- View notifications and profile information where available.

### 2. Airline Staff
- Log in to the staff interface.
- Scan or validate baggage tags where supported.
- Update baggage handling status.
- View assigned baggage information where available.

### 3. Administrator
- Log in using an account with the Admin role.
- Create and manage user accounts.
- Update or delete users.
- Manage administrative records and baggage-related information where available.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Backend | Java 21, Spring Boot |
| API Communication | REST API, HTTP/HTTPS, JSON |
| Authentication | Spring Security, JWT |
| Database Access | Spring Data JPA, Hibernate |
| Database | MySQL-compatible database |
| Build Tool | Maven |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Version Control | Git and GitHub |

## 🏗️ System Architecture

```text
Passenger / Airline Staff / Admin
                |
                v
       React.js Frontend
          (Vercel)
                |
        HTTP/HTTPS Requests
          JSON Responses
       JWT for Protected APIs
                |
                v
      Spring Boot Backend
           (Render)
                |
         Spring Security
                |
         Controllers
                |
           Services
                |
       Spring Data JPA
                |
                v
       MySQL-Compatible DB
```

## 🔄 How the System Works

1. **User accesses the website:** The user opens the BaggageTrack frontend.
2. **User performs an action:** The user clicks a button or submits a form.
3. **Frontend sends a request:** React sends an API request to the Spring Boot backend.
4. **Authentication and authorization:** The backend checks the user's authentication and permissions for protected operations.
5. **Backend processes the request:** The controller calls the appropriate service logic.
6. **Database operation:** The service uses repositories and JPA to read or update records.
7. **Response to frontend:** The backend returns a response, and the frontend displays the result or an error message.

## 🗑️ Delete User – Code Flow

When an administrator clicks the **Delete** button beside a user, the backend flow is:

```text
Admin clicks Delete
        |
        v
Frontend sends selected User ID
        |
        v
DELETE /api/admin/users/{id}
        |
        v
AdminController.java
        |
        v
UserService.deleteUser(id)
        |
        v
Repository / Database
        |
        v
Success or Error Response
        |
        v
Frontend displays the result
```

The backend protects administrative endpoints using the Admin role. If baggage records still reference a user, a database foreign-key constraint may prevent deletion. This protects related data and should be handled with an appropriate error message.

## 📂 Project Structure

```text
BaggageTrack/
├── baggage-track/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/baggagetrack/
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   ├── repository/
│   │       │   └── security/
│   │       └── resources/
│   ├── pom.xml
│   ├── Dockerfile
│   └── mvnw.cmd
│
└── frontend/
    ├── src/
    ├── package.json
    └── ...
```

*Note: The directory listing is a simplified overview; exact filenames may vary.*

## 💻 Local Installation and Setup

### Prerequisites

- Java 21
- Node.js and npm
- MySQL-compatible database
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/Nehab137/BaggageTrack.git
cd BaggageTrack
```

### Step 2: Start the Backend

Open a terminal in the backend folder:

```powershell
cd baggage-track
.\mvnw.cmd spring-boot:run
```

Configure the required database credentials and JWT secret before running the application. The backend uses port `8080` locally by default.

### Step 3: Start the Frontend

Open another terminal from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173/
```

### Step 4: Check Backend Health

If Spring Boot Actuator is installed and the health endpoint is exposed, open:

```text
http://localhost:8080/actuator/health
```

A healthy response typically contains `"status":"UP"`.

## 🔐 Security

- JWT-based authentication is used for protected requests.
- Administrative endpoints require the Admin role.
- Staff endpoints allow Staff or Admin access according to the configured security rules.
- CORS configuration allows approved frontend origins.
- Database constraints help protect relationships between records.
- Production credentials and secrets should be stored in environment variables, not committed to GitHub.

## 🚀 Deployment

- **Frontend:** Hosted on Vercel.
- **Backend:** Hosted on Render.
- **Source Code:** Maintained in GitHub.

The deployed frontend must communicate with the deployed backend URL. Required database credentials, JWT secrets, and other environment variables must be configured in the backend hosting environment.

The free Render instance may spin down after inactivity, so the first request after a period of inactivity can take longer.

## 🔮 Future Enhancements

- Implement and test an email-based Forgot Password feature.
- Improve input validation and user-friendly error messages.
- Add automated testing for authentication, baggage tracking, and user management.
- Improve API documentation and monitoring.
- Extend tracking notifications and reporting functionality.

## 🎯 Conclusion

BaggageTrack provides a role-based web application for baggage tracking and management. By combining React, Spring Boot, REST APIs, JWT authentication, and database integration, the project demonstrates full-stack web development, secure access control, and data management.

---

**Project Name:** BaggageTrack – Smart Baggage Management System  
**Repository:** https://github.com/Nehab137/BaggageTrack  
**Live Website:** https://baggage-track.vercel.app/
