import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ApiService from '../apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type Props = {
  name: string;
  label: string;
  error?: string;
  value: string; // Mudança: valor agora é uma string
  setFieldValue: (field: string, value: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
};

const RegionWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  color: #333;
`;

const ErrorText = styled.span`
  position: absolute;
  bottom: -18px;
  left: 10px;
  font-size: 12px;
  color: red;
`;

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
  max-width: 438px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #7d7c8bd5;
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
  id: string;
  image: string;
  userName: string;
}

const UserSearchSelect: React.FC<Props> = ({
  name,
  label,
  error,
  value = '', // Mudança: valor agora é uma string
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

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!inputValue.trim()) {
      setOptions([]); // Limpa as opções se o input estiver vazio ou apenas com espaços
    }
  }, [inputValue]);

  const searchUserNames = async (nickname: string) => {
    if (!nickname.trim()) return;
    setLoading(true);
    setFetchError(null);
    try {
      const apiService = new ApiService('');
      const response = await apiService.get(`/user?page=0&size=10&nickname=${nickname}`);
      const results = response.data.content;

      const formattedResults = results.map((user: any) => ({
        label: `${user.nickname}`,
        value: user.nickname,
        id: user.id,
        image: user.imagePath,
        userName: user.fullName,  
      }));

      setOptions(formattedResults);
      setShowSuggestions(true);
    } catch (error) {
      setFetchError('Erro ao buscar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value); 

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.trim()) {
        searchUserNames(value); 
      } else {
        setOptions([]); 
      }
    }, 300); // Debounce de 300ms
  };

  const handleSelect = (selectedOption: OptionType) => {
    if (value) {
      toast.error('Só é permitido um usuário por vez!');
      return;
    }

    // Armazena apenas o id do usuário
    setFieldValue(name, selectedOption.id);

    // Atualiza o input com o nickname do usuário
    setInputValue(selectedOption.label); 

    setOptions([]); // Limpa as opções
    setShowSuggestions(false); // Fecha a lista de sugestões
  };

  const handleBlur = () => {
    if (!inputValue) {
      setShowSuggestions(false);
    }
    if (onBlur) {
      onBlur();
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <RegionWrapper>
      <ToastContainer />
      <div style={{ position: 'relative' }}>
        <Label>{label}</Label>
        <StyledInput
          type="text"
          id={name}
          name={name}
          value={inputValue || value}  // Exibe o nickname ou o valor do id
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
              <SuggestionsItem key={option.id} onClick={() => handleSelect(option)}>
                <OptionIcon
                  src={`${option.image}`}
                  alt="Profile Icon"
                />
                {option.label}
              </SuggestionsItem>
            ))}
          </SuggestionsList>
        )}

        {value && value.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            {/* Exemplo para exibir algo adicional após seleção */}
          </div>
        )}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </RegionWrapper>
  );
};

export default UserSearchSelect;
