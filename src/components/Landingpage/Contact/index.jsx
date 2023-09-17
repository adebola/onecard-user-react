import React, { useContext } from "react";
import Footer from "../../Global/Footer";
import Header from "../../Global/Header";
import HeroBackground from "./Background";
import Background from "../../HeroBackground";

import homebg from "../../../assets/contactbg.png";
import styled, { css } from "styled-components";

import Form from "./Form";
import ResponseModal from "../../Modal/ResponseModal";
import { ModalContext } from "../../../context/ModalProvider";

const ContactContainer = styled.div`
  ${({ modal }) =>
    modal &&
    css`
      height: 100vh;
      overflow: hidden;
    `}
`;

const Contact = () => {
  const { responseModal } = useContext(ModalContext);
  return (
    <ContactContainer>
      {responseModal && <ResponseModal />}
      <Header />
      <Background img={homebg}>
        <HeroBackground />
      </Background>

      <Form />
      <Footer />
    </ContactContainer>
  );
};

export default Contact;
