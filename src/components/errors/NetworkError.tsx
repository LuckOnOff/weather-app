import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import networkErrorImg from "../../assets/img/noWifi.svg";

const NetworkError = () => {
    const weatherError = useAppSelector((state) => state.weather.error);
    const placeError = useAppSelector((state) => state.place.error);

    const FailedToFetch = weatherError === "Failed to fetch" || placeError === "Failed to fetch";

    useEffect(() => {
        if (FailedToFetch) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [FailedToFetch]);

    if (!FailedToFetch) return null;

    return (
        <>
            <Container>
                <CloseComponent onClick={() => window.location.reload()}>&#215;</CloseComponent> {/* подумать над функцией в onClick */}
                <Img src={networkErrorImg} alt="отсутствует подключение" />
                <Text>Упс, кажется у вас отсутствует подключение к интернету</Text>
                <Text>Для работы этого приложения требуется подключение к сети интернет</Text>
            </Container>
            <BackgroundBlur />
        </>
    );
};

export default NetworkError;

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
    padding: 0.5rem;
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