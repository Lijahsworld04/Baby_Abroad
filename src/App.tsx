import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

import { BackgroundTree } from "./components/BackgroundTree";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartProvider } from "./lib/cart";
import { initSureness } from "./lib/sureness";

import Home from "./pages/Home";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Guides from "./pages/Guides";
import Guide from "./pages/Guide";
import Checkout, { CheckoutReturn } from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Sample from "./pages/Sample";
import { Privacy, Terms } from "./pages/Legal";

export default function App() {
  useEffect(() => {
    initSureness();
  }, []);

  return (
    <HelmetProvider>
      <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <BackgroundTree />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<Guide />} />
          <Route path="/sample-plan" element={<Sample />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/return" element={<CheckoutReturn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}