import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SyncLoader } from "react-spinners";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
// import Error from "../Error"z
import Input from "../Input";
import * as styles from "../../utils/styles";
import Error, { ErrorMessage } from "../Error";
import { getCardDetails } from "../../helper/noauthrequests";

const Container = styled.div`
  margin: 10px 0;
`;

const Select = styled.select`
  width: 100%;
  border-radius: 4px;
  border: ${({ error }) =>
    error ? `1px solid red` : `1px solid var(--text-color)`};
  padding: 10px 30px 10px 10px;
  color: #000;
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: auto 50%;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+);
  padding: 10px 30px 10px 10px;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`;
const NameContainer = styled.div`
  background-color: var(--light-background);
  padding: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Text = styled.div`
  color: var(--text-color);
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
`;
const Loading = () => {
  const {
    details,
    loading,
    setDetails,
    errors,
    setSuccess,
    activeId,
    selectedId,
    setLoading,
    success,
    clicked,
    setErrorMessage,
    errorMessage,
    setClicked,
    setDataPlans,
    dataPlans,
    cardDetails,
    setCardDetails,
  } = useContext(SingleRechargeContext);
  const {
    recipient,
    accountType,
    serviceCost,
    telephone,
    serviceCode,
    productId,
  } = details;

  const isEko = selectedId === 3 && activeId === 1;
  const isJos = selectedId === 3 && activeId === 2;
  const checkType = selectedId === 3 && activeId === 1 && accountType === "";

  useEffect(() => {
    setClicked(false);
  }, [setClicked]);

  useEffect(() => {
    setErrorMessage("");
  }, [setErrorMessage]);

  useEffect(() => {
    let data;
    switch (selectedId) {
      case 3:
        if (activeId === 1) {
          if (accountType === "") {
            setLoading(false);
            return;
          } else {
            setLoading(true);
            data = {
              accountType,
              recipient,
              serviceCode,
            };
          }
        } else {
          setLoading(true);
          data = {
            recipient,
            serviceCode,
          };
        }

        break;
      case 4:
        setLoading(true);
        data = {
          recipient,
          serviceCode,
        };
        break;

      default:
        break;
    }
    getCardDetails(data)
      .then((response) => {
        setCardDetails(response.data);
        if (response.data.object) {
          setDataPlans(response.data.object);
        }
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setLoading(false);
      });
  }, [
    selectedId,
    activeId,
    accountType,
    recipient,
    serviceCode,
    setLoading,
    setSuccess,
    setErrorMessage,
    setDataPlans,
    setCardDetails,
  ]);

  return (
    <>
      <Container>
        {checkType ? <Error msg={errors[1].message} /> : null}
        {!loading && errorMessage && <ErrorMessage />}
        <div style={{ ...styles.center }}>
          {loading && (
            <SyncLoader
              style={{ ...styles.margin.m1 }}
              size={8}
              color="#EB6A2B"
              margin={7}
            />
          )}
        </div>
        {!loading && success && !errorMessage && (
          <div>
            <NameContainer>
              <Text>{cardDetails.customerName}</Text>
            </NameContainer>
            <>
              {isEko || isJos ? (
                <>
                  <Input
                    error={clicked && serviceCost === ""}
                    type="text"
                    placeholder={"Enter Amount"}
                    onChange={({ target }) => {
                      setDetails({
                        ...details,
                        serviceCost: target.value,
                      });
                    }}
                  />
                  <Error
                    msg={clicked && serviceCost === "" && errors[3].message}
                  />
                </>
              ) : (
                <>
                  <Select
                    error={clicked && productId === ""}
                    name="productId"
                    onChange={({ target }) => {
                      setDetails({
                        ...details,
                        [target.name]: target.value,
                      });
                    }}
                  >
                    <option value="">Select a plan</option>
                    {dataPlans.map((each) => {
                      return (
                        <option key={each.code} value={each.code}>
                          {each.name} {each.price}
                        </option>
                      );
                    })}
                  </Select>
                  <Error msg={productId === "" && errors[1].message} />
                </>
              )}
            </>
            {selectedId !== 4 && (
              <>
                <Input
                  error={clicked && telephone === ""}
                  type="text"
                  placeholder={"Enter telephone"}
                  onChange={({ target }) => {
                    setDetails({
                      ...details,
                      telephone: target.value,
                    });
                  }}
                />
                <Error msg={clicked && telephone === "" && errors[4].message} />
              </>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default Loading;
