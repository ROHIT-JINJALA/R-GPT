# R-GPT

R-GPT is a full-stack AI chatbot application inspired by ChatGPT.  
It is built with **React (Frontend)** and **Node.js + Express + MongoDB (Backend)**, with environment-based configuration for easy deployment.

---

## 🚀 Features

- 🤖 AI-powered chatbot (GPT-style responses)  
- 🌐 Full-stack architecture (Frontend + Backend)  
- 📂 Modular MVC backend structure  
- ☁️ Image and file support (Cloudinary integration ready)  
- 🔒 Environment-based configuration (`.env` support)  
- 🖥️ Modern UI with React + Tailwind + Framer Motion  
- 📡 REST API for chat and history management  

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB  
**Other Tools:** Cloudinary, Git, GitHub  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/ROHIT-JINJALA/R-GPT.git
cd R-GPT

---
Perfect 👍 You want **separate sections** for backend and frontend setup so it’s clear.
Here’s the improved **Installation & Setup** section for your README:

````markdown
## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ROHIT-JINJALA/R-GPT.git
cd R-GPT
````

---

### 2. Backend Setup

Go to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

Go to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_SERVER_URI=http://localhost:5000
```

Run the frontend development server:

```bash
npm run dev
```

---

```

This way you have **separate sections** for backend and frontend setup, each with steps, `.env` config, and run commands.  

👉 Do you also want me to add a **"Run Both Together"** section (like using `concurrently` or `npm run dev` from root) so users can start frontend + backend in one command?
```

