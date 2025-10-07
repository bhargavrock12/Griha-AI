import React from 'react';
import { ARProduct } from '../../types';

interface ARSceneViewProps {
  products: ARProduct[];
  onProductSelect: (product: ARProduct) => void;
}

const stringToHslColor = (str: string, s: number, l: number, a: number = 1) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

const ARProductCube: React.FC<{ product: ARProduct; onProductSelect: (product: ARProduct) => void; }> = ({ product, onProductSelect }) => {
    const size = 120;
    const halfSize = size / 2;
    const color = stringToHslColor(product.name, 50, 60, 0.8);
    const borderColor = stringToHslColor(product.name, 50, 80);

    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        border: `1px solid ${borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8px',
        backfaceVisibility: 'hidden',
    };

    return (
        <div
            className="absolute"
            style={{
                transformStyle: 'preserve-3d',
                transform: `translate(-50%, -50%) translate3d(calc(50vw + ${product.position.x}vw), calc(50vh + ${product.position.y}vh), ${product.position.z}px)`,
            }}
        >
            <button
                onClick={() => onProductSelect(product)}
                className="relative animate-item-spin w-full h-full cursor-pointer hover:scale-110 transition-transform duration-300"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transformStyle: 'preserve-3d',
                }}
                aria-label={`View details for ${product.name}`}
            >
                {/* Front */}
                <div style={{ ...faceStyle, transform: `rotateY(0deg) translateZ(${halfSize}px)` }}>
                    <div className="text-white">
                        <p className="font-bold text-sm leading-tight">{product.name}</p>
                        <p className="text-xs italic mt-1 opacity-80 break-all">{product.modelUrl}</p>
                    </div>
                </div>
                {/* Back */}
                <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${halfSize}px)` }} />
                {/* Right */}
                <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${halfSize}px)` }} />
                {/* Left */}
                <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${halfSize}px)` }} />
                {/* Top */}
                <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${halfSize}px)` }} />
                {/* Bottom */}
                <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${halfSize}px)` }} />
            </button>
        </div>
    );
};


const ARSceneView: React.FC<ARSceneViewProps> = ({ products, onProductSelect }) => {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
      {/* This container sets up the 3D space and rotates */}
      <div className="relative w-full h-full animate-slow-spin" style={{ transformStyle: 'preserve-3d' }}>
        {products.map((product) => (
          <ARProductCube key={product.id} product={product} onProductSelect={onProductSelect} />
        ))}
      </div>
    </div>
  );
};

export default ARSceneView;