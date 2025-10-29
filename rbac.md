# 🎓 Newton School College RBAC Assignment (Node.js + Express)

### 🧠 Objective
Build a simple **Role-Based Access Control (RBAC)** system using **Node.js + Express** to manage access for different user roles in **Newton School College**.

You’ll use:
- In-memory user data (array of users)
- Role-based route protection using middleware
- Basic Express setup

---

## 🏗️ Project Description

Newton School College has three types of users:

| Role | Description | Permissions |
|------|--------------|--------------|
| `admin` | College Admin | Can view and manage all data |
| `teacher` | Faculty Member | Can view students and course data |
| `student` | Enrolled Student | Can view their own profile |

You’ll create **3 routes**, each accessible only to a specific role.

---

## ⚙️ Requirements

1. Create an Express app.
2. Use an **in-memory array** to store users with `username`, `password`, and `role`.
3. Create a login endpoint (`/login`) that returns a **JWT token** containing the user’s role.
4. Create a **middleware** that checks the role before accessing protected routes.
5. Implement **3 protected routes**:
   - `/admin` → accessible only by `admin`
   - `/teacher` → accessible only by `teacher`
   - `/student` → accessible only by `student`
6. Test your endpoints using Postman.

---

## 🧩 Example User Data

```js
const users = [
  { username: "alice", password: "123", role: "admin" },
  { username: "bob", password: "123", role: "teacher" },
  { username: "charlie", password: "123", role: "student" },
];