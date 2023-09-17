import React, { useState } from "react";
import Container from "../../Container";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import styled from "styled-components";

const BoxOne = styled.div`
  flex: 1;
  @media (max-width: 624px) {
    display: none;
  }
`;

const TabContainer = styled.div``;

const TabInner = styled.div`
  width: 600px;
  display: flex;
  height: 50px;
  position: relative;
  border-bottom: 4px solid #e7bea7;
  margin-bottom: 10px;

  @media (max-width: 450px) {
    width: 300px;
  }
`;

const MiniTab = styled.div``;

const Tab = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  font-size: 14px;

  &.active {
    font-weight: 500;
  }
`;

const Underline = styled.div`
  width: 150px;
  position: absolute;
  bottom: -4px;
  height: 4px;
  background: red;
  left: ${(props) => `${props.left}px`};
  background: var(--btn-color);
  transition: all 0.4s ease;
`;

const MobileTab = styled.div`
  width: 530px;
  display: flex;
  position: relative;
  border-bottom: 4px solid #e7bea7;
  margin-bottom: 10px;

  @media (min-width: 624px) {
    display: none;
  }
  @media (max-width: 530px) {
    width: 100%;
  }
`;

const History = () => {
  const [toggle, setToggle] = useState(false);
  const [left, setLeft] = useState(0);
  const [type, setType] = useState("Single");
  const [tabOptions, setTabOptions] = useState(1);

  const renderTabs = () => {
    return (
      <TabContainer>
        <TabInner>
          <Tab
            className={tabOptions === 1 && "active"}
            onClick={() => {
              setTabOptions(1);
              setLeft(0);
              setType("Single");
            }}
          >
            Single Requests
          </Tab>
          <Tab
            className={tabOptions === 2 && "active"}
            onClick={() => {
              setTabOptions(2);
              setLeft(150);
              setType("Bulk");
            }}
          >
            Bulk Requests
          </Tab>
          <Tab
            className={tabOptions === 3 && "active"}
            onClick={() => {
              setTabOptions(3);
              setLeft(300);
              setType("Schedule");
            }}
          >
            Scheduled Requests
          </Tab>
          <Tab
            className={tabOptions === 4 && "active"}
            onClick={() => {
              setTabOptions(4);
              setLeft(450);
              setType("Auto");
            }}
          >
            Auto Requests
          </Tab>
          <Underline left={left} />
        </TabInner>
      </TabContainer>
    );
  };

  const renderMobileTab = () => {
    return <TabContainer>{/* <MobileTab></MobileTab> */}</TabContainer>;
  };

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />
      <Wrapper>
        <TopHeader header="History" />
        <Container>
          <BoxOne>{renderTabs()}</BoxOne>
          <MobileTab>{renderMobileTab()}</MobileTab>
        </Container>
      </Wrapper>
    </>
  );
};

export default History;
