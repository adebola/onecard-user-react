import React, { useEffect } from "react";
import ServiceProvider from "../Service";

import eko from "../../../../../assets/eko.jpg";
import jos from "../../../../../assets/jos.png";

import styled from "styled-components";
import Select from "react-select";
import Loading from "./Loading";

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
  padding: 9px 12px;
  width: 100%;
  border: 1px solid var(--text-color);
  border-radius: 3px;
  margin-top: 10px;
`;

const Three = ({
  serviceName,
  name,
  selected,
  setSelected,
  setName,
  loading,
  setLoading,
  amount,
  telephone,
  setTelephone,
  setAmount,
  setServiceName,
  accountNumber,
  setAccountNumber,
}) => {
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
  }, [serviceName, setLoading, setAccountNumber]);

  const handleChange = (each) => {
    setSelected(each);
  };

  const renderEko = () => {
    return (
      <Container>
        <Inner>
          <Select
            placeholder="Select a plan"
            onChange={handleChange}
            options={options}
            value={
              Object.entries(selected).length > 0 ? selected : "Select a plan"
            }
          />
          <Input
            placeholder="Enter account number"
            maxLength="13"
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
          <Input
            placeholder="Enter account number"
            value={accountNumber}
            maxLength="11"
            onChange={({ target }) => setAccountNumber(target.value)}
          />
        </Inner>
      </Container>
    );
  };

  return (
    <>
      <ServiceProvider
        id="true"
        serviceName={serviceName}
        setServiceName={setServiceName}
        data={nepa}
      />
      {serviceName === "EKEDP" && renderEko()}
      {serviceName === "JED" && renderJos()}
      {loading && (
        <Loading
          accountNumber={accountNumber}
          name={name}
          selected={selected}
          setName={setName}
          amount={amount}
          telephone={telephone}
          setTelephone={setTelephone}
          setAmount={setAmount}
          serviceName={serviceName}
        />
      )}
    </>
  );
};

export default Three;
