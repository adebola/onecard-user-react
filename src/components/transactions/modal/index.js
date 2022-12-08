import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../../utils/format.created.date";

import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
`;

const Inner = styled.div`
  height: 400px;
  width: 350px;
  background: white;
  border-radius: 9px;
  padding: 40px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin: 9px 0;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 13px;
  width: 90px;
  font-weight: bold;
`;

const SmallText = styled.p`
  font-size: 14px;
  margin-left: 9px;
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 6px 17px;
  cursor: pointer;
  border-radius: 4px;
  background: var(--btn-color);
  color: var(--white);
  border: none;
  outline: none;

  &:active {
    opacity: 0.8;
  }
`;

const Loader = ({ singleTransaction, setSingleTransaction }) => {
  return (
    <Container>
      <Inner>
        <Title>Details</Title>
        <Flex>
          <Text>Recipient :</Text>
          <SmallText>{singleTransaction.recipient}</SmallText>
        </Flex>
        <Flex>
          <Text>Product :</Text>
          <SmallText>{singleTransaction.serviceCode}</SmallText>
        </Flex>
        <Flex>
          <Text>Cost :</Text>
          <SmallText>{singleTransaction.serviceCost}.00</SmallText>
        </Flex>
        <Flex>
          <Text>Date :</Text>
          <SmallText>{dateFormat(singleTransaction.createdAt)}</SmallText>
        </Flex>
        <Flex>
          <Text>Status :</Text>
          <SmallText>
            {singleTransaction.failed ? (
              <RiCloseFill color="rgb(255, 76, 48)" />
            ) : (
              <TiTick color="rgb(46, 204, 113)" />
            )}
          </SmallText>
        </Flex>

        <Button onClick={() => setSingleTransaction({})}>Ok</Button>
      </Inner>
    </Container>
  );
};

export default Loader;
