import styled from "styled-components/macro";

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 100;
  justify-content: center;

  @media (max-width: 400px) {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const Inner = styled.div`
  width: 400px;
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
  height: 350px;
  width: 100%;
  /* height: 100%; */
  border-radius: 20px;
  padding: 2rem 1rem;
  margin-right: 10px;
`;

export const Text = styled.p`
  color: var(--btn-color);
  font-size: 26px;
  font-weight: 500;
`;

export const StrongText = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #28a745;
  margin-bottom: 10px;
`;

export const LightText = styled.p`
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: center;
  color: var(--text-color);
`;

export const IconBox = styled.div`
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
`;

export const Mid = styled.div`
  height: 240px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
