import React from "react";
import styled from "styled-components";
import Pagination from "./pagination";
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

const Table = ({
  active,
  pages,
  data,
  pageSize,
  singleRequestData,
  entries,
  setActive,
  setSingleDetails,
  value,
  setSingleRequestData,
  setPages,
  setEntries,
  setPageSize,
  setGetData,
  setIsEmpty,
}) => {
  const header = [
    {
      id: 1,
      name: "Recipient",
    },
    { id: 2, name: "Product" },
    { id: 3, name: "Cost" },
    { id: 4, name: "Date" },
    { id: 5, name: "Status" },
    { id: 6, name: "Refund Id" },
    { id: 7, name: "Retry Id" },
    { id: 8, name: "Resolve Id" },
  ];

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
        {/* {Object.keys(singleDetails).length > 0 && (
          <div>
            <div>{singleDetails.recipient}</div>
            <div>{singleDetails.serviceCost}</div>
            <div>{singleDetails.product}</div>
            <div>{singleDetails.createdAt}</div>
            <div>{singleDetails.failed === true ? "Failure" : "Success"}</div>
            <button onClick={() => setSingleDetails({})}>ok</button>
          </div>
        )} */}

        <Pagination
          pages={pages}
          pageSize={pageSize}
          entries={entries}
          data={singleRequestData}
          active={active}
          setActive={setActive}
          value={value}
          setData={setSingleRequestData}
          setPages={setPages}
          setEntries={setEntries}
          setPageSize={setPageSize}
          setGetData={setGetData}
          setIsEmpty={setIsEmpty}
        />
      </div>
    </div>
  );
};

export default Table;
