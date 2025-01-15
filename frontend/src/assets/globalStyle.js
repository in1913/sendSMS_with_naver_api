import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: ${props => props.theme.background};
        color: ${props => props.theme.color};
        border-color: ${props => props.theme.border};
    }
    button {
        color: #ffffff;
    }
    .form-check-input:checked{
        background-color: #05D686;
        border-color: #05D686;
    }
`;

export default GlobalStyle;
