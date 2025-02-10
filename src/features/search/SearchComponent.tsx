import React, { useRef } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { fetchWeather, setActiveIndex } from "../weather/weatherSlice.ts";
import { setCity } from "./searchSlice.ts";
import gpsImg from "../../assets/img/gps.svg";
import loupeImg from "../../assets/img/zoom.svg";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const SearchComponent = () => {
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const cityName = useAppSelector((state) => state.weather.data?.city.name);

    const unFocusAndClearInput = () => {
        if (inputRef.current) {
          inputRef.current.value = '';
          inputRef.current.blur();
        }
    };

    const handleClickSearch = () => {
        const value = validationInput();

        if (!value) {
          alert('Неверный ввод'); // позже заменить на стилизованное всплывающее окно

          return;
        }

        if (value?.toLowerCase() !== cityName?.toLowerCase()) {
          dispatch(setActiveIndex(0));
          dispatch(setCity(value));
          dispatch(fetchWeather(value));
        }
        
        unFocusAndClearInput();
      };

    const validationInput = () => {
        if(!inputRef.current) return;

        const trimmedValue = inputRef.current.value.trim();

        if (!trimmedValue || !/[a-zа-я]/gi.test(trimmedValue)) {
          return null;
        }

        return trimmedValue;
      };

    return (
        <SearchForm onSubmit={(e) => e.preventDefault()}>
            <SearchLabel htmlFor="search-input">
                <SearchGpsImg src={gpsImg} alt="Локация" />
                <SearchInput
                    type="text" 
                    id="search-input"
                    placeholder="Введите название локации"
                    ref={inputRef}
                />
                <SearchButton onClick={handleClickSearch}>
                    <SearchLoupeImg src={loupeImg} alt="Поиск" />
                </SearchButton>
            </SearchLabel>
        </SearchForm>
    )
};

export default SearchComponent;

const SearchForm = styled.form`
    width: 100%;
    margin-top: -0.3rem;
`;

const SearchLabel = styled.label`
    display: flex;
    justify-content: center;
`;

const SearchGpsImg = styled.img`
    width: 1.5rem;
`;

const SearchInput = styled.input`
    width: 16rem;
    padding: 0.6rem;
    border-radius: 0.2rem;
    font-size: 1.1rem;
    outline: none;
    border: none;
    margin: 0 0.3rem;
`;

const SearchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    background: rgb(98, 196, 235);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.8;
    transition: 0.4s ease;
`;

const SearchLoupeImg = styled.img`
    width: 1.5rem;
`;