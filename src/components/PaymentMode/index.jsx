import React, { useContext } from "react";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
import { ModalContext } from "../../context/ModalProvider";
import styled from "styled-components";

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

const PaymentMode = () => {
  const { rechargeType } = useContext(ModalContext);
  const { details, setDetails, selectedId } = useContext(SingleRechargeContext);

  const { paymentMode } = details;
  const handlePaymentMode = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Inner>
        <RadioButtonContainer>
          <RadioButton
            type="radio"
            checked={paymentMode === "wallet"}
            onChange={handlePaymentMode}
            name="paymentMode"
            value="wallet"
          />
          <Text>Wallet</Text>
        </RadioButtonContainer>

        {rechargeType === 3 || selectedId === 3 ? null : (
          <RadioButtonContainer>
            <RadioButton
              type="radio"
              checked={paymentMode === "paystack"}
              onChange={handlePaymentMode}
              name="paymentMode"
              value="paystack"
            />
            <Text>Bank</Text>
          </RadioButtonContainer>
        )}
      </Inner>
    </Container>
  );
};

export default PaymentMode;
