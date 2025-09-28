import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorageState([], "cart");

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    toast.success("Product added to cart");
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
