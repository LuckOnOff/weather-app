import React from "react";
import styled from "styled-components";
import SearchComponent from "../features/search/SearchComponent.tsx";

const Display = () => {

    return (
        <SearchForm>
            <SearchComponent />
        </SearchForm>
    )
};

export default Display;

const SearchForm = styled.form`
    width: 100%;
    margin-top: -0.3rem;
`;