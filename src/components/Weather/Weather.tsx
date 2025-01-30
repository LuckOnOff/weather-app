import React from "react";
import styled, { css } from "styled-components";
import WeatherSummary from "./WeatherSummary.tsx";
import Spinner from "../UI/Spinner.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { FadeInProp } from "../../types/FadeInProp.ts";
import { Keyframes } from "styled-components/dist/types";
import WeatherDetails from "./WeatherDetails.tsx";

const SuccessfullyResponse = ({ fadeIn }: FadeInProp) => {
    const { data, loading, successfully } = useAppSelector((state) => state.weather);

    if (loading) {
        return <Spinner />;
    };

    if (!data) {
        return null;
    };

    return (
        <Container $successfully={successfully} $fadeIn={fadeIn}>
            <WeatherSummary />
            <WeatherDetails />
        </Container>
    );
};

export default SuccessfullyResponse;

interface ContainerProps {
    $successfully: boolean | null;
    $fadeIn: Keyframes;
};

const Container = styled.section<ContainerProps>`
    display: ${({ $successfully }) => $successfully ? 'flex' : 'none'};
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    width: 100%;
    height: 100%;
    opacity: 0;
    scale: 0;
    transition: 0.5s linear;

     ${({ $successfully, $fadeIn }) => $successfully &&
        css` // для интерполяции
            animation: 0.5s ${$fadeIn} forwards;
    `}

    @media (max-width: 440px) {
        justify-content: center;
    }
`;