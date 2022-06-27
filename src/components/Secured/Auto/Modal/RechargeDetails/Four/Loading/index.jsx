import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";
import MySelect from "react-select";
import MyStyledButton from "../../../../../../MyStyledButton";
import { GlobalContext } from "../../../../../../../context/GlobalProvider";
import { getCardDetails } from "../../../../../../../helper/noauthrequests";
import { SingleContext } from "../../../../../../../context/SingleRecharge";
import { convertDate } from "../../../../../../../utils/dateformat";

const Container = styled.div`
  background-color: var(--light-background);
  padding: 15px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const MinHeight = styled.div`
  height: 100px;
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

const NewSelect = styled(MySelect)`
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid var(--text-color)"};
  border-radius: 4px;
  background: transparent;
  padding: 5px;

  svg {
    fill: ${({ error }) => (error ? "red" : "var(--text-color)")};
  }

  .css-1okebmr-indicatorSeparator {
    background: none;
  }
`;

const FullContainer = styled.form`
  width: 100%;
`;

const Error = styled.p`
  color: red;
  text-align: center;
  font-size: 12px;
`;

const Loading = ({ cardNumber, cableType }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [selected, setSelected] = useState({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [authUrl, setAuthUrl] = useState("");
  const {
    setServiceProviderError,
    serviceProviderError,
    rechargeId,
    serviceProviderType,
    setServiceProviderType,
    setMessage,
    serviceName,
  } = useContext(SingleContext);
  const { startDate, paymentMode } = useContext(GlobalContext);

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
      const response = await getCardDetails(data);

      if (response.data.status === 400) {
        setError("User with card number not found, please try again");
        setIsLoading(false);
        return;
      }
      setName(response.data.customerName);
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
    };
    awaitResponse();
  }, [cardNumber, cableType]);

  const handleChange = (e) => {
    setSelected(e);
  };

  const disabled = Object.entries(selected).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = populateData();
    console.log(data);
  };

  const populateData = () => {
    const scheduledDate = convertDate(startDate);

    let message;
    let data;
    if (rechargeId === 2) {
      data = {
        recipient: cardNumber,
        name: selected.name,
        productId: selected.code,
        scheduledDate,
        paymentMode,
        serviceCode: cableType,
        redirectUrl:
          paymentMode === "wallet"
            ? ""
            : `${window.origin}${window.location.pathname}`,
      };
    } else {
      data = {
        recipient: cardNumber,
        name: selected.name,
        productId: selected.code,
        serviceCode: cableType,
        paymentMode,
        redirectUrl:
          paymentMode === "wallet"
            ? ""
            : `${window.origin}${window.location.pathname}`,
      };
    }
    return data;
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
          <NewSelect
            placeholder={
              Object.entries(selected).length === 0 && "Select a plan"
            }
            onChange={handleChange}
            options={details}
            styles={{
              control: () => ({
                backgroundColor: "transparent",
                display: "flex",
              }),
            }}
          />
        </MinHeight>

        <MyStyledButton
          clicked={btnDisabled}
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
