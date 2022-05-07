import React, { useContext, useState } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../assets/mtn.svg";
import glo from "../../../../../assets/glo.svg";
import mobile from "../../../../../assets/9mobile.svg";
import airtel from "../../../../../assets/airtel.svg";
import spectranet from "../../../../../assets/nologg.png";
import smile from "../../../../../assets/nosmile.png";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import Select from "react-select";
import Bene from "../Beneficiary";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import { css } from "styled-components";

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

  {
    id: 5,
    airtime: "SPECTRANET-AIRTIME",
    data: "SPECTRANET-DATA",
    name: "spectranet",
    img: spectranet,
  },
  {
    id: 6,
    airtime: "SMILE-AIRTIME",
    data: "SMILE-DATA",
    name: "smile",
    img: smile,
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

const NormalInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  outline: none;
  padding: 0.5rem;
  margin: 15px 0;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
  }
`;

const MySelect = styled(Select)`
  border: 1px solid #7f8e97;
  border-radius: 4px;
  background: transparent;
  padding: 5px;
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

const One = () => {
  const {
    airtimeId,
    bulkPhoneNumber,
    setBulkPhoneNumber,
    setSelectedSingleDataPlans,
    selectedSingleDataPlans,
    serviceName,
    setServiceName,
    accountNumber,
    setAccountNumber,
  } = useContext(GlobalContext);

  const [dataPlans, setDataPlans] = useState([]);

  const handelSelectedDataPlans = (e) => {
    setSelectedSingleDataPlans(e);
  };

  return (
    <>
      <ServiceProvider
        setServiceName={setServiceName}
        serviceName={serviceName}
        setDataPlans={setDataPlans}
        data={airtime}
        type={1}
      />
      {airtimeId !== 0 && (
        <>
          <Bene />
          <BoldText>Select a data plan</BoldText>
          <MySelect
            value={
              Object.entries(selectedSingleDataPlans).length > 0
                ? selectedSingleDataPlans
                : "Select a plan"
            }
            options={dataPlans}
            onChange={handelSelectedDataPlans}
            placeholder="Select a plan"
            styles={{
              control: () => ({
                backgroundColor: "transparent",
                display: "flex",
              }),
            }}
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
              <BoldText mt="14">Phone number</BoldText>
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

export default One;
