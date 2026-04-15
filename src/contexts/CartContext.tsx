import React, { createContext, useReducer, useEffect } from "react";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "id"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_ITEM"; payload: { id: string; updates: Partial<CartItem> } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = { ...action.payload, id: Date.now().toString() };
      return { ...state, items: [...state.items, newItem] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item,
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export { CartContext };

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("laserantina-cart");
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        items.forEach((item: CartItem) =>
          dispatch({ type: "ADD_ITEM", payload: item }),
        );
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("laserantina-cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
