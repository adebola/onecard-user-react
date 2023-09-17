import React, { useContext, useEffect, useState } from "react";
import {
  makeBulkAutoRechargeWithExcel,
  makeBulkRechargeWithExcel,
  makeBulkScheduleRechargeWithExcel,
} from "../../../../../helper/requests";

import { AiOutlineUpload } from "react-icons/ai";
import Button from "../../../../Button/normal";
import { GlobalContext } from "../../../../../context/GlobalProvider";
import Loader from "../../../../Loader";
import { ModalContext } from "../../../../../context/ModalProvider";
import { SingleRechargeContext } from "../../../../../context/SingleRechargeContext";
import { convertDate } from "../../../../../utils/dateformat";
import { getExcelMessage } from "../../../../../utils/messages.response";
import styled from "styled-components";

const Container = styled.form`
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

const ExcelFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const { showModal, setShowModal } = useContext(SingleRechargeContext);

  const { startDate, endDate } = useContext(GlobalContext);
  const { rechargeName, monthlyAutoRecharge, weeklyAutoRecharge } =
    useContext(ModalContext);

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

  const auto = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a file to upload !");
      return;
    }
    let data = new FormData();
    setShowModal(true);
    switch (auto.rechargeType) {
      case 1:
        data.append("file", selectedFile);

        try {
          await makeBulkRechargeWithExcel(data);
          setSelectedFile(null);
          getExcelMessage("Instant Recharge Successful", false, () =>
            setShowModal(false)
          );
        } catch (error) {
          const message = error.response.data.message;
          getExcelMessage(message, true, () => setShowModal(false));
        }
        break;

      case 2:
        const scheduledDate = convertDate(startDate);

        const dateData = new Blob([JSON.stringify({ scheduledDate })], {
          type: "application/json",
        });
        data.append("file", selectedFile);
        data.append("date", dateData);

        try {
          await makeBulkScheduleRechargeWithExcel(data);
          setSelectedFile(null);
          getExcelMessage("Schedule Recharge Successful", false, () =>
            setShowModal(false)
          );
        } catch (error) {
          const message = error.response.data.message;
          getExcelMessage(message, true, () => setShowModal(false));
        }
        break;
      case 3:
        const auto = {
          title: rechargeName,
          daysOfWeek: weeklyAutoRecharge,
          daysOfMonth: monthlyAutoRecharge,
          startDate: convertDate(startDate),
          endDate: convertDate(endDate),
          paymentMode: "wallet",
        };

        const dataForm = new Blob([JSON.stringify(auto)], {
          type: "application/json",
        });

        data.append("auto", dataForm);
        data.append("file", selectedFile);

        try {
          await makeBulkAutoRechargeWithExcel(data);
          setSelectedFile(null);
          getExcelMessage("Auto Recharge Successful", false, () =>
            setShowModal(false)
          );
        } catch (error) {
          const message = error.response.data.message;
          getExcelMessage(message, true, () => setShowModal(false));
        }
        break;
      default:
        break;
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Inner>
        {showModal && <Loader />}
        <>
          <SelectBox>
            <ButtonAndLink>
              <FileContainer>
                <FileUploadIcon>
                  <AiOutlineUpload size={19} fill="white" />
                </FileUploadIcon>
                <FileText>Choose an excel file</FileText>

                <FileUpload type="file" onChange={handleChange} name="file" />
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
          <Button name="Submit" type="submit" />
        </>
      </Inner>
    </Container>
  );
};

export default ExcelFileUpload;
