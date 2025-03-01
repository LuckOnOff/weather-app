import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";
import LocationData from "../../../types/LocationData.ts";

const Favorites = ({ locationName }: FavoritesProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const lat = useAppSelector((state) => state.place.lat);
    const lon = useAppSelector((state) => state.place.lon);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        setIsFavorite(favorites.some((place: LocationData) => place.name === locationName));
    }, [locationName]);

    const toggleFavorite = () => {
        const favorites: LocationData[] = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (isFavorite) {
            const updatedFavorites = favorites.filter((place) => place.name !== locationName);

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // удалить место из избранного
        } else {
            const newFavorite = { name: locationName, coords: { lat, lon } };

            localStorage.setItem("favorites", JSON.stringify([...favorites, newFavorite])); // добавить место в избранное
        }

        setIsFavorite(!isFavorite);
    };

    return (
        <Container
            title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'} 
            onClick={toggleFavorite} 
            $filled={isFavorite}
        >
            <svg viewBox="0 0 32 32" width="2.2rem" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M8,31a2,2,0,0,1-1.17-.38A2.13,2.13,0,0,1,6,28.69l.73-8.19L1.5,14.34a2.14,2.14,0,0,1-.39-2.06A2.06,2.06,0,0,1,2.6,10.9l7.62-1.8,4-7a2.05,2.05,0,0,1,3.58,0l4,7.05,7.62,1.8a2.06,2.06,0,0,1,1.49,1.38,2.14,2.14,0,0,1-.39,2.06L25.32,20.5l.73,8.19a2.13,2.13,0,0,1-.88,1.93,2,2,0,0,1-2,.2L16,27.58,8.84,30.82A2,2,0,0,1,8,31Z"/>
            </svg>
        </Container>
    );
};

export default Favorites;

interface FavoritesProps {
    locationName: string;
}

const Container = styled.div<{ $filled: boolean }>`
    position: absolute;
    top: 0.5rem;
    right: -2.5rem;
    cursor: pointer;
    color: ${({ $filled }) => ($filled ? "gold" : "gray")};
    transition: color 0.3s ease;

    &:hover {
        color: ${({ $filled }) => ($filled ? "yellow" : "darkgray")};
    }
`;