import React from "react";
import SliderContentItem from "./SliderContentItem.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { isDayTime } from "../../utils/isDayTime.ts";
import { getWeatherImgWithDescript } from "../../utils/getWeatherImgWithDescript.ts";

const SliderContent = () => {
    const days = useAppSelector((state) => state.weather.data?.forecast.forecastday);
    const selectedDay = useAppSelector((state) => state.weather.selectedDay);

    if(!days) return 'ошибка загрузки данных';

    const forecastHours = selectedDay ? days[selectedDay].hour : days[0].hour;

    return (
        <>
            {forecastHours.map((date) => {
                const isDay = isDayTime(date.time.split(' ')[1]);
                const { img, description } = getWeatherImgWithDescript(date.condition.code, isDay);

                return (
                    <SliderContentItem
                        key={date.time_epoch}
                        date={date}
                        img={img}
                        description={description}

                    />
                )
            })}
        </>
    );
};


export default SliderContent;