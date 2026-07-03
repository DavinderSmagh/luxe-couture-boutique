# Luxe Couture Boutique - API Testing Guide

This guide contains the endpoints and example payloads to test the backend APIs (e.g., using Postman).

**Base URL**: `http://localhost:5000`

---

## 🔑 Important Note on Authentication
Many of these routes are **Protected**. For these routes, you must include a valid JWT token in your HTTP headers:
- **Key**: `Authorization`
- **Value**: `Bearer <your_token_here>` (You receive this token when you Register or Login).

---

## 1. 👤 Users & Authentication

### Register a New User (Public)
- **Method**: `POST`
- **URL**: `/api/users/register`
- **Body** (JSON):
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Login User (Public)
- **Method**: `POST`
- **URL**: `/api/users/login`
- **Body** (JSON):
  ```json
  {
    "emailOrPhone": "test@example.com",
    "password": "password123"
  }
  ```
  *(Copy the `token` from the response to use for protected routes)*

### Get User Profile (Protected)
- **Method**: `GET`
- **URL**: `/api/users/profile`
- **Headers**: Authorization required.

### Update User Profile (Protected)
- **Method**: `PUT`
- **URL**: `/api/users/profile`
- **Body** (JSON) - *Send only what you want to update*:
  ```json
  {
    "name": "Updated Name",
    "phone": "1234567890"
  }
  ```

---

## 2. 🛍️ Products

### Get All Products (Public)
- **Method**: `GET`
- **URL**: `/api/products`
- **Query Params (Optional)**: 
  - `?category=Ladies Wear` 
  - `?search=silk`
  - `?page=1&limit=5`

### Get Single Product (Public)
- **Method**: `GET`
- **URL**: `/api/products/:id` (Replace `:id` with a real product ID)

### Get All Categories (Public)
- **Method**: `GET`
- **URL**: `/api/products/categories/list`

---

## 3. 🛒 Cart

*All Cart routes are Protected (Require Authorization Header)*

### Get User Cart
- **Method**: `GET`
- **URL**: `/api/cart`

### Add Item to Cart
- **Method**: `POST`
- **URL**: `/api/cart`
- **Body** (JSON):
  ```json
  {
    "product": "<product_id>",
    "name": "Embroidered Silk Kurta",
    "image": "image_url.jpg",
    "price": 6499,
    "qty": 1,
    "size": "M",
    "color": "Maroon"
  }
  ```

### Update Item Quantity
- **Method**: `PUT`
- **URL**: `/api/cart/:itemId` (Replace `:itemId` with the `_id` of the *item inside the cart array*, not the product ID)
- **Body** (JSON):
  ```json
  {
    "qty": 3
  }
  ```

### Remove Item from Cart
- **Method**: `DELETE`
- **URL**: `/api/cart/:itemId`

### Clear Entire Cart
- **Method**: `DELETE`
- **URL**: `/api/cart`

---

## 4. ❤️ Wishlist

*All Wishlist routes are Protected (Require Authorization Header)*

### Get User Wishlist
- **Method**: `GET`
- **URL**: `/api/wishlist`

### Toggle Product in Wishlist
*(Adds if missing, removes if present)*
- **Method**: `POST`
- **URL**: `/api/wishlist`
- **Body** (JSON):
  ```json
  {
    "productId": "<product_id>"
  }
  ```

### Remove Product Explicitly
- **Method**: `DELETE`
- **URL**: `/api/wishlist/:productId`

---

## 5. 📦 Orders

### Create New Order (Public)
- **Method**: `POST`
- **URL**: `/api/orders`
- **Body** (JSON):
  ```json
  {
    "user": {
      "name": "Test User",
      "email": "test@example.com"
    },
    "orderItems": [
      {
        "name": "Silk Kurta",
        "qty": 1,
        "image": "image.jpg",
        "price": 6499,
        "product": "<product_id>"
      }
    ],
    "shippingAddress": {
      "address": "123 Main St",
      "city": "Mumbai",
      "postalCode": "400001",
      "country": "India"
    },
    "paymentMethod": "CashOnDelivery",
    "itemsPrice": 6499,
    "taxPrice": 1170,
    "shippingPrice": 500,
    "totalPrice": 8169
  }
  ```

### Get Order by ID (Public)
- **Method**: `GET`
- **URL**: `/api/orders/:id`

### Get My Orders (Protected)
- **Method**: `GET`
- **URL**: `/api/orders/my/orders`

---

## 6. 📬 Contact

### Submit Contact Form (Public)
- **Method**: `POST`
- **URL**: `/api/contact`
- **Body** (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Custom Suit Inquiry",
    "message": "I would like to get measured for a suit."
  }
  ```

---

## 🛡️ Admin Routes
*(Requires `isAdmin: true` in DB)*
If you manually change a user's `isAdmin` to `true` in your database (e.g., using MongoDB Compass), you can test these routes using that user's token:

- `POST /api/products` (Create product)
- `PUT /api/products/:id` (Update product)
- `DELETE /api/products/:id` (Delete product)
- `GET /api/orders` (View all orders)
- `PUT /api/orders/:id/pay` (Mark order paid)
- `PUT /api/orders/:id/deliver` (Mark order delivered)
- `GET /api/users` (List all users)
- `GET /api/contact` (List all contact submissions)
