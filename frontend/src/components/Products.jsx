import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

const Section = styled.section`
  padding: 120px 5% 80px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: clamp(40px, 8vw, 72px);
  text-align: center;
  margin-bottom: 60px;
  color: #0f0f0f;
  letter-spacing: 2px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
`;

const Card = styled(motion.div)`
  background: #fff;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.12);
  }

  img {
    width: 100%;
    height: 480px;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

const Info = styled.div`
  padding: 24px;
  text-align: center;
`;

const Name = styled.h3`
  font-size: 22px;
  margin-bottom: 8px;
  color: #1a1a1a;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #d4af37;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background: #d4af37;
  color: #1a1a1a;
  border: none;
  padding: 12px 32px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover {
    background: #e6c04a;
  }
`;

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <Section>
      <Title>Our Collection</Title>
      <Grid>
        {products.map((product, i) => (
          <Card
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img src={product.images[0]} alt={product.name} />
            <Info>
              <Name>{product.name}</Name>
              <Price>₹{product.price.toLocaleString('en-IN')}</Price>
              <Button>Add to Cart</Button>
            </Info>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}