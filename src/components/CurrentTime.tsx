import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const CurrentTime = () => {
	const CurrentLocalTime = useAppSelector((state) => state.weather.localTime);

	return (
		<Time>
			{CurrentLocalTime}
		</Time>
	)
};

export default CurrentTime;

const Time = styled.time`
	font-size: 1.5rem;
	margin: 1.5rem 0 2rem;
`;