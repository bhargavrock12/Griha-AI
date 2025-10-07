import React, { useState } from 'react';
import ARViewer from './ARViewer';
import QRGenerator from './QRGenerator';

type FurnitureModel = {
  id: number;
  name: string;
  modelUrl: string;
};

// Resolve asset URLs via Vite so they are correctly bundled
const bed1Url = new URL('../models/bed1.glb', import.meta.url).href;
const bed02Url = new URL('../models/bed_02.glb', import.meta.url).href;
const dylanBedUrl = new URL('../models/dylan_bed.glb', import.meta.url).href;
const lamp1Url = new URL('../models/lamp1.glb', import.meta.url).href;

const FURNITURE_MODELS: FurnitureModel[] = [
  { id: 1, name: 'Modern Bed', modelUrl: bed1Url },
  { id: 2, name: 'Designer Bed', modelUrl: bed02Url },
  { id: 3, name: 'Dylan Bed', modelUrl: dylanBedUrl },
  { id: 4, name: 'Modern Lamp', modelUrl: lamp1Url },
];

const ARFeaturePage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<FurnitureModel>(FURNITURE_MODELS[0]);

  const getLocalUrl = () => `${window.location.origin}`;

  const buildARDeepLink = (model: FurnitureModel) => {
    const url = new URL(window.location.origin);
    url.searchParams.set('ar', '1');
    url.searchParams.set('modelUrl', model.modelUrl);
    url.searchParams.set('name', model.name);
    return url.toString();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border-main bg-card p-4">
        <ARViewer modelUrl={selectedModel.modelUrl} productName={selectedModel.name} />
      </div>

      <div className="rounded-xl border border-border-main bg-card p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div>
          <h3 className="text-lg font-semibold">Open on Mobile</h3>
          <p className="text-sm text-text-muted">Scan to open the AR view directly on your phone.</p>
        </div>
        <QRGenerator url={buildARDeepLink(selectedModel)} />
      </div>

      <div className="rounded-xl border border-border-main bg-card p-4">
        <h3 className="text-lg font-semibold mb-3">Select Model</h3>
        <div className="flex flex-wrap gap-2">
          {FURNITURE_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                selectedModel.id === model.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-background text-text-main border-border-main hover:bg-background/70'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ARFeaturePage;


