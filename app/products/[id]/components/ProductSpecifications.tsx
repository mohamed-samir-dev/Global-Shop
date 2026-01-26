import { Product } from '@/src/types';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

interface ProductSpecificationsProps {
  product: Product;
}

export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  
  const brand = isArabic && product.brandAr ? product.brandAr : product.brand;
  const category = isArabic && product.categoryAr ? product.categoryAr : product.category;
  const specs = isArabic && product.specificationsAr ? product.specificationsAr : product.specifications;

  const specifications = [
    { label: t('product.details.brand'), value: brand },
    { label: t('product.details.category'), value: category },
    { label: t('product.details.sku'), value: product.sku },
    { label: t('product.details.weight'), value: product.weight },
    { label: t('product.details.material'), value: product.material },
    { label: t('product.details.warranty'), value: product.warranty },
    { label: t('product.details.returnPolicy'), value: product.returnPolicy },
    ...(product.dimensions ? [
      { label: t('product.details.dimensions'), value: `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height}` }
    ] : []),
    ...(specs ? Object.entries(specs).map(([key, value]) => ({
      label: key,
      value: value
    })) : [])
  ].filter(spec => spec.value);

  if (specifications.length === 0) {
    return (
      <div className={`rounded-lg p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('product.details.specifications')}</h3>
        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('product.details.noSpecifications')}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('product.details.specifications')}</h3>
      <div className="space-y-2 sm:space-y-3">
        {specifications.map((spec, index) => (
          <div key={index} className={`flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-2 last:border-b-0 gap-1 sm:gap-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <span className={`font-medium capitalize text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{spec.label}:</span>
            <span className={`text-sm sm:text-base sm:text-right sm:max-w-xs rap-break-word ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}