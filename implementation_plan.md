# Implement Full Order Flow

This plan outlines the steps to build a complete e-commerce checkout and order flow, spanning both the backend API and the frontend user interface.

## Proposed Changes

### Backend (Express + MongoDB)

#### [NEW] `backend/models/order.js`
Create a Mongoose model for `Order`. It will store:
- User details (name, email, shipping address)
- Order Items (references to products, quantities, prices)
- Payment Method (e.g., 'PayPal', 'Stripe', 'CashOnDelivery')
- Pricing (itemsPrice, taxPrice, shippingPrice, totalPrice)
- Order Status (isPaid, isDelivered)

#### [NEW] `backend/routes/orderRoutes.js`
Create Express routes for:
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID

#### [MODIFY] [backend/server.js](file:///c:/Users/LENOVO/luxe-couture/backend/server.js)
Import and use `orderRoutes` under `/api/orders`.

---

### Frontend (React + Vite)

#### [NEW] `frontend/src/context/CartContext.jsx`
Implement a React Context to manage shopping cart state (Cart Items, add to cart, remove from cart, clear cart).

#### [NEW] `frontend/src/pages/Cart.jsx`
A page displaying the items currently in the cart, allowing users to change quantities or proceed to checkout.

#### [NEW] `frontend/src/pages/Checkout.jsx`
A page where the user enters their shipping information and payment method, reviews their order, and clicks "Place Order" to submit the data to the backend API.

#### [NEW] `frontend/src/pages/OrderSuccess.jsx`
A confirmation page displayed after an order is successfully placed, showing the new Order ID and a thank you message.

#### [MODIFY] [frontend/src/App.jsx](file:///c:/Users/LENOVO/luxe-couture/frontend/src/App.jsx)
Add React Router DOM routes for `/cart`, `/checkout`, and `/order/:id`. Wrap the application in the `CartContext.Provider`.

#### [MODIFY] [frontend/src/components/Navbar.jsx](file:///c:/Users/LENOVO/luxe-couture/frontend/src/components/Navbar.jsx) (or equivalent)
Update the navigation to show a Cart link/icon with a badge indicating the number of items.

#### [MODIFY] `frontend/src/pages/ProductDetails.jsx` (or equivalent)
Add an "Add to Cart" button that dispatches to the CartContext.

## Verification Plan

### Manual Verification
- Verify that a user can click "Add to Cart" on a product.
- Verify that the cart updates its badge count.
- Verify that the Cart page lists items correctly and calculates total price.
- Verify that filling out the Checkout form successfully calls the backend `POST /api/orders` endpoint.
- Verify that the backend saves the order in the MongoDB database and returns the order details.
- Verify that the frontend redirects to the Order Success page on successful placement.
