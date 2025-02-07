import { List } from "../types/WeatherResponse.ts";

function groupForecastsByDay(list: List[]): GroupedForecasts {
    const grouped: GroupedForecasts = {};
    
    list.forEach((forecast) => {
        const date = forecast.dt_txt.split(" ")[0];

        if (!grouped[date]) {
            grouped[date] = [];
        };

        grouped[date].push(forecast);
    });
    
    return grouped;
};

export default groupForecastsByDay;

interface GroupedForecasts {
    [date: string]: List[];
};