import { useEffect, useState, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Check, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { apiEndpoint } from '../config/api';
import { CATEGORY_NAMES, ITEMS_PER_PAGE } from '../constants/categories';
import { COLOR_MAP, fallbackProducts } from '../data/products';
import Pagination from '../components/Pagination';

const Page = styled.div`
  padding: 120px 5% 80px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
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

const Title = styled.h1`
  font-size: clamp(36px, 6vw, 56px);
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const Tab = styled(motion.button)`
  padding: 10px 24px;
  border: 1.5px solid ${(p) => (p.$active ? '#1a1a1a' : '#ddd')};
  background: ${(p) => (p.$active ? '#1a1a1a' : 'transparent')};
  color: ${(p) => (p.$active ? '#faf9f6' : '#777')};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 100px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    border-color: #1a1a1a;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  min-height: 400px;
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
  height: 380px;

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
  transition: all 0.3s;

  ${(p) =>
    p.$primary
      ? `background: #1a1a1a; color: #faf9f6; &:hover { background: #333; }`
      : `background: rgba(255,255,255,0.95); color: #1a1a1a; &:hover { background: #fff; }`}
`;

const ViewLink = styled(Link)`
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
  transition: all 0.3s;

  &:hover {
    background: #fff;
  }
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
  transition: color 0.3s;

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

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: #999;
`;

const filters = ['All', ...CATEGORY_NAMES];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedId, setAddedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiEndpoint('/api/products'))
      .then((res) => setProducts(res.data))
      .catch(() => setProducts(fallbackProducts))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && filters.includes(cat)) setActiveFilter(cat);
    else if (!cat) setActiveFilter('All');
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const filtered = useMemo(() => {
    let result = products;
    if (activeFilter !== 'All') {
      result = result.filter((p) => p.category === activeFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, activeFilter, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    const params = new URLSearchParams(searchParams);
    if (filter === 'All') params.delete('category');
    else params.set('category', filter);
    setSearchParams(params);
  };

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
    <Page>
      <Header>
        <Eyebrow>Our Store</Eyebrow>
        <Title>Shop All Products</Title>
        <Subtitle>
          {searchQuery
            ? `Showing results for "${searchQuery}"`
            : 'Bespoke tailoring, ethnic wear, and everyday essentials'}
        </Subtitle>
      </Header>

      <FilterBar>
        {filters.map((f) => (
          <Tab
            key={f}
            $active={activeFilter === f}
            onClick={() => handleFilter(f)}
            layout
            whileTap={{ scale: 0.96 }}
          >
            {f}
          </Tab>
        ))}
      </FilterBar>

      {loading ? (
        <EmptyState>Loading products...</EmptyState>
      ) : (
        <>
          <Grid>
            <AnimatePresence mode="popLayout">
              {paginated.length === 0 ? (
                <EmptyState>
                  <h3>No products found</h3>
                  <p>Try a different category or search term.</p>
                </EmptyState>
              ) : (
                paginated.map((product, i) => (
                  <Card
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04, duration: 0.45 }}
                    onMouseEnter={() => setHoveredId(product._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <ImageLink to={`/product/${product._id}`}>
                      <CategoryBadge>{product.category}</CategoryBadge>
                      <img src={product.images[0]} alt={product.name} loading="lazy" />

                      <AnimatePresence>
                        {hoveredId === product._id && (
                          <QuickActions
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.22 }}
                          >
                            <ActionBtn
                              $primary
                              onClick={(e) => {
                                e.preventDefault();
                                addToCartHandler(product);
                              }}
                            >
                              <ShoppingBag size={13} /> Add
                            </ActionBtn>
                            <ViewLink to={`/product/${product._id}`}>
                              <Eye size={13} /> View
                            </ViewLink>
                          </QuickActions>
                        )}
                      </AnimatePresence>

                      {addedId === product._id && (
                        <AddedFeedback>
                          <Check size={28} />
                          <span style={{ fontSize: 12, letterSpacing: 2, marginTop: 8 }}>
                            ADDED
                          </span>
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
                ))
              )}
            </AnimatePresence>
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}
    </Page>
  );
}
