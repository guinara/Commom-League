import styled from 'styled-components'

const StyledForm = styled(FormikForm)`
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    label {
        display: block;
        margin-bottom: 10px;
        color: white;
        text-align: left;
        width: 100%;
    }

    input, select {
        width: 95%;
        padding: 8px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        width: 100%;
        padding: 10px;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 8px auto;
    }

    .button-entrar {
        background-color: #007bff;
    }

    .button-cadastro {
        background-color: #28a745;
    }

    .error-message {
        color: red;
        margin-bottom: 10px;
    }

    .logo {
        width: 150px; /* Tamanho da logo */
        margin-bottom: 20px; /* Espaço entre a logo e o formulário */
        margin-right: 2%;
    }
`;