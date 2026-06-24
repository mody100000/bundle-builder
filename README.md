# Frontend Take-Home Bundle Builder

A monorepo built with React + Vite (frontend) and Express (backend), both in TypeScript.
Features a high-fidelity, interactive multi-step bundle builder with a live order summary panel.

---

## 📸 Screenshots

<img width="1920" height="1080" alt="2026-06-24-191908_hyprshot" src="https://github.com/user-attachments/assets/e4805193-e7e0-4116-895e-593d9ece0f44" />
<br><br>
<img width="1902" height="2898" alt="bundle-builder" src="https://github.com/user-attachments/assets/03c4d3ca-1124-4269-9629-844992956abf" />
<br><br>
<img width="1902" height="3333" alt="bundle-builder (1)" src="https://github.com/user-attachments/assets/e86beb87-182b-4bb1-ab87-1b643f86ec4c" />
<br><br>
<img width="1902" height="2819" alt="bundle-builder-middle-screens" src="https://github.com/user-attachments/assets/dcdf79f0-ca82-467f-9228-872a4d023616" />

---

## 📂 Folder Structure

```
├── client/                 # React & Vite Frontend
│   ├── src/
│   │   ├── api/            # API client fetch handlers
│   │   ├── assets/         # Gilroy fonts and images
│   │   ├── components/     # Step-specific UI components (Builder, ReviewPanel, AccordionStep)
│   │   │   └── common/     # Reusable UI components (ProductCard, PlanCard, NextButton, ProductModal, Modal)
│   │   ├── context/        # BuilderContext state management
│   │   ├── hooks/          # API resource custom hooks
│   │   └── types/          # TypeScript interfaces
├── server/                 # Express backend serving mock APIs
│   ├── src/
│   │   ├── data/           # JSON files (cameras, plans, sensors, protection, configurations)
│   │   └── routes/         # Router handlers
└── package.json            # Root scripts & dev dependencies
```

---

## ⚙️ Installation & Run

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies

Run the install command from the project root. The configured postinstall scripts will automatically install client and server packages:

```bash
npm install
```

### 2. Start Development Servers

Start both the React client and Express backend concurrently:

```bash
npm run dev
```

The application will launch on:

- **Frontend client:** `http://localhost:5174/` (or the next available port)
- **Backend server:** `http://localhost:5000/`

---

## 🛠️ Tech Stack

### Frontend
- **React (v19):** Declarative component-based UI development.
- **TypeScript:** For compile-time type safety.
- **Vite:** High-performance, instant hot-reloading dev server and build tool.
- **Tailwind CSS (v4):** Modern, utility-first CSS styling.
- **React Toastify:** For responsive UI notifications (e.g. system saved/checkout confirmations).

### Backend
- **Node.js & Express:** Lightweight, fast routing engine to handle configurations and product APIs.
- **TypeScript & ts-node-dev:** For end-to-end type-safe development environments with automatic hot-reloads.

### Tooling
- **Concurrently:** Enables running the React client and Express backend simultaneously with a single root command.

---

## 🚀 Features Implemented

This project builds a state-of-the-art e-commerce experience featuring:

### 1. Multi-Step Accordion Flow

- Walks the shopper through cameras, plans, sensors, and accessories.
- The active step is highlighted with distinct borders/backgrounds and features standard up/down chevrons.
- Step headers show a **"N selected"** counter that reflects the number of **distinct products** selected (unique `productId`s with quantity > 0), preventing multiple variants of the same product from double-counting.
- Includes smooth scroll triggers and "Next: ..." action buttons that advance to the next step.

### 2. Product Variant Selection

- High-fidelity product cards render optional discount badges, descriptions, custom color variants, and quantity selectors.
- **Variant-specific quantities:** Selected quantity stepper is bound to the active color variant chip. Switching variants displays the quantity of the active chip while preserving the quantity of other colors.
- All selected variants with a count greater than zero are listed individually on the live review panel.
- Doorbell products with no variants automatically hide the selector, binding the stepper directly to the product.

### 3. Live Review Panel

- Grouped list of selected items under category subheadings (**Cameras, Sensors, Accessories, Plan**).
- Displays thumbnails, formatted names (with variant details), quantity adjusters, and price.
- Plans hide the quantity adjusters, showing only subscribe/unsubscribe controls.
- Required items (like the Sense Hub) disable increment/decrement buttons to lock selection.
- Displays free shipping banner, satisfying Affirm finance badge (calculates monthly payments), total savings, total price with struck-through original price, and checkout/save actions.

### 4. How We Save the Data (Configuration Persistence)

- **State Seeding:** On first load, the app is preloaded with the default seed state matching the designs (required Sense Hub sensor, Cam Unlimited monthly plan, and required Solar Panel accessory) with zero cameras.
- **Client-Side Persistence:** When a shopper clicks **"Save my system for later"**, the current configuration state is saved to the browser's `localStorage` using their unique `systemId`.
- **Server-Side Persistence:** Concurrently, the configuration is synchronized with the backend database. The backend writes this configuration to a dedicated file (`config_<systemId>.json`) in its server data directory.
- **Restoration:** On page reload or return visit, the system checks `localStorage` first to restore state instantly without layout shift. If not cached locally, it falls back to fetching from the backend database using the visitor's `systemId`.
- **Checkout Action:** Places the order, clears local state, and deletes stored data from both `localStorage` and the backend.
