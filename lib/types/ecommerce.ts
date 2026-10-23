export interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  comparePrice?: number | null;
  sku?: string;
  available: boolean;
  inventoryQuantity?: number;
}

export interface Category {
  id?: string;
  name: string;
  handle: string;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  bodyHtml?: string;
  vendor: string;
  category: Category;
  isFeatured: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  minPrice: number;
  maxPrice: number;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  id: string; // unique item line id
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  comparePrice?: number | null;
  image: string;
  quantity: number;
  handle: string;
}

export interface DiscountCode {
  code: string;
  percentOff?: number;
  amountOff?: number;
  valid: boolean;
  description: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderCalculation {
  subtotal: number;
  discountTotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: CartItem[];
  discount?: DiscountCode | null;
}
