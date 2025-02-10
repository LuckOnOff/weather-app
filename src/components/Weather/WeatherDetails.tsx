import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { getWindDirection } from "../../utils/getWindDirection.ts";
import cloudinessImg from "../../assets/img/cloudiness.svg";
import humidityImg from "../../assets/img/humidity.svg";
import pressureImg from "../../assets/img/pressure.svg";
import windSpeedImg from "../../assets/img/wind.svg";
import arrowWindDirection from "../../assets/img/windDirection.svg";
import precipitation from "../../assets/img/precipitation.svg";

const WeatherDetails = () => {
    const selectedForecast = useAppSelector((state) => state.weather.selectedForecast);
    const activeIndex = useAppSelector((state) => state.weather.activeIndex);

    if (!selectedForecast?.length) {
        return null;
    }

    const weatherData = selectedForecast[activeIndex] ?? selectedForecast[0];
    const { main, wind, clouds, pop } = weatherData;

    const currentTempFeelsLikeItem = Math.trunc(main.feels_like);
    const currentTempFeelsLikeText =
        (currentTempFeelsLikeItem > 0 ? "+" + currentTempFeelsLikeItem : currentTempFeelsLikeItem) + "°";

    const { windDirection, transformDeg } = getWindDirection(wind.deg);
    const windSpeedText = wind.speed.toFixed(1) + " м/с, " + windDirection;
    const gustWindSpeed = wind.gust?.toFixed(1) + ' м/с' || "нет данных";

    const humidityText = main.humidity + "%";
    const pressureText = Math.round(main.grnd_level * 0.750062) + " мм. рт. ст.";
    const precipitationText = pop * 100 + "%";
    const cloudinessText = clouds.all + "%";

    const repeatDetailsElements = [
        { id: 0, title: "влажность", src: humidityImg, alt: "Влажность", text: humidityText },
        { id: 1, title: "давление на уровне земли", src: pressureImg, alt: "Давление", text: pressureText },
        { id: 2, title: "вероятность осадков", src: precipitation, alt: "Вероятность осадков", text: precipitationText },
        { id: 3, title: "облачность", src: cloudinessImg, alt: "Облачность", text: cloudinessText },
    ];

    if (!selectedForecast) {
        return <Details>Нет данных о погоде</Details>;
    };

    return (
        <Details>
            <DetailsList>
                <DetailsListItem>
                    <ItemSpan>
                        ощущается как <TempFeelsLikeSpan>{currentTempFeelsLikeText}</TempFeelsLikeSpan>
                    </ItemSpan>
                </DetailsListItem>
                <DetailsListItem title="скорость ветра">
                    <WindSpeedContainer>
                        <ItemImg src={windSpeedImg} alt="Скорость ветра" />
                        <ItemSpan>
                            {windSpeedText}
                            <ArrowWindDirection src={arrowWindDirection} alt="Направление ветра" $transformDeg={transformDeg} />
                        </ItemSpan>
                    </WindSpeedContainer>
                    <GustWindSpeedP>порывы до {gustWindSpeed}</GustWindSpeedP>
                </DetailsListItem>
                {repeatDetailsElements.map((item) => (
                    <DetailsListItem key={item.id} title={item.title}>
                        <ItemImg src={item.src} alt={item.alt} />
                        <ItemSpan>{item.text}</ItemSpan>
                    </DetailsListItem>
                ))}
            </DetailsList>
        </Details>
    );
};

export default WeatherDetails;

const Details = styled.div`
    display: flex;
    height: 100%;
    margin-top: 1rem;

    @media (max-width: 440px) {
        width: 100%;
        justify-content: center;
    }
`;

const DetailsList = styled.ul`
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 440px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 0.4rem;
        justify-items: center;
        align-items: center;
    }
`;

const DetailsListItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    &:nth-last-child(1) {
        margin-bottom: 0rem;
    }

    &:nth-child(2) {
        flex-direction: column;
        align-items: flex-start;
    }

    &:nth-last-child(1) {
        margin-bottom: 0rem;
        grid-column: span 2;
    }

    @media (max-width: 440px) {
        margin-bottom: 0;

        &:nth-child(1) {
            grid-column: span 2;
        }
    }
`;

const ItemImg = styled.img`
    width: 2.4rem;
    margin-right: 0.5rem;
`;

const TempFeelsLikeSpan = styled.span`
    margin-left: 0.3rem;
    font-weight: 600;
`;

const ItemSpan = styled.span`
    display: flex;
    align-items: center;
    font-size: 1.1rem;
`;

const WindSpeedContainer = styled.div`
    display: flex;
    align-items: center;
`;

const GustWindSpeedP = styled.p`
    font-size: 1.05rem;
`;

const ArrowWindDirection = styled.img<{ $transformDeg: number }>`
    width: 0.7rem;
    margin-left: 0.2rem;
    transform: rotate(${({ $transformDeg }) => $transformDeg}deg);
`;