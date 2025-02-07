import React from "react";
import styled from "styled-components";
import { getWeatherImgFromId } from "../../utils/getWeatherImg.ts";
import { List } from "../../types/WeatherResponse.ts";

const SliderContent = ({ today }: SliderContentProps) => {

    return (
        <>
            {today.map((date) => (
                <ItemContainer key={date.dt}>
                    <Time>{date.dt_txt.split(' ')[1].slice(0, 5)}</Time>
                    <ImgTypeImg src={getWeatherImgFromId(date.weather[0].id)} alt="Тип погоды" />
                    <Temp>{Math.trunc(date.main.temp) + '°'}</Temp>
                    <Description>{date.weather[0].description}</Description>
                </ItemContainer>
            ))}
        </>
    )
};

export default SliderContent;

interface SliderContentProps {
    today: List[];
};

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 7rem;
    height: 11rem;
    border: 0.1rem solid gray;
    border-radius: 1rem;
    padding: 0.5rem;

    &:nth-last-child(1) {
        margin-right: 0.9rem;
    }

    &:nth-child(1) {
        margin-left: 1.2rem;

        @media (max-width: 396px) {
            margin-left: 0.9rem;   
        }
    }
`;

const Time = styled.p`
    font-size: 0.9rem;
`;

const ImgTypeImg = styled.img`
    width: 4.5rem;
`;

const Temp = styled.p`
    font-size: 0.9rem;
    font-weight: 500;
`;

const Description = styled.p`
    text-align: center;
    font-size: 0.9rem;
`;