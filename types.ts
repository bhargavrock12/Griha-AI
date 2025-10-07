export enum AppMode {
  ImageToRedesign = 'ImageToRedesign',
  TextToDesign = 'TextToDesign',
}

export interface Product {
  name: string;
  price: number;
  retailer: string;
  link: string;
  hotspot?: {
    x: number; // top-left x %
    y: number; // top-left y %
    width: number; // width %
    height: number; // height %
  };
}

export interface DesignResult {
  id: string; // Unique identifier for this specific generation
  imageUrl: string;
  products: Product[];
  totalCost: number;
}

// Represents a user-saved design in localStorage
export interface SavedDesign {
  id: string; // Matches the DesignResult id
  timestamp: number;
  mode: AppMode;
  result: DesignResult;
  originalImage?: string | null; // For ImageToRedesign 'before' view
  // Store the inputs that generated this design
  inputs: {
    styles: string[];
    budget: string;
    description?: string;
    // For TextToDesign
    roomType?: string;
    dimensions?: string;
    designTradition?: 'Indian' | 'Western';
  };
}

// Represents a hard-coded, pre-generated design for the gallery
export interface Inspiration {
  id: string;
  title: string;
  imageUrl: string; // This is the image shown on the card
  inputs: {
    styles: string[];
    roomType: string;
    dimensions: string;
    budget: string;
    description: string;
    // FIX: Made designTradition required to match the shape of the `TextInputs` state in App.tsx and the provided data.
    designTradition: 'Indian' | 'Western';
  };
  // The complete, pre-generated result to display when clicked
  result: DesignResult; 
}

// --- AR Feature Types ---
export interface ARProduct {
  id: string;
  name: string;
  position: { x: number; y: number; z: number; }; // 3D coordinates
  link: string;
  modelUrl: string; // URL to the 3D model file (e.g., .glb)
}

export interface ARStyle {
  id:string;
  name: string;
  imageUrl: string;
}