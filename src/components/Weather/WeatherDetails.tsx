import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { getWindDirection } from "../../utils/getWind8ThDirection.ts";
import cloudinessImg from "../../assets/img/cloudiness.svg";
import humidityImg from "../../assets/img/humidity.svg";
import pressureImg from "../../assets/img/pressure.svg";
import windSpeedImg from "../../assets/img/wind.svg";
import arrowWindDirection from "../../assets/img/windDirection.svg";
import precipitationImg from "../../assets/img/precipitation.svg";

const WeatherDetails = () => {
    const currentForecast = useAppSelector((state) => state.weather.data?.current);

    if (!currentForecast) return <Details>Нет данных о погоде</Details>;

    const currentTempFeelsLike = Math.trunc(currentForecast.feelslike_c) + "°";

    const { windDirection, transformDeg } = getWindDirection(currentForecast.wind_dir);
    const windSpeed = currentForecast.wind_kph + " км/ч, " + windDirection;
    const gustWind = currentForecast.gust_kph + ' км/ч' || "нет данных";

    const humidity = currentForecast.humidity + "%";
    const pressure = Math.round(currentForecast.pressure_mb * 0.750062) + " мм. рт. ст.";
    const precipitation = currentForecast.precip_mm + ' мм.';
    const cloudiness = currentForecast.cloud + "%";

    const repeatDetailsElements = [
        { id: 0, title: "количество осадков", src: precipitationImg, alt: "Количество осадков", text: precipitation },
        { id: 1, title: "давление на уровне земли", src: pressureImg, alt: "Давление", text: pressure },
        { id: 2, title: "влажность", src: humidityImg, alt: "Влажность", text: humidity },
        { id: 3, title: "облачность", src: cloudinessImg, alt: "Облачность", text: cloudiness },
    ];

    return (
        <Details>
            <DetailsList>
                <DetailsListItem>
                    <ItemSpan>
                        ощущается как <TempFeelsLikeSpan>{currentTempFeelsLike}</TempFeelsLikeSpan>
                    </ItemSpan>
                </DetailsListItem>
                <DetailsListItem title="скорость ветра">
                    <WindSpeedContainer>
                        <ItemImg src={windSpeedImg} alt="Скорость ветра" />
                        <ItemSpan>
                            {windSpeed}
                            <ArrowWindDirection src={arrowWindDirection} alt="Направление ветра" $transformDeg={transformDeg} />
                        </ItemSpan>
                    </WindSpeedContainer>
                    <GustWindSpeedP>порывы до {gustWind}</GustWindSpeedP>
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

    @media (max-width: 480px) {
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
        grid-column: span 2;
    }

    &:nth-child(2) {
        flex-direction: column;
        align-items: flex-start;
    }

    @media (max-width: 480px) {
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
    font-size: 1rem;
`;

const ItemSpan = styled.span`
    display: flex;
    align-items: center;
    font-size: 1rem;
`;

const WindSpeedContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const GustWindSpeedP = styled.p`
    font-size: 1rem;
`;

const ArrowWindDirection = styled.img<{ $transformDeg: number }>`
    width: 0.7rem;
    margin-left: 0.2rem;
    transform: rotate(${({ $transformDeg }) => $transformDeg}deg);
`;