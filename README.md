# Frontend Take-Home Bundle Builder

A modular, data-driven, two-column React prototype for a multi-step home security system bundle builder. This project includes a live review panel, multi-step accordion builder, variant-specific quantity tracking, and local client-side configuration persistence.

---

## 🚀 Features Implemented

### 1. Left Builder: 4-Step Accordion Flow
- Walks the shopper through:
  1. **Choose your cameras**
  2. **Choose your plan**
  3. **Choose your sensors**
  4. **Add extra protection**
- Dynamic header state:
  - Header displays "Step X of 4", step icons, and titles.
  - Active step is expanded and styled with a highlight background.
  - Right indicator shows **"N selected"** where *N* reflects the count of **distinct products** (unique `productId`s with quantity > 0) in that step, plus up/down chevrons.
  - Expanded step ends with a custom "Next: ..." action button that advances steps.

### 2. Product & Plan Cards
- Fully responsive grid layouts.
- Product cards support optional discount badges (e.g. "Save 22%"), descriptions, color variants, quantity steppers, and pricing calculations.
- Card highlights with a purple border in its **selected state** if any of its variants have a quantity greater than zero.

### 3. The Variant Selector & State Flow
- Color chips show thumbnails and labels.
- **Variant-specific quantities:** Selected quantity stepper is bound to the currently active color chip. Switching variants displays the quantity of the active chip while preserving the quantity of the other colors.
- All variants with a count greater than zero are listed individually on the live review panel.
- Doorbell products with no color variants automatically hide the selector, binding the stepper directly to the product.

### 4. Live Review Panel ("Your security system")
- Grouped list of selected items under category subheadings (**Cameras, Sensors, Accessories, Plan**).
- Displays thumbnail, formatted name (with variant details), quantity adjusters, and price.
- Plans hide the quantity adjusters, showing only subscribe/unsubscribe controls.
- Required items (like the Sense Hub) disable increment/decrement buttons to lock selection.
- Displays free shipping banner, satisfying Affirm finance badge (calculates monthly payments), total savings, total price with struck-through original price, and checkout/save actions.

### 5. Seeding & Config Persistence
- **Default Seed State:** Initial state loads preloaded matching the design requirements (required Sense Hub sensor, Cam Unlimited monthly plan, and required Solar Panel accessory) with zero cameras selected.
- **Client-Side Persistence:** "Save my system for later" stores current configuration. The configuration is stored in the browser's `localStorage` and synchronizes with the backend database.
- Reloading the page or visiting later restores the system configuration exactly as it was saved.
- **Checkout Action:** Places the order, clears local state, and deletes stored data.

---

## 📂 Project Structure

```
├── client/                 # React & Vite Frontend
│   ├── src/
│   │   ├── api/            # API client fetch handlers
│   │   ├── assets/         # Gilroy fonts and images
│   │   ├── components/     # UI components (ReviewPanel, AccordionStep, ProductCard, etc.)
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

## ⚙️ Run Instructions

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

## 🧠 Decisions & Tradeoffs

1. **Dual Configuration Persistence:**
   - *Decision:* Implemented persistence in both `localStorage` and the backend Express JSON database. 
   - *Tradeoff:* On page mount, `localStorage` is checked first. If found, it immediately renders the user's config offline. Otherwise, it falls back to fetching the default seed configuration from the backend, preventing delay.
2. **Distinct Product Selections Count:**
   - *Decision:* The "N selected" counter was calculated by grouping selections by `productId` rather than summing up item quantities. This ensures that selecting 3 variants of the same camera shows "1 selected" in the step header, aligning with standard e-commerce expectations.
3. **Required Accessories:**
   - *Decision:* Marked the pre-populated accessory (Solar Panel) as `required: true` in the initial configuration seed. This disables its quantity adjusters in both the builder and the review panel, meeting the design instruction: *"review panel's pre-populated sensors, accessory, and plan, which have no add-control in this particular view."*
