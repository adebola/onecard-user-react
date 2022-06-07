import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {
  getAllBulkRequest,
  getAllScheduledRequest,
  getAllSingleRequest,
  getAutoRechargePlans,
  searchSingleDetail,
} from "../../../../helper/requests";
// import { getAllSingleRequest } from "../../../../helper/requests";
import useDebounce from "../../../../hooks/useDebounce";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

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
  query,
  entries,
  pages,
  active,
  setActive,
  data,
  pageSize,
  setData,
  setEntries,
  setPageSize,
  setPages,
  type,
  search,
}) => {
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(5);
  const debounceSearch = useDebounce(query);

  useEffect(() => {
    if (!search) return;
    if (type === "Single") {
      const awaitResponse = async () => {
        try {
          const response = await getAllSingleRequest(active);
          setData(response.data.list);
          setEntries(response.data.totalSize);
          setPages(response.data.pages);
          setPageSize(response.data.pageSize);
        } catch (error) {
          console.error(error);
        }
      };
      awaitResponse();
    } else if (type === "Bulk") {
      const awaitResponse = async () => {
        try {
          const response = await getAllBulkRequest(active);
          setData(response.data.list);
          setEntries(response.data.totalSize);
          setPages(response.data.pages);
          setPageSize(response.data.pageSize);
        } catch (error) {
          console.error(error);
        }
      };
      awaitResponse();
    } else if (type === "Schedule") {
      const awaitResponse = async () => {
        try {
          const response = await getAllScheduledRequest(active);
          setData(response.data.list);
          setEntries(response.data.totalSize);
          setPages(response.data.pages);
          setPageSize(response.data.pageSize);
        } catch (error) {
          console.error(error);
        }
      };
      awaitResponse();
    } else {
      const awaitResponse = async () => {
        try {
          const response = await getAutoRechargePlans(active);
          setData(response.data);
          setEntries(response.data.totalSize);
          setPages(response.data.pages);
          setPageSize(response.data.pageSize);
        } catch (error) {
          console.error(error);
        }
      };
      awaitResponse();
    }
  }, [active, type, setData, setEntries, setPages, setPageSize, search]);

  useEffect(() => {
    if (search) return;
    if (type === "Single") {
      const awaitResponse = async () => {
        const response = await searchSingleDetail(debounceSearch, active);
        setData(response.data.list);
        setEntries(response.data.totalSize);
        setPages(response.data.pages);
      };
      debounceSearch && awaitResponse();
    }
  }, [search, active, type, setEntries, setPages, setData, debounceSearch]);

  const arrays = [...Array(pages)].map((_, i) => ({ id: i + 1 }));

  return (
    <Container>
      <div>
        <p className="text">
          Showing {(active - 1) * pageSize + 1} to{" "}
          {(active - 1) * pageSize + data.length} of {entries} entries
        </p>
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
  );
};

export default Pagination;
