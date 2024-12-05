import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Foto } from '../../../data/types';
import championshipService from '../../../service/ChampionshipService';
import styled2 from "@emotion/styled";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
    display: flex;
    justify-content: initial;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 100%;
    
`;

const Card = styled.div`
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 20px;
    width: 300px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const ImageModal = styled.img`
    width: 200px;
    height: auto;
    display: block;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    display: block;
`;

const StatusOverlay = styled.div<{ status: boolean }>`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    transition: opacity 0.3s;
    z-index: 1;
`;

const InfoContainer = styled.div`
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const TopModal = styled.div`
  
   
   
   
`;
const TopText = styled.h1`
    position: absolute;
    color: white;
    background-color: #000000ab;
    top: 0px;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
   
    justify-content: flex-start;
   
`;

const Info = styled.p`
    margin: 5px 0;
    font-size: 14px;
    color: #555;
`;

const Value = styled.p`
    display: flex;
    margin: 6px 0;
    font-size: 14px;
    color: #ffffff;

`;

const BadgeBandeira = styled.img`
    position: absolute;
    top: 5%;
    right: 5%;
    width: 20%;
    height: 35%;
`;



const BadgeFichaContainer = styled.div`
    position: absolute;
    top: 65%;
    right: 10%;
    display: flex;
    color: white;
    align-items: center;
`;

const BadgeFicha = styled.img`
    width: 60px;
    height: 60px;
`;

const Counter = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #55baf5;
    margin-left: 5px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

const CloseButton = styled.span`
    position: fixed;
    top: 10px;
    right: 4px;
    color: #ffffff;
    background-color: #b42929;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
    border-radius: 50%;  // Para deixar o botão redondo
    text-align: center;
    cursor: pointer;

    &:hover,
    &:focus {
        color: black;
        background-color: #ff4d4d; /* Cor mais clara quando hover/focus */
        text-decoration: none;
    }
`;

const TeamContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

const Team = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const TeamLogo = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

const TeamName = styled.p`
    flex: 1;
    font-size: 16px;
    color: #333;
`;

const MatchContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

const Match = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const MatchDetails = styled.p`
    font-size: 14px;
    color: #333;
`;

const Modal = styled.div<{ visible: boolean }>`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 8px;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-sizing: border-box;
`;



interface WinnerType {
    id: string;
    name: string;
    imagePath: string;
}

interface MatchType {
    id: string;
    details: string;
}

interface ChampionshipItem {
    id: string;
    qntChipsPerPlayer: string;
    status: string;
    winner: WinnerType[];
}

interface ImagemProps {
    foto: Foto;
    aoZoomSolicitado: (foto: Foto) => void;
    aoAlternarFavorito: (foto: Foto) => void;
}
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
const Title = styled.h2`
    margin: 20px 10px;
    color: white;
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


export const ItemDetails = styled.div`
  
  flex-direction: column;
  p {
    font-size: 16px;
    color: #333;
    
    strong {
      color: #000;
    }
  }

  button {
    background-color: #055eb1;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #122a49;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;




const Imagem: React.FC<ImagemProps> = ({ foto, aoZoomSolicitado, aoAlternarFavorito }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ChampionshipItem | null>(null);
    const [data, setData] = useState<ChampionshipItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedNacionalidade, setSelectedNacionalidade] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [selectedSortValue, setSelectedSortValue] = useState<string | null>(null);
    const [selectedSortDate, setSelectedSortDate] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const { t, i18n } = useTranslation();
    const ChampionshipService = new championshipService();

    const toggleModal = (item: ChampionshipItem | null) => {
        setModalVisible(!modalVisible);
        setSelectedItem(item); // Atualiza o item exibido no modal
    };
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

    useEffect(() => {
        const fetchMatchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await ChampionshipService.consult();
                setData(response.data); 
                console.log(response.data);
            } catch (err) {
                setError('Erro ao buscar os dados do campeonato');
            } finally {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, []);

    const ButtonLogin = styled2.button`
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  left: 2%;
  bottom: 2%;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  overflow: hidden;
  padding: 0 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:focus {
    box-shadow: #3c4fe0 0 0 0 1.5px inset,
      rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
      #3c4fe0 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
      #3c4fe0 0 -3px 0 inset;
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: #3c4fe0 0 3px 7px inset;
    transform: translateY(2px);
  }
`;


    const fotosFiltradas = data.filter((item) => {
        const statusMatch =
            (selectedStatus === 'emAndamento' && !item.status) ||
            (selectedStatus === 'finalizado' && item.status) ||
            selectedStatus === null;
    
        return statusMatch;
    });
    
    // Ordenação dos resultados
    let fotosOrdenadas = [...fotosFiltradas];
    

    
    const selectedFilters = [
        selectedStatus && `${t("Status")}: ${selectedStatus}`,
    ].filter(Boolean);
    
    return (
        <>
            <Title>{fotosOrdenadas.length > 1 ? t("Tournaments") : t("Filtered Tournaments") }</Title>
    
            <FilterContainer>
                <SelectContainer>
                    <SelectButton onClick={toggleDropdown}>
                        {t("Filters")}
                    </SelectButton>
                    
                    <Dropdown open={dropdownOpen}>
                        <div>
                            <strong>{t("Status")}:</strong>
                            <div>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedStatus === 'emAndamento'} onClick={() => handleStatusChange('emAndamento')} />
                                    {t("Ongoing")}
                                </CheckboxLabel>
                                <CheckboxLabel>
                                    <StyledCheckbox checked={selectedStatus === 'finalizado'} onClick={() => handleStatusChange('finalizado')} />
                                    {t("Finished")}
                                </CheckboxLabel>
                            </div>
                      
                       
                        </div>
                    </Dropdown>
    
                    <SelectedFilters>
                        {t("Selected Filters")}: 
                        {selectedFilters.length > 0 ? (
                            selectedFilters.map((filter, index) => (
                                <FilterBox key={index} onClick={() => removeFilter(filter.split(': ')[0].toLowerCase())}>
                                    {filter}
                                </FilterBox>
                            ))
                        ) : (
                            ''
                        )}
                    </SelectedFilters>
                </SelectContainer>
            </FilterContainer>
    
            <Container>
                {fotosOrdenadas.map((item) => (
                    <Card key={item.id}>
                        <Image
                            src={`../../../../public/imagens/galeria/foto-5.png`}
                            alt=""
                            onClick={() => toggleModal(item)} // Passa o item para o modal
                        />
                        <StatusOverlay status={item.status}>
                            {item.status ? t("Ongoing") : t("Finished")}
                        </StatusOverlay>
                        <InfoContainer>
                            <InfoColumn>
                                <Info><strong>{item.id}</strong></Info>
                                <Value> Chips por Player: {item.qntChipsPerPlayer}</Value>
                            </InfoColumn>
                            <BadgeFichaContainer>
                                <ConfirmationNumberIcon/>
                                <Counter>{item.qntChipsPerPlayer} x</Counter>
                            </BadgeFichaContainer>
                        </InfoContainer>
                        <Value>
            
                            </Value>
                    </Card>
                ))}
    
         
             
            </Container>
        </>
    );
};

export default Imagem;
