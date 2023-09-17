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

import { FaDatabase, FaTimes } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import { MdLiveTv, MdOutlineAddCircleOutline } from "react-icons/md";
import { SingleContext } from "../../../../../context/SingleRecharge";
import One from "./One";
import Two from "./Two";
import Three from "./Three/index";
import Four from "./Four/index";
import styled from "styled-components";

const Close = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const data = [
  { id: 1, text: "Data", img: <FaDatabase /> },
  { id: 2, text: "Airtime", img: <BiPhoneCall /> },
  { id: 3, text: "Electricity", img: <GiElectric /> },
  { id: 4, text: "Cable TV", img: <MdLiveTv /> },
  { id: 5, text: "Others", img: <MdOutlineAddCircleOutline /> },
];

const RechargeDetails = ({ setModal }) => {
  const [id, setId] = useState(0);
  const { setDataText } = useContext(SingleContext);
  return (
    <>
      <RechargeDetailsContainer>
        <Close onClick={() => setModal(false)}>
          <FaTimes size={20} />
        </Close>
        <SmallText>What will you like to do ?</SmallText>
        <MinHeight>
          <TopContainer>
            {data.map((each) => {
              return (
                <Grid
                  className={id === each.id && "active"}
                  onClick={() => {
                    setId(each.id);
                    setDataText(each.text);
                  }}
                  key={each.id}
                >
                  <GridInner>
                    {each.img}
                    <GridText>{each.text}</GridText>
                  </GridInner>
                </Grid>
              );
            })}
          </TopContainer>
          {id === 1 && <One />}
          {id === 2 && <Two />}
          {id === 3 && <Three />}
          {id === 4 && <Four />}
        </MinHeight>
        {/* <button onClick={() => {}}>Close</button> */}
      </RechargeDetailsContainer>
    </>
  );
};

export default RechargeDetails;
