import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";
import MyStyledButton from "../../../../../../MyStyledButton";
import {
  getCardDetails,
  makeCableRecharge,
} from "../../../../../../../helper/noauthrequests";
import { ModalContext } from "../../../../../../../context/ModalProvider";

const Container = styled.div`
  background-color: var(--light-background);
  padding: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const Input = styled.input`
  margin-top: 7px;
  width: 100%;
  padding: 9px 12px;
  @media (max-width: 768px) {
    margin-bottom: 2px;
    margin-top: 6px;
  }
`;

const MinHeight = styled.div`
  height: 150px;
`;

const Text = styled.div`
  color: var(--text-color);
  text-transform: uppercase;
  font-size: 12px;
`;

const Span = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-right: 3px;
  color: var(--text-color);
`;

const FullContainer = styled.form`
  width: 100%;
  margin-top: 10px;
`;

const Error = styled.p`
  color: red;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
`;

const AmountError = styled.p`
  color: red;
  margin-top: 4px;
  font-size: 10px;
`;

const Loading = ({ serviceName, accountNumber, selected }) => {
  const min = 1000;
  const max = 999;
  const [name, setName] = useState("");
  const [authUrl, setAuthUrl] = useState("");
  const [error, setError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [telephone, setTelephone] = useState("");
  const [amountError, setAmountError] = useState("");

  const { setErrorModal, setErrorMessage } = useContext(ModalContext);

  useEffect(() => {
    if (amount > max) {
      setAmountError("");
    }
  }, [amount]);

  useEffect(() => {
    if (authUrl !== "") {
      window.location = authUrl;
      return;
    }
    return;
  }, [authUrl]);

  useEffect(() => {
    const awaitResponse = async () => {
      let data;

      if (serviceName === "JED") {
        data = {
          recipient: accountNumber,
          serviceCode: serviceName,
        };
      } else {
        data = {
          recipient: accountNumber,
          serviceCode: serviceName,
          accountType: selected.value.toLowerCase(),
        };
      }

      try {
        const response = await getCardDetails(data);
        setIsLoading(false);
        if (response.data.status === 400) {
          setError("User with card number not found, please try again");
          return;
        }
        setIsLoading(false);
        setError("");
        setName(response.data.customerName);
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data.message);
      }
    };

    awaitResponse();
  }, [setIsLoading, serviceName, accountNumber, selected.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    if (btnDisabled) {
      return;
    }
    let finalData;

    if (serviceName === "JED") {
      finalData = {
        recipient: accountNumber,
        serviceCode: serviceName,
        serviceCost: amount,
        telephone,
        paymentMode: "paystack",
        redirectUrl: `${window.origin}${window.location.pathname}`,
      };
    } else {
      finalData = {
        recipient: accountNumber,
        serviceCode: serviceName,
        serviceCost: amount,
        telephone,
        accountType: selected.value.toLowerCase(),
        paymentMode: "paystack",
        redirectUrl: `${window.origin}${window.location.pathname}`,
      };
    }

    try {
      const response = await makeCableRecharge(finalData);
      if (response.data.authorizationUrl) {
        setBtnDisabled(false);
        setAuthUrl(response.data.authorizationUrl);
        localStorage.setItem("id", JSON.stringify(response.data.id));
        localStorage.setItem("cable", JSON.stringify(true));
      }
    } catch (error) {
      const message = error.response.data.message;
      setErrorModal(true);
      setErrorMessage(message);
    }
  };

  const disabled = amount < min || !telephone;

  const handleAmount = (e) => {
    if (amount < min) {
      setAmountError("Minimum amount is #1,000");
    }
  };

  if (isLoading) {
    return (
      <SpinnerContainer>
        <SyncLoader size={6} color="#EB6A2B" margin={7} />
      </SpinnerContainer>
    );
  } else if (!error) {
    return (
      <FullContainer onSubmit={handleSubmit}>
        <MinHeight>
          <Container>
            <Span>Name:</Span>
            <Text> {name}</Text>
          </Container>
          <Input
            placeholder="Enter Amount"
            value={amount}
            onBlur={handleAmount}
            onChange={({ target }) =>
              setAmount(target.value.replace(/[^0-9]/g, ""))
            }
          />
          <AmountError>{amountError}</AmountError>
          <Input
            placeholder="Enter telephone"
            value={telephone}
            onChange={({ target }) =>
              setTelephone(target.value.replace(/[^0-9]/g, ""))
            }
          />
        </MinHeight>

        <MyStyledButton
          clicked={btnDisabled}
          disabled={disabled}
          name="Submit"
          myStyles={{ width: "100%", marginTop: "10px" }}
        />
      </FullContainer>
    );
  } else {
    return <Error>{error}</Error>;
  }
};

export default Loading;
