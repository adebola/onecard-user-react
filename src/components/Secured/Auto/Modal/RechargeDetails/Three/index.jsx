import React, { useContext, useEffect, useState } from "react";
import ServiceProvider from "../Service";

import eko from "../../../../../../assets/eko.jpg";
import jos from "../../../../../../assets/jos.png";

import styled from "styled-components";
import Select from "react-select";
import Loading from "./Loading";
import { SingleContext } from "../../../../../../context/SingleRecharge";

const options = [
  {
    label: "Prepaid",
    value: "Prepaid",
  },
  {
    label: "Postpaid",
    value: "Postpaid",
  },
];

const nepa = [
  { id: 1, type: "EKEDP", img: eko },
  { id: 2, type: "JED", img: jos },
];

const Container = styled.div``;

const Inner = styled.div``;

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 5px;
  border: ${({ error }) =>
    error ? "1px solid red" : "1px solid var(--text-color)"};
  border-radius: 4px;
  outline: none;
  background: none;
  padding: 0.5rem;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
    opacity: 0.8;
  }
`;

const MySelect = styled(Select)`
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

const BoldText = styled.div`
  font-size: 12px;
  margin-top: 10px;
  font-weight: bold;
  color: var(--btn-color);
`;

const Three = () => {
  const { serviceName, setServiceName } = useContext(SingleContext);
  const [accountNumber, setAccountNumber] = useState("");
  const [selected, setSelected] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setServiceName("");
  }, [setServiceName]);

  useEffect(() => {
    if (!accountNumber) return;
    if (serviceName === "EKEDP" && accountNumber.length === 13) {
      setLoading(true);
    } else if (serviceName === "JED" && accountNumber.length === 11) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [accountNumber, setLoading, serviceName]);

  useEffect(() => {
    setAccountNumber("");
    setLoading(false);
  }, [serviceName]);

  const handleChange = (each) => {
    setSelected(each);
  };

  const renderEko = () => {
    return (
      <Container>
        <Inner>
          <BoldText>Select a plan</BoldText>
          <MySelect
            placeholder="Select a plan"
            options={options}
            value={
              Object.entries(selected).length > 0 ? selected : "Select a plan"
            }
            onChange={handleChange}
            styles={{
              control: () => ({
                backgroundColor: "transparent",
                display: "flex",
              }),
            }}
          />
          <BoldText>Account Number</BoldText>
          <Input
            maxLength="13"
            placeholder="0433877877-89"
            value={accountNumber}
            onChange={({ target }) => setAccountNumber(target.value)}
          />
        </Inner>
      </Container>
    );
  };

  const renderJos = () => {
    return (
      <Container>
        <Inner>
          <BoldText>Card Number</BoldText>

          <Input
            maxLength="11"
            placeholder="09890900009"
            value={accountNumber}
            onChange={({ target }) =>
              setAccountNumber(target.value.replace(/[^0-9]/g, ""))
            }
          />
        </Inner>
      </Container>
    );
  };

  return (
    <>
      <ServiceProvider id="true" data={nepa} />
      {serviceName === "EKEDP" && renderEko()}
      {serviceName === "JED" && renderJos()}
      {loading && (
        <Loading
          accountNumber={accountNumber}
          selected={selected}
          serviceName={serviceName}
        />
      )}
    </>
  );
};

export default Three;
