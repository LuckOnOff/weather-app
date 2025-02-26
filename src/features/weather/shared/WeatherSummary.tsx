import React from "react";
import styled from "styled-components";

const WeatherSummary = ({ img, temp, description, marginRight }: WeatherSummaryProps) => {
    
    return (
        <StyledWeatherSummary $marginRight={marginRight}>
            <WeatherImg src={img} alt="погода сейчас" />
            <CurrentTemp>{temp}</CurrentTemp>
            <WeatherType>{description}</WeatherType>
        </StyledWeatherSummary>
    );
};

export default WeatherSummary;

interface WeatherSummaryProps {
    img: string;
    temp: string;
    description: string;
    marginRight: boolean;
};

const StyledWeatherSummary = styled.div<{ $marginRight: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    margin-right: ${({ $marginRight }) => $marginRight ? '2rem' : '0'};

    @media (max-width: 480px) {
        margin-right: 0;
    }
`;

const WeatherImg = styled.img`
    width: 14rem;
`;

const WeatherType = styled.p`
    font-size: 1.4rem;
    width: 18rem;
    text-align: center;
    word-break: break-word;
`;

const CurrentTemp = styled.p`
    margin-top: 2rem;
    font-size: 2.5rem;
    font-weight: 600;
`;