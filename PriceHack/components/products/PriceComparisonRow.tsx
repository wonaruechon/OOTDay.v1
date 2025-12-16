import React from 'react';
import { ProductComparison, Retailer } from '@/lib/types/price-comparison';
import { PriceCell } from './PriceCell';
import { StatusBadge } from './StatusBadge';

interface PriceComparisonRowProps {
  product: ProductComparison;
  rowNumber: number;
  onRowClick?: (product: ProductComparison) => void;
}

export const PriceComparisonRow: React.FC<PriceComparisonRowProps> = ({
  product,
  rowNumber,
  onRowClick,
}) => {
  const handleClick = () => {
    if (onRowClick) {
      onRowClick(product);
    }
  };

  return (
    <tr
      className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <td className="px-4 py-3 text-sm text-gray-700 text-center">{rowNumber}</td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {product.categoryTh || product.category}
      </td>
      <td className="px-4 py-3 text-sm font-mono text-gray-700">{product.sku}</td>
      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate" title={product.name}>
        {product.nameTh || product.name}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{product.brand}</td>
      <td className="px-4 py-3 text-sm">
        <PriceCell
          price={product.prices[Retailer.THAI_WATSADU].price}
          productUrl={product.prices[Retailer.THAI_WATSADU].productUrl}
          isLowest={product.lowestPrice === product.prices[Retailer.THAI_WATSADU].price}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <PriceCell
          price={product.prices[Retailer.HOMEPRO].price}
          productUrl={product.prices[Retailer.HOMEPRO].productUrl}
          isLowest={product.lowestPrice === product.prices[Retailer.HOMEPRO].price}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <PriceCell
          price={product.prices[Retailer.GLOBAL_HOUSE].price}
          productUrl={product.prices[Retailer.GLOBAL_HOUSE].productUrl}
          isLowest={product.lowestPrice === product.prices[Retailer.GLOBAL_HOUSE].price}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <PriceCell
          price={product.prices[Retailer.DOHOME].price}
          productUrl={product.prices[Retailer.DOHOME].productUrl}
          isLowest={product.lowestPrice === product.prices[Retailer.DOHOME].price}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <PriceCell
          price={product.prices[Retailer.BOONTHAVORN].price}
          productUrl={product.prices[Retailer.BOONTHAVORN].productUrl}
          isLowest={product.lowestPrice === product.prices[Retailer.BOONTHAVORN].price}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <StatusBadge status={product.status} />
      </td>
    </tr>
  );
};
