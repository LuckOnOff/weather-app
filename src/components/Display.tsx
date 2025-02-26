import React, { Suspense, lazy } from "react";
import SearchComponent from "./Search.tsx";
import Spinner from "./UI/Spinner.tsx";

const Error404 = lazy(() => import("./Error404.tsx"));
const Weather = lazy(() => import("./Weather/Weather.tsx"));

const Display = () => {
	return (
		<>
			<SearchComponent />
			  <Suspense fallback={<Spinner />}>
				<Error404 />
				<Weather />
			</Suspense>
		</>
	);
};

export default Display;