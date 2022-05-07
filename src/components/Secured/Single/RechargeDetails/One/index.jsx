import React, { useContext, useState, useEffect } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../assets/mtn.svg";
import glo from "../../../../../assets/glo.svg";
import spectranet from "../../../../../assets/nologg.png";
import smile from "../../../../../assets/nosmile.png";
import mobile from "../../../../../assets/9mobile.svg";
import airtel from "../../../../../assets/airtel.svg";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import Button from "../../../../Button/normal";
import Select from "react-select";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import ModePayment from "../../../../PaymentType";
import { ModalContext } from "../../../../../context/ModalProvider";
import {
  makeAutoRechargeRequest,
  makeScheduledRecharge,
  makeSingleRecharge,
} from "../../../../../helper/requests";
import { convertDate } from "../../../../../utils/dateformat";

import Bene from "../Beneficiary";
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

const MySelect = styled(Select)`
  border: 1px solid #7f8e97;
  border-radius: 4px;
  background: transparent;
  padding: 5px;
`;

const Form = styled.form``;

const ErrorBox = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
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
  const [disabled, setDisabled] = useState(false);

  const [authUrl, setAuthUrl] = useState("");
  const [dataPlans, setDataPlans] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    if (authUrl !== "") {
      window.location = authUrl;
      return;
    }
    return;
  }, [authUrl]);

  const {
    phoneNumber,
    setPhoneNumber,
    selectedSingleDataPlans,
    setSelectedSingleDataPlans,
    paymentMode,
    setResponseMessage,
    airtimeId,
    accountNumber,
    setAccountNumber,
    startDate,
    endDate,
  } = useContext(GlobalContext);

  const {
    setResponseModal,
    setResponseDetail,
    setErrorMessage,
    setErrorModal,
    rechargeType,
    setRechargeType,
    setCableMessage,
    rechargeName,
    weeklyAutoRecharge,
    monthlyAutoRecharge,
    error,
    setError,
  } = useContext(ModalContext);

  useEffect(() => {
    if (!selectedSingleDataPlans || !phoneNumber || !serviceName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [phoneNumber, serviceName, selectedSingleDataPlans]);

  useEffect(() => {
    if (
      paymentMode === "wallet" ||
      weeklyAutoRecharge.length > 0 ||
      monthlyAutoRecharge.length > 0
    ) {
      setBtnDisabled(false);
      setError("");
    }
  }, [paymentMode, setError, weeklyAutoRecharge, monthlyAutoRecharge]);

  useEffect(() => {}, []);

  const handelSelectedDataPlans = (e) => {
    setSelectedSingleDataPlans(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setBtnDisabled(true);

    // if (btnDisabled) {
    //   return;
    // }
    const scheduledDate = convertDate(startDate);

    if (rechargeType === 3) {
      let scheduledEndDate;
      if (!endDate) {
        scheduledEndDate = "";
      } else {
        scheduledEndDate = convertDate(endDate);
      }

      if (weeklyAutoRecharge.length === 0 && monthlyAutoRecharge.length === 0) {
        setError("Please choose a recharge plan (weekly or monthly)");
        return;
      }

      if (weeklyAutoRecharge.length > 0 && monthlyAutoRecharge.length > 0) {
        setError("Select either weekly or monthly recharge");
        return;
      }

      const data = {
        paymentMode,
        title: rechargeName,
        startDate: scheduledDate,
        endDate: scheduledEndDate,
        daysOfWeek: weeklyAutoRecharge,
        daysOfMonth: monthlyAutoRecharge,
        recipients: [
          {
            recipient: phoneNumber.replace(/\D+/g, ""),
            serviceCode: serviceName,
            productId: selectedSingleDataPlans.id,
          },
        ],
      };

      try {
        const response = await makeAutoRechargeRequest(data);
        setResponseModal(true);
        setBtnDisabled(false);
        resetAllValue();
        setRechargeType(1);
        setCableMessage(response.data.message);
      } catch (error) {
        setErrorModal(true);
        setErrorMessage(error.response.data.message);
        setBtnDisabled(false);
        resetAllValue();
      }
      return;
    }

    if (rechargeType === 2) {
      let data, localData;
      if (paymentMode === "wallet") {
        data = {
          paymentMode,
          rechargeType: "single",
          scheduledDate,
          recipients: [
            {
              recipient:
                phoneNumber !== ""
                  ? phoneNumber.replace(/\D+/g, "")
                  : accountNumber,
              productId: selectedSingleDataPlans.id,
              serviceCode: serviceName,
            },
          ],
        };

        const dataToDisplay = {
          amount: selectedSingleDataPlans.value,
          recipient:
            phoneNumber !== ""
              ? phoneNumber.replace(/\D+/g, "")
              : accountNumber,
        };
        setResponseDetail(dataToDisplay);
      } else {
        data = {
          paymentMode,
          rechargeType: "single",
          scheduledDate,
          recipients: [
            {
              recipient:
                phoneNumber !== ""
                  ? phoneNumber.replace(/\D+/g, "")
                  : accountNumber,
              productId: selectedSingleDataPlans.id,
              serviceCode: serviceName,
            },
          ],
          redirectUrl: `${window.origin}${window.location.pathname}`,
        };

        localData = {
          amount: selectedSingleDataPlans.value,
          recipient:
            phoneNumber !== ""
              ? phoneNumber.replace(/\D+/g, "")
              : accountNumber,
        };
      }

      try {
        const response = await makeScheduledRecharge(data);
        if (response.data.authorizationUrl !== null) {
          setAuthUrl(response.data.authorizationUrl);
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("data", JSON.stringify(localData));
          localStorage.setItem("type", JSON.stringify(rechargeType));
          setBtnDisabled(false);
          resetAllValue();
          return;
        } else {
          setResponseModal(true);
          setBtnDisabled(false);
          resetAllValue();
          setResponseMessage("Data Recharge");
        }
      } catch (error) {
        setErrorModal(true);
        setErrorMessage(error.response.data.message);
        setBtnDisabled(false);
      }
    } else {
      let data, localData;
      if (paymentMode === "wallet") {
        data = {
          productId: selectedSingleDataPlans.id,
          recipient:
            phoneNumber !== ""
              ? phoneNumber.replace(/\D+/g, "")
              : accountNumber,
          paymentMode,
          serviceCode: serviceName,
        };
        const dataToDisplay = {
          amount: selectedSingleDataPlans.value,
          recipient:
            phoneNumber !== ""
              ? phoneNumber.replace(/\D+/g, "")
              : accountNumber,
        };
        setResponseDetail(dataToDisplay);
      } else {
        data = {
          productId: selectedSingleDataPlans.id,
          recipient:
            phoneNumber !== ""
              ? phoneNumber.replace(/\D+/g, "")
              : accountNumber,
          paymentMode,
          serviceCode: serviceName,
          redirectUrl: `${window.origin}${window.location.pathname}`,
        };
        localData = {
          amount: selectedSingleDataPlans.value,
          recipient:
            phoneNumber !== ""
              ? phoneNumber.replace(/\D+/g, "")
              : accountNumber,
        };
      }
      try {
        const response = await makeSingleRecharge(data);

        if (response.data.authorizationUrl !== null) {
          setAuthUrl(response.data.authorizationUrl);
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("data", JSON.stringify(localData));

          if (rechargeType === 1 && serviceName === "SPECTRANET-DATA") {
            localStorage.setItem("name", JSON.stringify(serviceName));
          } else {
          }

          setBtnDisabled(false);
          resetAllValue();
          return;
        } else {
          setResponseModal(true);
          setBtnDisabled(false);

          if (rechargeType === 1 && serviceName === "SPECTRANET-DATA") {
            setCableMessage(response.data.message);
          } else {
            setResponseMessage("Data Recharge");
          }
          resetAllValue();
        }
      } catch (error) {
        setErrorModal(true);
        setErrorMessage(error.response.data.message);
        setBtnDisabled(false);
      }
    }
  };

  const resetAllValue = () => {
    setPhoneNumber("");
    setAccountNumber("");
    setSelectedSingleDataPlans({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ServiceProvider
        setServiceName={setServiceName}
        serviceName={serviceName}
        setDataPlans={setDataPlans}
        data={airtime}
        type={1}
      />
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
          <BoldText mt="17">Phone number</BoldText>
          <Input
            onChange={({ target }) => {
              setPhoneNumber(target.value);
            }}
            type="tel"
            maskChar=" "
            value={phoneNumber}
            mask="999 9999 9999"
            placeholder="Enter phone number"
          />
        </>
      )}
      <ModePayment rechargeId={rechargeType} />
      {error && <ErrorBox>{error}</ErrorBox>}
      <Button
        className={btnDisabled && "not-allowed"}
        name="Submit"
        type={"submit"}
        disabled={disabled}
      />
    </Form>
  );
};

export default One;
