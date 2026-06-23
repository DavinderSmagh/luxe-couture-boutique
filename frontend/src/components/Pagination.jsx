import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Wrapper = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 64px;
  flex-wrap: wrap;
`;

const PageBtn = styled(motion.button)`
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid ${(p) => (p.$active ? '#1a1a1a' : '#e0ddd8')};
  background: ${(p) => (p.$active ? '#1a1a1a' : 'transparent')};
  color: ${(p) => (p.$active ? '#faf9f6' : '#666')};
  font-size: 14px;
  font-weight: 600;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover:not(:disabled) {
    border-color: #1a1a1a;
    color: ${(p) => (p.$active ? '#faf9f6' : '#1a1a1a')};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const Ellipsis = styled.span`
  color: #999;
  padding: 0 4px;
  user-select: none;
`;

const PageInfo = styled.span`
  font-size: 13px;
  color: #888;
  margin: 0 12px;
  letter-spacing: 0.5px;
`;

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  pages.push(1);

  if (current > 3) pages.push('...');

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <Wrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Pagination"
    >
      <PageBtn
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={18} />
      </PageBtn>

      <AnimatePresence mode="popLayout">
        {pages.map((page, idx) =>
          page === '...' ? (
            <Ellipsis key={`ellipsis-${idx}`}>…</Ellipsis>
          ) : (
            <PageBtn
              key={page}
              $active={page === currentPage}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.92 }}
            >
              {page}
            </PageBtn>
          )
        )}
      </AnimatePresence>

      <PageBtn
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={18} />
      </PageBtn>

      <PageInfo>
        {currentPage} of {totalPages}
      </PageInfo>
    </Wrapper>
  );
}
