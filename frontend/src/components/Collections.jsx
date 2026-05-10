import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Section = styled.section`
  padding: 120px 5% 100px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 72px;
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
  font-size: clamp(36px, 6vw, 56px);
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  height: 520px;
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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.65) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 32px;
  transition: background 0.4s ease;

  ${CategoryCard}:hover & {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 0.75) 100%
    );
  }
`;

const CardTitle = styled.h3`
  font-size: 28px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 8px;
  letter-spacing: 1px;
`;

const CardLink = styled(Link)`
  font-size: 13px;
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

export default function Collections() {
  const categories = [
    {
      name: 'Handmade Dresses',
      description: 'Crafted with love',
      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      link: '/?category=Handmade+Dresses'
    },
    {
      name: "Women's Essentials",
      description: 'Everyday luxury',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      link: "/?category=Women's+Essentials"
    },
    {
      name: 'New Arrivals',
      description: 'Fresh from the atelier',
      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      link: '/'
    },
  ];

  return (
    <Section id="collections-section">
      <SectionHeader>
        <Eyebrow>Curated for You</Eyebrow>
        <Title>Our Collections</Title>
        <Subtitle>
          Explore our handpicked categories of timeless fashion and essential accessories.
        </Subtitle>
      </SectionHeader>

      <Categories>
        {categories.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <img src={cat.img} alt={cat.name} loading="lazy" />
            <CardOverlay>
              <CardTitle>{cat.name}</CardTitle>
              <CardLink to={cat.link}>
                Explore <ArrowRight size={16} />
              </CardLink>
            </CardOverlay>
          </CategoryCard>
        ))}
      </Categories>
    </Section>
  );
}