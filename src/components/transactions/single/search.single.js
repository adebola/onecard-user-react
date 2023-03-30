import React from "react";

import styled from "styled-components";
import { makeSingleSearchRequest } from "../../../helper/requests";
import { convertDate } from "../../../utils/dateformat";

import { Flex } from "../styles";
import SearchBy from "./searchby";
import SearchByDate from "./searchbydate";

const Input = styled.input`
  width: 200px;
  padding: 10px;
  border: 1px solid var(--btn-color);
  border-radius: 4px;
  outline: none;
  transition: all 0.1s;

  &:focus {
    border: 1px solid var(--btn-color);
    border-radius: 4px;
  }
`;

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

const _options = [
  { id: 3, name: "Select an option" },
  {
    id: 1,
    failed: true,
    name: "Failure",
  },
  { id: 2, failed: false, name: "Success" },
];

const SearchSingle = ({
  setSearchPagination,
  setIsEmpty,
  setTransactions,
  setEntries,
  setPages,
  recipientQuery,
  productQuery,
  failed,
  setRecipientQuery,
  setProductQuery,
  setFailed,
  debounceProductQuery,
  debounceRecipientQuery,
  setEmptyQuery,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setClicked,
  searchBy,
  setSearchBy,
}) => {
  React.useEffect(() => {
    if (
      debounceRecipientQuery ||
      debounceProductQuery ||
      failed ||
      startDate ||
      endDate
    ) {
      setSearchPagination(true);
    } else {
      setSearchPagination(false);
    }
  }, [
    setSearchPagination,
    failed,
    debounceRecipientQuery,
    debounceProductQuery,
    startDate,
    endDate,
  ]);

  React.useEffect(() => {
    if (debounceRecipientQuery) {
      const response = async () => {
        const { data } = await makeSingleSearchRequest({
          recipient: debounceRecipientQuery,
        });

        if (data.list.length === 0) {
          setIsEmpty(true);
          setTransactions([]);
        } else {
          setTransactions(data.list);
          setEntries(data.totalSize);
          setPages(data.pages);
          setIsEmpty(false);
        }
      };
      response();
    }
    if (debounceProductQuery) {
      const response = async () => {
        const { data } = await makeSingleSearchRequest({
          product: debounceProductQuery,
        });
        if (data.list.length === 0) {
          setIsEmpty(true);
          setTransactions([]);
        } else {
          setTransactions(data.list);
          setEntries(data.totalSize);
          setPages(data.pages);
          setIsEmpty(false);
        }
      };
      response();
    }
    if (failed) {
      const response = async () => {
        const { data } = await makeSingleSearchRequest({
          failed: failed === "Failure" ? true : false,
        });
        if (data.list.length === 0) {
          setIsEmpty(true);
          setTransactions([]);
        } else {
          setTransactions(data.list);
          setEntries(data.totalSize);
          setPages(data.pages);
          setIsEmpty(false);
        }
      };
      response();
    }
    if (startDate) {
      const response = async () => {
        const { data } = await makeSingleSearchRequest({
          startDate: convertDate(startDate),
        });
        if (data.list.length === 0) {
          setIsEmpty(true);
          setTransactions([]);
        } else {
          setTransactions(data.list);
          setEntries(data.totalSize);
          setPages(data.pages);
          setIsEmpty(false);
        }
      };
      response();
    }
    if (endDate) {
      const response = async () => {
        const { data } = await makeSingleSearchRequest({
          startDate: convertDate(startDate),
          endDate: convertDate(endDate),
        });
        if (data.list.length === 0) {
          // console.log("==> empty list", data.list);
          setIsEmpty(true);
          setTransactions([]);
        } else {
          setTransactions(data.list);
          setEntries(data.totalSize);
          setPages(data.pages);
          setIsEmpty(false);
        }
      };
      response();
    }
  }, [
    setTransactions,
    setEntries,
    setPages,
    setIsEmpty,
    failed,
    startDate,
    endDate,
    debounceProductQuery,
    debounceRecipientQuery,
  ]);

  return (
    <Flex>
      {searchBy === "Recipient" ? (
        <div>
          <p>Recipient</p>
          <Input
            value={recipientQuery}
            placeholder="Search by recipient"
            onChange={(e) => {
              if (e.target.value !== "") {
                setRecipientQuery(e.target.value);
                setEmptyQuery(false);
              } else {
                setEmptyQuery(true);
                setRecipientQuery(e.target.value);
              }
            }}
          />
        </div>
      ) : searchBy === "Product" ? (
        <div>
          <p>Product</p>
          <Input
            placeholder="Search by product"
            onChange={(e) => {
              // setProductQuery(e.target.value);
              if (e.target.value !== "") {
                setProductQuery(e.target.value);
                setEmptyQuery(false);
              } else {
                setEmptyQuery(true);
                setProductQuery(e.target.value);
              }
            }}
            value={productQuery}
          />
        </div>
      ) : searchBy === "Date" ? (
        <SearchByDate
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      ) : (
        <div>
          <p>Status</p>
          <Select
            // value={failed}
            onChange={(e) => {
              setFailed(e.target.value);
            }}
          >
            {_options.map((each) => {
              return (
                <option key={`${each.id}-1`} value={each.name}>
                  {each.name}
                </option>
              );
            })}
          </Select>
        </div>
      )}
      <SearchBy
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        setRecipientQuery={setRecipientQuery}
        setProductQuery={setProductQuery}
        recipientQuery={recipientQuery}
        productQuery={productQuery}
        setSearchPagination={setSearchPagination}
        setClicked={setClicked}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </Flex>
  );
};

export default SearchSingle;
