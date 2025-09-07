# Backend API (NestJS)

This directory contains the source code for the backend API, built with the NestJS framework. It provides a complete RESTful API for managing users and posts, designed to be consumed by a frontend application.

---

## 🚀 Core Technologies

- **Node.js**: The runtime environment for the server.
- **NestJS Framework**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: The primary language, ensuring type safety and code quality.
- **ESLint**: For enforcing consistent code style and identifying potential errors.

---

## 💻 Getting Started

To run this server locally, please follow these steps from within the `/backend` directory.

### 1. Install Dependencies

This command will install all the necessary packages and libraries defined in `package.json`.

```bash
npm install
2. Run the Development Server
This command starts the NestJS server in development mode. It includes features like file watching and automatic reloading, which greatly improves the development experience.
code
Bash
npm run start:dev
The API will be running and accessible at http://localhost:3000.
📜 Available Scripts
The following scripts are available in the package.json and can be run with npm run <script-name>:
npm run start:dev: Starts the server in development mode with hot-reloading.
npm run build: Compiles the TypeScript source code to JavaScript for production.
npm run start:prod: Starts the server from the compiled build files (this is the command used for deployment).
npm run lint: Lints the source code for errors and style issues using ESLint.
🔌 API Endpoints
The server provides full CRUD (Create, Read, Update, Delete) functionality for both users and posts resources.
Users Resource
GET /users: Retrieve a list of all users.
GET /users/:id: Retrieve a single user by their unique ID.
POST /users: Create a new user. Requires a JSON body with name, username, and email.
PATCH /users/:id: Update an existing user's properties. Requires a JSON body with the fields to be updated.
DELETE /users/:id: Delete a user by their unique ID.
Posts Resource
GET /posts: Retrieve a list of all posts.
GET /posts/:id: Retrieve a single post by its unique ID.
POST /posts: Create a new post. Requires a JSON body with userId, title, and body.
PATCH /posts/:id: Update an existing post's properties. Requires a JSON body with the fields to be updated.
DELETE /posts/:id: Delete a post by its unique ID.
⚙️ Environment Variables
This project does not require any environment variables (.env file) for local setup.
```
