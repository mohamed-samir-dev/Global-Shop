import { Product } from '@/types';
import { wishlistAPI } from '@/lib/api';

export interface WishlistItem {
  productId: string;
  product?: Product;
  addedAt: string;
}

export interface GuestWishlist {
  items: WishlistItem[];
  totalItems: number;
  lastUpdated: string;
}

export interface UserWishlist {
  items: Array<{ productId: Product; addedAt: string }>;
  totalItems: number;
}

export interface WishlistResponse {
  data: UserWishlist;
}

class WishlistService {
  private static GUEST_WISHLIST_KEY = 'guest_wishlist';
  private static WISHLIST_EXPIRY_DAYS = 30;

  static getGuestWishlist(): GuestWishlist {
    if (typeof window === 'undefined') {
      return this.createEmptyWishlist();
    }
    try {
      const wishlistData = localStorage.getItem(this.GUEST_WISHLIST_KEY);
      if (!wishlistData) {
        return this.createEmptyWishlist();
      }

      const wishlist: GuestWishlist = JSON.parse(wishlistData);
      
      const lastUpdated = new Date(wishlist.lastUpdated);
      const now = new Date();
      const daysDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 3600 * 24);
      
      if (daysDiff > this.WISHLIST_EXPIRY_DAYS) {
        this.clearGuestWishlist();
        return this.createEmptyWishlist();
      }

      return wishlist;
    } catch (error) {
      console.error('Error reading guest wishlist:', error);
      return this.createEmptyWishlist();
    }
  }

  static saveGuestWishlist(wishlist: GuestWishlist): void {
    if (typeof window === 'undefined') return;
    try {
      wishlist.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving guest wishlist:', error);
    }
  }

  static addToGuestWishlist(product: Product): GuestWishlist {
    const wishlist = this.getGuestWishlist();
    
    const existingItem = wishlist.items.find(item => 
      item.productId === product._id
    );

    if (existingItem) {
      throw new Error('Product already in wishlist');
    }

    wishlist.items.push({
      productId: product._id,
      product,
      addedAt: new Date().toISOString()
    });

    wishlist.totalItems = wishlist.items.length;
    this.saveGuestWishlist(wishlist);
    return wishlist;
  }

  static removeFromGuestWishlist(productId: string): GuestWishlist {
    const wishlist = this.getGuestWishlist();
    
    wishlist.items = wishlist.items.filter(item => item.productId !== productId);
    wishlist.totalItems = wishlist.items.length;

    this.saveGuestWishlist(wishlist);
    return wishlist;
  }

  static clearGuestWishlist(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.GUEST_WISHLIST_KEY);
  }

  static hasGuestWishlist(): boolean {
    const wishlist = this.getGuestWishlist();
    return wishlist.items.length > 0;
  }

  static isInGuestWishlist(productId: string): boolean {
    const wishlist = this.getGuestWishlist();
    return wishlist.items.some(item => item.productId === productId);
  }

  static async getUserWishlist(): Promise<UserWishlist> {
    const response = await wishlistAPI.getWishlist();
    return response.data;
  }

  static async addToUserWishlist(productId: string): Promise<UserWishlist> {
    const response = await wishlistAPI.addToWishlist(productId);
    return response.data;
  }

  static async removeFromUserWishlist(productId: string): Promise<UserWishlist> {
    const response = await wishlistAPI.removeFromWishlist(productId);
    return response.data;
  }

  static async mergeGuestWishlistWithUser(): Promise<UserWishlist | null> {
    const guestWishlist = this.getGuestWishlist();
    
    if (guestWishlist.items.length === 0) {
      return null;
    }

    const guestWishlistItems = guestWishlist.items.map(item => ({
      productId: item.productId
    }));

    const response = await wishlistAPI.mergeWishlist(guestWishlistItems);
    this.clearGuestWishlist();
    
    return response.data;
  }

  static async checkInUserWishlist(productId: string): Promise<boolean> {
    try {
      const response = await wishlistAPI.checkInWishlist(productId);
      return response.data.inWishlist;
    } catch {
      return false;
    }
  }

  private static createEmptyWishlist(): GuestWishlist {
    return {
      items: [],
      totalItems: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

export default WishlistService;
