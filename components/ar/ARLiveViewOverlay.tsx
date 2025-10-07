import React, { useState, useEffect } from 'react';
import { DesignResult, Product, ARProduct } from '../../types';
import ARSceneView from './ARSceneView';

interface ARLiveViewOverlayProps {
  design: DesignResult;
  onExit: () => void;
}

const mapProductsToAR = (products: Product[]): ARProduct[] => {
  const radius = 35; // vw for x/z plane
  const count = products.length;
  return products.map((product, index) => {
    const angle = (index / count) * 2 * Math.PI;
    return {
      id: `${product.name}-${index}`,
      name: product.name,
      link: product.link,
      modelUrl: `${product.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.glb`,
      position: {
        x: radius * Math.cos(angle), // x position on the circle (vw)
        y: (index % 3) * 5 - 5,      // vary y position slightly (vh)
        z: radius * Math.sin(angle) * 3, // z position (depth) on the circle. Multiplier enhances 3D effect.
      }
    };
  });
};


const ARLiveViewOverlay: React.FC<ARLiveViewOverlayProps> = ({ design, onExit }) => {
  const [arProducts, setArProducts] = useState<ARProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ARProduct | null>(null);

  useEffect(() => {
    setArProducts(mapProductsToAR(design.products));
    setSelectedProduct(null);
  }, [design]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 text-white flex flex-col justify-between font-sans overflow-hidden">
        {/* Mock camera view */}
        <div className="absolute inset-0 bg-gray-600 animate-pulse" style={{backgroundImage: 'linear-gradient(45deg, #4a5568, #2d3748)', backgroundSize: '200% 200%'}}></div>

        <ARSceneView products={arProducts} onProductSelect={setSelectedProduct} />

        {/* Top Bar */}
        <div className="w-full flex justify-end p-4 sm:p-6 pointer-events-auto z-10">
            <button 
                onClick={onExit}
                className="bg-black/50 text-white rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm hover:bg-black/80 transition-colors"
            >
                Exit AR
            </button>
        </div>
        
        {/* Selected Product Details Panel */}
        <div 
            className={`absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-6 rounded-t-2xl shadow-2xl transform transition-transform duration-500 ease-in-out z-20 pointer-events-auto ${selectedProduct ? 'translate-y-0' : 'translate-y-full'}`}
        >
            {selectedProduct && (
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                            <p className="text-sm text-gray-300">3D Model: {selectedProduct.modelUrl}</p>
                        </div>
                        <button onClick={() => setSelectedProduct(null)} className="p-2 -mr-2 rounded-full hover:bg-white/10" aria-label="Close product details">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="mt-4">
                        <a href={selectedProduct.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors">
                            Shop Now
                        </a>
                    </div>
                </div>
            )}
        </div>

        {/* Bottom Bar (Capture Button) */}
        <div className={`w-full flex items-end justify-center pb-8 pointer-events-auto z-10 transition-opacity duration-300 ${selectedProduct ? 'opacity-0' : 'opacity-100'}`}>
            <button 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-white/50"
                aria-label="Capture Photo"
            >
                <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-800"></div>
            </button>
        </div>
    </div>
  );
};

export default ARLiveViewOverlay;
