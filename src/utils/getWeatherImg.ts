import { getDayOrNigthImgObj } from "./getDayOrNightImgObj.ts";

export function getWeatherImgFromId(weatherId: number, isDay: boolean): string {
    const weatherConditions = getDayOrNigthImgObj(isDay);
    
    let weatherType: number = 0;
    
    if (weatherId >= 200 && weatherId <= 232) {
        weatherType = 1;
    } else if (weatherId >= 300 && weatherId <= 321) {
        weatherType = 2;
    } else if (weatherId >= 500 && weatherId <= 531) {
        weatherType = 3;
    } else if (weatherId >= 600 && weatherId <= 622) {
        weatherType = 4;
    } else if (weatherId >= 701 && weatherId <= 781) {
        weatherType = 5;
    } else if (weatherId === 800) {
        weatherType = 6;
    } else if (weatherId >= 801 && weatherId <= 804) {
        weatherType = 7;
    }
    
    return weatherConditions[weatherType];
};