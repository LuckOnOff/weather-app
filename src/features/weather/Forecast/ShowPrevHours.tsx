import React from "react";
import styled from "styled-components";

const ShowPrevHours = ({ onClickShowAllHours, showAllHours }: ShowPrevHoursProps) => {
	return (
		<ShowPrevHoursContainer>
			<ShowPrevHoursButton onClick={onClickShowAllHours}>
				{showAllHours ? 'Скрыть' : 'Показать'} прогноз на прошлые часы
			</ShowPrevHoursButton>
		</ShowPrevHoursContainer>
	)

};

export default ShowPrevHours;

interface ShowPrevHoursProps {
	onClickShowAllHours: () => void;
	showAllHours: boolean;
};

const ShowPrevHoursContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 2.5rem;
    position: absolute;
    top: -3.5rem;
    left: 0;
	z-index: 1;
	background: white;
`;

const ShowPrevHoursButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    background: white;
    border: 0.1rem solid gray;
    transition: all 0.3s ease;

    &:hover {
        background: #f5f5f5;
    }
`;