import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiKey } from '../../keys/weatherApiKey.ts';

interface WeatherState {
  data: unknown;
  loading: boolean;
  error: string | null;
  successfully: boolean | null;
  city: string;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  successfully: null,
  city: '',
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=ru `);

    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }

    const responseData = await response.json();

    console.log(responseData);

    return responseData; 
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.successfully = null;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.successfully = true;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.successfully = false;
        state.error = action.error.message || 'Произошла ошибка получения данных';
      });
  },
});

export const { setCity } = searchSlice.actions;
export default searchSlice.reducer;