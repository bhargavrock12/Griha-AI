import React from 'react';
import { Inspiration } from '../../types';
import { INSPIRATIONS } from '../../config/config';
import InspirationCard from './InspirationCard';

interface ExplorePageProps {
  onInspirationSelect: (inspiration: Inspiration) => void;
  onBack: () => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onInspirationSelect, onBack }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center my-12 sm:my-16">
        <h1 className="text-4xl sm:text-6xl font-serif text-text-main">Explore Designs</h1>
        <p className="max-w-2xl mx-auto mt-4 text-text-muted text-lg">
          Browse our curated collection of AI-generated interior designs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {INSPIRATIONS.map(inspiration => (
          <InspirationCard 
            key={inspiration.id} 
            inspiration={inspiration}
            onSelect={() => onInspirationSelect(inspiration)}
          />
        ))}
      </div>

      <div className="text-center mt-16">
        <button
          onClick={onBack}
          className="text-text-muted font-semibold hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-2 transition-colors"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;