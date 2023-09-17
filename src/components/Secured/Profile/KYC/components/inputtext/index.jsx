import InputMask from "react-input-mask";
import React from "react";
import styled from "styled-components";

const Label = styled.div`
  margin-bottom: 5px;
  color: var(--text-color);
  font-size: 13px;
  padding-top: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  border: 1px solid var(--text-color);
  padding: 10px 9px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 40px;
  width: 280px;

  input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 16px;

    &::placeholder {
      font-size: 13px;
      color: #4a4b4c;
    }
  }
`;

const InputText = ({ title, number, value, onChange }) => {
  return (
    <div>
      <Label>{title}</Label>
      <InputContainer>
        {number ? (
          <InputMask
            mask="9999 999 9999"
            value={value}
            maskChar=" "
            onChange={onChange}
            placeholder="Enter your phone number"
          />
        ) : (
          <input
            placeholder={`Enter your ${title.toLowerCase()}`}
            maxLength={11}
            onChange={onChange}
          />
        )}
      </InputContainer>
    </div>
  );
};

export default InputText;
