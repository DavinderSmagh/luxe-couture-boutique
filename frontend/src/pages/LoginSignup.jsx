import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, User, ArrowRight, Chrome } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileDashboard from '../components/ProfileDashboard';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #faf9f6 0%, #f0eee9 100%);
  padding: 120px 20px 60px;
  position: relative;
  overflow: hidden;
`;

const BackgroundDecor = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(183, 148, 71, 0.05) 0%, rgba(183, 148, 71, 0) 70%);
  top: -100px;
  right: -100px;
  pointer-events: none;
`;

const BackgroundDecor2 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(183, 148, 71, 0.04) 0%, rgba(183, 148, 71, 0) 70%);
  bottom: -150px;
  left: -150px;
  pointer-events: none;
`;

const AuthCard = styled(motion.div)`
  background: #ffffff;
  width: 100%;
  max-width: 480px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const CardHeader = styled.div`
  padding: 40px 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin: 0 40px 30px;
  position: relative;
`;

const Tab = styled.button`
  flex: 1;
  background: none;
  border: none;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => (p.$active ? '#1a1a1a' : '#999')};
  cursor: pointer;
  transition: color 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TabIndicator = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: #b79447;
  width: 50%;
`;

const FormContainer = styled.div`
  padding: 0 40px 40px;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 12px;
  font-size: 15px;
  color: #1a1a1a;
  transition: all 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: #ffffff;
    border-color: #b79447;
    box-shadow: 0 0 0 4px rgba(183, 148, 71, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #333;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #999;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
  }

  span {
    padding: 0 16px;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
  margin-bottom: 12px;

  &:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  font-size: 13px;
  color: #666;
  margin-top: -16px;
  margin-bottom: 24px;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #b79447;
  }
`;

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [method, setMethod] = useState('email'); // 'email' or 'phone'

  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, register } = useAuth();

  const from = location.state?.from?.pathname || '/';

  // If already logged in, show the profile dashboard
  if (user) {
    return (
      <PageContainer>
        <BackgroundDecor />
        <BackgroundDecor2 />
        <ProfileDashboard />
      </PageContainer>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(emailOrPhone, password);
      } else {
        await register(name, emailOrPhone, password, method);
      }
      
      // If they came from somewhere else, send them back. Otherwise let them stay and see the profile dashboard.
      if (from !== '/') {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <BackgroundDecor />
      <BackgroundDecor2 />
      
      <AuthCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <CardHeader>
          <Title>{isLogin ? 'Welcome Back' : 'Create Account'}</Title>
          <Subtitle>
            {isLogin
              ? 'Log in to access your exclusive couture collection and orders.'
              : 'Join our exclusive club for luxury fashion and styling.'}
          </Subtitle>
        </CardHeader>

        <Tabs>
          <Tab $active={isLogin} onClick={() => setIsLogin(true)}>
            Log In
          </Tab>
          <Tab $active={!isLogin} onClick={() => setIsLogin(false)}>
            Sign Up
          </Tab>
          <TabIndicator
            initial={false}
            animate={{ left: isLogin ? '0%' : '50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </Tabs>

        <FormContainer>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
                
                {!isLogin && (
                  <InputGroup>
                    <InputIcon><User size={18} /></InputIcon>
                    <Input 
                      type="text" 
                      placeholder="Full Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                    />
                  </InputGroup>
                )}

                <InputGroup>
                  <InputIcon>
                    {method === 'email' ? <Mail size={18} /> : <Phone size={18} />}
                  </InputIcon>
                  <Input 
                    type={method === 'email' ? 'email' : 'tel'} 
                    placeholder={method === 'email' ? 'Email Address' : 'Phone Number'} 
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <InputIcon><Lock size={18} /></InputIcon>
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>

                {isLogin && (
                  <ForgotPassword href="#forgot">Forgot Password?</ForgotPassword>
                )}

                <SubmitButton
                  as={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                  {!loading && <ArrowRight size={18} />}
                </SubmitButton>
              </form>
            </motion.div>
          </AnimatePresence>

          <Divider><span>OR CONTINUE WITH</span></Divider>

          <SocialButton>
            <Chrome size={20} color="#EA4335" />
            Continue with Google
          </SocialButton>
          
          <SocialButton onClick={() => setMethod(method === 'email' ? 'phone' : 'email')}>
            {method === 'email' ? <Phone size={20} color="#333" /> : <Mail size={20} color="#333" />}
            Continue with {method === 'email' ? 'Phone Number' : 'Email'}
          </SocialButton>

        </FormContainer>
      </AuthCard>
    </PageContainer>
  );
}
