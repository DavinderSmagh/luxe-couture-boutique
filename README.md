# Luxe Couture Boutique ✨

A modern, elegant e-commerce platform built for a luxury fashion boutique. This project features a stunning, dynamic frontend user interface coupled with a robust, scalable backend architecture to provide a premium shopping experience.

## 🚀 Tech Stack

This project is built using the **MERN** stack, leveraging the latest modern tools and libraries for both the frontend and backend.

### Frontend
- **Framework:** [React 19](https://react.dev/) (Bootstrapped with [Vite](https://vitejs.dev/))
- **Routing:** React Router v7
- **Styling:** Styled-components
- **Animations & UX:** 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://gsap.com/) (GreenSock Animation Platform)
  - [Lenis](https://lenis.studiofreight.com/) (Smooth scrolling)
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) & bcrypt for secure password hashing
- **Environment & Security:** dotenv, CORS

## ✨ Key Features
- **User Authentication:** Secure user registration, login, and profile management using JWT.
- **Product Catalog:** Dynamic browsing of luxury clothing and accessories.
- **Shopping Cart & Wishlist:** Add items to the cart for checkout or save them to a wishlist for later.
- **Order Management:** Secure checkout flow and order history tracking.
- **Admin Access:** Role-based access control to manage users, products, and orders.
- **Premium UI/UX:** High-performance micro-animations and smooth scrolling for a luxurious feel.
- **Newsletter & Contact:** Integrated contact forms and subscriber management.

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas cluster)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd luxe-couture-boutique


**2. Backend Setup**

cd backend
npm install

Create a .env file in the backend directory and configure the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend development server:


npm run dev

**3. Frontend Setup**

cd ../frontend
npm install

Start the frontend development server:

npm run dev


🌐 **API Endpoints**

GET /api/products - Fetch all products
POST /api/users/login - Authenticate user & get token
GET /api/users/profile - Get user profile (Protected)
POST /api/orders - Create a new order (Protected)
POST /api/contact - Submit contact form
(See the backend/routes folder for the full list of available API endpoints)

📝 License
This project is open-source and available under the 


