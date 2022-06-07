import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiOutlineUpload } from "react-icons/ai";
import Button from "../../../../Button/normal";
import {
  makeBulkAutoRechargeWithExcel,
  makeBulkRechargeWithExcel,
  makeBulkScheduleRechargeWithExcel,
} from "../../../../../helper/requests";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import { ModalContext } from "../../../../../context/ModalProvider";
import { convertDate } from "../../../../../utils/dateformat";
import Hover from "../TabButton";
// import axios from "axios";

const Container = styled.form`
  /* display: flex;
	gap: 30px;
	*/
  margin-top: 40px;
`;

const SelectBox = styled.div`
  height: 220px;
  /* background: red; */
  margin-top: 30px;
`;

const FileContainer = styled.div`
  background: var(--text-color);
  color: var(--light-background);
  display: flex;
  align-items: center;
  position: relative;
  width: 160px;
  padding: 0.6rem;
  color: var(--white);
  border-radius: 4px;
  margin-bottom: 10px;

  &.disabled {
    opacity: 0.5;
  }
`;

const FileUploadIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;
  .icon {
    color: white;
  }
`;

const FileUpload = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
`;

const Inner = styled.div``;

const FileText = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const FileName = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: var(--text-color);
`;

const Name = styled(FileName)`
  font-weight: 500;
`;

const ErrorBox = styled.p`
  color: red;
  font-size: 12px;
`;

const ButtonAndLink = styled.div`
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  font-size: 12px;
  margin-left: 10px;
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  color: var(--text-color);
`;

const ExcelFileUpload = ({
  setFileSelect,
  setOptionId,
  optionId,
  fileSelect,
  rechargeId,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [left, setLeft] = useState(0);
  const [clicked, setClicked] = useState(false);

  const { setResponseMessage, startDate, endDate } = useContext(GlobalContext);
  const {
    setResponseModal,
    setErrorMessage,
    setErrorModal,
    rechargeName,
    monthlyAutoRecharge,
    weeklyAutoRecharge,
  } = useContext(ModalContext);

  useEffect(() => {
    const getName = (name) => {
      const accepted = ["xlsx", "xls"];

      const splitItem = name.split(".");
      const lastItem = splitItem[splitItem.length - 1];
      if (accepted.includes(lastItem)) {
        setError(null);
      } else {
        setSelectedFile(null);
        setError("Please select a .xlsx or .xls file only !");
      }
    };
    if (selectedFile) {
      getName(selectedFile.name);
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    setSelectedFile(e.target.files[0]);
  };

  const handleClick = () => {
    setOptionId(1);
    setFileSelect(false);
    setLeft(0);
  };
  const handleSecondClick = () => {
    setFileSelect(true);
    setOptionId(2);
    setLeft(85);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    setClicked(true);

    if (rechargeId === 3) {
      const auto = {
        title: rechargeName,
        daysOfWeek: weeklyAutoRecharge,
        daysOfMonth: monthlyAutoRecharge,
        startDate,
        endDate,
        paymentMode: "wallet",
      };

      const dataForm = new Blob([JSON.stringify(auto)], {
        type: "application/json",
      });

      data.append("auto", dataForm);
      data.append("file", selectedFile);

      try {
        // const fresponse = await axios.post("https://httpbin.org/post", data);
        // console.log(fresponse);

        const response = await makeBulkAutoRechargeWithExcel(data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (rechargeId === 1) {
      data.append("file", selectedFile);
      try {
        await makeBulkRechargeWithExcel(data);
        setResponseModal(true);
        setResponseMessage("Bulk Excel Successful");
        setSelectedFile(null);
      } catch (error) {
        const message = error.response.data.message;
        setErrorModal(true);
        setErrorMessage(message);
        setSelectedFile(null);
      }
    } else {
      const scheduledDate = convertDate(startDate);
      const dateData = new Blob([JSON.stringify({ scheduledDate })], {
        type: "application/json",
      });
      data.append("file", selectedFile);
      data.append("date", dateData);

      // makeBulkScheduleRechargeWithExcel;
      try {
        await makeBulkScheduleRechargeWithExcel(data);
        setResponseModal(true);
        setResponseMessage("Bulk Excel Successful");
        setSelectedFile(null);
      } catch (error) {
        const message = error.response.data.message;
        setErrorModal(true);
        setErrorMessage(message);
        setSelectedFile(null);
      }
    }
    setClicked(false);
  };

  const disabled = !selectedFile;

  return (
    <Container onSubmit={handleSubmit}>
      <Hover
        id={optionId}
        left={left}
        onClickOne={handleClick}
        onClickTwo={handleSecondClick}
      />

      <Inner>
        {optionId === 2 && (
          <>
            <SelectBox>
              <ButtonAndLink>
                <FileContainer className={clicked && "disabled"}>
                  <FileUploadIcon>
                    <AiOutlineUpload size={19} fill="white" />
                  </FileUploadIcon>
                  <FileText>Choose an excel file</FileText>

                  <FileUpload
                    disabled={selectedFile?.name}
                    type="file"
                    onChange={handleChange}
                    name="file"
                  />
                </FileContainer>
                <Link href="https://delifrost.s3.amazonaws.com/bulk-request.xlsx">
                  Download excel sample
                </Link>
              </ButtonAndLink>
              {error && <ErrorBox>{error}</ErrorBox>}
              {selectedFile && !error && (
                <FileName>
                  {" "}
                  filename : <Name>{selectedFile?.name}</Name>
                </FileName>
              )}{" "}
            </SelectBox>
            <Button type="submit" disabled={disabled} name="Submit" />
          </>
        )}
      </Inner>
    </Container>
  );
};

export default ExcelFileUpload;
