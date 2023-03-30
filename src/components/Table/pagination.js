import React from "react";

import styled from "styled-components";
// import { getTransaction } from "../../helper/requests";
import { getAllSingleRequest } from "../../helper/requests";

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
  pages,
  pageSize,
  entries,
  value,
  setSingleRequestData,
  setIsEmpty,
  setEntries,
  setPages,
  setPageSize,
  setGetData,
}) => {
  const [active, setActive] = React.useState(1);

  const [firstIndex, setFirstIndex] = React.useState(0);
  const [secondIndex, setSecondIndex] = React.useState(5);

  const arrays = [...Array(pages)].map((_, i) => ({ id: i + 1 }));

  React.useEffect(() => {
    const singleRechargeRequest = async () => {
      try {
        const response = await getAllSingleRequest();
        if (response.data.list.length === 0) {
          setIsEmpty(true);
          setGetData(true);
        } else {
          console.log(response.data.list);
          setGetData(true);
          setSingleRequestData(response.data.list);
          setIsEmpty(false);
          setEntries(response.data.totalSize);
          setPages(response.data.pages);
          setPageSize(response.data.pageSize);
        }
      } catch (error) {
        console.error(error);
      }
    };

    switch (value) {
      case "single":
        // console.log("==> single");
        singleRechargeRequest();
        break;

      default:
        break;
    }
  }, [
    value,
    setSingleRequestData,
    setIsEmpty,
    setEntries,
    setPages,
    setPageSize,
    setGetData,
  ]);

  return (
    <Container>
      <div>
        <p className="text">
          Showing {(active - 1) * pageSize + 1} to{" "}
          {(active - 1) * pageSize + data?.length} of {entries} entries
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
