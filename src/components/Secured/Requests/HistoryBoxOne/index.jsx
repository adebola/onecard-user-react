import React, { useEffect, useState } from "react";
import {
  getAllSingleRequest,
  getSingleDetail,
  searchSingleDetail,
} from "../../../../helper/requests";
import { header } from "./columns";
// import { FaSortDown, FaSortUp } from "react-icons/fa";
import styled from "styled-components";
import useDebounce from "../../../../hooks/useDebounce";
import { Link } from "react-router-dom";
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
    width: 188px;
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
    left: 1rem;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
    color: #eb6a2b;
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

const Details = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 90px 4px rgb(0 0 0 / 10%);
  border-radius: 20px;
  padding: 2rem 1rem;
  width: 50%;

  p {
    font-size: 14px;
  }

  span {
    margin-right: 5px;
    font-size: 13px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const OkayButton = styled.button`
  padding: 0.4rem;
  border: none;
  outline: none;
  background: var(--btn-color);
  color: var(--white);
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    opacity: 0.9;
  }
`;

const NoResult = styled.div`
  color: var(--text-color);
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

const Search = ({
  setData,
  setText,
  setEntries,
  query,
  setQuery,
  setPages,
}) => {
  const debounceSearch = useDebounce(query);

  useEffect(() => {
    const awaitResponse = async () => {
      const response = await searchSingleDetail(debounceSearch);
      if (response.data.list.length === 0) {
        setText(true);
      } else {
        setData(response.data.list);
        setEntries(response.data.totalSize);
        setPages(response.data.pages);
        setText(false);
      }
    };

    if (debounceSearch) awaitResponse();
    if (!debounceSearch) {
      const awaitResponse = async () => {
        try {
          const response = await getAllSingleRequest();
          setData(response.data.list);
          setText(false);
        } catch (error) {
          console.error(error);
        }
      };
      awaitResponse();
    }
  }, [debounceSearch, setData, setText, setEntries, setPages]);

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

const HistoryBoxOne = ({ type }) => {
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState(1);
  const [text, setText] = useState(false);
  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [singleDetail, setSingleDetail] = useState({});

  useEffect(() => {
    const awaitResponse = async () => {
      try {
        const response = await getAllSingleRequest();
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
    try {
      const awaitResponse = await getSingleDetail(id);
      setSingleDetail(awaitResponse.data);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };

  const renderSearch = () => {
    return (
      <Container>
        <Search
          query={query}
          setQuery={setQuery}
          setData={setData}
          setText={setText}
          setEntries={setEntries}
          setPages={setPages}
        />
        {/* {renderSearchBy()} */}
      </Container>
    );
  };

  return (
    <div>
      {isEmpty && data.length === 0 && (
        <NoRecharge>
          You have no single recharge!. Create{" "}
          <SingleLink to="/single">single recharge.</SingleLink>
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
              search={!query}
              query={query}
            />
          )}
        </div>
      )}

      {Object.keys(singleDetail).length > 0 && (
        <Details>
          <p>
            <span>id: </span>
            {singleDetail?.id}
          </p>
          <p>
            <span>Amount</span>: {singleDetail?.serviceCost}
          </p>
          <p>
            <span>Product</span>: {singleDetail?.serviceCode}
          </p>
          <div>
            <OkayButton onClick={() => setSingleDetail({})}>OK</OkayButton>
          </div>
        </Details>
      )}
    </div>
  );
};

export default HistoryBoxOne;
