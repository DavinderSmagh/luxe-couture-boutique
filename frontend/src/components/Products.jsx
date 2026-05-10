import { useEffect, useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Check, Eye } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Section = styled.section`
  padding: 100px 5% 100px;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
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
  font-size: clamp(36px, 6vw, 56px);
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 16px;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 56px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 10px 28px;
  border: 1.5px solid ${props => props.$active ? '#1a1a1a' : '#ddd'};
  background: ${props => props.$active ? '#1a1a1a' : 'transparent'};
  color: ${props => props.$active ? '#faf9f6' : '#777'};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;

  &:hover {
    border-color: #1a1a1a;
    color: ${props => props.$active ? '#faf9f6' : '#1a1a1a'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Card = styled(motion.div)`
  background: #fff;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 420px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  ${Card}:hover & img {
    transform: scale(1.06);
  }
`;

const QuickActions = styled(motion.div)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  border-radius: 4px;

  ${props => props.$primary ? `
    background: #1a1a1a;
    color: #faf9f6;
    &:hover { background: #333; }
  ` : `
    background: rgba(255,255,255,0.95);
    color: #1a1a1a;
    backdrop-filter: blur(10px);
    &:hover { background: #fff; }
  `}
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #555;
  border-radius: 2px;
  z-index: 2;
`;

const Info = styled.div`
  padding: 20px 4px;
`;

const ProductName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #1a1a1a;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #b79447;
`;

const Colors = styled.div`
  display: flex;
  gap: 6px;
`;

const ColorDot = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: 1.5px solid rgba(0,0,0,0.08);
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const AddedFeedback = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;
  animation: ${fadeIn} 0.3s ease;

  svg {
    margin-bottom: 8px;
  }

  span {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: #999;

  h3 {
    font-size: 24px;
    margin-bottom: 8px;
    color: #555;
  }
`;

const colorMap = {
  'Black': '#1a1a1a',
  'Midnight Blue': '#191970',
  'Emerald': '#2d6a4f',
  'Rose Pink': '#e8a0a0',
  'Ivory': '#f5f0e8',
  'Dusty Mauve': '#c9a0a0',
  'Champagne': '#f7e7ce',
  'Soft Peach': '#ffdab9',
  'Burgundy': '#722f37',
  'Midnight Black': '#0a0a0a',
  'Blush': '#de98ab',
  'Ocean Blue': '#4f86c6',
  'Burnt Sienna': '#e97451',
  'Tan': '#d2b48c',
  'Gold & Pearl': '#d4af37',
  'Silver & Pearl': '#c0c0c0',
  'Camel': '#c19a6b',
  'Charcoal': '#36454f',
  'Cream': '#fffdd0',
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [addedId, setAddedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  // Sync filter from URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveFilter(cat);
    }
  }, [searchParams]);

  const filters = ['All', 'Handmade Dresses', "Women's Essentials"];
  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.category === activeFilter);

  const addToCartHandler = useCallback((product) => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      qty: 1
    });
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1200);
  }, [addToCart]);

  return (
    <Section id="products-section">
      <SectionHeader>
        <Eyebrow>Shop Our Store</Eyebrow>
        <Title>Featured Products</Title>
      </SectionHeader>

      <FilterTabs>
        {filters.map(f => (
          <Tab
            key={f}
            $active={activeFilter === f}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </Tab>
        ))}
      </FilterTabs>

      <Grid>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState>
              <h3>No products found</h3>
              <p>Try selecting a different category.</p>
            </EmptyState>
          ) : (
            filtered.map((product, i) => (
              <Card
                key={product._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                onMouseEnter={() => setHoveredId(product._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <ImageWrapper>
                  <CategoryBadge>{product.category}</CategoryBadge>
                  <img src={product.images[0]} alt={product.name} loading="lazy" />

                  <AnimatePresence>
                    {hoveredId === product._id && (
                      <QuickActions
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ActionBtn $primary onClick={() => addToCartHandler(product)}>
                          <ShoppingBag size={14} /> Add to Cart
                        </ActionBtn>
                      </QuickActions>
                    )}
                  </AnimatePresence>

                  {addedId === product._id && (
                    <AddedFeedback>
                      <Check size={32} strokeWidth={2.5} />
                      <span>Added to Cart</span>
                    </AddedFeedback>
                  )}
                </ImageWrapper>

                <Info>
                  <ProductName>{product.name}</ProductName>
                  <PriceRow>
                    <Price>₹{product.price.toLocaleString('en-IN')}</Price>
                    <Colors>
                      {product.colors?.slice(0, 3).map(c => (
                        <ColorDot key={c} $color={colorMap[c] || '#ccc'} title={c} />
                      ))}
                    </Colors>
                  </PriceRow>
                </Info>
              </Card>
            ))
          )}
        </AnimatePresence>
      </Grid>
    </Section>
  );
}