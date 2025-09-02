import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { CartProvider } from '../src/components/Cart/CartContext';
import TrackPageView from './TrackPageView';

function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Hide Header and Footer on admin routes
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <CartProvider>
      <div>
        <TrackPageView />
        {!isAdminRoute && <Header />}
        <Outlet />
        {!isAdminRoute && <Footer />}
      </div>
      {children}
    </CartProvider>
  );
}

export default Layout;
