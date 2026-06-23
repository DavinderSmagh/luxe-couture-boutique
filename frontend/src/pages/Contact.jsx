import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, Clock } from 'lucide-react';

const Page = styled.div`
  padding: 120px 5% 80px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: clamp(36px, 5vw, 52px);
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: #1a1a1a;
  color: #e0ddd8;
  padding: 40px;
  border-radius: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;

  svg {
    color: #b79447;
    flex-shrink: 0;
    margin-top: 2px;
  }

  h3 {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #faf9f6;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: #999;
  }
`;

const Form = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0ddd8;
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #b79447;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0ddd8;
  border-radius: 6px;
  font-size: 15px;
  min-height: 140px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #b79447;
  }
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: #faf9f6;
  border: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
`;

const SuccessMsg = styled(motion.div)`
  background: rgba(183, 148, 71, 0.1);
  color: #8a6d2b;
  padding: 16px;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
`;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Page>
      <Header>
        <Title>Get in Touch</Title>
        <Subtitle>
          Questions about custom tailoring, sizing, or your order? We're here to help.
        </Subtitle>
      </Header>

      <Grid>
        <InfoCard>
          <InfoItem>
            <MapPin size={20} />
            <div>
              <h3>Visit Us</h3>
              <p>Kotkapura-151204, Punjab, India</p>
            </div>
          </InfoItem>
          <InfoItem>
            <Mail size={20} />
            <div>
              <h3>Email</h3>
              <p>example@hgams.in</p>
            </div>
          </InfoItem>
          <InfoItem>
            <Phone size={20} />
            <div>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>
          </InfoItem>
          <InfoItem>
            <Clock size={20} />
            <div>
              <h3>Hours</h3>
              <p>Mon – Sat: 10:00 AM – 7:00 PM<br />Sunday: By appointment</p>
            </div>
          </InfoItem>
        </InfoCard>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Your Name</Label>
            <Input type="text" placeholder="Full name" required />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="your@email.com" required />
          </FormGroup>
          <FormGroup>
            <Label>Subject</Label>
            <Input type="text" placeholder="Custom suit inquiry, order help..." required />
          </FormGroup>
          <FormGroup>
            <Label>Message</Label>
            <Textarea placeholder="Tell us how we can help..." required />
          </FormGroup>
          <SubmitBtn type="submit" whileTap={{ scale: 0.98 }}>
            <Send size={16} /> Send Message
          </SubmitBtn>
          {submitted && (
            <SuccessMsg initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Thank you! We'll get back to you within 24 hours.
            </SuccessMsg>
          )}
        </Form>
      </Grid>
    </Page>
  );
}
