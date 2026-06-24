import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Send, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, getCategoryLink } from '../constants/categories';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: #e0ddd8;
  padding: 80px 5% 40px;
  margin-top: auto;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Column = styled.div``;

const Logo = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: #faf9f6;
  margin-bottom: 20px;
  letter-spacing: 3px;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.8;
  color: #999;
  margin-bottom: 28px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 14px;

  a {
    width: 40px;
    height: 40px;
    border: 1px solid #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    transition: all 0.3s ease;

    &:hover {
      color: #b79447;
      border-color: #b79447;
      transform: translateY(-3px);
    }
  }
`;

const ColumnTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #faf9f6;
  margin-bottom: 24px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const LinksList = styled.ul`
  list-style: none;

  li {
    margin-bottom: 12px;
  }

  a {
    color: #999;
    font-size: 14px;
    transition: all 0.3s;
    display: inline-block;

    &:hover {
      color: #b79447;
      transform: translateX(4px);
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  color: #999;
  font-size: 14px;
  line-height: 1.6;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: #b79447;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0;
  margin-top: 8px;
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: 1px solid #333;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  background: transparent;
  color: #faf9f6;
  outline: none;
  transition: border-color 0.3s;

  &::placeholder {
    color: #666;
  }

  &:focus {
    border-color: #b79447;
  }
`;

const SubscribeBtn = styled.button`
  padding: 14px 20px;
  background: #b79447;
  color: #1a1a1a;
  border: 1px solid #b79447;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-weight: 600;

  &:hover {
    background: #c9a855;
  }
`;

const SuccessText = styled.p`
  font-size: 13px;
  color: #b79447;
  margin-top: 10px;
`;

const Divider = styled.div`
  max-width: 1400px;
  margin: 56px auto 0;
  padding-top: 32px;
  border-top: 1px solid #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Copyright = styled.p`
  color: #666;
  font-size: 13px;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  a {
    color: #666;
    font-size: 13px;
    transition: color 0.3s;

    &:hover {
      color: #b79447;
    }
  }
`;

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <FooterContainer id="footer">
      <Content>
        <Column>
          <Logo>HGAMS CREATIONS</Logo>
          <Description>
            Bespoke tailoring, ethnic wear, and everyday essentials for the modern woman.
            Handcrafted in Punjab with premium fabrics and meticulous attention to detail.
          </Description>
          <SocialIcons>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </SocialIcons>
        </Column>

        <Column>
          <ColumnTitle>Shop</ColumnTitle>
          <LinksList>
            <li><Link to="/shop">All Products</Link></li>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link to={getCategoryLink(cat.name)}>{cat.name}</Link>
              </li>
            ))}
            <li><Link to="/collections">Collections</Link></li>
          </LinksList>
        </Column>

        <Column>
          <ColumnTitle>Customer Care</ColumnTitle>
          <LinksList>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/policies/size-guide">Size Guide</Link></li>
            <li><Link to="/policies/faqs">FAQs</Link></li>
            <li><Link to="/policies/shipping">Shipping & Returns</Link></li>
            <li><Link to="/policies/care-instructions">Care Instructions</Link></li>
          </LinksList>
        </Column>

        <Column>
          <ColumnTitle>Stay Connected</ColumnTitle>
          <Description style={{ marginBottom: 16 }}>
            Subscribe for new arrivals, styling tips, and exclusive offers.
          </Description>
          <form onSubmit={handleSubscribe}>
            <InputGroup>
              <NewsletterInput type="email" placeholder="Your email" required />
              <SubscribeBtn type="submit" aria-label="Subscribe">
                <Send size={16} />
              </SubscribeBtn>
            </InputGroup>
            {subscribed && <SuccessText>Thank you for subscribing!</SuccessText>}
          </form>
          <ContactItem style={{ marginTop: 24 }}>
            <MapPin size={16} />
            <span>Kotkapura-151204, Punjab, India</span>
          </ContactItem>
          <ContactItem>
            <Mail size={16} />
            <span>sardarniboutique@gmail.com</span>
          </ContactItem>
          <ContactItem>
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </ContactItem>
        </Column>
      </Content>

      <Divider>
        <Copyright>© {new Date().getFullYear()} HGAMS CREATIONS. All rights reserved.</Copyright>
        <BottomLinks>
          <Link to="/policies/privacy">Privacy</Link>
          <Link to="/policies/terms">Terms</Link>
          <Link to="/policies/cookies">Cookies</Link>
        </BottomLinks>
      </Divider>
    </FooterContainer>
  );
}
