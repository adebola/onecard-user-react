import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalProvider";

const Container = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Inner = styled.div`
  display: flex;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Text = styled.p`
  margin-left: 3px;
  font-size: 12px;
`;

const RadioButton = styled.input``;

const ModePayment = ({ rechargeId }) => {
  const { paymentMode, setPaymentMode } = useContext(GlobalContext);

  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };
  return (
    <Container>
      <Inner>
        <RadioButtonContainer>
          <RadioButton
            type="radio"
            checked={paymentMode === "wallet"}
            onChange={handlePaymentMode}
            name="payment"
            value="wallet"
          />
          <Text>Wallet</Text>
        </RadioButtonContainer>
        {rechargeId !== 3 && (
          <RadioButtonContainer>
            <RadioButton
              type="radio"
              checked={paymentMode === "paystack"}
              onChange={handlePaymentMode}
              name="payment"
              value="paystack"
            />
            <Text>Bank</Text>
          </RadioButtonContainer>
        )}
      </Inner>
    </Container>
  );
};

export default ModePayment;
