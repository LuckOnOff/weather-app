import React, { RefObject, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const SliderArrows = ({ sliderSection, currentHour }: SliderArrowsProps) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const width = rootFontSize * 10.095; // размер в rem

    const [scrollParams, setScrollParams] = useState({
        scrollPosition: currentHour * width,
        viewZoneWidth: width * 3,
        maxScroll: 0,
    });

    useEffect(() => {
        if (sliderSection.current && sliderSection.current.scrollLeft !== currentHour * width) {
            sliderSection.current.scrollTo({ 
                left: currentHour * width, 
                behavior: "smooth" 
            });
        }
    }, [currentHour, sliderSection, width]);    

    // функция для вычисления itemWidth в пикселях
    const updateDimensions = useCallback(() => {
        setScrollParams((prevState) => ({
            ...prevState,
            viewZoneWidth: width * 3,
        }));
    
        // проверка на null и обновление maxScroll
        if (sliderSection.current) {
            const maxScroll = sliderSection.current.scrollWidth - sliderSection.current.clientWidth;

            setScrollParams((prevState) => ({
                ...prevState,
                maxScroll,
            }));
        }
    }, [sliderSection, width]);

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
        setScrollParams((prevState) => {
            const newPosition = direction === "left" ?
                prevState.scrollPosition - prevState.viewZoneWidth :
                prevState.scrollPosition + prevState.viewZoneWidth;

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

    const isLastSlide = scrollParams.scrollPosition >= scrollParams.maxScroll;

    return (
        <>
            <LeftContainerArrow
                $scrollPosition={scrollParams.scrollPosition} 
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
    currentHour: number;
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
    transition: background 0.3s;

	&:hover {
        background:rgb(178, 178, 178);
    }

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