import React, { useRef } from "react";
import styled from "styled-components";
import SliderContent from "./SliderContent.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import SliderArrows from "./SliderArrows.tsx";

const WeatherForecastSlider = () => {
    const sliderSection = useRef<HTMLDivElement | null>(null);
    const { selectedForecast } = useAppSelector((state) => state.weather);

    if (!selectedForecast) return null;

    const todayLength = selectedForecast.length;

    return (
        <Container>
            <SliderArrows sliderSection={sliderSection} />
            <SliderContainer ref={sliderSection} $todayLength={todayLength}>
                <SliderContent />
            </SliderContainer>
        </Container>
    );
};

export default WeatherForecastSlider;

interface TodayLength {
    $todayLength: number;
};

const Container = styled.section`
    display: flex;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    width: 100%;

    @media (max-width: 480px) {
        margin-bottom: 0;
    }
`;

const SliderContainer = styled.section<TodayLength>`
    display: flex;
    overflow-x: hidden;
    scrollbar-width: none;
    scroll-behavior: smooth;
    width: 100%;
    gap: 2rem;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 1.5rem;
        overflow-x: visible;
    }

    ${({ $todayLength }) => $todayLength <= 3 && `justify-content: center;`}
`;