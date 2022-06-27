import React, { useContext, useEffect, useState } from "react";
import {
  getAutoRechargePlans,
  searchByDateSchedule,
  singleAutoRechargePlanBulk,
} from "../../../../helper/requests";
import { header } from "./columns";
import styled from "styled-components";

// import { FaSortDown, FaSortUp } from "react-icons/fa";
import TableTwo from "./TableTwo";
import DatePicker from "react-datepicker";
import { convertDate } from "../../../../utils/dateformat";
import { Link, useNavigate } from "react-router-dom";
import { ModalContext } from "../../../../context/ModalProvider";

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

const Search = ({ setData, setEntries, setPages, setPageSize, setText }) => {
  const [queryDate, setQueryDate] = useState(null);

  useEffect(() => {
    if (queryDate === null) {
      const awaitResponse = async () => {
        try {
          const response = await getAutoRechargePlans();
          setEntries(response.data.totalSize);
          setPages(response.data.pages);
          setPageSize(response.data.pageSize);
          setData(response.data.list);
          setText(false);
        } catch (error) {
          console.error(error);
        }
      };

      awaitResponse();
    }
  }, [queryDate, setData, setText, setEntries, setPages, setPageSize]);

  useEffect(() => {
    const awaitResponse = async () => {
      const data = { scheduledDate: convertDate(queryDate) };

      const response = await searchByDateSchedule(data);
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
        dateFormat="dd-MM-yyyy"
      />
    </SearchContainer>
  );
};

const HistoryBoxFour = ({ type }) => {
  const { setRechargeType } = useContext(ModalContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [dataTwo, setDataTwo] = useState([]);

  // console.log(dataTwo);

  const [entries, setEntries] = useState(1);
  const [id, setId] = useState(0);
  const [pages, setPages] = useState(0);
  const [text, setText] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [pageSizeTableTwo, setPageSizeTableTwo] = useState(0);
  const [pagesTableTwo, setPagesTableTwo] = useState(0);
  const [entriesTableTwo, setEntriesTableTwo] = useState(1);

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await getAutoRechargePlans();
        setData(response.data.list);
        setEntries(response.data.totalSize);
        setPages(response.data.pages);
        setIsEmpty(false);
      } catch (error) {
        console.log(error);
      }
    };
    awaitResponse();
  }, []);

  const handleClick = async (id) => {
    // navigate({
    //   pathname: "/history",
    //   search: `?id=${id}`,
    // });
    try {
      const response = await singleAutoRechargePlanBulk(id);
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
        <Search setData={setData} setText={setText} />
      </Container>
    );
  };

  return (
    <div>
      {isEmpty && data.length === 0 && (
        <NoRecharge>
          You have no auto recharge!. Create{" "}
          <SingleLink
            onClick={() => {
              setRechargeType(3);
            }}
            to="/bulk"
          >
            scheduled recharge.
          </SingleLink>
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
  );
};

export default HistoryBoxFour;
