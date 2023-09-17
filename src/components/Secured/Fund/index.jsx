import { FundBoxOne, FundBoxTwo } from "./styles";
import React, { useContext, useEffect, useState } from "react";
import { getBalance, transferFund, verifyUser } from "../../../helper/requests";

import Amount from "./Amount";
import Container from "../../Container";
import { GlobalContext } from "../../../context/GlobalProvider";
import HamburgerMenu from "../../Hamburger";
import Loader from "../../Modal/Loader/index";
import MenuList from "../../Hamburger/Menulist";
import MyStyledButton from "../../MyStyledButton";
import PaymentMethod from "./PaymentMethod";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import WalletBalance from "../../WalletBalance/index";
import WalletTab from "./WalletTab";
import Wrapper from "../../Wrapper";
import { isPositive } from "../../../utils";
import styled from "styled-components";

const BoldText = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: var(--btn-color);
`;

const Input = styled.input`
  width: 340px;
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

const SendMoneyContainer = styled.div`
  margin-top: 20px;
`;

const UserDetails = styled.div`
  margin: 3px 0px;
  margin-bottom: 9px;
  color: var(--text-color);

  p {
    font-weight: bold;
    font-size: 12px;
  }
`;

const ErrorBox = styled.div`
  color: red;
  font-size: 11px;
`;

const Fund = () => {
  const { balance, setBalance } = useContext(GlobalContext);

  const [toggle, setToggle] = useState(false);
  const [tabOption, setTabOption] = useState(1);
  const [userID, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTwoMessage, setErrorTwoMessage] = useState("");

  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!userID) {
      setUserDetails({});
    }
  }, [userID]);

  useEffect(() => {
    if (amount) {
      setErrorTwoMessage("");
    }
  }, [amount]);

  useEffect(() => {
    if (amount !== "" && !isPositive(amount)) {
      setErrorTwoMessage("Invalid amount");
    }

    if (isPositive(amount) && Number(amount) <= 50) {
      setErrorTwoMessage("Can't transfer fund less than 50.00");
    }
  }, [amount]);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const res = await getBalance();
        setBalance(res.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    reload && awaitResponse();
  }, [reload, setBalance]);

  const handleBlur = async () => {
    if (!userID) {
      return;
    }
    try {
      const response = await verifyUser(userID);
      setUserDetails(response.data);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !userID) {
      setErrorMessage("This field is required");
      return;
    }
    const data = { recipient: userID, amount };
    try {
      await transferFund(data);
      setMessage("Success");
    } catch (error) {
      const message = error.response.data.message;
      setMessage(message);
      console.log(message);
    }
  };

  const resetDetails = () => {
    setMessage("");
    setAmount("");
    setUserDetails({});
    setUserID("");
    setReload(true);
  };

  const renderSendMoney = () => {
    return (
      <form onSubmit={handleSubmit}>
        <SendMoneyContainer>
          <BoldText> Username or User ID </BoldText>
          <Input
            onChange={({ target }) => {
              setUserID(target.value);
            }}
            type="tel"
            maskChar=" "
            value={userID}
            onBlur={handleBlur}
            mask="999 9999 9999"
            placeholder="Username or email"
          />
          {!userID && <ErrorBox>{errorMessage}</ErrorBox>}

          <UserDetails>
            <p>
              {userDetails?.firstName} {userDetails?.lastName}
            </p>
            <p>{userDetails?.email}</p>
          </UserDetails>
          <BoldText>Amount</BoldText>
          <Input
            onChange={({ target }) => {
              setAmount(target.value);
            }}
            type="tel"
            maskChar=" "
            value={amount}
            onBlur={handleBlur}
            mask="999 9999 9999"
            placeholder="Enter amount"
          />
          <ErrorBox>{errorTwoMessage}</ErrorBox>
        </SendMoneyContainer>
        <WalletBalance flex={true} balance={balance} nolimit />

        <MyStyledButton name="Transfer" myStyles={{ marginTop: "10px" }} />
      </form>
    );
  };

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />
      <Wrapper>
        <TopHeader header="Wallet" />
        <WalletTab tabOption={tabOption} setTabOption={setTabOption} />
        {tabOption === 1 && (
          <Container>
            <FundBoxOne>
              <SmallText text="Payment Method" />
              <PaymentMethod />
            </FundBoxOne>
            <FundBoxTwo>
              <SmallText text="Enter Amount" />
              <Amount />
            </FundBoxTwo>
          </Container>
        )}

        {tabOption === 2 && renderSendMoney()}
        {message && (
          <Loader
            amount={amount}
            setMessage={setMessage}
            message={message}
            resetDetails={resetDetails}
            username={userDetails.userName}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Fund;
