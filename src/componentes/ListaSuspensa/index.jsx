import styled from "@emotion/styled"
import { useState } from "react"
import { ItemListaSuspensaEstilizado } from "./ItemListaSuspensaEstilizada"
import { ListaSuspensaEstilizada } from "./ListaSuspensaEstillizada"
import { useFormikContext } from "formik"

export const ListaSupensa = ({ titulo, opcoes }) => {
    const [estaAberta, alternarVisibilidade] = useState(false)
    const { setFieldValue, values } = useFormikContext();
    const [opcaoFocada, setOpcaoFocada] = useState(null);

    const manipularTeclaDoTeclado = (evento) => {
        alternarVisibilidade(true)
        switch (evento.key) {
            case 'ArrowDown':
                evento.preventDefault();
                setOpcaoFocada(focoAntigo => {
                    if (focoAntigo == null) {
                        return 0;
                    }
                    if (focoAntigo === (opcoes.length - 1)) {
                        return opcoes.length - 1
                    }
                    return focoAntigo += 1
                })
                break;
            case 'ArrowUp':
                evento.preventDefault();
                setOpcaoFocada(focoAntigo => {
                    if (!focoAntigo) {
                        return 0;
                    }
                    return focoAntigo -= 1
                })
                break;
            case 'Enter':
                evento.preventDefault();
                setOpcaoFocada(null)
                alternarVisibilidade(false)
                onChange(opcoes[opcaoFocada])
                break;
            case 'Tab':
                setOpcaoFocada(null)
                alternarVisibilidade(false)
                break;
            case 'Escape':
                evento.preventDefault();
                setOpcaoFocada(null)
                alternarVisibilidade(false)
                break;
            default:
                break;
        }
    }

    return (<LabelEstilizada>
        {titulo}
        <BotaoEstilizado
            estaAberta={estaAberta}
            onClick={() => alternarVisibilidade(!estaAberta)}
            onKeyDown={manipularTeclaDoTeclado}
            type='button'
        >
            <div>
                {values.estado ? values.estado : 'Selecione'}
            </div>
            <div>
                <span>{estaAberta ? '▲' : '▼'}</span>
            </div>
        </BotaoEstilizado>
        {estaAberta && <ListaSuspensaEstilizada>
            {opcoes.map((opcao, index) => <ItemListaSuspensaEstilizado
                key={opcao.value}
                focoAtivo={index === opcaoFocada}
                onClick={() => setFieldValue('estado', opcao.text)}
            >
                {opcao.text}
            </ItemListaSuspensaEstilizado>)}
        </ListaSuspensaEstilizada>}
    </LabelEstilizada>)
}