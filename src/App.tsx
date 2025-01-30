import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import Display from './components/Display.tsx';
import { useAppSelector } from './hooks/useAppSelector.ts';

function App() {
    const { successfully, error } = useAppSelector((state) => state.weather);

    return (
      <>
        <GlobalStyle />
        <Container $successfully={successfully} $error={error}>
          <Display />
        </Container>
      </>
    );
}

export default App;

const Container = styled.section<{ $successfully: boolean | null; $error: string | null }>`
    overflow: hidden;
    width: ${({ $successfully }) => $successfully ? '35rem' : 'auto'};
    min-height: ${({ $successfully, $error }) => $successfully ? '26.5rem' : $error ? '26.5rem' : '3.7rem'};
    height: 100%;
    background: white;
    border-radius: 15px;
    padding: 0.9rem;
    margin: 1rem;
    transition: 0.5s linear;
`;