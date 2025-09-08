# R-GPT

R-GPT is a full-stack AI chatbot application inspired by ChatGPT.  
It is built with **React (Frontend)** and **Node.js + Express + MongoDB (Backend)**, with environment-based configuration for easy deployment.

🌐 Live demo : https://r-gpt-nine.vercel.app/

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
PORT=8080
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_open_API_key
```

Run the backend server:

```bash
node server.js
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
VITE_SERVER_URI=http://localhost:8080
```

Run the frontend development server:

```bash
npm run dev
```
