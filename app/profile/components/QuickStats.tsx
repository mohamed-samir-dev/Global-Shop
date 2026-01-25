import { Package, Heart } from "lucide-react";

interface QuickStatsProps {
  stats: { orders: number; wishlist: number };
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">Orders</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">{stats.orders}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
            <span className="text-2xl font-bold text-red-600">{stats.wishlist}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-3">Need Help?</h3>
        <p className="text-sm text-blue-100 mb-4">Our support team is here to assist you with any questions.</p>
        <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};
