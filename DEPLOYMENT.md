# GitHub Integration & Vercel Deployment Guide

This guide explains how your interactive developer portfolio dynamically integrates with the GitHub REST API and details the step-by-step process for deploying this React/Vite application to **Vercel**.

---

## 1. Automated GitHub Repository & Profile Fetching

The application is engineered with a **zero-overhead, serverless architecture**. Rather than requiring a backend proxy or manually updated JSON files, it dynamically queries the official public GitHub API client-side when the portfolio is loaded.

### Technical Implementation

When the user enters the site, a React `useEffect` hook triggers a dual asynchronous fetch process:

1. **User Profile Analysis**:
   - **Endpoint**: `https://api.github.com/users/ZayyanZaidi`
   - **Data Retrieved**: Name, location, avatar image, public bio, public repository count, and follower count.
   
2. **Repository Synchronization**:
   - **Endpoint**: `https://api.github.com/users/ZayyanZaidi/repos?sort=updated&per_page=100`
   - **Filtering Logic**: The application fetches up to 100 of your most recently updated repositories. It then automatically filters out any forked repositories (`!repo.fork`) to highlight only your original intellectual property and creations.
   - **Dynamic Metrics**: Repositories are displayed alongside real-time metrics including programming languages, stargazer counts (stargazers_count), and forks (forks_count).

No personal access token or API keys are required for standard public fetching, keeping your credentials completely safe from public inspection in browser network logs.

---

## 2. How to Deploy on Vercel

Vercel is the premier cloud platform for hosting high-performance frontend applications. Follow these steps to put your portfolio live:

### Step 1: Push Your Code to GitHub
Initialize your local git repository and push your project files to your GitHub account:
```bash
git init
git add .
git commit -m "feat: portfolio ready for deployment"
git remote add origin https://github.com/ZayyanZaidi/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Import Your Repository into Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click the **Add New** button and select **Project**.
3. Locate your `your-repo-name` repository in the list and click **Import**.

### Step 3: Configure Build & Development Settings
Vercel automatically detects Vite configurations. Verify that the build parameters are as follows:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Click Deploy
1. Click **Deploy**. Vercel will bundle your TypeScript code, optimize assets, and serve your portfolio on a high-speed global Edge network.
2. Within seconds, you will receive a public `https://*.vercel.app` URL to share with recruiters and peers.

---

## 3. Handling SPA Route Refreshes (Vercel Configuration)

To ensure that direct navigation or browser refreshes on secondary sub-routes (if any are added) load correctly, you can add a `vercel.json` configuration file at the root of your project:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
