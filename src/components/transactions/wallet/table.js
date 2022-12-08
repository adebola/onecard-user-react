import React from "react";
import { dateFormat } from "../../../utils/format.created.date";
import styled from "styled-components";

const _walletHeader = [
  { id: 1, name: "Amount" },
  { id: 2, name: "Payment Type" },
  { id: 3, name: "Date" },
];

const MyTr = styled.tr`
  &.active {
    background-color: var(--btn-color);
  }

  .text-active {
    color: #fff;
  }
`;

const Table = ({ transactions }) => {
  const [active, setActive] = React.useState(0);

  return transactions.length > 0 ? (
    <div>
      <table>
        <thead>
          <tr>
            {_walletHeader.map((each) => (
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
                <td className={className}>{each.amount}.00</td>
                <td className={className}>{each.type}</td>
                <td className={className}>{dateFormat(each.createdOn)}</td>
              </MyTr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Table;
