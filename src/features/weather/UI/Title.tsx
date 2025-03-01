import React from "react";
import styled from "styled-components";
import Favorites from "./Favorites.tsx";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";

const Title = () => {
    const locationName = useAppSelector((state) => state.place.pickedPlace?.name);

    console.log(locationName);

    if(!locationName) return <StyledTitle>Ошибка загрузки</StyledTitle>;

    return (
        <RelativeContainer>
            <Favorites locationName={locationName} />
            <StyledTitle>
                {locationName}
            </StyledTitle>
        </RelativeContainer>
    )
};

export default Title;

const RelativeContainer = styled.div`
    position: relative;
`;

const StyledTitle = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin-top: 1.2rem;
    letter-spacing: 0.1rem;
    word-break: break-word;
    max-width: 21rem;

    @media (max-width: 430px) {
        max-width: 18rem;
    }
`;