'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const finalPrice = product.finalPrice || product.price || product.basePrice;
  const hasDiscount = product.discount && product.discount.value > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.imageGallery && product.imageGallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedImage(product.mainImage)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === product.mainImage ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img src={product.mainImage} alt="" className="w-full h-full object-cover" />
              </button>
              {product.imageGallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === img ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            {product.brand && (
              <p className="text-lg text-gray-600 mt-1">by {product.brand}</p>
            )}
            {product.shortDescription && (
              <p className="text-gray-600 mt-2">{product.shortDescription}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(product.averageRating)}</div>
            <span className="text-sm text-gray-600">
              ({product.totalReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                {product.currency} {finalPrice?.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  {product.currency} {product.basePrice.toFixed(2)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                Save {product.discount?.type === 'percentage' ? `${product.discount.value}%` : `${product.currency} ${product.discount?.value}`}
              </span>
            )}
          </div>

          {/* Variants */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-1 border border-gray-300 rounded-md">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.availability === 'in_stock' ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm ${product.availability === 'in_stock' ? 'text-green-600' : 'text-red-600'}`}>
              {product.availability === 'in_stock' ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              disabled={product.availability === 'out_of_stock'}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-4">
            {product.sku && (
              <div className="flex justify-between">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
            )}
            {product.material && (
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">{product.material}</span>
              </div>
            )}
            {product.weight && (
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{product.weight}</span>
              </div>
            )}
            {product.warranty && (
              <div className="flex justify-between">
                <span className="text-gray-600">Warranty:</span>
                <span className="font-medium">{product.warranty}</span>
              </div>
            )}
            {product.returnPolicy && (
              <div className="flex justify-between">
                <span className="text-gray-600">Return Policy:</span>
                <span className="font-medium">{product.returnPolicy}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* Product Video */}
      {product.video && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Video</h2>
          <div className="aspect-video">
            <video
              src={product.video}
              controls
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="border-b pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{review.user.name}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-gray-600">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}