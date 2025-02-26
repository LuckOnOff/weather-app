import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import Error from "./shared/Error.tsx";
import networkErrorImg from "../../assets/img/noWifi.svg";

const NetworkError = () => {
    const weatherError = useAppSelector((state) => state.weather.error);
    const placeError = useAppSelector((state) => state.place.error);

    const failedToFetch = weatherError === "Failed to fetch" || placeError === "Failed to fetch";

    return (
        <Error 
            img={networkErrorImg}
            textOne="Кажется, у вас отсутствует подключение к интернету"
            textTwo="Для работы этого приложения требуется подключение к сети интернет"
            alt="отсутствует подключение"
            error={failedToFetch}
        />
    );
};

export default NetworkError;