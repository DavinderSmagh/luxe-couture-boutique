import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, getCategoryLink } from '../constants/categories';

const Section = styled.section`
  padding: ${(p) => (p.$compact ? '60px 5% 80px' : '120px 5% 100px')};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${(p) => (p.$compact ? '48px' : '72px')};
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
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888;
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$count || 3}, 1fr);
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  height: ${(p) => (p.$compact ? '400px' : '520px')};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 36px 28px;
  transition: background 0.4s ease;

  ${CategoryCard}:hover & {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

const CardTitle = styled.h3`
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 6px;
`;

const CardDesc = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
`;

const CardLink = styled(Link)`
  font-size: 12px;
  color: #b79447;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.3s ease;

  &:hover {
    gap: 14px;
  }
`;

export default function Collections({ compact = false }) {
  const items = compact ? CATEGORIES.slice(0, 3) : CATEGORIES;

  return (
    <Section id="collections-section" $compact={compact}>
      {!compact && (
        <SectionHeader>
          <Eyebrow>Curated for You</Eyebrow>
          <Title>Our Collections</Title>
          <Subtitle>
            From bespoke suits to everyday essentials — explore every category of handcrafted fashion.
          </Subtitle>
        </SectionHeader>
      )}

      {compact && (
        <SectionHeader $compact>
          <Eyebrow>Explore More</Eyebrow>
          <Title>Shop by Collection</Title>
        </SectionHeader>
      )}

      <Categories $count={items.length}>
        {items.map((cat, i) => (
          <CategoryCard
            key={cat.id}
            $compact={compact}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <img src={cat.image} alt={cat.name} loading="lazy" />
            <CardOverlay>
              <CardTitle>{cat.name}</CardTitle>
              <CardDesc>{cat.description}</CardDesc>
              <CardLink to={getCategoryLink(cat.name)}>
                Explore <ArrowRight size={16} />
              </CardLink>
            </CardOverlay>
          </CategoryCard>
        ))}
      </Categories>
    </Section>
  );
}
