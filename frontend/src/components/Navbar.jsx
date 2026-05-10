import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.$scrolled ? 'rgba(250, 249, 246, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(20px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$scrolled ? 'blur(20px)' : 'none'};
  padding: ${props => props.$scrolled ? '16px 5%' : '24px 5%'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  letter-spacing: 4px;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: uppercase;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  a {
    position: relative;
    transition: color 0.3s;
    color: #555;
    padding: 4px 0;
  }

  a:hover,
  a.active {
    color: #1a1a1a;
  }

  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1.5px;
    bottom: -2px;
    left: 0;
    background: #b79447;
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  a:hover::after,
  a.active::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled(Link)`
  position: relative;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  padding: 4px;

  &:hover {
    color: #b79447;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 4px;

  &:hover {
    color: #b79447;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;
  background: #b79447;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${props => props.$animate ? css`${pulse} 0.4s ease` : 'none'};
`;

const HamburgerBtn = styled.button`
  background: none;
  border: none;
  color: #1a1a1a;
  cursor: pointer;
  display: none;
  padding: 4px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(250, 249, 246, 0.98);
  backdrop-filter: blur(20px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  opacity: ${props => props.$open ? 1 : 0};
  pointer-events: ${props => props.$open ? 'all' : 'none'};
  transition: opacity 0.4s ease;

  a {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    color: #1a1a1a;
    letter-spacing: 3px;
    transition: color 0.3s;

    &:hover {
      color: #b79447;
    }
  }
`;

const MobileClose = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #1a1a1a;
  cursor: pointer;
`;

export default function Navbar() {
  const { state: { cartItems } } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setBadgeAnimate(true);
      const timer = setTimeout(() => setBadgeAnimate(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <Nav $scrolled={scrolled} id="main-navbar">
        <Logo to="/">HGAMS CREATIONS</Logo>

        <NavLinks>
          <Link to="/" className={isActive('/')}>Shop</Link>
          <Link to="/collections" className={isActive('/collections')}>Collections</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
        </NavLinks>

        <NavActions>
          <SearchButton aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </SearchButton>
          <IconButton to="/cart" aria-label="Shopping cart" id="cart-icon">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && <Badge $animate={badgeAnimate}>{cartCount}</Badge>}
          </IconButton>
          <HamburgerBtn onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={24} strokeWidth={1.5} />
          </HamburgerBtn>
        </NavActions>
      </Nav>

      <MobileMenu $open={mobileOpen}>
        <MobileClose onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X size={28} strokeWidth={1.5} />
        </MobileClose>
        <Link to="/">Shop</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </MobileMenu>
    </>
  );
}