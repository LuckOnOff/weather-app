import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponsePlace } from "../../types/PlaceResponse.ts";

export const fetchPlaces = createAsyncThunk(
	'weather/fetchPlaces',
	async (city: string) => {
	  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1`);
  
	  if (!response.ok) {
		throw new Error('Ошибка запроса');
	  }
  
	  const data: ResponsePlace[] = await response.json();

	  return data;
	}
);

interface PlaceState {
	places: ResponsePlace[] | null;
	loading: boolean;
	error: string | null;
	pickedPlace: ResponsePlace | null;
	lon: string | null;
	lat: string | null;
};

const initialState: PlaceState = {
	places: null,
	loading: false,
	error: null,
	pickedPlace: null,
	lon: null,
	lat: null
};

const placeSlice = createSlice({
	name: "place",
	initialState: initialState,
	reducers: {
		setClearPlaces(state) {
			state.places = null;
		},
		setPickedPlace(state, action: PayloadAction<number>) {
			if (state.places && state.places.length > action.payload) {
				state.pickedPlace = state.places[action.payload];
				state.lat = state.pickedPlace.lat;
				state.lon = state.pickedPlace.lon;
			}
		}		
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchPlaces.pending, (state) => {
			state.loading = true;
		})
		.addCase(fetchPlaces.fulfilled, (state, action: PayloadAction<ResponsePlace[]>) => {
			state.loading = false;
			state.places = action.payload;
			console.log("Места: ",state.places);
		})
		.addCase(fetchPlaces.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Ошибка при поиске мест';
		});
	}
});

export const { setClearPlaces, setPickedPlace } = placeSlice.actions;
export default placeSlice.reducer;