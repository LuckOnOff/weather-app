import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import { setClearPlaces, fetchPlaces, setPickedPlace } from "../features/place/placeSlice.ts";
import { fetchWeather } from "../features/weather/weatherSlice.ts";
import DaysList from "./DaysList.tsx";
import Spinner from "./UI/Spinner.tsx";
import gpsImg from "../assets/img/gps.svg";
import { getTranslatePlaceType } from "../utils/getTranslatePlaceType.ts";

const SearchComponent = () => {
    const dispatch = useAppDispatch();
    
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const places = useAppSelector((state) => state.place.places);
    const loading = useAppSelector((state) => state.place.loading);
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

    // закрываем список при клике вне
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (lat && lon) {
            dispatch(fetchWeather({ lat, lon }));
        }
    }, [lat, lon, dispatch]);    

    const handleSelectPlace = (id: number) => {
        dispatch(setPickedPlace(id));
        setShowDropdown(false);
        dispatch(setClearPlaces());
        setSearchQuery('');
    };

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
            {(showDropdown) && (
                <Dropdown ref={dropdownRef} $successfully={successfully}>
                    {loading ? (
                        <Spinner />
                    ) : (
                        places?.length ? (
                            places.map((place, index) => {
                                const translatePlaceType = getTranslatePlaceType(place.type);

                                return (
                                    <DropdownItem key={index} onClick={() => handleSelectPlace(index)}>
                                        {place.display_name + ', ' + translatePlaceType}
                                    </DropdownItem>
                                )
                            })
                        ) : (
                            <DropdownItem>Ничего не найдено</DropdownItem>
                        )
                    )}
                </Dropdown>
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

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateX(-65%);
      }

      to {
        opacity: 1;
        transform: translateX(-50%);
      }
`;

const Dropdown = styled.div<{ $successfully: boolean | null }>`
    position: absolute;
    top: 110%;
    left: ${({ $successfully }) => $successfully ? '29%' : '50%'};
    width: 16rem;
    transform: translateX(-50%);
    background: white;
    border: 0.1rem solid #ddd;
    border-radius: 0.3rem;
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
    z-index: 1;
    overflow: hidden;
    max-height: 13rem;
    overflow-y: auto;
    animation: ${fadeIn} 0.5s;
	transition: transform 0.3s ease-in-out;

    &::-webkit-scrollbar {
        width: 0.7rem;
        height: 0.7rem;
    }

    &::-webkit-scrollbar-track {
        background: #f0f0f0;
        border-radius: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        background: #007bff;
        border: 0.1rem solid #f0f0f0;
    }
`;

const DropdownItem = styled.div`
    padding: 0.6rem;
    cursor: pointer;
    transition: background 0.3s;
    margin: 0.9rem;
    border: 0.09rem solid #62aeff;
    border-radius: 0.5rem;

    &:hover {
        background: #f2f2f2;
    }
`;