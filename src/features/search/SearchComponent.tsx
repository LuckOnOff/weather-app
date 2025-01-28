import React, { useState } from "react";
import styled from "styled-components";
import gpsImg from "../../img/gps.svg";
import loupeImg from "../../img/zoom.svg";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { fetchWeather, setCity } from "./SearchSlice.ts";

const SearchComponent = () => {
    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState<string>('');

    const handleClickSearch = () => {
        const value = validationInput();

        if (value) {
            dispatch(setCity(value));
            dispatch(fetchWeather(value));
            setInputValue('');
        } else {
            alert('Неверный ввод'); // позже заменить на стилизованный алерт, либо еще как-либо обозначить неверный ввод в поле
            setInputValue('');
        }
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