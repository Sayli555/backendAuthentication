# 🔐 WonderOn – Secure Authentication System

WonderOn is a **full-stack authentication system** implementing **secure JWT-based authentication** with **access tokens**, **refresh tokens**, **HTTP-only cookies**, and **protected routes**.  
It includes a modern **React + Tailwind UI** and a **Node.js + Express backend**, fully deployed.

---

## 🌐 Live URLs

### 🔹 Frontend (Vercel)
👉 https://wonderon-frontend.vercel.app/

### 🔹 Backend API (Render)
👉 https://backendauthentication-1.onrender.com/api

### 🔹 Local Backend Base URL
👉 http://localhost:8000/api/auth

---

## 🚀 Features

- ✅ User Signup & Login
- ✅ Strong password validation
- ✅ JWT Access Token (short-lived)
- ✅ JWT Refresh Token (long-lived)
- ✅ Tokens stored in **HTTP-only cookies**
- ✅ Automatic token refresh
- ✅ Protected routes (Dashboard)
- ✅ Logout with cookie cleanup
- ✅ Fully deployed (Frontend + Backend)

---

## 🧠 Authentication Flow

1. User logs in
2. Backend issues:
   - **Access Token** (short-lived)
   - **Refresh Token** (stored in HTTP-only cookie)
3. If access token expires:
   - Frontend calls `/refresh-token`
   - New access token is issued
4. If refresh token is invalid:
   - User is logged out

---

## 🧪 Backend API Testing (Postman – Localhost)

### 🔹 Signup API
**POST** `/signup`

![Signup Localhost](https://github.com/Sayli555/project-images/blob/master/wonderon/signuplocalhost.png?raw=true)

---

### 🔹 Login API
**POST** `/login`

![Login Localhost](https://github.com/Sayli555/project-images/blob/master/wonderon/loginlocalhost.png?raw=true)

---

### 🔹 Refresh Token API
**GET** `/refresh-token`

![Refresh Token Localhost](https://github.com/Sayli555/project-images/blob/master/wonderon/refreshtokenlocalhost.png?raw=true)

---

### 🔹 Tokens Stored Securely in Cookies

![Token Stored in Cookies](https://github.com/Sayli555/project-images/blob/master/wonderon/tokensaveincokkieslocalhost.png?raw=true)

---

## 🎨 Frontend UI Screens

### 🔹 Signup Page
![Signup UI](https://github.com/Sayli555/project-images/blob/master/wonderon/signupui.png?raw=true)

---

### 🔹 Login Page
![Login UI](https://github.com/Sayli555/project-images/blob/master/wonderon/loginui.png?raw=true)

---

### 🔹 Protected Dashboard
> Accessible only after successful authentication

![Dashboard UI](https://github.com/Sayli555/project-images/blob/master/wonderon/dashboardui.png?raw=true)

---

## 🔐 Protected Routes

- `/dashboard` is protected
- Unauthorized users are redirected to `/login`
- Access token is refreshed automatically using refresh token

---

## 🛠 Backend Setup (Local)

### 🔹 Clone Repository
```bash
git clone https://github.com/Sayli555/backendAuthentication.git
cd backendAuthentication
npm install
