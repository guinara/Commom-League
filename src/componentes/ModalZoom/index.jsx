import { styled } from "styled-components"
import Imagem from "../GaleryPlayers/Imagens"
import BotaoIcone from "../BotaoIcone"



const ModalZoom = ({ foto, aoFechar}) => {
    return (
        <>
            {foto && <>
                <Overlay />
                <DialogEstilizado open={!!foto} onClose={aoFechar}>
                    <Imagem foto={foto} expandida={true} />
                    <form method="dialog">
                        <BotaoIcone formMethod="dialog">
                            <img src="/icones/fechar.png" alt="Icone de fechar" />
                        </BotaoIcone>
                    </form>
                </DialogEstilizado>
            </>}
        </>
    )
}

export default ModalZoom