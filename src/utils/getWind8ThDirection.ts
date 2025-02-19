export function getWindDirection(direction16Ray: string): {windDirection: string; transformDeg: number} {
    const result = {
        windDirection: '',
        transformDeg: 0
    };

    if (direction16Ray === 'N') {
        result.windDirection = "С";
        result.transformDeg = 180;
    } else if (direction16Ray === 'NE' || direction16Ray === 'NNE' || direction16Ray === 'ENE') {
        result.windDirection = "СВ";
        result.transformDeg = 225;
    } else if (direction16Ray === 'E') {
        result.windDirection = "В";
        result.transformDeg = 270;
    } else if (direction16Ray === 'SE' || direction16Ray === 'SSE' || direction16Ray === 'ESE') {
        result.windDirection = "ЮВ";
        result.transformDeg = 315;
    } else if (direction16Ray === 'S') {
        result.windDirection = "Ю";
        result.transformDeg = 0;
    } else if (direction16Ray === 'SW' || direction16Ray === 'SSW' || direction16Ray === 'WSW') {
        result.windDirection = "ЮЗ";
        result.transformDeg = 45;
    } else if (direction16Ray === 'W') {
        result.windDirection = "З";
        result.transformDeg = 90;
    } else if (direction16Ray === 'NW' || direction16Ray === 'NNW' || direction16Ray === 'WNW') {
        result.windDirection = "СЗ";
        result.transformDeg = 135;
    }

    return result;
};