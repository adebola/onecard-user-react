import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { getTransaction } from "../../../../helper/requests";
import { getFormattedDate } from "../../../../utils/dateformat";
import Pagination from "../Pagination";
import {
  GridContainer,
  GridItemHeader,
  Inner,
  InnerGrid,
  ResponsiveItem,
  TransactionView,
} from "./styles";

const header = [
  { id: 1, title: "Recipient" },
  { id: 2, title: "Trans ID" },
  { id: 3, title: "Amount" },
  { id: 4, title: "Service Provider" },
  { id: 5, title: "Date" },
];

const Container = styled.div`
  margin-top: 1rem;
  /* height: 520px; */
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const Text = styled.p`
  font-size: 12px;
  color: var(--text-color);
`;

export const InnerText = ({ children }) => {
  return <Text>{children}</Text>;
};

const TransactionBody = () => {
  const { transactions, setTransactions } = useContext(GlobalContext);

  const [pages, setPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState(false);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const res = await getTransaction(pageNumber);

        if (res.data.list.length === 0) {
          setText(true);
        } else {
          setTransactions(res.data.list);
        }
      } catch (error) {
        console.error(error);
      }
    };
    awaitResponse();
  }, [setTransactions, pageNumber]);

  return (
    <Container>
      {text && transactions.length === 0 && (
        <InnerText>You don't have any transactions yet</InnerText>
      )}
      {transactions.length > 0 && (
        <TransactionView>
          <Inner>
            <GridContainer>
              {header.map((each) => {
                return (
                  <GridItemHeader key={each.id}>{each.title}</GridItemHeader>
                );
              })}
            </GridContainer>
          </Inner>
        </TransactionView>
      )}

      {transactions.map((each) => {
        const text = getFormattedDate(each.txDate);
        return (
          <InnerGrid key={each.id}>
            {/* <Inner> */}
            <GridContainer>
              <ResponsiveItem>{each.recipient}</ResponsiveItem>
              <ResponsiveItem>{each.id}</ResponsiveItem>
              <ResponsiveItem>{each.txAmount}</ResponsiveItem>
              <ResponsiveItem>{each.serviceName}</ResponsiveItem>
              <ResponsiveItem>
                <p>{text.fullTime}</p>
                <p>{text.splitDate}</p>
              </ResponsiveItem>
            </GridContainer>
            {/* </Inner> */}
          </InnerGrid>
        );
      })}
      {transactions.length > 0 && (
        <Pagination
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          pages={pages}
          setPages={setPages}
        />
      )}
    </Container>
  );
};

export default TransactionBody;
