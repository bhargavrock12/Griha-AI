import React from 'react';
import { ARStyle } from '../../types';
import { AR_STYLES } from '../../config/config';
import NavigationButtons from '../common/NavigationButtons';

interface ARStyleSelectionPageProps {
  onStyleSelect: (style: ARStyle) => void;
  onBack: () => void;
}

const StyleCard: React.FC<{ style: ARStyle; onSelect: () => void; }> = ({ style, onSelect }) => (
    <div 
        className="relative rounded-lg shadow-sm overflow-hidden group cursor-pointer aspect-[3/4] border border-border-main"
        onClick={onSelect}
        onKeyPress={(e) => e.key === 'Enter' && onSelect()}
        tabIndex={0}
        aria-label={`Select ${style.name} style for AR`}
    >
        <img 
            src={style.imageUrl} 
            alt={style.name} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
            <h3 className="text-white font-serif text-2xl drop-shadow-md">{style.name}</h3>
        </div>
    </div>
);

const ARStyleSelectionPage: React.FC<ARStyleSelectionPageProps> = ({ onStyleSelect, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto my-12 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-serif text-text-main">Choose a Style</h2>
        <p className="max-w-2xl mx-auto mt-4 text-text-muted">Select a style to see a collection of matching furniture in AR.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {AR_STYLES.map((style) => (
          <StyleCard 
            key={style.id} 
            style={style} 
            onSelect={() => onStyleSelect(style)} 
          />
        ))}
      </div>
      <div className="mt-16 text-center">
        <NavigationButtons onBack={onBack} />
      </div>
    </div>
  );
};

export default ARStyleSelectionPage;