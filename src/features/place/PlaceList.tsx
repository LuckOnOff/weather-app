import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Spinner from "../../components/UI/Spinner.tsx";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { setPickedPlace, setClearPlaces } from "../../features/place/placeSlice.ts";
import { getTranslatePlaceType } from "../../utils/getTranslatePlaceType.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const PlaceList = ({ onClickClose, onClickClearInput }: PlaceListProps) => {
    const dispatch = useAppDispatch();
    
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const loading = useAppSelector((state) => state.place.loading);
    const places = useAppSelector((state) => state.place.places);

    const successfully = useAppSelector((state) => state.weather.successfully);

    // закрытие списка при клике вне
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                onClickClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClickClose]);

    const handleSelectPlace = (id: number) => {
        dispatch(setPickedPlace(id));
        dispatch(setClearPlaces());
        onClickClose();
        onClickClearInput();
    };

    return (
        <DropdownContainer ref={dropdownRef} $successfully={successfully}>
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
        </DropdownContainer>
    );
};

export default PlaceList;

interface PlaceListProps {
    onClickClose: () => void;
    onClickClearInput: () => void;
}

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

const DropdownContainer = styled.div<{ $successfully: boolean | null }>`
    position: absolute;
    top: 110%;
    left: ${({ $successfully }) => ($successfully ? "9.5rem" : "50%")};
    width: 16rem;
    transform: translateX(-50%);
    background: white;
    border: 0.rem solid #ddd;
    border-radius: 0.3rem;
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
    z-index: 1;
    overflow: hidden;
    max-height: 14rem;
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