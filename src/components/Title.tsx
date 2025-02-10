import React from "react";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import styled from "styled-components";

const Title = () => {
    const data = useAppSelector((state) => state.weather.data);

    if(!data) return;
    /* 
        позже добавить сюда значок звездочку и 
        функциональность избранных мест (до 5, например, либо без ограничений)
        и хранить в localStorage
    */
    return (
        <StyledTitle>
            {data?.city.name}
        </StyledTitle>
    )
};

export default Title;

const StyledTitle = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    margin: 2rem 0;
    letter-spacing: 0.1rem;
`;