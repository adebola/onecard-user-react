import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { GlobalContext } from "../../context/GlobalProvider";
import { getBalance } from "../../helper/requests";
import { formatBalance } from "../../utils/formatBalance";

const Balance = styled.div`
  display: flex;
  margin-top: 20px;
  ${({ flex }) =>
    !flex &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;

const LightText = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: var(--text-color);
`;

const StrongText = styled.p`
  color: var(--text-color);
  font-size: 10px;
  font-weight: 700;
  margin-left: 3px;
`;

const WalletBalance = ({ flex }) => {
  const { balance, setBalance } = useContext(GlobalContext);
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
  return (
    <>
      <Balance flex={flex}>
        <LightText>Wallet Balance:</LightText>
        <StrongText>&#x20A6;{formatBalance(balance)}</StrongText>
      </Balance>
    </>
  );
};

export default WalletBalance;
