import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { AuthContext } from "../../../../context/AuthProvider";
import { ModalContext } from "../../../../context/ModalProvider";
import {
  fundWallet,
  getBalance,
  getFundWalletResponse,
} from "../../../../helper/requests";
import { formatBalance } from "../../../../utils/formatBalance";
import Button from "../../../Button/normal";
import PhoneNumber from "react-number-format";

const AmountContainer = styled.form``;

const AmountInner = styled.div`
  height: 297px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  padding: 2rem 1rem;
`;

export const TopContainer = styled.div`
  flex: 1;
`;

export const SmallText = styled.p`
  color: var(--text-color);
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: left;
`;

export const StrongText = styled.p`
  font-size: 30px;
  color: var(--btn-color);
  font-style: normal;
  font-weight: 900;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
  margin: 10px 0;
`;

export const MiddleInput = styled(PhoneNumber)`
  padding: 0.7rem 0.8rem;
  width: 100%;
  margin-top: 8px;
  color: var(--text-color);
  transition: all 0.2s ease;
  outline: none;
  border: 1px solid var(--text-color);
  border-radius: 9px;

  &::placeholder {
    color: var(--text-color);

    opacity: 0.7;
  }

  &:focus {
    border: 1.5px solid var(--text-color);
  }
`;

export const Middle = styled.div`
  flex: 1;
`;

export const Bottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Amount = () => {
  const [amount, setAmount] = useState("");
  const [authUrl, setAuthUrl] = useState(null);
  const { balance, setBalance, setResponseMessage } = useContext(GlobalContext);

  const { authId } = useContext(AuthContext);
  const { setResponseModal } = useContext(ModalContext);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const res = await getBalance();
        setBalance(res.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    awaitResponse();
  }, [setBalance]);

  const [clicked, setClicked] = useState(false);

  const finalBalance = formatBalance(balance);

  useEffect(() => {
    if (!authUrl) return;

    window.location = authUrl;
  }, [authUrl]);

  useEffect(() => {
    if (authId === null) return;
    const awaitResponse = async () => {
      if (localStorage.getItem("id")) {
        try {
          const parsedId = JSON.parse(localStorage.getItem("id"));
          const response = await getFundWalletResponse(parsedId);
          setResponseModal(true);
          setResponseMessage(response.data.message);
        } catch (error) {
          setResponseModal(true);
          setResponseMessage("Something went wrong, please try again");
          setClicked(false);
        }
      }
    };
    awaitResponse();
  }, [authId, setResponseMessage, setResponseModal]);

  const disabled = amount === "";

  const handleSubmit = async (e) => {
    // e.preventDefault();
    e.preventDefault();

    setClicked(true);
    if (clicked) {
      return;
    }

    const data = {
      amount: amount.replace(/\D+/g, ""),
      redirectUrl: `${window.origin}${window.location.pathname}`,
    };
    try {
      const response = await fundWallet(data);
      if (response.data.authorizationUrl) {
        localStorage.setItem("id", JSON.stringify(response.data.id));
        setAuthUrl(response.data.authorizationUrl);
      }
    } catch (e) {
      setResponseModal(true);
      setResponseMessage("Something went wrong, please try again");
      setClicked(false);
    }
  };

  return (
    <>
      <AmountContainer onSubmit={handleSubmit}>
        <AmountInner>
          <TopContainer>
            <SmallText>Available Balance</SmallText>
            <StrongText>&#x20A6;{finalBalance}</StrongText>
          </TopContainer>
          <Middle>
            <SmallText>Enter Amount</SmallText>
            <MiddleInput
              thousandSeparator={true}
              value={amount}
              onChange={({ target }) => setAmount(target.value)}
              placeholder="20,000"
            />
          </Middle>
          <Bottom>
            <ButtonContainer>
              <Button
                disabled={disabled}
                className={clicked && "not-allowed"}
                myStyle={{ padding: ".8rem 2rem" }}
                name="Make Payment"
              />
            </ButtonContainer>
          </Bottom>
        </AmountInner>
      </AmountContainer>
    </>
  );
};

export default Amount;
