import React, { useContext } from "react";
import { ModalContext } from "../../../context/ModalProvider";
import Button from "../../Button/normal";
import styled from "styled-components";

import {
  Container,
  Inner,
  InnerBox,
  Mid,
  LightText,
} from "../ResponseModal/styles";

import { removeUserFromOrganization } from "../../../helper/requests";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const MainText = styled(LightText)`
  font-size: 16px;
  line-height: 20px;
`;

const Box = styled(Inner)`
  font-size: 16px;
  width: 500px;
  height: 400px;
  @media (max-width: 580px) {
    width: 100%;
    padding: 20px;
  }
`;

const Div = styled(InnerBox)`
  font-size: 16px;
  width: 500px;
  height: 260px;

  @media (max-width: 580px) {
    width: 100%;
    background: transparent;
  }
`;

const MyMid = styled(Mid)`
  height: 120px;
`;

const QuestionModal = () => {
  const { setQuestionModal, userId, organizationId, setReload } =
    useContext(ModalContext);

  const handleClose = () => {
    setQuestionModal(false);
  };

  const handleRemove = async () => {
    try {
      const data = { users: [userId] };
      await removeUserFromOrganization(organizationId, data);
      setReload(true);
      setQuestionModal(false);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
    }
  };
  return (
    <>
      <Container>
        <Box>
          <Div>
            <MyMid>
              <MainText>Are you sure you want to remove this user ?</MainText>
            </MyMid>
            <ButtonContainer>
              <Button
                myStyle={{ width: "100px" }}
                onClick={handleRemove}
                name="Yes"
              />
              <Button
                onClick={handleClose}
                myStyle={{ width: "100px" }}
                name="No"
              />
            </ButtonContainer>
          </Div>
        </Box>
      </Container>
    </>
  );
};

export default QuestionModal;
