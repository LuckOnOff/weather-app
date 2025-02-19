import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";
import returnArrowImg from "../assets/img/returnArrow.svg";
import { setSelectedDay } from "../features/weather/weatherSlice.ts";

const BackToCurrentWeather = () => {
	const selectedDay = useAppSelector((state) => state.weather.selectedDay);

	const dispath = useAppDispatch();

	if(selectedDay !== null) {
		return (
			<Container onClick={() => dispath(setSelectedDay(null))}>
				<ReturnArrow src={returnArrowImg} />
			</Container>
		)
	};
};

export default BackToCurrentWeather;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	background: rgb(214 214 214);
	position: absolute;
	top: 2rem;
	left: 0.5rem;
	cursor: pointer;
`;

const ReturnArrow = styled.img`
	width: 2rem;
`;