import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import Error from "./shared/Error.tsx";
import apiErrorImg from "../../assets/img/apiError.svg";

const ApiError = () => {
    const weatherError = useAppSelector((state) => state.weather.error);
    const placeError = useAppSelector((state) => state.place.error);

    const responseError = weatherError === "Ошибка запроса" || placeError === "Ошибка запроса";

    return (
        <Error 
            img={apiErrorImg}
            textOne="Произошла ошибка запроса"
            textTwo="Извините, сервер в данный момент недоступен"
            alt="проблемы с сервером"
            error={responseError}
        />
    )
};

export default ApiError;