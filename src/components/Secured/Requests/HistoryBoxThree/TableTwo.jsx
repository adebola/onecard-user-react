import React, { useState } from "react";

import { tableHeaderTwo } from "./columns";
// import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import ExcelDownload from "../ExcelDownload";
import Pagination from "./PaginationTableTwo";
import { BiCheck } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
import { retryRequest } from "../../../../helper/requests";
import SearchBy from "../../../SearchBy";
import Search from "../../../Search";

const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border: 1px solid #dc3444;
  color: #dc3444;
`;

const Container = styled.div`
  margin-top: 55px;
`;

const EmptyText = styled.p`
  color: var(--text-color);
  font-size: 14px;
  margin: 20px 0;
`;

const TableTwo = ({
  data,
  id,
  type,
  pages,
  setDataTwo,
  setEntriesTableTwo,
  setPageSizeTableTwo,
  entries,
  pageSize,
  setPagesTableTwo,
}) => {
  const [active, setActive] = useState(1);

  const [text, setText] = useState("recipient");
  const [query, setQuery] = useState("");
  const [empty, setEmpty] = useState(false);

  //
  const handleRetryRequest = async () => {
    try {
      const response = await retryRequest(id);
      console.log(response);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };
  return (
    <Container>
      <SearchBy
        setEntriesTableTwo={setEntriesTableTwo}
        setPageSizeTableTwo={setPageSizeTableTwo}
        setPagesTableTwo={setPagesTableTwo}
        setDataTwo={setDataTwo}
        text={text}
        setEmpty={setEmpty}
        setQuery={setQuery}
        setText={setText}
      >
        <Search
          setDataTwo={setDataTwo}
          query={query}
          setEmpty={setEmpty}
          setQuery={setQuery}
          text={text}
          setEntriesTableTwo={setEntriesTableTwo}
          setPageSizeTableTwo={setPageSizeTableTwo}
          setPagesTableTwo={setPagesTableTwo}
        />
      </SearchBy>

      {empty ? (
        <EmptyText>No results found, try another search</EmptyText>
      ) : (
        <>
          <div>
            <div>
              <table>
                <thead>
                  <tr>
                    {tableHeaderTwo.map((each) => (
                      <th>{each.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((each) => {
                    return (
                      <tr>
                        <td>{each.recipient}</td>
                        <td>{each.serviceCode}</td>
                        <td>{each.serviceCost.toFixed(2)}</td>
                        <td>
                          {each.failed ? (
                            <Button onClick={handleRetryRequest}>
                              <RiCloseFill color="red" size={19} />
                              <p>RETRY</p>
                            </Button>
                          ) : (
                            <BiCheck color="green" size={22} />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <Pagination
                active={active}
                setActive={setActive}
                entries={entries}
                pageSize={pageSize}
                data={data}
                pages={pages}
                id={id}
                type={type}
                setEntriesTableTwo={setEntriesTableTwo}
                setPageSizeTableTwo={setPageSizeTableTwo}
                setPagesTableTwo={setPagesTableTwo}
                setDataTwo={setDataTwo}
              />
            </div>
          </div>
          <ExcelDownload id={id} type={type} />
        </>
      )}
    </Container>
  );
};

export default TableTwo;
