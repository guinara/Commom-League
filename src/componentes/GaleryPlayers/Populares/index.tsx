import React, { useState } from "react";
import { styled } from "styled-components";
import Titulo from "../../Titulo";
import fotos from "./fotos-populares.json"; // Mantendo as imagens do arquivo existente
import { useTranslation } from 'react-i18next';

const ColunaJogadores = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
`;

const Imagem = styled.img`
    max-width: 220px;
    border-radius: 15px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
`;

const Botao = styled.button`
    background-color: #0289b3;
    color: #fff;
    border: none;
    padding: 12px 20px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #02779b;
    }
`;

const BotaoFechar = styled.button`
    background-color: #ff4c4c;
    color: #fff;
    border: none;
    padding: 10px 16px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #e63939;
    }
`;

const BotoesContainer = styled.div`
    text-align: center;
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    z-index: 1000;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
`;

const JogadoresLivres: React.FC = () => {
    const [imagemExpandida, setImagemExpandida] = useState<any | null>(null); // Usar 'any' para simplificação
    const { t } = useTranslation();

    const handleZoom = (foto: any) => {
        setImagemExpandida(foto);
    };

    const closeModal = () => {
        setImagemExpandida(null);
    };

    return (
        <section>
            <Titulo $alinhamento="center">{t('Available Players')}</Titulo>
            <ColunaJogadores>
                {fotos.map((foto: any) => (
                    <div key={foto.id}>
                        <Imagem
                            src={foto.path}
                            alt={foto.alt}
                            onClick={() => handleZoom(foto)}
                        />
                    </div>
                ))}
            </ColunaJogadores>
            <Botao>{t('See More Players')}</Botao>

            {imagemExpandida && (
                <>
                    <Overlay onClick={closeModal} />
                    <Modal>
                        <h2>{imagemExpandida.alt}</h2>
                        <p>{/* Adicione aqui o histórico ou informações adicionais se necessário */}</p>
                        <BotoesContainer>
                            <BotaoFechar onClick={closeModal}>{t('Close')}</BotaoFechar>
                        </BotoesContainer>
                    </Modal>
                </>
            )}
        </section>
    );
};

export default JogadoresLivres;
