import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";
import { setSelectedDay } from "../features/weather/weatherSlice.ts";

const dataTypeObj = {
	0: 'сегодня',
	1: 'завтра',
	2: 'послезавтра'
};

const DaysList = () => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const days = useAppSelector((state) => state.weather.data?.forecast.forecastday || []);
    const selectedDay = useAppSelector((state) => state.weather.selectedDay);

	const dispatch = useAppDispatch();

	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
				setTimeout(() => setShowDropdown(false), 100); // для корректной работы смены дня
			}
		};		
	
		document.addEventListener("mousedown", handleClickOutside);
	
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const dateType = selectedDay !== null ? dataTypeObj[selectedDay] : '';
	const currentDay = selectedDay === null ? 'выбрать день' : dateType;

	return (
		<Container>
				<Placeholder ref={buttonRef} onClick={() => setShowDropdown(!showDropdown)}>{currentDay}</Placeholder>
				{showDropdown && 
					<DropdownContainer>
						{days?.map((item, index) => {
							const dateArr = item.date.split('-');
							const formattedDate = dateArr[2] + '.' + dateArr[1];

							return (
								<Day 
									key={index}
									onClick={() => dispatch(setSelectedDay(index))}
										
								>
									{formattedDate}
								</Day>
							)
						})}
					</DropdownContainer>
				}
		</Container>
	)
};

export default DaysList;

const Container = styled.div`
	width: 30%;
	position: relative;
`;

const Placeholder = styled.button`
	display: flex;
	justify-content: center;
    align-items: center;
	border: 0.2rem solid rgb(206 206 206);
	background: white;
	border-radius: 0.4rem;
	min-width: 7rem;
	width: 100%;
	height: 100%;
`;

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(-1rem);
	  }

	  to {
		opacity: 1;
		transform: translateY(0);
	  }
`;

const DropdownContainer = styled.div`
	position: absolute;
	top: 2.5rem;
	left: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
	width: 10rem;
	z-index: 1;
	animation: ${fadeIn} 0.5s;
	transition: 0.3s ease-in-out;
`;

const Day = styled.time`
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 0.1rem solid gray;
	min-height: 3.5rem;
	height: 4.5rem;
	cursor: pointer;
`;