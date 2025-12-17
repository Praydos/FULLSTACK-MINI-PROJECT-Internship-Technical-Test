# Project Management System

A simple full-stack project management application with Spring Boot backend and React frontend featuring JWT authentication, project management, and task tracking.

## 🚀 Technology Stack

### Backend
- **Java 17+** with **Spring Boot 3.x**
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **H2 Database** (in-memory, can be replaced with production DB)
- **Maven** for dependency management
- **Lombok** for reducing boilerplate code

### Frontend
- **React 18** with functional components
- **React Router v6** for navigation
- **Axios** for API communication
- **React Bootstrap** for UI components
- **React Hot Toast** for notifications
- **date-fns** for date formatting
- **React Icons** for icons

### Database
- **H2 Database** (in-memory for development)
- **MySQL**

## 📁 Project Structure

### Backend Structure
```
simple-fullstack-app/
├── src/main/java/org/example/simplefullstackapp/
│   ├── config/           # Configuration classes
│   ├── entities/         # JPA entities (User, Project, Task)
│   ├── enums/           # Enums (Status)
│   ├── dtos/            # Data Transfer Objects
│   ├── mappers/         # Object mappers
│   ├── repositories/    # Spring Data JPA repositories
│   ├── services/        # Business logic
│   ├── web/            # REST controllers
│   └── security/       # Security configuration & JWT
├── src/main/resources/
│   ├── application.properties
│   └── data.sql (if needed)
└── pom.xml
```

### Frontend Structure
```
project-management-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/        # Login, Register, PrivateRoute
│   │   ├── projects/    # Project listing, forms, details
│   │   ├── tasks/       # Task listing, forms
│   │   ├── common/      # Navbar, LoadingSpinner, etc.
│   │   └── layout/      # Layout components
│   ├── context/         # React Context (AuthContext)
│   ├── services/        # API services
│   └── utils/          # Constants, helpers
├── .env
└── package.json
```

## ⚙️ Prerequisites

### Backend Requirements
- **JDK 17 or higher** (OpenJDK or Oracle JDK)
- **Maven 3.6+**
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code with Java extensions)

### Frontend Requirements
- **Node.js 16+** and npm/yarn
- **Modern web browser** (Chrome, Firefox, Edge)
### Database
- **MySql**
- **Xampp**
- or just use the in-memory h2 database  (currently on MySql database)

## 🏃‍♂️ How to Run the Backend

### 1. Clone and Navigate
```bash
git clone https://github.com/Praydos/FULLSTACK-MINI-PROJECT-Internship-Technical-Test.git
cd simple-fullstack-app
```


### 2. Build and Run
#### Using Maven:
```bash
# Clean and build
mvn clean compile

# Run the application
mvn spring-boot:run
```

#### Using IDE:
1. Open the project in your IDE
2. Locate `SimpleFullstackAppApplication.java`
3. Run it as a Java Application

### 4. Verify Backend is Running 
The application will start on `http://localhost:8080`

**Test endpoints:** (i should make accessible without authentication)
- `GET http://localhost:8080/api/test/hello` - Should return "Hello from Spring Boot!"
- `GET http://localhost:8080/h2-console` - H2 Database Console (JDBC URL: `jdbc:h2:mem:testdb`)

### 5. Default Users (Auto-created)
The application automatically creates test users:
- **Email:** `test@example.com`, **Password:** `password123`
- **Email:** `user2@example.com`, **Password:** `password123`

## 🎨 How to Run the Frontend

### 1. Navigate to Frontend Directory
```bash
cd project-management-frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Configure Environment
Create `.env` file in the frontend root:
```env
REACT_APP_API_URL=http://localhost:8080
```

### 4. Start Development Server
```bash
# Using npm
npm start

# Or using yarn
yarn start
```

### 5. Access the Application
Open your browser and navigate to:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8080`
- **H2 Console:** `http://localhost:8080/h2-console` 
- **MySql**  `http://localhost/phpmyadmin`

## 🔐 Authentication & Authorization

### Registration
1. Navigate to `/register`
2. Fill in email, password, and full name
3. Automatically logs in after registration

### Login
1. Navigate to `/login`
2. Use test credentials or register new account
3. JWT token is stored in localStorage

### Protected Routes
- Dashboard (`/`)
- Projects (`/projects`)
- Project details (`/projects/:id`)
- All routes except `/login` and `/register` require authentication

## 📊 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Projects (`/api/projects`)
- `GET /api/projects` - Get all projects for current user
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `GET /api/projects/{id}/progress` - Get project progress

### Tasks (`/api/projects/{projectId}/tasks`)
- `GET /api/projects/{projectId}/tasks` - Get all tasks for project
- `POST /api/projects/{projectId}/tasks` - Create new task
- `PUT /api/projects/{projectId}/tasks/{taskId}` - Update task
- `PATCH /api/projects/{projectId}/tasks/{taskId}/complete` - Mark task as completed
- `DELETE /api/projects/{projectId}/tasks/{taskId}` - Delete task

## 🗄️ Database Schema

### User Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP
);
```

### Project Table
```sql
CREATE TABLE project (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Task Table
```sql
CREATE TABLE task (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
    due_date DATE,
    project_id BIGINT,
    FOREIGN KEY (project_id) REFERENCES project(id)
);
```

## 🧪 Testing the Application

### 1. Manual Testing
1. Register a new account
2. Create a project
3. Add tasks to the project
4. Mark tasks as completed
5. View progress updates

### 2. Using Test Data
The application automatically seeds:
- 2 test users
- 3 projects (2 for user1, 1 for user2)
- 4 tasks with different statuses

### 3. API Testing with cURL
```bash
# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get projects (with JWT token)
curl -X GET http://localhost:8080/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create a project
curl -X POST http://localhost:8080/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Project","description":"Project description"}'
```



## 🚀 Deployment

### Backend Deployment Options
1. **JAR file:**
   ```bash
   mvn clean package
   java -jar target/simple-fullstack-app-0.0.1-SNAPSHOT.jar
   ```

2. **Docker:**
   ```dockerfile
   FROM openjdk:17-jdk-slim
   COPY target/simple-fullstack-app-0.0.1-SNAPSHOT.jar app.jar
   EXPOSE 8080
   ENTRYPOINT ["java", "-jar", "/app.jar"]
   ```

3. **Cloud Platforms:**
   - AWS Elastic Beanstalk
   - Google App Engine
   - Heroku
   - Azure App Service

### Frontend Deployment Options
1. **Static Hosting:**
   ```bash
   npm run build
   # Deploy build/ folder to:
   # - Netlify
   # - Vercel
   # - AWS S3
   # - GitHub Pages
   ```

2. **Docker:**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```
