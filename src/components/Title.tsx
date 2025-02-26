import React from "react";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import styled from "styled-components";

const Title = () => {
    const locationName = useAppSelector((state) => state.place.pickedPlace?.name);

    if(!locationName) return <StyledTitle>Ошибка загрузки</StyledTitle>;
    /* 
        позже добавить сюда значок звездочку и хранить в localStorage
    */
    return (
        <StyledTitle>
            {locationName}
        </StyledTitle>
    )
};

export default Title;

const StyledTitle = styled.h1`
    font-size: 2.25rem;
    text-align: center;
    margin-top: 1.2rem;
    letter-spacing: 0.1rem;
    word-break: break-word;
    width: 60vw;
    max-width: 25rem;
`;