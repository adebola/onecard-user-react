import React, { useContext } from "react";
import { SingleRechargeContext } from "../../context/SingleRechargeContext";
import Error from "../Error";
import Input from "../Input";
import Loading from "../Loading";
import { BoldText, Select } from "./styles";

const Form = () => {
  const {
    isSelect,
    details,
    setDetails,
    dataPlans,
    clicked,
    selectedId,
    errors,
    setSuccess,
    setErrorMessage,
  } = useContext(SingleRechargeContext);
  const isActive = selectedId === 3;

  const data = isActive
    ? [
        {
          id: 1,
          label: "Postpaid",
          value: "postpaid",
        },
        {
          id: 2,
          label: "Prepaid",
          value: "prepaid",
        },
      ]
    : dataPlans;

  const { productId, recipient, serviceCost, accountType, serviceCode } =
    details;

  if (isSelect) {
    return (
      <div>
        {isActive ? (
          <BoldText>Select a type</BoldText>
        ) : (
          <BoldText>Select a data plan</BoldText>
        )}
        <Select
          name={isActive ? "accountType" : "productId"}
          error={
            (clicked && selectedId === 1 && productId === "") ||
            (clicked && selectedId === 3 && accountType === "")
          }
          value={isActive ? accountType : productId}
          onChange={({ target }) => {
            setDetails({
              ...details,
              [target.name]: target.value,
            });
          }}
        >
          {isActive ? (
            <option value="">Select a type</option>
          ) : (
            <option value="">Select a data plan</option>
          )}

          {data.map((each) => {
            return (
              <option key={each.id} value={each.value}>
                {each.label}
              </option>
            );
          })}
        </Select>
        <Error
          msg={clicked && !isActive && productId === "" && errors[1].message}
        />
        <Error
          msg={clicked && isActive && accountType === "" && errors[1].message}
        />
        {isActive ? (
          <BoldText>Card number</BoldText>
        ) : (
          <BoldText>Phone number</BoldText>
        )}
        <Input
          error={clicked && recipient === ""}
          placeholder={isActive ? "9998876789" : "Enter a phone number"}
          value={recipient}
          maxLength={isActive ? "13" : "13"}
          onChange={({ target }) => {
            if (isActive) {
              setSuccess(false);
              setErrorMessage("");
            }

            if (selectedId === 4) {
              setSuccess(false);
              setErrorMessage("");
            }
            setDetails({
              ...details,
              recipient: target.value,
            });
          }}
        />
        <Error msg={clicked && recipient === "" && errors[2].message} />
        {selectedId === 3 && recipient.length === 13 && <Loading />}
      </div>
    );
  } else if (selectedId === 3) {
    return (
      <>
        <Input
          error={clicked && recipient === ""}
          placeholder="77656787656789"
          value={recipient}
          maxLength="11"
          onChange={({ target }) => {
            setErrorMessage("");
            setDetails({
              ...details,
              recipient: target.value,
            });
          }}
        />
        <Error msg={clicked && recipient === "" && errors[2].message} />

        {selectedId === 3 && recipient.length === 11 && <Loading />}
      </>
    );
  } else if (selectedId === 4) {
    return (
      <div>
        <BoldText>Card number</BoldText>
        <Input
          error={clicked && recipient === ""}
          placeholder="Enter card number"
          maxLength={
            serviceCode === "DSTV" ? "11" : serviceCode === "GOTV" ? "10" : "11"
          }
          value={recipient}
          onChange={({ target }) => {
            setDetails({
              ...details,
              recipient: target.value,
            });
          }}
        />
        {serviceCode === "STARTIMES" && recipient.length === 11 && <Loading />}
        {serviceCode === "DSTV" && recipient.length === 11 && <Loading />}
        {serviceCode === "GOTV" && recipient.length === 10 && <Loading />}
      </div>
    );
  } else {
    return (
      <div>
        <BoldText>Amount</BoldText>
        <Input
          error={clicked && serviceCost === ""}
          placeholder="Enter amount"
          value={serviceCost}
          onChange={({ target }) => {
            setDetails({
              ...details,
              serviceCost: target.value,
            });
          }}
        />
        <Error msg={serviceCost === "" && errors[1].message} />
        <BoldText>Phone number</BoldText>
        <Input
          error={clicked && recipient === ""}
          placeholder="Enter a phone number"
          value={recipient}
          onChange={({ target }) => {
            setDetails({
              ...details,
              recipient: target.value,
            });
          }}
        />
        <Error msg={recipient === "" && errors[2].message} />
      </div>
    );
  }
};

export default Form;
