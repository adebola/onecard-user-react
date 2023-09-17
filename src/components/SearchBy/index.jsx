import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { bulkSearchBy } from "../../helper/requests";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 35px 0;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;

  .css-b62m3t-container {
    margin-top: 0px;
  }
`;

const Text = styled.p`
  font-size: 12px;
  margin-right: 6px;
  color: var(--btn-color);
`;

const MySelect = styled(Select)`
  border: 1px solid var(--btn-color);
  border-radius: 4px;
  background: transparent;
  padding: 0px;

  svg {
    fill: var(--btn-color);
  }

  .css-1okebmr-indicatorSeparator {
    background: none;
  }

  .css-1d8n9bt {
    padding: 0;
  }

  .css-ackcql {
    &::placeholder {
      font-size: 10px;
      color: var(--btn-color);
    }
  }
`;

const SearchBy = ({
  children,
  text,
  setQuery,
  setText,
  setDataTwo,
  setEmpty,
  setEntriesTableTwo,
  setPageSizeTableTwo,
  setPagesTableTwo,
}) => {
  const options = [
    { value: "recipient", label: "Recipient" },
    { value: "status", label: "Status" },
    { value: "product", label: "Product" },
  ];
  const optionsTwo = [
    { value: "failed", label: "Failed" },
    { value: "success", label: "Success" },
  ];
  const id = new URLSearchParams(window.location.search).get("id");
  const [status, setStatus] = useState("");
  const [searchBy, setSearchBy] = useState(options[0]);

  useEffect(() => {
    if (!status) return;
    const data = { bulkId: id, status: status === "failed" ? true : false };
    const searchBy = async () => {
      try {
        const response = await bulkSearchBy(data);
        if (response.data.list.length === 0) {
          setEmpty(true);
        } else {
          setDataTwo(response.data.list);
          setEmpty(false);
          setEntriesTableTwo(response.data.totalSize);
          setPagesTableTwo(response.data.pages);
          setPageSizeTableTwo(response.data.pageSize);
        }
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
      }
    };
    searchBy();
  }, [
    status,
    setEmpty,
    id,
    setDataTwo,
    setEntriesTableTwo,
    setPageSizeTableTwo,
    setPagesTableTwo,
  ]);

  const handleChange = (e) => {
    setText(e.value);
    setSearchBy(e);
    setQuery("");
  };
  const handleTwoChange = (e) => {
    setStatus(e.value);
  };

  //renderSearchByStatus
  const renderSearchByStatus = () => {
    return (
      <MySelect
        styles={{
          control: () => ({
            backgroundColor: "transparent",
            display: "flex",
          }),
        }}
        options={optionsTwo}
        onChange={(e) => handleTwoChange(e)}
      />
    );
  };

  return (
    <Container>
      {children && text !== "status" ? children : null}
      {text === "status" && renderSearchByStatus()}
      <Inner>
        <Text>Search By</Text>
        <MySelect
          styles={{
            control: () => ({
              backgroundColor: "transparent",
              display: "flex",
            }),
          }}
          options={options}
          value={searchBy}
          onChange={(e) => handleChange(e)}
        />
      </Inner>
    </Container>
  );
};

export default SearchBy;
