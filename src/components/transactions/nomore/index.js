import React from "react";
import styled from "styled-components";

const NoSearch = styled.div`
  p {
    color: var(--text-color);
    font-size: 12px;
  }
`;

const NoMoreSearch = () => {
  return (
    <div>
      <NoSearch>
        <p> No results found. Try another search.</p>
      </NoSearch>
    </div>
  );
};

export default NoMoreSearch;
