import React, { RefObject, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { SelectedForecastLength } from "../../types/SelectedForecastLength.ts";

const SliderArrows = ({ sliderSection }: SliderArrowsProps) => {
    const [scrollState, setScrollState] = useState({
        scrollPosition: 0,
        itemWidth: 0,
        maxScroll: 0,
    });

    // функция для вычисления itemWidth в пикселях
    const updateDimensions = useCallback(() => {
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const width = rootFontSize * 10; // размер в rem
        const newItemWidth = width * 3;
    
        setScrollState((prevState) => ({
            ...prevState,
            itemWidth: newItemWidth,
        }));
    
        // проверка на null и обновление maxScroll
        if (sliderSection.current) {
            const maxScroll = sliderSection.current.scrollWidth - sliderSection.current.clientWidth;

            setScrollState((prevState) => ({
                ...prevState,
                maxScroll,
            }));
        }
    }, [sliderSection]);

    // обновление размеров и максимальный скролл
    useEffect(() => {
        updateDimensions();

        const handleResize = () => {
            updateDimensions();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [updateDimensions]);

    const handleScroll = (direction: "left" | "right"): void => {
        setScrollState((prevState) => {
            const newPosition = direction === "left" ?
                prevState.scrollPosition - prevState.itemWidth :
                prevState.scrollPosition + prevState.itemWidth;

            // обновление позиции скролла и соблюдение границ
            if (sliderSection.current) {
                sliderSection.current.scrollTo({
                    left: Math.max(0, Math.min(newPosition, prevState.maxScroll)),
                    behavior: "smooth",
                });
            }

            return {
                ...prevState,
                scrollPosition: Math.max(0, Math.min(newPosition, prevState.maxScroll)),
            };
        });
    };

    const selectedForecast = useAppSelector((state) => state.weather.selectedForecast);
    const selectedForecastLength = selectedForecast?.length;

    const isLastSlide = scrollState.scrollPosition >= scrollState.maxScroll;

    return (
        <>
            <LeftContainerArrow
                $selectedForecastLength={selectedForecastLength}
                $scrollPosition={scrollState.scrollPosition} 
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