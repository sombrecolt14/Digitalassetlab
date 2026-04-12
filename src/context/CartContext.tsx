import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface CartContextType {
  cartCount: number;
  addToCart: () => void;
  clearCart: () => void;
  removeFromCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
  clearCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("cartCount");
    if (stored) setCartCount(parseInt(stored, 10));
  }, []);

  const addToCart = () => {
    setCartCount(1);
    localStorage.setItem("cartCount", "1");
  };

  const clearCart = () => {
    setCartCount(0);
    localStorage.removeItem("cartCount");
  };

  const removeFromCart = () => {
    setCartCount(0);
    localStorage.removeItem("cartCount");
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
