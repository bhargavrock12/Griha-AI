import React from 'react';
import { SavedDesign } from '../types';

interface SavedDesignsProps {
  designs: SavedDesign[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

const SavedDesigns: React.FC<SavedDesignsProps> = ({ designs, onLoad, onDelete }) => {
  if (designs.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-24">
      <h2 className="text-4xl sm:text-5xl font-serif text-text-main mb-10 text-center">My Saved Designs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {designs.sort((a, b) => b.timestamp - a.timestamp).map((design) => (
          <div key={design.id} className="bg-card rounded-lg shadow-sm border border-border-main overflow-hidden flex flex-col group">
            <div className="relative">
              <img src={design.result.imageUrl} alt="Saved design" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-4">
                 <button 
                  onClick={() => onLoad(design.id)}
                  className="px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary-light transition-colors"
                  aria-label={`Load design for ${design.inputs.styles.join(', ')} style`}
                >
                  View
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(design.id); }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-semibold hover:bg-gray-700 transition-colors"
                  aria-label={`Delete design for ${design.inputs.styles.join(', ')} style`}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="p-5 flex-grow">
              <p className="font-semibold text-text-main">
                {design.mode === 'TextToDesign' ? design.inputs.roomType : 'Room Redesign'}
              </p>
              <p className="text-sm text-text-muted capitalize">
                {design.inputs.styles.length > 0 ? design.inputs.styles.join(', ') : 'Custom'} Style
              </p>
              <p className="text-xs text-text-muted/80 mt-2">
                Saved on {new Date(design.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedDesigns;