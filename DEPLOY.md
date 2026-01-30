# 🚀 How to Host Your Portfolio for Free

Since your app has both a **Frontend** (React) and a **Backend** (Python/FastAPI), we will use two different free services.

## Part 1: Backend Deployment (Render.com)
The backend needs to run Python, so we'll use **Render** which has a great free tier.

1. **Push your code to GitHub** (if you haven't already).
   - Make sure your full project (`backend` and `frontend` folders) is in the repo.
2. **Sign up/Login to [Render.com](https://render.com/)**.
3. Click **"New"** -> **"Web Service"**.
4. Connect your GitHub repository.
5. Configure the service:
   - **Name:** `my-portfolio-backend` (or similar)
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000`
6. Click **"Create Web Service"**.
7. Wait for it to deploy. Once done, it will give you a **URL** (e.g., `https://my-portfolio.onrender.com`).
   - **Copy this URL.** You need it for Part 2.

## Part 2: Frontend Deployment (Vercel)
Vercel is the best place to host React apps.

1. **Sign up/Login to [Vercel.com](https://vercel.com/)**.
2. Click **"Add New..."** -> **"Project"**.
3. Import the same GitHub repository.
4. Configure the project:
   - **Framework Preset:** `Vite` (it should auto-detect this).
   - **Root Directory:** Click "Edit" and select `frontend`.
   - **Environment Variables:**
     - Key: `VITE_API_URL`
     - Value: [PASTE YOUR BACKEND URL FROM PART 1] (No trailing slash, e.g., `https://my-portfolio.onrender.com`)
5. Click **"Deploy"**.

## Part 3: Final Check
1. Once Vercel finishes, click the domain it gives you.
2. Your portfolio should load!
3. Scroll down and chat with the AI. It might take 30 seconds to wake up the backend (since the free tier sleeps when inactive), but it will work!

## ⚠️ Important Note
On the **Free Tier**, your backend will "sleep" after 15 minutes of inactivity. The first time someone chats with it, it might take **30-60 seconds** to respond. This is normal for free hosting!
