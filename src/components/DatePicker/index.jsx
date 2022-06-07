import { useContext } from "react";
import DatePicker from "react-datepicker";
import { GlobalContext } from "../../context/GlobalProvider";
import React from "react";
import styled from "styled-components";

const Schedule = styled.div`
  color: var(--btn-color);
  text-align: center;
  font-size: 10px;

  &.left {
    text-align: left;
    color: var(--btn-color);
    font-weight: bold;
    font-size: 12px;
    margin-top: 10px;
  }
`;

const ScheduleDatePicker = ({ left, right }) => {
  const { startDate, setStartDate, setEndDate, endDate } =
    useContext(GlobalContext);

  return (
    <>
      {right && <Schedule className={right && "left"}>End Date</Schedule>}
      {left && <Schedule className={left && "left"}>Start Date</Schedule>}

      {!left && !right && (
        <Schedule>Select a Date & Time To Schedule Your Recharge</Schedule>
      )}
      <DatePicker
        selected={right ? endDate : startDate}
        onChange={(date) => (right ? setEndDate(date) : setStartDate(date))}
        showTimeSelect={true}
        dateFormat={"MMMM d, yyyy h:mm aa"}
      />
    </>
  );
};

export default ScheduleDatePicker;
