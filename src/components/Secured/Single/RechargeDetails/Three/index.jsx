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

const Three = () => {
  const [serviceName, setServiceName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selected, setSelected] = useState({});

  const [loading, setLoading] = useState(false);

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
          <Select
            placeholder="Select a plan"
            options={options}
            value={
              Object.entries(selected).length > 0 ? selected : "Select a plan"
            }
            onChange={handleChange}
          />
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
          selected={selected}
          serviceName={serviceName}
        />
      )}
    </>
  );
};

export default Three;
