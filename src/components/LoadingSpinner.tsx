import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="text-center">
        <Loader2 className="w-16 h-16 animate-spin text-orange-500 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-700">Loading products...</p>
        <p className="text-gray-500 mt-2">Please wait while we fetch your items</p>
      </div>
    </div>
  );
}
