import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import SliderContent from "./SliderContent.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import groupForecastsByDay from "../../utils/groupForecastsByDay.ts";

const WeatherForecastSlider = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);

    const sliderSection = useRef<HTMLDivElement | null>(null);

    // функция для вычисления itemWidth в пикселях
    const updateItemWidth = useCallback(() => {
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const width = window.innerWidth < 380 ? rootFontSize * 6.6 : rootFontSize * 7.8; // количество rem в зависимости от размера экрана
        
        setItemWidth(width);
    }, []);

    useEffect(() => {
        updateItemWidth();

        window.addEventListener("resize", updateItemWidth); // обновляем при изменении размера окна

        return () => window.removeEventListener("resize", updateItemWidth);
    }, [updateItemWidth]);

    useEffect(() => {
        if (sliderSection.current) {
            sliderSection.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }
    }, [scrollPosition]);

    const getMaxScroll = () => {
        if (!sliderSection.current) return;

        const maxScroll = sliderSection.current.scrollWidth - sliderSection.current.clientWidth;

        return maxScroll;
    }

    const handleScroll = (direction: "left" | "right"): void => {
        const maxScrollValue = getMaxScroll();

        if(!maxScrollValue) return;

        setScrollPosition((prev) => {
            const newPosition = direction === "left" ? prev - itemWidth : prev + itemWidth;

            return Math.max(0, Math.min(newPosition, maxScrollValue)); // ограничение новой позиции, чтобы она не выходила за пределы слайдера
        });
    };

    const { data } = useAppSelector((state) => state.weather);
    
    if (!data) {
        return null;
    };
    
    const groupedForecasts = groupForecastsByDay(data.list);
    const dates = Object.keys(groupedForecasts);
    const today = groupedForecasts[dates[0]];
    const todayLength = today.length;

    const isLastSlide = scrollPosition === getMaxScroll();

    return (
        <Container>
            <LeftContainerArrow $todayLength={todayLength} $scrollPosition={scrollPosition} onClick={() => handleScroll("left")}>
                <ArrowItem>&lsaquo;</ArrowItem>
            </LeftContainerArrow>
            <SliderContainer ref={sliderSection} $todayLength={todayLength}>
                <SliderContent today={today}/>
            </SliderContainer>
            <RightContainerArrow $todayLength={todayLength} $isLastSlide={isLastSlide} onClick={() => handleScroll("right")}>
                <ArrowItem>&rsaquo;</ArrowItem>
            </RightContainerArrow>
        </Container>
    );
};

export default WeatherForecastSlider;

interface TodayLength {
    $todayLength: number;
};

interface ScrollPosition extends TodayLength {
    $scrollPosition: number;
};

interface IsLastSlide extends TodayLength {
    $isLastSlide: boolean;
};

const BaseContainerArrow = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 24.5rem;
    height: 10rem;
    width: 1.2rem;
    background: #e4e3e9;
    border-radius: 0.5rem;
    cursor: pointer;
    z-index: 1;

    @media (max-width: 440px) {
        top: 38.5rem;
    }
`;

const ItemPerView = css<TodayLength>`
    @media (min-width: 460px) {
        ${({ $todayLength }) => $todayLength === 4 && `
            display: none;
        `}}
    }

    @media (max-width: 475px) {
        ${({ $todayLength }) => $todayLength === 3 && `
            display: none;
        `}}
    }
`;

const Container = styled.section`
    display: flex;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    width: 100%;
`;

const SliderContainer = styled.section<TodayLength>`
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    width: 100%;
    gap: 2rem;

    @media (max-width: 396px) {
        gap: 0.95rem;    
    }

    ${({ $todayLength }) => $todayLength === 3 && `
        justify-content: center;
    `}}
`;

const LeftContainerArrow = styled.div<ScrollPosition>`
    ${BaseContainerArrow};
    left: 0;

    ${({ $scrollPosition }) => $scrollPosition === 0 && `
        display: none;
    `}

    ${ItemPerView};
`;

const RightContainerArrow = styled.div<IsLastSlide>`
    ${BaseContainerArrow};
    right: 0;

    ${({ $isLastSlide }) => $isLastSlide && `
        display: none;
    `}

    ${ItemPerView};
`;

const ArrowItem = styled.button`
    height: 100%;
    width: 100%;
    font-size: 1.8rem;
    background: transparent;
`;