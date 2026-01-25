export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  priceAtPurchase: number;
  options?: Record<string, string>;
  product?: {
    mainImage?: string;
  };
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  status: string;
  isPaid: boolean;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
  subtotal: number;
  taxPrice: number;
  shippingPrice: number;
  discountAmount: number;
  totalPrice: number;
}
