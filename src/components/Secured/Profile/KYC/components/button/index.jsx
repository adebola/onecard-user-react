import React from "react";
import styled from "styled-components";

const Continue = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background: var(--text-color);
  color: var(--white);
  border-radius: 6px;

  width: 280px;
  padding: 17px 10px;
  margin-top: 20px;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Button = ({ onClick }) => {
  return <Continue onClick={onClick}>Continue</Continue>;
};

export default Button;
