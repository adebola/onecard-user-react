import React from "react";
import { response } from "./data";

import styled from "styled-components";
import { TableContext } from "../../context/TableContext";
// import { getTransaction } from "../../helper/requests";
import {
  getAllBulkRequest,
  getAllScheduledRequest,
  getAllSingleRequest,
  getAutoRechargePlans,
  getWalletFunding,
} from "../../helper/requests";

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
const Pagination = ({ value }) => {
  const [active, setActive] = React.useState(0);
  const {
    data,
    setData,
    pageSize,
    setPageSize,
    pages,
    setPages,
    entries,
    setEntries,
  } = React.useContext(TableContext);

  React.useEffect(() => {
    const resetAll = () => {
      setData([]);
    };
    resetAll();
  }, [setData, setEntries]);

  React.useEffect(() => {
    switch (value) {
      case "single":
        const _getSingleRequest = async () => {
          const { data } = await getAllSingleRequest(active);
          setData(data.list);
          setPageSize(data.pageSize);
          setPages(data.pages);
          setEntries(data.totalSize);
        };
        return _getSingleRequest();
      case "bulk":
        const _getBulkRequest = async () => {
          const { data } = await getAllBulkRequest(active);
          setData(data.list);
          setPageSize(data.pageSize);
          setPages(data.pages);
          setEntries(data.totalSize);
        };
        return _getBulkRequest();

      case "schedule":
        const _getScheduleRequest = async () => {
          const { data } = await getAllScheduledRequest(active);
          setData(data.list);
          setPageSize(data.pageSize);
          setPages(data.pages);
          setEntries(data.totalSize);
        };
        return _getScheduleRequest();

      case "auto":
        const _getAutoRequest = async () => {
          const { data } = await getAutoRechargePlans(active);
          setData(data.list);
          setPageSize(data.pageSize);
          setPages(data.pages);
          setEntries(data.totalSize);
        };
        return _getAutoRequest();

      case "wallet":
        const _getWalletRequest = async () => {
          const { data } = await getWalletFunding(active);
          setData(data.list);
          setPageSize(data.pageSize);
          setPages(data.pages);
          setEntries(data.totalSize);
        };
        return _getWalletRequest();

      default:
        break;
    }
  }, [value, active, setData, setPageSize, setPages, setEntries]);

  const [firstIndex, setFirstIndex] = React.useState(0);
  const [secondIndex, setSecondIndex] = React.useState(5);

  const arrays = [...Array(pages)].map((_, i) => ({ id: i + 1 }));

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
              // console.log("loading...");
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
  ) : (
    <p></p>
  );
};

export default Pagination;
