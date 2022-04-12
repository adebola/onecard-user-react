import React, { useContext, useState } from "react";
import {
  Grid,
  GridInner,
  GridText,
  MinHeight,
  RechargeDetailsContainer,
  SmallText,
  TopContainer,
} from "./styles";

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

const RechargeDetails = ({ rechargeId }) => {
  const {
    setDataType,
    setServiceName,
    serviceName,
    phoneNumber,
    setPhoneNumber,
    setListOfBulk,
    listOfBulk,
    balance,
    setAirtimeId,
    selectedSingleDataPlans,
    setSelectedSingleDataPlans,
    singleAmount,
    setSingleAmount,
    setAccountNumber,
    accountNumber,
  } = useContext(GlobalContext);

  const { amountError } = useContext(ModalContext);

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
  };

  const handleAdd = () => {
    let singleDetails;
    if (rechargeType === "Data") {
      singleDetails = {
        recipient:
          phoneNumber !== "" ? phoneNumber.replace(/\D+/g, "") : accountNumber,
        serviceCode: serviceName,
        productId: selectedSingleDataPlans.id,
      };
    } else if (rechargeType === "Airtime") {
      singleDetails = {
        recipient:
          phoneNumber !== "" ? phoneNumber.replace(/\D+/g, "") : accountNumber,
        serviceCode: serviceName,
        serviceCost: singleAmount,
      };
    } else if (rechargeType === "Cable TV") {
      singleDetails = {
        recipient: cardNumber,
        name: selected.name,
        serviceCost: selected.price,
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

  const disabled =
    !selectedSingleDataPlans ||
    (phoneNumber === "" &&
      accountNumber === "" &&
      Object.entries(selected).length === 0 &&
      amount < 999) ||
    (telephone === "" && amountError === "");

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
            {id !== 0 && <ModePayment />}
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
