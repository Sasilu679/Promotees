import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid3x3, LayoutGrid } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { supabase, Category, Product } from '../lib/supabase';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'featured'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  useEffect(() => {
    if (slug) {
      loadCategoryAndProducts();
    }
  }, [slug]);

  const loadCategoryAndProducts = async () => {
    try {
      setLoading(true);

      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (categoryError) throw categoryError;

      if (!categoryData) {
        console.error('Category not found');
        setLoading(false);
        return;
      }

      setCategory(categoryData);

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryData.id);

      if (productsError) throw productsError;

      setProducts(productsData || []);
    } catch (error) {
      console.error('Error loading category and products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'featured':
        return b.is_featured ? 1 : -1;
      default:
        return 0;
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-100 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Categories</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-blue-100 max-w-3xl">{category.description}</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
            </h2>
            <p className="text-gray-600">Browse our selection below</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 border-2 border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded ${gridCols === 3 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 rounded ${gridCols === 4 ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="text-gray-400 mb-4">
              <Grid3x3 className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Yet</h3>
            <p className="text-gray-600 mb-6">
              This category is currently being stocked. Check back soon!
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <span>Browse Other Categories</span>
            </Link>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
