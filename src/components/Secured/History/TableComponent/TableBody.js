import React from "react";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((each) => {
        return (
          <tr key={each.id}>
            {columns.map(({ accessor }) => {
              const tData = each[accessor] ? each[accessor] : "——";
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
