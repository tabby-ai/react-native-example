const mockPaymentText = `
payment: {
  amount: '340.00',
  currency: 'AED',
  buyer: {
    email: 'successful.payment@tabby.ai',
    phone: '500000001'
    name: 'Yazan Khalid',
  },
}
`;

interface Payment {
  amount: string;
  currency: string;
  buyer: {
    email: string;
    phone: string;
    name?: string;
  };
}

export interface TabbyCheckoutPayload {
  merchant_code: string; // 'ae',
  lang: string; // 'en' | 'ar,
  payment: Payment;
}

export interface CheckoutSession {
  id: string;
  configuration: {
    available_products: {
      installments?: unknown;
      pay_later?: unknown;
    };
  };
}

// https://docs.tabby.ai/#operation/postCheckoutSession
const mockPayment: {payment: Payment} = {
  payment: {
    amount: '340.00',
    currency: 'AED',
    buyer: {
      email: 'successful.payment@tabby.ai',
      phone: '500000001',
      name: 'Yazan Khalid',
    },
  },
};

export {mockPayment, mockPaymentText};
