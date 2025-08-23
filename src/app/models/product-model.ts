export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CartItem extends Product {
  quantity?: number;
  cartId?: number; // For json-server cart item identification
}