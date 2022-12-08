import React from "react";
import styled from "styled-components";
import Pagination from "./pagination";
import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import useDebounce from "../../../hooks/useDebounce";
import DownloadWithDateRange from "../download/download.excel";
import DetailsSearchInput from "./details.search.input";
import NoMoreSearch from "../nomore";

const _header = [
  { id: 1, name: "Recipient" },
  { id: 2, name: "Product" },
  { id: 3, name: "Cost" },
  { id: 4, name: "Status" },
];

const MyTr = styled.tr`
  &.active {
    background-color: var(--btn-color);
  }

  .text-active {
    color: #fff;
  }
`;

const DetailsTable = ({
  detailedTransactions,
  setDetailsTransactions,
  detailedPages,
  detailedPageSize,
  detailedEntries,
  setDetailedPages,
  setDetailedEntries,
  setDetailedPageSize,
  searchPagination,
  bulkId,
  setSearchPagination,
}) => {
  const [active, setActive] = React.useState(0);
  const [recipientQuery, setRecipientQuery] = React.useState("");
  const [productQuery, setProductQuery] = React.useState("");
  const [failed, setFailed] = React.useState(null);
  const [isEmpty, setIsEmpty] = React.useState(false);

  const recipientDebounce = useDebounce(recipientQuery);
  const productDebounce = useDebounce(productQuery);

  return detailedTransactions.length > 0 ? (
    <div>
      <DetailsSearchInput
        recipientQuery={recipientQuery}
        setRecipientQuery={setRecipientQuery}
        productQuery={productQuery}
        setProductQuery={setProductQuery}
        failed={failed}
        recipientDebounce={recipientDebounce}
        productDebounce={productDebounce}
        setPages={setDetailedPages}
        setEntries={setDetailedEntries}
        setPageSize={setDetailedPageSize}
        setIsEmpty={setIsEmpty}
        setFailed={setFailed}
        setTransactions={setDetailsTransactions}
        bulkId={bulkId}
        isEmpty={isEmpty}
        searchPagination={searchPagination}
        setSearchPagination={setSearchPagination}
      />
      {isEmpty && <NoMoreSearch />}
      {!isEmpty && (
        <div>
          <table>
            <thead>
              <tr>
                {_header.map((header, i) => {
                  return <th key={i}>{header.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {detailedTransactions.map((details, index) => {
                const className = index + 1 === active ? "text-active" : "";

                return (
                  <MyTr
                    onClick={() => {
                      setActive(index + 1);
                    }}
                    className={index + 1 === active ? "active" : ""}
                  >
                    <td className={className}>{details.recipient}</td>
                    <td className={className}>{details.serviceCode}</td>
                    <td className={className}>{details.serviceCost}</td>
                    {details.failed === true ? (
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
                  </MyTr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            data={detailedTransactions}
            pages={detailedPages}
            entries={detailedEntries}
            pageSize={detailedPageSize}
            setPageSize={setDetailedPageSize}
            setEntries={setDetailedEntries}
            setPages={setDetailedPages}
            bulkId={bulkId}
          />
          <DownloadWithDateRange value="bulk" />
        </div>
      )}
    </div>
  ) : null;
};

export default DetailsTable;
