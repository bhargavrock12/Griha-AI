import React from 'react';
import { DesignResult } from '../../types';
import ResultDisplay from '../ResultDisplay';
import ProductList from '../ProductList';

interface TextOutputPageProps {
  result: DesignResult;
  inputs: {
    roomType: string;
    dimensions: string;
    styles: string[];
    description?: string;
    designTradition: 'Indian' | 'Western';
  };
  onSave: () => void;
  isSaved: boolean;
  onStartOver: () => void;
  onLaunchAR: (result: DesignResult) => void;
}

const TextOutputPage: React.FC<TextOutputPageProps> = ({ result, inputs, onSave, isSaved, onStartOver, onLaunchAR }) => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in" id="result-section">
      <div className="bg-card p-6 sm:p-8 rounded-lg shadow-sm border border-border-main mb-10">
        <h3 className="text-2xl font-serif text-text-main mb-5">Your Design Brief</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 text-sm">
           <div>
            <p className="font-semibold text-text-main tracking-wide">Tradition</p>
            <p className="text-text-muted">{inputs.designTradition}</p>
          </div>
          <div>
            <p className="font-semibold text-text-main tracking-wide">Room Type</p>
            <p className="text-text-muted">{inputs.roomType}</p>
          </div>
          <div>
            <p className="font-semibold text-text-main tracking-wide">Dimensions</p>
            <p className="text-text-muted">{inputs.dimensions}</p>
          </div>
          <div>
            <p className="font-semibold text-text-main tracking-wide">Styles</p>
            <p className="text-text-muted capitalize">{inputs.styles.join(', ')}</p>
          </div>
          {inputs.description && (
            <div className="col-span-2 md:col-span-4 mt-2">
              <p className="font-semibold text-text-main tracking-wide">Details</p>
              <p className="text-text-muted italic">"{inputs.description}"</p>
            </div>
          )}
        </div>
      </div>

      <ResultDisplay result={result} />
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

export default TextOutputPage;