import React from "react";
import styled from "styled-components";

const InputContainer = styled.input`
  border: ${({ error }) =>
    error ? `1px solid red` : `1px solid var(--text-color)`};
  padding: 10px 30px 10px 10px;
  width: 100%;
  outline: none;
  border-radius: 4px;
`;

const Input = ({ placeholder, maxLength, error, onChange, value }) => {
  return (
    <div>
      <InputContainer
        error={error}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
