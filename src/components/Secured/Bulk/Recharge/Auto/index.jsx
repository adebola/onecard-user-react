import React, { useContext, useState } from "react";
import styled from "styled-components";
import Select from "./Select";
import { monthly, weekly } from "./data";
import ScheduleDatePicker from "../../../../DatePicker";
import { ModalContext } from "../../../../../context/ModalProvider";

const Container = styled.div`
  margin-top: ${({ top }) => (top ? `${top}px` : "10px")};
`;

const Text = styled.div`
  color: var(--btn-color);
  font-weight: bold;
  font-size: 12px;
  margin-bottom: ${({ top }) => (top ? `${top}px` : "")};
`;

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 8px;
  border-radius: 3px;

  outline: none;
`;

const InnerContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const RadioText = styled.p`
  margin-left: 3px;
  font-size: 12px;
  color: var(--text-color);
`;

const RadioButton = styled.input``;

const AutoRecharge = () => {
  const [type, setType] = useState("");
  const {
    rechargeName,
    setRechargeName,
    setMonthlyAutoRecharge,
    setWeeklyAutoRecharge,
  } = useContext(ModalContext);
  const renderInput = () => {
    return (
      <Container top="30">
        <Text top="13"> Name</Text>
        <Input
          value={rechargeName}
          placeholder="Recharge name"
          onChange={({ target }) => setRechargeName(target.value)}
        />
      </Container>
    );
  };

  const renderWeekly = () => {
    return (
      <Container>
        <Text>Weekly</Text>
        <Select isWeekly={true} data={weekly} />
      </Container>
    );
  };

  const renderMonthly = () => {
    return (
      <Container>
        <Text>Monthly</Text>
        <Select isWeekly={false} data={monthly} />
      </Container>
    );
  };

  const handlePaymentMode = (e) => {
    setType(e.target.value);
    if (e.target.value === "monthly") {
      setWeeklyAutoRecharge([]);
    } else {
      setMonthlyAutoRecharge([]);
    }
  };

  return (
    <div>
      {renderInput()}
      <InnerContainer>
        <RadioButtonContainer>
          <RadioButton
            type="radio"
            checked={type === "weekly"}
            onChange={handlePaymentMode}
            name="recharge"
            value="weekly"
          />
          <RadioText>Weekly</RadioText>
        </RadioButtonContainer>
        <RadioButtonContainer>
          <RadioButton
            type="radio"
            checked={type === "monthly"}
            onChange={handlePaymentMode}
            name="recharge"
            value="monthly"
          />
          <RadioText>Monthly</RadioText>
        </RadioButtonContainer>
      </InnerContainer>
      {type === "weekly" && renderWeekly()}
      {type === "monthly" && renderMonthly()}
      {type !== "" && (
        <>
          <ScheduleDatePicker left="true" />
          <ScheduleDatePicker right="true" />
        </>
      )}
    </div>
  );
};

export default AutoRecharge;
