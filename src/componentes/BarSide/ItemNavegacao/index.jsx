import {styled} from "styled-components"


const ItemListaEstilizada = styled.li`
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 30px;
    cursor: pointer;
   color: ${ props => props.$ativo ? '#88e2f8' : '#D9D9D9'};
   font: ${ props => props.$ativo ? 'GandhiSansBold' : 'GandhiSansRegular'};
    display: flex;
    align-items: center;
    gap: 22px;

`



const ItemNavegacao = ({children, iconeAtivo, iconeInativo, ativo = false, onClick}) => {
    return <ItemListaEstilizada $ativo={ativo} onClick={onClick}>
    <img src={ativo ? iconeAtivo : iconeInativo} alt="" />
    {children}

    </ItemListaEstilizada>

}

export default ItemNavegacao