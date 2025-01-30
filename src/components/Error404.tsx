import React from "react";
import styled, { css } from "styled-components";
import img404 from "../assets/img/error404.svg";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import { Keyframes } from "styled-components/dist/types";
import { FadeInProp } from "../types/FadeInProp.ts";

const Error404 = ({ fadeIn }: FadeInProp) => {
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

interface ContainerProps {
    $error: string | null;
    $fadeIn: Keyframes;
};

const Container = styled.section<ContainerProps>`
    display: ${({ $error }) => $error ? 'flex' : 'none'};
    opacity: 0;
    scale: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s linear;
    padding: 0.5rem;

   ${({ $error, $fadeIn }) => $error &&
        css` // для интерполяции
            animation: 0.5s ${$fadeIn} forwards;
    `}
`;

const ImgError404 = styled.img`
    width: 20rem;
`;

const ErrorText = styled.p`
    text-align: center;
    width: 17.5rem;
`;