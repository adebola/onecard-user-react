import React, { useContext, useEffect, useState } from "react";
import ServiceProvider from "../Service";
import mtn from "../../../../../../assets/mtn.svg";
import glo from "../../../../../../assets/glo.svg";
import mobile from "../../../../../../assets/9mobile.svg";
import airtel from "../../../../../../assets/airtel.svg";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";
import Button from "../../../../../Button/normal";
import { GlobalContext } from "../../../../../../context/GlobalProvider";
import { makeSingleRecharge } from "../../../../../../helper/noauthrequests";
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
  margin-top: 15px;
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

const Two = () => {
  const { setResponseModal } = useContext(ModalContext);

  const {
    singlePhoneNumber,
    singleAmount,
    setSingleAmount,
    setSinglePhoneNumber,
    setResponseMessage,
  } = useContext(GlobalContext);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    if (authUrl !== "") {
      window.location = authUrl;
      return;
    }
    return;
  }, [authUrl]);

  const disabled =
    singlePhoneNumber === "" || singleAmount === "" || serviceName === "";

  const resetAllValue = () => {
    setSinglePhoneNumber("");
    setSingleAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    if (btnDisabled) return;
    let localData;
    const data = {
      recipient: singlePhoneNumber.replace(/\D+/g, ""),
      serviceCost: singleAmount,
      paymentMode: "paystack",
      serviceCode: serviceName,
      redirectUrl: `${window.origin}${window.location.pathname}`,
    };
    localData = {
      amount: singleAmount,
      recipient: singlePhoneNumber,
    };

    try {
      const response = await makeSingleRecharge(data);

      if (response.data.authorizationUrl !== null) {
        setAuthUrl(response.data.authorizationUrl);
        localStorage.setItem("id", JSON.stringify(response.data.id));
        localStorage.setItem("data", JSON.stringify(localData));
        setBtnDisabled(false);
        resetAllValue();
        return;
      }
    } catch (e) {
      setResponseModal(true);
      setResponseMessage("Something went wrong, please try again");
      setBtnDisabled(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ServiceProvider
        mb="true"
        serviceName={serviceName}
        setServiceName={setServiceName}
        data={airtime}
      />
      <NormalInput
        placeholder="Enter amount"
        type="number"
        value={singleAmount}
        onChange={({ target }) => {
          setSingleAmount(target.value);
        }}
      />
      <Input
        type="tel"
        maskChar=" "
        value={singlePhoneNumber}
        onChange={({ target }) => {
          setSinglePhoneNumber(target.value);
        }}
        mask="999 9999 9999"
        placeholder="Enter phone number"
      />

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
