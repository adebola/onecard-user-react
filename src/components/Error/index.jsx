import React, { useContext } from "react";
import styled from "styled-components";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
const ErrorText = styled.p`
  color: red;
  margin: 5px 0;
  font-size: 12px;
`;

const Error = ({ msg }) => {
  const { clicked, details, selectedId, activeId } = useContext(
    SingleRechargeContext
  );
  const { accountType } = details;

  if (selectedId === 3 && activeId === 1 && accountType === "") {
    return <ErrorText>{msg}</ErrorText>;
  }
  return <ErrorText>{clicked && msg}</ErrorText>;
};

export const ErrorMessage = () => {
  const { errorMessage } = useContext(SingleRechargeContext);
  return <ErrorText>{errorMessage}</ErrorText>;
};

export default Error;
