import React, { useState } from "react";
import { styled } from "styled-components";
import ItemNavegacao from "./ItemNavegacao";
import { useNavigate } from "react-router-dom";

const ListaEstilizada = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 212px;
`;

const BarSide: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const [usuarioEstaLogado, setUsuarioLogado] = useState<boolean>(token != null);

    console.log(usuarioEstaLogado);

    const navigate = useNavigate(); // Hook useNavigate para navegação

    const efetuarLogout = () => {
        console.log("Logout clicado"); // Verifica se a função está sendo chamada
        sessionStorage.removeItem('token');
        localStorage.removeItem('login');
        navigate('/login');
    };

    return (
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
                        onClick={() => navigate('/riot')}
                    >
                        Riot
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/icones/mais-vistas-ativo.png"
                        iconeInativo="/icones/mais-vistas-inativo.png"
                        onClick={() => navigate('/adm')}
                    >
                        ApiKey
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/icones/mais-vistas-ativo.png"
                        iconeInativo="/icones/mais-vistas-inativo.png"
                        onClick={() => navigate('/perfil')}
                    >
                        Perfil
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/icones/mais-vistas-ativo.png"
                        iconeInativo="/icones/mais-vistas-inativo.png"
                        onClick={() => navigate('/mp')}
                    >
                        Mercado Pago
                    </ItemNavegacao>
                    <ItemNavegacao
                        iconeAtivo="/icones/mais-vistas-ativo.png"
                        iconeInativo="/icones/mais-vistas-inativo.png"
                        onClick={efetuarLogout}
                    >
                        Logout
                    </ItemNavegacao>
                </ListaEstilizada>
            </nav>
        </aside>
    );
};

export default BarSide;
