import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ApiService from '../apiService';

type Props = {
  name: string;
  label: string;
  error?: string;
  value: string | null;
  setFieldValue: (field: string, value: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
};

const RegionWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  color: #333;
  font-size: 14px;
  text-align: left;
`;

const ErrorText = styled.span``;

const LoadingText = styled.span`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  &:focus {
    border-color: #e63946;
    outline: none;
    box-shadow: 0 0 5px rgba(230, 57, 70, 0.5);
  }
`;

const SuggestionsList = styled.ul<{ isScrollable: boolean }>`
  position: absolute;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: ${({ isScrollable }) => (isScrollable ? '200px' : 'auto')};
  border: 1px solid #ccc;
  border-radius: 5px;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  overflow-y: ${({ isScrollable }) => (isScrollable ? 'auto' : 'hidden')};
`;

const SuggestionsItem = styled.li`
  padding: 10px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #8e86f5;
  }
`;

const OptionIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

interface OptionType {
  label: string;
  value: string;
  profileIconId: string;
  tagLine: string;
  gameName: string;
}

const UserSearchSelect: React.FC<Props> = ({
  name,
  label,
  error,
  value,
  setFieldValue,
  onBlur,
  placeholder = 'Digite o nome do usuário...',
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(''); 
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false); 
  const inputRef = useRef<HTMLInputElement>(null);

  const searchUserNames = async (gameName: string) => {
    if (!gameName) {
      setOptions([]); 
      return;
    }
    setLoading(true);
    setFetchError(null);
    try {
      const apiService = new ApiService('');
      const response = await apiService.get(`/api/v1/accountsRiot/search?gameName=${gameName}`);
      const results = response.data;

      const formattedResults = results.map((account: any) => ({
        label: `${account.gameName}#${account.tagLine}`,
        value: account.gameName,
        profileIconId: account.profileIconId,
        tagLine: account.tagLine,
        gameName: account.gameName,
      }));

      setOptions(formattedResults);
      setShowSuggestions(true); 
    } catch (error) {
      setFetchError('Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value); 
    setFieldValue(name, value); 
    searchUserNames(value);
  };

  const handleSelect = (selectedOption: OptionType) => {
    setFieldValue(name, selectedOption.gameName);
    setFieldValue('tagLine', selectedOption.tagLine);
    setFieldValue('gameName', selectedOption.gameName);
    setFieldValue('profileIconId', selectedOption.profileIconId);
    setFieldValue('region', 'BR1');
    setInputValue(selectedOption.gameName); 
    setOptions([]); 
    setShowSuggestions(false); 
  };

 
  const handleBlur = () => {
    if (!inputValue) {
      setShowSuggestions(false); 
    }
    if (onBlur) {
    
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true); 
  };

  return (
    <RegionWrapper>
      <div style={{ position: 'relative' }}>
        <StyledInput
          type="text"
          id={name}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          ref={inputRef}
        />

        {fetchError && <ErrorText>{fetchError}</ErrorText>}

        {showSuggestions && options.length > 0 && (
          <SuggestionsList isScrollable={options.length > 3}>
            {options.map((option) => (
              <SuggestionsItem key={option.value} onClick={() => handleSelect(option)}>
                <OptionIcon
                  src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${option.profileIconId}.png`}
                  alt="Profile Icon"
                />
                {option.label}
              </SuggestionsItem>
            ))}
          </SuggestionsList>
        )}
      </div>

      {error && <ErrorText>{error}</ErrorText>}
    </RegionWrapper>
  );
};

export default UserSearchSelect;
