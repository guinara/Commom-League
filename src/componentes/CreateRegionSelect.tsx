import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import EnumService from '../service/EnumService';

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
  margin-bottom: 16px;
  width: 40%;
  color: black;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  left: 60px;
  font-size: 14px;
  color: black;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const LoadingText = styled.span`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
`;

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: 'transparent',
    padding: '10px',
    color: '#fffbfb',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    '&:hover': {
      borderColor: '#ccc',
    },
    '&:focus': {
      borderColor: '#007bff',
      boxShadow: '0 0 0 1px #007bff',
    },
  }),
  input: (base: any) => ({
    ...base,
    color: '#333',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#5f5e5e',
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: state.isSelected ? '#ff0000' : '#333',
    backgroundColor: state.isFocused ? '#ddd' : 'transparent',
    '&:hover': {
      backgroundColor: '#acacac',
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#888',
  }),
};

interface OptionType {
  label: string; // nome amigável da região (a ser mostrado na UI e enviado ao Formik)
  value: string; // código da região (não utilizado, mas mantido para compatibilidade com `react-select`)
}

const CreateRegionSelect: React.FC<Props> = ({
  name,
  label,
  error,
  value,
  setFieldValue,
  onBlur,
  placeholder = 'Select a region...',
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const enumService = new EnumService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(null); // Limpar erros anteriores
      try {
        let results: { language: string; name: string }[] = [];
        if (name === 'region') {
          const response = await enumService.gameRegion();
          results = response.data;
        }

        if (results && results.length > 0) {
          setOptions(
            results.map((item) => ({
              label: item.name,  // Exibe o nome amigável da região
              value: item.language,  // Apenas mantido para compatibilidade com react-select
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching options:', error);
        setFetchError('Erro ao carregar as regiões.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  // Manipulador de seleção
  const handleChange = (selectedOption: OptionType | null) => {
    // Agora enviamos o `label`, que é o nome amigável da região
    setFieldValue(name, selectedOption ? selectedOption.label : '');  // Envia o nome amigável da região
  };

  // Obter a opção selecionada
  const selectedOption = options.find((option) => option.label === value) || null;

  return (
    <RegionWrapper>
      <Select
        id={name}
        name={name}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        onBlur={onBlur}
        isLoading={loading}
        placeholder={placeholder}
        styles={customStyles}
        getOptionLabel={(e) => e.label}  // Exibe o nome amigável da região
        getOptionValue={(e) => e.label}  // Envia o nome amigável da região (não mais o código)
      />
      {loading && <LoadingText>Loading...</LoadingText>}
      {fetchError && <ErrorText>{fetchError}</ErrorText>}
      {error && <ErrorText>{error}</ErrorText>}
    </RegionWrapper>
  );
};

export default CreateRegionSelect;
