# 🏋️ Online Gym Membership Platform

A production-ready full-stack web application for managing gym memberships, plans, trainers, and user subscriptions.  
Built with a modern frontend stack, secure backend APIs, and scalable architecture.

---

## 🚀 Features

### 👤 User
- User authentication (JWT + HTTP-only cookies)
- Browse membership plans
- Purchase memberships (Razorpay integration)
- View active membership & history
- Responsive dashboard (mobile-first)

### 🛠️ Admin
- Create / update / delete membership plans
- Manage trainers
- View all users & subscriptions
- Role-based access control (Admin / Member)

**Admin Login**
- **Email:** `ninad@gmail.com`
- **Password:** `ninad1234`

The admin account has access to:
- Membership plan management
- Trainer management
- User & subscription overview

### 💳 Payments
- Razorpay checkout integration
- Secure order creation & verification
- Payment status handling

### 🎨 Frontend
- Modern UI with TailwindCSS
- Fully responsive layouts
- Toast notifications (Sonner)
- Smooth UX & transitions
- Component-based architecture

---

## 🧱 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Axios**
- **Sonner (toasts)**
- **GSAP (animations)**

### Backend
- **Node.js (via Next.js runtime)**
- **Next.js API Routes / Route Handlers**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Razorpay SDK**

---

## 📁 Project Structure

```txt
├── app/                    # Next.js app router
│   ├── (auth)/
│   ├── admin/
│   ├── dashboard/
│   ├── api/
│   └── layout.js
│
├── components/
│   ├── ui/
│   ├── cards/
│   ├── forms/
│   └── shared/
│
├── lib/
│   ├── db.js
│   ├── auth.js
│   └── razorpay.js
│
├── models/
│   ├── User.js
│   ├── MembershipPlan.js
│   ├── Trainer.js
│   └── Subscription.js
│
├── styles/
├── public/
├── .env.example
└── README.md
```

🔐 Environment Variables

Create a .env file using .env.example
```
# Database
MONGODB_URI=

# Auth
JWT_SECRET=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# App
NEXT_PUBLIC_APP_URL=

```

🧪 Local Development
1️⃣ Install dependencies
```
npm install

```

2️⃣ Run development server
```
npm run dev

```

App runs at:
👉 http://localhost:3000

🏗️ Production Build
```
npm run build
npm start

```

🔒 Security Practices

1. HTTP-only cookies for auth

2. Password hashing with bcrypt

3. Role-based API protection

4. Server-side payment verification

5. Environment-based config isolation


API Highlights
```

Method	Endpoint	                Description
POST	/api/auth/login	            User login
POST	/api/auth/register	        User signup
GET	    /api/memberships	        Get all plans
POST	/api/admin/memberships	    Create plan
PUT	    /api/admin/memberships/:id	Update plan
DELETE	/api/admin/memberships/:id	Delete plan
POST	/api/payments/create-order	Razorpay order
POST	/api/payments/verify	    Verify payment

```


📱 Responsiveness

- Mobile-first layouts

- Adaptive dashboards

- Touch-friendly UI

- Optimized for all screen sizes


🧠 Design Philosophy

- Clean separation of concerns

- Reusable UI components

- Predictable state handling

- Scalable folder structure

- Real-world production patterns (not demo code)


🧩 Future Enhancements

- Trainer scheduling

- Diet & workout plans

- Subscription auto-renewal

- Analytics dashboard

- Email & WhatsApp notifications


📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

### Ninad Arakh
Frontend Developer (React / Next.js)
Built with production standards, not shortcuts.

