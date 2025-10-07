import React from 'react';
import { roomTypes } from '../../config/config';
import PageWrapper from '../common/PageWrapper';
import NavigationButtons from '../common/NavigationButtons';

interface RoomTypePageProps {
  value: string;
  onValueChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const RoomTypePage: React.FC<RoomTypePageProps> = ({ value, onValueChange, onNext, onBack }) => {
  return (
    <PageWrapper title="Select Room Type">
      <div className="space-y-6">
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-text-main">What kind of room are you designing?</label>
          <select 
            id="roomType" 
            value={value} 
            onChange={(e) => onValueChange(e.target.value)} 
            className="mt-2 block w-full pl-3 pr-10 py-3 text-base bg-card border border-border-main focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary sm:text-sm rounded-md"
          >
            {roomTypes.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <NavigationButtons onBack={onBack} onNext={onNext} />
      </div>
    </PageWrapper>
  );
};

export default RoomTypePage;