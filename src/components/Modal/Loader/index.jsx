import React from "react";
import styled from "styled-components";
import { ImCheckmark } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";

const Button = styled.button`
  display: inline-block;
  height: 50px;
  width: 200px;
  line-height: 49px;
  padding: 0 16px;
  font-size: 12px;
  font-family: Roboto;
  color: white;
  background: var(--btn-color);
  border: 1px solid silver;
  border-radius: 4px;
  text-transform: uppercase;
  outline: 0;
  cursor: pointer;
  overflow: hidden;
  letter-spacing: 1px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.8s cubic-bezier(0.06, 0.67, 0.37, 0.99);

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(1px);
  }
  &.not-allowed {
    cursor: not-allowed;
    transform: translateY(0px);
    box-shadow: none;
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    box-shadow: none;
  }
`;

const Container = styled.div`
  position: fixed;
  height: 100vh;
  background: rgba(255, 255, 255, 0.9);
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Inner = styled.div`
  background: var(--text-color);
  width: 500px;
  margin: auto;
  height: 500px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
    width: 100%;
    height: 400px;
  }
`;

const WhiteBackground = styled.div`
  background: var(--white);
  height: 400px;
  width: 80%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 500px) {
    width: 85%;
    height: 300px;
    padding: 3px;
  }
`;

const WhiteInner = styled.div`
  height: 200px;
`;

const StrongText = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #28a745;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    font-size: 17px;
  }
`;

const LightText = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: center;
  color: var(--text-color);
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.div`
  height: 90px;
  width: 90px;
  padding: 1rem;
  border-radius: 50%;
  border: 5px solid var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ErrorBox = styled(IconBox)`
  border: 5px solid #dc3545;
`;

export const ErrorText = styled(StrongText)`
  color: #dc3545;
  @media (max-width: 500px) {
    font-size: 17px;
  }
`;

const Loader = ({ username, setMessage, resetDetails, message, amount }) => {
  if (message !== "Success") {
    return (
      <Container>
        <Inner>
          <WhiteBackground>
            <WhiteInner>
              <Center>
                <ErrorBox>
                  <AiOutlineClose color="#DC3545" size={30} />{" "}
                </ErrorBox>
              </Center>
              <ErrorText>Something went wrong</ErrorText>
              <LightText>{message}</LightText>{" "}
            </WhiteInner>
            <Button
              onClick={() => {
                setMessage("");
              }}
            >
              TRY AGAIN
            </Button>
          </WhiteBackground>
        </Inner>
      </Container>
    );
  } else {
    return (
      <Container>
        <Inner>
          <WhiteBackground>
            <WhiteInner>
              <Center>
                <IconBox>
                  <ImCheckmark color="#124A80" size={24} />
                </IconBox>
              </Center>
              <StrongText>Transfer Successful</StrongText>
              <LightText>
                Your transfer of {amount} to {username} completed successfully.
              </LightText>
            </WhiteInner>
            <Button onClick={resetDetails}>Cancel</Button>
          </WhiteBackground>
        </Inner>
      </Container>
    );
  }
};

export default Loader;
