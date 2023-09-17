import styled from "styled-components/macro";
import InputMask from "react-input-mask";

export const MinHeight = styled.div`
  min-height: 302px;
`;

export const Container = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    width: 90%;
  }
  @media (max-width: 408px) {
    width: 100%;
  }
`;

export const RechargeDetailsContainer = styled.div`
  min-height: 464px;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  box-shadow: 0px 4px 90px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

export const SmallText = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 11px;
  letter-spacing: 0em;
  text-align: left;
  color: var(--text-color);
`;

export const TopContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const Grid = styled.div`
  /* padding: 20px; */
  height: 50px;
  background: rgba(235, 106, 43, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  cursor: pointer;
  &.active {
    background: var(--text-color);
    color: var(--white);
  }
`;

export const GridInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const GridText = styled.p`
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 8px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 10px;
`;

export const Image = styled.img`
  width: 30px;
`;

export const Airtime = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 60px;
  gap: 10px;
`;

export const Input = styled(InputMask)`
  width: 100%;
  margin: 15px 0;
  height: 50px;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  outline: none;
  padding: 0.5rem;
  color: var(--text-color);
  &::placeholder {
    color: var(--text-color);
  }
`;
