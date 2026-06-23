import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CATEGORIES, getCategoryLink } from '../constants/categories';
import SearchModal from './SearchModal';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${(p) => (p.$scrolled ? 'rgba(250, 249, 246, 0.97)' : 'transparent')};
  backdrop-filter: ${(p) => (p.$scrolled ? 'blur(20px)' : 'none')};
  -webkit-backdrop-filter: ${(p) => (p.$scrolled ? 'blur(20px)' : 'none')};
  padding: ${(p) => (p.$scrolled ? '14px 5%' : '22px 5%')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(p) => (p.$scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none')};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  letter-spacing: 3px;
  font-weight: 600;
  color: #1a1a1a;
  text-transform: uppercase;
  transition: opacity 0.3s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.7;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  transition: color 0.3s;
  color: #555;
  padding: 4px 0;

  &:hover,
  &.active {
    color: #1a1a1a;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1.5px;
    bottom: -2px;
    left: 0;
    background: #b79447;
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

const DropdownWrap = styled.div`
  position: relative;

  &:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const DropdownTrigger = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  transition: color 0.3s;

  &:hover {
    color: #1a1a1a;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: #faf9f6;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 12px 0;
  min-width: 220px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 100;

  &.dropdown-menu {
    /* class for hover selector */
  }

  a {
    display: block;
    padding: 10px 24px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #666;
    text-transform: uppercase;
    transition: all 0.2s;

    &:hover {
      color: #b79447;
      background: rgba(183, 148, 71, 0.06);
      padding-left: 28px;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  animation: ${(p) => (p.$animate ? css`${pulse} 0.4s ease` : 'none')};
`;

const HamburgerBtn = styled.button`
  background: none;
  border: none;
  color: #1a1a1a;
  cursor: pointer;
  display: none;
  padding: 4px;

  @media (max-width: 968px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled(motion.div)`
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
  gap: 8px;
  overflow-y: auto;
  padding: 80px 24px 40px;
`;

const MobileLink = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: #1a1a1a;
  letter-spacing: 2px;
  transition: color 0.3s;
  padding: 8px 0;

  &:hover {
    color: #b79447;
  }
`;

const MobileCategory = styled(Link)`
  font-size: 14px;
  color: #888;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 6px 0;
  transition: color 0.3s;

  &:hover {
    color: #b79447;
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

const MobileDivider = styled.div`
  width: 40px;
  height: 1px;
  background: #ddd;
  margin: 16px 0;
`;

export default function Navbar() {
  const {
    state: { cartItems },
  } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <>
      <Nav $scrolled={scrolled || location.pathname !== '/'} id="main-navbar">
        <Logo to="/">HGAMS CREATIONS</Logo>

        <NavLinks>
          <NavLink to="/" className={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/shop" className={isActive('/shop')}>
            Shop
          </NavLink>

          <DropdownWrap>
            <DropdownTrigger>
              Categories <ChevronDown size={14} />
            </DropdownTrigger>
            <DropdownMenu className="dropdown-menu">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} to={getCategoryLink(cat.name)}>
                  {cat.name}
                </Link>
              ))}
            </DropdownMenu>
          </DropdownWrap>

          <NavLink to="/collections" className={isActive('/collections')}>
            Collections
          </NavLink>
          <NavLink to="/about" className={isActive('/about')}>
            About
          </NavLink>
          <NavLink to="/contact" className={isActive('/contact')}>
            Contact
          </NavLink>
        </NavLinks>

        <NavActions>
          <SearchButton aria-label="Search" onClick={() => setSearchOpen(true)}>
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

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MobileClose onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={28} strokeWidth={1.5} />
            </MobileClose>
            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/shop">Shop All</MobileLink>
            <MobileDivider />
            {CATEGORIES.map((cat) => (
              <MobileCategory key={cat.id} to={getCategoryLink(cat.name)}>
                {cat.name}
              </MobileCategory>
            ))}
            <MobileDivider />
            <MobileLink to="/collections">Collections</MobileLink>
            <MobileLink to="/about">About</MobileLink>
            <MobileLink to="/contact">Contact</MobileLink>
            <MobileLink to="/cart">Cart ({cartCount})</MobileLink>
          </MobileMenu>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
