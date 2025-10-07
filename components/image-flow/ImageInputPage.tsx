import React, { useState, useRef, useCallback } from 'react';
import PageWrapper from '../common/PageWrapper';
import StyleInput from '../StyleInput';
import { BASE_DESIGN_STYLES, INDIAN_DESIGN_STYLES } from '../../config/config';

interface ImageInputPageProps {
  onSubmit: (imageFile: File, styles: string[], budget: string, description: string, designTradition: 'Indian' | 'Western') => void;
  isLoading: boolean;
  onBack: () => void;
}

const budgetOptions = ['₹50,000', '₹1,00,000', '₹2,00,000', '₹5,00,000', '₹10,00,000+'];

const ImageInputPage: React.FC<ImageInputPageProps> = ({ onSubmit, isLoading, onBack }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [styles, setStyles] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('₹2,00,000');
  const [description, setDescription] = useState('');
  const [designTradition, setDesignTradition] = useState<'Indian' | 'Western'>('Western');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError('Image size must be less than 4MB.');
        return;
      }
      setError(null);
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (imageFile && styles.length > 0) {
      onSubmit(imageFile, styles, budget, description, designTradition);
    } else {
      setError('Please upload an image and select at least one style.');
    }
  };

  const isSubmitDisabled = !imageFile || styles.length === 0 || isLoading;
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => e.preventDefault(), []);
  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError('Image size must be less than 4MB.');
        return;
      }
      setError(null);
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);
  
  const styleSource = designTradition === 'Indian' ? INDIAN_DESIGN_STYLES : BASE_DESIGN_STYLES;

  return (
    <PageWrapper title="Redesign Your Room">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-text-main mb-2">Upload an Image</label>
          <label 
            htmlFor="file-upload" 
            className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-border-main border-dashed rounded-md cursor-pointer hover:border-primary bg-background/50"
            onDragOver={onDragOver} onDrop={onDrop}
          >
            <div className="space-y-2 text-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Room preview" className="mx-auto h-48 w-auto rounded-md" />
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm text-text-muted">Drop an image here or <span className="text-primary font-semibold">browse</span></p>
                  <p className="text-xs text-text-muted/80">PNG, JPG, WEBP up to 4MB</p>
                </>
              )}
            </div>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} ref={fileInputRef} accept="image/png, image/jpeg, image/webp" />
          </label>
        </div>

        <div>
            <label className="block text-sm font-medium text-text-main mb-2">Design Tradition</label>
            <div className="flex rounded-md border border-border-main">
                <button type="button" onClick={() => { setDesignTradition('Western'); setStyles([]); }} className={`flex-1 py-2 px-4 rounded-l-md text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary ${designTradition === 'Western' ? 'bg-primary text-white' : 'bg-white text-text-main hover:bg-background/50'}`}>Western / Global</button>
                <button type="button" onClick={() => { setDesignTradition('Indian'); setStyles([]); }} className={`-ml-px flex-1 py-2 px-4 rounded-r-md text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary ${designTradition === 'Indian' ? 'bg-primary text-white' : 'bg-white text-text-main hover:bg-background/50'}`}>Traditional Indian</button>
            </div>
        </div>
        
        <StyleInput styles={styles} onStylesChange={setStyles} suggestionSource={styleSource} />

        <div>
          <label htmlFor="image-description" className="block text-sm font-medium text-text-main">Details (Optional)</label>
          <textarea id="image-description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
            className="mt-2 block w-full p-3 bg-card border border-border-main rounded-md shadow-sm focus:ring-2 focus:ring-primary/70 focus:border-primary sm:text-sm"
            placeholder="e.g., I want to replace the sofa and coffee table, but keep the bookshelf."/>
        </div>

        <div>
           <label htmlFor="image-budget" className="block text-sm font-medium text-text-main">Estimated Budget</label>
           <select id="image-budget" value={budget} onChange={(e) => setBudget(e.target.value)}
             className="mt-2 block w-full pl-3 pr-10 py-3 text-base bg-card border border-border-main focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary sm:text-sm rounded-md">
             {budgetOptions.map(option => <option key={option} value={option}>{option}</option>)}
           </select>
         </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        
        <div className="flex justify-between items-center pt-4">
           <button type="button" onClick={onBack} className="text-text-muted font-semibold hover:text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md p-2 transition-colors">&larr; Back</button>
           <button type="submit" disabled={isSubmitDisabled}
             className="py-3 px-10 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-lg">
            {isLoading ? 'Redesigning...' : 'Redesign Room'}
           </button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default ImageInputPage;