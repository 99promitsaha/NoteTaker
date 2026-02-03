# Notion Lite (Task + Notes)

A modern minimal Notion-style task + notes manager built with React, Vite, Tailwind, Express, and MongoDB. Includes Google SSO with JWT sessions via httpOnly cookies, protected routes, autosave, keyboard shortcuts, and a polished UI.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS + React Router + Zustand
- Auth: Google OAuth (ID token) + JWT httpOnly cookie
- Backend: Node.js + Express + MongoDB (Mongoose)

## Folder Structure
- `frontend/` React app
- `backend/` Express API

## Setup

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Required env vars (see `backend/.env.example`):
- `MONGO_URL`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `FRONTEND_URL`

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Required env vars (see `frontend/.env.example`):
- `VITE_API_URL`
- `VITE_GOOGLE_CLIENT_ID`

## Google OAuth Setup
- Create an OAuth 2.0 Client ID in Google Cloud Console
- Add authorized JavaScript origins for the frontend (e.g. `http://localhost:5173`)
- Set `VITE_GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_ID`

## API Endpoints
All routes are protected via JWT middleware unless noted.

### Auth
- `POST /auth/google` (public)
- `GET /auth/me`
- `POST /auth/logout`

### Notes
- `GET /notes`
- `POST /notes`
- `PUT /notes/:id`
- `DELETE /notes/:id`

### Tasks
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## UX Features
- Dark/light mode toggle
- Smooth transitions
- Loading skeletons
- Toast notifications
- Keyboard shortcuts:
  - `Cmd/Ctrl + N` create note
  - `/` focus search
- Debounced search
- Autosave after 1 second idle

## Security
- Helmet middleware
- Rate limited auth route
- Input validation with Zod
- Note content sanitized on write

## Notes & Tasks Schema
```json
// Note
{
  "id": "",
  "userId": "",
  "title": "",
  "content": "",
  "tags": [],
  "pinned": false,
  "createdAt": "",
  "updatedAt": ""
}

// Task
{
  "id": "",
  "userId": "",
  "noteId": "",
  "title": "",
  "completed": false,
  "priority": "medium",
  "dueDate": ""
}
```

## Optional Next Up
- Drag & drop note ordering
- Tags and filtering
- Export notes to Markdown
- PWA support
