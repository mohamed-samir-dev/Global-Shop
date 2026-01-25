import api from '@/lib/api';

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface CheckoutValidation {
  success: boolean;
  isValid: boolean;
  errors: Array<{
    type: string;
    message: string;
    productId?: string;
    productName?: string;
  }>;
  validItems: Array<{
    product: string;
    name: string;
    quantity: number;
    priceAtPurchase: number;
    options: any;
    itemTotal: number;
  }>;
  pricing: {
    subtotal: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  };
  itemCount: number;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  order: {
    _id: string;
    orderNumber: string;
    totalPrice: number;
    status: string;
  };
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
  transaction_id: string;
}

class CheckoutService {
  // Validate checkout prerequisites
  async validateCheckout(): Promise<CheckoutValidation> {
    try {
      const response = await api.post('/checkout/validate');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to validate checkout');
    }
  }

  // Create order from cart
  async createOrder(
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    notes?: string
  ): Promise<OrderResponse> {
    try {
      const response = await api.post('/checkout/create-order', {
        shippingAddress,
        paymentMethod,
        notes
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }

  // Process payment for order
  async processPayment(orderId: string, paymentResult: PaymentResult) {
    try {
      const response = await api.post(`/checkout/process-payment/${orderId}`, {
        paymentResult
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process payment');
    }
  }

  // Get order details
  async getOrder(orderId: string) {
    try {
      const response = await api.get(`/checkout/order/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get order');
    }
  }

  // Get user orders with pagination
  async getUserOrders(page: number = 1, limit: number = 10) {
    try {
      const response = await api.get(`/checkout/orders?page=${page}&limit=${limit}`);
      return {
        orders: response.data.orders,
        totalPages: response.data.pagination?.pages || 1,
        currentPage: response.data.pagination?.page || 1,
        total: response.data.pagination?.total || 0
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get orders');
    }
  }

  // Proceed to checkout validation (from cart)
  async proceedToCheckout() {
    try {
      const response = await api.post('/cart/checkout');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to proceed to checkout');
    }
  }
}

export default new CheckoutService();