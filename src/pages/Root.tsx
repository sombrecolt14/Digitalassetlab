import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "../context/CartContext";

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}
