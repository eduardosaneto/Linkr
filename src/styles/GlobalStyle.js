import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle `
    body {
        background: #333;
        font-family: 'Lato', sans-serif;
    }
    
    *::-webkit-scrollbar {
        display: none;
    }
`;

export default GlobalStyle;