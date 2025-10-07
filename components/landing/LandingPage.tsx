import React from 'react';
import { Inspiration } from '../../types';
import { INSPIRATIONS } from '../../config/config';
import InspirationCard from './InspirationCard';

interface LandingPageProps {
  onGenerate: () => void;
  onInspirationSelect: (inspiration: Inspiration) => void;
  onExploreMore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGenerate, onInspirationSelect, onExploreMore }) => {
  const featuredInspirations = INSPIRATIONS.slice(0, 4);

  return (
    <div className="animate-fade-in">
      <div className="text-center mt-0 mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-6xl font-serif text-text-main leading-tight">Your Personal AI<br/>Interior Designer</h1>
        <p className="max-w-2xl mx-auto mt-4 text-text-muted text-lg">
          Instantly visualize and shop for your dream room, or get inspired by our curated collection.
        </p>
        <div className="mt-10">
          <button
            onClick={onGenerate}
            className="py-4 px-12 bg-primary text-white font-semibold rounded-md shadow-lg hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all text-lg"
          >
            Create Your Own Design
          </button>
        </div>
      </div>

      <div className="text-center mt-20 py-10 border-t border-border-main">
         <h2 className="text-3xl font-serif text-text-main">Or, Get Inspired</h2>
         <p className="max-w-xl mx-auto mt-2 text-text-muted">Browse our curated collection of AI-generated interior designs.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10">
        {featuredInspirations.map(inspiration => (
          <InspirationCard 
            key={inspiration.id} 
            inspiration={inspiration}
            onSelect={() => onInspirationSelect(inspiration)}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onExploreMore}
          className="py-3 px-8 bg-card border border-border-main text-text-main font-semibold rounded-md shadow-sm hover:bg-gray-50 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        >
          Explore More Designs
        </button>
      </div>

    </div>
  );
};

export default LandingPage;