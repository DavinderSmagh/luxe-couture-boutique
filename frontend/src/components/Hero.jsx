import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://picsum.photos/id/1015/1920/1080') center/cover no-repeat fixed;
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(248,246,243,0.4), rgba(248,246,243,0.7));
`;

const Content = styled(motion.div)`
  text-align: center;
  z-index: 10;
  max-width: 900px;
  padding: 0 20px;

  h1 {
    font-size: clamp(60px, 10vw, 120px);
    line-height: 1.05;
    margin-bottom: 32px;
    color: #0f0f0f;
    text-shadow: 0 4px 30px rgba(0,0,0,0.15);
  }

  button {
    margin-top: 20px;
  }
`;

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <HeroSection ref={ref}>
      <Overlay />
      <Content style={{ y }}>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          YOUR DESIGNS.<br />TIMELESS.
        </motion.h1>
        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          SHOP THE COLLECTION
        </motion.button>
      </Content>
    </HeroSection>
  );
}