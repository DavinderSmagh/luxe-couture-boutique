import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, getCategoryLink } from '../constants/categories';

const Section = styled.section`
  padding: 100px 5%;
  background: linear-gradient(180deg, #faf9f6 0%, #f3f0ea 100%);
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 56px;
`;

const Eyebrow = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #b79447;
  display: block;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: clamp(32px, 5vw, 48px);
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888;
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion(Link))`
  position: relative;
  height: 320px;
  border-radius: 12px;
  overflow: hidden;
  display: block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.4s, transform 0.4s;

  &:hover {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.1) 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 4px;
`;

const CardDesc = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
`;

const Explore = styled.span`
  font-size: 11px;
  color: #b79447;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export default function CategoryShowcase() {
  return (
    <Section id="categories-section">
      <Inner>
        <Header>
          <Eyebrow>Shop by Category</Eyebrow>
          <Title>Curated Collections</Title>
          <Subtitle>
            From bespoke suits to everyday essentials — discover pieces crafted for every moment.
          </Subtitle>
        </Header>

        <Grid>
          {CATEGORIES.filter((c) => c.featured).map((cat, i) => (
            <Card
              key={cat.id}
              to={getCategoryLink(cat.name)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <Overlay>
                <CardTitle>{cat.name}</CardTitle>
                <CardDesc>{cat.description}</CardDesc>
                <Explore>
                  Shop Now <ArrowRight size={14} />
                </Explore>
              </Overlay>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
