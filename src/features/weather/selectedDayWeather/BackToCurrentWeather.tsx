import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../../hooks/useAppDispatch.ts";
import { setSelectedDay } from "../weatherSlice.ts";
import returnArrowImg from "../../../assets/img/returnArrow.svg";

const BackToCurrentWeather = () => {
	const selectedDay = useAppSelector((state) => state.weather.selectedDay);

	const dispath = useAppDispatch();

	if(selectedDay !== null) {
		return (
			<Container title="вернуться к текущему прогнозу" onClick={() => dispath(setSelectedDay(null))}>
				<ReturnArrow src={returnArrowImg} alt="вернуться к текущему прогнозу" />
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
    left: -0.3rem;
	cursor: pointer;
	transition: background 0.3s;

	&:hover {
        background: rgb(178, 178, 178);
    }
`;

const ReturnArrow = styled.img`
	width: 2rem;
`;