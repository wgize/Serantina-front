import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import type { CartItem } from "@/types/cart";
import type React from "react";

interface CartContextType {
  state: {
    items: CartItem[];
    isOpen: boolean;
  };
  dispatch: React.Dispatch<any>;
}

export const useCart = () => {
  const context = useContext(CartContext) as CartContextType | null;
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
