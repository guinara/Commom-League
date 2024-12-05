import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Foto } from '../../data/types'; 
import Imagem from './Imagens';
import Populares from './Populares'; 
import championshipService from '../../service/ChampionshipService'

const FilterContainer = styled.div`
    margin-bottom: 20px;
    margin-left: 20px;
`;

const GaleryContainer = styled.div`
    display: flex;
`;

const ImagesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
    flex-grow: 1; 
    height: 100%;
`;

const Title = styled.h2`
    margin: 20px 10px;
    color: white;
`;

const Divider = styled.hr`
    margin: 20px 0;
`;

const PopularContainer = styled.div`
    position: relative;
    right: 20px; 
`;

const SelectContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 95%; 
   
`;

const SelectButton = styled.button`
    position: relative;
    width: 10%;
    padding: 10px;
    border: 1px solid #000000;
    background-color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    
`;

const Dropdown = styled.div<{ open: boolean }>`
    display: ${(props) => (props.open ? 'block' : 'none')};
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 10%;
    max-height: 250px; 
    overflow-y: auto; 
    z-index: 1000;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    padding: 5px 0; 
    cursor: pointer;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    width: 20px;
    height: 20px;
    border: 2px solid #000000;
    border-radius: 4px;
    position: relative;
    margin-right: 10px;
    background-color: ${(props) => (props.checked ? '#ff9100' : 'white')};
    
    &:after {
        content: '';
        position: absolute;
        width: 2px;
        height: 10px;
        background-color: white;
        top: 5px;
        left: 9px;
        display: ${(props) => (props.checked ? 'block' : 'none')};
    }

    &:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background-color: white;
        top: 9px;
        left: 5px;
        display: ${(props) => (props.checked ? 'block' : 'none')};
        transform: rotate(45deg);
    }
`;


const SelectedFilters = styled.div`
    margin-top: 1%;
    margin-bottom: 1%;
    height: 50px;
    font-weight: bold;
    color: #ffffff; 
    display: flex;
    flex-wrap: wrap;
`;

const FilterBox = styled.button`
    position: relative;
    background-color:  #ee8f00; 
    color: white;
    height: 50%;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 14px;
`;

interface GaleriaPlayersProps {
    fotos: Foto[];
    fotosPopulares: Foto[];
    aoFotoSelecionada: (foto: Foto) => void;
    aoAlternarFavorito: (foto: Foto) => void;
}

interface ChampionshipItem {
    id: string;  
    nome: string;
    ranking: String;
    inTorneio: Boolean;
    prize: Number;
    img: null,
    winner: String,
    teams: Team[],
    partidas:Match[],
  }

  interface Team {
    id: string;  
    name: string;
    logo: String;
    game: Boolean;
    saldo: String;
    wins: Number;
    loses: String;
    inGame: Boolean;
    participants:[];
    leader: String;
  }

  interface Match {
    id: string;  
    matchId: string;
  }

