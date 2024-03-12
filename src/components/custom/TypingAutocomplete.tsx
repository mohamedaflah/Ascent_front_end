// Autocomplete.tsx
import React, { useState } from 'react';

interface AutocompleteProps {
  suggestions: string[];
  onSelected: (value: string) => void;
  onChange?: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions, onSelected, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setInputValue(value);
    onSelected(value);
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <ul>
        {filteredSuggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
