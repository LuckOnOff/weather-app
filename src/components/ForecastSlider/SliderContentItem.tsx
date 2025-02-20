import React from "react";
import styled from "styled-components";
import { HourlyForecast } from "../../types/WeatherResponse.ts";
import showMore from "../../assets/img/showMore.svg";

const SliderContentItem = ({ date, img, description }: SliderContentItemProps) => {

    return (
        <ItemContainer
            title="показать подробности"
        >
            <Time>{date.time.split(' ')[1]}</Time>
            <ImgTypeImg src={img} alt="Тип погоды" />
            <Temp>{Math.trunc(date.temp_c) + "°"}</Temp>
            <Description>{description}</Description>
            <ShowMore src={showMore} alt="показать подробности" />
        </ItemContainer>
    );
};

export default SliderContentItem;

interface SliderContentItemProps {
	date: HourlyForecast;
    img: string;
    description: string;
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
        min-height: 9rem;
    }
`;

const Time = styled.p`
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