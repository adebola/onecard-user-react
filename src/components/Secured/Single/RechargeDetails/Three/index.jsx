import React, { useEffect, useState } from "react";
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

const renderEko = (acc, setAcc) => {
  return (
    <Container>
      <Inner>
        <Select options={options} />
        <Input
          maxLength="11"
          placeholder="Enter account number"
          value={acc}
          onChange={({ target }) => setAcc(target.value.replace(/[^0-9]/g, ""))}
        />
      </Inner>
    </Container>
  );
};

const renderJos = (acc, setAcc) => {
  return (
    <Container>
      <Inner>
        <Input
          maxLength="11"
          placeholder="Enter account number"
          value={acc}
          onChange={({ target }) => setAcc(target.value.replace(/[^0-9]/g, ""))}
        />
      </Inner>
    </Container>
  );
};

const Three = () => {
  const [serviceName, setServiceName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accountNumber) return;
    if (accountNumber.length === 11) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [accountNumber]);

  useEffect(() => {
    setAccountNumber("");
    setLoading(false);
  }, [serviceName]);

  return (
    <>
      <ServiceProvider
        id="true"
        serviceName={serviceName}
        setServiceName={setServiceName}
        data={nepa}
      />
      {serviceName === "EKEDP" && renderEko(accountNumber, setAccountNumber)}
      {serviceName === "JED" && renderJos(accountNumber, setAccountNumber)}
      {loading && <Loading />}
    </>
  );
};

export default Three;
