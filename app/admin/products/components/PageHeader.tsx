import Link from 'next/link';

export const PageHeader = () => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold">Manage Products</h1>
    <Link
      href="/admin/products/new"
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
    >
      Add New Product
    </Link>
  </div>
);
