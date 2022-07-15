import React, { useEffect, useState } from "react";
import Container from "../../Container";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import PaymentMethod from "./PaymentMethod";
import Amount from "./Amount";
import { FundBoxOne, FundBoxTwo } from "./styles";

import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import WalletTab from "./WalletTab";
import styled from "styled-components";
import MyStyledButton from "../../MyStyledButton";
import { transferFund, verifyUser } from "../../../helper/requests";
import Loader from "../../Modal/Loader/index";

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

const SendMoneyContainer = styled.form`
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

const Fund = () => {
  const [toggle, setToggle] = useState(false);
  const [tabOption, setTabOption] = useState(1);
  const [userID, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userID.length === 36) {
      const awaitResponse = async () => {
        try {
          const response = await verifyUser(userID);
          setUserDetails(response.data);
        } catch (error) {
          const message = error.response.data.message;
          console.log(message);
        }
      };
      awaitResponse();
    }
  }, [userID]);

  const handleBlur = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  const renderSendMoney = () => {
    return (
      <SendMoneyContainer onSubmit={handleSubmit}>
        <BoldText>User ID or Username</BoldText>
        <Input
          onChange={({ target }) => {
            setUserID(target.value);
          }}
          type="tel"
          maskChar=" "
          value={userID}
          onBlur={handleBlur}
          mask="999 9999 9999"
          placeholder="Enter user id"
        />

        {Object.keys(userDetails).length !== 0 && (
          <>
            <UserDetails>
              <p>
                {userDetails.firstName} {userDetails.lastName}
              </p>
              <p>{userDetails.email}</p>
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

            <MyStyledButton name="Transfer" myStyles={{ marginTop: "10px" }} />
          </>
        )}
      </SendMoneyContainer>
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
