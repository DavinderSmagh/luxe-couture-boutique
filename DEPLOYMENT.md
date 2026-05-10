# 🚀 Deployment Setup Guide — HGAMS CREATIONS

This guide walks you through setting up auto-deployment so your site goes live on every `git push`.

---

## Architecture

```
GitHub Push → GitHub Actions → Vercel (Frontend) + Render (Backend)
```

| Service | Deploys | Free Tier |
|---------|---------|-----------|
| **Vercel** | Frontend (Vite/React) | ✅ Yes |
| **Render** | Backend (Node.js/Express) | ✅ Yes |
| **MongoDB Atlas** | Database (already set up) | ✅ Yes |

---

## Step 1: Set Up Vercel (Frontend)

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New Project"** → Import your `luxe-couture-boutique` repo
3. Set the **Root Directory** to `frontend`
4. Vercel will auto-detect Vite — just click **Deploy**
5. After first deploy, get these values:

### Get Vercel Secrets

- **VERCEL_TOKEN**: Go to [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create a new token
- **VERCEL_ORG_ID**: Go to your Vercel dashboard → Settings → General → Copy "Vercel ID"
- **VERCEL_PROJECT_ID**: Go to your project → Settings → General → Copy "Project ID"

---

## Step 2: Set Up Render (Backend)

1. Go to [render.com](https://render.com) and sign up with your GitHub account
2. Click **"New" → "Web Service"**
3. Connect your `luxe-couture-boutique` repo
4. Configure:
   - **Name**: `hgams-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add **Environment Variables** on Render:
   - `MONGO_URI` → Your MongoDB Atlas connection string (copy from your `.env` file)
   - `NODE_ENV` → `production`
   - `PORT` → `5000`

### Get Render Deploy Hook

- Go to your Render service → **Settings** → **Deploy Hook**
- Copy the URL (looks like `https://api.render.com/deploy/srv-xxxx?key=xxxx`)

---

## Step 3: Add Secrets to GitHub

Go to your repo on GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 4 secrets:

| Secret Name | Value |
|---|---|
| `VERCEL_TOKEN` | Your Vercel personal token |
| `VERCEL_ORG_ID` | Your Vercel org/user ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |
| `RENDER_DEPLOY_HOOK_URL` | Your Render deploy hook URL |

---

## Step 4: Update Frontend API URL

Once your backend is live on Render, update the API URL in your frontend.

In `frontend/src/components/Products.jsx`, change:
```js
// FROM:
axios.get('http://localhost:5000/api/products')

// TO:
axios.get('https://your-backend-name.onrender.com/api/products')
```

> 💡 **Tip**: Create a `.env` file in `frontend/` with:
> ```
> VITE_API_URL=https://your-backend-name.onrender.com
> ```
> Then use `import.meta.env.VITE_API_URL` in your code.

---

## Step 5: Push & Watch It Deploy!

```bash
git add .
git commit -m "add CI/CD deployment"
git push
```

Go to your repo → **Actions** tab to watch the workflows run!

---

## How It Works

1. You push code to `main`
2. GitHub Actions runs automatically
3. **Frontend workflow**: Builds the Vite project → Deploys to Vercel
4. **Backend workflow**: Validates the build → Triggers Render deploy hook
5. Both services go live within ~1-2 minutes

Your live URLs will be:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
