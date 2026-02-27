import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: 140px 5% 100px;
`;

const Title = styled.h1`
  font-size: clamp(50px, 10vw, 100px);
  text-align: center;
  margin-bottom: 80px;
  color: #0f0f0f;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion(Link))`
  position: relative;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  &:hover img {
    transform: scale(1.12);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: 600;
    letter-spacing: 2px;
    text-shadow: 0 4px 12px rgba(0,0,0,0.6);
  }
`;

export default function Collections() {
  const categories = [
    { name: 'Dresses', img: 'https://picsum.photos/id/1015/800/1000', link: '/shop?dresses' },
    { name: 'Tops & Blazers', img: 'https://picsum.photos/id/1060/800/1000', link: '/shop?tops' },
    { name: 'Outerwear', img: 'https://picsum.photos/id/1074/800/1000', link: '/shop?outerwear' },
    // Add more from your real designs
  ];

  return (
    <Section>
      <Title>Collections</Title>
      <Categories>
        {categories.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            to={cat.link}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <img src={cat.img} alt={cat.name} />
            <div className="overlay">{cat.name}</div>
          </CategoryCard>
        ))}
      </Categories>
    </Section>
  );
}