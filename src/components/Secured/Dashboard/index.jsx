import React, { useState } from "react";
import Container from "../../Container";
import SmallText from "../../SmallText";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import Balance from "./Balance";
import { DashboardBoxOne, DashboardBoxTwo } from "./styles";
import Transactions from "./Transactions";
import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />
      <Wrapper>
        <TopHeader header="Dashboard" />
        <Container>
          <DashboardBoxOne>
            <SmallText text="Account Balance" />
            <Balance />
          </DashboardBoxOne>
          <DashboardBoxTwo>
            <SmallText text="Transactions History" />
            <Transactions />
          </DashboardBoxTwo>
        </Container>
      </Wrapper>
    </>
  );
};

export default Dashboard;
