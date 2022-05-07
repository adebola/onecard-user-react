import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { makeBulkRechargeWithExcel } from "../../../helper/requests";
import { GlobalContext } from "../../../context/GlobalProvider";
import { ModalContext } from "../../../context/ModalProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  position: relative;
  width: 150px;
  cursor: pointer;
  padding: 17px 10px;
  margin-top: 20px;
  background: var(--btn-color);
  outline: none;
  border: none;
  color: var(--white);
  border-radius: 6px;

  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    padding: 12px;
    width: auto;
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

const ErrorBox = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 8px;
`;

const FileName = styled.span`
  font-size: 13px;
  font-weight: 400;
  margin-top: 15px;
  color: var(--text-color);
`;

const Name = styled(FileName)`
  font-weight: 500;
`;

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [error, setError] = useState(null);
  const { setResponseMessage } = useContext(GlobalContext);
  const { setResponseModal, setErrorMessage, setErrorModal } =
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

  useEffect(() => {
    if (selectedFile) {
      console.log(selectedFile);

      const sendFile = async () => {
        let data = new FormData();
        data.append("file", selectedFile);

        try {
          await makeBulkRechargeWithExcel(data);
          setResponseModal(true);
          setResponseMessage("B Excel Successful");
          setSelectedFile(null);
        } catch (error) {
          const message = error.response.data.message;
          setErrorModal(true);
          setErrorMessage(message);
          setSelectedFile(null);
        }
      };

      sendFile();
    }
  }, [
    selectedFile,
    setErrorMessage,
    setErrorModal,
    setResponseModal,
    setResponseMessage,
  ]);

  const handleChange = (e) => {
    if (!e.target.files[0]) return;
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Container>
      <Button>
        <FileUpload type="file" onChange={handleChange} name="file" />
        Upload Excel File
      </Button>
      {error && <ErrorBox>{error}</ErrorBox>}
      {selectedFile && !error && (
        <FileName>
          {" "}
          filename : <Name>{selectedFile?.name}</Name>
        </FileName>
      )}
    </Container>
  );
};

export default UploadFile;
