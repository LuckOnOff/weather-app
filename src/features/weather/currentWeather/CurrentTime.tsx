import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";

const CurrentTime = () => {
	const CurrentLocalTime = useAppSelector((state) => state.weather.localTime);

	return (
		<Time title="последнее обновление погоды">
			{CurrentLocalTime}
		</Time>
	)
};

export default CurrentTime;

const Time = styled.time`
	font-size: 1.5rem;
`;