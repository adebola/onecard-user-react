import React from "react";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import { dateFormat } from "../../../utils/format.created.date";

const MyTr = styled.tr`
  &.active {
    background-color: var(--btn-color);
  }

  .text-active {
    color: #fff;
  }
`;

const _singleHeader = [
  {
    id: 1,
    name: "Recipient",
  },
  { id: 2, name: "Product" },
  { id: 3, name: "Cost" },
  { id: 4, name: "Date" },
  { id: 5, name: "Status" },
  { id: 6, name: "Refunded" },
];

const Table = ({ transactions, setSingleTransaction }) => {
  const [active, setActive] = React.useState(0);

  return transactions.length > 0 ? (
    <div>
      <table>
        <thead>
          <tr>
            {_singleHeader.map((each) => (
              <th>{each.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((each, index) => {
            const className = index + 1 === active ? "text-active" : "";
            return (
              <MyTr
                key={index}
                className={index + 1 === active ? "active" : ""}
                onClick={() => {
                  setActive(index + 1);
                  setSingleTransaction(each);
                }}
              >
                <td className={className}>{each.recipient}</td>
                <td className={className}>{each.serviceCode}</td>
                <td className={className}>{each.serviceCost}.00</td>
                <td className={className}>
                  {dateFormat(each.createdAt, "date")}
                </td>
                {each.failed === true ? (
                  <td
                    className={className}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <RiCloseFill color="rgb(255, 76, 48)" />
                  </td>
                ) : (
                  <td
                    className={className}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <TiTick color="rgb(46, 204, 113)" />
                  </td>
                )}
                {each.refundId ? (
                  <td
                    className={className}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <TiTick color="rgb(46, 204, 113)" />
                  </td>
                ) : (
                  <td
                    className={className}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    -
                  </td>
                )}
              </MyTr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Table;
