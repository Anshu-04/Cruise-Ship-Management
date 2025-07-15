// src/components/common/Loading.jsx
import { Loader2 } from 'lucide-react';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-pink-600`} />
      <span className="text-gray-600">{text}</span>
    </div>
  );
};

export default Loading;