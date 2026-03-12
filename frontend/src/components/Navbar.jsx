import styled from 'styled-components';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(248, 246, 243, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 20px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  color: #1a1a1a;
`;

const Logo = styled.h1`
  font-size: 28px;
  letter-spacing: 3px;
  font-weight: 600;
  color: #1a1a1a;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 48px;
  font-size: 15px;
  font-weight: 500;

  a {
    position: relative;
    transition: color 0.3s;
  }

  a:hover {
    color: #d4af37;
  }

  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -6px;
    left: 0;
    background: #d4af37;
    transition: width 0.3s;
  }

  a:hover::after {
    width: 100%;
  }
`;

const CartIcon = styled(Link)`
  position: relative;
  color: #1a1a1a;

  &:hover {
    color: #d4af37;
  }
`;

export default function Navbar() {
    const { state: { cartItems } } = useCart();
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <Nav>
            <Logo>LUXE COUTURE</Logo>
            <NavLinks>
                <Link to="/">Shop</Link>
                <Link to="/collections">Collections</Link>
                <Link to="/about">About</Link>
            </NavLinks>
            <CartIcon to="/cart">
                <ShoppingBag size={24} />
                {cartCount > 0 && <span style={{ position: 'absolute', top: -8, right: -12, background: '#d4af37', color: '#000', fontSize: '12px', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold' }}>{cartCount}</span>}
            </CartIcon>
        </Nav>
    );
}