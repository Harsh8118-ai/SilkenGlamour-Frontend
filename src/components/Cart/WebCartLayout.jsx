import React, { useState } from 'react';
import WebCart from './WebCart';
import { CartProvider } from './CartContext';

export default function WebCartLayout({ closeCart }) { // Accept closeCart as a prop
  return (
    <CartProvider>
      <WebCart closeCart={closeCart} /> {/* Pass the closeCart function */}
    </CartProvider>
  );
}
