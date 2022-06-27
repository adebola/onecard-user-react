import React from "react";
import styled from "styled-components";

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
const Search = () => {
  return (
    <SearchContainer>
      <div className="form">
        <input className="form__input" placeholder=" " required type="tel" />
        <label className="form__label">Search</label>
      </div>
    </SearchContainer>
  );
};

export default Search;
