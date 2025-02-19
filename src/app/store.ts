import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice.ts";
import placeReducer from "../features/place/placeSlice.ts";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        place: placeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;