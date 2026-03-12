import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.product === action.payload.product);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product === existingItem.product ? action.payload : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
  paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'CashOnDelivery',
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

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
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
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart, saveShippingAddress, savePaymentMethod }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
