import React from "react";
import styled from "styled-components";
import CurrentTime from "../CurrentTime.tsx";
import WeatherSummary from "./WeatherSummary.tsx";
import CurrentWeatherDetails from "./CurrentWeatherDetails.tsx";
import { getWeatherImgWithDescript } from "../../utils/getWeatherImgWithDescript.ts";
import { isDayTime } from "../../utils/isDayTime.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const CurrentWeather = () => {
    const currentForecast = useAppSelector((state) => state.weather.data?.current);
    const localTime = useAppSelector((state) => state.weather.localTime);
    
    if(!currentForecast) return <div>Ошибка загрузки данных</div>;

    const temp = Math.trunc(currentForecast.temp_c) + "°";
    const imgId = currentForecast.condition.code;
    const isDay = isDayTime(localTime || '');
    
    const { img, description } = getWeatherImgWithDescript(imgId, isDay)

	return (
		<>
			<CurrentTime />
            <BottomContainer>
                <WeatherSummary 
                    img={img}
                    temp={temp}
                    description={description}
                    marginRight={true}
                />
                <CurrentWeatherDetails />
            </BottomContainer>
		</>
	)
};

export default CurrentWeather;


const BottomContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    align-items: center;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;