import React from "react";

import styled from "styled-components";

const Select = styled.select`
  width: 200px;
  border-radius: 4px;
  border: 1px solid var(--btn-color);
  padding: 10px 30px 10px 10px;
  color: #000;
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: auto 50%;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+);
  padding: 10px 30px 10px 10px;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`;

const DetailsSearchBy = ({
  searchBy,
  setSearchBy,
  productQuery,
  setProductQuery,
  recipientQuery,
  setRecipientQuery,
  setSearchPagination,
}) => {
  const data = [
    {
      id: 1,
      name: "Recipient",
    },
    { id: 3, name: "Product" },
    {
      id: 2,
      name: "Status",
    },
  ];

  const resetValue = () => {
    setRecipientQuery("");
    setProductQuery("");
  };

  return (
    <div>
      <Select
        value={searchBy}
        onChange={(e) => {
          setSearchPagination(true);
          if (recipientQuery || productQuery) resetValue();
          setSearchBy(e.target.value);
        }}
      >
        {data.map((each) => {
          return (
            <option key={`${each.id}-1`} value={each.name}>
              {each.name}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default DetailsSearchBy;
