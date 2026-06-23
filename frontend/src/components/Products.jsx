import { useEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Check, Eye, ArrowRight } from 'lucide-react';
import { apiEndpoint } from '../config/api';
import { CATEGORY_NAMES } from '../constants/categories';
import { COLOR_MAP, fallbackProducts } from '../data/products';

const Section = styled.section`
  padding: ${(p) => (p.$featured ? '80px 5% 60px' : '100px 5% 100px')};
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
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

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #b79447;
  transition: gap 0.3s;

  &:hover {
    gap: 14px;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 10px 24px;
  border: 1.5px solid ${(p) => (p.$active ? '#1a1a1a' : '#ddd')};
  background: ${(p) => (p.$active ? '#1a1a1a' : 'transparent')};
  color: ${(p) => (p.$active ? '#faf9f6' : '#777')};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 100px;

  &:hover {
    border-color: #1a1a1a;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
`;

const Card = styled(motion.div)`
  background: #fff;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  transition: box-shadow 0.4s ease;

  &:hover {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
  }
`;

const ImageLink = styled(Link)`
  display: block;
  position: relative;
  overflow: hidden;
  height: ${(p) => (p.$featured ? '360px' : '400px')};

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
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 6px;
  background: #1a1a1a;
  color: #faf9f6;
  transition: all 0.3s;

  &:hover {
    background: #333;
  }
`;

const ViewBtn = styled(Link)`
  flex: 1;
  padding: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: 6px 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #555;
  border-radius: 100px;
  z-index: 2;
`;

const Info = styled.div`
  padding: 18px 6px;
`;

const ProductName = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #1a1a1a;
  display: block;

  &:hover {
    color: #b79447;
  }
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
  gap: 5px;
`;

const ColorDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  border: 1px solid rgba(0, 0, 0, 0.08);
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
`;

const CenterLink = styled.div`
  text-align: center;
`;

const filters = ['All', ...CATEGORY_NAMES];

export default function Products({ featured = false }) {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [addedId, setAddedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(apiEndpoint('/api/products'))
      .then((res) => setProducts(res.data))
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const filtered =
    activeFilter === 'All'
      ? products
      : products.filter((p) => p.category === activeFilter);

  const displayed = featured ? filtered.slice(0, 4) : filtered;

  const addToCartHandler = useCallback(
    (product) => {
      addToCart({
        product: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        qty: 1,
        size: product.sizes?.[0] || 'One Size',
        color: product.colors?.[0] || 'Default',
      });
      setAddedId(product._id);
      setTimeout(() => setAddedId(null), 1200);
    },
    [addToCart]
  );

  return (
    <Section id="products-section" $featured={featured}>
      <SectionHeader>
        <Eyebrow>{featured ? 'Trending Now' : 'Shop Our Store'}</Eyebrow>
        <Title>{featured ? 'Featured Products' : 'All Products'}</Title>
      </SectionHeader>

      {!featured && (
        <FilterTabs>
          {filters.map((f) => (
            <Tab key={f} $active={activeFilter === f} onClick={() => setActiveFilter(f)}>
              {f}
            </Tab>
          ))}
        </FilterTabs>
      )}

      <Grid>
        <AnimatePresence mode="popLayout">
          {displayed.map((product, i) => (
            <Card
              key={product._id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(product._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <ImageLink to={`/product/${product._id}`} $featured={featured}>
                <CategoryBadge>{product.category}</CategoryBadge>
                <img src={product.images[0]} alt={product.name} loading="lazy" />

                <AnimatePresence>
                  {hoveredId === product._id && (
                    <QuickActions
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                    >
                      <ActionBtn
                        onClick={(e) => {
                          e.preventDefault();
                          addToCartHandler(product);
                        }}
                      >
                        <ShoppingBag size={13} /> Add
                      </ActionBtn>
                      <ViewBtn to={`/product/${product._id}`}>
                        <Eye size={13} /> View
                      </ViewBtn>
                    </QuickActions>
                  )}
                </AnimatePresence>

                {addedId === product._id && (
                  <AddedFeedback>
                    <Check size={28} />
                    <span style={{ fontSize: 12, letterSpacing: 2, marginTop: 8 }}>ADDED</span>
                  </AddedFeedback>
                )}
              </ImageLink>

              <Info>
                <ProductName to={`/product/${product._id}`}>{product.name}</ProductName>
                <PriceRow>
                  <Price>₹{product.price.toLocaleString('en-IN')}</Price>
                  <Colors>
                    {product.colors?.slice(0, 3).map((c) => (
                      <ColorDot key={c} $color={COLOR_MAP[c] || '#ccc'} title={c} />
                    ))}
                  </Colors>
                </PriceRow>
              </Info>
            </Card>
          ))}
        </AnimatePresence>
      </Grid>

      {featured && (
        <CenterLink>
          <ViewAllLink to="/shop">
            View All Products <ArrowRight size={16} />
          </ViewAllLink>
        </CenterLink>
      )}
    </Section>
  );
}
