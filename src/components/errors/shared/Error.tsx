import React, { useEffect } from "react";
import styled from "styled-components";

const Error = ({ img, textOne, textTwo, alt, error }: ErrorProps) => {
    useEffect(() => {
        if (error) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [error]);

    if (!error) return null;

    return (
        <>
            <Container>
                <CloseComponent onClick={() => window.location.reload()}>&#215;</CloseComponent>
                <Img src={img} alt={alt} />
                <Text>{textOne}</Text>
                <Text>{textTwo}</Text>
            </Container>
            <BackgroundBlur />
        </>
    )
};

export default Error;

interface ErrorProps {
    img: string;
    textOne: string;
    textTwo: string;
    alt: string;
    error: boolean;
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 23rem;
    height: 20rem;
    border-radius: 1rem;
    background: white;
    border: 0.1rem solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    padding: 1rem;
`;

const BackgroundBlur = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: black;
    opacity: 0.5;
`;

const Text = styled.p`
    text-align: center;
    width: 90%;
    line-height: 1.2rem;
`;

const Img = styled.img`
    width: 5rem;
`;

const CloseComponent = styled.button`
    position: absolute;
    right: 0.7rem;
    top: 0.7rem;
    width: 2rem;
    height: 2rem;
    background: black;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
`;