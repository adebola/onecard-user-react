import React from "react";
import styled from "styled-components";
import { bulkSearchBy } from "../../../helper/requests";
import DetailsSearchBy from "./details.search.by";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

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

const DetailsSearchInput = ({
  recipientDebounce,
  productDebounce,
  productQuery,
  setProductQuery,
  recipientQuery,
  setRecipientQuery,
  failed,
  setTransactions,
  setEntries,
  setPages,
  setIsEmpty,
  bulkId,
  setFailed,
  searchPagination,
  setSearchPagination,
}) => {
  const [searchBy, setSearchBy] = React.useState("Recipient");

  const data = [
    {
      id: 1,
      failed: true,
      name: "Failure",
    },
    { id: 2, failed: false, name: "Success" },
  ];

  React.useEffect(() => {
    if (productDebounce) {
      const response = async () => {
        const { data } = await bulkSearchBy({
          bulkId,
          product: productDebounce,
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
    if (recipientDebounce) {
      const response = async () => {
        const { data } = await bulkSearchBy({
          bulkId,
          recipient: recipientDebounce,
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
        const { data } = await bulkSearchBy({
          bulkId,
          status: failed === "Failure" ? true : false,
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
  }, [
    recipientDebounce,
    productDebounce,
    setTransactions,
    setEntries,
    setPages,
    setIsEmpty,
    failed,
    bulkId,
  ]);

  // React.useEffect(() => {
  //   if (searchPagination) {
  //     if (!productDebounce || !recipientDebounce) {
  //       const _getBulkRequest = async () => {
  //         const { data } = await getAllBulkRequest(bulkId);
  //         setTransactions(data.list);
  //         setPages(data.pages);
  //         setEntries(data.totalSize);
  //       };
  //       _getBulkRequest();
  //     }
  //   }
  // }, [
  //   productDebounce,
  //   recipientDebounce,
  //   setEntries,
  //   setPages,
  //   setTransactions,
  //   searchPagination,
  // ]);

  return (
    <div>
      <Flex>
        {searchBy === "Recipient" ? (
          <Input
            value={recipientQuery}
            placeholder="Search by recipient"
            onChange={(e) => {
              setRecipientQuery(e.target.value);
            }}
          />
        ) : searchBy === "Product" ? (
          <Input
            placeholder="Search by product"
            onChange={(e) => {
              setProductQuery(e.target.value);
            }}
            value={productQuery}
          />
        ) : (
          <Select
            value={failed}
            onChange={(e) => {
              setFailed(e.target.value);
            }}
          >
            {data.map((each) => {
              return (
                <option key={`${each.id}-1`} value={each.failed}>
                  {each.name}
                </option>
              );
            })}
          </Select>
        )}
        <DetailsSearchBy
          setSearchBy={setSearchBy}
          searchBy={searchBy}
          setProductQuery={setProductQuery}
          setRecipientQuery={setRecipientQuery}
          productQuery={productQuery}
          recipientQuery={recipientQuery}
          setSearchPagination={setSearchPagination}
        />
      </Flex>
    </div>
  );
};

export default DetailsSearchInput;
