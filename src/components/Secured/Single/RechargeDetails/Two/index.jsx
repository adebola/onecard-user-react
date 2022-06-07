import React, { useState, useEffect, useContext } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../assets/mtn.svg";
import glo from "../../../../../assets/glo.svg";
import mobile from "../../../../../assets/9mobile.svg";
import airtel from "../../../../../assets/airtel.svg";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import Button from "../../../../Button/normal";
import ModePayment from "../../../../PaymentType";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import {
  makeAutoRechargeRequest,
  makeScheduledRecharge,
  makeSingleRecharge,
} from "../../../../../helper/requests";
import { ModalContext } from "../../../../../context/ModalProvider";
import { convertDate } from "../../../../../utils/dateformat";
import Bene from "../Beneficiary";
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

  margin: 10px 0;
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
`;

const Two = () => {
  const [disabled, setDisabled] = useState(false);

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [authUrl, setAuthUrl] = useState("");

  const {
    phoneNumber,
    singleAmount,
    setSingleAmount,
    setPhoneNumber,
    setResponseMessage,
    startDate,
    airtimeId,
    paymentMode,
    endDate,
  } = useContext(GlobalContext);

  const {
    setResponseModal,
    setResponseDetail,
    setErrorModal,
    setErrorMessage,
    rechargeType,
    setRechargeType,
    rechargeName,
    weeklyAutoRecharge,
    monthlyAutoRecharge,
    error,
    setError,
    setCableMessage,
  } = useContext(ModalContext);

  useEffect(() => {
    if (authUrl !== "") {
      window.location = authUrl;
      return;
    }
    return;
  }, [authUrl]);

  useEffect(() => {
    setPhoneNumber("");
  }, [setPhoneNumber]);

  useEffect(() => {
    if (!phoneNumber || !singleAmount || !serviceName || !rechargeName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [phoneNumber, serviceName, singleAmount, rechargeName]);

  useEffect(() => {
    if (weeklyAutoRecharge.length > 0 || monthlyAutoRecharge.length > 0) {
      setBtnDisabled(false);
      setError("");
    }
  }, [setError, weeklyAutoRecharge, monthlyAutoRecharge]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) return;

    setBtnDisabled(true);
    if (btnDisabled) {
      return;
    }

    let data;
    let localData;

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
            serviceCost: singleAmount.replace(/\D+/g, ""),
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
      if (paymentMode === "wallet") {
        data = {
          paymentMode,
          rechargeType: "single",
          scheduledDate,
          recipients: [
            {
              recipient: phoneNumber.replace(/\D+/g, ""),
              serviceCode: serviceName,
              serviceCost: singleAmount.replace(/\D+/g, ""),
            },
          ],
        };
        const dataToDisplay = {
          amount: singleAmount,
          recipient: phoneNumber,
        };
        setResponseDetail(dataToDisplay);
      } else {
        data = {
          paymentMode,
          scheduledDate,
          rechargeType: "single",
          recipients: [
            {
              recipient: phoneNumber.replace(/\D+/g, ""),
              serviceCode: serviceName,
              serviceCost: singleAmount.replace(/\D+/g, ""),
            },
          ],
          redirectUrl: `${window.origin}${window.location.pathname}`,
        };
        localData = {
          amount: singleAmount,
          recipient: phoneNumber,
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
          setResponseMessage("SUCCESS");
        }
      } catch (error) {
        setErrorModal(true);
        setErrorMessage(error.response.data.message);
        setBtnDisabled(false);
      }
    } else {
      if (paymentMode === "wallet") {
        data = {
          serviceCost: singleAmount.replace(/\D+/g, ""),
          recipient: phoneNumber.replace(/\D+/g, ""),
          paymentMode,
          serviceCode: serviceName,
        };
        const dataToDisplay = {
          amount: singleAmount,
          recipient: phoneNumber,
        };
        setResponseDetail(dataToDisplay);
      } else {
        data = {
          serviceCost: singleAmount.replace(/\D+/g, ""),
          recipient: phoneNumber.replace(/\D+/g, ""),
          paymentMode,
          serviceCode: serviceName,
          redirectUrl: `${window.origin}${window.location.pathname}`,
        };
        localData = {
          amount: singleAmount,
          recipient: phoneNumber,
        };
      }
      try {
        const response = await makeSingleRecharge(data);
        if (response.data.authorizationUrl !== null) {
          setAuthUrl(response.data.authorizationUrl);
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("data", JSON.stringify(localData));
          setBtnDisabled(false);
          resetAllValue();
          return;
        } else {
          setResponseModal(true);
          setBtnDisabled(false);
          resetAllValue();
          setResponseMessage("SUCCESS");
        }
      } catch (error) {
        setErrorModal(true);
        setErrorMessage(error.response.data.message);
        setBtnDisabled(false);
      }
    }
  };

  const handleBlur = () => {
    if (phoneNumber === "             ") return;

    if (
      phoneNumber.startsWith("0") &&
      phoneNumber.replace(/\D+/g, "").match(/^\d{11}$/g)
    ) {
      setError("");
      return;
    } else {
      setError("Enter a valid phone number");
    }
  };

  const resetAllValue = () => {
    setPhoneNumber("");
    setSingleAmount("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ServiceProvider
        data={airtime}
        serviceName={serviceName}
        setServiceName={setServiceName}
      />
      <Bene />
      <BoldText>Amount</BoldText>
      <NormalInput
        thousandSeparator={true}
        placeholder="Enter amount"
        value={singleAmount}
        onChange={({ target }) => {
          setSingleAmount(target.value);
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
          <BoldText>Phone number</BoldText>
          <Input
            onChange={({ target }) => {
              setPhoneNumber(target.value);
            }}
            type="tel"
            maskChar=" "
            value={phoneNumber}
            onBlur={handleBlur}
            mask="999 9999 9999"
            placeholder="Enter phone number"
          />
        </>
      )}
      <ModePayment rechargeId={rechargeType} />

      {error && <ErrorBox>{error}</ErrorBox>}
      <Button
        className={btnDisabled && "not-allowed"}
        disabled={disabled}
        name="Submit"
        type={"submit"}
      />
    </Form>
  );
};

export default Two;
