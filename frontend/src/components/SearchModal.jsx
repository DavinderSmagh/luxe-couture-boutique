import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiEndpoint } from '../config/api';
import { fallbackProducts } from '../data/products';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 15, 0.6);
  backdrop-filter: blur(8px);
  z-index: 3000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 120px 24px 40px;
`;

const Modal = styled(motion.div)`
  width: 100%;
  max-width: 640px;
  background: #faf9f6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 18px;
  color: #1a1a1a;
  outline: none;
  font-family: 'Inter', sans-serif;

  &::placeholder {
    color: #aaa;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s;

  &:hover {
    color: #1a1a1a;
  }
`;

const Results = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
`;

const ResultItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  transition: background 0.2s;

  &:hover {
    background: rgba(183, 148, 71, 0.08);
  }

  img {
    width: 56px;
    height: 68px;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const ResultInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    color: #b79447;
    margin-top: 4px;
  }
`;

const EmptyMsg = styled.p`
  padding: 40px 24px;
  text-align: center;
  color: #999;
  font-size: 15px;
`;

const ViewAll = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #b79447;
  transition: gap 0.3s;

  &:hover {
    gap: 14px;
  }
`;

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState(fallbackProducts);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    axios
      .get(apiEndpoint('/api/products'))
      .then((res) => setProducts(res.data))
      .catch(() => setProducts(fallbackProducts));
  }, [isOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query, products]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSelect = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Modal
        initial={{ opacity: 0, y: -20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        <SearchHeader>
          <Search size={22} color="#b79447" strokeWidth={1.5} />
          <SearchInput
            autoFocus
            placeholder="Search suits, kurtas, dresses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CloseBtn onClick={onClose} aria-label="Close search">
            <X size={22} />
          </CloseBtn>
        </SearchHeader>

        <Results>
          <AnimatePresence mode="popLayout">
            {query.trim() && results.length === 0 ? (
              <EmptyMsg key="empty">No products found for "{query}"</EmptyMsg>
            ) : (
              results.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <ResultItem to={`/product/${product._id}`} onClick={handleSelect}>
                    <img src={product.images[0]} alt={product.name} />
                    <ResultInfo>
                      <span>{product.category}</span>
                      <h4>{product.name}</h4>
                      <p>₹{product.price.toLocaleString('en-IN')}</p>
                    </ResultInfo>
                    <ArrowRight size={16} color="#ccc" />
                  </ResultItem>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </Results>

        {query.trim() && results.length > 0 && (
          <ViewAll to={`/shop?search=${encodeURIComponent(query)}`} onClick={handleSelect}>
            View all results <ArrowRight size={16} />
          </ViewAll>
        )}
      </Modal>
    </Overlay>
  );
}
