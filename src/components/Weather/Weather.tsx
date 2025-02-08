import React from "react";
import styled, { css } from "styled-components";
import WeatherSummary from "./WeatherSummary.tsx";
import Spinner from "../UI/Spinner.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { FadeInProp } from "../../types/FadeInProp.ts";
import { Keyframes } from "styled-components/dist/types";
import WeatherDetails from "./WeatherDetails.tsx";
import ForecastSlider from "../ForecastSlider/ForecastSlider.tsx";
import Title from "../Title.tsx";

const SuccessfullyResponse = ({ fadeIn }: FadeInProp) => {
    const { loading, successfully } = useAppSelector((state) => state.weather);

    if(loading) {
        return <Spinner />;
    };

    return (
        <Container $successfully={successfully} $fadeIn={fadeIn}>
            <Title/>
            <BottomContainer>
                <WeatherSummary />
                <WeatherDetails />
            </BottomContainer>
            <ForecastSlider />
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    width: 100%;
    height: 100%;
    opacity: 0;
    scale: 0;
    transition: 0.5s linear;
    position: relative;

     ${({ $successfully, $fadeIn }) => $successfully &&
        css` // для интерполяции
            animation: 0.5s ${$fadeIn} forwards;
    `}

    @media (max-width: 440px) {
        justify-content: center;
    }
`;

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 440px) {
        flex-direction: column;
    }
`;