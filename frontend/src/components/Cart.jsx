import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Styled Components
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(216, 203, 203, 0.7);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

const Drawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 420px;
  max-width: 90vw;
  background: #aa8a8a;
  border-left: 1px solid #222;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  letter-spacing: 1px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s;
  &:hover { color: #fff; }
`;

const CartItems = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #666;
`;

const Item = styled.div`
  display: flex;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid #222;

  img {
    width: 100px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.h4`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ItemPrice = styled.p`
  font-weight: 600;
  color: #d4af37;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;

  button {
    background: #222;
    border: none;
    color: #fff;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;

    &:hover { background: #333; }
  }
`;

const Footer = styled.div`
  padding: 24px;
  border-top: 1px solid #222;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 24px;
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: #d4af37;
  color: #000;
  border: none;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e6c04a;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
`;

// Cart Component
export default function Cart() {
  const { state: { cartItems }, addToCart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
        setTimeout(() => navigate('/'), 300); // Close drawer then go back
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, navigate]);

  const updateQuantity = (item, qty) => {
    if (qty > 0) {
      addToCart({ ...item, qty });
    } else {
      removeFromCart(item.product);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkoutHandler = () => {
    setIsOpen(false);
    setTimeout(() => navigate('/checkout'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <Drawer
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <Header>
              <Title>Your Cart</Title>
              <CloseBtn onClick={() => { setIsOpen(false); setTimeout(() => navigate('/'), 300); }}>
                <X size={28} />
              </CloseBtn>
            </Header>

            <CartItems>
              {cartItems.length === 0 ? (
                <EmptyState>
                  <ShoppingBag size={64} strokeWidth={1} style={{ marginBottom: 24, opacity: 0.5 }} />
                  <h3>Your cart is empty</h3>
                  <p style={{ marginTop: 12, color: '#888' }}>
                    Looks like you haven't added anything yet.
                  </p>
                </EmptyState>
              ) : (
                cartItems.map((item) => (
                  <Item key={item.product}>
                    <img src={item.image} alt={item.name} />
                    <ItemInfo>
                      <div>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>₹{item.price.toLocaleString()}</ItemPrice>
                      </div>
                      <Quantity>
                        <button onClick={() => updateQuantity(item, item.qty - 1)}>
                          <Minus size={16} />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQuantity(item, item.qty + 1)}>
                          <Plus size={16} />
                        </button>
                      </Quantity>
                      <RemoveBtn onClick={() => removeItem(item.product)}>
                        <Trash2 size={16} /> Remove
                      </RemoveBtn>
                    </ItemInfo>
                  </Item>
                ))
              )}
            </CartItems>

            {cartItems.length > 0 && (
              <Footer>
                <Subtotal>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </Subtotal>
                <CheckoutBtn onClick={checkoutHandler}>Proceed to Checkout</CheckoutBtn>
              </Footer>
            )}
          </Drawer>
        </>
      )}
    </AnimatePresence>
  );
}