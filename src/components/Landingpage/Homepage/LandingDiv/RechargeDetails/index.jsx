import React, { useContext, useState } from "react";
import {
  Container,
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
import { MdLiveTv } from "react-icons/md";
import One from "./One";
import Two from "./Two";
import Four from "./Four";
import { GlobalContext } from "../../../../../context/GlobalProvider";

import styled from "styled-components";
import UserServices from "../../../../../services/UserServices";

const data = [
  { id: 1, text: "Data", img: <FaDatabase /> },
  { id: 2, text: "Airtime", img: <BiPhoneCall /> },
  { id: 3, text: "Electricity", img: <GiElectric /> },
  { id: 4, text: "Cable TV", img: <MdLiveTv /> },
  // { id: 5, text: "Others", img: <MdOutlineAddCircleOutline /> },
];

const LoginContainer = styled.div`
  margin-top: 10px;
  display: flex;
`;
const Text = styled.p`
  color: var(--text-color);
  font-size: 13px;
`;

const Button = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
  outline: none;
  margin-left: 10px;
  cursor: pointer;
`;

const RechargeDetails = () => {
  const renderLogin = () => {
    return (
      <LoginContainer>
        <Text>You have to login to continue with the transaction.</Text>
        <Button onClick={UserServices.doLogin}>Log in</Button>
      </LoginContainer>
    );
  };

  const { setDataType, setAirtimeId } = useContext(GlobalContext);

  const [id, setId] = useState(0);

  const handleClick = (each) => {
    setId(each.id);
    setAirtimeId(0);
    setDataType(each.text);
  };

  return (
    <Container>
      <RechargeDetailsContainer>
        <SmallText>What will you like to do ?</SmallText>
        <MinHeight>
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

          {id === 1 && <One />}
          {id === 2 && <Two />}
          {id === 3 && renderLogin()}
          {id === 4 && <Four />}
          {/* {id === 5 && <Five />} */}
        </MinHeight>
      </RechargeDetailsContainer>
    </Container>
  );
};

export default RechargeDetails;
