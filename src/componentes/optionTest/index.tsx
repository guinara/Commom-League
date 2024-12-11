import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import EnumService from '../../service/EnumService';

type Props = {
  name: string;
  label: string;
  error?: string;
  value: string | null;
  setFieldValue: (field: string, value: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
};

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #b1afaf;
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

type OptionType = { name: string };

const CreateAutoComplete: React.FC<Props> = ({
  name,
  label,
  error,
  value,
  setFieldValue,
  onBlur,
  placeholder = 'Select...',
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const enumService = new EnumService();

  useEffect(() => {
    if (options.length > 0) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        let results: OptionType[] = [];

        if (name === 'country') {
          const response = await enumService.country();
          results = response.data;
        } else if (name === 'state') {
          const response = await enumService.state();
          results = response.data;
          console.log(response.data);
        } else if (name === 'city') {
          const response = await enumService.city();
          results = response.data;
          console.log(response.data);
        }else if (name === 'regionLeague') {
          const response = await enumService.gameRegion();
          console.log(response.data);
          results = response.data;
        }
        

        if (results && results.length > 0) {
          setOptions(
            results.map((item) => ({
              label: item.name,
              value: item.name,
            }))
          );
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching options:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    setFieldValue(name, selectedOption ? selectedOption.value : '');
  };

  const selectedOption = options.find((option) => option.value === value) || null;

  // Estilos personalizados para o Select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: 'rgba(105, 44, 44, 0.2)', // Cor de fundo do campo de input
      padding: '10px',
      color: '#fffbfb', // Cor do texto no campo de input
      border: '1px solid rgba(255, 255, 255, 0.1)', // Cor da borda
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
    // Estilo do campo de input onde o valor é exibido
    input: (base: any) => ({
      ...base,
      color: '#333', // Cor do texto no campo de input (valor selecionado)
    }),
    // Estilo para o texto exibido depois que uma opção é selecionada (valor no campo de input)
    singleValue: (base: any) => ({
      ...base,
      color: '#5f5e5e', // Cor do texto do valor selecionado
    }),
    option: (base: any, state: any) => ({
      ...base,
      color: state.isSelected ? '#ff0000' : '#333', // Cor do texto das opções
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
      color: '#888', // Cor do texto do placeholder
    }),
  };

  return (
    <Wrapper>
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
        getOptionLabel={(e) => e.label}
        getOptionValue={(e) => e.value}
      />
      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

export default CreateAutoComplete;
