import React, { RefObject, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { SelectedForecastLength } from "../../types/SelectedForecastLength.ts";

const SliderArrows = ({ sliderSection }: SliderArrowsProps) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [maxScroll, setMaxScroll] = useState<number>(0);
    const [isLastSlide, setIsLastSlide] = useState<boolean>(false);

    // функция для вычисления itemWidth в пикселях
    const updateItemWidth = useCallback(() => {
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const width = rootFontSize * 10; // размер в rem
        setItemWidth(width * 3);
    }, []);
    
    // обновление максимального скролла
    const updateMaxScroll = useCallback(() => {
        if (sliderSection.current) {
            setMaxScroll(sliderSection.current.scrollWidth - sliderSection.current.clientWidth);
        }
    }, [sliderSection]);

    useEffect(() => {
        updateItemWidth();
        updateMaxScroll();

        window.addEventListener("resize", updateItemWidth);
        window.addEventListener("resize", updateMaxScroll);

        return () => {
            window.removeEventListener("resize", updateItemWidth);
            window.removeEventListener("resize", updateMaxScroll);
        };
    }, [updateItemWidth, updateMaxScroll]);

    useEffect(() => {
        if (sliderSection.current) {
            sliderSection.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }

        // проверка, достигли ли конца скролла
        setIsLastSlide(scrollPosition >= maxScroll);
    }, [scrollPosition, maxScroll, sliderSection]);

    const handleScroll = useCallback((direction: "left" | "right"): void => {
        setScrollPosition((prev) => {
            const newPosition = direction === "left" ? prev - itemWidth : prev + itemWidth;
            return Math.max(0, Math.min(newPosition, maxScroll));
        });
    }, [itemWidth, maxScroll]);

    const { selectedForecast } = useAppSelector((state) => state.weather);
    const selectedForecastLength = selectedForecast?.length;

    return (
        <>
            <LeftContainerArrow
                $selectedForecastLength={selectedForecastLength}
                $scrollPosition={scrollPosition} 
                onClick={() => handleScroll("left")}
            >
                <ArrowItem>&lsaquo;</ArrowItem>
            </LeftContainerArrow>
            <RightContainerArrow
                $selectedForecastLength={selectedForecastLength}
                $isLastSlide={isLastSlide} 
                onClick={() => handleScroll("right")}
            >
                <ArrowItem>&rsaquo;</ArrowItem>
            </RightContainerArrow>
        </>
    );
};

export default SliderArrows;

interface SliderArrowsProps {
    sliderSection: RefObject<HTMLDivElement | null>;
};

interface ScrollPosition extends SelectedForecastLength {
    $scrollPosition: number;
};

interface IsLastSlide extends SelectedForecastLength {
    $isLastSlide: boolean;
};

const BaseContainerArrow = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 31.5rem;
    height: 10rem;
    width: 1.2rem;
    background: #e4e3e9;
    border-radius: 0.5rem;
    cursor: pointer;
    z-index: 1;

    @media (max-width: 480px) {
        display: none;
    }
`;

const LeftContainerArrow = styled.div<ScrollPosition>`
    ${BaseContainerArrow};
    left: 0;

    ${({ $scrollPosition }) => $scrollPosition === 0 && `
        display: none;
    `}

    ${({ $selectedForecastLength }) => ($selectedForecastLength || 0) <= 3 && `
        display: none;
    `}
`;

const RightContainerArrow = styled.div<IsLastSlide>`
    ${BaseContainerArrow};
    right: 0;

    ${({ $isLastSlide }) => $isLastSlide && `
        display: none;
    `}

    ${({ $selectedForecastLength }) => ($selectedForecastLength || 0) <= 3 && `
        display: none;
    `}
`;

const ArrowItem = styled.button`
    height: 100%;
    width: 100%;
    font-size: 1.8rem;
    background: transparent;
`;