import React, { useState, useRef, useEffect } from 'react';
import { getCustomStyles, saveCustomStyle } from '../utils/storage';

interface Style {
  name: string;
  description: string;
}

interface StyleInputProps {
  styles: string[];
  onStylesChange: (styles: string[]) => void;
  suggestionSource: { name: string; description: string }[];
}

const StyleInput: React.FC<StyleInputProps> = ({ styles, onStylesChange, suggestionSource }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Style[]>([]);
  const [allAvailableStyles, setAllAvailableStyles] = useState<Style[]>([]);

  useEffect(() => {
    const customStyles = getCustomStyles();
    const allCustom = customStyles.map(s => ({ name: s, description: 'A custom style you saved.' }));
    const uniqueCustom = allCustom.filter(cs => !suggestionSource.some(bs => bs.name.toLowerCase() === cs.name.toLowerCase()));
    
    setAllAvailableStyles([...suggestionSource, ...uniqueCustom].sort((a, b) => a.name.localeCompare(b.name)));
  }, [suggestionSource]);

  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inputValue.length > 0 && isFocused) {
      const filtered = allAvailableStyles.filter(
        s => s.name.toLowerCase().includes(inputValue.toLowerCase()) && !styles.some(style => style.toLowerCase() === s.name.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, styles, allAvailableStyles, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addStyle = (styleName: string) => {
    const trimmedStyle = styleName.trim();
    if (trimmedStyle && !styles.some(s => s.toLowerCase() === trimmedStyle.toLowerCase())) {
      onStylesChange([...styles, trimmedStyle]);
      const isExistingStyle = allAvailableStyles.some(s => s.name.toLowerCase() === trimmedStyle.toLowerCase());
      if (!isExistingStyle) {
        saveCustomStyle(trimmedStyle);
        const newStyleObject = { name: trimmedStyle, description: 'A custom style you saved.' };
        setAllAvailableStyles(prevStyles => [...prevStyles, newStyleObject].sort((a, b) => a.name.localeCompare(b.name)));
      }
    }
    setInputValue('');
    setSuggestions([]);
  };

  const removeStyle = (styleToRemove: string) => {
    onStylesChange(styles.filter(style => style !== styleToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addStyle(inputValue);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor="style-input" className="block text-sm font-medium text-text-main">Aesthetic Style(s)</label>
      <div className="mt-2 flex flex-wrap items-center gap-2 p-3 bg-card border border-border-main rounded-md focus-within:ring-2 focus-within:ring-primary/70 focus-within:border-primary">
        {styles.map(style => (
          <span key={style} className="flex items-center gap-2 bg-primary/10 text-primary-dark font-medium px-3 py-1 rounded-full text-sm">
            {style}
            <button type="button" onClick={() => removeStyle(style)} className="text-red-500 hover:text-red-700 font-bold leading-none" aria-label={`Remove ${style}`}>
              &times;
            </button>
          </span>
        ))}
        <div className="relative flex-grow">
          <input
            id="style-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            className="w-full border-none focus:ring-0 p-1 min-w-[150px] bg-transparent"
            placeholder={styles.length > 0 ? 'Add another...' : 'Type a style and press Enter...'}
          />
          {isFocused && suggestions.length > 0 && (
            <ul className="absolute z-20 w-full bg-card border border-border-main rounded-md shadow-lg mt-2 max-h-48 overflow-y-auto">
              {suggestions.map(suggestion => (
                <li
                  key={suggestion.name}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addStyle(suggestion.name)}
                  className="px-3 py-2 cursor-pointer hover:bg-background text-text-main"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
       <p className="text-xs text-text-muted mt-1.5">Add custom styles or choose from suggestions. Your custom styles will be saved.</p>
    </div>
  );
};

export default StyleInput;