import styled from 'styled-components';

export const widgets = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 20px;
    border-radius: 10px;
`

export const leftRight = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const title = styled.span`
    font-weight: bold;
    font-size: 14px;
    color: gray;
`

export const counter = styled.span`
    font-size: 28px;
    font-weight: 300;
`

export const icon = styled.img`
    font-size: 18px;
    padding: 5px;
    background-color: purple;
    border-radius: 5px;
    align-self: flex-end;
`

