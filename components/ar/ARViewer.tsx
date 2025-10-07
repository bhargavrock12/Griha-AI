import React from 'react';

interface ARViewerProps {
  modelUrl: string;
  productName?: string;
}

// Declare the intrinsic element for TypeScript so JSX allows <model-viewer>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        ar?: boolean | '';
        'ar-modes'?: string;
        'camera-controls'?: boolean | '';
        'environment-image'?: string;
        'shadow-intensity'?: string | number;
      };
    }
  }
}

const ARViewer: React.FC<ARViewerProps> = ({ modelUrl, productName = 'Furniture' }) => {
  return (
    <model-viewer
      src={modelUrl}
      alt={productName}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      environment-image="neutral"
      shadow-intensity="1"
      style={{ width: '100%', height: 480 }}
    >
      <button slot="ar-button" className="px-4 py-2 rounded-md bg-primary text-white">
        View in Your Room
      </button>

      <div slot="loading" className="text-center text-text-muted">
        Loading 3D Model...
      </div>
    </model-viewer>
  );
};

export default ARViewer;


