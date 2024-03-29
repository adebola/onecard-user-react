import React, { useContext } from "react";
import { BulkRechargeContext } from "../../context//BulkRecharge";
import styled from "styled-components";

const Container = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-color: #ff0000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;

  position: absolute;
  top: -5px;
  right: -5px;
`;

const Badge = () => {
  const { bulkRecharges } = useContext(BulkRechargeContext);
  const length = bulkRecharges.length;
  return <Container>{length > 99 ? "99+" : length}</Container>;
};

export default Badge;
