import { type MetricType } from '../insights/types';

export const formatValue = (value: number, type: MetricType): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  switch (type) {
    case 'percentage':
      return `${formatter.format(value)}%`;
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    case 'count':
      return formatter.format(value);
    case 'time':
      return `${formatter.format(value)}s`;
    case 'ratio':
      return formatter.format(value);
    default:
      return formatter.format(value);
  }
};