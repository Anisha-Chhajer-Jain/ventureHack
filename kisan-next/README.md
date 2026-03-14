# KisanDost - Next.js App Router Edition

A beautiful, multilingual, and intuitive web application designed for Indian farmers. It features AI-powered precision fertilizer dosing, crop health monitoring with NDVI rings, and real-time farmer tools.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Server Components)
- **UI & Styling**: Tailwind CSS, shadcn/ui, Lucide React
- **Authentication**: Clerk (Google OAuth only)
- **Database**: MongoDB (Mongoose)
- **Internationalization**: `next-intl` (Hindi, Gujarati, English)

## Project Setup Instructions

Follow these exact steps to connect your backend services and run the app locally:

### 1. Environment Variables
Create a `.env.local` file in the root directory and add the following keys. 

```env
# Clerk Keys (Get these from Clerk Dashboard -> API Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Webhook Secret (Clerk Dashboard -> Webhooks -> Add Endpoint -> Point to `<YOUR_URL>/api/webhooks/clerk`)
WEBHOOK_SECRET=whsec_...

# MongoDB Connection String (Atlas Cluster)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/kisandost?retryWrites=true&w=majority
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Core Workflows
- **Webhook Syncing**: When a user registers via Clerk's Google OAuth, their data is instantly mapped to the MongoDB `users` collection via the webhook.
- **Onboarding Intercept**: Existing users are routed to `/dashboard`. New users are forced through `/onboarding` to collect essential data (Mobile, Village, Crop) before continuing.
- **Fertilizer Calculator**: NPK requirements are calculated securely against MongoDB profiles, letting farmers save cost and optimize yield.
