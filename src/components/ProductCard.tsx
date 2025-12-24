import { ShoppingCart } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {product.is_featured && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-orange-600">
              ${product.price.toFixed(2)}
            </span>
            {product.sku && (
              <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
            )}
          </div>

          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>

        {product.stock > 0 && product.stock <= 10 && (
          <p className="text-xs text-orange-500 mt-2 font-medium">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}
