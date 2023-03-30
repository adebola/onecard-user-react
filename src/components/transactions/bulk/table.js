import React from "react";
import { getBulkDetail } from "../../../helper/requests";
import { dateFormat } from "../../../utils/format.created.date";
import styled from "styled-components";

const _bulkHeader = [
  {
    id: 1,
    name: "id",
  },
  { id: 2, name: "Payment" },
  { id: 3, name: "Total Cost" },
  { id: 4, name: "Date" },
];

const MyTr = styled.tr`
  &.active {
    background-color: var(--btn-color);
  }

  .text-active {
    color: #fff;
  }
`;

const Table = ({
  transactions,
  setDetailedTransactions,
  setDetailedPages,
  setDetailedPageSize,
  setDetailedEntries,
  setBulkId,
}) => {
  const [active, setActive] = React.useState(0);

  const getSingleBulkDetail = async (id) => {
    const { data } = await getBulkDetail(id);
    setDetailedTransactions(data.list);
    setDetailedPageSize(data.pageSize);
    setDetailedPages(data.pages);
    setDetailedEntries(data.totalSize);
  };

  return transactions.length > 0 ? (
    <div>
      <table>
        <thead>
          <tr>
            {_bulkHeader.map((each) => (
              <th>{each.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((each, index) => {
            const className = index + 1 === active ? "text-active" : "";
            return (
              <MyTr
                onClick={() => {
                  setActive(index + 1);
                  getSingleBulkDetail(each.id);
                  setBulkId(each.id);
                }}
                className={index + 1 === active ? "active" : ""}
              >
                <td className={className}>{each.id}</td>
                <td className={className}>{each.paymentMode}</td>
                <td className={className}>{each.totalServiceCost}.00</td>
                <td className={className}>{dateFormat(each.createdAt)}</td>
              </MyTr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Table;
