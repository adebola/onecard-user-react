import { MobileResponsive } from "../../responsive/mobileresponsive";
import React from "react";
import styled from "styled-components";

const InnerContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 50px;

  ${MobileResponsive({
    flexDirection: "column",
  })}
`;

const Container = ({ children }) => {
  return <InnerContainer> {children}</InnerContainer>;
};

export default Container;
