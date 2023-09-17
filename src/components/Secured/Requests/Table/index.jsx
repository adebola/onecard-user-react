import React, { useState } from "react";
import Pagination from "../Pagination";
import { dateFormat } from "../../../../utils/format.created.date";

const Table = ({
  data,
  pages,
  setData,
  entries,
  pageSize,
  header,
  type,
  handleClick,
  search,
  query,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div>
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
            {(type === "Single" || type === "Bulk" || type === "Schedule") &&
              data.map((each) => {
                return (
                  <tr onClick={() => handleClick(each.id)}>
                    <td>{each.id}</td>
                    <td>{each.serviceCode || each.paymentMode}</td>
                    <td>
                      {each.serviceCost ||
                        each.totalServiceCost ||
                        dateFormat(each.scheduledDate)}
                    </td>
                    {each.createdAt && <td>{dateFormat(each.createdAt)}</td>}
                  </tr>
                );
              })}

            {type === "Auto" &&
              data.map((each) => {
                return (
                  <tr onClick={() => handleClick(each.id)}>
                    <td>{each.id}</td>
                    <td>{each.title}</td>
                    <td>{dateFormat(each.startDate)}</td>
                    <td>{dateFormat(each.endDate)}</td>
                    <td>{each.recurringType}</td>
                  </tr>
                );
              })}

            {type === "Wallet" &&
              data.map((each) => {
                return (
                  <tr onClick={() => handleClick(each.id)}>
                    <td>{each.amount.toFixed(2)}</td>
                    <td>{each.type}</td>
                    <td>{dateFormat(each.createdOn)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          search={search}
          active={active}
          setActive={setActive}
          entries={entries}
          data={data}
          pages={pages}
          pageSize={pageSize}
          setData={setData}
          type={type}
          query={query}
        />
      </div>
    </div>
  );
};

export default Table;
