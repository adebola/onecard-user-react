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
import { SingleContext } from "../../../../../context/SingleRecharge";
import One from "./One";
import Two from "./Two";

const data = [
  { id: 1, text: "Data", img: <FaDatabase /> },
  { id: 2, text: "Airtime", img: <BiPhoneCall /> },
  { id: 3, text: "Electricity", img: <GiElectric /> },
  { id: 4, text: "Cable TV", img: <MdLiveTv /> },
  { id: 5, text: "Others", img: <MdOutlineAddCircleOutline /> },
];

const RechargeDetails = () => {
  const [id, setId] = useState(0);
  const { setDataText } = useContext(SingleContext);
  return (
    <>
      <RechargeDetailsContainer>
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
        </MinHeight>
      </RechargeDetailsContainer>
    </>
  );
};

export default RechargeDetails;
