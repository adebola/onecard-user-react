import React from "react";
import { getAllScheduledRequestDetail } from "../../../helper/requests";
import { dateFormat } from "../../../utils/format.created.date";
import styled from "styled-components";

const _scheduleHeader = [
  {
    id: 1,
    name: "id",
  },
  { id: 2, name: "Payment" },
  { id: 3, name: "Schedule Date" },
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

  const getSingleScheduleDetail = async (id) => {
    const { data } = await getAllScheduledRequestDetail(id);
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
            {_scheduleHeader.map((each) => (
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
                  getSingleScheduleDetail(each.id);
                  setBulkId(each.id);
                }}
                className={index + 1 === active ? "active" : ""}
              >
                <td className={className}>{each.id}</td>
                <td className={className}>{each.paymentMode}</td>
                <td className={className}>{dateFormat(each.scheduledDate)}</td>
              </MyTr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Table;
