# Learning Tracker

A full-stack MEAN application that helps users track their learning progress, organize study activities, and interact with an AI-powered learning assistant.

## Live Application

### Frontend

https://learning-tracker-application.vercel.app/

### Backend API

https://learning-tracker-monorepo.onrender.com

---

## Overview

Learning Tracker is a modern full-stack web application built using Angular, Node.js, Express, and MongoDB.

Users can:

* Create an account and securely log in
* Track learning activities and progress
* Manage learning records
* Interact with an AI-powered learning assistant
* Access their data from anywhere through a cloud-hosted application

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Learning Tracker

* Create Learning Entries
* View Learning History
* Update Learning Records
* Delete Learning Records

### AI Assistant

* AI-powered learning guidance
* Dynamic prompt handling
* Backend AI integration
* Gemini AI support

### User Experience

* Angular Material UI
* Responsive Design
* Loading Indicators
* Error Handling
* Route Guards

---

## Tech Stack

### Frontend

* Angular 21
* TypeScript
* Angular Material
* RxJS
* Tailwind

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas
* Mongoose

### AI

* Google Gemini API

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

Learning-Tracker/
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── package.json
│
└── README.md

---

## Architecture

Angular (Vercel)
        │
        ▼
Node.js / Express (Render)
        │
        ▼
MongoDB Atlas
        │
        ▼
Gemini AI

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/sharma-amit2k8/learning-tracker-monorepo.git
cd Learning-Tracker

### Backend Setup

cd backend
npm install

Create a `.env` file:

PORT=1200
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Start Backend:

npm start

### Frontend Setup

cd frontend
npm install
ng serve

Application:

http://localhost:4200


Backend API:

http://localhost:1200

---

## Deployment

### Frontend

Deployed on Vercel.

### Backend

Deployed on Render.

### Database

Hosted on MongoDB Atlas.

---

## Future Improvements

* Learning Analytics Dashboard
* Goal Tracking
* Progress Charts
* Study Streak Tracking
* Notifications
* Mobile Application (Capacitor)

---
```

<h2>Screenshots</h2>

### Login Page

<img width="1854" height="825" alt="Login Page" src="https://github.com/user-attachments/assets/823fc459-17ea-4e4d-a914-b51af7f808b1" />

### Dashboard

<img width="1910" height="883" alt="Dashboard" src="https://github.com/user-attachments/assets/1a109ee3-40bd-4d22-a610-2bd680c15210" />

### AI Assistant

<img width="1911" height="880" alt="AI Assistant" src="https://github.com/user-attachments/assets/1121e90c-66dd-404f-9690-2c59bd87bd31" />

## Author
Amit
