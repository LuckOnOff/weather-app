import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiKey } from '../../keys/weatherApiKey.ts';
import { WeatherResponse } from '../../types/WeatherResponse.ts';

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  successfully: boolean | null;
  selectedDay: number | null;
  localTime: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  successfully: null,
  selectedDay: null,
  localTime: null
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ lat, lon }: { lat: string | null; lon: string | null; }) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=3&q=${lat + ',' + lon}&lang=RU`);

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
    setWeatherData(state, action: PayloadAction<WeatherResponse>) {
      state.data = action.payload;
    },
    setSelectedDay(state, action: PayloadAction<number | null>) {
      state.selectedDay = action.payload;
    }
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
        state.localTime = (state.data.location.localtime)?.split(' ')[1];

        if (process.env.NODE_ENV === 'development') {
          console.log('data: ', state.data);
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.successfully = false;
        state.data = null;
        state.error = action.error.message || 'Произошла ошибка получения данных';
      })
  },
});

export const { setWeatherData, setSelectedDay } = weatherSlice.actions;
export default weatherSlice.reducer;