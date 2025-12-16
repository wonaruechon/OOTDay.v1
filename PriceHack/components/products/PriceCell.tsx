import React from 'react';
import { ExternalLink } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/price-utils';

interface PriceCellProps {
  price: number | null;
  originalPrice?: number;
  productUrl: string | null;
  isLowest?: boolean;
  isHighest?: boolean;
}

export const PriceCell: React.FC<PriceCellProps> = ({
  price,
  originalPrice,
  productUrl,
  isLowest,
  isHighest,
}) => {
  const priceText = formatCurrency(price);

  if (price === null) {
    return <span className="text-gray-400">-</span>;
  }

  const colorClass = isLowest
    ? 'text-green-600 font-semibold'
    : isHighest
    ? 'text-red-600 font-semibold'
    : 'text-gray-900';

  if (productUrl) {
    return (
      <a
        href={productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 hover:underline ${colorClass}`}
      >
        {priceText}
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  return <span className={colorClass}>{priceText}</span>;
};
