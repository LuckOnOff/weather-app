import React from "react";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../../hooks/useAppDispatch.ts";
import { fetchWeather, setTimerExpired } from "../weatherSlice.ts";
import repeatRequest from "../../../assets/img/repeatRequest.svg";

const RepeatRequest = () => {
	const dispatch = useAppDispatch();

	const timerExpired = useAppSelector((state) => state.weather.timerExpired);

	const lat = useAppSelector((state) => state.place.lat);
	const lon = useAppSelector((state) => state.place.lon);

	const handleRefresh = () => {
		if (lat && lon) {
			dispatch(fetchWeather({ lat, lon })); // перезапрос погоды
			dispatch(setTimerExpired(false)); // сброс таймера
		}
	};

	if(!timerExpired) return null;

    return (
        <RepeatRequestContainer onClick={handleRefresh}>
            <RepeatRequestItem src={repeatRequest} alt="обновить прогноз" />
        </RepeatRequestContainer>
    )
};

export default RepeatRequest;

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateX(1.25rem);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

const RepeatRequestContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.1rem solid black;
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 50%;
	cursor: pointer;
	position: absolute;
	top: -0.2rem;
	left: 5rem;
	animation: ${fadeIn} 0.5s ease-in-out;
`;

const RepeatRequestItem = styled.img`
	width: 1.25rem;
	height: 1.25rem;
`;