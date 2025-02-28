import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import PlaceList from "../features/place/PlaceList.tsx";
import DaysList from "../features/weather/UI/DaysList.tsx";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import { setClearPlaces, fetchPlaces } from "../features/place/placeSlice.ts";
import { fetchWeather, setTimerExpired } from "../features/weather/weatherSlice.ts";
import gpsImg from "../assets/img/gps.svg";

const timerDuraction = 5 * 60 * 1000; // таймер на 5 минут

const SearchComponent = () => {
    const dispatch = useAppDispatch();
    
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState(false);

    const lat = useAppSelector((state) => state.place.lat);
    const lon = useAppSelector((state) => state.place.lon);

    const successfully = useAppSelector((state) => state.weather.successfully);

    // debounce API-запрос
    useEffect(() => {
        if (searchQuery.trim().length === 0) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);
        
        debounceRef.current = setTimeout(() => {
            dispatch(fetchPlaces(searchQuery));
            setShowDropdown(true);
        }, 500);

        dispatch(setClearPlaces());

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchQuery, dispatch]);

    useEffect(() => { // отправка запроса на прогноз погоды
        if (lat && lon) {
            dispatch(fetchWeather({ lat, lon }));
        }
    }, [lat, lon, dispatch]);

    useEffect(() => {
        if (successfully) {
            dispatch(setTimerExpired(false));

            if (timerRef.current) clearInterval(timerRef.current);
            
            timerRef.current = setInterval(() => {
                dispatch(setTimerExpired(true));
            }, timerDuraction);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [successfully, dispatch]);

    const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!/[0-9]/.test(newValue)) {
            setSearchQuery(newValue);
        };
    };

    return (
        <SearchWrapper>
            <SearchForm onSubmit={(e) => e.preventDefault()}>
                <SearchLabel>
                    <InputContainer>
                        <SearchGpsImg src={gpsImg} alt="Локация" />
                        <SearchInput
                            type="text"
                            placeholder="Введите название локации"
                            value={searchQuery}
                            onChange={handleChangeInputValue}
                            onFocus={() => setShowDropdown(true)}
                        />
                    </InputContainer>
                    {successfully && <DaysList />}
                </SearchLabel>
            </SearchForm>
            {showDropdown && (
                <PlaceList 
                    onClickClose={() => setShowDropdown(false)}
                    onClickClearInput={() => setSearchQuery('')}
                />
            )}
        </SearchWrapper>
    );
};

export default SearchComponent;

const SearchForm = styled.form`
    width: 100%;
`;

const SearchLabel = styled.section`
    display: flex;
    justify-content: space-between;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const SearchGpsImg = styled.img`
    width: 1.5rem;
`;

const SearchInput = styled.input`
    width: 15rem;
    padding: 0.6rem;
    border-radius: 0.2rem;
    outline: none;
    border: none;
    margin: 0 0.3rem;
`;

const SearchWrapper = styled.section`
    position: relative;
    width: 100%;
`;