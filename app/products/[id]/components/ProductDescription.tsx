import { Product } from '@/types';
import { useTranslation } from '@/i18n/hooks/useTranslation';

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  const { t, isArabic } = useTranslation();
  const description = isArabic && product.descriptionAr ? product.descriptionAr : product.description;
  const shortDescription = isArabic && product.shortDescriptionAr ? product.shortDescriptionAr : product.shortDescription;

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('product.details.description')}</h3>
      <div className="prose prose-gray prose-sm sm:prose-base max-w-none">
        {shortDescription && shortDescription !== description && (
          <div className="mb-4 sm:mb-5">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">{shortDescription}</p>
          </div>
        )}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}