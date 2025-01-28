import React from "react";
import styled, { css } from "styled-components";
import img404 from "../img/error404.svg";
import { Keyframes } from "styled-components/dist/types";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const Error404 = ({ fadeIn }: Error404Props) => {
    const { error } = useAppSelector((state) => state.weather);

    return (
        <Container $error={error} $fadeIn={fadeIn}>
            <ImgError404 src={img404} alt="Произошла ошибка 404" />
            <ErrorText>
                Упс, неправильно введена страна или город
            </ErrorText>
        </Container>
    )
};

export default Error404;

interface Error404Props {
    fadeIn: Keyframes;
};

const Container = styled.section<{ $error: string | null; $fadeIn: Keyframes }>`
    display: ${({ $error }) => $error ? 'flex' : 'none'};
    opacity: 0;
    scale: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;

   ${({ $error, $fadeIn }) => $error &&
        css` // для интерполяции
            animation: 0.5s ${$fadeIn} forwards;
            animation-delay: 0.5s;
    `}
`;

const ImgError404 = styled.img`
    width: 20rem;
`;

const ErrorText = styled.p`
    text-align: center;
    width: 17.5rem;
`;