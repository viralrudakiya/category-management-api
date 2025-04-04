# Multi-Level Category Management API

This is a backend project developed using Node.js, Express, TypeScript, and MongoDB to manage nested categories in a tree structure. It includes authentication, category CRUD operations, and proper handling of nested data.

## 📌 Objective

To demonstrate the ability to:

- Build a structured Node.js backend with TypeScript.
- Implement authentication using JWT.
- Design scalable and efficient REST APIs.
- Handle nested (multi-level) data in MongoDB.
- Optimize performance using indexing and query design.
- Write unit and integration tests using Jest and Supertest.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB (Mongoose ORM)**
- **JWT for Authentication**
- **Jest + Supertest for Testing**

---

## 🚀 Features

### 👤 Authentication

- `POST /api/auth/register` – Register a user.
- `POST /api/auth/login` – Login and receive a JWT token.
- Authenticated routes require a valid JWT.

### 🗂️ Category Management

- `POST /api/category` – Create a new category (optional parent).
- `GET /api/category` – Fetch all categories in tree structure.
- `PUT /api/category/:id` – Update category name or status.
- `DELETE /api/category/:id` – Delete a category and reassign children.

### ⚙️ Behavior Rules

- Categories can be nested (tree structure).
- Deleting a parent moves children to its parent.
- Inactivating a category makes all its children inactive.
- Efficient bulk update and retrieval of nested categories.
- MongoDB indexes for performance optimization.

---

## ✅ Testing

### 🧪 Jest Test Cases

- Unit tests for `authController.ts` and `categoryController.ts`.
- Integration tests using Supertest.
- Use `MongoMemoryServer` to mock database interactions.
- Test all authentication flows.
- Validate proper error handling (e.g. invalid input, unauthorized access).


## 📦 Installation & Setup

git clone https://github.com/viralrudakiya/category-management-api.git
cd category-management-api
npm install
npm run dev
