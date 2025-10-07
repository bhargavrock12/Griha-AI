import React from 'react';
import NavigationButtons from '../common/NavigationButtons';

interface InputSelectionPageProps {
  onSelect: (mode: 'text' | 'image' | 'ar') => void;
  onBack: () => void;
}

const SelectionCard: React.FC<{ title: string; description: string; onClick?: () => void; disabled?: boolean }> = ({ title, description, onClick, disabled = false }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`relative bg-card p-8 rounded-lg shadow-sm border ${disabled ? 'border-border-main' : 'border-border-main hover:border-primary hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 cursor-pointer'} flex flex-col items-center text-center`}
  >
    {disabled && <div className="absolute top-3 right-3 bg-gray-200 text-gray-500 text-xs font-bold px-2 py-1 rounded-full tracking-wider">SOON</div>}
    <div className={disabled ? 'opacity-50' : ''}>
        <h3 className="text-2xl font-serif text-text-main">{title}</h3>
        <p className="text-text-muted mt-3">{description}</p>
    </div>
  </div>
);

const InputSelectionPage: React.FC<InputSelectionPageProps> = ({ onSelect, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto my-16 animate-fade-in">
      <h2 className="text-4xl sm:text-5xl font-serif text-text-main mb-12 text-center">How would you like to start?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SelectionCard 
          title="Generate New Design"
          description="Describe your dream room and let our AI bring it to life from scratch."
          onClick={() => onSelect('text')}
        />
        <SelectionCard
          title="Redesign My Room"
          description="Upload a photo of your current space and see it transformed."
          onClick={() => onSelect('image')}
        />
        <SelectionCard
          title="AR Live Design"
          description="View and place furniture in your room using your phone's camera."
          onClick={() => onSelect('ar')}
        />
      </div>
      <div className="mt-16 text-center">
        <NavigationButtons onBack={onBack} />
      </div>
    </div>
  );
};

export default InputSelectionPage;