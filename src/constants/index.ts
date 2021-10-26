import {ROUTES} from './routes';
import {StyleGuide} from './StyleGuide';
import {mockPayment, mockPaymentText} from './payment';

export {ROUTES, StyleGuide, mockPayment, mockPaymentText};

export const noop = () => {};

export type TabbyPurchaseType = 'pay_later' | 'installments';
