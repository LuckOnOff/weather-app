import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { getWeatherImgFromId } from "../../utils/getWeatherImg.ts";

const WeatherSummary = () => {
    const { data } = useAppSelector((state) => state.weather);

    if (!data || !data.list || data.list.length === 0) {
        return <StyledWeatherSummary>Нет данных о погоде</StyledWeatherSummary>;
    };

    const weatherData = data.list[0];

    const currentTempItem = Math.trunc(weatherData.main.temp);
    const currentTempText = (currentTempItem > 0 ? '+' + currentTempItem : currentTempItem)  +  '°';

    const imgId: number = weatherData.weather[0].id;
    const imgSrc = getWeatherImgFromId(imgId);

    const weatherTypeText: string = weatherData.weather[0].description;

    return (
        <StyledWeatherSummary>
            <WeatherImg src={imgSrc} alt="Погода сейчас" />
                <CurrentTemp>
                    {currentTempText}
                </CurrentTemp>
                <WeatherType>
                    {weatherTypeText}
                </WeatherType>
        </StyledWeatherSummary>
    )
};

export default WeatherSummary;

const StyledWeatherSummary = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    margin-right: 2rem;

    @media (max-width: 440px) {
        margin-right: 0;
    }
`;

const WeatherImg = styled.img`
    width: 14rem;
`;

const WeatherType = styled.p`
    font-size: 1.4rem;
`;

const CurrentTemp = styled.p`
    margin-top: 0.5rem;
    font-size: 2.5rem;
    font-weight: 500;
`;