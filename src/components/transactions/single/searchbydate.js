import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const CustomDatePicker = styled(DatePicker)`
  border: 1px solid var(--btn-color);
  border-radius: 5px;
  outline: none;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;

  p {
    color: var(--text-color);
    font-size: 12px;
  }
`;

const SearchByDate = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <Flex>
      <div>
        <p>Start date</p>
        <div style={{ width: "200px", marginBottom: "20px" }}>
          <CustomDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat={"MMMM d, yyyy"}
          />
        </div>
      </div>
      {startDate !== null && (
        <div>
          <p>End date</p>
          <CustomDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat={"MMMM d, yyyy"}
          />
        </div>
      )}
    </Flex>
  );
};

export default SearchByDate;
