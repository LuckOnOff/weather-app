import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiKey } from '../../keys/weatherApiKey.ts';
import WeatherResponse, { List } from '../../types/WeatherResponse.ts';
import groupForecastsByDay from '../../utils/groupForecastsByDay.ts';

interface WeatherState {
  data: WeatherResponse | null;
  groupedData: Record<string, List[]> | null;
  loading: boolean;
  error: string | null;
  successfully: boolean | null;
  selectedForecast: List[] | null;
  dataKeys: string[] | null;
  activeIndex: number;
}

const initialState: WeatherState = {
  data: null,
  groupedData: null,
  loading: false,
  error: null,
  successfully: null,
  selectedForecast: null,
  dataKeys: null,
  activeIndex: 0
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=ru`);

    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }

    const responseData: WeatherResponse = await response.json();
    return responseData;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setActiveIndex(state, action: PayloadAction<number>) {
        state.activeIndex = action.payload;
    },
    setWeatherData(state, action: PayloadAction<WeatherResponse>) {
      state.data = action.payload;
      state.groupedData = groupForecastsByDay(action.payload.list);
      state.dataKeys = Object.keys(state.groupedData);
    },
    setSelectedForecast(state, action: PayloadAction<List[] | null>) {
        state.selectedForecast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherResponse>) => {
        state.loading = false;
        state.successfully = true;
        state.data = action.payload;
        state.groupedData = groupForecastsByDay(action.payload.list);
        state.dataKeys = Object.keys(state.groupedData);

        const firstDate = Object.keys(state.groupedData)[0] || null;
        state.selectedForecast = firstDate ? state.groupedData[firstDate] : null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.successfully = false;
        state.error = action.error.message || 'Произошла ошибка получения данных';
      });
  },
});

export const { setWeatherData, setActiveIndex, setSelectedForecast } = weatherSlice.actions;
export default weatherSlice.reducer;