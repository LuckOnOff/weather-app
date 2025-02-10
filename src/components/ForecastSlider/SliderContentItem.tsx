import React from "react";
import styled from "styled-components";
import { getWeatherImgFromId } from "../../utils/getWeatherImg.ts";
import { List } from "../../types/WeatherResponse.ts";
import showMore from "../../assets/img/showMore.svg";

const SliderContentItem = ({ date, index, isActive, onClickSelect }: SliderContentItemProps) => {
    const forecastHour = date.dt_txt.split(' ')[1];
    const isDayTime = forecastHour >= '06:00:00' && forecastHour < '21:00:00';

    return (
        <ItemContainer
            $isActive={isActive}
            onClick={() => onClickSelect(index)}
            title="показать подробности"
        >
            <Time>{forecastHour.slice(0, 5)}</Time>
            <ImgTypeImg src={getWeatherImgFromId(date.weather[0].id, isDayTime)} alt="Тип погоды" />
            <Temp>{Math.trunc(date.main.temp) + "°"}</Temp>
            <Description>{date.weather[0].description}</Description>
            <ShowMore src={showMore} alt="показать подробности" />
        </ItemContainer>
    );
};

export const MemoizedSliderContentItem = React.memo(SliderContentItem); // ререндер компонента только при изменении пропсов

interface SliderContentItemProps {
	date: List;
	index: number;
    isActive: boolean;
	onClickSelect: (index: number) => void;
};

const ItemContainer = styled.div<{ $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 8.1rem;
    height: 11rem;
    border: 0.1rem solid ${({ $isActive }) => $isActive ? 'green' : 'gray'};
    border-radius: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: border 0.3s ease-in-out;
    position: relative;

    &:hover {
        border-color: lightgreen;
    }

    &:nth-last-child(1) {
        margin-right: 0.9rem;
    
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
    }
`;

const Time = styled.p`
    font-size: 1rem;
`;

const ImgTypeImg = styled.img`
    width: 4.5rem;
`;

const Temp = styled.p`
    font-size: 1rem;
    font-weight: 600;

    @media (max-width: 480px) {
        margin-bottom: 0.5rem;
    }
`;

const Description = styled.p`
    width: 5.5rem;
    text-align: center;
    font-size: 0.9rem;
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