import React, { useEffect, useMemo, useContext, useState } from "react";
import {
  getAutoRechargePlans,
  getSingleAutoRechargePlanBulk,
  searchByDateAuto,
  searchByName,
} from "../../../../helper/requests";
import { useTable, usePagination, useSortBy } from "react-table";
import { columns } from "./columns";
import styled from "styled-components";

import { FaSortDown, FaSortUp } from "react-icons/fa";
import TableTwo from "./TableTwo";
import DatePicker from "react-datepicker";
import { convertDate } from "../../../../utils/dateformat";
import Select from "react-select";
import useDebounce from "../../../../hooks/useDebounce";
import { Link } from "react-router-dom";
import { ModalContext } from "../../../../context/ModalProvider";
import Pagination from "../Pagination";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 30px;

  .css-b62m3t-container {
    margin-top: 0px;
  }
`;

const SearchContainer = styled.div`
  .form {
    height: 40px;
    position: relative;
    width: 12rem;
  }

  p {
    font-size: 0.9rem;
    color: #eb6a2b;
  }

  .form__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #eb6a2b;
    border-radius: 4px;
    background: none;
    outline: none;
    padding: 1rem;
    color: #eb6a2b;
  }

  .form__label {
    position: absolute;
    top: 0.8rem;
    font-size: 0.9rem;
    color: #eb6a2b;
    left: 1rem;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
    pointer-events: none;
  }

  .form__input:focus ~ .form__label {
    top: -0.45rem;
    left: 0.8rem;
    font-size: 0.8rem;
    background: white;
  }

  input:valid ~ .form__label {
    background: white;
    top: -0.45rem;
    left: 0.8rem;
    font-size: 0.8rem;
  }
`;

const NoResult = styled.div`
  color: var(--text-color);
  font-size: 14px;
`;

const CustomDatePicker = styled(DatePicker)`
  border: 1px solid #eb6a2b;
  border-radius: 4px;
  background: none;
  outline: none;
  padding: 1rem;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;

  .css-qc6sy-singleValue {
    font-size: 13px;
  }
`;

const SmallText = styled.div`
  margin-right: 5px;
  color: #eb6a2b;
  font-size: 14px;
`;

const NoRecharge = styled.p`
  font-size: 14px;
  color: var(--text-color);
  margin-top: 20px;
`;

const SingleLink = styled(Link)`
  color: var(--text-color);
  font-weight: bold;
`;

const Search = ({ setData, setText, queryDate }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (queryDate === null) {
      console.log("null", queryDate);
      const awaitResponse = async () => {
        try {
          const response = await getAutoRechargePlans();
          setData(response.data);
          setText(false);
        } catch (error) {
          console.error(error);
        }
      };

      awaitResponse();
    }
  }, [queryDate, setData, setText]);

  const debounceSearch = useDebounce(query);

  useEffect(() => {
    const awaitResponse = async () => {
      const response = await searchByName(debounceSearch);
      if (response.data.list.length === 0) {
        setText(true);
      } else {
        setData(response.data.list);
        setText(false);
      }
    };

    if (debounceSearch) awaitResponse();
    if (!debounceSearch) {
      const awaitResponse = async () => {
        try {
          const response = await getAutoRechargePlans();
          setData(response.data);
          setText(false);
        } catch (error) {
          console.error(error);
        }
      };
      awaitResponse();
    }
  }, [debounceSearch, setData, setText]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <SearchContainer>
      <div className="form">
        <input
          onChange={handleInputChange}
          className="form__input"
          placeholder=" "
          required
          type="tel"
          value={query}
        />
        <label className="form__label">Search</label>
      </div>
    </SearchContainer>
  );
};

const HistoryBoxFour = ({ type }) => {
  const [data, setData] = useState([]);

  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(0);
  const [dataTwo, setDataTwo] = useState([]);
  const [searchType, setSearchType] = useState("name");
  const [queryDate, setQueryDate] = useState(null);
  const [text, setText] = useState(false);

  const { setRechargeType } = useContext(ModalContext);

  useEffect(() => {
    const awaitResponse = async () => {
      const data = { scheduledDate: convertDate(queryDate) };

      const response = await searchByDateAuto(data);
      if (response.data.list.length === 0) {
        setText(true);
      } else {
        setData(response.data.list);
      }
    };

    if (queryDate) awaitResponse();
  }, [setData, queryDate, setText]);

  useEffect(() => {
    if (queryDate === null) {
      console.log("null", queryDate);
      const awaitResponse = async () => {
        try {
          const response = await getAutoRechargePlans();
          setData(response.data);
          setText(false);
        } catch (error) {
          console.error(error);
        }
      };

      awaitResponse();
    }
  }, [queryDate, setData, setText]);

  const options = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date" },
  ];
  const memorizeColumn = useMemo(() => columns, []);
  const memorizeData = useMemo(() => data, [data]);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await getAutoRechargePlans();
        setData(response.data);
        setData(response.data.list);
        setEntries(response.data.totalSize);
        setPages(response.data.pages);
      } catch (error) {
        console.error(error);
      }
    };

    awaitResponse();
  }, []);

  const tableInstance = useTable(
    {
      columns: memorizeColumn,
      data: memorizeData,
      initialState: {
        pageSize: 20,
      },
    },
    useSortBy,
    usePagination
  );

  const {
    headerGroups,
    getTableProps,

    page,
    prepareRow,
    setPageSize,
    getTableBodyProps,
  } = tableInstance;

  useEffect(() => {
    setPageSize(20);
  }, [setPageSize]);

  const handleClick = async (id) => {
    try {
      const response = await getSingleAutoRechargePlanBulk(id);
      setDataTwo(response.data.list);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };
  const renderSearchBy = () => {
    const handleChange = (e) => {
      setSearchType(e.value);
    };
    return (
      <InnerContainer>
        <SmallText>Search by</SmallText>
        <Select
          onChange={handleChange}
          options={options}
          defaultValue={options[0]}
        />
      </InnerContainer>
    );
  };
  const renderSearch = () => {
    //
    const handleDateChange = (e) => {
      setQueryDate(e);
    };

    return (
      <Container>
        {searchType === "name" ? (
          <Search setData={setData} setText={setText} queryDate={queryDate} />
        ) : (
          <div>
            <SmallText>Search</SmallText>
            <CustomDatePicker
              selected={queryDate}
              onChange={handleDateChange}
              placeholder=" "
              required
              dateFormat="dd-MM-yyyy"
            />
          </div>
        )}

        {renderSearchBy()}
      </Container>
    );
  };

  const renderTable = () => {
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((column) => {
              return (
                <tr {...column.getHeaderGroupProps()}>
                  {column.headers.map((header) => {
                    return (
                      <th
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                      >
                        {header.render("Header")}
                        <span>
                          {header.isSorted ? (
                            !header.isSortedDesc ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              // console.log(row.original.id);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleClick(row.original.id)}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <Pagination
            page={pages}
            data={data}
            entries={entries}
            setData={setData}
            type={type}
            setEntries={setEntries}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      {/* {renderSearch()} */}
      {data.length === 0 && (
        <NoRecharge>
          You have no auto recharge!. Create{" "}
          <SingleLink
            onClick={() => {
              setRechargeType(3);
            }}
            to="/bulk"
          >
            auto recharge.
          </SingleLink>
        </NoRecharge>
      )}
      {data.length > 0 && (
        <div>
          {renderSearch()}
          {text ? <NoResult> No results found</NoResult> : renderTable()}
        </div>
      )}
      {/* {dataTwo.length > 0 && <TableTwo data={dataTwo} />} */}
    </div>
  );
};

export default HistoryBoxFour;
