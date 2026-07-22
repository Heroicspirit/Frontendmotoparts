"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartItem as apiUpdateCartItem, clearCart as apiClearCart } from '@/lib/api/cart';

interface CartItem {
  product: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  _id?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cart';

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const prevAuthRef = useRef(false);

  useEffect(() => {
    const localCart = loadCartFromStorage();
    setCartItems(localCart);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized || authLoading) return;

    const wasAuthenticated = prevAuthRef.current;
    prevAuthRef.current = isAuthenticated;

    if (isAuthenticated && !wasAuthenticated) {
      fetchBackendCart();
    } else if (!isAuthenticated && wasAuthenticated) {
      setCartItems([]);
      saveCartToStorage([]);
    }
  }, [isAuthenticated, initialized, authLoading]);

  useEffect(() => {
    if (initialized) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, initialized]);

  const fetchBackendCart = useCallback(async () => {
    try {
      const result = await getCart();
      if (result.success && result.data?.items) {
        const backendUrl = 'http://localhost:5001';
        const backendItems = result.data.items.map((item: any) => {
          const rawImage = item.product?.image || item.image || '';
          return {
            product: item.product?._id || item.product,
            title: item.product?.title || item.title,
            image: rawImage.startsWith('http') ? rawImage : `${backendUrl}${rawImage}`,
            price: item.product?.price || item.price,
            quantity: item.quantity,
            _id: item._id,
          };
        });
        setCartItems(backendItems);
      }
    } catch {
    }
  }, []);

  const addToCart = useCallback(async (item: CartItem) => {
    if (isAuthenticated) {
      try {
        await apiAddToCart({
          product: item.product,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        });
      } catch {
      }
    }

    setCartItems(prev => {
      const existingItem = prev.find(i => i.product === item.product);
      if (existingItem) {
        return prev.map(i =>
          i.product === item.product
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, [isAuthenticated]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (isAuthenticated) {
      try {
        await apiRemoveFromCart(productId);
      } catch {
      }
    }

    setCartItems(prev => prev.filter(item => item.product !== productId));
  }, [isAuthenticated]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      try {
        await apiUpdateCartItem(productId, quantity);
      } catch {
      }
    }

    setCartItems(prev =>
      prev.map(item =>
        item.product === productId ? { ...item, quantity } : item
      )
    );
  }, [isAuthenticated, removeFromCart]);

  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await apiClearCart();
      } catch {
      }
    }

    setCartItems([]);
  }, [isAuthenticated]);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
