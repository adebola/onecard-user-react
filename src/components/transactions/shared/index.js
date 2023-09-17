import React from "react";
import styled from "styled-components";
import { CirclesWithBar } from "react-loader-spinner";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SharedContainer = () => {
  return (
    <Flex>
      <Flex>
        <CirclesWithBar
          height="30"
          width="30"
          color="#EB6A2B"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="circles-with-bar-loading"
        />
      </Flex>
    </Flex>
  );
};

export default SharedContainer;
