import React, { useEffect, useState } from "react";
import {
  getAllBulkRequest,
  getBulkDetail,
  searchByDate,
} from "../../../../helper/requests";
import { header } from "./columns";
import styled from "styled-components";

// import { FaSortDown, FaSortUp } from "react-icons/fa";
import TableTwo from "./TableTwo";
import DatePicker from "react-datepicker";
import { convertDate } from "../../../../utils/dateformat";
import { Link, useNavigate } from "react-router-dom";
import Table from "../Table";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 30px;
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

const NoRecharge = styled.p`
  font-size: 14px;
  color: var(--text-color);
  margin-top: 20px;
`;

const SingleLink = styled(Link)`
  color: var(--text-color);
  font-weight: bold;
`;

const Search = ({ setData, setText }) => {
  const [queryDate, setQueryDate] = useState(null);

  useEffect(() => {
    if (queryDate === null) {
      const awaitResponse = async () => {
        try {
          const response = await getAllBulkRequest();
          setData(response.data.list);
          setText(false);
        } catch (error) {
          console.error(error);
        }
      };

      awaitResponse();
    }
  }, [queryDate, setData, setText]);

  useEffect(() => {
    const awaitResponse = async () => {
      const data = { scheduledDate: convertDate(queryDate) };

      const response = await searchByDate(data);
      if (response.data.list.length === 0) {
        setText(true);
      } else {
        setData(response.data.list);
      }
    };

    if (queryDate) awaitResponse();
  }, [setData, queryDate, setText]);

  const handleChange = (e) => {
    setQueryDate(e);
  };

  return (
    <SearchContainer>
      <p> Search </p>
      <CustomDatePicker
        onChange={handleChange}
        selected={queryDate}
        placeholder=" "
        required
      />
    </SearchContainer>
  );
};

const HistoryBoxTwo = ({ type }) => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const navigate = useNavigate();

  const [pages, setPages] = useState(0);
  const [pageSizeTableTwo, setPageSizeTableTwo] = useState(0);
  const [pagesTableTwo, setPagesTableTwo] = useState(0);
  const [entriesTableTwo, setEntriesTableTwo] = useState(1);
  const [entries, setEntries] = useState(1);
  const [dataTwo, setDataTwo] = useState([]);
  const [text, setText] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [id, setId] = useState(0);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await getAllBulkRequest();
        if (response.data.list.length === 0) {
          setIsEmpty(true);
        } else {
          setData(response.data.list);
          setIsEmpty(false);
          setEntries(response.data.totalSize);
          setPages(response.data.pages);
          setPageSize(response.data.pageSize);
        }
      } catch (error) {
        console.error(error);
      }
    };

    awaitResponse();
  }, []);

  const handleClick = async (id) => {
    navigate({
      pathname: "/history",
      search: `?id=${id}`,
    });
    try {
      const response = await getBulkDetail(id);
      setDataTwo(response.data.list);
      setId(id);
      setEntriesTableTwo(response.data.totalSize);
      setPagesTableTwo(response.data.pages);
      setPageSizeTableTwo(response.data.pageSize);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const renderSearch = () => {
    return (
      <Container>
        <Search
          setData={setData}
          setText={setText}
          setEntries={setEntries}
          setPageSize={setPageSize}
          setPages={setPages}
        />
      </Container>
    );
  };

  return (
    <>
      <div>
        {isEmpty && data.length === 0 && (
          <NoRecharge>
            You have no bulk recharge!. Create{" "}
            <SingleLink to="/bulk">bulk recharge.</SingleLink>
          </NoRecharge>
        )}
        {data.length > 0 && (
          <div>
            {renderSearch()}
            {text ? (
              <NoResult> No results found</NoResult>
            ) : (
              <Table
                data={data}
                entries={entries}
                setData={setData}
                pages={pages}
                handleClick={handleClick}
                header={header}
                type={type}
                pageSize={pageSize}
                setId={setId}
              />
            )}
          </div>
        )}
        {id !== 0 && dataTwo.length > 0 && (
          <TableTwo
            data={dataTwo}
            id={id}
            type={type}
            pages={pagesTableTwo}
            setData={setData}
            entries={entriesTableTwo}
            pageSize={pageSizeTableTwo}
            setEntriesTableTwo={setEntriesTableTwo}
            setPageSizeTableTwo={setPageSizeTableTwo}
            setPagesTableTwo={setPagesTableTwo}
            setDataTwo={setDataTwo}
          />
        )}
      </div>
    </>
  );
};

export default HistoryBoxTwo;
