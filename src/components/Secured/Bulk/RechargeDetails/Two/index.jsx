import React, { useContext, useState } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../assets/mtn.svg";
import glo from "../../../../../assets/glo.svg";
import mobile from "../../../../../assets/9mobile.svg";
import airtel from "../../../../../assets/airtel.svg";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import Bene from "../Beneficiary";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import { css } from "styled-components";
import NumberFormat from "react-number-format";

const airtime = [
  { id: 1, airtime: "MTN-AIRTIME", data: "MTN-DATA", name: "mtn", img: mtn },
  {
    id: 2,
    airtime: "AIRTEL-AIRTIME",
    data: "AIRTEL-DATA",
    name: "airtel",
    img: airtel,
  },
  { id: 3, airtime: "GLO-AIRTIME", data: "GLO-DATA", name: "glo", img: glo },
  {
    id: 4,
    airtime: "9MOBILE-AIRTIME",
    data: "9MOBILE-DATA",
    name: "9mobile",
    img: mobile,
  },
];

const Input = styled(ReactInputMask)`
  width: 100%;
  margin: 15px 0;
  height: 50px;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  outline: none;
  padding: 0.5rem;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
  }
`;

const NormalInput = styled(NumberFormat)`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  outline: none;
  padding: 0.5rem;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
  }
`;

const BoldText = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: var(--btn-color);

  ${({ mt }) =>
    mt &&
    css`
      margin-top: ${mt}px;
    `}
`;

const Two = () => {
  const [accountNumber, setAccountNumber] = useState("");

  const {
    airtimeId,
    serviceName,
    setServiceName,
    bulkSingleAmount,
    setBulkSingleAmount,
    bulkPhoneNumber,
    setBulkPhoneNumber,
  } = useContext(GlobalContext);

  return (
    <>
      <ServiceProvider
        setServiceName={setServiceName}
        serviceName={serviceName}
        data={airtime}
      />
      {airtimeId !== 0 && (
        <>
          <Bene />
          <BoldText>Amount</BoldText>
          <NormalInput
            placeholder="Enter amount"
            thousandSeparator={true}
            value={bulkSingleAmount}
            onChange={({ target }) => setBulkSingleAmount(target.value)}
          />
          {airtimeId === 5 || airtimeId === 6 ? (
            <NormalInput
              type="number"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={({ target }) => {
                setAccountNumber(target.value);
              }}
            />
          ) : (
            <>
              <BoldText>Phone number</BoldText>
              <Input
                onChange={({ target }) => {
                  setBulkPhoneNumber(target.value);
                }}
                type="tel"
                maskChar=" "
                value={bulkPhoneNumber}
                mask="999 9999 9999"
                placeholder="Enter phone number"
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Two;
