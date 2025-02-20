import React from "react";
import styled from "styled-components";
import WeatherSummary from "./WeatherSummary.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { getWeatherImgWithDescript } from "../../utils/getWeatherImgWithDescript.ts";
import { isDayTime } from "../../utils/isDayTime.ts";
import tempImg from "../../assets/img/temp.svg";
import humidityImg from "../../assets/img/humidity.svg";
import windSpeedImg from "../../assets/img/wind.svg";
import precipitationImg from "../../assets/img/precipitation.svg";

const SelectedDayWeather = () => {
	const dayForecast = useAppSelector((state) => state.weather.data?.forecast.forecastday);
	const selectedDay = useAppSelector((state) => state.weather.selectedDay);
	const localTime = useAppSelector((state) => state.weather.localTime);

	if(!dayForecast) return <div>Ошибка загрузки данных</div>;

	const currentDay = selectedDay ? dayForecast[selectedDay].day : dayForecast[0].day;

	const temp = Math.trunc(currentDay.avgtemp_c) + "°";
	const imgId = currentDay.condition.code;
	const isDay = isDayTime(localTime || '');

	const { img, description } = getWeatherImgWithDescript(imgId, isDay);

	const maxTemp = Math.trunc(currentDay.maxtemp_c) + "°";
	const minTemp = Math.trunc(currentDay.mintemp_c) + "°";

	const maxWindSpeed = currentDay.maxwind_kph + " км/ч";

	const chanceRainOrSnow = Math.max(currentDay.daily_chance_of_rain, currentDay.daily_chance_of_snow) + "%";
	const totalPrecip = currentDay.totalprecip_mm;
	
	const avgHumidity = currentDay.avghumidity + "%";

	return (
		<Container>
			<WeatherSummary 
				img={img}
				temp={temp}
				description={description}
			/>
			<DetailsList>
				<DetailsItem title="максимальная и минимальная температуры">
					<DetailIcon src={tempImg} alt="температура" />
					<DoubleElementContainer>
						<DetailValue>
							от {minTemp}
						</DetailValue>
						<DetailValue>
							до {maxTemp}
						</DetailValue>
					</DoubleElementContainer>
				</DetailsItem>
				<DetailsItem title="максимальная скорость ветра">
					<DetailIcon src={windSpeedImg} alt="максимальная корость ветра" />
					<DetailValue>
						до {maxWindSpeed}
					</DetailValue>
				</DetailsItem>
				<DetailsItem title="вероятность осадков">
					<DetailIcon src={precipitationImg} alt="вероятность осадков" />
					<DoubleElementContainer>
						<DetailValue>
							{chanceRainOrSnow}
						</DetailValue>
						<DetailValue>
							{totalPrecip} мм.
						</DetailValue>
					</DoubleElementContainer>
				</DetailsItem>
				<DetailsItem title="влажность">
					<DetailIcon src={humidityImg} alt="влажность" />
					<DetailValue>
						{avgHumidity}
					</DetailValue>
				</DetailsItem>
			</DetailsList>
		</Container>
	)
};

export default SelectedDayWeather;

const Container = styled.section`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
	margin-top: 2rem;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

const DetailsList = styled.ul`
	display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 480px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1.5rem 3rem;
		align-items: start;
		margin-top: 2rem;
    }
`;

const DetailsItem = styled.li`
	display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    &:nth-last-child(1) {
        margin-bottom: 0rem;
    }

    @media (max-width: 480px) {
        margin-bottom: 0;
    }
`;

const DoubleElementContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	& span:first-child {
		margin-bottom: 0.3rem;
	}
`;

const DetailIcon = styled.img`
	width: 2rem;
	margin-right: 1rem;
`;

const DetailValue = styled.span`
	display: block;
`;