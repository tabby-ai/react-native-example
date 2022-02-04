import {Payment} from 'tabby-react-native-sdk';

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

export interface TabbyCheckoutPayload {
  merchant_code: string; // 'ae',
  lang: string; // 'en' | 'ar,
  payment: Payment;
}

// https://docs.tabby.ai/#operation/postCheckoutSession
const mockPayment: {payment: Payment} = {
  payment: {
    amount: '340.00',
    currency: 'AED',
    buyer: {
      email: 'successful.payment@tabby.ai',
      phone: '+971500000001',
      name: 'Yazan Khalid',
      dob: '2019-08-24',
    },
    buyer_history: {
      registered_since: '2019-08-24T14:15:22Z',
      loyalty_level: 0,
      wishlist_count: 0,
      is_social_networks_connected: true,
      is_phone_number_verified: true,
      is_email_verified: true,
    },
    order: {
      tax_amount: '0.00',
      shipping_amount: '0.00',
      discount_amount: '0.00',
      reference_id: '#x-abc123',
      items: [
        {
          title: 'Jersey',
          description: 'Jersey',
          quantity: 1,
          unit_price: '10.00',
          reference_id: 'uuid',
          product_url: 'http://example.com',
          category: 'clothes',
        },
      ],
    },
    order_history: [
      {
        purchased_at: '2019-08-24T14:15:22Z',
        amount: '0.00',
        payment_method: 'card',
        status: 'new',
        buyer: {
          email: 'successful.payment@tabby.ai',
          phone: '+971500000001',
          name: 'Yazan Khalid',
          dob: '2019-08-24',
        },
        shipping_address: {
          city: 'string',
          address: 'string',
          zip: 'string',
        },
        items: [
          {
            title: 'string',
            description: 'string',
            quantity: 1,
            unit_price: '0.00',
            reference_id: 'string',
            product_url: 'http://example.com',
            category: 'string',
          },
        ],
      },
    ],
  },
};

export {mockPayment, mockPaymentText};
