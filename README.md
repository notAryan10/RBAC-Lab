# **🎓 Newton School RBAC Assignment**

## **🧩 Objective**

Your task is to implement **Role-Based Access Control (RBAC)** using **Express.js** and **JWT authentication**.  
The goal is to protect routes based on user roles (admin, teacher, student) and ensure only authorized users can access them.

All automated tests in rbac.test.js **must pass** ✅.

### **📦 Setup Instructions**

**Install dependencies**
```bash
npm install
```

**Start server** 
```bash
npm run dev
```

### **🧠 What You Need to Implement**

You must implement a working **Express server** in src/server.js  
Your code must satisfy all of the following requirements:

### **1️⃣ "/login" Endpoint (POST)**

**URL:** /login  
**Method:** POST  
**Body:**

```json
{
    "username": "alice",
    "password": "123"
}
```

**Expected Behavior:**

- Validate credentials from a hardcoded user list.  
- If valid:  
  - Return a JSON Web Token (JWT) signed with a secret key.  

  - The token must include the user's username and role.  

- If invalid:  
  - Respond with 401 and { "message": "Invalid credentials" }.  

✅ **Test expectations:**

- Login works for all three users: admin, teacher, student.  

- JWT token returned contains correct role.  

- Invalid credentials are rejected.  

### **2️⃣ JWT Authentication Middleware**

You must create a middleware that:

- Checks for Authorization: Bearer &lt;token&gt; header.  

- Verifies the token using the same secret key.  

- If valid → attach decoded user info to req.user and call next().  

- If missing → respond with 401 and { "message": "Missing token" }.  

- If invalid → respond with 403 and { "message": "Invalid token" }.  

✅ **Test expectations:**

- Requests without a token fail with 401.  

- Requests with invalid token fail with 403.  

- Valid token allows access.  

### **3️⃣ Role Authorization Middleware**

Create a middleware authorize(allowedRoles) that:

- Checks if req.user.role is included in allowedRoles.  

- If not → respond with 403 and { "message": "Access denied" }.  

✅ **Test expectations:**

- Admin-only routes block teacher/student.  

- Teacher-only routes block students.  

- Student routes allow only students.  

### **4️⃣ Protected Routes**

Implement the following routes:

| **Route** | **Allowed Role** | **Expected Response Text** |
| --- | --- | --- |
| GET /admin | admin | "Welcome, admin!" |
| --- | --- | --- |
| GET /teacher | teacher | "Welcome, teacher!" |
| --- | --- | --- |
| GET /student | student | "Welcome, student!" |
| --- | --- | --- |

✅ **Test expectations:**

- Each route is only accessible by the correct role.  

### **5️⃣ JWT Secret Key**

Use the secret key exactly as:

```javascript
const JWT_SECRET = "newtonschoolsecret";
```

✅ The test file expects this key for signing/verification.

### **🧪 How Tests Work**

All tests are located in test/rbac.test.js.  
They use **Supertest** to check:

- Login responses  

- Token structure  

- Authorization logic  

- Access control  

You should **not modify** the test file.  
Just write code in `src/server.js` until all tests pass.

### **✅ Example Successful Run**

```bash
npm test
```

🎓 Newton School RBAC Assignment

🔐 /login endpoint
```javascript
    ✓ should login admin and return JWT

    ✓ should login teacher and return JWT

    ✓ should login student and return JWT

    ✓ should reject invalid credentials

🛡️ Role-based access

    ✓ should allow admin to access /admin

    ✓ should deny teacher from accessing /admin

    ✓ should allow teacher to access /teacher

    ✓ should deny student from accessing /teacher

    ✓ should allow student to access /student

    ✓ should reject access with missing token

    ✓ should reject access with invalid token

11 passing 🎉
```

### **🚀 Tips**

- Make sure you export the app from your Express file for testing.  

- Do **not** hardcode tokens - generate them dynamically.  

- Use `express.json()` middleware to parse JSON requests.  

- Don't forget to listen on a port when running locally (app.listen), but export the app for tests.