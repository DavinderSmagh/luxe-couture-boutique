import { useEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ShoppingBag, Check, ChevronLeft, Ruler, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { apiEndpoint } from '../config/api';
import { COLOR_MAP, fallbackProducts } from '../data/products';

const Page = styled.div`
  padding: 120px 5% 80px;
  max-width: 1400px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 40px;
  transition: color 0.3s;

  &:hover {
    color: #b79447;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Gallery = styled.div``;

const MainImage = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 560px;
  background: #f0ede8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const Thumb = styled.button`
  width: 80px;
  height: 96px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${(p) => (p.$active ? '#b79447' : 'transparent')};
  cursor: pointer;
  padding: 0;
  opacity: ${(p) => (p.$active ? 1 : 0.6)};
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div``;

const Category = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #b79447;
  display: block;
  margin-bottom: 12px;
`;

const Name = styled.h1`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 500;
  margin-bottom: 16px;
  color: #1a1a1a;
`;

const Price = styled.p`
  font-size: 28px;
  font-weight: 600;
  color: #b79447;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 32px;
`;

const CustomBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(183, 148, 71, 0.12);
  color: #8a6d2b;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

const OptionGroup = styled.div`
  margin-bottom: 28px;
`;

const OptionLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #888;
  display: block;
  margin-bottom: 12px;
`;

const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SizeBtn = styled.button`
  min-width: 48px;
  padding: 10px 16px;
  border: 1.5px solid ${(p) => (p.$active ? '#1a1a1a' : '#ddd')};
  background: ${(p) => (p.$active ? '#1a1a1a' : 'transparent')};
  color: ${(p) => (p.$active ? '#faf9f6' : '#555')};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: #1a1a1a;
  }
`;

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ColorBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  border: 2.5px solid ${(p) => (p.$active ? '#1a1a1a' : 'rgba(0,0,0,0.08)')};
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: ${(p) => (p.$active ? '0 0 0 2px #faf9f6, 0 0 0 4px #1a1a1a' : 'none')};

  &:hover {
    transform: scale(1.1);
  }
`;

const AddBtn = styled(motion.button)`
  width: 100%;
  padding: 18px;
  background: #1a1a1a;
  color: #faf9f6;
  border: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s;

  &:hover:not(:disabled) {
    background: #333;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const AddedToast = styled(motion.div)`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #1a1a1a;
  color: #fff;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  z-index: 2000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const Loading = styled.div`
  text-align: center;
  padding: 120px 20px;
  color: #999;
  font-size: 18px;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 120px 20px;

  h2 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  a {
    color: #b79447;
    font-weight: 600;
  }
`;

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiEndpoint(`/api/products/${id}`))
      .then((res) => {
        setProduct(res.data);
        setSelectedSize(res.data.sizes?.[0] || '');
        setSelectedColor(res.data.colors?.[0] || '');
      })
      .catch(() => {
        const fallback = fallbackProducts.find((p) => p._id === id);
        if (fallback) {
          setProduct(fallback);
          setSelectedSize(fallback.sizes?.[0] || '');
          setSelectedColor(fallback.colors?.[0] || '');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const addHandler = useCallback(() => {
    if (!product || !selectedSize) return;
    addToCart({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      qty: 1,
      size: selectedSize,
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }, [product, selectedSize, selectedColor, addToCart]);

  if (loading) return <Loading>Loading product...</Loading>;

  if (!product) {
    return (
      <NotFound>
        <h2>Product Not Found</h2>
        <p>The item you're looking for may have been removed.</p>
        <Link to="/shop">← Back to Shop</Link>
      </NotFound>
    );
  }

  return (
    <Page>
      <BackLink to="/shop">
        <ArrowLeft size={16} /> Back to Shop
      </BackLink>

      <Grid>
        <Gallery>
          <MainImage key={selectedImage} initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
            <img src={product.images[selectedImage]} alt={product.name} />
          </MainImage>
          {product.images.length > 1 && (
            <Thumbnails>
              {product.images.map((img, i) => (
                <Thumb key={i} $active={selectedImage === i} onClick={() => setSelectedImage(i)}>
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </Thumb>
              ))}
            </Thumbnails>
          )}
        </Gallery>

        <Details>
          <Category>{product.category}</Category>
          <Name>{product.name}</Name>
          <Price>₹{product.price.toLocaleString('en-IN')}</Price>
          <Description>{product.description}</Description>

          {product.isCustom && (
            <CustomBadge>
              <Ruler size={14} /> Made to Order — Custom Measurements Available
            </CustomBadge>
          )}

          {product.sizes?.length > 0 && (
            <OptionGroup>
              <OptionLabel>Size {selectedSize && `— ${selectedSize}`}</OptionLabel>
              <SizeGrid>
                {product.sizes.map((size) => (
                  <SizeBtn
                    key={size}
                    $active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeBtn>
                ))}
              </SizeGrid>
            </OptionGroup>
          )}

          {product.colors?.length > 0 && (
            <OptionGroup>
              <OptionLabel>Color {selectedColor && `— ${selectedColor}`}</OptionLabel>
              <ColorGrid>
                {product.colors.map((color) => (
                  <ColorBtn
                    key={color}
                    $color={COLOR_MAP[color] || '#ccc'}
                    $active={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    aria-label={color}
                  />
                ))}
              </ColorGrid>
            </OptionGroup>
          )}

          <AddBtn
            onClick={addHandler}
            disabled={!product.inStock}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingBag size={18} />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </AddBtn>
        </Details>
      </Grid>

      <AnimatePresence>
        {added && (
          <AddedToast
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <Check size={20} color="#b79447" />
            Added to cart — {selectedSize}, {selectedColor}
          </AddedToast>
        )}
      </AnimatePresence>
    </Page>
  );
}
