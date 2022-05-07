import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  GridInner,
  GridText,
  MinHeight,
  RechargeDetailsContainer,
  SmallText,
  TopContainer,
} from "./styles";
import styled from "styled-components";

import { FaDatabase } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import { MdLiveTv, MdOutlineAddCircleOutline } from "react-icons/md";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Five from "./Five";
import { GlobalContext } from "../../../../context/GlobalProvider";
import WalletBalance from "../../../WalletBalance";
import ModePayment from "../../../PaymentType";
import Button from "../../../Button/normal";
import ExcelFileUpload from "./ExcelFileUpload";
import { ModalContext } from "../../../../context/ModalProvider";

const data = [
  { id: 1, text: "Data", img: <FaDatabase /> },
  { id: 2, text: "Airtime", img: <BiPhoneCall /> },
  { id: 3, text: "Electricity", img: <GiElectric /> },
  { id: 4, text: "Cable TV", img: <MdLiveTv /> },
  { id: 5, text: "Others", img: <MdOutlineAddCircleOutline /> },
];

const ErrorBox = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

const RechargeDetails = ({ rechargeId }) => {
  const [disabled, setDisabled] = useState(false);

  const {
    setDataType,
    setServiceName,
    serviceName,
    setPhoneNumber,
    setListOfBulk,
    listOfBulk,
    balance,
    setAirtimeId,
    selectedSingleDataPlans,
    setSelectedSingleDataPlans,
    setSingleAmount,
    setAccountNumber,
    accountNumber,
    bulkSingleAmount,
    bulkPhoneNumber,
    setBulkPhoneNumber,
    setBulkSingleAmount,
  } = useContext(GlobalContext);

  const {
    amountError,
    error,
    setError,
    weeklyAutoRecharge,
    monthlyAutoRecharge,
  } = useContext(ModalContext);

  const [cardNumber, setCardNumber] = useState("");
  const [id, setId] = useState(0);
  const [selected, setSelected] = useState({});
  const [optionId, setOptionId] = useState(1);
  const [rechargeType, setRechargeType] = useState("");
  const [fileSelect, setFileSelect] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAmount("");
    setTelephone("");
    setBulkPhoneNumber("");
  }, [setBulkPhoneNumber]);

  const resetDetails = () => {
    setPhoneNumber("");
    setAccountNumber("");
    setSingleAmount("");
    setSelected({});
    setSelectedSingleDataPlans({});
    setCardNumber("");
    setLoading(false);
    setTelephone("");
    setAmount("");
    setSelected({});
    setBulkPhoneNumber("");
    setBulkSingleAmount("");
  };

  useEffect(() => {
    if (
      (error && weeklyAutoRecharge.length > 0) ||
      monthlyAutoRecharge.length > 0
    ) {
      setError("");
    }
  }, [monthlyAutoRecharge, weeklyAutoRecharge, setError, error]);

  const handleAdd = () => {
    let singleDetails;

    if (
      (rechargeType === "Data" || rechargeType === "Airtime") &&
      rechargeId === 3
    ) {
      if (weeklyAutoRecharge.length === 0 && monthlyAutoRecharge.length === 0) {
        setError("Please choose a recharge plan (weekly or monthly)");
        return;
      }
    }

    if (rechargeType === "Data") {
      singleDetails = {
        recipient:
          bulkPhoneNumber !== ""
            ? bulkPhoneNumber.replace(/\D+/g, "")
            : accountNumber,
        serviceCode: serviceName,
        value: selectedSingleDataPlans.label,
        productId: selectedSingleDataPlans.id,
      };
    } else if (rechargeType === "Airtime") {
      singleDetails = {
        recipient:
          bulkPhoneNumber !== ""
            ? bulkPhoneNumber.replace(/\D+/g, "")
            : accountNumber,
        serviceCode: serviceName,
        serviceCost: bulkSingleAmount.replace(/\D+/g, ""),
      };
    } else if (rechargeType === "Cable TV") {
      singleDetails = {
        recipient: cardNumber,
        name: selected.name,
        productId: selected.code,
        serviceCode: serviceName,
      };
    } else if (rechargeType === "Electricity") {
      if (serviceName === "JED") {
        singleDetails = {
          recipient: cardNumber,
          name: name.trim(),
          serviceCost: amount,
          serviceCode: serviceName,
        };
      } else {
        singleDetails = {
          recipient: cardNumber,
          name: name.trim(),
          serviceCost: amount,
          productId: selected.code,
          serviceCode: serviceName,
        };
      }
    } else {
      //TO-DO
    }

    setListOfBulk([...listOfBulk, singleDetails]);
    resetDetails();
  };

  const handleClick = (each) => {
    setId(each.id);
    setRechargeType(each.text);
    setDataType(each.text);
    setServiceName("");
    setAirtimeId(0);
  };

  useEffect(() => {
    if (
      ((id === 1 || id === 0) &&
        (Object.keys(selectedSingleDataPlans).length === 0 ||
          bulkPhoneNumber === "")) ||
      ((id === 2 || id === 0) &&
        (bulkSingleAmount === "" || bulkPhoneNumber === "")) ||
      ((id === 3 || id === 0) && (amount === "" || telephone === "")) ||
      ((id === 4 || id === 0) && Object.entries(selected).length === 0)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    setDisabled,
    selectedSingleDataPlans,
    id,
    amountError,
    amount,
    telephone,
    disabled,
    selected,
    accountNumber,
    bulkSingleAmount,
    bulkPhoneNumber,
  ]);

  return (
    <RechargeDetailsContainer>
      <SmallText>What will you like to do ?</SmallText>
      <MinHeight>
        <ExcelFileUpload
          rechargeId={rechargeId}
          setFileSelect={setFileSelect}
          setOptionId={setOptionId}
          optionId={optionId}
          fileSelect={fileSelect}
        />
        {optionId === 1 && (
          <TopContainer>
            {data.map((each) => {
              return (
                <Grid
                  key={each.id}
                  onClick={() => handleClick(each)}
                  className={each.id === id && "active"}
                >
                  <GridInner>
                    {each.img}
                    <GridText>{each.text}</GridText>
                  </GridInner>
                </Grid>
              );
            })}
          </TopContainer>
        )}
        {optionId === 1 && (
          <>
            {id === 1 && <One rechargeType={rechargeType} />}
            {id === 2 && <Two rechargeType={rechargeType} />}
            {id === 3 && (
              <Three
                amount={amount}
                name={name}
                accountNumber={cardNumber}
                setAccountNumber={setCardNumber}
                setName={setName}
                setAmount={setAmount}
                selected={selected}
                setSelected={setSelected}
                serviceName={serviceName}
                setServiceName={setServiceName}
                loading={loading}
                setLoading={setLoading}
                rechargeType={rechargeType}
                telephone={telephone}
                setTelephone={setTelephone}
              />
            )}
            {id === 4 && (
              <Four
                serviceName={serviceName}
                setServiceName={setServiceName}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                rechargeType={rechargeType}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {id === 5 && <Five rechargeType={rechargeType} />}
            {id !== 0 && <ModePayment rechargeId={rechargeId} />}

            {error && <ErrorBox>{error}</ErrorBox>}
            <Button
              disabled={disabled}
              onClick={() => handleAdd()}
              name="Add"
              type="button"
            />
          </>
        )}
      </MinHeight>

      {optionId === 1 && <WalletBalance balance={balance} />}
    </RechargeDetailsContainer>
  );
};

export default RechargeDetails;
