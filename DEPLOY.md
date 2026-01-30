# 🚀 Deployment Guide (Updated for Docker & Database)

You are seeing a **"Not Found"** error likely because the manual configuration on Render was incorrect (e.g., missing Database or wrong Root Directory).

I have created a **Render Blueprint (`render.yaml`)** to fix this automatically. This will deploy:
1.  **PostgreSQL Database** (Free Tier - 90 days)
2.  **Backend API** (Dockerized Python)
3.  **Frontend** (Static React Site)

## ✅ Option 1: The Easy Way (Automated Blueprint)
1.  **Push your latest code** to GitHub.
2.  Go to **[dashboard.render.com](https://dashboard.render.com/)**.
3.  Click **"New"** -> **"Blueprint"** (or "Infrastructure from Code").
4.  Connect your GitHub repository.
5.  Render will detect `render.yaml`. Click **"Apply"**.
6.  Sit back! It will create the DB, Backend, and Frontend for you, all connected automatically.

---

## 🛠 Option 2: Manual Fix (If you prefer)

If you want to debug your current "Not Found" service:

### 1. Fix the Backend
The backend now requires a **Database**. A simple "Python" service won't work easily without setting environment variables.
*   **Docker Deployment**:
    *   **Dockerfile Path**: `backend/Dockerfile`
    *   **Context Directory**: `backend`
*   **Environment Variables**:
    *   `DATABASE_URL`: You *must* provide a PostgreSQL connection string (e.g., from Render's "New PostgreSQL" service).

### 2. Fix the Frontend
If you deployed the Frontend to Render:
*   Ensure **Publish Directory** is set to `frontend/dist` (not `public` or `frontend`).
*   Ensure **Build Command** is `cd frontend && npm install && npm run build`.
*   Ensure Environment Variable `VITE_API_URL` is set to your Backend URL.

---

### ❓ Why did I get "Not Found"?
*   **Backend**: If the app crashed (due to missing DB) or deployed from the wrong folder, the URL returns 404.
*   **Frontend**: If the "Publish Directory" was wrong, Render couldn't find `index.html`.
