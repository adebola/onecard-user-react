import React, { useContext, useEffect, useState } from "react";
import TopHeader from "../../TopNav";
import Wrapper from "../../Wrapper";
import { TransactionBoxOne } from "./styles";
import SmallText from "../../SmallText";
import styled from "styled-components";
import Table from "../../TableComponent/Table";

import HamburgerMenu from "../../Hamburger";
import MenuList from "../../Hamburger/Menulist";
import { getTransaction } from "../../../helper/requests";
import { GlobalContext } from "../../../context/GlobalProvider";
import Pagination from "../../Pagination";
import DownloadWithDataRange from "./Download";

const Container = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;
`;

const Text = styled.p`
  font-size: 12px;
  color: var(--text-color);
`;

const Transactions = () => {
  const [toggle, setToggle] = useState(false);
  const columns = [
    { label: "Recipient", accessor: "recipient", sortable: true },
    { label: "Id", accessor: "id", sortable: true },
    { label: "Amount", accessor: "txAmount", sortable: true },
    { label: "Service Provider", accessor: "serviceName", sortable: true },
    { label: "Date", accessor: "txDate", sortable: true },
  ];

  const { transactions, setTransactions } = useContext(GlobalContext);

  const [pages, setPages] = useState(0);
  const [active, setActive] = useState(1);
  const [entries, setEntries] = useState(0);
  const pageSize = 20;
  const [text, setText] = useState(false);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const res = await getTransaction(active);

        if (res.data.list.length === 0) {
          setText(true);
        } else {
          setTransactions(res.data.list);
          setPages(res.data.pages);
          setEntries(res.data.totalSize);
        }
      } catch (error) {
        console.error(error);
      }
    };
    awaitResponse();
  }, [setTransactions, active]);

  return (
    <>
      <HamburgerMenu toggle={toggle} setToggle={setToggle} />
      <MenuList toggle={toggle} setToggle={setToggle} />

      <Wrapper>
        <TopHeader header="Transactions" />
        <Container>
          <TransactionBoxOne>
            <SmallText text="Transactions History" />

            {text && transactions.length === 0 && (
              <Text>You don't have any transactions yet</Text>
            )}
            {transactions.length > 0 && (
              <>
                <Table columns={columns} data={transactions} />
                <Pagination
                  entries={entries}
                  pages={pages}
                  data={transactions}
                  pageSize={pageSize}
                  setEntries={setEntries}
                  active={active}
                  setActive={setActive}
                  setTransactions={setTransactions}
                />
                <DownloadWithDataRange />
              </>
            )}
          </TransactionBoxOne>
        </Container>
      </Wrapper>
    </>
  );
};

export default Transactions;
