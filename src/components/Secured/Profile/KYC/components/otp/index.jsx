import React, { useRef, useState } from "react";

import styled from "styled-components";
import { useKYCVerified } from "../../hooks/useVerified";

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 10px;

  .info {
    color: var(--text-color);
    font-size: 13px;
  }
  .otp {
    gap: 10px;
    display: flex;
  }
`;

const OtpDigit = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid
    ${(props) => (props.isActive ? "var(--text-color)" : "#ccc")};
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 1px solid var(--text-color);
  }
`;

const OtpInput = ({ length, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const { phoneNumber } = useKYCVerified();

  const handleChange = (event, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = event.target.value;

    setOtp(updatedOtp);

    if (updatedOtp.every((digit) => digit !== "")) {
      onComplete(updatedOtp.join(""));
    }

    if (event.target.value && index < length - 1) {
      inputRefs.current[index + 1].focus(); // Move focus to the next input
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
      inputRefs.current[index - 1].focus(); // Move focus to the previous input
    }
  };

  function formatPhoneNumber(phoneNumber) {
    const formatted = phoneNumber.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
    return formatted;
  }

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  console.log(formattedPhoneNumber); // Output: "0905 447 2953"

  return (
    <InputContainer>
      <div className="otp">
        {otp.map((digit, index) => (
          <OtpDigit
            key={index}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            isActive={index === otp.findIndex((val) => val === "")}
            ref={(input) => (inputRefs.current[index] = input)}
          />
        ))}
      </div>
      <div>
        <p className="info">
          Type the verfication code sent to you on{" "}
          <strong>{formattedPhoneNumber}.</strong>
        </p>
      </div>
    </InputContainer>
  );
};

export default OtpInput;
