import {TabbyPurchaseType} from '../constants';
import {tabbyApiKey, tabbyCheckoutHost} from '../constants/api';

const buildUrl = ({
  sessionId,
  product,
  merchantCode,
}: {
  sessionId: string;
  product: TabbyPurchaseType;
  merchantCode?: string; // OPTIONAL, USED WHEN A MERCHANT HAS MORE THAN ONE STORE, PLEASE CONTACT YOUR INTEGRATION MANAGER
}): string => {
  const merchantCodeQuery = merchantCode ? `&merchantCode=${merchantCode}` : '';
  return `${tabbyCheckoutHost}?apiKey=${tabbyApiKey}&sessionId=${sessionId}&product=${product}${merchantCodeQuery}`;
};

export {buildUrl};
