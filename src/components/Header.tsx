import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <ShoppingBag className="w-10 h-10 text-orange-400 group-hover:text-orange-300 transition-colors" />
            <div>
              <h1 className="text-2xl font-bold">Promotees Group</h1>
              <p className="text-xs text-blue-200">From Sellers To Sellers</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">1-800-PROMOTEES</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">sales@promoteesgroup.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
