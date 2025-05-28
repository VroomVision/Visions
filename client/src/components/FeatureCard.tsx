import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="bg-brand-gray p-6 rounded-lg">
      <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-purple-500 text-xl" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
