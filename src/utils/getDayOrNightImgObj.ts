import dayThunderstorm from '../assets/img/day/thunderstorm.svg';
import dayDrizzle from '../assets/img/day/drizzle.svg';
import dayRain from "../assets/img/day/rain.png";
import daySnow from '../assets/img/day/snow.png';
import dayFog from '../assets/img/day/fog.svg';
import daySun from '../assets/img/day/sun.svg';
import daySunCloud from "../assets/img/day/sunCloud.png";

import nightThunderstorm from '../assets/img/night/thunderstorm.png';
import nightDrizzle from '../assets/img/night/drizzle.png';
import nightRain from "../assets/img/night/rain.png";
import nightSnow from '../assets/img/night/snow.png';
import nightFog from '../assets/img/night/fog.png';
import nightMoon from '../assets/img/night/moon.png';
import nightMoonCloud from "../assets/img/night/moonCloud.png";

export function getDayOrNigthImgObj(isDay: boolean): ResultObj {
	return {
        1: isDay ? dayThunderstorm : nightThunderstorm,
        2: isDay ? dayDrizzle : nightDrizzle,
        3: isDay ? dayRain : nightRain,
        4: isDay ? daySnow : nightSnow,
        5: isDay ? dayFog : nightFog,
        6: isDay ? daySun : nightMoon,
        7: isDay ? daySunCloud : nightMoonCloud,
    };
};

interface ResultObj {
	1: string;
	2: string;
	3: string;
	4: string;
	5: string;
	6: string;
	7: string;
};