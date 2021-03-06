import React, { useContext } from "react";
import { ModalContext } from "../../../context/ModalProvider";
import Button from "../../Button/normal";
import {
  Container,
  ErrorBox,
  ErrorText,
  Inner,
  InnerBox,
  LightText,
  Mid,
} from "../ResponseModal/styles";
import { AiOutlineClose } from "react-icons/ai";

const ErrorModal = () => {
  const { setErrorModal, errorMessage, setErrorMessage } =
    useContext(ModalContext);

  const handleClose = () => {
    setErrorModal(false);
    setErrorMessage("");
  };
  return (
    <>
      <Container>
        <Inner>
          <InnerBox>
            <Mid>
              {errorMessage && (
                <>
                  <>
                    <ErrorBox>
                      <AiOutlineClose color="#DC3545" size={30} />{" "}
                    </ErrorBox>
                    <ErrorText>Error</ErrorText>
                    <LightText>{errorMessage}</LightText>
                  </>
                </>
              )}
            </Mid>
            <Button onClick={handleClose} name="Close" />
          </InnerBox>
        </Inner>
      </Container>
    </>
  );
};

export default ErrorModal;
