import React from 'react';
import { DesignResult, Product } from '../types';

interface ResultDisplayProps {
  result: DesignResult;
  originalImage?: string | null;
}

const Hotspot: React.FC<{ product: Product }> = ({ product }) => {
  if (!product.hotspot) return null;

  const { x, y, width, height } = product.hotspot;

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute block group/hotspot cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
      aria-label={`Shop for ${product.name}`}
    >
      <div className="w-full h-full rounded-md border-2 border-transparent group-hover/hotspot:border-primary group-hover/hotspot:bg-primary/20 transition-all duration-300 ease-in-out flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-primary/80 rounded-full group-hover/hotspot:scale-150 group-hover:animate-pulse transition-transform duration-300"></div>
      </div>
      
      <div className="absolute -top-2.5 -right-2.5 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 ease-in-out" aria-hidden="true">
          <div className="bg-text-main text-white text-xs sm:text-sm font-semibold py-1 px-3 rounded-full shadow-lg whitespace-nowrap">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
      </div>
    </a>
  );
};


const InteractiveResultDisplay: React.FC<{ result: DesignResult }> = ({ result }) => {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg group">
      <img src={result.imageUrl} alt="Generated Design" className="w-full h-full object-cover" />
      
      {result.products.map((product, index) => (
        <Hotspot key={index} product={product} />
      ))}
    </div>
  );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, originalImage }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `GrihaAI-Design-${result.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-12 sm:mt-16">
      <h2 className="text-4xl sm:text-5xl font-serif text-text-main mb-3 text-center">Your New Design</h2>
      <p className="text-center text-text-muted mb-10">Hover over items in the image to see pricing and find shopping links.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {originalImage && (
          <div className="text-center">
            <h3 className="text-xl font-serif text-text-muted mb-3">Before</h3>
            <img src={originalImage} alt="Original Room" className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video" />
          </div>
        )}
        <div className={`text-center ${!originalImage ? 'md:col-span-2' : ''}`}>
           {originalImage && <h3 className="text-xl font-serif text-text-muted mb-3">After</h3>}
           <InteractiveResultDisplay result={result} />
        </div>
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 py-2 px-5 bg-transparent text-text-muted border border-border-main font-medium rounded-md hover:bg-card/80 hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;