# Enterprise AI-Powered SmartGadget + Lifestyle MegaStore Command Center

[Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[License](https://img.shields.io/badge/license-MIT-green.svg)
[Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
[MongoDB](https://img.shields.io/badge/database-MongoDB_Atlas-47A248.svg)
[Frontend](https://img.shields.io/badge/frontend-React_18_(Vite)-61DAFB.svg)
[Backend](https://img.shields.io/badge/backend-Express.js-000000.svg)
[Deploy Frontend](https://img.shields.io/badge/deploy-Vercel-000000.svg)
[Deploy Backend](https://img.shields.io/badge/deploy-Render-46E3B7.svg)

> A MERN e-commerce portfolio project with a React storefront, Express API, MongoDB persistence, OTP authentication, and role-aware catalog operations. Several shopping widgets and operational dashboards are prototypes; implementation status is documented below.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Key Highlights](#-key-highlights)
- [System Architecture](#-system-architecture)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 📌 Overview

MegaStore Command Center is an e-commerce portfolio project built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It currently includes a catalog API, JWT-based sign-in, email OTP registration/password reset, and a COD order endpoint. The interface also contains shopping and operations concepts at varying levels of completion.

The API uses JWT authentication, hashed short-lived OTPs, role checks for catalog/order operations, server-calculated order totals, MongoDB transactions for stock reservation, and bounded media uploads. The repository includes focused frontend and API tests, but does not yet include a production payment integration or production monitoring.

### Implementation Status
- **Implemented API flows:** registration/login/password reset, public product listing/search, role-protected product mutation, seller-owned product listing, COD order creation with server-side prices and transactional stock reservation, database-backed admin summary metrics, image/video upload endpoints.
- **Partially implemented UI:** checkout and order history use the API; cancellation/returns are not available yet. Several promotional/AI-labelled widgets are presentational and are not backed by dedicated services.
- **Not implemented:** Razorpay payment processing, measured Lighthouse scores, and production monitoring. Treat the HR showcase metrics and feature widgets as presentation content, not verified production evidence.

---

## 🔗 Live Demo

| Service | Link |
|---|---|
| 🌐 Frontend (Vercel) | `https://enterprise-ai-powered-smart-gadget-neon.vercel.app` |
| 🖥️ Backend API (Render) | `https://enterprise-ai-powered-smartgadget.onrender.com` |
| 👨‍💻 HR Showcase Page | `https://enterprise-ai-powered-smart-gadget-neon.vercel.app/for-hr` |

Register a Customer or Seller account from the live site. Administrative and other staff roles require provisioning outside the public registration flow; only Admin and Seller dashboards are currently implemented.

---

## 🌟 Key Highlights

- **Six account roles** — public signup supports Customer and Seller; other roles require administrator provisioning. Only Seller and Admin dashboard routes are currently implemented.
- **Authentication** — email OTP, unique IDs, password hashing, and JWT sign-in
- **Catalog and COD checkout** — API-backed product data, server-side price calculation, stock reservation, and order persistence
- **Shopping prototypes** — visual/voice search, price suggestions, deal widgets, delivery map, and invoice components are client-side experiences and are not backed by dedicated AI/payment/fulfilment services
- **Seller API** — protected product creation, stock changes, deletion, and seller-owned catalog listing; Seller dashboard reads and mutates the seller's API catalog
- **HR showcase page** (`/for-hr`) — architecture diagram and project notes; displayed performance badges are static, not measured
- **Dark-first responsive UI** — works on mobile, tablet, and desktop

---

## 🏗️ System Architecture

```
┌─────────────────────┐      HTTPS/REST       ┌─────────────────────┐
│   Vercel (Client)   │ ◄──────────────────► │   Render (API)      │
│   React 18 + Vite   │       JSON            │   Node + Express    │
│   React Router      │                       │   JWT + RBAC        │
│   Axios             │                       │   Multer uploads    │
└─────────────────────┘                       └─────────┬───────────┘
                                                        │
                              ┌─────────────────────────┼─────────────────────────┐
                              ▼                         ▼
                    ┌──────────────────┐    ┌──────────────────┐
                    │  MongoDB Atlas   │    │  Gmail SMTP      │
                    │  (Mongoose ODM)  │    │  (OTP emails)    │
                    └──────────────────┘    └──────────────────┘
```

**Request flow:** Client → Express API (JWT verified, role checked) → Mongoose models → MongoDB Atlas. OTPs are generated server-side, HMAC-hashed, stored with a 5-minute TTL, and emailed via Nodemailer. COD orders calculate prices from the catalog and reserve stock in a MongoDB transaction.

---

## ✨ Features

### 🔐 Authentication & Authorization
- **6 role values:** Admin, Seller, Customer, DeliveryAgent, SupportAgent, MarketingManager; public signup is limited to Customer and Seller
- **6-box email OTP** verification via real Gmail SMTP (5-minute expiry, resend timer)
- **Unique ID** in `XYZDDMMYYYY` format (role initial + name initials + date of birth)
- Same email can register for **multiple roles** (compound unique index on `email + role`)
- Forgot-password flow with OTP verification
- JWT-based sessions, protected frontend routes, role-checking backend middleware

### 🤖 AI-Assisted Features
- 📷 **AI Visual Search** — upload a product photo, receive similar items ranked by match %
- 🤖 **HaggleBot** — negotiate price with an AI agent (accept / counter-offer / reject logic)
- 🎤 **Voice Search** — speech-to-text search with automatic typo correction (`iphon` → `iphone`)
- 🧠 **Smart product pairing** — tag-based complementary product suggestions; no external AI model is connected
- 📈 **AI Price Prediction** widget on product detail pages

### 🛍️ Shopping Experience
- Product listing with **sorting & filtering**, wishlist, cart, order tracking
- Product detail page: image gallery and rotation UI (client-side presentation)
- **Side-by-side product comparison**
- **Price Drop Alerts**, **Recently Viewed** items, **Bundle Offers** (Frequently Bought Together)
- **Coupon engine:** `MEGA10`, `DIWALI20` + automatic bulk-quantity discounts
- **Payments:** COD checkout through the order API; no online payment provider is integrated
- Multiple saved delivery addresses (address book)
- 🎡 **Lucky Spin Wheel** promotional widget on the landing page
- ⚡ **Flash Deal** countdown timers on individual products
- 🎁 **Refer & Earn** — referral code `RUBEL100`, Rs.100 credit per successful referral

### 📦 Order Management
- Order placement and order history persist through the API; cancel/return actions are not currently available
- 🗺️ **Delivery Map** — presentation-only animation; no courier location feed is connected
- 🧾 **GST Invoice** — client-side invoice generator; tax/business details are not validated against a tax service
- 🎥 **Video Unboxing Reviews** — customers can upload video reviews (up to 50MB)

### 🏪 Seller Panel
- Product API supports create, stock update, and delete with seller ownership checks
- Low-stock alerts, CSV import, and seller chat are currently UI prototypes
- Product image/video upload endpoints are available through Multer

### 💳 Payments
- Cash on Delivery is the only implemented checkout method
- EMI and gateway-payment screens are not connected to a payment provider

### 👨‍💻 HR Showcase (`/for-hr`)
- System architecture diagram (Vercel → Render → MongoDB Atlas)
- Live demo video slot (YouTube/Loom embed)
- Performance score badges (Performance 98, Accessibility 95, Best Practices 100, SEO 100)
- Engineering write-ups: hardest bugs solved, key technical decisions

### 🎨 UI / UX
- Dark-first design system — SABLE `#060606`, INK BLACK `#212122`, SLATE `#26282A`, ONYX `#353839`
- Fully responsive layouts for mobile, tablet, and desktop
- Theme toggle, success toast notifications on every action, live date/time on dashboards

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite), React Router DOM, Axios |
| Backend | Node.js (≥18), Express.js, Multer (file uploads) |
| Database | MongoDB Atlas, Mongoose ODM |
| Authentication | JSON Web Tokens, Nodemailer (Gmail App Password), 6-digit OTP |
| Payments | Cash on Delivery; no payment gateway |
| Hosting | Vercel (frontend), Render (backend) |
| Version Control | Git, GitHub |
| Dev Environment | Termux on Android, GitHub Codespaces |

---

## 🗄️ Database Schema

| Collection | Purpose | Key Fields |
|---|---|---|
| `users` | All role accounts | `fullName`, `email`, `role`, `uniqueId`, bcrypt `password`; compound unique index on `email + role` |
| `otps` | Email verification codes | `email`, `otpHash`, `purpose` (register/reset), `expiresAt` (TTL 5 min) |
| `products` | Catalog | `name`, `price`, `mrp`, `category`, `images[]`, `stock`, `sellerId` |
| `orders` | Purchases | `customerId`, `customerEmail`, `items[]`, `total`, `status`, `address` |
| `reviews` | Ratings + video reviews | `productId`, `customerId`, `rating`, `text`, `videoUrl` |
| `coupons` | Discount codes | `code`, `percentOff`, `minOrder`, `expiresAt` |
| `referrals` | Refer & Earn ledger | `referrerId`, `referredEmail`, `bonusCredited`, `status` |

---

## 🔒 Security

- Passwords hashed with **bcrypt** (never stored in plain text)
- OTPs hashed before storage, single-use, **5-minute TTL** via MongoDB expiry index
- **JWT** access tokens with expiry; role-based middleware on every protected route
- `.env` secrets excluded from version control via `.gitignore` (`.env.example` provided as template)
- CORS restricted to the deployed frontend origin
- Order totals are calculated from catalog prices on the server; client-submitted prices are ignored
- Product-photo uploads require Admin/Seller access; review videos require Customer access and are size/type limited

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB Atlas** account (free tier is sufficient)
- **Gmail** account with an App Password (for OTP emails)

### Installation

**1. Clone the repository** (GitHub app er Code button theke URL copy kore nio)
```bash
git clone https://github.com/matiur25580/Enterprise-AI-Powered-SmartGadget-Lifestyle-MegaStore-Command-Center.git
cd Enterprise-AI-Powered-SmartGadget-Lifestyle-MegaStore-Command-Center
```

**2. Backend setup**
```bash
cd server
npm install
cp .env.example .env   # then fill in your values (see table below)
npm start
```
Backend runs on `http://localhost:10000` by default

**3. Frontend setup**
```bash
cd ../client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

For local development, the client defaults to `http://localhost:10000`; set `VITE_API_URL` to override it.

### Docker Compose

The Compose stack starts a single-node MongoDB replica set because transactional stock reservation requires a replica set. Create a root `.env` file containing a strong random `JWT_SECRET` (at least 32 characters) and, when using email OTP flows, `EMAIL_USER` and `EMAIL_PASS`. Then run `docker compose up --build`.

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` folder (see `.env.example` for the template):

| Variable | Required | Description | Example |
|---|---|---|---|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/megastore` |
| `JWT_SECRET` | ✅ | Random secret of at least 32 characters | Generate a unique value; do not use an example string |
| `EMAIL_USER` | ✅ | Gmail address used to send OTPs | `you@gmail.com` |
| `EMAIL_PASS` | ✅ | Gmail **App Password** (not your login password) | `abcd efgh ijkl mnop` |
| `PORT` | ⚪ | Backend port (Render assigns automatically) | `10000` |
| `CLIENT_URL` | ✅ | Comma-separated frontend origins allowed by CORS | `http://localhost:5173` |

> **Never commit `.env` to GitHub.** If a real secret was committed previously, rotate it; adding it to `.gitignore` does not erase it from Git history. Generate a Gmail App Password at Google Account → Security → 2-Step Verification → App passwords.

---

## 📁 Project Structure

```
MegaStore/
├── client/                          # React + Vite frontend (deployed on Vercel)
│   ├── src/
│   │   ├── components/              # 30+ reusable UI components
│   │   │   ├── VisualSearch.jsx     # AI photo-based product search
│   │   │   ├── HaggleBot.jsx        # AI price-negotiation chat
│   │   │   ├── VoiceSearch.jsx      # Speech search + typo correction
│   │   │   ├── SpinWheel.jsx        # Promotional lucky-draw wheel
│   │   │   ├── Referral.jsx         # Refer & Earn module
│   │   │   ├── FlashDeal.jsx        # Per-product countdown deals
│   │   │   ├── LiveMap.jsx          # Animated delivery tracking map
│   │   │   ├── VideoUpload.jsx      # Video review uploader (50MB cap)
│   │   │   ├── GstInvoice.jsx       # GST-compliant invoice generator
│   │   │   ├── SellerChat.jsx       # Seller customer-chat inbox
│   │   │   ├── StockAlert.jsx       # Low-stock push notifications
│   │   │   ├── ArchDiagram.jsx      # HR page: architecture diagram
│   │   │   ├── DemoVideo.jsx        # HR page: demo video embed
│   │   │   ├── PerfBadge.jsx        # HR page: performance badges
│   │   │   └── ...                  # Cart, EMI, Compare, Coupons, etc.
│   │   ├── pages/
│   │   │   ├── shop/                # Shop, ProductDetail, Orders,
│   │   │   │                        # Checkout, Wishlist, AddressBook
│   │   │   ├── seller/              # SellerDashboard, BulkUpload
│   │   │   ├── auth/                # Login, Register (6-box OTP),
│   │   │   │                        # ForgotPassword
│   │   │   └── hr/                  # HRShowcase — served at /for-hr
│   │   ├── context/
│   │   │   └── StoreContext.jsx     # Global state: cart, orders, auth
│   │   ├── App.jsx                  # Route definitions + landing page
│   │   ├── theme.css                # Dark design-system tokens
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express API (deployed on Render)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js              # Register, OTP, login, password reset
│   │   │   ├── products.js          # Catalog CRUD, search, filters
│   │   │   ├── orders.js            # Order placement, cancel, return
│   │   │   ├── upload.js            # Multer photo/video upload handlers
│   │   │   ├── payment.js           # Razorpay order creation/verify
│   │   │   ├── coupon.js            # Coupon validation engine
│   │   │   ├── review.js            # Ratings + video reviews
│   │   │   └── ...                  # referral, analytics, chat, etc.
│   │   ├── models/
│   │   │   ├── User.js              # 6 roles, uniqueId, compound index
│   │   │   ├── Product.js           # Catalog schema
│   │   │   ├── Order.js             # Order + status timeline
│   │   │   ├── Otp.js               # Hashed OTPs with TTL expiry
│   │   │   └── ...
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── roleCheck.js         # Role-based access control
│   │   ├── utils/
│   │   │   ├── sendEmail.js         # Nodemailer OTP mailer
│   │   │   └── generateId.js        # XYZDDMMYYYY unique-ID builder
│   │   └── server.js                # App entry point
│   ├── .env.example                 # Safe template (no secrets)
│   └── package.json
│
├── .gitignore                       # Excludes .env, node_modules, dist
└── README.md
```

---

## 🔌 API Reference

Base URL (production): `https://enterprise-ai-powered-smartgadget.onrender.com`

### Auth
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/send-otp` | Send registration OTP | Public |
| POST | `/api/auth/register` | Register with a valid OTP | Public |
| POST | `/api/auth/login` | Login with email or Unique ID | Public |
| POST | `/api/auth/forgot-password` | Request password-reset OTP | Public |
| POST | `/api/auth/reset-password` | Set new password with valid OTP | Public |

### Products
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/product/all?search=&category=&sort=&limit=` | List/search/filter products | Public |
| GET | `/api/product/:id` | Product detail | Public |
| GET | `/api/product/combo/:id` | Related products | Public |
| POST | `/api/product/add` | Create product | Seller, Admin |
| PUT | `/api/product/stock/:id` | Update stock | Seller (own), Admin |
| DELETE | `/api/product/:id` | Delete product | Seller (own), Admin |
| POST | `/api/product/seed` | Fill catalog to the 150-product minimum | Admin |

### Orders
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/order/create` | Place a COD order; server recalculates totals and reserves stock | Customer |
| GET | `/api/order/my/:email` | Fetch authenticated customer's orders | Customer |
| PUT | `/api/order/status/:id` | Update order status | Admin, DeliveryAgent |

### Uploads & Payments
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/upload/product-photo` | Upload image (≤5MB) | Public |
| POST | `/api/upload/review-video` | Upload video (≤50MB) | Public |

---

## ☁️ Deployment

### Backend → Render
1. Render dashboard → **New Web Service** → connect this repository
2. Set **Root Directory** to `server`
3. Build Command: `npm install` → Start Command: `npm start`
4. Add every variable from the [Environment Variables](#-environment-variables) table
5. Deploy — note the assigned `https://....onrender.com` URL

### Frontend → Vercel
1. Vercel dashboard → **Import** this repository
2. Set **Root Directory** to `client`, framework preset: **Vite**
3. Build Command: `npm run build` → Output Directory: `dist`
4. Environment variable: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy — Vercel auto-redeploys on every push to `main`

> **Note:** Render free-tier services sleep after inactivity — the first API request after idle may take ~30 seconds (cold start).

---

## 🧪 Testing

- **Automated tests:** not configured yet (`client` and `server` packages have no test scripts).
- **Available checks:** client production build (`cd client && npm run build`) and backend syntax check (`node --check server/src/server.js`).
- **Manual verification needed:** configure MongoDB and email credentials, then test registration, login, product creation, stock contention, and COD checkout end to end.

---

## 🛠️ Troubleshooting

| Issue | Likely Cause | Fix |
|---|---|---|
| OTP email never arrives | Gmail App Password missing/invalid | Generate a fresh App Password; check `EMAIL_USER`/`EMAIL_PASS` |
| `EADDRINUSE` on start | Old Node process still bound to port | `pkill -f node` then restart |
| CORS errors in browser | `CLIENT_URL` mismatch | Set `CLIENT_URL` to the exact Vercel URL |
| Render cold start | Free tier sleeping | Wait ~30s on first request |
| Vercel build fails | Stray characters in JSX | Check build log; keep one expression per JSX block |

---

## 📸 Product Gallery

The catalog assets below are included in the repository and illustrate the range of product imagery used by the storefront. They are **catalog product images, not screenshots of the live application**. Images are displayed in one vertical column for easy reading on desktop and mobile.

### 01 · Wireless audio — AirPods Pro

<img src="client/public/products/airpods-pro-2nd-gen/2.jpg" alt="Wireless earbuds product image from the SmartGadget catalog" width="100%" />

*Wireless audio imagery for the accessories catalog.*

---

### 02 · Travel accessories — American Tourister backpack

<img src="client/public/products/american-tourister-32l-backpack/1.jpg" alt="American Tourister backpack product image" width="100%" />

*Travel and everyday-carry products in the lifestyle range.*

---

### 03 · Camera accessories — Lens protector

<img src="client/public/products/camera-lens-protector/2.jpg" alt="Camera lens protector product image" width="100%" />

*Small accessories that complement mobile photography devices.*

---

### 04 · Storage accessories — HP USB drive

<img src="client/public/products/hp-64gb-usb-pendrive/1.jpg" alt="HP USB flash drive product image" width="100%" />

*Portable storage from the computer accessories catalog.*

---

### 05 · Smartphones — iPhone 15

<img src="client/public/products/iphone-15-128gb-blue/1.jpg" alt="Blue iPhone 15 product image" width="100%" />

*Smartphone product imagery for the main device catalog.*

---

### 06 · Mobile protection — Clear phone case

<img src="client/public/products/iphone-15-clear-case/2.jpg" alt="Clear iPhone 15 protective case product image" width="100%" />

*Protective accessories presented alongside compatible devices.*

---

### 07 · Laptop accessories — Protective sleeve

<img src="client/public/products/laptop-sleeve-15-6-inch/1.jpg" alt="15.6-inch laptop sleeve product image" width="100%" />

*Laptop carry and protection accessories.*

---

### 08 · Desk setup — Wireless charging lamp

<img src="client/public/products/led-desk-lamp-with-wireless-charger/2.jpg" alt="LED desk lamp with wireless charger product image" width="100%" />

*Desk and workspace accessories from the lifestyle range.*

---

### 09 · Power accessories — 20,000 mAh power bank

<img src="client/public/products/mi-20000mah-power-bank-3i/1.jpg" alt="Mi 20,000 mAh power bank product image" width="100%" />

*Portable charging products for everyday use.*

---

### 10 · Data storage — External hard drive

<img src="client/public/products/wd-2tb-external-hard-disk/2.jpg" alt="WD 2 TB external hard drive product image" width="100%" />

*External storage from the computing accessories catalog.*

---

### 11 · Wireless audio — alternate product view

<img src="client/public/products/airpods-pro-2nd-gen/3.jpg" alt="Alternate product view of wireless earbuds" width="100%" />

*An additional catalog angle for the wireless audio listing.*

---

### 12 · Smartphones — alternate iPhone view

<img src="client/public/products/iphone-15-128gb-blue/2.jpg" alt="Alternate product view of the blue iPhone 15" width="100%" />

*An additional product angle to demonstrate multi-image catalog support.*

---

## 🗺️ Roadmap

- [ ] Integrate and test a payment provider with server-side signature verification
- [ ] Seller-uploaded product photography pipeline (upload infra already in place)
- [ ] Web-push notifications via service worker
- [ ] Multi-language UI (Bengali / Hindi / English)
- [x] Connect seller catalog and admin summary dashboards to authenticated APIs
- [ ] Connect order history and cancellation/return workflows to authenticated APIs
- [x] Add focused frontend and API tests (expand coverage for role journeys and deployment)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit with clear messages (`git commit -m "Add: EMI calculator on checkout"`)
4. Push and open a Pull Request against `main`

---

## 👤 Author

**Matiur Rahaman** — Full-Stack Developer, Kolkata, India

- GitHub: [@matiur25580](https://github.com/matiur25580)
- Email: `rahamanmatiur397@gmail.com`
- Languages: Bengali, Hindi, English
- Focus: building real, production-grade full-stack applications. This entire project was developed on an Android phone using Termux and GitHub Codespaces.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with MongoDB, Express, React & Node.js</p>
