import React, { useState } from "react";
import styled from "styled-components";
import { ImDownload } from "react-icons/im";

import DatePicker from "react-datepicker";
import { transactionExcelDownload } from "../../../../helper/requests";
import { saveAs } from "file-saver";
import { convertDate } from "../../../../utils/dateformat";

const Text = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: var(--text-color);
  margin-bottom: 10px;
`;

const Flex = styled.div`
  display: flex;

  p {
    color: var(--text-color);
    font-size: 12px;
  }
`;

const Optional = styled.p`
  color: var(--btn-color);
  font-weight: bold;
  margin-right: 3px;
  margin-top: 2px;
`;

const CustomDatePicker = styled(DatePicker)`
  border: 1px solid var(--btn-color);
  border-radius: 5px;
  outline: none;
`;

const From = styled.div`
  margin-right: 9px;
`;

const To = styled.div``;

const Container = styled.button`
  background: var(--text-color);
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  padding: 0.7rem;
  border-radius: 3px;
  margin: 24px 0;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;
`;

const DownloadWithDataRange = () => {
  const [data, setData] = useState({
    from: null,
    to: null,
  });

  const handleExcelDownload = async () => {
    const formattedData = {
      from: data.from === null ? null : convertDate(data.from),
      to: data.to === null ? null : convertDate(data.to),
    };
    try {
      const response = await transactionExcelDownload(formattedData);
      console.log(response);
      saveAs(response.data, "transactions.xlsx");
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };
  return (
    <div>
      <Text>Select date range</Text>
      <Flex>
        <From>
          <p>From</p>
          <CustomDatePicker
            selected={data.from}
            dateFormat="dd-MM-yyyy"
            onChange={(date) => setData({ ...data, from: date })}
          />
          <Optional>optional</Optional>
        </From>
        <To>
          <p>To</p>
          <CustomDatePicker
            selected={data.to}
            dateFormat="dd-MM-yyyy"
            onChange={(date) => setData({ ...data, to: date })}
          />
          <Optional>optional</Optional>
        </To>
      </Flex>
      <Container onClick={handleExcelDownload}>
        <Icon>
          <ImDownload size={19} />
        </Icon>
        <div>Download excel file</div>
      </Container>
    </div>
  );
};

export default DownloadWithDataRange;
