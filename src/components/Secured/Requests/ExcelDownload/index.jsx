import React from "react";
import styled from "styled-components";

import { ImDownload } from "react-icons/im";
import {
  downloadExcelBulk,
  downloadExcelSchedule,
} from "../../../../helper/requests";
import { saveAs } from "file-saver";

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
const Download = ({ id, type }) => {
  const downloadFile = async () => {
    if (type === "Bulk" || type === "Auto") {
      try {
        const res = await downloadExcelBulk(id);
        saveAs(res.data, `${id}.xlsx`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await downloadExcelSchedule(id);
        saveAs(res.data, `${id}.xlsx`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container onClick={downloadFile}>
      <Icon>
        <ImDownload size={19} />
      </Icon>
      <div>Download excel file</div>
    </Container>
  );
};

export default Download;
