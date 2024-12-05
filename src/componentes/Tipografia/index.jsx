import styled from "@emotion/styled"

export const Tipografia = ({ variante, componente, children }) => {
    const tag = componentes[componente]
    const ComponenteUtilizado = styled[tag]`${estilos[variante]}`
    return (<ComponenteUtilizado>
        {children}
    </ComponenteUtilizado>)
}