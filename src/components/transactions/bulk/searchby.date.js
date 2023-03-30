import styled from "styled-components";
import React from "react";
import { getAllBulkRequest, searchByDate } from "../../../helper/requests";
import { convertDate } from "../../../utils/dateformat";

import ReactDatePicker from "react-datepicker";

const Container = styled.div`
  margin: 20px 0;
  p {
    color: var(--text-color);
    font-size: 12px;
  }
`;

const CustomDatePicker = styled(ReactDatePicker)`
  border: 1px solid var(--btn-color);
  border-radius: 5px;
  outline: none;
`;

const SearchByDate = ({
  setTransactions,
  setPages,
  setPageSize,
  setEntries,
  setIsEmpty,
}) => {
  const [startDate, setStartDate] = React.useState(null);

  React.useEffect(() => {
    if (startDate === null) {
      const awaitResponse = async () => {
        try {
          const { data } = await getAllBulkRequest();
          setTransactions(data.list);
          setPageSize(data.pageSize);
          setPages(data.pages);
          setEntries(data.totalSize);
          setIsEmpty(false);
        } catch (error) {
          console.error(error);
        }
      };

      awaitResponse();
    }
  }, [
    startDate,
    setTransactions,
    setEntries,
    setPages,
    setPageSize,
    setIsEmpty,
  ]);

  React.useEffect(() => {
    if (startDate) {
      const _data = { scheduledDate: convertDate(startDate) };
      const response = async () => {
        const { data } = await searchByDate(_data);
        if (data.list.length === 0) {
          setIsEmpty(true);
        } else {
          setTransactions(data.list);
          setPageSize(data.pageSize);
          setPages(data.pages);
          setEntries(data.totalSize);
          setIsEmpty(false);
        }
      };
      response();
    }
  }, [
    startDate,
    setTransactions,
    setEntries,
    setPages,
    setPageSize,
    setIsEmpty,
  ]);

  return (
    <Container>
      <p>Search by date</p>
      <div style={{ width: "200px", marginBottom: "20px" }}>
        <CustomDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat={"MMMM d, yyyy"}
        />
      </div>
    </Container>
  );
};

export default SearchByDate;
