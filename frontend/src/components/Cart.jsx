import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* ─── STYLED COMPONENTS ──────────────────────────────── */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
`;

const Drawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 440px;
  max-width: 92vw;
  background: #faf9f6;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  color: #1a1a1a;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  padding: 28px 28px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DrawerTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ItemCount = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #999;
  font-weight: 400;
  margin-left: 8px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #1a1a1a;
    transform: rotate(90deg);
  }
`;

const CartItems = styled.div`
  flex: 1;
  padding: 24px 28px;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #bbb;

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #999;
    margin-top: 20px;
    font-weight: 500;
  }

  p {
    margin-top: 8px;
    font-size: 14px;
    color: #bbb;
  }
`;

const Item = styled(motion.div)`
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 90px;
    height: 110px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
`;

const ItemName = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  font-weight: 600;
  color: #b79447;
  font-size: 15px;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;

  button {
    background: transparent;
    border: 1px solid #ddd;
    color: #1a1a1a;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
      border-color: #1a1a1a;
      background: #1a1a1a;
      color: #faf9f6;
    }
  }

  span {
    font-size: 14px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  letter-spacing: 0.5px;
  transition: color 0.3s;
  margin-top: 6px;
  padding: 0;

  &:hover {
    color: #e74c3c;
  }
`;

const Footer = styled.div`
  padding: 24px 28px 28px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const SubtotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1a1a1a;
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: #faf9f6;
  border: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 4px;

  &:hover {
    background: #333;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background: #ddd;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ContinueShopping = styled.button`
  width: 100%;
  padding: 12px;
  background: none;
  border: 1px solid #ddd;
  color: #777;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.3s;
  border-radius: 4px;

  &:hover {
    border-color: #1a1a1a;
    color: #1a1a1a;
  }
`;

/* ─── CART COMPONENT ─────────────────────────────────── */

const Variant = styled.p`
  font-size: 12px;
  color: #999;
  margin-top: 2px;
`;

export default function Cart() {
  const { state: { cartItems }, updateQty, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, navigate]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => navigate('/'), 350);
  };

  const updateQuantity = (item, qty) => {
    updateQty(item.cartKey, qty);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkoutHandler = () => {
    setIsOpen(false);
    setTimeout(() => navigate('/checkout'), 350);
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
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <Header>
              <DrawerTitle>
                Your Cart
                <ItemCount>({cartItems.reduce((a, i) => a + i.qty, 0)} items)</ItemCount>
              </DrawerTitle>
              <CloseBtn onClick={handleClose} aria-label="Close cart">
                <X size={22} strokeWidth={1.5} />
              </CloseBtn>
            </Header>

            <CartItems>
              {cartItems.length === 0 ? (
                <EmptyState>
                  <ShoppingBag size={56} strokeWidth={1} />
                  <h3>Your cart is empty</h3>
                  <p>Discover something you'll love.</p>
                </EmptyState>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <Item
                      key={item.cartKey}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, padding: 0, margin: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={item.image} alt={item.name} />
                      <ItemInfo>
                        <div>
                          <ItemName>{item.name}</ItemName>
                          {(item.size || item.color) && (
                            <Variant>
                              {item.size}{item.color ? ` · ${item.color}` : ''}
                            </Variant>
                          )}
                          <ItemPrice>₹{item.price.toLocaleString('en-IN')}</ItemPrice>
                        </div>
                        <div>
                          <Quantity>
                            <button onClick={() => updateQuantity(item, item.qty - 1)} aria-label="Decrease quantity">
                              <Minus size={14} />
                            </button>
                            <span>{item.qty}</span>
                            <button onClick={() => updateQuantity(item, item.qty + 1)} aria-label="Increase quantity">
                              <Plus size={14} />
                            </button>
                          </Quantity>
                          <RemoveBtn onClick={() => removeFromCart(item.cartKey)} aria-label="Remove item">
                            <Trash2 size={13} /> Remove
                          </RemoveBtn>
                        </div>
                      </ItemInfo>
                    </Item>
                  ))}
                </AnimatePresence>
              )}
            </CartItems>

            {cartItems.length > 0 && (
              <Footer>
                <SubtotalRow>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </SubtotalRow>
                <TotalRow>
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </TotalRow>
                <CheckoutBtn onClick={checkoutHandler}>
                  Proceed to Checkout <ArrowRight size={16} />
                </CheckoutBtn>
                <ContinueShopping onClick={handleClose}>
                  Continue Shopping
                </ContinueShopping>
              </Footer>
            )}
          </Drawer>
        </>
      )}
    </AnimatePresence>
  );
}