import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { apiEndpoint } from '../config/api';

const Container = styled.div`
  max-width: 1000px;
  margin: 120px auto 60px;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  margin-bottom: 40px;
  text-align: center;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  background: #fff;
  padding: 30px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;

  h3 {
    margin-bottom: 15px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a1a;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const SummaryBox = styled.div`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  height: fit-content;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 15px;
  color: #444;
`;

const TotalRow = styled(SummaryRow)`
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  img {
    width: 60px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 18px;
  background: #000;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s;

  &:hover {
    background: #d4af37;
    color: #000;
  }
`;

export default function PlaceOrder() {
  const { state: { cartItems }, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutInfo = location.state || {};

  const placeOrderHandler = async () => {
    try {
      const orderData = {
        user: {
          name: checkoutInfo.name,
          email: checkoutInfo.email,
          phone: checkoutInfo.phone,
        },
        orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item.product
        })),
        shippingAddress: {
            address: checkoutInfo.address,
            city: checkoutInfo.city,
            postalCode: checkoutInfo.postalCode,
            country: checkoutInfo.country
        },
        paymentMethod: 'CashOnDelivery', // hardcoded for now
        itemsPrice: checkoutInfo.itemsPrice,
        shippingPrice: checkoutInfo.shippingPrice,
        taxPrice: checkoutInfo.taxPrice,
        totalPrice: checkoutInfo.totalPrice,
      };

      const { data } = await axios.post(apiEndpoint('/api/orders'), orderData);
      
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Failed to place order. Please check console for details.');
    }
  };

  return (
    <Container>
      <Title>Review Your Order</Title>
      <Content>
        <div>
          <InfoBox>
            <h3>Shipping Address</h3>
            <p>
              {checkoutInfo.name} ({checkoutInfo.email})<br />
              {checkoutInfo.phone && `${checkoutInfo.phone} · `}
              {checkoutInfo.address}, {checkoutInfo.city}<br />
              {checkoutInfo.postalCode}, {checkoutInfo.country}
            </p>
          </InfoBox>

          <InfoBox>
            <h3>Payment Method</h3>
            <p>Cash On Delivery (Default)</p>
          </InfoBox>

          <InfoBox>
            <h3>Order Items</h3>
            {cartItems.map((item) => (
              <ItemRow key={item.cartKey || item.product}>
                <img src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: '#888', fontSize: '14px' }}>
                    {item.qty} x ₹{item.price.toLocaleString()} = ₹{(item.qty * item.price).toLocaleString()}
                  </div>
                </div>
              </ItemRow>
            ))}
          </InfoBox>
        </div>

        <SummaryBox>
          <h3>Summary</h3>
          <SummaryRow>
            <span>Items</span>
            <span>₹{checkoutInfo.itemsPrice?.toLocaleString()}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>₹{checkoutInfo.shippingPrice?.toLocaleString()}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax</span>
            <span>₹{checkoutInfo.taxPrice?.toLocaleString()}</span>
          </SummaryRow>
          <TotalRow>
            <span>Total</span>
            <span>₹{checkoutInfo.totalPrice?.toLocaleString()}</span>
          </TotalRow>
          <Button onClick={placeOrderHandler}>Place Order</Button>
        </SummaryBox>
      </Content>
    </Container>
  );
}
