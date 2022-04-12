import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { convertNewDate } from "../../../../utils/dateformat";
import { formatBalance } from "../../../../utils/formatBalance";
import { getBalance } from "../../../../helper/requests";
import {
  BalanceText,
  Bottom,
  Container,
  DateText,
  Middle,
  OneCard,
  Top,
} from "./styles";

const Balance = () => {
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

  let today = new Date();
  let date =
    today.getFullYear() + " " + today.getMonth() + " " + today.getDate();
  let newDate = convertNewDate(date);

  const finalBalance = formatBalance(balance);
  return (
    <Container>
      <Top>
        <OneCard>OneCard Nigeria</OneCard>
      </Top>
      <Middle>
        <BalanceText>&#x20A6;{finalBalance}</BalanceText>
      </Middle>
      <Bottom>
        <DateText>{newDate}</DateText>
      </Bottom>
    </Container>
  );
};

export default Balance;
