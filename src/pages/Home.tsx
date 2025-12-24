import { useEffect, useState } from 'react';
import { Truck, Clock, Award, Search } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { supabase, Category } from '../lib/supabase';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Wholesale Promotional Apparel
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Premium quality t-shirts and promotional products for resellers. Fast delivery and unbeatable wholesale prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <Truck className="w-8 h-8 text-orange-400" />
              <div className="text-left">
                <p className="font-semibold">Fast Delivery</p>
                <p className="text-sm text-blue-100">5 days standard</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <Clock className="w-8 h-8 text-orange-400" />
              <div className="text-left">
                <p className="font-semibold">Rush Service</p>
                <p className="text-sm text-blue-100">1 day urgent</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <Award className="w-8 h-8 text-orange-400" />
              <div className="text-left">
                <p className="font-semibold">Quality First</p>
                <p className="text-sm text-blue-100">Premium garments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse Our Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our extensive collection of wholesale promotional products
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No categories found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                slug={category.slug}
                name={category.name}
                description={category.description || ''}
                iconName={category.icon_name}
              />
            ))}
          </div>
        )}
      </section>

      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Contact our team for bulk pricing and custom quotes
          </p>
          <button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">
            Get a Quote
          </button>
        </div>
      </section>
    </div>
  );
}
