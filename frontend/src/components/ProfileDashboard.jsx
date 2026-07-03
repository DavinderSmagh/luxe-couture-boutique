import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LogOut, ShoppingBag, Heart, User, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled(motion.div)`
  background: #ffffff;
  width: 100%;
  max-width: 600px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
  padding: 40px;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: #f5f0e6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #b79447;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
`;

const ActionCard = styled(motion.div)`
  background: #faf9f6;
  border: 1px solid #f0eee9;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  svg {
    color: #b79447;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  p {
    font-size: 12px;
    color: #888;
  }

  &:hover {
    border-color: #b79447;
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(183, 148, 71, 0.08);
  }
`;

const LogoutButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: transparent;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #fff0f0;
    border-color: #d32f2f;
  }
`;

export default function ProfileDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <DashboardContainer
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Avatar>
          <User size={40} />
        </Avatar>
        <Title>Welcome, {user.name || 'Beautiful'}</Title>
        <Subtitle>{user.email}</Subtitle>
      </Header>

      <Grid>
        <ActionCard onClick={() => navigate('/shop')} whileHover={{ y: -4 }}>
          <ShoppingBag size={28} />
          <h3>My Cart</h3>
          <p>View your shopping bag</p>
        </ActionCard>
        
        <ActionCard onClick={() => navigate('/collections')} whileHover={{ y: -4 }}>
          <Heart size={28} />
          <h3>Wishlist</h3>
          <p>Your saved favorites</p>
        </ActionCard>

        <ActionCard onClick={() => navigate('/')} whileHover={{ y: -4 }}>
          <ShoppingBag size={28} />
          <h3>Order History</h3>
          <p>Track your couture</p>
        </ActionCard>

        <ActionCard onClick={() => navigate('/')} whileHover={{ y: -4 }}>
          <MapPin size={28} />
          <h3>Addresses</h3>
          <p>Manage delivery info</p>
        </ActionCard>
      </Grid>

      <LogoutButton
        onClick={() => {
          logout();
          navigate('/');
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <LogOut size={18} />
        Log Out
      </LogoutButton>
    </DashboardContainer>
  );
}
