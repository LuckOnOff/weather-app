import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => {

    return (
        <Container>
            <SpinnerItem />
        </Container>
    )
};

export default Spinner;

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;
    margin: 0.7rem 0.7rem 0.7rem 0;
`;

const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const SpinnerItem = styled.div`
    border: 0.15rem solid rgba(0, 0, 0, 0.1);
    border-top: 0.2rem solid #3498db;
    border-radius: 50%;
    width: 2.8rem;
    height: 2.8rem;
    animation: ${spin} 1s linear infinite;
`;