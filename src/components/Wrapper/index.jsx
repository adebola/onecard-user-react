import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { MobileResponsive } from "../../responsive/mobileresponsive";
import Sidebar from "../Sidebar";
import { GlobalContext } from "../../context/GlobalProvider";
import ModalCompo from "../Modal";
import SendBeneModal from "../Modal/SendBeneModal";
import ResponseModal from "../Modal/ResponseModal";
import { ModalContext } from "../../context/ModalProvider";
import ErrorModal from "../Modal/ErrorModal";
import PasswordModal from "../Secured/Profile/PasswordModal";

const Container = styled.div`
  ${({ responseModal }) => {
    return (
      responseModal &&
      css`
        overflow: hidden;
        height: 100vh;
      `
    );
  }}
  ${({ beneModal }) => {
    return (
      beneModal &&
      css`
        overflow: hidden;
        height: 100vh;
      `
    );
  }}
	${({ sendToBeneModal }) => {
    return (
      sendToBeneModal &&
      css`
        overflow: hidden;
        height: 100vh;
      `
    );
  }}
	${({ errorModal }) => {
    return (
      errorModal &&
      css`
        overflow: hidden;
        height: 100vh;
      `
    );
  }}
	${({ passwordModal }) => {
    return (
      passwordModal &&
      css`
        overflow: hidden;
        height: 100vh;
      `
    );
  }}
`;
const Inner = styled.div`
  display: flex;
`;

const FullWidth = styled.div`
  width: 77%;
  position: relative;
  left: 23%;
  padding: 2rem;

  ${MobileResponsive({
    top: "80px",
    left: "0%",
    width: "100%",
    padding: "1rem",
  })}
`;

const Wrapper = ({ children }) => {
  const { beneModal } = useContext(GlobalContext);
  const { sendToBeneModal, responseModal, errorModal, passwordModal } =
    useContext(ModalContext);
  return (
    <Container
      sendToBeneModal={sendToBeneModal}
      beneModal={beneModal}
      errorModal={errorModal}
      passwordModal={passwordModal}
    >
      {beneModal && <ModalCompo />}
      {sendToBeneModal && <SendBeneModal />}
      {responseModal && <ResponseModal />}
      {errorModal && <ErrorModal />}

      {passwordModal && <PasswordModal />}

      <Inner>
        <Sidebar />
        <FullWidth>{children}</FullWidth>
      </Inner>
    </Container>
  );
};

export default Wrapper;
