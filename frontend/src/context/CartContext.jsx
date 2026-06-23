import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getCartKey } from '../data/products';

const CartContext = createContext();

const migrateCartItems = (items) =>
  items.map((item) => ({
    ...item,
    cartKey: item.cartKey || getCartKey(item.product, item.size, item.color),
    size: item.size || 'One Size',
    color: item.color || 'Default',
  }));

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const cartKey = getCartKey(
        action.payload.product,
        action.payload.size,
        action.payload.color
      );
      const existingItem = state.cartItems.find((item) => item.cartKey === cartKey);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.cartKey === cartKey
              ? { ...item, qty: item.qty + (action.payload.qty || 1) }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, cartKey, qty: action.payload.qty || 1 }],
      };
    }
    case 'UPDATE_QTY': {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.cartKey === action.payload.cartKey
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.cartKey !== action.payload),
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    case 'SAVE_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.payload };
    case 'SAVE_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? migrateCartItems(JSON.parse(localStorage.getItem('cartItems')))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'CashOnDelivery',
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
  }, [state.shippingAddress]);

  useEffect(() => {
    localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
  }, [state.paymentMethod]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const updateQty = (cartKey, qty) => {
    if (qty <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: cartKey });
    } else {
      dispatch({ type: 'UPDATE_QTY', payload: { cartKey, qty } });
    }
  };

  const removeFromCart = (cartKey) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartKey });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const saveShippingAddress = (data) => {
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
  };

  const savePaymentMethod = (data) => {
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: data });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        saveShippingAddress,
        savePaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
