import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice.ts";
import weatherReducer from "../features/weather/weatherSlice.ts";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        weather: weatherReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;