export interface SizeOption {
  label: string;
  price: string;
}

export interface MenuItem {
  name: string;
  desc: string;
  /** Precio base. Si el producto tiene `sizes`, este es el precio de referencia en la tarjeta. */
  price: string;
  tag?: string;
  image: string;
  /** Solo para productos con variantes de tamaño (tortas enteras). */
  sizes?: SizeOption[];
  /** Opciones de personalización relevantes para este producto. */
  customizationOptions?: string[];
}

export interface CartItem extends MenuItem {
  id: string;
  quantity: number;
  size?: string;
  customizations?: string[];
}

export type Category =
  | "cafes"
  | "bebidas"
  | "porciones"
  | "hojaldres"
  | "salados"
  | "tortas";