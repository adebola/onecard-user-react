import React, { useContext } from "react";

import { ScaleLoader } from "react-spinners";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
`;

const Loader = ({ children }) => {
  const { showModal } = useContext(SingleRechargeContext);
  return (
    <Container>
      {showModal ? <ScaleLoader color="var(--text-color)" /> : children}
    </Container>
  );
};

export default Loader;
