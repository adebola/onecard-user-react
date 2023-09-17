import React, { useContext, useEffect } from "react";
import { getBalance, getUserDetails } from "../../helper/requests";
import styled, { css } from "styled-components";

import { GlobalContext } from "../../context/GlobalProvider";
import { Link } from "react-router-dom";
import { formatBalance } from "../../utils/formatBalance";
import { useKYCVerified } from "../Secured/Profile/KYC/hooks/useVerified";

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

const DailyLimit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 2px;

  .link {
    font-weight: 700;
    font-size: 10px;
    color: var(--text-color);
  }

  .flex {
    display: flex;
  }
`;

const WalletBalance = ({ flex, nolimit }) => {
  const { balance, setBalance } = useContext(GlobalContext);

  const {
    setKYCVerified,
    setDailyLimit,
    loading,
    kycVerified,
    dailyLimit,
    setLoading,
  } = useKYCVerified();

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

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const res = await getUserDetails();
        setKYCVerified(res.data.account.kycVerified);
        setDailyLimit(res.data.account.dailyLimit);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    awaitResponse();
  }, [setDailyLimit, setKYCVerified, setLoading]);

  const renderDailyLimit = () => {
    return (
      <DailyLimit>
        <div className="flex gap">
          <LightText>Your Daily Limit is</LightText>
          <StrongText>&#x20A6;{formatBalance(dailyLimit)},</StrongText>
        </div>
        <Link className="link" to="/profile">
          please verify your account to remove limit
        </Link>
      </DailyLimit>
    );
  };
  return (
    <>
      <Balance flex={flex}>
        <LightText>Wallet Balance:</LightText>
        <StrongText>&#x20A6;{formatBalance(balance)}</StrongText>
      </Balance>
      {!nolimit && <div>{!kycVerified && !loading && renderDailyLimit()}</div>}
    </>
  );
};

export default WalletBalance;
