import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { bulkSearchBy } from "../../helper/requests";
import useDebounce from "../../hooks/useDebounce";

const SearchContainer = styled.div`
  .form {
    height: 40px;
    position: relative;
    width: 140px;
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
const Search = ({
  text,
  setDataTwo,
  setEntriesTableTwo,
  setPageSizeTableTwo,
  setPagesTableTwo,
  query,
  setQuery,
  setEmpty,
}) => {
  const value = useDebounce(query);
  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    if (!value || !query) {
      setEmpty(false);
      return;
    }
    const searchBy = async () => {
      let data;
      if (text === "recipient") {
        data = {
          bulkId: id,
          recipient: value,
        };
      } else {
        data = {
          bulkId: id,
          product: value,
        };
      }
      try {
        const response = await bulkSearchBy(data);

        if (response.data.list.length === 0) {
          setEmpty(true);
        } else {
          setDataTwo(response.data.list);
          setEmpty(false);
          setEntriesTableTwo(response.data.totalSize);
          setPagesTableTwo(response.data.pages);
          setPageSizeTableTwo(response.data.pageSize);
        }
      } catch (error) {
        const message = error.response.data.message;
        console.log(message);
      }
    };
    searchBy();
  }, [
    text,
    setEmpty,
    id,
    value,
    setDataTwo,
    setEntriesTableTwo,
    setPageSizeTableTwo,
    setPagesTableTwo,
    query,
  ]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <SearchContainer>
      <div className="form">
        <input
          onChange={(e) => handleChange(e)}
          className="form__input"
          placeholder=" "
          required
          value={query}
          type="tel"
        />
        <label className="form__label">Search</label>
      </div>
    </SearchContainer>
  );
};

export default Search;
