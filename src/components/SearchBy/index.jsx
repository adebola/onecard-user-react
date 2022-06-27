import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

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

const SearchBy = ({ children }) => {
  const [text, setText] = useState("");
  const options = [
    { label: "Reciepient", value: "Reciepient" },
    { label: "Status", value: "Status" },
    { label: "Product", value: "Product" },
  ];
  const optionsTwo = [
    { label: "Failed", value: "Failed" },
    { label: "Success", value: "Success" },
  ];
  const handleChange = (e) => {
    setText(e.value);
  };
  const handleTwoChange = (e) => {
    console.log(e);
  };

  //renderSearchByStatus
  const renderSearchByStatus = () => {
    return (
      <MySelect options={optionsTwo} onChange={(e) => handleTwoChange(e)} />
    );
  };

  return (
    <Container>
      {children && text !== "Status" ? children : null}
      {text === "Status" && renderSearchByStatus()}
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
          onChange={(e) => handleChange(e)}
        />
      </Inner>
    </Container>
  );
};

export default SearchBy;
