import { Product } from '@/types';
import { cartAPI } from '@/lib/api';

export interface CartItem {
  productId: string;
  product?: Product;
  quantity: number;
  options?: {
    size?: string;
    color?: string;
  };
  priceAtAdd?: number;
}

export interface GuestCart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  lastUpdated: string;
}

class CartService {
  private static GUEST_CART_KEY = 'guest_cart';
  private static CART_EXPIRY_DAYS = 7;

  // Guest Cart Methods (localStorage)
  static getGuestCart(): GuestCart {
    try {
      const cartData = localStorage.getItem(this.GUEST_CART_KEY);
      if (!cartData) {
        return this.createEmptyCart();
      }

      const cart: GuestCart = JSON.parse(cartData);
      
      // Check if cart has expired
      const lastUpdated = new Date(cart.lastUpdated);
      const now = new Date();
      const daysDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 3600 * 24);
      
      if (daysDiff > this.CART_EXPIRY_DAYS) {
        this.clearGuestCart();
        return this.createEmptyCart();
      }

      return cart;
    } catch (error) {
      console.error('Error reading guest cart:', error);
      return this.createEmptyCart();
    }
  }

  static saveGuestCart(cart: GuestCart): void {
    try {
      cart.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.GUEST_CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  }

  static addToGuestCart(product: Product, quantity: number = 1, options: any = {}): GuestCart {
    const cart = this.getGuestCart();
    
    // Check stock
    if (product.stock < quantity) {
      throw new Error(`Only ${product.stock} items available in stock`);
    }

    // Find existing item with same product and options
    const existingItemIndex = cart.items.findIndex(item => 
      item.productId === product._id && 
      JSON.stringify(item.options) === JSON.stringify(options)
    );

    const currentPrice = product.finalPrice || product.basePrice;

    if (existingItemIndex > -1) {
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      if (newQuantity > product.stock) {
        throw new Error(`Cannot add more than ${product.stock} items`);
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].priceAtAdd = currentPrice;
    } else {
      cart.items.push({
        productId: product._id,
        product,
        quantity,
        options,
        priceAtAdd: currentPrice
      });
    }

    // Recalculate totals
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => 
      total + ((item.priceAtAdd || 0) * item.quantity), 0
    );

    this.saveGuestCart(cart);
    return cart;
  }

  static updateGuestCartItem(productId: string, quantity: number, options: any = {}): GuestCart {
    const cart = this.getGuestCart();
    
    const itemIndex = cart.items.findIndex(item => 
      item.productId === productId && 
      JSON.stringify(item.options) === JSON.stringify(options)
    );

    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // Check stock if product data is available
      const item = cart.items[itemIndex];
      if (item.product && quantity > item.product.stock) {
        throw new Error(`Only ${item.product.stock} items available`);
      }
      
      cart.items[itemIndex].quantity = quantity;
    }

    // Recalculate totals
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => 
      total + ((item.priceAtAdd || 0) * item.quantity), 0
    );

    this.saveGuestCart(cart);
    return cart;
  }

  static removeFromGuestCart(productId: string, options: any = {}): GuestCart {
    const cart = this.getGuestCart();
    
    cart.items = cart.items.filter(item => 
      !(item.productId === productId && 
        JSON.stringify(item.options) === JSON.stringify(options))
    );

    // Recalculate totals
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => 
      total + ((item.priceAtAdd || 0) * item.quantity), 0
    );

    this.saveGuestCart(cart);
    return cart;
  }

  static clearGuestCart(): void {
    localStorage.removeItem(this.GUEST_CART_KEY);
  }

  static hasGuestCart(): boolean {
    const cart = this.getGuestCart();
    return cart.items.length > 0;
  }

  // Authenticated User Cart Methods (API)
  static async getUserCart(): Promise<any> {
    const response = await cartAPI.getCart();
    return response.data;
  }

  static async addToUserCart(
    productId: string, 
    quantity: number = 1, 
    options: any = {}
  ): Promise<any> {
    const response = await cartAPI.addToCart(productId, quantity, options);
    return response.data;
  }

  static async updateUserCartItem(
    productId: string, 
    quantity: number, 
    options: any = {}
  ): Promise<any> {
    const response = await cartAPI.updateCartItem(productId, quantity, options);
    return response.data;
  }

  static async removeFromUserCart(
    productId: string, 
    options: any = {}
  ): Promise<any> {
    const response = await cartAPI.removeFromCart(productId, options);
    return response.data;
  }

  static async mergeGuestCartWithUser(): Promise<any> {
    const guestCart = this.getGuestCart();
    
    if (guestCart.items.length === 0) {
      return null; // Nothing to merge
    }

    const guestCartItems = guestCart.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      options: item.options
    }));

    const response = await cartAPI.mergeCart(guestCartItems);
    
    // Clear guest cart after successful merge
    this.clearGuestCart();
    
    return response.data;
  }

  static async validateUserCart(): Promise<any> {
    const response = await cartAPI.validateCart();
    return response.data;
  }

  static async proceedToCheckout(): Promise<any> {
    const response = await cartAPI.proceedToCheckout();
    return response.data;
  }

  private static createEmptyCart(): GuestCart {
    return {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

export default CartService;