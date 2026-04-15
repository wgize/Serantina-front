export interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
  image: string;
}

export interface CartItem extends MenuItem {
  id: string;
  quantity: number;
  size?: string;
  customizations?: string[];
}

export type Category = "cafes" | "bebidas" | "pasteles" | "salados";
