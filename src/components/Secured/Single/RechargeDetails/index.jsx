import React, { useContext } from "react";
import {
  Grid,
  GridInner,
  GridText,
  MinHeight,
  RechargeDetailsContainer,
  SmallText,
  TopContainer,
} from "./styles";

import WalletBalance from "../../../WalletBalance";
import { FaDatabase } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import { MdLiveTv, MdOutlineAddCircleOutline } from "react-icons/md";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import { GlobalContext } from "../../../../context/GlobalProvider";
import Four from "./Four";
import Five from "./Five";
import { ModalContext } from "../../../../context/ModalProvider";

const data = [
  { id: 1, text: "Data", img: <FaDatabase /> },
  { id: 2, text: "Airtime", img: <BiPhoneCall /> },
  { id: 3, text: "Electricity", img: <GiElectric /> },
  { id: 4, text: "Cable TV", img: <MdLiveTv /> },
  { id: 5, text: "Others", img: <MdOutlineAddCircleOutline /> },
];

const RechargeDetails = () => {
  const { setDataType, setAirtimeId } = useContext(GlobalContext);
  const { beneId, setBeneId } = useContext(ModalContext);

  const handleClick = (each) => {
    setBeneId(each.id);
    setDataType(each.text);
    setAirtimeId(0);
  };

  return (
    <RechargeDetailsContainer>
      <SmallText>What will you like to do ?</SmallText>
      <MinHeight>
        <TopContainer>
          {data.map((each) => {
            return (
              <Grid
                key={each.id}
                onClick={() => handleClick(each)}
                className={each.id === beneId && "active"}
              >
                <GridInner>
                  {each.img}
                  <GridText>{each.text}</GridText>
                </GridInner>
              </Grid>
            );
          })}
        </TopContainer>

        {beneId === 1 && <One />}
        {beneId === 2 && <Two />}
        {beneId === 3 && <Three />}
        {beneId === 4 && <Four />}
        {beneId === 5 && <Five />}
      </MinHeight>
      <WalletBalance />
    </RechargeDetailsContainer>
  );
};

export default RechargeDetails;
