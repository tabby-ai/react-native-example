const mockPaymentText = `
payment: {
  amount: '340.00',
  currency: 'AED',
  buyer: {
    email: 'successful.payment@tabby.ai',
    phone: '+971500000001'
  },
}
`;

// https://docs.tabby.ai/#operation/postCheckoutSession
const mockPayment = {
  payment: {
    amount: '340.00',
    currency: 'AED',
    buyer: {
      email: 'successful.payment@tabby.ai',
      phone: '+971500000001',
    },
  },
};

export {mockPayment, mockPaymentText};
