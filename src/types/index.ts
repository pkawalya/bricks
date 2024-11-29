export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy?: string;
  joinedAt: Date;
  status: 'active' | 'pending' | 'suspended';
  earnings: number;
  downlineCount: number;
}

export interface ReferralTree {
  user: User;
  downline: ReferralTree[];
}

export interface PaymentDetails {
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  transactionId: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}