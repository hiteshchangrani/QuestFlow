# 🚀 Quest-Flow — Admin Based ToDo Application

**Quest-Flow** is a powerful, role-based task management app built using **Node.js** and **Express.js**. It features a complete backend system where admins can manage users and their tasks efficiently. The frontend is currently under development.

---

## ✨ Features

* 🔐 **User Authentication** (Register/Login with JWT)
* 🛡️ **Admin Role** via secret token during registration
* 🧑‍💼 **Admin Capabilities**:

  * Assign tasks to users
  * Update/delete user tasks
  * Delete users
* ✅ **Task Features**:

  * Title, description
  * Due date
  * Priority (High/Medium/Low)
  * Created at timestamp
  * Checklist & status updates

---

## 💠 Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Tokens)
* **Testing**: Postman, jq
* **Containerization**: Docker, Docker Compose

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js and npm
* Docker (optional, for containerized setup)
* [jq](https://jqlang.org/download/) (for running the `.bat` file in Windows)

---

### 📦 Clone and Install

```bash
git clone <your-repository-url>
cd Quest-Flow
```

---

## ⚙️ Backend Setup

### Option A: Manual (Local)

```bash
cd backend
npm install
npm run dev
```

Make sure MongoDB is running locally and `.env` is properly configured.

---

### Option B: Docker (Recommended)

```bash
cd backend
docker compose up --build
```

This will spin up both the Express server and MongoDB container.

🔐 **MongoDB Credentials**:

* Username: `admin`
* Password: `admin`

---

## 🧪 API Testing

### 🔁 Using `.bat` File (Windows Only)

Inside the `/testing` folder:

1. Double-click the `.bat` file.
2. If it fails to run, make sure [`jq`](https://jqlang.org/download/) is installed.

This script will automatically test all available endpoints.

---

### 📬 Postman Collection

A Postman collection is included in the repo to test all available APIs.

> Import the collection into Postman and explore the APIs manually. [`API-collection`](https://messina-api-testing.postman.co/workspace/My-Workspace~2a8efb81-08ef-433e-849a-f989cd737818/collection/37439038-577a5a4a-30b5-40b6-9037-515795f9f985?action=share&creator=37439038&active-environment=37439038-5fa6b513-fe28-426c-a998-c2ef64813bb8)

---

## 📁 Project Structure

```
Quest-Flow/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── docker-compose.yml
│
├── frontend/          # Coming soon...
│
├── testing/
│   └── test-apis.bat
│
└── README.md
```

---

## 🔐 Environment Setup

* Sample `.env` files for both **backend** and **frontend** are provided in this Google Drive:

📌 [Google Drive Link to `.env` Files & PDF Docs](https://drive.google.com/)
*(Replace the link with your actual Google Drive link if needed)*

---

## 📈 Upcoming Updates

* ⚛️ React-based frontend UI
* 📩 Email notifications for task deadlines
* 📊 Dashboard analytics for admins
* 🌙 Dark mode support

---

## 👤 Author

* **Name**: Hitesh Changrani
* **Email**: [hitchangrani@gmail.com](mailto:vineet@gmail.com)
* **GitHub**: [@hiteshchangrani](https://github.com/yourusername)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify.

---

> 💡 *Frontend in progress — stay tuned for upcoming updates!*
