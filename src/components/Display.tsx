import React, { Suspense, lazy } from "react";
import { keyframes } from "styled-components";
import SearchComponent from "../features/search/SearchComponent.tsx";
import Spinner from "./UI/Spinner.tsx";

const Error404 = lazy(() => import("./Error404.tsx"));
const Weather = lazy(() => import("./Weather/Weather.tsx"));

const Display = () => {
	return (
		<>
			<SearchComponent />
			  <Suspense fallback={<Spinner />}>
				<Error404 fadeIn={fadeIn} />
				<Weather fadeIn={fadeIn} />
			</Suspense>
		</>
	);
};

const fadeIn = keyframes`
	from {
    	opacity: 0;
    	scale: 0;
	}

  	to {
   		opacity: 1;
    	scale: 1;
  	}
`;

export default Display;