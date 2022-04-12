import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";
import MySelect from "react-select";
import MyStyledButton from "../../../../../../MyStyledButton";
import {
  getCardDetails,
  makeCableRecharge,
} from "../../../../../../../helper/noauthrequests";

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

const NewSelect = styled(MySelect)``;

const FullContainer = styled.form`
  width: 100%;
`;

const Error = styled.p`
  color: red;
  text-align: center;
  font-size: 12px;
`;

const Loading = ({ cardNumber, cableType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authUrl, setAuthUrl] = useState("");
  const [details, setDetails] = useState([]);
  const [selected, setSelected] = useState({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authUrl !== "") {
      window.location = authUrl;
      return;
    }
    return;
  }, [authUrl]);

  useEffect(() => {
    const data = {
      recipient: cardNumber,
      serviceCode: cableType,
    };
    const awaitResponse = async () => {
      try {
        const response = await getCardDetails(data);
        if (response.data.status === 400) {
          setError("User with card number not found, please try again");
          setIsLoading(false);
          return;
        }
        setDetails(
          response.data.object.map((each, index) => {
            return {
              label: `${each.name} ${each.price}`,
              value: `${each.name} ${each.price}`,
              id: index,
              ...each,
            };
          })
        );
        setIsLoading(false);
        setError("");
        setName(response.data.customerName);
      } catch (error) {
        setIsLoading(false);
        setError("Something went wrong, please try again");
      }
    };
    awaitResponse();
  }, [cardNumber, cableType]);

  const handleChange = (e) => {
    setSelected(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;

    data = {
      recipient: cardNumber,
      name: selected.name,
      serviceCost: selected.price,
      productId: selected.code,
      serviceCode: cableType,
      redirectUrl: `${window.origin}${window.location.pathname}`,
      paymentMode: "paystack",
    };

    try {
      const response = await makeCableRecharge(data);
      if (response.data.authorizationUrl !== null) {
        setAuthUrl(response.data.authorizationUrl);
        localStorage.setItem("id", JSON.stringify(response.data.id));

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disabled = Object.entries(selected).length === 0;

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
          <NewSelect
            placeholder={
              Object.entries(selected).length === 0 && "Select a plan"
            }
            onChange={handleChange}
            options={details}
          />
        </MinHeight>
        <MyStyledButton
          disabled={disabled}
          name="Submit"
          myStyles={{ width: "100%" }}
        />
      </FullContainer>
    );
  } else {
    return <Error>{error}</Error>;
  }
};

export default Loading;
