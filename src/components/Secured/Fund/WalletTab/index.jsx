import React, { useState } from "react";

import styled from "styled-components";

const Container = styled.div``;

const TabInner = styled.div`
  width: 300px;
  display: flex;
  height: 50px;
  position: relative;
  border-bottom: 4px solid #e7bea7;
  margin-bottom: 10px;
  @media (max-width: 450px) {
    width: 300px;
  }
`;

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

const WalletTab = ({ setTabOption, tabOption }) => {
  const [left, setLeft] = useState(0);
  return (
    <Container>
      <TabInner>
        <Tab
          className={tabOption === 1 && "active"}
          onClick={() => {
            setTabOption(1);
            setLeft(0);
          }}
        >
          Fund Wallet
        </Tab>
        <Tab
          className={tabOption === 2 && "active"}
          onClick={() => {
            setLeft(150);
            setTabOption(2);
          }}
        >
          Wallet Transfer
        </Tab>
        <Underline left={left} />
      </TabInner>
    </Container>
  );
};

export default WalletTab;
