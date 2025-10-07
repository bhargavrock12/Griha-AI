import { SavedDesign } from '../types';

const DESIGNS_KEY = 'grihaai_saved_designs';
const CUSTOM_STYLES_KEY = 'grihaai_custom_styles';

export const getSavedDesigns = (): SavedDesign[] => {
  try {
    const savedData = localStorage.getItem(DESIGNS_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Failed to retrieve saved designs from local storage:", error);
  }
  return [];
};

export const saveDesigns = (designs: SavedDesign[]): void => {
  try {
    localStorage.setItem(DESIGNS_KEY, JSON.stringify(designs));
  } catch (error)
    {
    console.error("Failed to save designs to local storage:", error);
  }
};

// Functions for managing custom styles
export const getCustomStyles = (): string[] => {
  try {
    const savedStyles = localStorage.getItem(CUSTOM_STYLES_KEY);
    if (savedStyles) {
      return JSON.parse(savedStyles);
    }
  } catch (error) {
    console.error("Failed to retrieve custom styles from local storage:", error);
  }
  return [];
};

export const saveCustomStyle = (newStyle: string): void => {
  try {
    const existingStyles = getCustomStyles();
    // Case-insensitive check to prevent duplicates like "Rustic" and "rustic"
    if (!existingStyles.some(s => s.toLowerCase() === newStyle.toLowerCase())) {
      const updatedStyles = [...existingStyles, newStyle];
      localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(updatedStyles));
    }
  } catch (error) {
    console.error("Failed to save custom style to local storage:", error);
  }
};