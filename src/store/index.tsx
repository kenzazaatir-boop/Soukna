/**
 * Global Store Providers and Hooks
 * Centralizes all context providers and custom hooks
 */

import React from 'react';
import { CartProvider, useCart } from './CartContext';
import { WishlistProvider, useWishlist } from './WishlistContext';
import { FilterProvider, useFilter } from './FilterContext';
import { AuthProvider, useAuth } from './AuthContext';

// ===== COMBINED PROVIDER =====
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <FilterProvider>
            {children}
          </FilterProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// ===== EXPORT ALL HOOKS =====
export { useCart, useWishlist, useFilter, useAuth };

// ===== EXPORT TYPES =====
export * from '@/types';
