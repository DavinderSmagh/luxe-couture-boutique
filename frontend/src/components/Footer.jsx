import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Send, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: #e0ddd8;
  padding: 80px 5% 40px;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
  gap: 60px 48px;

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
  font-size: 26px;
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
  gap: 16px;

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
  font-size: 12px;
  font-weight: 600;
  color: #faf9f6;
  margin-bottom: 24px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const LinksList = styled.ul`
  list-style: none;

  li {
    margin-bottom: 14px;
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
  margin-bottom: 16px;
  color: #999;
  font-size: 14px;
  line-height: 1.6;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: #b79447;
  }
`;

const Newsletter = styled.div`
  margin-top: 8px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0;

  input {
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
  }

  button {
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
  }
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
  return (
    <FooterContainer id="footer">
      <Content>
        <Column>
          <Logo>HGAMS CREATIONS</Logo>
          <Description>
            Timeless elegance, handcrafted with intention.
            Exclusive designs for the modern woman who values quality and sophistication.
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
          <ColumnTitle>Quick Links</ColumnTitle>
          <LinksList>
            <li><Link to="/">Shop All</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">FAQs</a></li>
          </LinksList>
        </Column>

        <Column>
          <ColumnTitle>Customer Care</ColumnTitle>
          <LinksList>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Care Instructions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </LinksList>
        </Column>

        <Column>
          <ColumnTitle>Stay Connected</ColumnTitle>
          <Description style={{ marginBottom: 20 }}>
            Subscribe for exclusive previews, new arrivals, and special offers.
          </Description>
          <Newsletter>
            <InputGroup>
              <input type="email" placeholder="Your email address" />
              <button aria-label="Subscribe">
                <Send size={16} />
              </button>
            </InputGroup>
          </Newsletter>
          <ContactItem style={{ marginTop: 24 }}>
            <MapPin size={16} />
            <span>Kotkapura-151204 ,Punjab ,India</span>
          </ContactItem>
          <ContactItem>
            <Mail size={16} />
            <span>example@hgams.in</span>
          </ContactItem>
        </Column>
      </Content>

      <Divider>
        <Copyright>
          © {new Date().getFullYear()} HGAMS CREATIONS. All rights reserved.
        </Copyright>
        <BottomLinks>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </BottomLinks>
      </Divider>
    </FooterContainer>
  );
}