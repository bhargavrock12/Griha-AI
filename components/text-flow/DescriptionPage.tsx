import React from 'react';
import PageWrapper from '../common/PageWrapper';

interface DescriptionPageProps {
  value: string;
  budget: string;
  onValueChange: (value: string) => void;
  onBudgetChange: (value: string) => void;
  onGenerate: () => void;
  onBack: () => void;
}

const budgetOptions = ['₹50,000', '₹1,00,000', '₹2,00,000', '₹5,00,000', '₹10,00,000+'];

const DescriptionPage: React.FC<DescriptionPageProps> = ({ value, budget, onValueChange, onBudgetChange, onGenerate, onBack }) => {
  return (
    <PageWrapper title="Add Final Details">
      <div className="space-y-8">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-main">
            Further Details (Optional)
          </label>
          <textarea
            id="description"
            rows={5}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="mt-2 block w-full p-3 bg-card border border-border-main rounded-md shadow-sm focus:ring-2 focus:ring-primary/70 focus:border-primary sm:text-sm"
            placeholder="e.g., I want a cozy reading nook by the window, a large piece of abstract art, and my color scheme should be blues and grays."
          />
          <p className="text-xs text-text-muted mt-1.5">Tell us anything else! The more detail, the better the result.</p>
        </div>
        <div>
           <label htmlFor="budget" className="block text-sm font-medium text-text-main">Estimated Budget</label>
           <select
             id="budget"
             value={budget}
             onChange={(e) => onBudgetChange(e.target.value)}
             className="mt-2 block w-full pl-3 pr-10 py-3 text-base bg-card border border-border-main focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary sm:text-sm rounded-md"
           >
             {budgetOptions.map(option => <option key={option} value={option}>{option}</option>)}
           </select>
         </div>
        <div className="flex justify-between items-center pt-4">
           <button
            type="button"
            onClick={onBack}
            className="text-text-muted font-semibold hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-2 transition-colors"
           >
            &larr; Back
           </button>
           <button
            type="button"
            onClick={onGenerate}
            className="py-3 px-10 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all text-lg"
           >
            Generate Design
           </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DescriptionPage;