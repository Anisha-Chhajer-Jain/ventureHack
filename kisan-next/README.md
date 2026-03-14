# KisanDost (VentureHack Project)

A beautiful, multilingual, and intuitive web application designed for Indian farmers. It features AI-powered precision fertilizer dosing, crop health monitoring with NDVI rings, real-time farmer tools, and an advanced AI Profit Intelligence system.

## 🚀 Tech Stack

- **Framework**: **Next.js 16** (App Router, Server Components)
- **Language**: **TypeScript**
- **UI & Styling**: **Tailwind CSS (v4)**, **shadcn/ui**, **Base UI**, **Lucide React**
- **Authentication**: **Clerk** (`@clerk/nextjs` - Google OAuth)
- **Database**: **MongoDB** (via **Mongoose**)
- **Internationalization**: **`next-intl`** (English, Hindi, Gujarati)
- **Data Visualization**: **Recharts**
- **Animation & Utilities**: **tw-animate-css**, **clsx**, **tailwind-merge**, **sonner**

---

## 🌟 Core Features

- **Farmer Dashboard**: A centralized hub for farmers to view their crop status and important updates.
- **Multilingual Support**: Fully localized in Hindi, Gujarati, and English using `next-intl`.
- **Fertilizer Calculator**: Precision NPK requirements calculator securing customized outputs against MongoDB profiles.
- **Onboarding Intercept**: Seamless data collection (Mobile, Village, Crop) for new users.
- **AI Profit Intelligence**: Predict yield and estimate profits dynamically (Details below).
- **Live Weather**: Location-based weather updates mapping complex weather conditions to actionable farming advice.

---

## 🧠 AI Profit Intelligence & Mathematical Models

KisanDost includes a state-of-the-art **AI Profit Intelligence Tool** designed to give farmers reliable estimates on their crop yield and expected net profit based on their farm's specific parameters and real-time APMC Mandi prices.

### 1. Yield Prediction Regression Model
The application uses a Random Forest-inspired multiple linear regression simulation to determine the per-acre yield. The formula considers NPK (Nitrogen, Phosphorus, Potassium) soil levels, rainfall, and fertilizer usage.

**The Regression Formula:**
```
Base Yield (crop-specific) 
  + (Soil Nitrogen × 0.05) 
  + (Soil Phosphorus × 0.03) 
  + (Soil Potassium × 0.02) 
  + (Rainfall (mm) × 0.01) 
  + (Fertilizer Used (kg) × 0.05)
  ± Random Noise Variation (Account for natural unpredictability)
= Predicted Yield (Per Hectare/Acre)
```

**Total Yield Calculation:**
```
Total Predicted Yield = Predicted Yield (Per Hectare/Acre) × Land Area
```

### 2. Live Market Prices (APMC Data)
We fetch the latest crop market prices using a database schema (`MarketPrice`). When the user queries predicting their profit, the backend queries the database for the active `mandi` (e.g., Chittorgarh, Surat, Indore). If the specific crop isn't currently listed for that region, it falls back to a realistic seeded average (e.g., Wheat at ₹2,350/Quintal).

### 3. Profit Computations
The financial calculations provide a transparent breakdown of Revenue vs. Net Profit.

- **Estimated Revenue**: 
  `Predicted Yield (Quintals) × Market Price Per Quintal`
  *This is the gross amount the farmer will make by selling the produce.*

- **Estimated Fertilizer Cost**: 
  `Total Fertilizer Used (kg) × ₹10 (Standard base rate per kg) × Land Area`
  *Calculates the input cost scaled by the farm's size.*

- **Net Profit**: 
  `Estimated Revenue - Estimated Fertilizer Cost`
  *The actual take-home estimate presented clearly on the frontend.*

### 4. Confidence Score Generation
Each prediction provides an AI Confidence Score, demonstrating certainty based on the input features. Simulated as:
`Confidence Score = 85% + (Random variance up to 10%)`
Real-world systems expand this into standard deviations on input parameters, verifying how closely the farmer's land inputs match the training datasets.

---

## 🚧 Upcoming Features (In Development)

1. **Pesticides Timestamp & Alerts**:
   An automated notification system that sends farmers timely messages and alerts indicating the exact time to spread pesticides on their plants.
2. **Agriculture Loan Section**:
   A dedicated financial assistance module where farmers can easily browse and apply for appropriate agriculture loans directly through the platform.
3. **Government Schemes Portal**:
   A comprehensively curated section displaying all the latest daily government schemes.

---

## 🛠️ Project Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Clerk Keys 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Webhook Secret
WEBHOOK_SECRET=whsec_...

# MongoDB Connection String (Atlas Cluster)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/kisandost?retryWrites=true&w=majority

# Weather API Key (weatherapi.com)
WEATHER_API_KEY=your_api_key_here
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
