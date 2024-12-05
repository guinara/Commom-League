import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import PlayerService from '../service/playerService';
import TeamService from '../service/ChampionshipService';
import GameService from '../service/ChampionshipService'; // Atualize o caminho, se necessário

interface CreateAutoCompleteProps {
  name: 'player' | 'team' | 'game';
  label: string;
  error?: string;
  value: any;
  setFieldValue: (field: string, value: any) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface Option {
  nome?: string;
  [key: string]: any;
}

export default function CreateAutoComplete({
  name,
  label,
  error,
  value,
  setFieldValue,
  onBlur,
}: CreateAutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!open || options.length > 0) {
      return undefined;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        let results: Option[] = [];

        if (name === 'player') {
          const playerService = new PlayerService();
         // results = (await playerService.consult()).data;
        } else if (name === 'team') {
          const teamService = new TeamService();
          results = (await teamService.consult()).data;
        } else if (name === 'game') {
          const gameService = new GameService();
          results = (await gameService.consult()).data;
        }

        if (active) {
          setOptions(results);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching options:', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [open, name]);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    console.log('handleChange - New value:', newValue);
    setFieldValue(name, newValue);
  };

  const handleInputChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('handleInputChange - New input value:', newValue);
    setFieldValue(name, newValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('handleBlur - Input lost focus');
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <Autocomplete
      fullWidth
      open={open}
      value={value || ''}
      onChange={handleChange}
      onInputChange={handleInputChange}
      freeSolo
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.nome || ''; // Verifica se é um objeto e retorna 'nome' ou string vazia
      }}
      options={options}
      loading={loading}
      onBlur={handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
