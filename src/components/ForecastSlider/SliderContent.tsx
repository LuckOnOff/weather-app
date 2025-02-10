import React, { useCallback } from "react";
import { MemoizedSliderContentItem } from "./SliderContentItem.tsx";
import { useAppSelector } from "../../hooks/useAppSelector.ts";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { setActiveIndex } from "../../features/weather/weatherSlice.ts";

const SliderContent = () => {
    const dispatch = useAppDispatch();
    
    const selectedForecast = useAppSelector((state) => state.weather.selectedForecast);
    const activeIndex = useAppSelector((state) => state.weather.activeIndex);

    const handleSelect = useCallback((index: number) => {
        dispatch(setActiveIndex(index));

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [dispatch]);

    return (
        <>
            {selectedForecast?.map((date, index) => (
                <MemoizedSliderContentItem
                    key={date.dt}
                    date={date}
                    isActive={activeIndex === index}
                    index={index}
                    onClickSelect={handleSelect}
                />
            ))}
        </>
    );
};


export default SliderContent;