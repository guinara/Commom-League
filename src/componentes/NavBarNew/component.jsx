import styled from 'styled-components';

export const sideBarContainer = styled.div`
    flex: 1;
    border: 0.5px solid rgb(230, 227, 227);
    min-height: 100vh;
    background-color: white;
`

export const top = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const logo = styled.img`
    width: 100px;
`

export const hr = styled.hr`
    height: 0;
    border: 0.5px solid rgb(230, 227, 227);
`

export const center = styled.div`
    padding: 10px;
`

export const ulIcon = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`

export const Title = styled.p`
    font-size: 10px;
    font-weight: bold;
    color: #999;
    margin-top: 15px;
    margin-bottom: 5px;
`

export const li = styled.li`
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;

&:hover{
    background-color: #ece8ff;
}
`

export const bottom = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`

export const colorOptions = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid;
    cursor: pointer;

`

export const span = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: gray;
    margin-left: 10px;

`