import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import Display from './components/Display.tsx';
import { useAppSelector } from './hooks/useAppSelector.ts';
import NetworkError from './components/errors/NetworkError.tsx';
import ApiError from './components/errors/ApiError.tsx';
import networkErrorImg from './assets/img/noWifi.svg';

function App() {
    const successfully = useAppSelector((state) => state.weather.successfully);
    const error = useAppSelector((state) => state.weather.error);

    useEffect(() => {
        const img = new Image();
        
        img.src = networkErrorImg; // предзагрузка изображения для отображения в компоненте NetworkError
    }, []);

    return (
      <>
        <GlobalStyle />
        <NetworkError />
        <ApiError />
        <Container 
          $successfully={successfully} 
          $error={error}
        >
          <Display />
        </Container>
      </>
    );
}

export default App;

interface ContainerProps {
    $successfully: boolean | null;
    $error: string | null;
};

const Container = styled.section<ContainerProps>`
    width: ${({ $successfully }) => $successfully ? '35rem' : ''};
    min-height: ${({ $successfully, $error }) => $successfully ? '26.5rem' : $error ? '26.5rem' : '3.7rem'};
    height: 100%;
    background: white;
    border-radius: 15px;
    padding: 0.9rem;
    margin: 1rem;
    transition: 0.5s linear;
`;