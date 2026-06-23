import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import CategoryShowcase from './components/CategoryShowcase';
import Collections from './components/Collections';
import About from './components/About';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import PlaceOrder from './pages/PlaceOrder';
import OrderSuccess from './pages/OrderSuccess';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import PolicyPage from './pages/PolicyPage';
import Contact from './pages/Contact';
import './App.css';

function AppLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <Navbar />
      <AppLayout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CategoryShowcase />
                <Products featured />
                <Collections compact />
              </>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies/:slug" element={<PolicyPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<OrderSuccess />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
