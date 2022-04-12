import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { ModalContext } from "../../../../context/ModalProvider";
import { passwordRequest } from "../../../../helper/requests";

const PasswordContainer = styled.form`
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 90;
  justify-content: center;

  @media (max-width: 400px) {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const Inner = styled.div`
  width: 700px;
  /* height: 400px; */
  background-color: var(--text-color);
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 400px) {
    background-color: transparent;
  }
`;

export const InnerBox = styled.div`
  background-color: white;
  height: 520px;
  width: 90%;
  border-radius: 20px;
  padding: 2rem 1rem;
  margin-right: 10px;

  @media (max-width: 400px) {
    width: 100%;
    height: 450px;
  }
`;

const Title = styled.h3`
  font-size: 28px;
  color: var(--btn-color);
  text-align: center;
  margin-bottom: 50px;

  @media (max-width: 400px) {
    font-size: 20px;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin: auto;
  margin-bottom: 20px;

  @media (max-width: 400px) {
    width: 320px;
    margin: auto;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 7px;
`;

const Input = styled.input`
  height: 45px;
  border: none;
  outline: none;
  border: 1px solid var(--btn-color);
  border-radius: 6px;
  padding: 9px;
`;

const ButtonContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  padding: 12px 12px;
  outline: none;
  border: none;
  width: 150px;
  cursor: pointer;
  border-radius: 6px;
  background: var(--text-color);
  color: var(--white);
`;

const CancelButton = styled(SaveButton)`
  background: none;
  border: 1px solid var(--btn-color);
  color: var(--btn-color);

  &:hover {
    background-color: var(--light-background);
  }
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 9px;
`;

const PasswordModal = () => {
  const { setPasswordModal, setResponseModal } = useContext(ModalContext);
  const { setResponseMessage } = useContext(GlobalContext);
  const [error, setError] = useState(false);

  const [password, setPassword] = useState({
    confirmPassword: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      setError("Password don't match, please try again");
    } else if (
      password.password === password.confirmPassword &&
      password.password.length < 6
    ) {
      setError("Password is too short, try a longer one");
    } else {
      const data = {
        password: password.password,
      };
      try {
        await passwordRequest(data);
        setResponseModal(true);
        setPasswordModal(false);
        setResponseMessage("Password Success");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PasswordContainer onSubmit={handleSubmit}>
      <Inner>
        <InnerBox>
          <Title>Update Password</Title>

          <InputDiv>
            <Label>Confirm Password</Label>
            <Input
              placeholder="Confirm password"
              type="password"
              value={password.confirmPassword}
              onChange={({ target }) => {
                return setPassword({
                  ...password,
                  confirmPassword: target.value,
                });
              }}
            />
          </InputDiv>
          <InputDiv>
            <Label>New Password</Label>
            <Input
              placeholder="New password"
              type="password"
              value={password.password}
              onChange={({ target }) => {
                return setPassword({
                  ...password,
                  password: target.value,
                });
              }}
            />
            {error && <ErrorText>{error}</ErrorText>}

            <ButtonContainer>
              <SaveButton>Save Changes</SaveButton>
              <CancelButton onClick={() => setPasswordModal(false)}>
                Cancel
              </CancelButton>
            </ButtonContainer>
          </InputDiv>
        </InnerBox>
      </Inner>
    </PasswordContainer>
  );
};

export default PasswordModal;
