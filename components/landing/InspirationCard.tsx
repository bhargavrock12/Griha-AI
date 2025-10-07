import React from 'react';
import { Inspiration } from '../../types';

interface InspirationCardProps {
  inspiration: Inspiration;
  onSelect: () => void;
}

const InspirationCard: React.FC<InspirationCardProps> = ({ inspiration, onSelect }) => {
  return (
    <div 
      className="relative rounded-lg shadow-sm overflow-hidden group cursor-pointer aspect-[3/4] border border-border-main"
      onClick={onSelect}
      onKeyPress={(e) => e.key === 'Enter' && onSelect()}
      tabIndex={0}
      aria-label={`View the ${inspiration.title} design`}
    >
      <img 
        src={inspiration.imageUrl} 
        alt={inspiration.title} 
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        <h3 className="text-white font-serif text-2xl drop-shadow-md">{inspiration.title}</h3>
      </div>
    </div>
  );
};

export default InspirationCard;