import React from 'react';
import { DesignResult } from '../../types';
import ProductList from '../ProductList';
import ImageSlider from '../ImageSlider';

interface ImageOutputPageProps {
  result: DesignResult;
  originalImage: string | null;
  onSave: () => void;
  isSaved: boolean;
  onStartOver: () => void;
  onLaunchAR: (result: DesignResult) => void;
}

const ImageOutputPage: React.FC<ImageOutputPageProps> = ({ result, originalImage, onSave, isSaved, onStartOver, onLaunchAR }) => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in" id="result-section">
      <h2 className="text-4xl sm:text-5xl font-serif text-text-main mb-3 text-center">Your Redesigned Room</h2>
      <p className="text-center text-text-muted mb-10">Slide the handle to compare the before and after versions.</p>
      
      {originalImage && (
        <ImageSlider 
          beforeImage={originalImage}
          afterImage={result.imageUrl}
        />
      )}

      <ProductList products={result.products} totalCost={result.totalCost} />

       <div className="mt-16 text-center flex flex-col items-center gap-6">
        <div className="flex justify-center items-center gap-4">
           <button
            onClick={onStartOver}
            className="py-2.5 px-6 bg-transparent border border-border-main text-text-muted font-semibold rounded-md shadow-sm hover:bg-card/80 hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
          >
            Start Over
          </button>
          <button
            onClick={onSave}
            disabled={isSaved}
            className="py-2.5 px-6 bg-text-main text-white font-bold rounded-md shadow-sm hover:bg-text-main/80 focus:outline-none focus:ring-2 focus:ring-text-main/50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSaved ? '✓ Saved' : 'Save Design'}
          </button>
        </div>
         <div className="mt-6 border-t border-border-main pt-8 w-full max-w-2xl mx-auto">
           <button
             onClick={() => onLaunchAR(result)}
             className="w-full py-3 px-8 bg-primary text-white font-bold rounded-md shadow-md hover:bg-primary-light focus:outline-none focus:ring-2 ring-offset-2 ring-primary transition-all text-lg"
           >
             View Design in Your Room (AR)
           </button>
        </div>
      </div>
    </div>
  );
};

export default ImageOutputPage;