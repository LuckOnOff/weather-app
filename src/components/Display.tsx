import React, { Suspense, lazy } from "react";
import SearchComponent from "./Search.tsx";
import Spinner from "./UI/Spinner.tsx";

const Weather = lazy(() => import("./Weather/Weather.tsx"));

const Display = () => {
	return (
		<>
			<SearchComponent />
			  <Suspense fallback={<Spinner />}>
				<Weather />
			</Suspense>
		</>
	);
};

export default Display;