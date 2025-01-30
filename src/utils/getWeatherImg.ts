import thunderstorm from '../assets/img/thunderstorm.svg';
import drizzle from '../assets/img/drizzle.svg';
import rain from "../assets/img/rain.svg";
import snow from '../assets/img/snow.svg';
import fog from '../assets/img/fog.svg';
import sun from '../assets/img/sun.svg';
import sunCloud from "../assets/img/sunCloud.svg";

export function getWeatherImgFromId(weatherId: number): string {
    const weatherConditions = {
        1: thunderstorm,
        2: drizzle,
        3: rain,
        4: snow,
        5: fog,
        6: sun,
        7: sunCloud
    };   
    
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