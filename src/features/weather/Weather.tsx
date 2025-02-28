import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Keyframes } from "styled-components/dist/types";
import Spinner from "../../components/UI/Spinner.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import ForecastSlider from "./Forecast/ForecastSlider.tsx";
import Title from "./UI/Title.tsx";
import CurrentWeather from "./currentWeather/CurrentWeather.tsx";
import SelectedDayWeather from "./selectedDayWeather/SelectedDayWeather.tsx";
import BackToCurrentWeather from "./selectedDayWeather/BackToCurrentWeather.tsx";

const Weather = () => {
    const loading = useAppSelector((state) => state.weather.loading);
    const successfully = useAppSelector((state) => state.weather.successfully);

    const selectedDay = useAppSelector((state) => state.weather.selectedDay);

    if(loading) return <Spinner />;

    return (
        <Container $successfully={successfully} $fadeIn={fadeIn}>
            <Title />
            <BackToCurrentWeather />
            {selectedDay === null ?
                <CurrentWeather />
                :
                <SelectedDayWeather />
            }
            <ForecastSlider />
        </Container>
    );
};

export default Weather;

interface ContainerProps {
    $successfully: boolean | null;
    $fadeIn: Keyframes;
};

const fadeIn = keyframes`
	from {
		opacity: 0;
		scale: 0;
	}

	to {
		opacity: 1;
		scale: 1;
	}
`;

const Container = styled.section<ContainerProps>`
    display: ${({ $successfully }) => $successfully ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    width: 100%;
    height: 100%;
    opacity: 0;
    scale: 0;
    transition: 0.5s linear;
    position: relative;

     ${({ $successfully, $fadeIn }) => $successfully &&
        css` // для интерполяции
            animation: 0.5s ${$fadeIn} forwards;
    `}

    @media (max-width: 440px) {
        justify-content: center;
    }
`;