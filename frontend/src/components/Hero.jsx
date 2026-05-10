import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const HeroSection = styled.section`
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #0f0f0f;
`;

const BgImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80') center/cover no-repeat;
  opacity: 0.5;
`;

const Content = styled(motion.div)`
  text-align: center;
  z-index: 10;
  max-width: 900px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Eyebrow = styled(motion.span)`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #b79447;
  margin-bottom: 24px;
  display: block;
`;

const Heading = styled(motion.h1)`
  font-size: clamp(42px, 8vw, 88px);
  line-height: 1.05;
  margin-bottom: 28px;
  color: #faf9f6;
  font-weight: 500;

  span {
    font-style: italic;
    color: #b79447;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(15px, 2vw, 18px);
  color: rgba(250, 249, 246, 0.65);
  max-width: 560px;
  margin-bottom: 44px;
  line-height: 1.7;
  font-weight: 300;
`;

const CTAGroup = styled(motion.div)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryBtn = styled(Link)`
  background: #faf9f6;
  color: #1a1a1a;
  border: none;
  padding: 16px 44px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: inline-block;

  &:hover {
    background: #b79447;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(183, 148, 71, 0.3);
  }
`;

const SecondaryBtn = styled(Link)`
  background: transparent;
  color: #faf9f6;
  border: 1px solid rgba(250, 249, 246, 0.3);
  padding: 16px 44px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  display: inline-block;

  &:hover {
    border-color: #b79447;
    color: #b79447;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(250, 249, 246, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 10;
`;

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroSection ref={ref} id="hero-section">
      <BgImage style={{ y: bgY }} />

      <Content style={{ y: contentY, opacity }}>
        <Eyebrow
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Handcrafted with Intention
        </Eyebrow>

        <Heading
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >
          Handmade Dresses &<br /><span>Women's Essentials</span>
        </Heading>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Timeless elegance for the modern woman. Each piece is carefully handcrafted 
          in our atelier with premium fabrics and meticulous attention to detail.
        </Subtitle>

        <CTAGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <PrimaryBtn to="/collections">Shop Collections</PrimaryBtn>
          <SecondaryBtn to="/about">Our Story</SecondaryBtn>
        </CTAGroup>
      </Content>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToProducts}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={18} strokeWidth={1.5} />
        </motion.div>
      </ScrollIndicator>
    </HeroSection>
  );
}