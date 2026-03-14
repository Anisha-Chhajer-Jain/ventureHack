# KisanDost - Digital Companion for Indian Farmers

KisanDost is a professional, multilingual Progressive Web App (PWA) designed to empower small and medium-scale farmers in India. It provides precision agriculture tools, real-time weather advisories, and expert disease management guidance.

---

## 🚀 Core Features & Implementation

### 1. Unified Authentication & User Syncing
- **Provider**: [Clerk](https://clerk.com/) (Google OAuth).
- **Implementation**: We use Clerk for secure, passwordless login. 
- **Data Sync**: A specialized **Webhook Architecture** (`/api/webhooks/clerk`) listens for `user.created` events. When a farmer signs up, their profile is automatically mirrored into our **MongoDB** database, allowing us to attach farm-specific data (Mobile, Village, Primary Crop) to their account during the onboarding flow.

### 2. Multi-Language Support (i18n)
- **Framework**: `next-intl` (App Router).
- **Supported Languages**: English (EN), Hindi (HI), Gujarati (GU).
- **Logic**: All UI strings and even deeply nested crop/disease data are extracted into JSON translation files (`/messages/*.json`). The app uses the URL locale (e.g., `/hi/diseases`) to dynamically switch namespaces, ensuring a comfortable experience for farmers in their native language.

### 3. AI-Powered Fertilizer Calculator
- **Purpose**: Prevents over-fertilization, saves costs, and optimizes yield.
- **Calculation Logic**:
    - **Base Requirement**: Each crop (Wheat, Rice, etc.) has a standard N-P-K (Nitrogen, Phosphorus, Potassium) requirement per acre stored in `src/data/fertilizers.ts`.
    - **Adjustments**:
        - **Soil Type**: Sandy soil increases requirements by 20% (due to leaching), while Clay decreases them by 10% (better retention).
        - **Existing Levels**: Farmers can input current NPK test results, which are subtracted from the target dosage.
    - **Fertilizer Conversion**: The tool converts NPK requirements into specific bag counts for **Urea (46% N)**, **DAP (18% N, 46% P)**, and **MOP (60% K)**.
    - **Persistence**: Calculations are saved to MongoDB, tracking cost estimates and bag requirements over time.

### 4. Disease & Pest Management
- **Data Source**: A comprehensive, 29-crop encyclopedia (`src/data/crop-diseases.ts`).
- **UI Design**: A custom two-column "Care Card" layout featuring:
    - **Symptoms**: High-contrast blocks with visual icons for easy identification in the field.
    - **Favorable Conditions**: Guidance on weather patterns that trigger outbreaks.
    - **Pest Control**: Direct "Action Items" for prevention and chemical/biological control.
- **Commerce Integration**: "View Store Products" buttons provide a pathway to recommended pesticides/fungicides.

### 5. Smart Weather & Farmer Advisory
- **Data Source**: [WeatherAPI.com](https://www.weatherapi.com/) via a secure server-side Proxy (`/api/weather`).
- **Advisory Logic**: The system doesn't just show temperature; it interprets data into actionable tips:
    - **Heat Alert**: Triggered at >40°C or high UV (>8) to recommend early morning irrigation.
    - **Fungal Risk**: Triggered when humidity >85% without rain.
    - **Work Planning**: Advises against spraying during strong winds (>40 km/h) or heavy rain.
- **Location**: Uses Browser Geolocation (GPS) with an IP-based fallback to ensure the farmer always sees local data.

### 6. NDVI Health Monitoring (Visualized)
- **Implementation**: The dashboard visualizes **NDVI (Normalized Difference Vegetation Index)** using high-quality conic gradients.
- **Scale**:
    - **0.7 - 1.0**: Healthy (Green)
    - **0.4 - 0.7**: Moderate (Yellow)
    - **Below 0.4**: Stress (Red)
- **Context**: This allows farmers to quickly gauge if their field requires urgent attention before physical symptoms appear.

---

## 🧪 Scientific & AI Methodology

The application employs several data science and mathematical models to provide precision agricultural advice:

### 1. Linear Multi-Variable Regression (Nutrient Prediction)
The **Fertilizer Calculator** follows a linear regression-inspired model for dosing. It maps input variables ($X$) such as Crop Type, Soil Characteristic ($S$), and Current Soil Saturation ($N_{curr}$) to a predicted target dosage ($Y$):
$$Y = (R_{crop} \times S_{coeff}) - N_{curr}$$
Where $R_{crop}$ is the base requirement and $S_{coeff}$ is the soil adjustment weight (Slope).

### 2. Optical Remote Sensing Theory (NDVI)
The apps health monitoring is based on the **Spectral Reflectance** of chlorophyll. By calculating the ratio between Near-Infrared (NIR) and Red light, the app identifies plant vigor.
$$NDVI = \frac{NIR - Red}{NIR + Red}$$
The app translates these raw floating-point values into localized "Health Thresholds" using a deterministic classification model.

### 3. Rule-Based Expert System (Weather Advisories)
For weather insights, the app uses a **Heuristic Knowledge Base** (Expert System). It processes real-time environmental data streams through a set of fuzzy logic-style thresholds to determine the "Advisory Profile" (e.g., *Skip Spraying* if Wind > Threshold AND Rain = True).

---

## 🛠️ Technical Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS + Framer Motion (for smooth, farmer-friendly animations)
- **Components**: Shadcn UI (Radix UI)
- **Database**: MongoDB (Mongoose)
- **State Management**: React Context (Weather, Auth)

## 📦 Getting Started

1. **Clone the repo** and navigate to `kisan-next`.
2. **Setup .env.local**:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   WEBHOOK_SECRET=...
   MONGODB_URI=...
   WEATHER_API_KEY=...
   ```
3. **Run**: `npm install` then `npm run dev`.

---

*Designed with ❤️ for the Indian Farmer.*
