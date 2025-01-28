import React from "react";
import SearchComponent from "../features/search/SearchComponent.tsx";
import Error404 from "./Error404.tsx";
import { keyframes } from "styled-components";

const Display = () => {

    return (
        <>
            <SearchComponent />
            <Error404 fadeIn={fadeIn} />
        </>
    )
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