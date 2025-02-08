import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { fetchWeather, setActiveIndex } from "../weather/weatherSlice.ts";
import { setCity } from "./searchSlice.ts";
import gpsImg from "../../assets/img/gps.svg";
import loupeImg from "../../assets/img/zoom.svg";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const SearchComponent = () => {
    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState<string>('');

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { data } = useAppSelector((state) => state.weather);

    const unFocusAndClearInput = () => {
        setInputValue('');
        
        const input = inputRef.current;

        if(input) {
            input.blur();
        }
    };

    const handleClickSearch = () => {
        const value = validationInput();
        
        if(!value) {
            setInputValue('');
            alert('Неверный ввод'); // позже сделать стилизованное всплывающее окно и состояние к его появлению на экране
            
            return;
        };
        
        if (value?.toLowerCase() !== data?.city.name.toLowerCase()) {
            dispatch(setActiveIndex(0));
            dispatch(setCity(value));
            dispatch(fetchWeather(value));
        };
        
        unFocusAndClearInput();
    };

    const validationInput = () => {
        const pattern = /[a-z а-я]/gi;
        const trimmedValue = inputValue.trim();

        if(trimmedValue === '' || !isNaN(+trimmedValue)) {
            return null;
        }

        return inputValue.match(pattern)?.join('') || null;
    };

    return (
        <SearchForm onSubmit={(e) => e.preventDefault()}>
            <SearchLabel htmlFor="search-input">
                <SearchGpsImg src={gpsImg} alt="Локация" />
                <SearchInput
                    type="text" 
                    id="search-input"
                    placeholder="Введите название локации"
                    value={inputValue}
                    ref={inputRef}
                    onChange={(e) => setInputValue(e.target.value)}
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