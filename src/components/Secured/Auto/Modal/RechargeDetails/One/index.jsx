import React, { useContext, useEffect, useState } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../../assets/mtn.svg";
import glo from "../../../../../../assets/glo.svg";
import spectranet from "../../../../../../assets/nologg.png";
import smile from "../../../../../../assets/nosmile.png";
import mobile from "../../../../../../assets/9mobile.svg";
import airtel from "../../../../../../assets/airtel.svg";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import Select from "react-select";
import MyStyledButton from "../../../../../MyStyledButton";
import Bene from "../Beneficiary";
import { css } from "styled-components";
import { SingleContext } from "../../../../../../context/SingleRecharge";
import { editSingleAutoRechargePlan } from "../../../../../../helper/requests";
import { convertDate } from "../../../../../../utils/dateformat";
import { ModalContext } from "../../../../../../context/ModalProvider";

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
    data: "SPECTRANET-DATA",
    name: "spectranet",
    img: spectranet,
  },
  {
    id: 6,
    data: "SMILE-DATA",
    name: "smile",
    img: smile,
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

const MySelect = styled(Select)`
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid var(--text-color)"};
  border-radius: 4px;
  background: transparent;
  padding: 5px;

  svg {
    fill: ${({ error }) => (error ? "red" : "var(--text-color)")};
  }

  .css-1okebmr-indicatorSeparator {
    background: none;
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
  font-weight: bold;
  color: var(--btn-color);

  ${({ mt }) =>
    mt &&
    css`
      margin-top: ${mt}px;
    `}
`;

const One = () => {
  const [selectedDataPlan, setSelectedDataPlan] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [dataError, setDataError] = useState("");

  const { monthlyAutoRecharge, weeklyAutoRecharge } = useContext(ModalContext);

  const id = new URLSearchParams(window.location.search).get("id");

  //singleContext
  const {
    phoneNumber,
    setPhoneNumber,
    rechargeData,
    serviceProviderType,
    serviceProviderError,
    setServiceProviderError,
    serviceName,
    setRechargeData,
    setServiceProviderType,
    setMessage,
    name,
    startDate,
    endDate,
    boldText,
    autoRecharge,
  } = useContext(SingleContext);

  useEffect(() => {
    setServiceProviderType(0);
  }, [setServiceProviderType]);

  useEffect(() => {
    setServiceProviderError("");
    setPhoneNumber("");
    setRechargeData([]);
  }, [setServiceProviderError, setPhoneNumber, setRechargeData]);

  // console.log(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //handle phone number errors
    handleBlur();
    //handleSelectedDataPlan errors
    handleBlurDataPlans();
    //handleServiceProviderError
    if (serviceProviderType === 0) {
      setServiceProviderError("Select a Service Provider");
    } else {
      setServiceProviderError("");
    }

    if (
      !phoneNumber ||
      !selectedDataPlan ||
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
      productId: selectedDataPlan.id,
      recipient: phoneNumber.replace(/\D+/g, ""),
      serviceCode: serviceName,
    };

    message = {
      phoneNumber,
      amount: selectedDataPlan.value,
      serviceName,
    };

    setMessage(message);
    return data;
  };

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

  //handle blur selectedDataPlan errors
  const handleBlurDataPlans = () => {
    if (!selectedDataPlan) {
      setDataError("Select a Plan Data");
    } else {
      setDataError("");
    }
  };

  // handleDataPlan Select
  const handleDataPlanChange = (e) => {
    // console.log(e);
    setSelectedDataPlan(e);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ServiceProvider
        data={airtime}
        setSelectedDataPlan={setSelectedDataPlan}
      />
      <ErrorBox>{serviceProviderError}</ErrorBox>
      <Bene />
      <BoldText>Select a data plan</BoldText>
      <MySelect
        error={dataError}
        onBlur={handleBlurDataPlans}
        onChange={handleDataPlanChange}
        options={rechargeData}
        value={selectedDataPlan}
        styles={{
          control: () => ({
            backgroundColor: "transparent",
            display: "flex",
          }),
        }}
      />
      <ErrorBox>{dataError}</ErrorBox>

      {/* <NormalInput /> */}

      <BoldText mt="15">Phone number</BoldText>
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
      {/* <Button name="Submit" /> */}
      <MyStyledButton
        name="Submit"
        myStyles={{ width: "100%", marginTop: "30px" }}
      />
    </Form>
  );
};

export default One;
