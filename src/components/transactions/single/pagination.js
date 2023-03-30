import React from "react";

import styled from "styled-components";
import {
  getAllSingleRequest,
  makeSingleSearchRequest,
} from "../../../helper/requests";

import useDebounce from "../../../hooks/useDebounce";
import { convertDate } from "../../../utils/dateformat";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  p {
    cursor: pointer;
    margin: 0 6px;
  }

  .text {
    font-size: 13px;
  }
`;

const Page = styled.button`
  height: 25px;
  width: 25px;
  background: none;
  outline: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  &.active&:not(:focus) {
    box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.23);
  }

  &:hover {
    background-color: #ddd;
  }

  &.active {
    background: var(--btn-color);
    color: white;
  }
`;

const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  color: var(--btn-color);
  margin: 0 5px;
  padding: 6px;
  cursor: pointer;

  &.disabled {
    opacity: 0.3;
    cursor: default;
  }

  &:hover&:not(:disabled) {
    background-color: #ddd;
  }
`;

const Pagination = ({
  data,
  pageSize,
  entries,
  pages,
  setPageSize,
  setPages,
  setEntries,
  setTransactions,
  searchPagination,
  recipientQuery,
  productQuery,
  failed,
  startDate,
  endDate,
  emptyQuery,
  setIsEmpty,
  clicked,
  setClicked,
}) => {
  const [active, setActive] = React.useState(1);
  const [firstIndex, setFirstIndex] = React.useState(0);
  const [secondIndex, setSecondIndex] = React.useState(5);

  const arrays = [...Array(pages)].map((_, i) => ({ id: i + 1 }));

  React.useEffect(() => {
    if (emptyQuery) {
      const _getSingleRequest = async () => {
        const { data } = await getAllSingleRequest(active);
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
      _getSingleRequest();
    }
  }, [
    emptyQuery,
    setTransactions,
    setPageSize,
    setPages,
    setEntries,
    active,
    setIsEmpty,
  ]);

  React.useEffect(() => {
    if (clicked && !searchPagination) {
      const _getSingleRequest = async () => {
        const { data } = await getAllSingleRequest(active);
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
      _getSingleRequest();
    }
  }, [
    active,
    clicked,
    setEntries,
    setPages,
    setPageSize,
    setTransactions,
    searchPagination,
    setIsEmpty,
  ]);

  const recipientDebounce = useDebounce(recipientQuery);
  const productDebounce = useDebounce(productQuery);

  React.useEffect(() => {
    if (clicked && searchPagination) {
      let _data;
      if (recipientDebounce) {
        _data = {
          recipient: recipientDebounce,
        };
      }
      if (productDebounce) {
        _data = {
          product: productDebounce,
        };
      }

      if (failed) {
        _data = {
          failed: failed,
        };
      }

      if (startDate) {
        _data = {
          startDate: convertDate(startDate),
        };
      }

      if (endDate) {
        _data = {
          startDate: convertDate(startDate),
          endDate: convertDate(endDate),
        };
      }

      const _makeSingleSearchRequest = async () => {
        const { data } = await makeSingleSearchRequest(_data, active);
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
      _makeSingleSearchRequest();
    }
  }, [
    recipientDebounce,
    productDebounce,
    clicked,
    searchPagination,
    active,
    failed,
    startDate,
    endDate,
    setTransactions,
    setEntries,
    setPages,
    setIsEmpty,
  ]);

  return data.length > 0 ? (
    <Container>
      <div>
        {data.length > 0 && (
          <p className="text">
            Showing {(active - 1) * pageSize + 1} to{" "}
            {(active - 1) * pageSize + data?.length} of {entries} entries
          </p>
        )}
      </div>
      <div>
        <>
          <Button
            disabled={firstIndex === 0}
            className={firstIndex === 0 && "disabled"}
            onClick={() => {
              setFirstIndex(firstIndex - 5);
              setSecondIndex(secondIndex - 5);
              setActive(secondIndex - 5);
            }}
          >
            {"<<"}
          </Button>
        </>

        {arrays.slice(firstIndex, secondIndex).map((each) => (
          <Page
            onClick={() => {
              if (!clicked) setClicked(true);
              setActive(each.id);
            }}
            className={active === each.id && "active"}
          >
            {each.id}
          </Page>
        ))}

        <>
          <Button
            disabled={secondIndex > pages}
            className={secondIndex > pages && "disabled"}
            onClick={() => {
              setFirstIndex(firstIndex + 5);
              setSecondIndex(secondIndex + 5);
              setActive(firstIndex + 6);
            }}
          >
            {">>"}
          </Button>
        </>
      </div>
    </Container>
  ) : (
    <p></p>
  );
};

export default Pagination;
