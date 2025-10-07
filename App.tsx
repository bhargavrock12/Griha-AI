import React, { useState, useCallback, useEffect } from 'react';
import { AppMode, DesignResult, SavedDesign, Inspiration, ARStyle } from './types';
import { redesignImage, generateDesignFromText } from './services/geminiService';
import { getSavedDesigns, saveDesigns } from './utils/storage';
import { getARProductsForStyle } from './services/arMockService';

import Header from './components/Header';
import Spinner from './components/Spinner';

// New page components
import LandingPage from './components/landing/LandingPage';
import ExplorePage from './components/landing/ExplorePage';
import InputSelectionPage from './components/selection/InputSelectionPage';
import DesignTraditionPage from './components/selection/DesignTraditionPage';
import RoomTypePage from './components/text-flow/RoomTypePage';
import RoomDimensionsPage from './components/text-flow/RoomDimensionsPage';
import RoomStylePage from './components/text-flow/RoomStylePage';
import DescriptionPage from './components/text-flow/DescriptionPage';
import ImageInputPage from './components/image-flow/ImageInputPage';
import TextOutputPage from './components/output/TextOutputPage';
import ImageOutputPage from './components/output/ImageOutputPage';
import SavedDesigns from './components/SavedDesigns';
import ARLaunchPrompt from './components/ar/ARLaunchPrompt';
import ARLiveViewOverlay from './components/ar/ARLiveViewOverlay';
import ARStyleSelectionPage from './components/ar/ARStyleSelectionPage';
import ARFeaturePage from './components/ar/ARFeaturePage';
import ARDeepLinkPage from './components/ar/ARDeepLinkPage';

type Page = 
  | 'landing'
  | 'explore'
  | 'inputSelection'
  | 'designTraditionSelection'
  | 'textFlowRoomType'
  | 'textFlowDimensions'
  | 'textFlowStyle'
  | 'textFlowDescription'
  | 'imageFlowInput'
  | 'generating'
  | 'textOutput'
  | 'imageOutput'
  | 'arStyleSelection'
  | 'arFeature';

interface TextInputs {
  roomType: string;
  dimensions: string;
  styles: string[];
  budget: string;
  description: string;
  designTradition: 'Indian' | 'Western';
}

