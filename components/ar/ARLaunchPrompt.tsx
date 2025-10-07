import React from 'react';

interface ARLaunchPromptProps {
  onClose: () => void;
  onSimulateLive: () => void; // For development/demo purposes
}

const ARLaunchPrompt: React.FC<ARLaunchPromptProps> = ({ onClose, onSimulateLive }) => {
  // This would be dynamically generated in a real application
  const arViewUrl = 'https://griha.ai/ar-view/xyz123'; 
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(arViewUrl)}&qzone=1&bgcolor=FBF9F6&color=5C524C&margin=0`;

  return (
    <div className="fixed inset-0 bg-text-main/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-card rounded-lg shadow-2xl p-8 max-w-md w-full text-center relative border border-border-main">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main"
          aria-label="Close AR prompt"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-2xl font-serif text-text-main mb-4">
          Experience Your Design in AR
        </h2>
        <p className="text-text-muted mb-6">
          Scan the QR code with your mobile device to launch the live AR view in your room.
        </p>

        <div className="bg-background border border-border-main rounded-md p-4 aspect-square flex items-center justify-center">
           <img 
            src={qrCodeUrl} 
            alt="QR code to launch AR view"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-sm text-text-muted mt-4 font-mono">{arViewUrl}</p>

        <button 
          onClick={onSimulateLive}
          className="mt-6 text-sm text-primary hover:underline"
        >
          (Demo) Simulate Mobile View
        </button>
      </div>
    </div>
  );
};

export default ARLaunchPrompt;
