import React from 'react';
import ARViewer from './ARViewer';

interface ARDeepLinkPageProps {
  modelUrl: string;
  productName?: string;
}

const ARDeepLinkPage: React.FC<ARDeepLinkPageProps> = ({ modelUrl, productName }) => {
  return (
    <div className="min-h-screen bg-background text-text-main px-4 py-6 flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-serif">View in AR</h1>
        {productName && <p className="text-text-muted mt-1">{productName}</p>}
      </div>

      <div className="rounded-xl border border-border-main bg-card p-2">
        <ARViewer modelUrl={modelUrl} productName={productName} />
      </div>

      <p className="text-sm text-text-muted text-center">
        Tap "View in Your Room" to launch your device's AR experience.
      </p>
    </div>
  );
};

export default ARDeepLinkPage;


