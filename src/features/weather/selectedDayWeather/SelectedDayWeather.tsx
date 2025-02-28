import React from "react";
import styled from "styled-components";
import WeatherSummary from "../shared/WeatherSummary.tsx";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";
import { getWeatherImgWithDescript } from "../../../utils/getWeatherImgWithDescript.ts";
import { isDayTime } from "../../../utils/isDayTime.ts";
import { convertTo24HourFormat } from "../../../utils/convertTo24HourFormat.ts";
import tempImg from "../../../assets/img/temp.svg";
import humidityImg from "../../../assets/img/humidity.svg";
import windSpeedImg from "../../../assets/img/wind.svg";
import precipitationImg from "../../../assets/img/precipitation.svg";
import sunriseImg from "../../../assets/img/sunrise.svg";
import sunsetImg from "../../../assets/img/sunset.svg";

const SelectedDayWeather = () => {
	const dayForecast = useAppSelector((state) => state.weather.data?.forecast.forecastday);
	const selectedDay = useAppSelector((state) => state.weather.selectedDay);
	const localTime = useAppSelector((state) => state.weather.localTime);

	if(!dayForecast) return <div>Ошибка загрузки данных</div>;

	const currentDay = selectedDay ? dayForecast[selectedDay] : dayForecast[0];
	const forecastCurrentDay = currentDay.day;

	const temp = Math.trunc(forecastCurrentDay.avgtemp_c) + "°";
	const imgId = forecastCurrentDay.condition.code;
	const isDay = isDayTime(localTime || '');

	const { img, description } = getWeatherImgWithDescript(imgId, isDay);

	const maxTemp = Math.trunc(forecastCurrentDay.maxtemp_c) + "°";
	const minTemp = Math.trunc(forecastCurrentDay.mintemp_c) + "°";

	const maxWindSpeed = forecastCurrentDay.maxwind_kph + " км/ч";

	const chanceRainOrSnow = Math.max(forecastCurrentDay.daily_chance_of_rain, forecastCurrentDay.daily_chance_of_snow) + "%";
	const totalPrecip = forecastCurrentDay.totalprecip_mm;
	
	const avgHumidity = forecastCurrentDay.avghumidity + "%";

	const sunrise = convertTo24HourFormat(currentDay.astro.sunrise);
	const sunset = convertTo24HourFormat(currentDay.astro.sunset);

	const repeatDetailsElements = [
		{ id: 0, title: "влажность", src: humidityImg, alt: "влажность", text: avgHumidity },
		{ id: 1, title: "восход", src: sunriseImg, alt: "восход", text: sunrise },
		{ id: 2, title: "закат", src: sunsetImg, alt: "закат", text: sunset }
	];

	return (
		<Container>
			<WeatherSummary 
				img={img}
				temp={temp}
				description={description}
				marginRight={false}
			/>
			<DetailsList>
				<DetailsItem title="температура">
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
				<DetailsItem title="осадки">
					<DetailIcon src={precipitationImg} alt="осадки" />
					<DoubleElementContainer>
						<DetailValue>
							{chanceRainOrSnow}
						</DetailValue>
						<DetailValue>
							{totalPrecip} мм.
						</DetailValue>
					</DoubleElementContainer>
				</DetailsItem>
				{repeatDetailsElements.map(item => (
					<DetailsItem title={item.title} key={item.id}>
						<DetailIcon src={item.src} alt={item.alt} />
						<DetailValue>
							{item.text}
						</DetailValue>
					</DetailsItem>
				))}
			</DetailsList>
		</Container>
	)
};

export default SelectedDayWeather;

const Container = styled.section`
    display: flex;
    justify-content: center;
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
	margin-left: 2rem;

    @media (max-width: 480px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2rem 0rem;
		align-items: start;
		margin-top: 2rem;
		margin-left: 2.5rem;
		justify-items: center;
    }
`;

const DetailsItem = styled.li`
	display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
	width: 9.5rem;

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
	height: 2rem;
	margin-right: 1rem;
`;

const DetailValue = styled.span`
	display: block;
`;