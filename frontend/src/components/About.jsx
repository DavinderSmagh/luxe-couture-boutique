import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 140px 5% 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroText = styled(motion.h1)`
  font-size: clamp(48px, 9vw, 90px);
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.1;
  color: #0f0f0f;
`;

const Content = styled(motion.div)`
  font-size: 20px;
  line-height: 1.8;
  color: #333;
  text-align: center;
  max-width: 900px;
  margin: 0 auto 80px;

  p { margin-bottom: 32px; }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const Img = styled(motion.img)`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

export default function About() {
  return (
    <Section>
      <HeroText
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Crafted with Intention.<br />Worn with Timeless Grace.
      </HeroText>

      <Content
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <p>At HGAMS CREATIONS, every piece is hand-designed in our Punjab atelier — where tradition meets modern elegance.</p>
        <p>From bespoke suits and handcrafted kurtas to everyday essentials, we create fashion for the modern woman who values quality, exclusivity, and effortless sophistication.</p>
        <p>Founded with a passion for timeless design, we source the finest fabrics and pour heart into every stitch. This isn't fast fashion — it's heirloom quality you’ll reach for season after season.</p>
      </Content>

      <ImageGrid>
        <Img
          src="https://static.dezeen.com/uploads/2015/12/Cashmere-in-Love_URAStudio_retail_interior_dezeen_936_0.jpg"
          alt="Our atelier showcase"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <Img
          src="https://wonderlandbylilian.com/cdn/shop/files/Xnip2024-10-04_19-29-43.jpg?v=1728095599&width=1080"
          alt="Elegant showroom display"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          viewport={{ once: true }}
        />
        <Img
          src="https://designformal.com/cdn/shop/files/Simple_Sexy_Prom_Dresses-DesignFormal.jpg?v=1684247823&width=1800"
          alt="Handcrafted details"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
        />
      </ImageGrid>
    </Section>
  );
}