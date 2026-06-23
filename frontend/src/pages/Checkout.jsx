import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 120px auto 60px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #fdfcfb;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  margin-bottom: 30px;
  color: #1a1a1a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background: #fff;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #d4af37;
  }
`;

const OrderSummary = styled.div`
  background: #1a1a1a;
  color: #fff;
  padding: 40px;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 120px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 16px;
  opacity: 0.9;
`;

const Total = styled(SummaryItem)`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 24px;
  font-weight: 600;
  opacity: 1;
  color: #d4af37;
`;

const Button = styled.button`
  width: 100%;
  padding: 18px;
  background: #d4af37;
  color: #000;
  border: none;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s;

  &:hover {
    background: #e6c04a;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const CartItemRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;

  img {
    width: 50px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  font-size: 14px;
`;

export default function Checkout() {
  const { state: { cartItems, shippingAddress }, saveShippingAddress } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [name, setName] = useState(shippingAddress.name || '');
  const [email, setEmail] = useState(shippingAddress.email || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 10000 ? 0 : 500;
  const taxPrice = Math.round(itemsPrice * 0.18);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const submitHandler = async (e) => {
    e.preventDefault();
    saveShippingAddress({ name, email, phone, address, city, postalCode, country });

    navigate('/placeorder', {
      state: {
        name,
        email,
        phone,
        address,
            city, 
            postalCode, 
            country,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        } 
    });
  };

  return (
    <Container>
      <Section>
        <Title>Shipping Details</Title>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <Label>Full Name</Label>
            <Input 
              type="text" 
              placeholder="Enter full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Email Address</Label>
            <Input 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input 
              type="text" 
              placeholder="Enter address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>City</Label>
            <Input 
              type="text" 
              placeholder="Enter city" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Postal Code</Label>
            <Input 
              type="text" 
              placeholder="Enter postal code" 
              value={postalCode} 
              onChange={(e) => setPostalCode(e.target.value)} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Country</Label>
            <Input 
              type="text" 
              placeholder="Enter country" 
              value={country} 
              onChange={(e) => setCountry(e.target.value)} 
              required 
            />
          </FormGroup>
          <Button type="submit">Continue to Payment</Button>
        </Form>
      </Section>

      <OrderSummary>
        <Title style={{ color: '#fff' }}>Order Summary</Title>
        {cartItems.map((item) => (
          <CartItemRow key={item.cartKey || item.product}>
            <img src={item.image} alt={item.name} />
            <ItemInfo>
              <div>{item.name}</div>
              <div style={{ opacity: 0.6 }}>{item.qty} x ₹{item.price.toLocaleString()}</div>
            </ItemInfo>
          </CartItemRow>
        ))}
        <div style={{ marginTop: '30px' }}>
          <SummaryItem>
            <span>Subtotal</span>
            <span>₹{itemsPrice.toLocaleString()}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping</span>
            <span>₹{shippingPrice.toLocaleString()}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Tax (GST 18%)</span>
            <span>₹{taxPrice.toLocaleString()}</span>
          </SummaryItem>
          <Total>
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </Total>
        </div>
      </OrderSummary>
    </Container>
  );
}
