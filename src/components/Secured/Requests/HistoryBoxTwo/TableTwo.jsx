import React, { useMemo } from "react";

import { useTable, usePagination, useSortBy } from "react-table";
import { columnTwo } from "./columns";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import ExcelDownload from "../ExcelDownload";

const Container = styled.div`
  margin-top: 55px;
`;

const Text = styled.button`
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

const TableTwo = ({ data, id, type }) => {
  const memorizeColumn = useMemo(() => columnTwo, []);
  const memorizeData = useMemo(() => data, [data]);

  const tableInstance = useTable(
    {
      columns: memorizeColumn,
      data: memorizeData,
    },
    useSortBy,
    usePagination
  );

  const {
    headerGroups,
    getTableProps,
    state,
    page,
    pageOptions,
    prepareRow,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    getTableBodyProps,
  } = tableInstance;

  const { pageIndex, pageSize } = state;
  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((column) => {
            return (
              <tr {...column.getHeaderGroupProps()}>
                {column.headers.map((header) => {
                  return (
                    <th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      {header.render("Header")}
                      <span>
                        {header.isSorted ? (
                          !header.isSortedDesc ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            // console.log(row.original.id);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "9px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
          }}
        >
          Showing {pageIndex * pageSize + 1} to{" "}
          {pageIndex * pageSize + page.length} of {data.length} entries
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            className={!canPreviousPage && "disabled"}
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            {"<<"}
          </Button>
          <span
            style={{
              margin: "0 5px",
            }}
          >
            {pageOptions.map((option, i) => (
              <Text
                onClick={() => gotoPage(option)}
                className={pageIndex + 1 === option + 1 && "active"}
              >
                {option + 1}
              </Text>
            ))}
          </span>
          <Button
            className={!canNextPage && "disabled"}
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
      <ExcelDownload id={id} type={type} />
    </Container>
  );
};

export default TableTwo;
