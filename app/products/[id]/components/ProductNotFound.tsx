export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">😞</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
        <p className="text-gray-600 mb-8">
          The product you&rsquo;re looking for doesn&rsquo;t exist or has been removed.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}