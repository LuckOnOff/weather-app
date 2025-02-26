import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { HourlyForecast } from "../../../types/WeatherResponse.ts";
import showMore from "../../../assets/img/showMore.svg";
import widnSpeed from "../../../assets/img/wind.svg";
import precipitationImg from "../../../assets/img/precipitation.svg"; 
import humidityImg from "../../../assets/img/humidity.svg";

const SliderContentItem = ({ date, img, description }: SliderContentItemProps) => {
    const [isShowDetails, setIsShowDetails] = useState<boolean>(false);

    const handleClickShowDetails = () => {
        setIsShowDetails(!isShowDetails);
    };

    if(!date) return <div>Нет данных</div>;

    const windSpeed = date.wind_kph + ' км/ч';
    
    const chanceRainOrSnow = Math.max(date.chance_of_rain, date.chance_of_rain) + "%";
	const precip = date.precip_mm + ' мм.';

    const humidity = date.humidity + ' %';

    return (
        <ItemContainer
            title={isShowDetails ? 'Скрыть' : 'Подробнее'}
            onClick={handleClickShowDetails}
        >
            <p>{date.time.split(' ')[1]}</p>
            <ImgTypeImg src={img} alt="Тип погоды" />
            <Temp>{Math.trunc(date.temp_c) + "°"}</Temp>
            <Description>{description}</Description>
            <ShowMore src={showMore} alt="показать подробности" />
            {isShowDetails && (
                <DetailsList $isShowDetails={isShowDetails}>
                    <DetailsItem>
                        <Icon src={widnSpeed} alt="скороть ветра" />
                        <Value>{windSpeed}</Value>
                    </DetailsItem>
                    <DetailsItem>
                        <Icon src={precipitationImg} alt="осадки" />
                        <div>
                            <Value>{chanceRainOrSnow}</Value>
                            <Value>{precip}</Value>
                        </div>
                    </DetailsItem>
                    <DetailsItem>
                        <Icon src={humidityImg} alt="влажность" />
                        <Value>{humidity}</Value>
                    </DetailsItem>
                </DetailsList>
            )}
        </ItemContainer>
    );
};

export default SliderContentItem;

interface SliderContentItemProps {
	date: HourlyForecast;
    img: string;
    description: string;
};

interface ShowDetails {
    $isShowDetails: boolean;
};

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-width: 8.1rem;
    min-height: 11rem;
    height: 100%;
    border: 0.1rem solid gray;
    border-radius: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;

    &:hover {
        border-color: lightgreen;
    }

    &:nth-last-child(1) {
        margin-right: 1.5rem;
    
        @media (max-width: 480px) {
            margin-right: 0;   
        }
    }
        
    &:nth-child(1) {
        margin-left: 1.2rem;

        @media (max-width: 480px) {
            margin-left: 0;   
        }
    }

    @media (max-width: 480px) {
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        height: auto;
        padding: 1rem;
        min-height: 9rem;
    }
`;

const ImgTypeImg = styled.img`
    width: 4.5rem;
`;

const Temp = styled.p`
    font-weight: 600;

    @media (max-width: 480px) {
        margin-bottom: 0.5rem;
    }
`;

const Description = styled.p`
    width: 6rem;
    word-break: break-word;
    text-align: center;
`;

const ShowMore = styled.img`
    width: 1rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;

    @media (max-width: 480px) {
        right: 1rem;
        top: 0.8rem;
    }
`;

const showDetails = keyframes`
    from {
        opacity: 0;
		transform: translateY(-10%) translateX(10%);
    }

    to {
        opacity: 1;
		transform: translateY(0) translateX(0);
    }
`;

const DetailsList = styled.ul<ShowDetails>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.3rem;
    width: 100%;
    height: 100%;
    border-radius: 0.9rem;
    background: rgb(206 206 206);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    ${({ $isShowDetails }) => $isShowDetails && css`
        animation: ${showDetails} 0.3s ease-in-out forwards;
    `}

    @media (max-width: 480px) {
        flex-direction: row;
        justify-content: space-evenly;
    }
`;

const DetailsItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.4rem;

    &:nth-last-child(1) {
        margin-bottom: 0;
    }

    @media (max-width: 480px) {
        margin-bottom: 0;
    }
`;

const Icon = styled.img`
    margin-right: 0.8rem;
    width: 1.8rem;
`;

const Value = styled.p``;