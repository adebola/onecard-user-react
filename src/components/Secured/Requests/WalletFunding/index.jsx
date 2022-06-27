import React, { useEffect, useState } from "react";
import { getWalletFunding } from "../../../../helper/requests";
import styled from "styled-components";
import { header } from "./column";
import Table from "../Table";

const Container = styled.div`
  margin-top: 30px;
`;

const NoResult = styled.div`
  color: var(--text-color);
  font-size: 14px;
`;

const NoRecharge = styled.p`
  font-size: 14px;
  color: var(--text-color);
  margin-top: 20px;
`;

const WalletFunding = ({ type }) => {
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState(1);
  const [text, setText] = useState(false);
  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  useEffect(() => {
    awaitResponse();
  }, []);

  const awaitResponse = async () => {
    try {
      const response = await getWalletFunding();
      if (response.data.list.length === 0) {
        setIsEmpty(true);
      } else {
        setData(response.data.list);
        setIsEmpty(false);
        setEntries(response.data.totalSize);
        setPages(response.data.pages);
        setPageSize(response.data.pageSize);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {};

  return (
    <Container>
      {" "}
      {isEmpty && data.length === 0 && (
        <NoRecharge>You have wallet funding! </NoRecharge>
      )}
      {text ? (
        <NoResult> No results found</NoResult>
      ) : (
        <Table
          data={data}
          entries={entries}
          setData={setData}
          pages={pages}
          handleClick={handleClick}
          header={header}
          type={type}
          pageSize={pageSize}
          search={!query}
          query={query}
        />
      )}
      {data.length > 0 && (
        <Table
          data={data}
          entries={entries}
          setData={setData}
          pages={pages}
          handleClick={handleClick}
          header={header}
          type={type}
          pageSize={pageSize}
          search={!query}
          query={query}
        />
      )}
    </Container>
  );
};

export default WalletFunding;
