import React, { lazy } from "react";
import SearchComponent from "./Search.tsx";

const Weather = lazy(() => import("../features/weather/Weather.tsx"));

const Display = () => {
	return (
		<>
			<SearchComponent />
			<Weather />
		</>
	);
};

export default Display;