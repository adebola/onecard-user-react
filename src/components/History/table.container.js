import React from "react";
import { TableContext } from "../../context/TableContext";
import styled from "styled-components";

import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";

const MyTr = styled.tr`
  &.active {
    background-color: var(--btn-color);
  }

  .text-active {
    color: #fff;
  }
`;

const TableContainer = ({ value, header }) => {
  const [active, setActive] = React.useState(1);
  const [singleDetails, setSingleDetails] = React.useState({});
  const { data } = React.useContext(TableContext);
  if (value === "single") {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {header.map((each) => (
                <th>{each.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((each, index) => {
              const className = index + 1 === active ? "text-active" : "";
              return (
                <MyTr
                  key={index}
                  className={index + 1 === active ? "active" : ""}
                  onClick={() => {
                    setActive(index + 1);
                    setSingleDetails(each);
                  }}
                >
                  <td className={className}>{each.recipient}</td>
                  <td className={className}>{each.serviceCode}</td>
                  <td className={className}>{each.serviceCost}.00</td>
                  <td className={className}>{each.createdAt}</td>
                  {each.failed === true ? (
                    <td
                      className={className}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <RiCloseFill color="rgb(255, 76, 48);" />
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
                    <td className={className}>{each.refundId}</td>
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
                  {each.retryId ? (
                    <td className={className}>{each.retryId}</td>
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
                  {each.resolveId ? (
                    <td className={className}>{each.resolveId}</td>
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
    );
  }
  return (
    <table>
      <thead>
        <tr>
          {header.map((each) => (
            <th>{each.name}</th>
          ))}
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default TableContainer;
