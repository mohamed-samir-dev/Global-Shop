import Link from "next/link";

export default function PageHeader() {
  return (
    <div className="bg-[#EBEBE9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Shop</span>
        </nav>
      </div>
    </div>
  );
}
