import React from 'react';
import PageWrapper from '../common/PageWrapper';
import NavigationButtons from '../common/NavigationButtons';
import StyleInput from '../StyleInput';
import { BASE_DESIGN_STYLES, INDIAN_DESIGN_STYLES } from '../../config/config';

interface RoomStylePageProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  designTradition: 'Indian' | 'Western';
}

const RoomStylePage: React.FC<RoomStylePageProps> = ({ values, onValuesChange, onNext, onBack, designTradition }) => {
  const styleSource = designTradition === 'Indian' ? INDIAN_DESIGN_STYLES : BASE_DESIGN_STYLES;
  
  return (
    <PageWrapper title="Choose Your Style">
      <div className="space-y-8">
        <p className="text-center text-text-muted -mt-6">
          Select one or more styles. You can also type your own and press Enter.
        </p>
        <StyleInput 
          styles={values} 
          onStylesChange={onValuesChange}
          suggestionSource={styleSource}
        />
        <NavigationButtons onBack={onBack} onNext={onNext} isNextDisabled={values.length === 0} />
      </div>
    </PageWrapper>
  );
};

export default RoomStylePage;