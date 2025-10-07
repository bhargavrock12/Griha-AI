import React from 'react';
import NavigationButtons from '../common/NavigationButtons';

interface DesignTraditionPageProps {
  onSelect: (tradition: 'Western' | 'Indian') => void;
  onBack: () => void;
}

const SelectionCard: React.FC<{ title: string; description: string; onClick: () => void }> = ({ title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-card p-10 rounded-lg shadow-sm border border-border-main hover:border-primary hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
  >
    <h3 className="text-2xl font-serif text-text-main">{title}</h3>
    <p className="text-text-muted mt-3">{description}</p>
  </div>
);

const DesignTraditionPage: React.FC<DesignTraditionPageProps> = ({ onSelect, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto my-16 animate-fade-in">
      <h2 className="text-4xl sm:text-5xl font-serif text-text-main mb-12 text-center">Choose a Design Tradition</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SelectionCard 
          title="Western / Global"
          description="Styles like Minimalist, Modern, Scandinavian, and Bohemian."
          onClick={() => onSelect('Western')}
        />
        <SelectionCard
          title="Traditional Indian"
          description="Styles like Rajasthani, Chettinad, Mughal, and Colonial."
          onClick={() => onSelect('Indian')}
        />
      </div>
       <div className="mt-16 text-center">
         <NavigationButtons onBack={onBack} />
       </div>
    </div>
  );
};

export default DesignTraditionPage;