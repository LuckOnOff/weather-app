import React from "react";
import styled from "styled-components";
import { getWeatherImgFromId } from "../../utils/getWeatherImg.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { setSelectedForecast, setActiveIndex } from "../../features/weather/weatherSlice.ts";

const SliderContent = () => {
    const dispatch = useAppDispatch();
    const { selectedForecast, activeIndex } = useAppSelector((state) => state.weather);

    if (!selectedForecast) return null;

    const handleSelect = (index: number) => {
        dispatch(setActiveIndex(index));
        dispatch(setSelectedForecast(selectedForecast));
    };

    return (
        <>
            {selectedForecast.map((date, index) => (
                <ItemContainer
                    key={date.dt}
                    $isActive={activeIndex === index}
                    onClick={() => handleSelect(index)}
                >
                    <Time>{date.dt_txt.split(' ')[1].slice(0, 5)}</Time>
                    <ImgTypeImg src={getWeatherImgFromId(date.weather[0].id)} alt="Тип погоды" />
                    <Temp>{Math.trunc(date.main.temp) + "°"}</Temp>
                    <Description>{date.weather[0].description}</Description>
                </ItemContainer>
            ))}
        </>
    );
};

export default SliderContent;

const ItemContainer = styled.div<{ $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 8.1rem;
    height: 11rem;
    border: 0.1rem solid ${({ $isActive }) => ($isActive ? "green" : "gray")};
    border-radius: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: border 0.3s ease-in-out;

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