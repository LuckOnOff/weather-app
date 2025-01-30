export function getWindDirection(deg: number): {windDirection: string; transformDeg: number} {
    const result = {
        windDirection: '',
        transformDeg: 0
    };

    if (deg >= 337.5 || deg < 22.5) {
        result.windDirection = "С";
        result.transformDeg = 180;
    } else if (deg >= 22.5 && deg < 67.5) {
        result.windDirection = "СВ";
        result.transformDeg = 225;
    } else if (deg >= 67.5 && deg < 112.5) {
        result.windDirection = "В";
        result.transformDeg = 270;
    } else if (deg >= 112.5 && deg < 157.5) {
        result.windDirection = "ЮВ";
        result.transformDeg = 315;
    } else if (deg >= 157.5 && deg < 202.5) {
        result.windDirection = "Ю";
        result.transformDeg = 0;
    } else if (deg >= 202.5 && deg < 247.5) {
        result.windDirection = "ЮЗ";
        result.transformDeg = 45;
    } else if (deg >= 247.5 && deg < 292.5) {
        result.windDirection = "З";
        result.transformDeg = 90;
    } else if (deg >= 292.5 && deg < 337.5) {
        result.windDirection = "СЗ";
        result.transformDeg = 135;
    }

    return result;
};