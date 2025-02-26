export function convertTo24HourFormat(time: string): string {
    // проверка на корректность входных данных
    const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9]) ?([AP]M)$/i;
    const match = time.match(regex);

    if (!match) {
        return time; // если входные данные не подходят, то возвращаются как есть
    };

    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = match[3].toUpperCase(); // PM или AM

    if (period === "PM" && hours < 12) { // преобразование в 24-часовой формат
        hours += 12;
    } else if (period === "AM" && hours === 12) {
        hours = 0;
    };

    // форматирование часов и минут
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
};