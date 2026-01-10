import { Truck, Shield, RotateCcw } from 'lucide-react';

export default function ProductFeatures() {
  const features = [
    {
      icon: Truck,
      text: 'Free shipping over $50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Shield,
      text: '2 year warranty',
      iconColor: 'text-green-600',
    },
    {
      icon: RotateCcw,
      text: '30-day returns',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
            <IconComponent className={`w-5 h-5 ${feature.iconColor}`} />
            <span>{feature.text}</span>
          </div>
        );
      })}
    </div>
  );
}