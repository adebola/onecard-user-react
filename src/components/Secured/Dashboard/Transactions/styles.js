import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div``;

export const Transaction = styled.div`
  min-height: 430px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

export const TransactionTop = styled.div`
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 13px;
  text-align: left;
  color: var(--btn-color);
  padding: 1.3rem 1rem;
  display: flex;
  flex: 2;
`;

export const Recipient = styled.div`
  flex: 2;
`;

export const NumberAndDetail = styled.div`
  display: flex;
`;

export const TransactionType = styled.div`
  flex: 1.3;
`;

export const Amount = styled.div`
  flex: 0.7;
`;

export const TransactionBody = styled.div`
  padding: 0.3rem 1rem;
`;

export const EachTransaction = styled.div`
  /* height: 50px; */
  border-radius: 10px;
  background-color: #fdf0e9;
  display: flex;
  padding: 1.1rem 0.7rem;
  align-items: center;
  margin-bottom: 10px;
`;

export const TransactionText = styled.p`
  color: #124a80;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
`;

export const TransactionTextStrong = styled(TransactionText)`
  font-weight: 500;
  margin-right: 5px;
`;

export const TransactionButtonContainer = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding-bottom: 50px;
`;

export const TransactionButton = styled(Link)`
  /* width: 228px; */
  /* width: 190px; */
  padding: 1rem 2rem;
  background: var(--btn-color);
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 700;
`;

export const View = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.8rem;
`;

export const ViewAll = styled(Link)`
  text-decoration: none;
  font-size: 12px;
  color: var(--text-color);
  font-weight: 600;
`;
