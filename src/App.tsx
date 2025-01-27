import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import Display from './components/Display.tsx';

function App() {
    return (
      <>
        <GlobalStyle />
        <Container>
          <Display />
        </Container>
      </>
    );
}

export default App;

const Container = styled.section`
    overflow: hidden;
    height: 3.7rem;
    background: white;
    border-radius: 15px;
    padding: 0.9rem;
    transition: 0.5s linear;
`;