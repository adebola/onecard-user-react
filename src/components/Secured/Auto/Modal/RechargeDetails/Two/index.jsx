import React, { useContext, useEffect, useState } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../../assets/mtn.svg";
import glo from "../../../../../../assets/glo.svg";
import mobile from "../../../../../../assets/9mobile.svg";
import airtel from "../../../../../../assets/airtel.svg";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import Button from "../../../../../Button/normal";
import ModePayment from "../../../../../PaymentType";

import Bene from "../Beneficiary";
import NumberFormat from "react-number-format";
import { SingleContext } from "../../../../../../context/SingleRecharge";
import { GlobalContext } from "../../../../../../context/GlobalProvider";
import { makeSingleRecharge } from "../../../../../../helper/requests";
const data = [
  { id: 1, airtime: "MTN-AIRTIME", name: "mtn", img: mtn },
  {
    id: 2,
    airtime: "AIRTEL-AIRTIME",
    name: "airtel",
    img: airtel,
  },
  { id: 3, airtime: "GLO-AIRTIME", name: "glo", img: glo },
  {
    id: 4,
    airtime: "9MOBILE-AIRTIME",
    name: "9mobile",
    img: mobile,
  },
];

const Input = styled(ReactInputMask)`
  width: 100%;
  height: 50px;
  margin-top: 5px;
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid var(--text-color)"};
  border-radius: 4px;
  outline: none;
  background: none;
  padding: 0.5rem;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
  }
`;

const NormalInput = styled(NumberFormat)`
  width: 100%;
  height: 50px;
  margin-top: 5px;
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid var(--text-color)"};
  border-radius: 4px;
  outline: none;
  background: none;
  padding: 0.5rem;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
  }
`;

const Form = styled.form``;

const ErrorBox = styled.div`
  color: red;
  font-size: 11px;
  margin-top: 3px;
`;

const BoldText = styled.div`
  font-size: 12px;
  margin-top: 10px;
  font-weight: bold;
  color: var(--btn-color);
`;

const Two = () => {
  const { paymentMode } = useContext(GlobalContext);

  const {
    setServiceProviderError,
    serviceProviderError,
    rechargeId,
    serviceProviderType,
    serviceName,
    setServiceProviderType,
    setMessage,
  } = useContext(SingleContext);

  useEffect(() => {
    setServiceProviderType(0);
  }, [setServiceProviderType]);

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //handle blur phone number errors
  const handleBlur = () => {
    if (phoneNumber === "             " || phoneNumber === "") {
      setPhoneError("Enter a phone number");
      return;
    }
    if (
      phoneNumber.startsWith("0") &&
      phoneNumber.replace(/\D+/g, "").match(/^\d{11}$/g)
    ) {
      setPhoneError("");
    } else {
      setPhoneError("Enter a valid phone number");
    }
  };

  //handleAmount Error
  const handleAmountBlur = () => {
    if (amount === "") {
      setAmountError("Enter amount");
    } else {
      setAmountError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBlur();
    handleAmountBlur();
    //handleServiceProviderError
    if (serviceProviderType === 0) {
      setServiceProviderError("Select a Service Provider");
    } else {
      setServiceProviderError("");
    }
    if (
      !amount ||
      !phoneNumber ||
      amountError ||
      phoneError ||
      serviceProviderError ||
      phoneNumber.replace(/\D+/g, "").length < 11
    )
      return;
    const data = populateData();

    if (rechargeId === 1) {
      makeSingleRecharge(data)
        .then((res) => console.log(res))
        .catch((err) => {
          const message = err.response.data.message;
          console.log(message);
        });
    } else if (rechargeId === 2) {
      console.log("2", data);
    } else {
      console.log("3", data);
    }
  };

  const populateData = () => {
    let message;
    let data;
    if (rechargeId === 1) {
      data = {
        serviceCost: amount.replace(/\D+/g, ""),
        recipient: phoneNumber.replace(/\D+/g, ""),
        serviceCode: serviceName,
        paymentMode,
        rechargeType: "single",
        redirectUrl:
          paymentMode === "paystack"
            ? `${window.origin}${window.location.pathname}`
            : "",
      };

      message = {
        phoneNumber,
        amount,
        serviceName,
      };

      setMessage(message);
    } else if (rechargeId === 2) {
      data = {
        serviceCost: amount.replace(/\D+/g, ""),
        recipient: phoneNumber.replace(/\D+/g, ""),
        serviceCode: serviceName,
        paymentMode,
        rechargeType: "single",
        redirectUrl:
          paymentMode === "paystack"
            ? `${window.origin}${window.location.pathname}`
            : "",
      };
      message = {
        phoneNumber,
        amount,
        serviceName,
      };

      setMessage(message);
    } else {
      data = {
        serviceCost: amount.replace(/\D+/g, ""),
        recipient: phoneNumber.replace(/\D+/g, ""),
        serviceCode: serviceName,
        paymentMode,
        rechargeType: "single",
        redirectUrl:
          paymentMode === "paystack"
            ? `${window.origin}${window.location.pathname}`
            : "",
      };
      message = {
        phoneNumber,
        amount,
        serviceName,
      };

      setMessage(message);
    }
    return data;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ServiceProvider data={data} />
      <ErrorBox>{serviceProviderError}</ErrorBox>
      <Bene />
      <BoldText>Amount</BoldText>
      <NormalInput
        value={amount}
        onBlur={handleAmountBlur}
        thousandSeparator={true}
        error={amountError}
        placeholder="Enter Amount"
        onChange={({ target }) => setAmount(target.value)}
      />
      <ErrorBox>{amountError}</ErrorBox>
      <BoldText>Phone number</BoldText>
      <Input
        placeholder="Enter Phone number"
        value={phoneNumber}
        type="tel"
        maskChar=" "
        error={phoneError}
        onBlur={handleBlur}
        mask="999 9999 9999"
        onChange={({ target }) => setPhoneNumber(target.value)}
      />

      <ErrorBox>{phoneError}</ErrorBox>
      <ModePayment />

      <Button name="Submit" type={"submit"} />
    </Form>
  );
};

export default Two;