const GaleriaPlayers: React.FC<GaleriaPlayersProps> = ({
    fotos = [],
    fotosPopulares = [],
    aoFotoSelecionada,
    aoAlternarFavorito,
}) => {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedNacionalidade, setSelectedNacionalidade] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [selectedSortValue, setSelectedSortValue] = useState<string | null>(null);
    const [selectedSortDate, setSelectedSortDate] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [data, setData] = useState<ChampionshipItem[]>([]);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleStatusChange = (status: string) => {
        setSelectedStatus(selectedStatus === status ? null : status);
    };

    const handleNacionalidadeChange = (nacionalidade: string) => {
        setSelectedNacionalidade(selectedNacionalidade === nacionalidade ? null : nacionalidade);
    };

    const handleTierChange = (tier: string) => {
        setSelectedTier(selectedTier === tier ? null : tier);
    };

    const handleSortValueChange = (sort: string) => {
        setSelectedSortValue(selectedSortValue === sort ? null : sort);
    };

    const handleSortDateChange = (sort: string) => {
        setSelectedSortDate(selectedSortDate === sort ? null : sort);
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const ChampionshipService = new championshipService();
  useEffect(() => {
    const fetchMatchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ChampionshipService.consult(); 
        setData(response.data.content); 
        console.log('Dados dos Torneios:', response.data);
      } catch (err) {
        setError('Erro ao buscar as partidas');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, []); 
    const removeFilter = (filter: string) => {
        switch (filter) {
            case 'status':
                setSelectedStatus(null);
                break;
            case 'nacionalidade':
                setSelectedNacionalidade(null);
                break;
            case 'tier':
                setSelectedTier(null);
                break;
            case 'sortValue':
                setSelectedSortValue(null);
                break;
            case 'sortDate':
                setSelectedSortDate(null);
                break;
            default:
                break;
        }
    };

    const fotosFiltradas = fotos.filter((foto) => {
        const statusMatch =
            (selectedStatus === 'emAndamento' && foto.emAndamento) ||
            (selectedStatus === 'finalizado' && !foto.emAndamento) ||
            selectedStatus === null;

        const nacionalidadeMatch =
            (selectedNacionalidade === 'brasileira' && foto.nacionalidade === 'brasileira') ||
            (selectedNacionalidade === 'argentina' && foto.nacionalidade === 'argentina') ||
            selectedNacionalidade === null;

        const tierMatch =
            (selectedTier === 'tier1' && foto.tier === 1) ||
            (selectedTier === 'tier2' && foto.tier === 2) ||
            selectedTier === null;

        return statusMatch && nacionalidadeMatch && tierMatch;
    });

    // Ordenação dos resultados
    let fotosOrdenadas = [...fotosFiltradas];
    if (selectedSortValue === 'valorCrescente') {
        fotosOrdenadas.sort((a, b) => a.valor - b.valor);
    } else if (selectedSortValue === 'valorDecrescente') {
        fotosOrdenadas.sort((a, b) => b.valor - a.valor);
    }

    if (selectedSortDate === 'maisRecente') {
        fotosOrdenadas.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    } else if (selectedSortDate === 'maisAntigo') {
        fotosOrdenadas.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    }

    const selectedFilters = [
        selectedStatus && 'Status: ' + selectedStatus,
        selectedNacionalidade && 'Nacionalidade: ' + selectedNacionalidade,
        selectedTier && 'Tier: ' + selectedTier,
        selectedSortValue && 'Sort Value: ' + selectedSortValue,
        selectedSortDate && 'Sort Date: ' + selectedSortDate,
    ].filter(Boolean);

    return (
        <>
            <Title>{fotosOrdenadas.length > 0 ? "Tournaments" : "Filtered Tournaments"}</Title>

            <FilterContainer>
                <SelectContainer>
                    <SelectButton onClick={toggleDropdown}>
                        Filters
                    </SelectButton>
                    
                    <Dropdown open={dropdownOpen}>
                        <div>
                            <strong>Status:</strong>
                            <div>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedStatus === 'emAndamento'} onClick={() => handleStatusChange('emAndamento')} />
                                    In Progress
                                </CheckboxLabel>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedStatus === 'finalizado'} onClick={() => handleStatusChange('finalizado')} />
                                    Finished
                                </CheckboxLabel>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <strong>Nacionalidade:</strong>
                            <div>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedNacionalidade === 'brasileira'} onClick={() => handleNacionalidadeChange('brasileira')} />
                                    Brazilian
                                </CheckboxLabel>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedNacionalidade === 'argentina'} onClick={() => handleNacionalidadeChange('argentina')} />
                                    Argentine
                                </CheckboxLabel>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <strong>Tier:</strong>
                            <div>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedTier === 'tier1'} onClick={() => handleTierChange('tier1')} />
                                    Tier 1
                                </CheckboxLabel>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedTier === 'tier2'} onClick={() => handleTierChange('tier2')} />
                                    Tier 2
                                </CheckboxLabel>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <strong>Sort By:</strong>
                            <div>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedSortValue === 'valorCrescente'} onClick={() => handleSortValueChange('valorCrescente')} />
                                    Value Ascending
                                </CheckboxLabel>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedSortValue === 'valorDecrescente'} onClick={() => handleSortValueChange('valorDecrescente')} />
                                    Value Descending
                                </CheckboxLabel>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedSortDate === 'maisRecente'} onClick={() => handleSortDateChange('maisRecente')} />
                                    Most Recent
                                </CheckboxLabel>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedSortDate === 'maisAntigo'} onClick={() => handleSortDateChange('maisAntigo')} />
                                    Oldest
                                </CheckboxLabel>
                            </div>
                        </div>
                    </Dropdown>
                    <SelectedFilters>
                        Selected Filters: 
                        {selectedFilters.length > 0 ? (
                            selectedFilters.map((filter, index) => (
                                <FilterBox key={index} onClick={() => removeFilter(filter.split(': ')[0].toLowerCase())}>
                                    {filter}
                                </FilterBox>
                            ))
                        ) : (
                            ' None'
                        )}
                    </SelectedFilters>
                </SelectContainer>
            </FilterContainer>

            <GaleryContainer>
                <ImagesContainer>
                    {fotosOrdenadas.map((foto) => (
                        <Imagem 
                            aoZoomSolicitado={aoFotoSelecionada}
                            aoAlternarFavorito={aoAlternarFavorito}
                            key={foto.id}
                            foto={foto}
                        />
                    ))}
                </ImagesContainer>

                <PopularContainer>
                    <Populares 
                        fotos={fotosPopulares} 
                        aoZoomSolicitado={aoFotoSelecionada}
                        aoAlternarFavorito={aoAlternarFavorito}
                    />
                </PopularContainer>
            </GaleryContainer>
        </>
    );
};

export default GaleriaPlayers;
