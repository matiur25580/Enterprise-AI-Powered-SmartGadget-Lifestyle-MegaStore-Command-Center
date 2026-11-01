# Enterprise AI-Powered SmartGadget + Lifestyle MegaStore Command Center

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB_Atlas-47A248.svg)
![Frontend](https://img.shields.io/badge/frontend-React_18_(Vite)-61DAFB.svg)
![Backend](https://img.shields.io/badge/backend-Express.js-000000.svg)
![Deploy Frontend](https://img.shields.io/badge/deploy-Vercel-000000.svg)
![Deploy Backend](https://img.shields.io/badge/deploy-Render-46E3B7.svg)

> A production-grade, full-stack MERN e-commerce platform with role-based access control, AI-assisted shopping features, real email OTP authentication, online payments, and live cloud deployment.

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

MegaStore Command Center is an enterprise-style e-commerce command platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It supports the complete commerce lifecycle — product catalog management, AI-assisted product discovery, secure checkout with online payments, order fulfilment tracking, seller operations, and business invoicing — across **6 distinct user roles**.

The project was designed with production concerns in mind: JWT-based authentication with email OTP verification, compound unique constraints for multi-role accounts, file upload handling, payment gateway integration, and separate cloud deployments for frontend and backend.

---

## 🔗 Live Demo

| Service | Link |
|---|---|
| 🌐 Frontend (Vercel) | `https://enterprise-ai-powered-smart-gadget-neon.vercel.app` |
| 🖥️ Backend API (Render) | `https://enterprise-ai-powered-smartgadget.onrender.com` |
| 👨‍💻 HR Showcase Page | `https://enterprise-ai-powered-smart-gadget-neon.vercel.app/for-hr` |

> ✏️ `https://enterprise-ai-powered-smart-gadget-neon.vercel.app` er jaygay tomar asol Vercel URL bosao (2 jaygay ache)

**Demo accounts:** Register a new account from the live site — OTP will arrive at your email within seconds. Each role (Admin, Seller, Customer, DeliveryAgent, SupportAgent, MarketingManager) has its own dashboard.

---

## 🌟 Key Highlights

- **6 role-based dashboards** — Admin, Seller, Customer, DeliveryAgent, SupportAgent, MarketingManager, each with dedicated workflows
- **Real authentication** — 6-box email OTP via Gmail SMTP, unique user IDs (`XYZDDMMYYYY`), JWT sessions; no hardcoded demo logins
- **AI-assisted shopping** — visual search by photo, price negotiation chatbot, voice search with typo correction, smart product combos
- **Complete order lifecycle** — cart → checkout (COD / EMI / Razorpay) → live delivery map → GST invoice → return/exchange
- **Seller operations** — product CRUD, bulk CSV import with template, low-stock push alerts, live customer chat
- **Business-ready invoicing** — GST-compliant invoices with GSTIN validation, CGST/SGST split, print/PDF export
- **Dedicated HR showcase page** (`/for-hr`) — architecture diagram, performance metrics, engineering decisions
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
                              ▼                         ▼                         ▼
                    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
                    │  MongoDB Atlas   │    │  Gmail SMTP      │    │  Razorpay        │
                    │  (Mongoose ODM)  │    │  (OTP emails)    │    │  (payments)      │
                    └──────────────────┘    └──────────────────┘    └──────────────────┘
```

**Request flow:** Client → Express API (JWT verified, role checked) → Mongoose models → MongoDB Atlas. OTPs are generated server-side, hashed, stored with 5-minute TTL, and emailed via Nodemailer. Payments are initiated server-side through Razorpay Orders API; the client only completes the authorized checkout.

---

## ✨ Features

### 🔐 Authentication & Authorization
- **6 Roles:** Admin, Seller, Customer, DeliveryAgent, SupportAgent, MarketingManager
- **6-box email OTP** verification via real Gmail SMTP (5-minute expiry, resend timer)
- **Unique ID** in `XYZDDMMYYYY` format (role initial + name initials + date of birth)
- Same email can register for **multiple roles** (compound unique index on `email + role`)
- Forgot-password flow with OTP verification
- JWT-based sessions, protected frontend routes, role-checking backend middleware

### 🤖 AI-Assisted Features
- 📷 **AI Visual Search** — upload a product photo, receive similar items ranked by match %
- 🤖 **HaggleBot** — negotiate price with an AI agent (accept / counter-offer / reject logic)
- 🎤 **Voice Search** — speech-to-text search with automatic typo correction (`iphon` → `iphone`)
- 🧠 **AI Perfect Combo** — contextual accessory suggestions (e.g. iPhone → Cover + Adapter + Earbuds)
- 📈 **AI Price Prediction** widget on product detail pages

### 🛍️ Shopping Experience
- Product listing with **sorting & filtering**, wishlist, cart, order tracking
- Product detail page: **6-slide image gallery, fullscreen view, 3D ±180° rotation**
- **Side-by-side product comparison**
- **Price Drop Alerts**, **Recently Viewed** items, **Bundle Offers** (Frequently Bought Together)
- **Coupon engine:** `MEGA10`, `DIWALI20` + automatic bulk-quantity discounts
- **Flexible payments:** COD, EMI plans (8% interest; 3/6/9/12/24-month tenures on high-value items)
- Return / Exchange / Cancel flows with reason capture
- Multiple saved delivery addresses (address book)
- 🎡 **Lucky Spin Wheel** promotional widget on the landing page
- ⚡ **Flash Deal** countdown timers on individual products
- 🎁 **Refer & Earn** — referral code `RUBEL100`, Rs.100 credit per successful referral

### 📦 Order Management
- Order history with live status badges (placed → shipped → out for delivery → delivered)
- 🗺️ **Live Delivery Map** — animated rider position tracking from warehouse to customer
- 🧾 **GST Invoice** — business invoices with company name + 15-character GSTIN validation, CGST/SGST tax split, Print / Save-as-PDF
- 🎥 **Video Unboxing Reviews** — customers can upload video reviews (up to 50MB)

### 🏪 Seller Panel
- Full product CRUD (create, read, update, delete)
- ⚠️ **Low-stock alerts** with browser push notifications + one-tap restock action
- 📥 **Bulk CSV import** with a downloadable CSV template for correct formatting
- 💬 **Seller Live Chat** — customer conversation inbox with reply interface
- Real product photo uploads via Multer (`/api/upload`)

### 💳 Payments
- **Razorpay** payment gateway integration (test mode `rzp_test_...`; production keys after KYC)
- EMI plan calculator, Cash on Delivery (COD) support

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
| Payments | Razorpay Orders API |
| Hosting | Vercel (frontend), Render (backend) |
| Version Control | Git, GitHub |
| Dev Environment | Termux on Android, GitHub Codespaces |

---

## 🗄️ Database Schema

| Collection | Purpose | Key Fields |
|---|---|---|
| `users` | All role accounts | `name`, `email`, `role`, `uniqueId` (XYZDDMMYYYY), `passwordHash`; compound unique index on `email + role` |
| `otps` | Email verification codes | `email`, `otpHash`, `purpose` (register/reset), `expiresAt` (TTL 5 min) |
| `products` | Catalog | `title`, `price`, `mrp`, `category`, `images[]`, `stock`, `sellerId`, `rating` |
| `orders` | Purchases | `customerId`, `items[]`, `total`, `paymentMethod`, `status`, `address`, `timeline[]` |
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
- Razorpay orders created **server-side** — amounts are never trusted from the client
- File uploads restricted by type and size (images; video reviews capped at 50MB)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB Atlas** account (free tier is sufficient)
- **Gmail** account with an App Password (for OTP emails)
- **Razorpay** test keys (optional — only needed for payment flows)

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
Backend runs on `http://localhost:5000`

**3. Frontend setup**
```bash
cd ../client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` folder (see `.env.example` for the template):

| Variable | Required | Description | Example |
|---|---|---|---|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/megastore` |
| `JWT_SECRET` | ✅ | Secret for signing JWT tokens | `a_long_random_string` |
| `EMAIL_USER` | ✅ | Gmail address used to send OTPs | `you@gmail.com` |
| `EMAIL_PASS` | ✅ | Gmail **App Password** (not your login password) | `abcd efgh ijkl mnop` |
| `RAZORPAY_KEY_ID` | ⚪ | Razorpay key ID (payments only) | `rzp_test_xxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | ⚪ | Razorpay key secret (payments only) | `xxxxxxxxxxxxxxxx` |
| `PORT` | ⚪ | Backend port (Render assigns automatically) | `5000` |
| `CLIENT_URL` | ✅ | Frontend origin allowed by CORS | `https://enterprise-ai-powered-smart-gadget-neon.vercel.app` |

> ⚠️ **Never commit `.env` to GitHub.** It is already covered by `.gitignore`. Generate a Gmail App Password at Google Account → Security → 2-Step Verification → App passwords.

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
| POST | `/api/auth/register` | Register account, triggers OTP email | Public |
| POST | `/api/auth/verify-otp` | Verify 6-digit OTP, activates account | Public |
| POST | `/api/auth/resend-otp` | Resend OTP (rate-limited) | Public |
| POST | `/api/auth/login` | Login with email or Unique ID | Public |
| POST | `/api/auth/forgot-password` | Request password-reset OTP | Public |
| POST | `/api/auth/reset-password` | Set new password with valid OTP | Public |

### Products
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/products/all?search=&category=&sort=&limit=` | List/search/filter products | Public |
| GET | `/api/products/:id` | Product detail | Public |
| POST | `/api/products` | Create product | Seller, Admin |
| PUT | `/api/products/:id` | Update product | Seller (own), Admin |
| DELETE | `/api/products/:id` | Delete product | Seller (own), Admin |
| POST | `/api/products/bulk-upload` | CSV bulk import | Seller, Admin |

### Orders
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/orders` | Place order | Customer |
| GET | `/api/orders/my` | Authenticated user's order history | Customer |
| GET | `/api/orders/:id` | Order detail with timeline | Owner, Admin |
| POST | `/api/orders/:id/cancel` | Cancel with reason | Owner |
| POST | `/api/orders/:id/return` | Request return/exchange | Owner |
| PATCH | `/api/orders/:id/status` | Update fulfilment status | Admin, DeliveryAgent |

### Uploads & Payments
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/upload/photo` | Upload product image (Multer) | Seller, Admin |
| POST | `/api/upload/review-video` | Upload video review (≤50MB) | Customer |
| POST | `/api/payment/razorpay/order` | Create Razorpay order (server-side) | Customer |
| POST | `/api/payment/razorpay/verify` | Verify payment signature | Customer |

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

- **Manual QA checklist:** register → OTP verify → login → add to cart → apply coupon → checkout (COD) → track on live map → download GST invoice → request return
- **Seller flow:** create product → upload photo → CSV bulk import → respond in live chat → receive low-stock alert
- **API testing:** all endpoints above were verified with request/response inspection during development

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

## 📸 Screenshots

> Add screenshots of the live site here — landing page, product detail with 3D view, seller dashboard, order tracking map, and the `/for-hr` showcase page.

---

## 🗺️ Roadmap

- [ ] Razorpay **production** keys after KYC completion
- [ ] Seller-uploaded product photography pipeline (upload infra already in place)
- [ ] Web-push notifications via service worker
- [ ] Multi-language UI (Bengali / Hindi / English)
- [ ] Admin analytics dashboard with sales charts
- [ ] Automated test suite (Jest + React Testing Library, Supertest)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit with clear messages (`git commit -m "Add: EMI calculator on checkout"`)
4. Push and open a Pull Request against `main`

---

## 👤 Author

**Rubel Ali** — MERN Full-Stack Developer, Kolkata, India

- GitHub: [@matiur25580](https://github.com/matiur25580)
- Email: `rahamanmatiur397@gmail.com`
- Languages: Bengali, Hindi, English
- Focus: building real, production-grade full-stack applications. This entire project was developed on an Android phone using Termux and GitHub Codespaces.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with MongoDB, Express, React & Node.js</p>
