// src/types/product.ts

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  images: SanityImage[];
  price: number;
  description?: string;
  category: string;
  material?: string;
  inStock: boolean;
  featured?: boolean;
  sizes?: string[];
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  shippingCost: number;
  orderDate: string;
}
