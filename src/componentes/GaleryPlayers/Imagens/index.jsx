import React from "react";
import { styled } from "styled-components";
import BotaoIcone from "../../BotaoIcone";

const Figure = styled.figure`
    width: ${props => props.$expandida ? '90%' : '460px'};
    max-width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    & > img {
        max-width: 100%;
        border-radius: 20px 20px 0 0;
    }
    figcaption {
        background-color: #001634;
        border-radius: 0px 0px 20px 20px;
        color: white;
        box-sizing: border-box;
        padding: 12px;
        h3 {
            font-family: 'GandhiSansBold';
        }
        h4 {
            flex-grow: 1;
        }
        h3, h4 {
            margin: 0;
            font-size: 16px;
        }
    }
`;

const Rodape = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BotaoParticipar = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
`;

const Imagem = ({ foto, expandida = false, aoZoomSolicitado }) => {

    const participar = () => {
        // Chamada ao endpoint para participar no campeonato
        fetch(`/api/campeonato/${foto.campeonatoId}/inscrever`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: foto.userId })
        })
        .then(response => {
            if (response.ok) {
                alert("Inscrição realizada com sucesso!");
            } else {
                alert("Erro ao realizar a inscrição.");
            }
        })
        .catch(error => {
            console.error("Erro ao realizar a inscrição:", error);
            alert("Erro ao realizar a inscrição. Verifique o console para mais detalhes.");
        });
    };

    return (
        <Figure $expandida={expandida} id={`foto-${foto.id}`}>
            <img src={foto.path} alt={foto.alt} />
            <figcaption>
                <h3>{foto.titulo}</h3>
                <Rodape>
                    <h4>{foto.fonte}</h4>
                    {!expandida && (
                        <BotaoIcone aria-hidden={expandida} onClick={() => aoZoomSolicitado(foto)}>
                            <img src="/icones/expandir.png" alt="Icone de expandir" />
                        </BotaoIcone>
                    )}
                    {expandida && (
                        <BotaoParticipar onClick={participar}>
                            Participar
                        </BotaoParticipar>
                    )}
                </Rodape>
            </figcaption>
        </Figure>
    );
};

export default Imagem;
