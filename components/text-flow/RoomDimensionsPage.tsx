import React, { useState, useEffect } from 'react';
import PageWrapper from '../common/PageWrapper';
import NavigationButtons from '../common/NavigationButtons';

interface RoomDimensionsPageProps {
  value: string; // e.g., "15ft x 20ft"
  onValueChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const RoomDimensionsPage: React.FC<RoomDimensionsPageProps> = ({ value, onValueChange, onNext, onBack }) => {
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');

  useEffect(() => {
    const parts = value.replace(/ft/g, '').split('x');
    if (parts.length === 2) {
      setLength(parts[0].trim());
      setBreadth(parts[1].trim());
    }
  }, [value]);

  const handleNext = () => {
    if (length && breadth) {
      onValueChange(`${length}ft x ${breadth}ft`);
      onNext();
    }
  };
  
  const isNextDisabled = !length || !breadth || isNaN(Number(length)) || isNaN(Number(breadth)) || Number(length) <= 0 || Number(breadth) <= 0;

  return (
    <PageWrapper title="Enter Room Dimensions">
      <div className="space-y-8">
        <p className="text-center text-text-muted -mt-6">
          Provide the approximate length and breadth of your room.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-text-main">Length</label>
            <div className="mt-2 relative rounded-md">
              <input
                type="number"
                name="length"
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="focus:ring-primary/70 focus:border-primary block w-full pr-12 sm:text-sm border-border-main rounded-md py-3 bg-card"
                placeholder="e.g., 15"
                min="1"
                aria-label="Room length in feet"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" aria-hidden="true">ft</span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="breadth" className="block text-sm font-medium text-text-main">Breadth</label>
            <div className="mt-2 relative rounded-md">
               <input
                type="number"
                name="breadth"
                id="breadth"
                value={breadth}
                onChange={(e) => setBreadth(e.target.value)}
                className="focus:ring-primary/70 focus:border-primary block w-full pr-12 sm:text-sm border-border-main rounded-md py-3 bg-card"
                placeholder="e.g., 20"
                min="1"
                aria-label="Room breadth in feet"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" aria-hidden="true">ft</span>
              </div>
            </div>
          </div>
        </div>
        <NavigationButtons onBack={onBack} onNext={handleNext} isNextDisabled={isNextDisabled} />
      </div>
    </PageWrapper>
  );
};

export default RoomDimensionsPage;