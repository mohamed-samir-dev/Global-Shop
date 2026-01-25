export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export type PaymentMethodType = 'cod' | 'stripe' | 'wallet';
