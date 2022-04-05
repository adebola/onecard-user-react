import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";
import { getCardDetails } from "../../../../../../helper/noauthrequests";

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
  margin-top: 20px;
  width: 100%;
  padding: 9px 12px;
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

const FullContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const Error = styled.p`
  color: red;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
`;
const Loading = ({
  serviceName,
  name,
  setName,
  amount,
  setAmount,
  selected,
  accountNumber,
  telephone,
  setTelephone,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accountNumber) return;
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
  }, [setIsLoading, serviceName, setName, accountNumber, selected.value]);

  if (isLoading) {
    return (
      <SpinnerContainer>
        <SyncLoader size={6} color="#EB6A2B" margin={7} />
      </SpinnerContainer>
    );
  } else if (!error) {
    return (
      <FullContainer>
        <MinHeight>
          <Container>
            <Span>Name:</Span>
            <Text> {name}</Text>
          </Container>
          <Input
            placeholder="Enter Amount"
            value={amount}
            onChange={({ target }) =>
              setAmount(target.value.replace(/[^0-9]/g, ""))
            }
          />
          <Input
            placeholder="Enter telephone"
            value={telephone}
            onChange={({ target }) =>
              setTelephone(target.value.replace(/[^0-9]/g, ""))
            }
          />
        </MinHeight>
      </FullContainer>
    );
  } else {
    return <Error>{error}</Error>;
  }
};

export default Loading;
