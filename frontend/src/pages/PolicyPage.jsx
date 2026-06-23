import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { POLICIES } from '../data/policies';

const Page = styled.div`
  padding: 120px 5% 80px;
  max-width: 800px;
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

const Title = styled(motion.h1)`
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 48px;
  color: #1a1a1a;
`;

const Section = styled(motion.section)`
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:last-child {
    border-bottom: none;
  }

  h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #1a1a1a;
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    color: #666;
  }
`;

export default function PolicyPage() {
  const { slug } = useParams();
  const policy = POLICIES[slug];

  if (!policy) return <Navigate to="/" replace />;

  return (
    <Page>
      <BackLink to="/">
        <ArrowLeft size={16} /> Back to Home
      </BackLink>

      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {policy.title}
      </Title>

      {policy.content.map((section, i) => (
        <Section
          key={section.heading}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
        >
          <h2>{section.heading}</h2>
          <p>{section.text}</p>
        </Section>
      ))}
    </Page>
  );
}
