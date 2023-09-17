import React, { useState } from "react";

import { tableHeaderTwo } from "./columns";
// import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import ExcelDownload from "../ExcelDownload";
import Pagination from "./PaginationTableTwo";
import { dateFormat } from "../../../../utils/format.created.date";

const Container = styled.div`
  margin-top: 55px;
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

  return (
    <Container>
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
                    <td>{each.id}</td>
                    <td>{each.paymentMode}</td>
                    <td>{each.totalServiceCost}</td>
                    <td>{dateFormat(each.createdAt)}</td>
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
    </Container>
  );
};

export default TableTwo;
