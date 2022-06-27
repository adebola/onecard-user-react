import React from "react";
import { dateFormat } from "../../utils/format.created.date";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((each) => {
        return (
          <tr key={each.id}>
            {/* {columns.map(({ accessor }) => {
              console.log(each);
              const tData = each[accessor] ? each[accessor] : "——";
              return <td key={accessor}>{tData}</td>;
            })} */}

            <td>{each.recipient}</td>
            <td>{each.id}</td>
            <td>{each.txAmount}</td>
            <td>{each.serviceName}</td>
            <td>{dateFormat(each.txDate)}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
