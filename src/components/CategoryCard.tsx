import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface CategoryCardProps {
  slug: string;
  name: string;
  description: string;
  iconName: string;
}

export default function CategoryCard({ slug, name, description, iconName }: CategoryCardProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const IconComponent = (Icons[iconName as keyof typeof Icons] || Icons.Package) as LucideIcon;

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/category/${slug}`);
    }, 300);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-orange-400"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

      <div className="relative p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {isLoading ? (
              <Icons.Loader2 className="w-7 h-7 text-white animate-spin" />
            ) : (
              <IconComponent className="w-7 h-7 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-gray-500">Browse Collection</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-4 flex items-center text-orange-500 group-hover:text-orange-600 font-medium text-sm">
          <span>View Products</span>
          <Icons.ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
