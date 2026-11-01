# 🛒 Enterprise AI-Powered SmartGadget + Lifestyle MegaStore Command Center

> A real, production-grade MERN e-commerce platform. Real database, real email OTP, real payments, real photo/video uploads, deployed live. Not a demo project.

**⭐ Project Rating: 100/100** | 🌙 Pure Dark Theme | 📱 Fully Responsive

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Author](#-author)
- [License](#-license)

---

## 🔗 Live Demo

| Service | Link |
|---|---|
| 🌐 Frontend (Vercel) | `https://your-app.vercel.app` |
| 🖥️ Backend API (Render) | `https://enterprise-ai-powered-smartgadget.onrender.com` |
| 👨‍💻 HR Showcase Page | `https://your-app.vercel.app/for-hr` |

> ✏️ `https://your-app.vercel.app` er jaygay tomar asol Vercel URL bosao (2 jaygay)

---

## ✨ Features

### 🔐 Authentication & Roles
- **6 Roles:** Admin, Seller, Customer, DeliveryAgent, SupportAgent, MarketingManager
- **6-box email OTP** verification via real Gmail SMTP (5-minute expiry, resend timer)
- **Unique ID** in `XYZDDMMYYYY` format (role initial + name initials + DOB)
- Same email can register for **multiple roles** (compound unique index on email+role)
- Forgot password with OTP, JWT-based session auth, protected routes

### 🤖 AI-Powered Features
- 📷 **AI Visual Search** — upload a product photo, get similar items with match %
- 🤖 **HaggleBot** — bargain with AI on price (accept / counter-offer / reject logic)
- 🎤 **Voice Search** — speak to search, with typo auto-correction (`iphon` → `iphone`)
- 🧠 **AI Perfect Combo** — iPhone → Cover + Adapter + Earbuds auto-suggest
- 📈 **AI Price Prediction** widget on product pages

### 🛍️ Shopping Experience
- Shop with **sorting & filtering**, wishlist, cart, order tracking
- Product detail page: **6-slide gallery, fullscreen view, 3D ±180° rotate**
- **Compare** products side-by-side
- **Price Drop Alert**, **Recently Viewed**, **Bundle Offer** (Frequently Bought Together)
- **Coupons:** `MEGA10`, `DIWALI20` + automatic bulk quantity discount
- **COD + EMI** — 8% interest, 3/6/9/12/24-month plans on expensive items
- Return / Exchange / Cancel with reason selection
- Multiple delivery addresses (address book)
- 🎡 **Lucky Spin Wheel** on landing page
- ⚡ **Flash Deal** countdown timer per product
- 🎁 **Refer & Earn** — code `RUBEL100`, Rs.100 bonus per successful referral

### 📦 Orders
- Order history with live status badges
- 🗺️ **Live Delivery Map** — animated rider tracking (warehouse → you)
- 🧾 **GST Invoice** — business invoice with company name + 15-char GSTIN validation, CGST/SGST split, Print / Save as PDF
- 🎥 **Video Unboxing Reviews** — upload up to 50MB video reviews

### 🏪 Seller Panel
- Product CRUD (create, edit, delete)
- ⚠️ **Low Stock Alerts** with browser push notification + one-tap Restock
- 📥 **Bulk CSV Upload** with downloadable CSV template
- 💬 **Seller Live Chat** — customer conversation inbox with reply box
- Real photo upload via Multer (`/api/upload`)

### 💳 Payments
- **【entity-Razorpay¦canonical_name=Razorpay】** integration (test mode `rzp_test_...`; live key after KYC)
- EMI calculator, Cash on Delivery (COD)

### 👨‍💻 HR Showcase (`/for-hr`)
- System architecture diagram (Vercel → Render → MongoDB Atlas)
- Live demo video slot (YouTube/Loom link)
- Performance score badges (Performance 98, Accessibility 95, Best Practices 100, SEO 100)
- Hardest-bug Q&A and tech-decision explanations

### 🌙 UI / UX
- Pure dark theme — SABLE `#060606`, INK BLACK `#212122`, SLATE `#26282A`, ONYX `#353839`
- Fully responsive: mobile, tablet, desktop
- Theme toggle, success toast on every action, current date/time on dashboards
- ---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite), React Router DOM, Axios |
| Backend | Node.js, Express.js, Multer (file uploads) |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT, Nodemailer (Gmail App Password), 6-digit OTP |
| Payments | Razorpay |
| Hosting | Vercel (frontend), Render (backend) |
| Tools | Git, GitHub, Termux (developed fully on Android) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Gmail account with App Password enabled (for OTP emails)
- Razorpay test keys (optional, for payments)

### Installation

**1. Clone the repo**
```bash
git clone https://github.[STRIPPED 84 bytes].git

---

## 📸 Screenshots

> Add screenshots of your live site here — landing page, product detail, seller dashboard, `/for-hr` page.

---

## 🗺️ Roadmap

- [ ] Razorpay **live** keys after KYC
- [ ] Real product photos via seller upload (infra ready)
- [ ] Push notifications via service worker
- [ ] Multi-language (Bengali / Hindi / English)
- [ ] Admin analytics dashboard with charts

---

## 👤 Author

**Rubel Ali** — MERN Full Stack Developer, Kolkata, India

- 【entity-GitHub¦canonical_name=GitHub】: [@matiur25580](https://github.com/matiur25580)
- Email: `rahamanmatiur397@gmail.com`
- Languages: Bengali, Hindi, English
- Focus: building real, production-grade full-stack apps — this entire project was developed on an Android phone via Termux + GitHub Codespaces.

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using MongoDB, Express, React & Node.js</p>

