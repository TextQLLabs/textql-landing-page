import { storeTrafficInsight } from './store-traffic';
import { inventoryTurnoverInsight } from './inventory-turnover';
import { customerLoyaltyInsight } from './customer-loyalty';
import { digitalChannelInsight } from './digital-channel';
import { supplyChainInsight } from './supply-chain';

export const retailInsights = [
  storeTrafficInsight,
  inventoryTurnoverInsight,
  customerLoyaltyInsight,
  digitalChannelInsight,
  supplyChainInsight
];