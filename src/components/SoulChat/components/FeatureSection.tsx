import React, { ReactNode } from 'react';

interface FeatureSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureSection({ icon, title, description }: FeatureSectionProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-healing-mint/20 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
}