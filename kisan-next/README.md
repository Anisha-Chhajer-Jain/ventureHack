# KisanDost (VentureHack Project)

A beautiful, multilingual, and intuitive web application designed for Indian farmers. It features AI-powered precision fertilizer dosing, crop health monitoring with NDVI rings, and real-time farmer tools.

## 🚀 Tech Stack

- **Framework**: **Next.js 16** (App Router, Server Components)
  - *Use*: Acts as the core framework for our React application, enabling server-side rendering (SSR) and static site generation (SSG) for highly performant, SEO-friendly farming tools. The App Router provides structured routing for features like the Dashboard, Loans, and Schemes.
- **Language**: **TypeScript**
  - *Use*: Adds static typing to JavaScript, helping us catch errors early during development. It ensures that the data flowing through our components (like farmer profiles and fertilizer calculations) is reliable and bug-free, making the codebase much easier to maintain and scale.
- **UI & Styling**: **Tailwind CSS (v4)**, **shadcn/ui**, **Base UI**, **Lucide React**
  - *Use*: Provides a modern, responsive, and beautiful design system. Tailwind allows rapid utility-first styling, while `shadcn/ui` offers accessible, pre-built components (like dialogs, forms, and buttons). Lucide React provides clear, scalable iconography.
- **Authentication**: **Clerk** (`@clerk/nextjs` - Google OAuth)
  - *Use*: Manages secure user authentication and identity. Simplifies the onboarding process for farmers (such as Google OAuth) and ensures that their personal farm data, saved preferences, and loan applications are kept private and secure.
- **Database**: **MongoDB** (via **Mongoose**)
  - *Use*: A flexible, NoSQL database used to store farmer profiles, specific farm details, crop cycles, and application data. Mongoose provides a structured schema to guarantee safe and validated data transactions.
- **Internationalization**: **`next-intl`**
  - *Use*: Powers the crucial multilingual capabilities of KisanDost. It allows the interface to seamlessly switch between English, Hindi, and Gujarati, ensuring the platform is genuinely accessible and easy to understand for local farmers.
- **Data Visualization**: **Recharts**
  - *Use*: Renders interactive and responsive charts for visualizing complex agricultural data, such as crop health reports, NDVI levels, and precise NPK fertilizer requirement graphs.
- **Animation & Utilities**: **tw-animate-css**, **clsx**, **tailwind-merge**, **sonner**
  - *Use*: Enhances the overall user experience with smooth interactions, dynamic component styling, and neat micro-animations. `sonner` provides elegant toast notifications for alerts (like correct pesticide timings or successful form submissions).

## 🌟 Current Features

- **Farmer Dashboard**: A centralized hub for farmers to view their crop status and important updates.
- **Multilingual Support**: Fully localized in Hindi, Gujarati, and English using `next-intl`.
- **Fertilizer Calculator**: Precision NPK requirements calculator securing customized outputs against MongoDB profiles, letting farmers save cost and optimize yield.
- **Onboarding Intercept**: Seamless data collection (Mobile, Village, Crop) for new users before redirecting them to the dashboard.
- **Webhook Syncing**: User data automatically maps to MongoDB `users` collection via Clerk webhook when a user registers.
- **Farmer Tools**: Additional real-time tools to assist farmers with daily agricultural needs.

## 🚧 Upcoming Features (In Development)

1. **Pesticides Timestamp & Alerts**:
   An automated notification system that sends farmers timely messages and alerts indicating the exact time to spread pesticides on their plants, based on the crop cycle and conditions.
2. **Agriculture Loan Section**:
   A dedicated financial assistance module where farmers can easily browse and apply for appropriate agriculture loans directly through the platform.
3. **Government Schemes Portal**:
   A comprehensively curated section displaying all the latest daily government schemes. By clicking on any scheme, the user will be instantly directed to the official government portal to apply seamlessly.

## 🛠️ Project Setup Instructions

Follow these exact steps to connect your backend services and run the app locally:

### 1. Environment Variables
Create a `.local` file in the root directory and add the following keys. 

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.
