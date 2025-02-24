import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import SliderContent from "./SliderContent.tsx";
import SliderArrows from "./SliderArrows.tsx";
import ShowPrevHours from "./ShowPrevHours.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const WeatherForecastSlider = () => {
    const sliderSection = useRef<HTMLDivElement | null>(null);

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    const [showAllHours, setShowAllHours] = useState<boolean>(false);

    const localTime = useAppSelector((state) => state.weather.localTime);
    const currentHour = Number(localTime?.startsWith('0') ? localTime?.slice(1, 2) : localTime?.slice(0, 2));

    const selectedDay = useAppSelector((state) => state.weather.selectedDay);
    
    useEffect(() => { 
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []); 
    
    const isMobile = screenWidth <= 480;

    const handleClickShowAllHours = () => {
        setShowAllHours(!showAllHours);
    };

    const isDaySelected = selectedDay === null;

    return (
        <Container $isZeroHour={currentHour === 0} $selectedDay={isDaySelected} >
            <SliderArrows 
                sliderSection={sliderSection} 
                currentHour={currentHour} 
            />
            {isMobile && currentHour !== 0 && isDaySelected && (
                <ShowPrevHours 
                    onClickShowAllHours={handleClickShowAllHours} 
                    showAllHours={showAllHours} 
                />
            )}
            <SliderContainer ref={sliderSection} $showAllHours={showAllHours} >
                <SliderContent 
                    isMobile={isMobile} 
                    showAllHours={showAllHours}
                    currentHour={currentHour} 
                    selectedDay={selectedDay}
                    isDaySelected={isDaySelected}
                />
            </SliderContainer>
        </Container>
    );
};

export default WeatherForecastSlider;

interface ContainerProps {
    $isZeroHour: boolean;
    $selectedDay: boolean;
};

const Container = styled.section<ContainerProps>`
    display: flex;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    width: 100%;
    position: relative;

    @media (max-width: 480px) {
        margin-bottom: 0;

        ${({ $isZeroHour, $selectedDay }) => (!$isZeroHour && $selectedDay) && `
            margin-top: 5rem;
        `}
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-0.5rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const SliderContainer = styled.section<{ $showAllHours: boolean }>`
    display: flex;
    overflow-x: hidden;
    scrollbar-width: none;
    scroll-behavior: smooth;
    width: 100%;
    gap: 2rem;

    ${({ $showAllHours }) => $showAllHours && css`
        animation: ${fadeIn} 0.5s ease-in-out;
    `}

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 1.5rem;
        overflow-x: visible;
    }
`;