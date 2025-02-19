import React, { RefObject, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const SliderArrows = ({ sliderSection }: SliderArrowsProps) => {
    const localTime = useAppSelector((state) => state.weather.localTime);
    const currentHour = Number(localTime?.startsWith('0') ? localTime?.slice(1, 2) : localTime?.slice(0, 2));

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const width = rootFontSize * 10.1; // размер в rem
    const newItemWidth = width * 3;

    const [scrollState, setScrollState] = useState({
        scrollPosition: currentHour * width,
        itemWidth: 0,
        maxScroll: 0,
    });

    useEffect(() => {
        if(sliderSection.current) {
            sliderSection.current.scrollTo({
                left: currentHour * width,
                behavior: "smooth"
            })
        }
    }, [currentHour, sliderSection, width]);

    // функция для вычисления itemWidth в пикселях
    const updateDimensions = useCallback(() => {
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
    }, [sliderSection, newItemWidth]);

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

    const isLastSlide = scrollState.scrollPosition >= scrollState.maxScroll;

    return (
        <>
            <LeftContainerArrow
                $scrollPosition={scrollState.scrollPosition} 
                onClick={() => handleScroll("left")}
            >
                <ArrowItem>&lsaquo;</ArrowItem>
            </LeftContainerArrow>
            <RightContainerArrow
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

interface ScrollPosition {
    $scrollPosition: number;
};

interface IsLastSlide {
    $isLastSlide: boolean;
};

const BaseContainerArrow = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0.5rem;
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
    left: -0.9rem;

    ${({ $scrollPosition }) => $scrollPosition === 0 && `
        display: none;
    `}
`;

const RightContainerArrow = styled.div<IsLastSlide>`
    ${BaseContainerArrow};
    right: -0.7rem;

    ${({ $isLastSlide }) => $isLastSlide && `
        display: none;
    `}
`;

const ArrowItem = styled.button`
    height: 100%;
    width: 100%;
    font-size: 1.8rem;
    background: transparent;
`;