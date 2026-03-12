import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { CheckCircle } from 'lucide-react';

const Container = styled.div`
  max-width: 600px;
  margin: 150px auto;
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
`;

const IconWrapper = styled.div`
  color: #27ae60;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  margin-bottom: 20px;
  color: #1a1a1a;
`;

const Message = styled.p`
  color: #666;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const OrderId = styled.span`
  background: #f4f4f4;
  padding: 8px 16px;
  border-radius: 4px;
  font-family: monospace;
  font-weight: 600;
  display: block;
  width: fit-content;
  margin: 10px auto;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 16px 40px;
  background: #1a1a1a;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background: #d4af37;
    color: #000;
    transform: translateY(-3px);
  }
`;

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <Container>
      <IconWrapper>
        <CheckCircle size={80} strokeWidth={1.5} />
      </IconWrapper>
      <Title>Thank You for Your Order!</Title>
      <Message>
        Your order has been placed successfully. We'll send you a confirmation email shortly.
        <br /><br />
        Order ID:
        <OrderId>{id}</OrderId>
      </Message>
      <HomeButton to="/">Back to Shop</HomeButton>
    </Container>
  );
}
