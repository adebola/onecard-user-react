import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../../utils/format.created.date";

const MyTr = styled.tr`
  &.active {
    background-color: var(--btn-color);
  }

  .text-active {
    color: #fff;
  }
`;

const _autoHeader = [
  {
    id: 1,
    name: "id",
  },
  { id: 2, name: "Name" },
  { id: 3, name: "Start Date" },
  { id: 4, name: "End Date" },
  { id: 4, name: "Recurring Type" },
];
const Table = ({ transactions }) => {
  const [active, setActive] = React.useState(0);

  return transactions.length > 0 ? (
    <div>
      <table>
        <thead>
          <tr>
            {_autoHeader.map((each) => (
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
                }}
                className={index + 1 === active ? "active" : ""}
              >
                <td className={className}>{each.id}</td>
                <td className={className}>{each.title}</td>
                <td className={className}>{dateFormat(each.startDate)}</td>
                <td className={className}>{dateFormat(each.endDate)}</td>
                <td className={className}>{each.recurringType}</td>
              </MyTr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Table;
