import React from "react";
import SliderContentItem from "./SliderContentItem.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { isDayTime } from "../../utils/isDayTime.ts";
import { getWeatherImgWithDescript } from "../../utils/getWeatherImgWithDescript.ts";

const SliderContent = ({ 
    isMobile,
    showAllHours,
    currentHour,
    selectedDay,
    isDaySelected }: SliderContentProps
) => {
    const days = useAppSelector((state) => state.weather.data?.forecast.forecastday);

    if(!days) return 'ошибка загрузки данных';

    const dayHours = (!isDaySelected && selectedDay) ? days[selectedDay].hour : days[0]?.hour || [];

    const forecastHours = isDaySelected && !showAllHours
        ? (isMobile ? dayHours.slice(currentHour) : dayHours)
        : dayHours;

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

interface SliderContentProps {
    isMobile: boolean;
    showAllHours: boolean;
    currentHour: number;
    selectedDay: number | null;
    isDaySelected: boolean;
};