interface BreadcrumbProps {
  productName: string;
}

export default function Breadcrumb({ productName }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <span className="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
      <span>/</span>
      <span className="hover:text-blue-600 cursor-pointer transition-colors">Products</span>
      <span>/</span>
      <span className="text-gray-900 font-medium">{productName}</span>
    </nav>
  );
}