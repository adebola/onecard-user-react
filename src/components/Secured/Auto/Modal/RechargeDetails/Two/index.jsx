import React, { useContext, useEffect, useState } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../../assets/mtn.svg";
import glo from "../../../../../../assets/glo.svg";
import mobile from "../../../../../../assets/9mobile.svg";
import airtel from "../../../../../../assets/airtel.svg";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import MyStyledButton from "../../../../../MyStyledButton";
import Bene from "../Beneficiary";
import NumberFormat from "react-number-format";
import { SingleContext } from "../../../../../../context/SingleRecharge";
import { editSingleAutoRechargePlan } from "../../../../../../helper/requests";
import { convertDate } from "../../../../../../utils/dateformat";
import { ModalContext } from "../../../../../../context/ModalProvider";

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
  const id = new URLSearchParams(window.location.search).get("id");

  const { monthlyAutoRecharge, weeklyAutoRecharge } = useContext(ModalContext);
  const {
    setServiceProviderError,
    serviceProviderError,
    serviceProviderType,
    setServiceProviderType,
    setMessage,
    serviceName,
    name,
    startDate,
    endDate,
    boldText,
    autoRecharge,
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
    let splitStartDate = startDate.toString().split(" ")[0];

    let isNum = isNaN(splitStartDate.charAt(0));
    const checkEndDate = (str) => {
      if (str === null) {
        return null;
      } else {
        let splitStartDate = str.toString().split(" ")[0];
        let isNum = isNaN(splitStartDate.charAt(0));
        if (isNum) {
          return convertDate(str);
        } else {
          return str;
        }
      }
    };

    const dataToSend = {
      title: name,
      startDate: isNum ? convertDate(startDate) : startDate,
      endDate: checkEndDate(endDate),
      daysOfWeek:
        boldText === "Weekly" && weeklyAutoRecharge.length === 0
          ? autoRecharge
          : weeklyAutoRecharge,
      daysOfMonth:
        boldText === "Monthly" && monthlyAutoRecharge.length === 0
          ? autoRecharge
          : monthlyAutoRecharge,
      recipients: [data],
    };
    editSingleAutoRechargePlan(id, dataToSend)
      .then((res) => console.log(res))
      .catch((err) => {
        const message = err.response.data.message;
        console.log(message);
      });
  };

  const populateData = () => {
    let message;

    let data = {
      serviceCost: amount.replace(/\D+/g, ""),
      recipient: phoneNumber.replace(/\D+/g, ""),
      serviceCode: serviceName,
    };

    message = {
      phoneNumber,
      amount,
      serviceName,
    };

    setMessage(message);

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

      <MyStyledButton
        name="Submit"
        myStyles={{ width: "100%", marginTop: "30px" }}
      />
    </Form>
  );
};

export default Two;
