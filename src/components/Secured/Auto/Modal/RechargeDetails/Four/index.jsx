import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ServiceProvider from "../Service";
import Loading from "./Loading";

import dstv from "../../../../../../assets/dstv.png";
import gotv from "../../../../../../assets/gotv.png";
import startimes from "../../../../../../assets/startime.png";
import { SingleContext } from "../../../../../../context/SingleRecharge";
import ReactInputMask from "react-input-mask";

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
  }
`;

const BoldText = styled.div`
  font-size: 12px;
  margin-top: 28px;
  font-weight: bold;
  color: var(--btn-color);
`;

const Four = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { serviceName } = useContext(SingleContext);

  const cable = [
    { id: 1, data: "DSTV", img: dstv },
    { id: 2, data: "GOTV", img: gotv, filter: true },
    { id: 3, data: "STARTIMES", img: startimes, filter: true },
  ];

  useEffect(() => {
    if (!cardNumber) return;

    if (
      cardNumber.length === 11 ||
      (cardNumber.length === 10 && serviceName === "GOTV")
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [cardNumber, serviceName]);

  useEffect(() => {
    setLoading(false);
    setCardNumber("");
  }, [serviceName]);

  return (
    <div>
      <ServiceProvider data={cable} id="true" />
      {serviceName && (
        <>
          <BoldText>Card Number</BoldText>
          <Input
            placeholder="Enter card number"
            maxLength={serviceName === "GOTV" ? 10 : 11}
            value={cardNumber}
            onChange={({ target }) =>
              setCardNumber(target.value.replace(/[^0-9]/g, ""))
            }
          />
        </>
      )}

      {loading && cardNumber.length !== 0 && (
        <Loading cardNumber={cardNumber} cableType={serviceName} />
      )}
    </div>
  );
};

export default Four;
