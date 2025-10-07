import React from 'react';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onBack, onNext, nextLabel = 'Next', isNextDisabled = false }) => {
  return (
    <div className={`flex mt-12 ${onBack ? 'justify-between' : 'justify-end'} items-center`}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-text-muted font-semibold hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-2 transition-colors"
        >
          &larr; Back
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="py-3 px-10 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;