const initialTextInputs: TextInputs = {
  roomType: 'Living Room',
  dimensions: '15ft x 20ft',
  styles: [],
  budget: '₹2,00,000',
  description: '',
  designTradition: 'Western',
};

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DesignResult | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  
  const [textInputs, setTextInputs] = useState<TextInputs>(initialTextInputs);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);

  const [arMode, setArMode] = useState<'prompt' | 'live' | null>(null);
  const [arDesignData, setArDesignData] = useState<DesignResult | null>(null);

  useEffect(() => {
    setSavedDesigns(getSavedDesigns());
  }, []);

  // Detect AR deep link ?ar=1&modelUrl=...&name=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ar') === '1') {
      setPage('arFeature');
    }
  }, []);

  const handleReset = () => {
    setPage('landing');
    setResult(null);
    setError(null);
    setOriginalImage(null);
    setTextInputs(initialTextInputs);
    setArMode(null);
    setArDesignData(null);
  };

  const handleInspirationSelect = (inspiration: Inspiration) => {
    // Directly load the pre-generated result from the inspiration object
    setTextInputs(inspiration.inputs);
    setResult(inspiration.result);
    setOriginalImage(null); // It's a text-based generation
    setError(null);
    setPage('textOutput'); // Go directly to the output page
    window.scrollTo(0, 0);
  };

  const handleTextToDesign = useCallback(async (inputs: TextInputs) => {
    setPage('generating');
    setError(null);
    setResult(null);
    setOriginalImage(null);

    try {
      const designResult = await generateDesignFromText(
        inputs.roomType, 
        inputs.dimensions, 
        inputs.styles, 
        inputs.budget, 
        inputs.description,
        inputs.designTradition
      );
      setResult({ ...designResult, id: Date.now().toString() });
      setTextInputs(inputs);
      setPage('textOutput');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setPage('textFlowDescription'); // Go back to previous page on error
    }
  }, []);
  
  const handleImageRedesign = useCallback(async (imageFile: File, styles: string[], budget: string, description: string, designTradition: 'Indian' | 'Western') => {
    setPage('generating');
    setError(null);
    setResult(null);
    setOriginalImage(URL.createObjectURL(imageFile));

    const currentInputs = {
      styles,
      budget,
      description,
      designTradition,
      roomType: 'N/A',
      dimensions: 'N/A',
    };
    setTextInputs(currentInputs);

    try {
      const designResult = await redesignImage(imageFile, styles, budget, description, designTradition);
      setResult({ ...designResult, id: Date.now().toString() });
      setPage('imageOutput');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setPage('imageFlowInput');
    }
  }, []);

  const handleSaveDesign = () => {
    if (!result) return;
    if (savedDesigns.some(d => d.id === result.id)) return;

    const mode = page === 'textOutput' ? AppMode.TextToDesign : AppMode.ImageToRedesign;

    const newDesign: SavedDesign = {
      id: result.id,
      timestamp: Date.now(),
      mode,
      result,
      originalImage,
      inputs: {
        styles: textInputs.styles,
        budget: textInputs.budget,
        description: textInputs.description,
        designTradition: textInputs.designTradition,
        ...(mode === AppMode.TextToDesign && {
          roomType: textInputs.roomType,
          dimensions: textInputs.dimensions,
        }),
      }
    };

    const updatedDesigns = [...savedDesigns, newDesign];
    setSavedDesigns(updatedDesigns);
    saveDesigns(updatedDesigns);
  };

  const handleLoadDesign = (id: string) => {
     const designToLoad = savedDesigns.find(d => d.id === id);
    if (designToLoad) {
      setResult(designToLoad.result);
      setOriginalImage(designToLoad.originalImage);
      setTextInputs(s => ({...s, ...designToLoad.inputs, designTradition: designToLoad.inputs.designTradition || 'Western'}));
      setError(null);
      setPage(designToLoad.mode === AppMode.TextToDesign ? 'textOutput' : 'imageOutput');
      window.scrollTo(0, 0);
    }
  };

  const handleDeleteDesign = (id: string) => {
    const updatedDesigns = savedDesigns.filter(d => d.id !== id);
    setSavedDesigns(updatedDesigns);
    saveDesigns(updatedDesigns);
  };

  const handleLaunchAR = (design: DesignResult) => {
    setArDesignData(design);
    setArMode('prompt');
  };
  
  const handleARStyleSelect = (style: ARStyle) => {
    const products = getARProductsForStyle(style.name);
    const totalCost = products.reduce((sum, item) => sum + item.price, 0);
    
    const mockDesign: DesignResult = {
      id: `ar-${style.id}`,
      imageUrl: '', // Not needed for AR view
      products,
      totalCost
    };
    
    handleLaunchAR(mockDesign);
  };

  const renderPage = () => {
    switch(page) {
      case 'landing':
        return <LandingPage onGenerate={() => setPage('inputSelection')} onInspirationSelect={handleInspirationSelect} onExploreMore={() => setPage('explore')}/>;
      case 'explore':
        return <ExplorePage onInspirationSelect={handleInspirationSelect} onBack={() => setPage('landing')} />;
      case 'inputSelection':
        return <InputSelectionPage onSelect={(mode) => {
          if (mode === 'text') {
            setPage('designTraditionSelection');
          } else if (mode === 'image') {
            setPage('imageFlowInput');
          } else { // 'ar' mode
            setPage('arFeature');
          }
        }} onBack={() => setPage('landing')} />;
      case 'arFeature':
        {
          const params = new URLSearchParams(window.location.search);
          const deepLinkModelUrl = params.get('modelUrl') || undefined;
          const deepLinkName = params.get('name') || undefined;
          if (deepLinkModelUrl) {
            return <ARDeepLinkPage modelUrl={deepLinkModelUrl} productName={deepLinkName || undefined} />;
          }
          return <ARFeaturePage />;
        }
      case 'designTraditionSelection':
        return <DesignTraditionPage onSelect={(tradition) => { setTextInputs(s => ({...s, designTradition: tradition, styles: [] })); setPage('textFlowRoomType'); }} onBack={() => setPage('inputSelection')} />;
      case 'arStyleSelection':
        return <ARStyleSelectionPage onStyleSelect={handleARStyleSelect} onBack={() => setPage('inputSelection')} />;
      
      case 'textFlowRoomType':
        return <RoomTypePage value={textInputs.roomType} onValueChange={(val) => setTextInputs(s => ({...s, roomType: val}))} onNext={() => setPage('textFlowDimensions')} onBack={() => setPage('designTraditionSelection')} />;
      case 'textFlowDimensions':
        return <RoomDimensionsPage value={textInputs.dimensions} onValueChange={(val) => setTextInputs(s => ({...s, dimensions: val}))} onNext={() => setPage('textFlowStyle')} onBack={() => setPage('textFlowRoomType')} />;
      case 'textFlowStyle':
        return <RoomStylePage values={textInputs.styles} onValuesChange={(val) => setTextInputs(s => ({...s, styles: val}))} onNext={() => setPage('textFlowDescription')} onBack={() => setPage('textFlowDimensions')} designTradition={textInputs.designTradition} />;
      case 'textFlowDescription':
        return <DescriptionPage value={textInputs.description} budget={textInputs.budget} onValueChange={(val) => setTextInputs(s => ({...s, description: val}))} onBudgetChange={(val) => setTextInputs(s => ({...s, budget: val}))} onGenerate={() => handleTextToDesign(textInputs)} onBack={() => setPage('textFlowStyle')} />;

      case 'imageFlowInput':
        return <ImageInputPage onSubmit={handleImageRedesign} isLoading={false} onBack={() => setPage('inputSelection')} />;

      case 'generating':
        return <Spinner message="Our AI is getting creative..." />;

      case 'textOutput':
        return result ? <TextOutputPage result={result} inputs={textInputs} onSave={handleSaveDesign} isSaved={savedDesigns.some(d => d.id === result.id)} onStartOver={handleReset} onLaunchAR={handleLaunchAR} /> : null;
      case 'imageOutput':
        return result ? <ImageOutputPage result={result} originalImage={originalImage} onSave={handleSaveDesign} isSaved={savedDesigns.some(d => d.id === result.id)} onStartOver={handleReset} onLaunchAR={handleLaunchAR} /> : null;

      default:
        return <div>Something went wrong.</div>;
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans text-text-main">
      <Header onLogoClick={handleReset} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12">
        {error && (
            <div className="text-center p-4 my-4 bg-red-50 text-red-800 border border-red-200 rounded-lg max-w-3xl mx-auto" role="alert">
                <p className="font-semibold">An Error Occurred</p>
                <p className="text-sm">{error}</p>
            </div>
        )}
        {renderPage()}
        {page === 'landing' && <SavedDesigns designs={savedDesigns} onLoad={handleLoadDesign} onDelete={handleDeleteDesign} />}
      </main>
      
      
      {arMode === 'prompt' && <ARLaunchPrompt onClose={() => setArMode(null)} onSimulateLive={() => setArMode('live')} />}
      {arMode === 'live' && arDesignData && <ARLiveViewOverlay design={arDesignData} onExit={() => setArMode(null)} />}
    </div>
  );
};

export default App;