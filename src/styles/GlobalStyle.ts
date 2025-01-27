import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

a {
    text-decoration: none;
}

li {
    list-style-type: none;
}

button {
    cursor: pointer;
    font-family: inherit;
    border: none;
}

#root {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: rgb(18, 85, 102);
}
  
@media (max-width: 768px) {
    html {
      font-size: 14px;
    }
}
  
@media (max-width: 576px) {
    html {
      font-size: 13px;
    }
}

@media (min-width: 2000px) {
    html {
      font-size: 20px;
    }
}
`;