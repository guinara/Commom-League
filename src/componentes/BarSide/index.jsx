import { styled } from "styled-components"
import ItemNavegacao from "./ItemNavegacao"


const ListaEstilizada = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 212px;
`

const BarSide = () => {
return(
<aside>
<nav>
<ListaEstilizada>
    <ItemNavegacao
        iconeAtivo="/icones/home-ativo.png"
        iconeInativo="/icones/home-inativo.png"
        ativo={true}


>

        Início
</ItemNavegacao>

<ItemNavegacao
        iconeAtivo="/icones/mais-vistas-ativo.png"
        iconeInativo="/icones/mais-vistas-inativo.png"


>

        Campeonatos
</ItemNavegacao>

<ItemNavegacao
        iconeAtivo="/icones/mais-vistas-ativo.png"
        iconeInativo="/icones/mais-vistas-inativo.png"


>

        Ranking
</ItemNavegacao>

<ItemNavegacao
        iconeAtivo="/icones/mais-vistas-ativo.png"
        iconeInativo="/icones/mais-vistas-inativo.png"


>

        Notificações
</ItemNavegacao>

<ItemNavegacao
        iconeAtivo="/icones/mais-vistas-ativo.png"
        iconeInativo="/icones/mais-vistas-inativo.png"


>

        Mensagens
</ItemNavegacao>


</ListaEstilizada>

</nav>

</aside>


)


}

export default BarSide
   
