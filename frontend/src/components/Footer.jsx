import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Twitter, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #f8f6f3;
  color: #333;
  padding: 80px 5% 40px;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 60px 40px;
`;

const Column = styled.div``;

const Logo = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: #1a1a1a;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 28px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #555;
    transition: all 0.3s ease;
    
    &:hover {
      color: #d4af37;
      transform: translateY(-3px);
    }
  }
`;

const Title = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
  letter-spacing: 1px;
`;

const LinksList = styled.ul`
  list-style: none;

  li {
    margin-bottom: 12px;
  }

  a {
    color: #555;
    font-size: 15px;
    transition: color 0.3s;

    &:hover {
      color: #d4af37;
    }
  }
`;

const Newsletter = styled.div`
  input {
    width: 100%;
    padding: 14px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    background: #fff;
    
    &::placeholder {
      color: #aaa;
    }
  }

  button {
    width: 100%;
    padding: 14px;
    background: #d4af37;
    color: #1a1a1a;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #e6c04a;
      transform: translateY(-2px);
    }

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const BottomBar = styled.div`
  max-width: 1400px;
  margin: 60px auto 0;
  padding-top: 40px;
  border-top: 1px solid rgba(0,0,0,0.08);
  text-align: center;
  color: #777;
  font-size: 14px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Content>
        <Column>
          <Logo>LUXE COUTURE</Logo>
          <Description>
            Timeless elegance, handcrafted with intention.  
            Exclusive designs for the modern woman who values quality and sophistication.
          </Description>
          <SocialIcons>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={24} />
            </a>
          </SocialIcons>
        </Column>

        <Column>
          <Title>Quick Links</Title>
          <LinksList>
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQs</a></li>
          </LinksList>
        </Column>

        <Column>
          <Title>Customer Care</Title>
          <LinksList>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Care Instructions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </LinksList>
        </Column>

        <Column>
          <Title>Stay Connected</Title>
          <Description>
            Join our newsletter for exclusive previews, new arrivals, and special offers.
          </Description>
          <Newsletter>
            <input type="email" placeholder="Your email address" />
            <button>
              Subscribe <Send size={18} />
            </button>
          </Newsletter>
        </Column>
      </Content>

      <BottomBar>
        © {new Date().getFullYear()} LUXE COUTURE. All rights reserved.  
        Crafted with passion in Chandigarh, India.
      </BottomBar>
    </FooterContainer>
  );
}