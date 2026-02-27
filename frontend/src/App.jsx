import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Collections from './components/Collections';
import About from './components/About';
import Cart from './components/Cart';
import Footer from './components/Footer';   // ← added this

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.6, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><Products /></>} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />   
    </Router>
  );
}

export default App;